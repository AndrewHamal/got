/* eslint-disable @next/next/no-img-element */
import { deletePartner, updatePartner } from '@/api/superadmin/miscs';
import { capitalizeInitials, cropTitle, objectToFormData, responseErrorHandler } from '@/services/helper';
import { Form, Input, Popconfirm, Skeleton, Table, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';

interface Item {
  sn: string;
  id: number;
  youtube_link?: any;
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

const PartnerList: React.FC = () => {
  const { data, mutate, error } = useSWR('/admin/partner');

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<number | null | any>(null);
  const isEditing = (record: Item) => record.id === editingKey;

  // image upload
  const [uploadImageId, setUploadImageId] = useState<number | null | any>(null);
  const imageUploadRef = useRef<any>();

  const edit = (record: Partial<Item>) => {

    form.setFieldsValue({
      ...record,
      youtube_link: record.youtube_link.props.href
    });
    setEditingKey(record.id);
  };

  const cancel = () => setEditingKey(null);

  const columns = [
    {
      title: 'S.N',
      dataIndex: 'sn',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: 'Video Link',
      dataIndex: 'youtube_link',
      editable: true,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      width: '40%',
      editable: false,
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
            <Typography.Link onClick={() => updatePartnerHandler(record.id)} style={{ marginRight: 8 }}>
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
            <Popconfirm title="Are you sure to delete the partner?" onConfirm={() => deletePartnerHandler(record)}>
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
        editing: isEditing(record),
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
      updatePartner(uploadImageId, objectToFormData({ photo: file }))
        .then((res: any) => {
          toast.success(res.message);
        })
        .catch(responseErrorHandler)
        .finally(mutate)
    }

  }

  function updatePartnerHandler(id: any) {
    const updatedName = capitalizeInitials(form.getFieldValue("name"));
    const updatedLink = capitalizeInitials(form.getFieldValue("youtube_link"));

    setEditingKey(null);

    // update locally
    mutate(data?.map((partner: any) => {
      if (partner.id === id) {
        return ({
          ...partner,
          name: updatedName,
          youtube_link: updatedLink,
        })
      } else {
        return partner
      }
    }), false)
    updatePartner(id, { name: updatedName, youtube_link: updatedLink })
      .then((res: any) => {
        toast.success(res.message);
      })
      .catch(responseErrorHandler)
      .finally(mutate)
  }

  function deletePartnerHandler(record: any) {

    mutate(data?.filter((partner: any) => partner.id !== record.id), false)
    setEditingKey(null);
    deletePartner(record.id)
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
              dataSource={data?.map((partner, i) => ({
                ...partner,
                sn: i + 1,
                youtube_link: (
                  <a href={partner.youtube_link} target={"_blank"} rel="noreferrer">
                    <i className='fa fa-link'></i> {cropTitle(partner.youtube_link, 20)}
                  </a>
                )
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


export default PartnerList;