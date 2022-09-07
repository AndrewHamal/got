import { Button, message, Modal, Select, Skeleton, Upload } from 'antd';
import React, { useState } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import dynamic from 'next/dynamic';
import { RcFile, UploadFile } from 'antd/lib/upload';
import { PlusOutlined } from '@ant-design/icons';
import useSWR from 'swr';
import { useRouter } from 'next/router';

const { Option } = Select;
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod: any) => mod.Editor),
  { ssr: false }
);


const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

interface IProps {
  loading: boolean
  formMethods: UseFormReturn
  submitHandler: (data: object) => void;
}

function CreateOrUpdateDestinationForm({ submitHandler, formMethods, loading }: IProps) {
  const router = useRouter();
  const { id } = router.query;

  const { control, register, formState: { errors }, handleSubmit } = formMethods;
  const { data: destinations, error: countryError } = useSWR('/admin/destinations');

  // for setting default value on edit for wysiwyg
  const [hasRTFValue, setHasRTFValue] = useState({
    overview: !!id,
    itinarery: !!id,
    included: !!id,
    not_included: !!id,
    trek_info: !!id
  })

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      {/* 1st row */}
      <div className="row">

        <div className="col-md-6">
          <div className="form-group mb-3">
            <label className="form-label">Title<span className='text-danger'> *</span></label>
            <input
              {...register("name", { required: "Title is required!" })}
              aria-invalid={!!errors?.name?.message}
              className="form-control"
              placeholder="Enter Title"
            />
            {errors?.name?.message &&
              <div className="text-danger">
                {errors?.name?.message + ""}
              </div>
            }
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group mb-3">
            <label className="form-label">Price<span className='text-danger'> *</span></label>
            <input
              {...register("price", { required: "Price is required!" })}
              aria-invalid={!!errors?.name?.message}
              className="form-control"
              placeholder="Enter Price"
            />
            {errors?.name?.message &&
              <div className="text-danger">
                {errors?.name?.message + ""}
              </div>
            }
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
            <div className="form-group mb-3">
              <label className="form-label">Valid From<span className='text-danger'> *</span></label>
              <input
                {...register("valid_from", { required: "Valid From is required!" })}
                aria-invalid={!!errors?.name?.message}
                className="form-control"
                placeholder="Enter Valid From"
              />
              {errors?.name?.message &&
                <div className="text-danger">
                  {errors?.name?.message + ""}
                </div>
              }
            </div>
        </div>
        <div className="col-md-6">
          <div className="form-group mb-3">
            <label className="form-label">Valid Till<span className='text-danger'> *</span></label>

            <input
              {...register("valid_till", { required: "Valid Till is required!" })}
              aria-invalid={!!errors?.name?.message}
              className="form-control"
              placeholder="Enter Valid Till"
            />

            {errors?.name?.message &&
              <div className="text-danger">
                {errors?.name?.message + ""}
              </div>
            }
          </div>
        </div>
      </div>
      {/* 2nd row */}
      <div className='row'>
        <div className="col-md-6">
          <label className="form-label">Destination<span className='text-danger'> *</span></label>
          <div className='custom-select'>
            {
              !destinations && !countryError ? <Skeleton className='mt-3' active paragraph={false} />
                :
                <Controller
                  control={control}
                  name="destination_id"
                  rules={{ required: "Destination is required!" }}
                  render={({ field: { onChange, value } }) =>
                    <>
                      <Select
                        value={value}
                        onChange={onChange}
                        allowClear
                        status={errors?.region_id?.message && "error"}
                        size='large'
                        className="form-control"
                        placeholder="Select Destination"
                      >
                        {
                          destinations.map((cat: any) => <Option key={cat.id} value={cat.id}>{cat.name.toUpperCase()}</Option>)
                        }
                      </Select>
                      {errors?.region_id?.message &&
                        <div className="text-danger">
                          {errors?.region_id?.message + ""}
                        </div>
                      }
                    </>
                  }
                />
            }
          </div>
        </div>
      </div>

      {/* 3rd row */}
      <div className="row mt-3">
        <div className="col-md-12">
          <div className="form-group mb-3">
            <label className="form-label">Details<span className='text-danger'> *</span></label>
            <Controller name="details"
              control={control}
              rules={{
                required: "Detail is required!",
                validate: val => val?.blocks[0]?.text.length || "Detail is required!"
              }}
              render={({ field: { value = null, onChange } }) =>
                <>
                  <div className='wysiwyg-wrapper'>
                    {
                      hasRTFValue.itinarery
                        ? <Editor
                          // @ts-ignore
                          contentState={value}
                          onContentStateChange={() => setHasRTFValue({ ...hasRTFValue, itinarery: false })}
                        />
                        : <Editor
                          // @ts-ignore
                          initialContentState={value}
                          onContentStateChange={onChange}
                        />
                    }
                  </div>
                  {errors?.itinarery?.message &&
                    <div className="text-danger">
                      {errors?.itinarery?.message + ""}
                    </div>
                  }
                </>
              }
            />
          </div>
        </div>
      </div>
  
      <Button loading={loading} htmlType="submit" className="btn btn-admin-primary">Submit</Button>
    </form>

  )
}

export default CreateOrUpdateDestinationForm