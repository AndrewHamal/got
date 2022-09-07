import SuperadminLayout from '@/components/layout/superadmin'
import { objectToFormData, responseErrorHandler } from '@/services/helper';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import CreateOrUpdateDestinationForm from '@/components/superadmin/forms/package';
import { useRouter } from 'next/router';
import { createPackage } from '@/api/superadmin/package';

function CreateHotels() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formMethods = useForm();

  function createDestinationHandler(data: any) {
    const dto = {
      ...data,
      name: data.name,
      price: data.price,
      valid_from: data.valid_from,
      valid_till: data.valid_till,
      details: JSON.stringify(data.details),
      destination_id: data.destination_id,
    }

    const { ...destinationDTO } = dto;

    setLoading(true);
    createPackage(objectToFormData(destinationDTO))
      .then((destRes: any) => {
        toast.success(destRes.message);
        router.push(`/superadmin/packages`);   
      })
      .catch((err: any) => { responseErrorHandler(err, formMethods.setError), setLoading(false) })
  }

  return (
    <SuperadminLayout title="Create Package">
      <div className="col-lg-10">
        <div className="white_card card_height_100 mb_30">
          <div className="white_card_header">
            <div className="box_header m-0">
              <div className="main-title">
                <h3 className="m-0">Create Package Form</h3>
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