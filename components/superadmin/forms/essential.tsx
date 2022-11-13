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

function CreateOrUpdateEssentialForm({ submitHandler, formMethods, loading }: IProps) {
  const router = useRouter();
  const { control, register, formState: { errors }, handleSubmit } = formMethods;

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
            <label className="form-label">Title<span className='text-danger'> *</span></label>
            <input
              {...register("title", { required: "Gear Name is required!" })}
              aria-invalid={!!errors?.name?.message}
              className="form-control"
              placeholder="Enter Gear Name"
            />
            {errors?.name?.message &&
              <div className="text-danger">
                {errors?.name?.message + ""}
              </div>
            }
          </div>
        </div>
      </div>
      {/* 8th row */}
      <div className="form-group my-4">
        <label className="form-label">Image/Logo<span className='text-danger'> *</span></label>
        <Controller
          control={control}
          name="image"
          rules={{ required: "Atleast one file required!" }}
          render={({ field: { value, onChange } }) =>
            <>
              <Upload
                onRemove={val => { typeof val?.uid === 'number' && deleteDestinationFiles(val.uid) }}
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


export default CreateOrUpdateEssentialForm