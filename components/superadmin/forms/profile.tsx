import { Button } from 'antd';
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { isValidUrl } from '@/services/helper';

interface IProps {
  profile: any | null
  loading: boolean
  formMethods: UseFormReturn
  submitHandler: (data: object) => void;
}

function CreateOrPfielItenaryForm({ profile, submitHandler, formMethods, loading }: IProps) {

  const { register, formState: { errors }, handleSubmit } = formMethods;

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      {/* 1st row */}
      <div className="row">
        <div className="col-md-6">
          <div className="form-group mb-3">
            <label className="form-label">Facebook Link</label>
            <input
              {...register("facebook_link", {
                validate: val => val ? (isValidUrl(val) || "Facebook link must be valid link") : undefined
              })}
              aria-invalid={!!errors?.facebook_link?.message}
              className="form-control"
              placeholder="https://facebook.com/your-link"
            />
            {errors?.facebook_link?.message &&
              <div className="text-danger">
                {errors?.facebook_link?.message + ""}
              </div>
            }
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group mb-3">
            <label className="form-label">Instagram Link</label>
            <input
              {...register("instagram_link", {
                validate: val => val ? (isValidUrl(val) || "Instagram link must be valid link") : undefined
              })}
              aria-invalid={!!errors?.instagram_link?.message}
              className="form-control"
              placeholder="https://instagram.com/your-link"
            />
            {errors?.instagram_link?.message &&
              <div className="text-danger">
                {errors?.instagram_link?.message + ""}
              </div>
            }
          </div>
        </div>

      </div>
      {/* 2nd row */}
      <div className="row">
        <div className="col-md-6">
          <div className="form-group mb-3">
            <label className="form-label">Twitter Link</label>
            <input
              {...register("twitter_link", {
                validate: val => val ? (isValidUrl(val) || "Twitter link must be valid link") : undefined
              })}
              aria-invalid={!!errors?.twitter_link?.message}
              className="form-control"
              placeholder="https://facebook.com/your-link"
            />
            {errors?.twitter_link?.message &&
              <div className="text-danger">
                {errors?.twitter_link?.message + ""}
              </div>
            }
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group mb-3">
            <label className="form-label">Linkedin Link</label>
            <input
              {...register("linkedin_link", {
                validate: val => val ? (isValidUrl(val) || "Linkedin link must be valid link") : undefined
              })}
              aria-invalid={!!errors?.linkedin_link?.message}
              className="form-control"
              placeholder="https://instagram.com/your-link"
            />
            {errors?.linkedin_link?.message &&
              <div className="text-danger">
                {errors?.linkedin_link?.message + ""}
              </div>
            }
          </div>
        </div>

      </div>
      {/* 3rd row */}
      <div className="row">
        <div className="col-md-6">
          <div className="form-group mb-3">
            <label className="form-label">Phone<span className="text-danger"> *</span></label>
            <input
              {...register("phone", { required: "Phone is required!" })}
              aria-invalid={!!errors?.phone?.message}
              className="form-control"
              placeholder="Enter Phone here"
            />
            {errors?.phone?.message &&
              <div className="text-danger">
                {errors?.phone?.message + ""}
              </div>
            }
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group mb-3">
            <label className="form-label">Contact Email<span className="text-danger"> *</span></label>
            <input
              {...register("contact_email", { required: "Contact Email is required!" })}
              aria-invalid={!!errors?.contact_email?.message}
              className="form-control"
              placeholder="Enter Email here"
            />
            {errors?.contact_email?.message &&
              <div className="text-danger">
                {errors?.contact_email?.message + ""}
              </div>
            }
          </div>
        </div>

      </div>

      <Button loading={loading} htmlType="submit" className="btn btn-admin-primary">Submit</Button>
    </form>

  )
}

export default CreateOrPfielItenaryForm