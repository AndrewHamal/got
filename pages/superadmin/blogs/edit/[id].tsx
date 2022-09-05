import SuperadminLayout from '@/components/layout/superadmin'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { updateBlog } from '@/api/superadmin/blog';
import { objectToFormData, responseErrorHandler } from '@/services/helper';
import { toast } from 'react-toastify';
import CreateOrUpdateBlogForm from '@/components/superadmin/forms/blog';
import useSWR from 'swr';
import { Skeleton } from 'antd';
import { useRouter } from 'next/router';

function UpdateBlog() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR(id ? `/admin/blog/${id}` : null);
  const [loading, setLoading] = useState(false);
  const formMethods = useForm();

  function updateBlogHandler(data: any) {
    const filesToUpload = data.featured_image.find((file: any) => !!file)
    const dto = {
      ...data,
      featured_image: filesToUpload ? filesToUpload.originFileObj : null,
      body: JSON.stringify(data.body),
    }

    setLoading(true);
    updateBlog(Number(id), objectToFormData(dto))
      .then((destRes: any) => {
        toast.success(destRes.message);
        router.push(`/superadmin/blogs`);
      })
      .catch((err: any) => {
        responseErrorHandler(err, formMethods.setError);
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {

    if (data) {
      formMethods.reset({
        title: data.title,
        category_id: data.category_id,
        youtube_link: data.youtube_link,
        body: JSON.parse(data.body),
        featured_image: [{ uid: 1, name: `image.${data.featured_image.split('.')[1]}`, url: data.full_path }]
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <SuperadminLayout title="Update Blog"
      breadcrumbs={[{ name: "Blogs", link: "/superadmin/blogs" }, { name: "Edit" }]}
    >
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