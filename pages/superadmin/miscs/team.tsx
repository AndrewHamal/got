import { createRegion, createTeammember } from '@/api/superadmin/miscs';
import SuperadminLayout from '@/components/layout/superadmin'
import RegionList from '@/components/superadmin/miscs/region/table';
import TeamList from '@/components/superadmin/miscs/teamList';
import { capitalizeInitials, cropTitle, objectToFormData, responseErrorHandler } from '@/services/helper';
import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal, Select, Skeleton, Upload } from 'antd';
import { RcFile, UploadFile } from 'antd/lib/upload';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import useSWR from 'swr';


const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

function CreateTeams() {
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWR('/admin/team', { revalidateOnMount: false });

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
      photo: data.photo[0].originFileObj
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
        <div className="white_card mb_30">
          <div className="white_card_header">
            <div className="box_header m-0">
              <div className="main-title">
                <h3 className="m-0">Create Team Member Form</h3>
              </div>
            </div>
          </div>
          <div className="white_card_body">
            <form onSubmit={handleSubmit(createHotelHandler)}>
              <div className="form-group mb-3">
                <div className="row">
                  <div className="col">
                    <label className="form-label">Name<span className='text-danger'> *</span></label>
                    <input
                      {...register("name", { required: "Name is required!" })}
                      aria-invalid={!!errors?.name?.message}
                      className="form-control"
                      placeholder="Enter Name Here"
                    />
                    {errors?.name?.message &&
                      <div className="text-danger">
                        {errors?.name?.message + ""}
                      </div>
                    }
                  </div>
                  <div className="col">
                    <label className="form-label">Youtube Video Id</label>
                    <input
                      {...register("youtube_link", { required: "Video Id is required!" })}
                      aria-invalid={!!errors?.youtube_link?.message}
                      className="form-control"
                      placeholder="Enter Youtube Id"
                    />
                    {errors?.youtube_link?.message &&
                      <div className="text-danger">
                        {errors?.youtube_link?.message + ""}
                      </div>
                    }
                  </div>
                </div>
                <div className='form-group mt-4'>
                  <label className="form-label">Designation<span className='text-danger'> *</span></label>
                  <input
                    {...register("designation", { required: "Designation is required!" })}
                    aria-invalid={!!errors?.youtube_link?.message}
                    className="form-control"
                    placeholder="Enter Designation Here"
                  />
                  {errors?.designation?.message &&
                    <div className="text-danger">
                      {errors?.designation?.message + ""}
                    </div>
                  }
                </div>
                <div className="form-group my-4">
                  <label className="form-label">Photo<span className='text-danger'> *</span></label>
                  <Controller
                    control={control}
                    name="photo"
                    rules={{ required: "Photo is required!" }}
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
                        {errors?.photo?.message &&
                          <div className="text-danger">
                            {errors?.photo?.message + ""}
                          </div>
                        }
                      </>
                    }
                  />
                </div>
              </div>
              <Button loading={loading} htmlType="submit" className="btn btn-admin-primary">Submit</Button>
            </form>
          </div>
        </div>
      </div >
      <div className="col-lg-6">
        <TeamList />
      </div>
    </SuperadminLayout >
  )

  function beforeUpload(file: RcFile) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
      return Upload.LIST_IGNORE;
    }
    const isLt3M = file.size / 1024 / 1024 < 3;
    if (!isLt3M) {
      message.error('Image must smaller than 3MB!');
      return Upload.LIST_IGNORE;
    }
    return isJpgOrPng && isLt3M;
  };

}

export default CreateTeams