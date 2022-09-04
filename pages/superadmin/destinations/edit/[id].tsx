import SuperadminLayout from '@/components/layout/superadmin'
import { objectToFormData, responseErrorHandler } from '@/services/helper';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import CreateOrUpdateDestinationForm from '@/components/superadmin/forms/destination';
import { Skeleton, UploadFile } from 'antd';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { updateDestination, uploadDestinationFiles } from '@/api/superadmin/destination';

function CreateHotels() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR(`/admin/destination/${id}`);
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
    updateDestination(Number(id), objectToFormData(destinationDTO))
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
      .catch((err: any) => {
        responseErrorHandler(err, formMethods.setError);
        setLoading(false)
      })
  }

  useEffect(() => {

    if (data) {
      formMethods.reset({
        name: data.name,
        region_id: data.region_id,
        no_of_days: data.no_of_days,
        starting_from: data.starting_from,
        overview: JSON.parse(data.overview),
        itinarery: JSON.parse(data.itinarery),
        included: JSON.parse(data.included),
        not_included: JSON.parse(data.not_included),
        trek_info: data.trek_info ? JSON.parse(data.trek_info) : null,
        files: data.files,
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