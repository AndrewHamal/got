/* eslint-disable @next/next/no-img-element */

import { Button, message, Select, Skeleton, Upload } from 'antd';
import { RcFile } from 'antd/lib/upload';
import React, { useEffect, useState } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import dynamic from "next/dynamic";
import useSWR from 'swr';
import states from '@/states.json'
import axiosClient from '@/services/axios/clientfetch';
import useUser from '@/services/hooks/useUser';
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod: any) => mod.Editor),
  { ssr: false }
);
const catFetcher = (url: string) => axiosClient(url).then((res: any) => res);

const { Option } = Select;
const block = {
  blocks: [
    {
      key: "1",
      text: ``,
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {},
};

interface IProps {
  submitHandler: (data: any) => void;
  loading: boolean;
  formMethods: UseFormReturn;
}

function HotelForm({
  submitHandler,
  loading,
  formMethods,
}: IProps) {
  const { control, watch, getValues, register, formState: { errors }, handleSubmit } = formMethods;
  const { data: categories, error: catError } = useSWR(`/hotel/get-categories`, catFetcher);

  const [rtfChanged, setRtfChanged] = useState({
    whyChooseUs: false,
    ourFacilities: false,
  });

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Button loading={loading} htmlType="submit" className="mb-4 btn btn-admin-primary">submit form</Button>
      {/* row 1 */}
      <div className="row mb-3">
        <div className='col-md-6 col-sm-12'>
          <label className="form-label">Logo<span className='text-danger'> *</span></label>
          <Controller
            control={control}
            name="logo"
            rules={{ required: "Logo is required!" }}
            render={({ field: { onChange, value } }) =>
              <>
                <Upload
                  previewFile={value}
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={val => onChange(val.file.originFileObj)}
                >
                  {renderImagePlaceholder(value)}
                </Upload>
                {
                  errors?.logo?.message &&
                  <div className='text-danger'>
                    Logo is Required
                  </div>
                }
              </>
            }
          />
        </div>
        <div className='col-md-6 col-sm-12'>
          <label className="form-label">Cover Image</label>
          <Controller
            control={control}
            name="cover_image"
            render={({ field: { onChange, value } }) =>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader mb-3"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={val => onChange(val.file.originFileObj)}
              >
                {renderImagePlaceholder(value)}
              </Upload>
            }
          />
        </div>
      </div>
      {/* row 2 */}
      <div className="row mb-3">
        <div className="col-md-6 col-sm-12 form-group">
          <label className="form-label">Hotel Name<span className='text-danger'> *</span></label>
          <input
            {...register("name", { required: "Hotel Name is required!" })}
            aria-invalid={!!errors?.name?.message}
            className="form-control"
            placeholder="Enter Hotel Name"
          />
          {errors?.name?.message &&
            <div className="text-danger">
              {errors?.name?.message + ""}
            </div>
          }
        </div>
        <div className="col-md-6 col-sm-12 form-group">
          <label className="form-label">Category<span className='text-danger'> *</span></label>
          <div className='custom-select'>
            {
              !categories && !catError ? <Skeleton className='mt-3' active paragraph={false} />
                :
                <Controller
                  control={control}
                  name="category_id"
                  rules={{ required: "Category is required!" }}
                  render={({ field: { onChange, value } }) =>
                    <>
                      <Select
                        value={value}
                        onChange={onChange}
                        allowClear
                        status={errors?.category_id?.message && "error"}
                        size='large'
                        className="form-control"
                        placeholder="Select Category"
                      >
                        {
                          categories.map((cat: any) => <Option key={cat.id} value={cat.id}>{cat.title}</Option>)
                        }
                      </Select>
                      {errors?.category_id?.message &&
                        <div className="text-danger">
                          {errors?.category_id?.message + ""}
                        </div>
                      }
                    </>
                  }
                />
            }
          </div>
        </div>
      </div>
      {/* row 3 */}
      <div className="form-group mb-3">
        <label className="form-label">Description<span className='text-danger'> *</span></label>
        <textarea
          rows={4}
          {...register("description", {
            required: "Description is required!",
            validate: desc => desc?.length > 20 || "Description must be atleast 20 letters!"
          })}
          aria-invalid={!!errors?.description?.message}
          className="form-control"
          placeholder="Enter Description"
        />
        {errors?.description?.message &&
          <div className="text-danger">
            {errors?.description?.message + ""}
          </div>
        }

      </div>
      {/* row 4 */}
      <div className="row mb-3">
        <div className="col-md-6 col-sm-12 form-group">
          <label className="form-label">Longitude<span className='text-danger'> *</span></label>
          <input
            {...register("long", {
              required: "Longitude is required!",
              validate: val => !isNaN(Number(val)) || "Longitude must be a number!"
            })}
            aria-invalid={!!errors?.long?.message}
            className="form-control"
            placeholder="Enter Longitude"
          />
          {errors?.long?.message &&
            <div className="text-danger">
              {errors?.long?.message + ""}
            </div>
          }
        </div>
        <div className="col-md-6 col-sm-12 form-group">
          <label className="form-label">Latitude<span className='text-danger'> *</span></label>
          <input
            type="text"
            {...register("lat", {
              required: "Latitude is required!",
              validate: val => !isNaN(Number(val)) || "Latitude must be a number!"
            })}
            aria-invalid={!!errors?.lat?.message}
            className="form-control"
            placeholder="Enter Latitude"
          />
          {errors?.lat?.message &&
            <div className="text-danger">
              {errors?.lat?.message + ""}
            </div>
          }
        </div>
      </div>
      {/* row 5 */}
      <div className="row mb-3">
        <div className="col-md-4 col-sm-12 form-group">
          <label className="form-label">Country</label>
          <input
            disabled
            {...register("country", { value: "Nepal", required: "Country is required!" })}
            aria-invalid={!!errors?.country?.message}
            className="form-control"
            placeholder="Enter Country"
          />
          {errors?.country?.message &&
            <div className="text-danger">
              {errors?.country?.message + ""}
            </div>
          }
        </div>
        <div className="col-md-4 col-sm-12 form-group">
          <label className="form-label">State</label>
          <div className='custom-select'>
            <Controller
              control={control}
              name="state"
              rules={{ required: "State is required!" }}
              render={({ field: { onChange, value } }) =>
                <>
                  <Select
                    status={errors?.state?.message && "error"}
                    value={value}
                    onChange={onChange}
                    showSearch
                    allowClear
                    size='large'
                    className="form-control"
                    placeholder="Select State"
                  >
                    {
                      states.map(state => <Option key={state} value={state}>{state}</Option>)
                    }
                  </Select>
                  {errors?.state?.message &&
                    <div className="text-danger">
                      {errors?.state?.message + ""}
                    </div>
                  }
                </>
              }
            />
          </div>
        </div>
        <div className="col-md-4 col-sm-12 form-group">
          <label className="form-label">City</label>
          <input
            {...register("city", { required: "City is required!" })}
            aria-invalid={!!errors?.city?.message}
            className="form-control"
            placeholder="Enter City"
          />
          {errors?.city?.message &&
            <div className="text-danger">
              {errors?.city?.message + ""}
            </div>
          }
        </div>
      </div>
      {/* row 6 */}
      <div className="form-group mb-3">
        <label className="form-label">Why Choose Us</label>
        <Controller
          control={control}
          name="why_choose_us"
          render={({ field: { onChange, value = null } }) =>
            <div className='wysiwyg-wrapper'>
              {rtfChanged.whyChooseUs
                ?
                <Editor
                  // @ts-ignore
                  initialcontentState={value}
                  onContentStateChange={onChange}
                />
                :
                <Editor
                  // @ts-ignore
                  contentState={value}
                  onContentStateChange={(val: any) => {
                    setRtfChanged({ ...rtfChanged, whyChooseUs: true })
                    onChange(val)
                  }}
                />
              }
              {errors?.why_choose_us?.message &&
                <div className="text-danger">
                  {errors?.why_choose_us?.message + ""}
                </div>
              }
            </div>
          }
        />
      </div>
      {/* row 7 */}
      <div className="form-group mb-3">
        <label className="form-label">Our Facilities</label>
        <Controller
          control={control}
          name="our_facilities"
          render={({ field: { onChange, value = null } }) =>
            <div className='wysiwyg-wrapper'>
              {rtfChanged.ourFacilities
                ?
                <Editor
                  // @ts-ignore
                  initialcontentState={value}
                  onContentStateChange={onChange}
                />
                :
                <Editor
                  // @ts-ignore
                  contentState={value}
                  onContentStateChange={(val: any) => {
                    setRtfChanged({ ...rtfChanged, ourFacilities: true })
                    onChange(val)
                  }}
                />
              }
              {errors?.our_facilities?.message &&
                <div className="text-danger">
                  {errors?.our_facilities?.message + ""}
                </div>
              }
            </div>
          }
        />
      </div>
      <Button loading={loading} htmlType="submit" className="btn btn-admin-primary">submit form</Button>
    </form>
  )
}

function renderImagePlaceholder(value: File | string, defaultText?: string) {
  if (typeof value === "string") {
    return (
      <img
        src={value}
        alt="logo"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "top",
        }}
        className="border"
      />
    );
  } else if (value) {
    return (
      <img
        src={URL.createObjectURL(value)}
        alt="logo"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "top",
        }}
      />
    );
  } else {
    return defaultText ?? "Upload";
  }
}

function beforeUpload(file: RcFile) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

export default HotelForm