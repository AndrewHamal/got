import SuperadminLayout from '@/components/layout/superadmin';
import SuperadminForm from '@/components/superadmin/forms/superadmin';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

function EditSuperadmin() {

  const [loading, setLoading] = useState(false);
  const formMethods = useForm();

  function editHotelHandler(data: any) {
    console.log(data)
    // setLoading(true);
    // createHotel(data)
    //     .then((res: any) => {

    //     })
    //     .catch((err: any) => responseErrorHandler(err, setError))
    //     .finally(() => setLoading(false))
  }

  return (
    <SuperadminLayout title="Superadmin Edit">
      <div className="col-lg-6">
        <div className="white_card card_height_100 mb_30">
          <div className="white_card_header">
            <div className="box_header m-0">
              <div className="main-title">
                <h3 className="m-0">Edit Superadmin Form</h3>
              </div>
            </div>
          </div>
          <div className="white_card_body">
            <h6 className="card-subtitle mb-4">
              Edit superadmin
            </h6>
            <SuperadminForm
              loading={loading}
              submitHandler={editHotelHandler}
              formMethods={formMethods}
            />
          </div>
        </div>
      </div>
    </SuperadminLayout>
  )
}

export default EditSuperadmin