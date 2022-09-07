import SuperadminLayout from '@/components/layout/superadmin'
import { objectToFormData, responseErrorHandler } from '@/services/helper';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { createDestination, uploadDestinationFiles } from '@/api/superadmin/destination';
import CreateOrUpdateDestinationForm from '@/components/superadmin/forms/destination';
import { UploadFile } from 'antd';
import { useRouter } from 'next/router';

function CreateHotels() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formMethods = useForm();

  function createDestinationHandler(data: any) {
    const dto = {
      ...data,
      files: data.files.map((file: UploadFile) => file.originFileObj),
      overview: JSON.stringify(data.overview),
      itinarery: JSON.stringify(data.itinarery),
      included: JSON.stringify(data.included),
      not_included: JSON.stringify(data.not_included),
      trek_info: data.trek_info?.blocks[0]?.text.length ? JSON.stringify(data.trek_info) : null,
    }

    const { files, ...destinationDTO } = dto;

    setLoading(true);
    createDestination(objectToFormData(destinationDTO))
      .then((destRes: any) => {
        // upload files
        uploadDestinationFiles(
          objectToFormData({
            files,
            destination_id: destRes.data.id
          }))
          .then((res: any) => {
            toast.success(destRes.message);
            router.push(`/superadmin/destinations`);
          })
          .catch(responseErrorHandler)
          .finally(() => setLoading(false))

      })
      .catch((err: any) => { responseErrorHandler(err, formMethods.setError); setLoading(false) })
  }

  return (
    <SuperadminLayout title="Create Destinations">
      <div className="col-lg-10">
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