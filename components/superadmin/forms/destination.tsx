import { Button, message, Modal, Select, Skeleton, Upload } from 'antd';
import React, { useState } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import dynamic from 'next/dynamic';
import { RcFile, UploadFile } from 'antd/lib/upload';
import { PlusOutlined } from '@ant-design/icons';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { deleteDestinationFiles } from '@/api/superadmin/destination';

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
  const { data: countries, error: countryError } = useSWR('/admin/regions');

  // for setting default value on edit for wysiwyg
  const [hasRTFValue, setHasRTFValue] = useState({
    overview: !!id,
    itinarery: !!id,
    included: !!id,
    not_included: !!id,
    trek_info: !!id
  })

  // ANTD image upload
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const handleCancel = () => setPreviewVisible(false);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      {/* 1st row */}
      <div className="row">
        <div className="col-md-6">
          <div className="form-group mb-3">
            <label className="form-label">Destination Name<span className='text-danger'> *</span></label>
            <input
              {...register("name", { required: "Destination Name is required!" })}
              aria-invalid={!!errors?.name?.message}
              className="form-control"
              placeholder="Enter Destination Name"
            />
            {errors?.name?.message &&
              <div className="text-danger">
                {errors?.name?.message + ""}
              </div>
            }
          </div>
        </div>
        <div className="col-md-6">
          <label className="form-label">Region<span className='text-danger'> *</span></label>
          <div className='custom-select'>
            {
              !countries && !countryError ? <Skeleton className='mt-3' active paragraph={false} />
                :
                <Controller
                  control={control}
                  name="region_id"
                  rules={{ required: "Location is required!" }}
                  render={({ field: { onChange, value } }) =>
                    <>
                      <Select
                        value={value}
                        onChange={onChange}
                        allowClear
                        status={errors?.region_id?.message && "error"}
                        size='large'
                        className="form-control"
                        placeholder="Select Location"
                      >
                        {
                          countries.map((cat: any) => <Option key={cat.id} value={cat.id}>{cat.name}</Option>)
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
      {/* 2nd row */}
      <div className='row'>
        <div className='col-md-6'>
          <div className="form-group mb-3">
            <label className="form-label">Trip Duration (in days)<span className='text-danger'> *</span></label>
            <input
              {...register("no_of_days", { required: "Trip Duration is required!" })}
              aria-invalid={!!errors?.no_of_days?.message}
              className="form-control"
              placeholder="eg: 5"
            />
            {errors?.no_of_days?.message &&
              <div className="text-danger">
                {errors?.no_of_days?.message + ""}
              </div>
            }
          </div>
        </div>
        <div className='col-md-6'>
          <div className="form-group mb-3">
            <label className="form-label">Starting Price<span className='text-danger'> *</span></label>
            <input
              {...register("starting_from", { required: "Price is required!" })}
              aria-invalid={!!errors?.starting_from?.message}
              className="form-control"
              placeholder="eg: 4000"
            />
            {errors?.starting_from?.message &&
              <div className="text-danger">
                {errors?.starting_from?.message + ""}
              </div>
            }
          </div>
        </div>
      </div>
      {/* 3rd row */}
      <div className='row'>
        <div className='col-md-4'>
          <div className="form-group mb-3">
            <label className="form-label">Latitude<span className='text-danger'> *</span></label>
            <input
              {...register("lat", {
                required: "Price is required!",
                validate: val => !isNaN(val) || "Latitude must be a number"
              })}
              aria-invalid={!!errors?.lat?.message}
              className="form-control"
              placeholder="Enter Destination Latitude"
            />
            {errors?.lat?.message &&
              <div className="text-danger">
                {errors?.lat?.message + ""}
              </div>
            }
          </div>
        </div>
        <div className='col-md-4'>
          <div className="form-group mb-3">
            <label className="form-label">Longitude<span className='text-danger'> *</span></label>
            <input
              {...register("long", {
                required: "Longitude is required!",
                validate: val => !isNaN(val) || "Longitude must be a number"
              })}
              aria-invalid={!!errors?.long?.message}
              className="form-control"
              placeholder="Enter Destination Longitude"
            />
            {errors?.long?.message &&
              <div className="text-danger">
                {errors?.long?.message + ""}
              </div>
            }
          </div>
        </div>
        <div className='col-md-4'>
          <div className="form-group mb-3">
            <label className="form-label">Address</label>
            <input
              {...register("whole_location")}
              className="form-control"
              placeholder="Enter Address"
            />
            {errors?.whole_location?.message &&
              <div className="text-danger">
                {errors?.whole_location?.message + ""}
              </div>
            }
          </div>
        </div>
      </div>
      {/* 4th row */}
      <div className="row">
        <div className="col-md-12">
          <div className="form-group mb-3">
            <label className="form-label">Overview<span className='text-danger'> *</span></label>
            <Controller name="overview"
              control={control}
              rules={{
                required: "Overview is required!",
                validate: val => val?.blocks[0]?.text.length || "Overview is required!"
              }}
              render={({ field: { value = null, onChange } }) =>
                <>
                  <div className='wysiwyg-wrapper'>
                    {
                      hasRTFValue.overview
                        ? <Editor
                          // @ts-ignore
                          contentState={value}
                          onContentStateChange={() => setHasRTFValue({ ...hasRTFValue, overview: false })}
                        />
                        : <Editor
                          // @ts-ignore
                          initialContentState={value}
                          onContentStateChange={onChange}
                        />
                    }
                  </div>
                  {errors?.overview?.message &&
                    <div className="text-danger">
                      {errors?.overview?.message + ""}
                    </div>
                  }
                </>
              }
            />
          </div>
        </div>
      </div>
      {/* 5th row */}
      <div className="row">
        <div className="col-md-6">
          <div className="form-group mb-3">
            <label className="form-label">Included<span className='text-danger'> *</span></label>
            <Controller name="included"
              control={control}
              rules={{
                required: "Inclusions is required!",
                validate: val => val?.blocks[0]?.text.length || "Inclusions is required!"
              }}
              render={({ field: { value = null, onChange } }) =>
                <>
                  <div className='wysiwyg-wrapper'>
                    {
                      hasRTFValue.included
                        ? <Editor
                          // @ts-ignore
                          contentState={value}
                          onContentStateChange={() => setHasRTFValue({ ...hasRTFValue, included: false })}
                        />
                        : <Editor
                          // @ts-ignore
                          initialContentState={value}
                          onContentStateChange={onChange}
                        />
                    }
                  </div>
                  {errors?.included?.message &&
                    <div className="text-danger">
                      {errors?.included?.message + ""}
                    </div>
                  }
                </>
              }
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group mb-3">
            <label className="form-label">Excluded<span className='text-danger'> *</span></label>
            <Controller name="not_included"
              control={control}
              rules={{
                required: "Exclusions is required!",
                validate: val => val?.blocks[0]?.text.length || "Exclusions is required!"
              }}
              render={({ field: { value = null, onChange } }) =>
                <>
                  <div className='wysiwyg-wrapper'>
                    {
                      hasRTFValue.not_included
                        ? <Editor
                          // @ts-ignore
                          contentState={value}
                          onContentStateChange={() => setHasRTFValue({ ...hasRTFValue, not_included: false })}
                        />
                        : <Editor
                          // @ts-ignore
                          initialContentState={value}
                          onContentStateChange={onChange}
                        />
                    }
                  </div>
                  {errors?.not_included?.message &&
                    <div className="text-danger">
                      {errors?.not_included?.message + ""}
                    </div>
                  }
                </>
              }
            />
          </div>
        </div>
      </div>
      {/* 6th row */}
      <div className="form-group mb-3">
        <label className="form-label">Additional Trek Info</label>
        <Controller name="trek_info"
          control={control}
          render={({ field: { value = null, onChange } }) =>
            <>
              <div className='wysiwyg-wrapper'>
                {
                  hasRTFValue.trek_info
                    ? <Editor
                      // @ts-ignore
                      contentState={value}
                      onContentStateChange={() => setHasRTFValue({ ...hasRTFValue, trek_info: false })}
                    />
                    : <Editor
                      // @ts-ignore
                      initialContentState={value}
                      onContentStateChange={onChange}
                    />
                }
              </div>
              {errors?.trek_info?.message &&
                <div className="text-danger">
                  {errors?.trek_info?.message + ""}
                </div>
              }
            </>
          }
        />
      </div>
      {/* 7th row */}
      <div className="form-group my-4">
        <label className="form-label">Images<span className='text-danger'> *</span></label>
        <Controller
          control={control}
          name="files"
          rules={{ required: "Atleast one file required!" }}
          render={({ field: { value, onChange } }) =>
            <>
              <Upload
                onRemove={val => { typeof val.uid === 'number' && deleteDestinationFiles(val.uid) }}
                beforeUpload={beforeUpload}
                maxCount={5}
                listType="picture-card"
                fileList={value}
                onPreview={handlePreview}
                onChange={({ fileList }: any) => onChange(fileList)}
              >
                {value?.length >= 5 ? null : uploadButton}
              </Upload>
              <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
              {errors?.files?.message &&
                <div className="text-danger">
                  {errors?.files?.message + ""}
                </div>
              }
            </>
          }
        />
      </div>
      {/* 8th row */}
      <div className="form-group my-4">
        <label className="form-label">Featured Image<span className='text-danger'> *</span></label>
        <Controller
          control={control}
          name="featured_image"
          rules={{ required: "Atleast one file required!" }}
          render={({ field: { value, onChange } }) =>
            <>
              <Upload
                onRemove={val => { typeof val.uid === 'number' && deleteDestinationFiles(val.uid) }}
                beforeUpload={beforeUpload}
                maxCount={1}
                listType="picture-card"
                fileList={value}
                onPreview={handlePreview}
                onChange={({ fileList }: any) => onChange(fileList)}
              >
                {value?.length >= 1 ? null : uploadButton}
              </Upload>
              <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example2" style={{ width: '100%' }} src={previewImage} />
              </Modal>
              {errors?.featured_image?.message &&
                <div className="text-danger">
                  {errors?.featured_image?.message + ""}
                </div>
              }
            </>
          }
        />
      </div>
      <Button loading={loading} htmlType="submit" className="btn btn-admin-primary">Submit</Button>
    </form>

  )
}

function beforeUpload(file: RcFile) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
    return Upload.LIST_IGNORE;
  }
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isLt5M) {
    message.error('Image must smaller than 5MB!');
    return Upload.LIST_IGNORE;
  }
  return isJpgOrPng && isLt5M;
};


export default CreateOrUpdateDestinationForm