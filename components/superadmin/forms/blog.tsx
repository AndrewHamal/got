import { isValidUrl } from '@/services/helper';
import { Button, message, Modal, Select, Skeleton, Upload } from 'antd';
import React, { useState } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import dynamic from 'next/dynamic';
import { RcFile, UploadFile } from 'antd/lib/upload';
import { PlusOutlined } from '@ant-design/icons';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorProps } from 'draft-js';
import useSWR from 'swr';
import { useRouter } from 'next/router';
const { Option } = Select;

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod: any) => mod.Editor),
  { ssr: false }
);

interface IProps {
  loading: boolean
  formMethods: UseFormReturn
  submitHandler: (data: object) => void;
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

function CreateOrUpdateBlogForm({ loading, formMethods, submitHandler }: IProps) {
  const router = useRouter();
  const { id } = router.query;
  const { control, register, formState: { errors }, handleSubmit } = formMethods;

  const { data: categories, error: categoriesError } = useSWR('/admin/blog/categories/all');

  // for setting default value on edit for wysiwyg
  const [hasRTFValue, setHasRTFValue] = useState(!!id)


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
      <div className="row">
        <div className="col-md-6">
          <div className="form-group mb-3">
            <label className="form-label">Title<span className='text-danger'> *</span></label>
            <input
              {...register("title", { required: "Blog Title is required!" })}
              aria-invalid={!!errors?.title?.message}
              className="form-control"
              placeholder="Enter Blog Title"
            />
            {errors?.title?.message &&
              <div className="text-danger">
                {errors?.title?.message + ""}
              </div>
            }
          </div>
        </div>
        <div className="col-md-6">
          <label className="form-label">Category<span className='text-danger'> *</span></label>
          <div className='custom-select'>
            {
              !categories && !categoriesError ? <Skeleton className='mt-3' active paragraph={false} />
                :
                <Controller
                  control={control}
                  name="category_id"
                  rules={{ required: "Category is required!" }}
                  render={({ field: { onChange, value } }) =>
                    <>
                      <Select
                        value={value}
                        onChange={onChange}
                        allowClear
                        status={errors?.category_id?.message && "error"}
                        size='large'
                        className="form-control"
                        placeholder="Select Category"
                      >
                        {
                          categories.map((cat: any) => <Option key={cat.id} value={cat.id}>{cat.title}</Option>)
                        }
                      </Select>
                      {errors?.category_id?.message &&
                        <div className="text-danger">
                          {errors?.category_id?.message + ""}
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
      <div className="form-group mb-3">
        <label className="form-label">Youtube Link</label>
        <input
          {...register("youtube_link", {
            validate: url => url ? (isValidUrl(url) || "Youtube Link must be valid url") : undefined
          })}
          aria-invalid={!!errors?.youtube_link?.message}
          className="form-control"
          placeholder="eg: https://youtube.com/your-video"
        />
        {errors?.youtube_link?.message &&
          <div className="text-danger">
            {errors?.youtube_link?.message + ""}
          </div>
        }
      </div>
      {/* 3rd row */}
      <div className="form-group mb-3">
        <label className="form-label">Body<span className='text-danger'> *</span></label>
        <Controller name="body"
          control={control}
          rules={{
            required: "Body is required!",
            validate: val => val?.blocks[0]?.text.length || "Body is required!"
          }}
          render={({ field: { value = null, onChange } }) =>
            <>
              <div className='wysiwyg-wrapper'>
                {
                  hasRTFValue
                    ? <Editor
                      // @ts-ignore
                      contentState={value}
                      onContentStateChange={() => setHasRTFValue(false)}
                    />
                    : <Editor
                      // @ts-ignore
                      initialContentState={value}
                      onContentStateChange={onChange}
                    />
                }
              </div>
              {errors?.body?.message &&
                <div className="text-danger">
                  {errors?.body?.message + ""}
                </div>
              }
            </>
          }
        />
      </div>
      {/* 6th row */}
      <div className="form-group my-4">
        <label className="form-label">Blog Image<span className='text-danger'> *</span></label>
        <Controller
          control={control}
          name="featured_image"
          rules={{ required: "Blog Image is required!" }}
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
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
    return Upload.LIST_IGNORE;
  }
  return isJpgOrPng && isLt2M;
};


export default CreateOrUpdateBlogForm