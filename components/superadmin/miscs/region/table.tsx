/* eslint-disable @next/next/no-img-element */
import { deleteRegion, updateRegion } from '@/api/superadmin/miscs';
import { capitalizeInitials, objectToFormData, responseErrorHandler } from '@/services/helper';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, message, Modal, Popconfirm, Skeleton, Table, Typography, Upload } from 'antd';
import { RcFile, UploadFile } from 'antd/lib/upload';
import React, { ReactElement, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import useSWR from 'swr';

interface Item {
  sn: string;
  id: number;
  country?: any;
  full_path: string;
  name: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

const RegionList: React.FC = () => {
  const { data, mutate, error } = useSWR('/admin/regions');
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<number | null | any>(null);
  const isEditing = (record: Item) => record.id === editingKey;

  // image upload
  const [uploadImageId, setUploadImageId] = useState<number | null | any>(null);
  const imageUploadRef = useRef<any>();

  const edit = (record: Partial<Item>) => {
    form.setFieldsValue(record);
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey(null);
  };

  const columns = [
    {
      title: 'S.N',
      dataIndex: 'sn',
    },
    {
      title: 'Region Name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'Country',
      dataIndex: 'country',
      editable: false,
      render: (_: any, record: Item) => record?.country?.name
    },
    {
      title: 'Image',
      dataIndex: 'image',
      width: '40%',
      editable: true,
      render: (_: any, record: Item) => (
        <>
          <img
            onClick={() => {
              setUploadImageId(record.id);
              imageUploadRef?.current?.click();
            }}
            className='cursor-pointer'
            style={{ height: "100px", width: "100%", objectFit: "cover" }}
            src={record.full_path ?? "/client/assets/img/imageplaceholder.jpg"}
            alt={"placeholder"}
          />

        </>
      )
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => updateRegionHandler(record.id)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Typography.Link onClick={cancel}>
              Cancel
            </Typography.Link>
          </span>
        ) : (
          <>
            <Typography.Link style={{ marginRight: 8 }} disabled={editingKey !== null} onClick={() => edit(record)}>
              Edit
            </Typography.Link>
            <Popconfirm title="Are you sure to delete the country?" onConfirm={() => deleteRegionHandler(record)}>
              <Typography.Link disabled={editingKey !== null}>
                Delete
              </Typography.Link>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: col.dataIndex === "name" ? isEditing(record) : null,
      }),
    };
  });

  function uploadImageHandler(file: any) {
    if (file) {
      // update locally
      mutate(data?.map((region: any) => {
        if (region.id === uploadImageId) {
          return ({
            ...region,
            full_path: URL.createObjectURL(file),
          })
        } else {
          return region
        }
      }), false)
      updateRegion(uploadImageId, objectToFormData({ image: file }))
        .then((res: any) => {
          toast.success(res.message);
        })
        .catch(responseErrorHandler)
        .finally(mutate)
    }

  }

  function updateRegionHandler(id: any) {
    const updatedName = capitalizeInitials(form.getFieldValue("name"));

    setEditingKey(null);

    // update locally
    mutate(data?.map((region: any) => {
      if (region.id === id) {
        return ({
          ...region,
          name: updatedName,
        })
      } else {
        return region
      }
    }), false)
    updateRegion(id, { name: updatedName })
      .then((res: any) => {
        toast.success(res.message);
      })
      .catch(responseErrorHandler)
      .finally(mutate)
  }

  function deleteRegionHandler(record: any) {

    mutate(data?.filter((country: any) => country.id !== record.id), false)
    setEditingKey(null);
    deleteRegion(record.id)
      .then((res: any) => {
        toast.success(res.message);
      })
      .catch(responseErrorHandler)
      .finally(mutate)

  }

  return (
    <>
      <Form form={form} component={false}>
        {
          !data && !error ? <Skeleton active />
            :
            <Table
              pagination={false}
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              // @ts-ignore
              dataSource={data?.map((country, i) => ({
                ...country,
                sn: i + 1
              }))}
              columns={mergedColumns}
              rowClassName="editable-row"
            />
        }

      </Form>
      <input
        accept='image/*'
        type={"file"}
        style={{ visibility: "hidden" }}
        ref={imageUploadRef}
        //  @ts-ignore  
        onChange={e => uploadImageHandler(e?.target?.files[0])}
      />
    </>
  );
};


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


export default RegionList;