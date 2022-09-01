import SuperadminLayout from '@/components/layout/superadmin'
import { objectToFormData, responseErrorHandler } from '@/services/helper';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { createDestination } from '@/api/superadmin/desctination';
import CreateOrUpdateDestinationForm from '@/components/superadmin/forms/destination';
import { Skeleton, UploadFile } from 'antd';
import useSWR from 'swr';
import { useRouter } from 'next/router';

function CreateHotels() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR(`/destinations/${id}`);
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

    // setLoading(true);
    // createDestination(objectToFormData(dto))
    //   .then((res: any) => {
    //     toast.success(res.message);
    //     formMethods.reset();
    //   })
    //   .catch((err: any) => responseErrorHandler(err, formMethods.setError))
    //   .finally(() => setLoading(false))
  }

  useEffect(() => {

    if (data) {
      formMethods.reset({
        name: data.name,
        description: data.description,
        read_time: data.read_time,
        files: data.files,
        tags: data.tags
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])


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