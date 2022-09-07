import SuperadminLayout from '@/components/layout/superadmin'
import { objectToFormData, responseErrorHandler } from '@/services/helper';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { createItinerary } from '@/api/superadmin/itinerary';
import CreateOrUpdateItenaryForm from '@/components/superadmin/forms/itinerary';

function CreateHotels() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formMethods = useForm();

  function createDestinationHandler(data: any) {
    const dto = {
      ...data,
      day: data.day,
      title: data.title,
      content: JSON.stringify(data.content),
      destination_id: data.destination_id,
    }

    const { ...destinationDTO } = dto;

    setLoading(true);
    createItinerary(objectToFormData(destinationDTO))
      .then((destRes: any) => {
        toast.success(destRes.message);
        router.push(`/superadmin/itinerary`);
      })
      .catch((err: any) => { responseErrorHandler(err, formMethods.setError) })
      .finally(() => setLoading(false))
  }

  return (
    <SuperadminLayout title="Create Itinerary">
      <div className="col-lg-10">
        <div className="white_card card_height_100 mb_30">
          <div className="white_card_header">
            <div className="box_header m-0">
              <div className="main-title">
                <h3 className="m-0">Create Itinerary Form</h3>
              </div>
            </div>
          </div>
          <div className="white_card_body">
            <CreateOrUpdateItenaryForm
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