import SuperadminLayout from '@/components/layout/superadmin'
import { objectToFormData, responseErrorHandler } from '@/services/helper';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import CreateOrUpdateDestinationForm from '@/components/superadmin/forms/itinerary';
import { Skeleton, UploadFile } from 'antd';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { updateDestination, uploadDestinationFiles } from '@/api/superadmin/destination';

function CreateHotels() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR(`/admin/itinarery/${id}`);
  const [loading, setLoading] = useState(false);
  const formMethods = useForm();

  console.log(data)

  function createDestinationHandler(data: any) {
    const dto = {
      ...data,
      day: data.day,
      title: data.title,
      content: JSON.stringify(data.content),
      destination_id: data.destination_id,
    }

    const { files, ...destinationDTO } = dto;

    setLoading(true);
    updateDestination(Number(id), objectToFormData(destinationDTO))
      .then((destRes: any) => {
        // upload files
        toast.success(destRes.message);
        router.push(`/superadmin/itinareries`);
      })
      .catch((err: any) => {
        responseErrorHandler(err, formMethods.setError);
        setLoading(false);
      })
  }

  useEffect(() => {

    if (data) {
      formMethods.reset({
        day: data.day,
        title: data.title,
        // content: JSON.stringify(data.content),
        destination_id: data.destination_id,
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])


  return (
    <SuperadminLayout title="Update Itinerary">
      <div className="col-lg-10">
        <div className="white_card card_height_100 mb_30">
          <div className="white_card_header">
            <div className="box_header m-0">
              <div className="main-title">
                <h3 className="m-0">Update Itinerary Form</h3>
              </div>
            </div>
          </div>
          <div className="white_card_body">
            {
              !data ?
                <>
                  <Skeleton active />
                  <Skeleton active />
                  <Skeleton active />
                </> :
                <CreateOrUpdateDestinationForm
                  loading={loading}
                  formMethods={formMethods}
                  submitHandler={createDestinationHandler}
                />
            }
          </div>
        </div>
      </div>
    </SuperadminLayout>
  )
}

export default CreateHotels