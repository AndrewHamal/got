import SuperadminLayout from '@/components/layout/superadmin'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { UploadFile } from 'antd/lib/upload';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { createBlog } from '@/api/superadmin/blog';
import { objectToFormData, responseErrorHandler } from '@/services/helper';
import { toast } from 'react-toastify';
import CreateOrUpdateBlogForm from '@/components/superadmin/forms/blog';

function CreateBlog() {
  const [loading, setLoading] = useState(false);
  const formMethods = useForm();

  function createBlogHandler(data: any) {
    const dto = {
      ...data,
      body: JSON.stringify(data.body),
      featured_image: data.featured_image[0].originFileObj
    }
    setLoading(true);
    createBlog(objectToFormData(dto))
      .then((res: any) => {
        toast.success(res.message);
        formMethods.reset();
      })
      .catch((err: any) => responseErrorHandler(err, formMethods.setError))
      .finally(() => setLoading(false))
  }

  return (
    <SuperadminLayout title="Create Blog">
      <div className="col-lg-8">
        <div className="white_card card_height_100 mb_30">
          <div className="white_card_header">
            <div className="box_header m-0">
              <div className="main-title">
                <h3 className="m-0">Create Blog Form</h3>
              </div>
            </div>
          </div>
          <div className="white_card_body">
            <CreateOrUpdateBlogForm
              loading={loading}
              submitHandler={createBlogHandler}
              formMethods={formMethods}
            />
          </div>
        </div>
      </div>
    </SuperadminLayout>
  )
}

export default CreateBlog