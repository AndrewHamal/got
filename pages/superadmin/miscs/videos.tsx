import { createRegion, createTeammember } from '@/api/superadmin/miscs';
import SuperadminLayout from '@/components/layout/superadmin'
import RegionList from '@/components/superadmin/miscs/region/table';
import { capitalizeInitials, objectToFormData, responseErrorHandler } from '@/services/helper';
import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal, Select, Skeleton, Upload } from 'antd';
import { RcFile, UploadFile } from 'antd/lib/upload';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import useSWR from 'swr';
const { Option } = Select;


const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

function CreateTeams() {
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWR('/admin/regions', { revalidateOnMount: false });
  const { data: countries, error: countryError } = useSWR('/admin/country');

  const { reset, control, register, formState: { errors }, handleSubmit, setError } = useForm();

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

    const dto = {
      ...data,
      name: capitalizeInitials(data.name),
      image: data.image[0].originFileObj
    }

    setLoading(true);
    createTeammember(objectToFormData(dto))
      .then((res: any) => {
        toast.success(res.message);
        reset();
        mutate();
      })
      .catch((err: any) => responseErrorHandler(err, setError))
      .finally(() => setLoading(false))
  }

  return (
    <SuperadminLayout title="Create Team Member">
      <div className="col-lg-6">
        {/* trailer video */}
        <div className="white_card mb_30">
          <div className="white_card_header">
            <div className="box_header m-0">
              <div className="main-title">
                <h3 className="m-0">Trailer Video Form</h3>
              </div>
            </div>
          </div>
          <div className="white_card_body">
            <form onSubmit={handleSubmit(createHotelHandler)}>
              <div className="form-group mb-3">
                <div className="row">
                  <div className="col-md-4">
                    <label className="form-label">Youtube Video Id<span className='text-danger'> *</span></label>
                    <input
                      {...register("video_id", { required: "Video Id is required!" })}
                      aria-invalid={!!errors?.video_id?.message}
                      className="form-control"
                      placeholder="Enter Video Id"
                    />
                    {errors?.video_id?.message &&
                      <div className="text-danger">
                        {errors?.video_id?.message + ""}
                      </div>
                    }
                  </div>
                </div>
              </div>
              <Button loading={loading} htmlType="submit" className="btn btn-admin-primary">Submit</Button>
            </form>
          </div>
        </div>
        {/* video list */}
        <div className="white_card mb_30">
          <div className="white_card_header">
            <div className="box_header m-0">
              <div className="main-title">
                <h3 className="m-0">Listing Video Form</h3>
              </div>
            </div>
          </div>
          <div className="white_card_body">
            <form onSubmit={handleSubmit(createHotelHandler)}>
              <div className="form-group mb-3">
                <div className="row">
                  <div className="col">
                    <label className="form-label">Trailer Video Id<span className='text-danger'> *</span></label>
                    <input
                      {...register("video_id", { required: "Video Id is required!" })}
                      aria-invalid={!!errors?.video_id?.message}
                      className="form-control"
                      placeholder="Enter Trailer Video Id"
                    />
                    {errors?.video_id?.message &&
                      <div className="text-danger">
                        {errors?.video_id?.message + ""}
                      </div>
                    }
                  </div>
                </div>
              </div>
              <Button loading={loading} htmlType="submit" className="btn btn-admin-primary">Submit</Button>
            </form>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <RegionList />
      </div>
    </SuperadminLayout>
  )

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

}

export default CreateTeams