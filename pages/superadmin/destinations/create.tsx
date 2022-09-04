import SuperadminLayout from '@/components/layout/superadmin'
import { objectToFormData, responseErrorHandler } from '@/services/helper';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { createDestination } from '@/api/superadmin/destination';
import CreateOrUpdateDestinationForm from '@/components/superadmin/forms/destination';
import { UploadFile } from 'antd';

function CreateHotels() {
  const [loading, setLoading] = useState(false);
  const formMethods = useForm();

  function createDestinationHandler(data: any) {
    console.log({ data })
    const dto = {
      ...data,
      files: data.files.map((file: UploadFile) => file.originFileObj),
      overview: JSON.stringify(data.overview),
      itenaries: JSON.stringify(data.itenaries),
      ["included/excluded"]: JSON.stringify(data["included/excluded"]),
    }
    console.log(dto)

    setLoading(true);
    createDestination(objectToFormData(dto))
      .then((res: any) => {
        toast.success(res.message);
        formMethods.reset();
      })
      .catch((err: any) => responseErrorHandler(err, formMethods.setError))
      .finally(() => setLoading(false))
  }

  return (
    <SuperadminLayout title="Create Destinations">
      <div className="col-lg-6">
        <div className="white_card card_height_100 mb_30">
          <div className="white_card_header">
            <div className="box_header m-0">
              <div className="main-title">
                <h3 className="m-0">Create Destination Form</h3>
              </div>
            </div>
          </div>
          <div className="white_card_body">
            <CreateOrUpdateDestinationForm
              loading={loading}
              formMethods={formMethods}
              submitHandler={createDestinationHandler}
            />
          </div>
        </div>
      </div>
    </SuperadminLayout>
  )
}

export default CreateHotels