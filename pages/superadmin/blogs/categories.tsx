import { createBlogCategory } from '@/api/superadmin/blog';
import { createCountry } from '@/api/superadmin/miscs';
import SuperadminLayout from '@/components/layout/superadmin'
import CategoryList from '@/components/superadmin/blog/category/table';
import CountryList from '@/components/superadmin/miscs/country/table';
import { capitalizeInitials, isValidPassword, responseErrorHandler } from '@/services/helper';
import { Button } from 'antd';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import useSWR from 'swr';

function CreateHotels() {
  const [loading, setLoading] = useState(false);
  const { reset, register, formState: { errors }, handleSubmit, setError } = useForm()
  const { mutate } = useSWR('/admin/blog/categories/all');

  function createHotelHandler({ title }: any) {
    setLoading(true);
    createBlogCategory({ title: capitalizeInitials(title) })
      .then((res: any) => {
        toast.success(res.message);
        mutate();
        reset();
      })
      .catch((err: any) => responseErrorHandler(err, setError))
      .finally(() => setLoading(false))
  }

  return (
    <SuperadminLayout title="Create Categories">
      <div className="col-lg-6">
        <div className="white_card mb_30">
          <div className="white_card_header">
            <div className="box_header m-0">
              <div className="main-title">
                <h3 className="m-0">Create Categories</h3>
              </div>
            </div>
          </div>
          <div className="white_card_body">
            <form onSubmit={handleSubmit(createHotelHandler)}>
              <div className="form-group mb-3">
                <label className="form-label">Category Title</label>
                <input
                  {...register("title", { required: "Category Title is required!" })}
                  aria-invalid={!!errors?.title?.message}
                  className="form-control"
                  placeholder="Category Title"
                />
                {errors?.title?.message &&
                  <div className="text-danger">
                    {errors?.title?.message + ""}
                  </div>
                }
              </div>
              <Button loading={loading} htmlType="submit" className="btn btn-admin-primary">Submit</Button>
            </form>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <CategoryList />
      </div>
    </SuperadminLayout>
  )
}

export default CreateHotels