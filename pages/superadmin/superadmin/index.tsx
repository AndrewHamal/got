import SuperadminLayout from '@/components/layout/superadmin'
import { Button } from 'antd';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

function SuperadminListing() {
  const [loading, setLoading] = useState(false);
  const { register, formState: { errors }, handleSubmit, setError } = useForm();

  function createHotelHandler(data: any) {
    console.log(data)
    // setLoading(true);
    // createHotel(data)
    //     .then((res: any) => {

    //     })
    //     .catch((err: any) => responseErrorHandler(err, setError))
    //     .finally(() => setLoading(false))
  }

  return (
    <SuperadminLayout title="Superadmin Management">
      <div className="col-lg-6">
        <div className="white_card card_height_100 mb_30">
          <div className="white_card_header">
            <div className="box_header m-0">
              <div className="main-title">
                <h3 className="m-0">Create Hotel Form</h3>
              </div>
            </div>
          </div>
          <div className="white_card_body">
            <h6 className="card-subtitle mb-4">
              Create new hotels and share credentials ONLY to trusted hotel admins
            </h6>
            <form onSubmit={handleSubmit(createHotelHandler)}>
              <div className="form-group mb-3">
                <label className="form-label" htmlFor="exampleInputEmail1">Hotel Name</label>
                <input
                  {...register("hotel_name", { required: "Hotel Name is required!" })}
                  aria-invalid={!!errors?.hotel_name?.message}
                  className="form-control"
                  placeholder="Enter Hotel Name"
                />
                {errors?.hotel_name?.message &&
                  <div className="text-danger">
                    {errors?.hotel_name?.message + ""}
                  </div>
                }
              </div>
              <div className="form-group mb-3">
                <label className="form-label" htmlFor="exampleInputEmail1">Admin Name</label>
                <input
                  {...register("admin_name", { required: "Admin Name is required!" })}
                  aria-invalid={!!errors?.admin_name?.message}
                  className="form-control"
                  placeholder="Enter Admin Name"
                />
                {errors?.admin_name?.message &&
                  <div className="text-danger">
                    {errors?.admin_name?.message + ""}
                  </div>
                }
              </div>
              <div className="form-group mb-3">
                <label className="form-label" htmlFor="exampleInputEmail1">Email</label>
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
                <label className="form-label" htmlFor="exampleInputEmail1">Password</label>
                <input
                  {...register("password", { required: "Password is required!" })}
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
              <Button htmlType="submit" className="btn btn-admin-primary">Submit</Button>
            </form>
          </div>
        </div>
      </div>
    </SuperadminLayout>
  )
}

export default SuperadminListing