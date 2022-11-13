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
  const { data } = useSWR(id ? `/admin/destination/${id}` : null);
  const [loading, setLoading] = useState(false);
  const formMethods = useForm();

  function createDestinationHandler(data: any) {
    const dto = {
      ...data,
      files: data.files.map((file: UploadFile) => file.originFileObj),
      featured_image: data.featured_image[0].originFileObj,
      overview: JSON.stringify(data.overview),
      itinarery: JSON.stringify(data.itinarery),
      included: JSON.stringify(data.included),
      not_included: JSON.stringify(data.not_included),
      trek_info: data.trek_info?.blocks[0]?.text.length ? JSON.stringify(data.trek_info) : null,
    }

    const { files, ...destinationDTO } = dto;

    const filesToUpload = files.filter((file: any) => !!file)

    setLoading(true);
    updateDestination(Number(id), objectToFormData(destinationDTO))
      .then((destRes: any) => {
        // upload files
        if (filesToUpload.length) {
          uploadDestinationFiles(
            objectToFormData({
              files: filesToUpload,
              destination_id: id
            }))
            .then((res: any) => {
              toast.success(destRes.message);
              router.push(`/superadmin/destinations`);
            })
            .catch(responseErrorHandler)
            .finally(() => setLoading(false))
        } else {
          router.push(`/superadmin/destinations`);
          setLoading(false)
        }
      })
      .catch((err: any) => {
        responseErrorHandler(err, formMethods.setError);
        setLoading(false);
      })
  }

  useEffect(() => {

    if (data) {
      formMethods.reset({
        name: data.name,
        offer: data.offer,
        region_id: data.region_id,
        tourortrek: data.tourortrek,
        no_of_days: data.no_of_days,
        starting_from: data.starting_from,
        long: data?.location?.long,
        lat: data?.location?.lat,
        whole_location: data?.location?.whole_location,
        overview: JSON.parse(data.overview),
        itinarery: JSON.parse(data.itinarery),
        included: JSON.parse(data.included),
        not_included: JSON.parse(data.not_included),
        essentials_gears: data.essentials_gears,
        trek_info: data.trek_info ? JSON.parse(data.trek_info) : null,
        files: data.files.map((file: any) => ({
          uid: file?.id,
          name: `image.${file.type}`,
          url: file.full_path,
        }
        )),
        featured_image: [data.featured_image ? {
            uid: 1,
            name: `image.${data.featured_image.split('.')[1]}`,
            url: data.full_path,
          } : null]
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])


  return (
    <SuperadminLayout title="Update Destinations" breadcrumbs={[{ name: "Destinations", link: "/superadmin/destinations" }, { name: "Edit" }]}>
      <div className="col-lg-10">
        <div className="white_card card_height_100 mb_30">
          <div className="white_card_header">
            <div className="box_header m-0">
              <div className="main-title">
                <h3 className="m-0">Update Destination Form</h3>
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