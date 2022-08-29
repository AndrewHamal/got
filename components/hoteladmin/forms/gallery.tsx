import { responseErrorHandler } from '@/services/helper';
import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal, Upload, UploadFile } from 'antd';
import { RcFile } from 'antd/lib/upload';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });


function HotelGalleryComponent() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, control } = useForm();

  // antd room images
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


  function submitImageHandler(data: any) {
    setLoading(true);
    /**
     * submitImages(objectToFormData(data))
     .catch(responseErrorHandler)
     .finally(()=> setLoading(false))
    */
  }


  return (
    <div>
      <label className="form-label">Hotel Images<span className='text-danger'> *</span></label>
      <Controller
        control={control}
        name="files"
        rules={{ required: "Atleast one file required!" }}
        render={({ field: { onChange, value } }) =>
          <>
            <Upload
              className='my-3'
              beforeUpload={beforeUpload}
              maxCount={10}
              listType="picture-card"
              fileList={value}
              onPreview={handlePreview}
              onChange={({ fileList }: any) => onChange(fileList)}
            >
              {value?.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
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
      <Button className="btn btn-admin-primary">Submit</Button>
    </div>
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


export default HotelGalleryComponent