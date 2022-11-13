import SuperadminLayout from '@/components/layout/superadmin'
import { objectToFormData, responseErrorHandler } from '@/services/helper';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { createDestination, createEssential, uploadDestinationFiles } from '@/api/superadmin/destination';
import CreateOrUpdateDestinationForm from '@/components/superadmin/forms/destination';
import { UploadFile } from 'antd';
import { useRouter } from 'next/router';
import CreateOrUpdateEssentialForm from '@/components/superadmin/forms/essential';

function CreateHotels() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formMethods = useForm();

  function createDestinationHandler(data: any) {
    const dto = {
      ...data,
      image: data.image[0].originFileObj,
    }

    const { ...destinationDTO } = dto;

    setLoading(true);
    createEssential(objectToFormData(destinationDTO))
      .then((res: any) => {
        toast.success(res?.data?.message);
        router.push(`/superadmin/essential-gear`);
      })
      .catch((err: any) => { responseErrorHandler(err, formMethods.setError); setLoading(false) })
  }

  return (
    <SuperadminLayout title="Create Essential Gear">
      <div className="col-lg-10">
        <div className="white_card card_height_100 mb_30">
          <div className="white_card_header">
            <div className="box_header m-0">
              <div className="main-title">
                <h3 className="m-0">Create Essential Gear Form</h3>
              </div>
            </div>
          </div>
          <div className="white_card_body">
            <CreateOrUpdateEssentialForm
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