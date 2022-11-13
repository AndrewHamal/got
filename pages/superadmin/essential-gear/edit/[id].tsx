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
import CreateOrUpdateEssentialForm from '@/components/superadmin/forms/essential';
import { updateEssential } from '@/api/superadmin/destination';

function UpdateBlog() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR(id ? `/admin/essential/${id}` : null);
  const [loading, setLoading] = useState(false);
  const formMethods = useForm();

  function updateBlogHandler(data: any) {

    let form = new FormData();
    form.append('title', data.title);
    data?.image?.[0]?.originFileObj && form.append('image', data?.image?.[0]?.originFileObj);

    setLoading(true);
    updateEssential(form, Number(id))
      .then((destRes: any) => {
        toast.success(destRes.message);
        router.push(`/superadmin/essential-gear`);
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
        image: [{ uid: 1, name: `image.${data.image.split('.')[1]}`, url: data.full_path }]
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <SuperadminLayout title="Update Blog"
      breadcrumbs={[{ name: "Blogs", link: "/superadmin/essential-gear" }, { name: "Edit" }]}
    >
      <div className="col-lg-8">
        <div className="white_card card_height_100 mb_30">
          <div className="white_card_header">
            <div className="box_header m-0">
              <div className="main-title">
                <h3 className="m-0">Update Essential Gear Form</h3>
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
                <CreateOrUpdateEssentialForm
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