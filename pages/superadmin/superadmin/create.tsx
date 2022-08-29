import SuperadminLayout from '@/components/layout/superadmin'
import SuperadminForm from '@/components/superadmin/forms/superadmin';
import { Button } from 'antd';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

function SuperadminCreate() {
  const [loading, setLoading] = useState(false);
  const formMethods = useForm();

  function createSuperadminHandler(data: any) {
    console.log(data)
    // setLoading(true);
    // createHotel(data)
    //     .then((res: any) => {

    //     })
    //     .catch((err: any) => responseErrorHandler(err, setError))
    //     .finally(() => setLoading(false))
  }

  return (
    <SuperadminLayout title="Superadmin Create">
      <div className="col-lg-6">
        <div className="white_card card_height_100 mb_30">
          <div className="white_card_header">
            <div className="box_header m-0">
              <div className="main-title">
                <h3 className="m-0">Create Superadmin Form</h3>
              </div>
            </div>
          </div>
          <div className="white_card_body">
            <h6 className="card-subtitle mb-4">
              Create new superadmin and share credentials
            </h6>
            <SuperadminForm
              loading={loading}
              submitHandler={createSuperadminHandler}
              formMethods={formMethods}
            />
          </div>
        </div>
      </div>
    </SuperadminLayout>
  )
}

export default SuperadminCreate