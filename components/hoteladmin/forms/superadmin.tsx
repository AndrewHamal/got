import Password from '@/components/common/Password';
import { Button } from 'antd';
import React from 'react'
import { UseFormProps } from 'react-hook-form';

interface IProps {
  formMethods: UseFormProps
  submitHandler: (data: object) => void
  loading: boolean
}

function SuperadminForm({ formMethods, submitHandler, loading }: any) {

  const { register, formState: { errors }, handleSubmit, setError, } = formMethods;

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="form-group mb-3">
        <label className="form-label">Name</label>
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
        <Password
          {...register("password", { required: "Password is required!" })}
          placeholder="Enter Password"
          aria-invalid={!!errors?.password?.message}
        />
        {errors?.password?.message &&
          <div className="text-danger">
            {errors?.password?.message + ""}
          </div>
        }
      </div>
      <Button loading={loading} htmlType="submit" className="btn btn-admin-primary">Submit</Button>
    </form>
  )
}

export default SuperadminForm