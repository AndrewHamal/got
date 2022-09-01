import { Button, message, Modal, Upload } from 'antd';
import React, { useState } from 'react'
import { Controller, useForm, UseFormReturn } from 'react-hook-form'
import dynamic from 'next/dynamic';
import { RcFile, UploadFile } from 'antd/lib/upload';
import { PlusOutlined } from '@ant-design/icons';
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
  const { control, register, formState: { errors }, handleSubmit } = formMethods;

  // image upload
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
      {/* 2nd row */}
      <div className='row'>
        <div className='col-md-6'>
          <div className="form-group mb-3">
            <label className="form-label">Trip Duration (in days)<span className='text-danger'> *</span></label>
            <input
              {...register("duration", { required: "Trip Duration is required!" })}
              aria-invalid={!!errors?.duration?.message}
              className="form-control"
              placeholder="eg: 5"
            />
            {errors?.duration?.message &&
              <div className="text-danger">
                {errors?.duration?.message + ""}
              </div>
            }
          </div>
        </div>
        <div className='col-md-6'>
          <div className="form-group mb-3">
            <label className="form-label">Cost<span className='text-danger'> *</span></label>
            <input
              {...register("cost", { required: "Cost is required!" })}
              aria-invalid={!!errors?.cost?.message}
              className="form-control"
              placeholder="eg: NRs 4000"
            />
            {errors?.cost?.message &&
              <div className="text-danger">
                {errors?.cost?.message + ""}
              </div>
            }
          </div>
        </div>
      </div>
      {/* 3rd row */}
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
                <Editor
                  // @ts-ignore
                  initialContentState={value}
                  onContentStateChange={onChange}
                />
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
      {/* 4th row */}
      <div className="form-group mb-3">
        <label className="form-label">Itenaries<span className='text-danger'> *</span></label>
        <Controller name="itenaries"
          control={control}
          rules={{
            required: "Itenaries is required!",
            validate: val => val?.blocks[0]?.text.length || "Itenaries is required!"
          }}
          render={({ field: { value = null, onChange } }) =>
            <>
              <div className='wysiwyg-wrapper'>
                <Editor
                  // @ts-ignore
                  initialContentState={value}
                  onContentStateChange={onChange}
                />
              </div>
              {errors?.itenaries?.message &&
                <div className="text-danger">
                  {errors?.itenaries?.message + ""}
                </div>
              }
            </>
          }
        />
      </div>
      {/* 5th row */}
      <div className="form-group mb-3">
        <label className="form-label">Included/Excluded<span className='text-danger'> *</span></label>
        <Controller name="included/excluded"
          control={control}
          rules={{
            required: "Included/Excluded is required!",
            validate: val => val?.blocks[0]?.text.length || "Included/Excluded is required!"
          }}
          render={({ field: { value = null, onChange } }) =>
            <>
              <div className='wysiwyg-wrapper'>
                <Editor
                  // @ts-ignore
                  initialContentState={value}
                  onContentStateChange={onChange}
                />
              </div>
              {errors?.["included/excluded"]?.message &&
                <div className="text-danger">
                  {errors?.["included/excluded"]?.message + ""}
                </div>
              }
            </>
          }
        />
      </div>
      {/* 6th row */}
      <div className="form-group my-4">
        <label className="form-label">Images<span className='text-danger'> *</span></label>
        <Controller
          control={control}
          name="files"
          rules={{ required: "Atleast one file required!" }}
          render={({ field: { value, onChange } }) =>
            <>
              <Upload
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
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
    return Upload.LIST_IGNORE;
  }
  return isJpgOrPng && isLt2M;
};


export default CreateOrUpdateDestinationForm