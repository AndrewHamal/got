import { createHotelAdmin } from '@/api/superadmin/hotel';
import SuperadminLayout from '@/components/layout/superadmin'
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
    <SuperadminLayout title="Hotel Management">
      <div className="col-lg-6">
        <div className="white_card card_height_100 mb_30">
          <div className="white_card_header">
            <div className="box_header m-0">
              <div className="main-title">
                <h3 className="m-0">Create Hotel Admin</h3>
              </div>
            </div>
          </div>
          <div className="white_card_body">
            <h6 className="card-subtitle mb-4">
              Create new hotel admin and share credentials ONLY to trusted people
            </h6>
            <form onSubmit={handleSubmit(createHotelHandler)}>
              <div className="form-group mb-3">
                <label className="form-label">Admin Name</label>
                <input
                  {...register("name", { required: "Admin Name is required!" })}
                  aria-invalid={!!errors?.name?.message}
                  className="form-control"
                  placeholder="Enter Admin Name"
                />
                {errors?.name?.message &&
                  <div className="text-danger">
                    {errors?.name?.message + ""}
                  </div>
                }
              </div>
              <div className="form-group mb-3">
                <label className="form-label">Email</label>
                <input
                  {...register("email", { required: "Email is required!" })}
                  aria-invalid={!!errors?.email?.message}
                  className="form-control"
                  placeholder="Enter Email"
                />
                {errors?.email?.message &&
                  <div className="text-danger">
                    {errors?.email?.message + ""}
                  </div>
                }
              </div>
              <div className="form-group mb-4">
                <label className="form-label">Password</label>
                <input
                  {...register("password", {
                    required: "Password is required!",
                    validate: pw => isValidPassword(pw) || "Password must contain - 6 characters, a symbol, an uppercase and a lowercase"
                  })}
                  aria-invalid={!!errors?.password?.message}
                  className="form-control"
                  placeholder="Enter Password"
                />
                {errors?.password?.message &&
                  <div className="text-danger">
                    {errors?.password?.message + ""}
                  </div>
                }
              </div>
              <div className="form-group mb-4">
                <label className="form-label">Confirm Password</label>
                <input
                  {...register("password_confirmation", {
                    required: "Confirm Password is required!",
                    validate: cPw => getValues("password") === cPw || "Password and Confirm Password don't match"
                  })}
                  aria-invalid={!!errors?.password_confirmation?.message}
                  className="form-control"
                  placeholder="Enter Confirm Password"
                />
                {errors?.password_confirmation?.message &&
                  <div className="text-danger">
                    {errors?.password_confirmation?.message + ""}
                  </div>
                }
              </div>
              <Button loading={loading} htmlType="submit" className="btn btn-admin-primary">Submit</Button>
            </form>
          </div>
        </div>
      </div>
    </SuperadminLayout>
  )
}

export default CreateHotels