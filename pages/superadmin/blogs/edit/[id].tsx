import SuperadminLayout from '@/components/layout/superadmin'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { UploadFile } from 'antd/lib/upload';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { updateBlog } from '@/api/superadmin/blog';
import { objectToFormData, responseErrorHandler } from '@/services/helper';
import { toast } from 'react-toastify';
import CreateOrUpdateBlogForm from '@/components/superadmin/forms/blog';
import useSWR from 'swr';
import { Skeleton } from 'antd';

function UpdateBlog() {
  const { data } = useSWR('/blogs');
  const [loading, setLoading] = useState(false);
  const formMethods = useForm();

  function updateBlogHandler(data: any) {
    const dto = {
      ...data,
      description: JSON.stringify(data.description),
      files: data.files.map((file: UploadFile) => file.originFileObj)
    }
    console.log({ dto })
    // setLoading(true);
    // updateBlog(objectToFormData(dto))
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
    <SuperadminLayout title="Update Blog">
      <div className="col-lg-6">
        <div className="white_card card_height_100 mb_30">
          <div className="white_card_header">
            <div className="box_header m-0">
              <div className="main-title">
                <h3 className="m-0">Update Blog Form</h3>
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
                <CreateOrUpdateBlogForm
                  loading={loading}
                  submitHandler={updateBlogHandler}
                  formMethods={formMethods}
                />
            }
          </div>
        </div>
      </div>
    </SuperadminLayout>
  )
}

export default UpdateBlog