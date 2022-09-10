import { bookPackage } from '@/api/client/package';
import { isValidEmail, objectToFormData, responseErrorHandler } from '@/services/helper';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, message, Modal, Upload } from 'antd'
import { RcFile, UploadFile } from 'antd/lib/upload';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });


function BookPackageDrawer({ packDrawer, closeDrawer }: any) {
  const router = useRouter();
  const { id: destination_id } = router.query;

  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, formState: { errors }, reset, register } = useForm();


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

  function bookPackageHandler(data: any) {

    const dto = {
      ...data,
      package_id: packDrawer.id,
      destination_id,
      passport: data.passport ? data.passport[0].originFileObj : null,
      photo: data.photo ? data.photo[0].originFileObj : null
    }

    setLoading(true);
    bookPackage(objectToFormData(dto))
      .then((res: any) => {
        toast.success(res.message);
        reset();
        closeDrawer();
      })
      .catch(responseErrorHandler)
      .finally(() => setLoading(false))

  }


  return (
    <Drawer width={"30%"} style={{ top: '90px' }} title={"Book Package"} placement="right" onClose={closeDrawer} open={packDrawer} visible={!!packDrawer}>
      <form onSubmit={handleSubmit(bookPackageHandler)}>
        {/* Package Name */}
        <div className="form-group mb-3">
          <label className="form-label">Package<span className='text-danger'> *</span></label>
          <input
            disabled
            defaultValue={packDrawer?.name}
            className="form-control"
            placeholder="Enter Blog Title"
          />
        </div>
        {/* 1st row */}
        <div className='row'>
          {/* name */}
          <div className='col-md-6'>
            <div className="form-group mb-3">
              <label className="form-label">Full Name<span className='text-danger'> *</span></label>
              <input
                {...register("full_name", { required: "Name is required!" })}
                className="form-control"
                placeholder="Enter Name"
              />
              {errors?.full_name?.message &&
                <div className="text-danger">
                  {errors?.full_name?.message + ""}
                </div>
              }
            </div>
          </div>
          {/* phone */}
          <div className='col-md-6'>
            <div className="form-group mb-3">
              <label className="form-label">Phone<span className='text-danger'> *</span></label>
              <input
                {...register("phone", { required: "Phone number is required!" })}
                className="form-control"
                placeholder="Enter Phone"
              />
              {errors?.phone?.message &&
                <div className="text-danger">
                  {errors?.phone?.message + ""}
                </div>
              }
            </div>
          </div>
        </div>
        {/* email */}
        <div className="form-group mb-3">
          <label className="form-label">Email<span className='text-danger'> *</span></label>
          <input
            {...register("email", {
              required: "Email is required!",
              validate: val => isValidEmail(val) || "Email must be valid!"
            })}
            className="form-control"
            placeholder="Enter Email"
          />
          {errors?.email?.message &&
            <div className="text-danger">
              {errors?.email?.message + ""}
            </div>
          }
        </div>
        <div className='row'>
          {/* Address */}
          <div className='col-md-6'>
            <div className="form-group mb-3">
              <label className="form-label">Address<span className='text-danger'> *</span></label>
              <input
                {...register("address", { required: "Address is required!" })}
                className="form-control"
                placeholder="Enter Address"
              />
              {errors?.address?.message &&
                <div className="text-danger">
                  {errors?.address?.message + ""}
                </div>
              }
            </div>
          </div>
          {/* country */}
          <div className='col-md-6'>
            <div className="form-group mb-3">
              <label className="form-label">Country<span className='text-danger'> *</span></label>
              <input
                {...register("country", { required: "Country is required!" })}
                className="form-control"
                placeholder="Enter Country"
              />
              {errors?.country?.message &&
                <div className="text-danger">
                  {errors?.country?.message + ""}
                </div>
              }
            </div>
          </div>
        </div>
        <div className='row'>
          {/* arrival */}
          <div className='col-md-6'>
            <div className="form-group mb-3">
              <label className="form-label">Arrival Date<span className='text-danger'> *</span></label>
              <input
                {...register("arrival_date", { required: "Arrival is required!" })}
                className="form-control"
                placeholder="Enter Arrival Date"
              />
              {errors?.arrival_date?.message &&
                <div className="text-danger">
                  {errors?.arrival_date?.message + ""}
                </div>
              }
            </div>
          </div>
          {/* departure */}
          <div className='col-md-6'>
            <div className="form-group mb-3">
              <label className="form-label">Departure Date<span className='text-danger'> *</span></label>
              <input
                {...register("departure_date", { required: "Departure is required!" })}
                className="form-control"
                placeholder="Enter Departure Date"
              />
              {errors?.departure_date?.message &&
                <div className="text-danger">
                  {errors?.departure_date?.message + ""}
                </div>
              }
            </div>
          </div>
        </div>
        {/* number_of_guests */}
        <div className='col-md-6'>
          <div className="form-group mb-3">
            <label className="form-label">No. of Guests<span className='text-danger'> *</span></label>
            <input
              {...register("number_of_guests", { required: "Guests is required!" })}
              className="form-control"
              placeholder="Enter No. of Guests"
            />
            {errors?.number_of_guests?.message &&
              <div className="text-danger">
                {errors?.number_of_guests?.message + ""}
              </div>
            }
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            {/* 6th row */}
            <div className="form-group my-4">
              <label className="form-label">Passport Front<span className='text-danger'> *</span></label>
              <Controller
                control={control}
                name="passport"
                rules={{ required: "Passport Front is required!" }}
                render={({ field: { onChange, value } }) =>
                  <>
                    <Upload
                      multiple={false}
                      accept='image/*'
                      beforeUpload={beforeUpload}
                      listType="picture-card"
                      fileList={value}
                      onPreview={handlePreview}
                      onChange={({ fileList }: any) => onChange(fileList)}
                    >
                      {value?.length ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                    {errors?.passport?.message &&
                      <div className="text-danger">
                        {errors?.passport?.message + ""}
                      </div>
                    }
                  </>
                }
              />
            </div>
          </div>
          <div className='col-md-6'>
            {/* 6th row */}
            <div className="form-group my-4">
              <label className="form-label">Personal Photo</label>
              <Controller
                control={control}
                name="photo"
                render={({ field: { onChange, value } }) =>
                  <>
                    <Upload
                      multiple={false}
                      accept='image/*'
                      beforeUpload={beforeUpload}
                      listType="picture-card"
                      fileList={value}
                      onPreview={handlePreview}
                      onChange={({ fileList }: any) => onChange(fileList)}
                    >
                      {value?.length ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                  </>
                }
              />
            </div>
          </div>
        </div>
        <Button className='btn btn-admin-primary' loading={loading}
          htmlType="submit"
        >Submit</Button>
      </form>
    </Drawer>
  )
}


function beforeUpload(file: RcFile) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    toast.error('You can only upload JPG/PNG file!');
    return Upload.LIST_IGNORE;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    toast.error('Image must smaller than 2MB!');
    return Upload.LIST_IGNORE;
  }
  return isJpgOrPng && isLt2M;
};

export default BookPackageDrawer