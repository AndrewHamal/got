import { createHotelAdmin } from '@/api/superadmin/hotel';
import SuperadminLayout from '@/components/layout/superadmin'
import { isValidPassword, responseErrorHandler } from '@/services/helper';
import { Button, message, Modal, Upload } from 'antd';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
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


function CreateHotels() {
  const [loading, setLoading] = useState(false);
  const { reset, control, register, formState: { errors }, handleSubmit, setError } = useForm()

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
    <SuperadminLayout title="Create Blog">
      <div className="col-lg-6">
        <div className="white_card card_height_100 mb_30">
          <div className="white_card_header">
            <div className="box_header m-0">
              <div className="main-title">
                <h3 className="m-0">Create Blog Form</h3>
              </div>
            </div>
          </div>
          <div className="white_card_body">
            <h6 className="card-subtitle mb-4">
              {/* Create new hotel admin and share credentials ONLY to trusted people */}
            </h6>
            <form onSubmit={handleSubmit(createHotelHandler)}>
              {/* 1st row */}
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label">Title<span className='text-danger'> *</span></label>
                    <input
                      {...register("name", { required: "Title is required!" })}
                      aria-invalid={!!errors?.name?.message}
                      className="form-control"
                      placeholder="Enter Blog Title"
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
                    <label className="form-label">Read Time (in minutes)<span className='text-danger'> *</span></label>
                    <input
                      {...register("name", { required: "Title is required!" })}
                      aria-invalid={!!errors?.name?.message}
                      className="form-control"
                      placeholder="eg: 8"
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
              <div className="form-group mb-3">
                <label className="form-label">Description<span className='text-danger'> *</span></label>
                <Controller name="description"
                  control={control}
                  rules={{ required: "Description is required!" }}
                  render={({ field: { value, onChange } }) =>
                    <>
                      <div className='wysiwyg-wrapper'>
                        <Editor
                          // @ts-ignore
                          initialContentState={null}
                          onContentStateChange={onChange}
                        />
                      </div>
                      {errors?.description?.message &&
                        <div className="text-danger">
                          {errors?.description?.message + ""}
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
                  render={({ field: { onChange, value } }) =>
                    <>
                      <Upload
                        beforeUpload={beforeUpload}
                        maxCount={5}
                        listType="picture-card"
                        fileList={value}
                        onPreview={handlePreview}
                        onChange={({ fileList }: any) => onChange(fileList)}
                      >
                        {value?.length >= 8 ? null : uploadButton}
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
          </div>
        </div>
      </div>
    </SuperadminLayout>
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


export default CreateHotels