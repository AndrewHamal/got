import { createHotelAdmin } from '@/api/superadmin/hotel';
import SuperadminLayout from '@/components/layout/superadmin'
import CountryList from '@/components/superadmin/miscs/country.tsx/table';
import { isValidPassword, responseErrorHandler } from '@/services/helper';
import { Button } from 'antd';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';

function CreateHotels() {
  const [loading, setLoading] = useState(false);
  const { reset, getValues, register, formState: { errors }, handleSubmit, setError } = useForm()

  function createHotelHandler(data: any) {
    setLoading(true);
    createHotelAdmin(data)
      .then((res: any) => {
        toast.success(res.message);
        reset();
      })
      .catch((err: any) => responseErrorHandler(err, setError))
      .finally(() => setLoading(false))
  }

  return (
    <SuperadminLayout title="Create Country">
      <div className="col-lg-6">
        <div className="white_card mb_30">
          <div className="white_card_header">
            <div className="box_header m-0">
              <div className="main-title">
                <h3 className="m-0">Create Country</h3>
              </div>
            </div>
          </div>
          <div className="white_card_body">
            <form onSubmit={handleSubmit(createHotelHandler)}>
              <div className="form-group mb-3">
                <label className="form-label">Country Name</label>
                <input
                  {...register("name", { required: "Country Name is required!" })}
                  aria-invalid={!!errors?.name?.message}
                  className="form-control"
                  placeholder="Country Name"
                />
                {errors?.name?.message &&
                  <div className="text-danger">
                    {errors?.name?.message + ""}
                  </div>
                }
              </div>
              <Button loading={loading} htmlType="submit" className="btn btn-admin-primary">Submit</Button>
            </form>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <CountryList />
      </div>
    </SuperadminLayout>
  )
}

export default CreateHotels