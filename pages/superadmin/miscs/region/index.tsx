import { createHotelAdmin } from '@/api/superadmin/hotel';
import SuperadminLayout from '@/components/layout/superadmin'
import CountryList from '@/components/superadmin/miscs/country.tsx/table';
import axiosClient from '@/services/axios/clientfetch';
import { isValidPassword, responseErrorHandler } from '@/services/helper';
import { Button, Select, Skeleton } from 'antd';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import useSWR from 'swr';
const { Option } = Select;
const catFetcher = (url: string) => axiosClient(url).then((res: any) => res);

function CreateRegions() {
  const [loading, setLoading] = useState(false);
  const { data: categories, error: catError } = useSWR(`/hotel/get-categories`, catFetcher);


  const { reset, control, register, formState: { errors }, handleSubmit, setError } = useForm()

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
    <SuperadminLayout title="Create Regions">
      <div className="col-lg-6">
        <div className="white_card mb_30">
          <div className="white_card_header">
            <div className="box_header m-0">
              <div className="main-title">
                <h3 className="m-0">Create Regions</h3>
              </div>
            </div>
          </div>
          <div className="white_card_body">
            <form onSubmit={handleSubmit(createHotelHandler)}>
              <div className="form-group mb-3">
                <div className="row">
                  <div className="col">
                    <label className="form-label">Region Name</label>
                    <input
                      {...register("name", { required: "Region Name is required!" })}
                      aria-invalid={!!errors?.name?.message}
                      className="form-control"
                      placeholder="Region Name"
                    />
                    {errors?.name?.message &&
                      <div className="text-danger">
                        {errors?.name?.message + ""}
                      </div>
                    }
                  </div>
                  <div className="col">
                    <label className="form-label">Country</label>
                    <div className='custom-select'>
                      {
                        !categories && !catError ? <Skeleton className='mt-3' active paragraph={false} />
                          :
                          <Controller
                            control={control}
                            name="country_id"
                            rules={{ required: "Country is required!" }}
                            render={({ field: { onChange, value } }) =>
                              <>
                                <Select
                                  value={value}
                                  onChange={onChange}
                                  allowClear
                                  status={errors?.country_id?.message && "error"}
                                  size='large'
                                  className="form-control"
                                  placeholder="Select Country"
                                >
                                  {
                                    categories.map((cat: any) => <Option key={cat.id} value={cat.id}>{cat.title}</Option>)
                                  }
                                </Select>
                                {errors?.country_id?.message &&
                                  <div className="text-danger">
                                    {errors?.country_id?.message + ""}
                                  </div>
                                }
                              </>
                            }
                          />
                      }
                    </div>
                  </div>
                </div>
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

export default CreateRegions