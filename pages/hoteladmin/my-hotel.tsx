import { updateHotel } from '@/api/hoteladmin/hotel';
import HotelForm from '@/components/hoteladmin/forms/hotel';
import HoteladminLayout from '@/components/layout/hoteladmin';
import { objectToFormData, responseErrorHandler } from '@/services/helper';
import useUser from '@/services/hooks/useUser';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

function MyHotel() {

  const { user, mutateUser } = useUser();
  const [loading, setLoading] = useState(false);
  const formMethods = useForm({
    defaultValues: {

    }
  });
  const { reset, setError } = formMethods;

  function createHotelHandler(data: any) {
    setLoading(true);
    updateHotel(objectToFormData(data))
      .then((res: any) => {
        reset();
        mutateUser();
        toast.success(res.message);
      })
      .catch((err: any) => responseErrorHandler(err, setError))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    user && reset({
      logo: "https://thumbs.dreamstime.com/b/stunning-landscape-iamge-river-flowing-lush-green-forest-summer-61650087.jpg",
      cover_image: "https://thumbs.dreamstime.com/b/stunning-landscape-iamge-river-flowing-lush-green-forest-summer-61650087.jpg",
      name: user.hotel.name,
      category_id: user.hotel.category_id,
      description: user.hotel.description,
      why_choose_us: {
        blocks: [
          {
            key: "1",
            text: `why`,
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      },
      our_facilities: {
        blocks: [
          {
            key: "1",
            text: `our`,
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      }

    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <HoteladminLayout title="Update Hotel">
      <div className="row justify-content-center">
        <div className="col-lg-8 card shadow">
          <div className="white_card card_height_100 mb_30">
            <div className="white_card_header">
              <div className="box_header m-0">
                <div className="main-title">
                  <h3 className="m-0">Update Hotel</h3>
                </div>
              </div>
            </div>
            <div className="white_card_body">
              <h6 className="card-subtitle mb-4">
                Update your hotel information here
              </h6>
              <HotelForm
                submitHandler={createHotelHandler}
                loading={loading}
                formMethods={formMethods}
              />
            </div>
          </div>
        </div >
      </div >
    </HoteladminLayout>
  )
}

export default MyHotel