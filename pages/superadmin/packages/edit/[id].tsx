import SuperadminLayout from '@/components/layout/superadmin'
import { objectToFormData, responseErrorHandler } from '@/services/helper';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import CreateOrUpdateDestinationForm from '@/components/superadmin/forms/package';
import { Skeleton, UploadFile } from 'antd';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { updatePackage } from '@/api/superadmin/package';

function CreateHotels() {
  const router = useRouter();
  const { id } = router.query;
  const { data, mutate } = useSWR(`/admin/package/${id}`);
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

    const { files, ...destinationDTO } = dto;

    setLoading(true);
    updatePackage(Number(id), objectToFormData(destinationDTO))
      .then((destRes: any) => {
        // upload files
        toast.success(destRes.message);
        router.push(`/superadmin/packages`);
      })
      .catch((err: any) => {
        responseErrorHandler(err, formMethods.setError);
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {

    mutate();

    if (data) {
      formMethods.reset({
        name: data.name,
        price: data.price,
        valid_from: data.valid_from,
        valid_till: data.valid_till,
        details: JSON.parse(data.details),
        destination_id: data.destination_id,
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])



  return (
    <SuperadminLayout title="Update Package">
      <div className="col-lg-10">
        <div className="white_card card_height_100 mb_30">
          <div className="white_card_header">
            <div className="box_header m-0">
              <div className="main-title">
                <h3 className="m-0">Update Package Form</h3>
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