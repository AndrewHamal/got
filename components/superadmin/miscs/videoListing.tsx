import { deleteVideoListing, updateVideoListing } from '@/api/superadmin/miscs';
import { responseErrorHandler } from '@/services/helper';
import { Form, Input, Pagination, Popconfirm, Skeleton, Table, Typography } from 'antd';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';

interface Item {
  sn: string;
  id: number;
  title: string;
  youtube_link: string;
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

const VideoList: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { data, mutate, error } = useSWR(`/admin/video?${page}`);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<number | null | any>(null);
  const isEditing = (record: Item) => record.id === editingKey;

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
      width: '25%'
    },
    {
      title: 'Title',
      dataIndex: 'title',
      width: '25%',
      editable: true,
    },
    {
      title: 'Youtube Id',
      dataIndex: 'youtube_link',
      width: '25%',
      editable: true,
      render: (id: any) => <a href={`https://www.youtube.com/watch?v=${id}`} target={"_blank"} rel="noreferrer">{id}</a>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => updateVideoHandler(record.id)} style={{ marginRight: 8 }}>
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
            <Popconfirm title="Are you sure to delete the video?" onConfirm={() => deleteVideoHandler(record)}>
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

  function updateVideoHandler(id: any) {
    const updatedTitle = form.getFieldValue("title");
    const updatedLink = form.getFieldValue("youtube_link");
    setEditingKey(null);

    // update locally
    mutate({
      ...data,
      data: data?.data?.map((video: any) => {
        if (video.id === id) {
          return ({
            ...video,
            title: updatedTitle,
            youtube_link: updatedLink,
          })
        } else {
          return video
        }
      })
    }, false)

    updateVideoListing(id, {
      title: updatedTitle,
      youtube_link: updatedLink,
    })
      .then((res: any) => {
        toast.success(res.message);
      })
      .catch(responseErrorHandler)
      .finally(mutate)

  }

  function deleteVideoHandler(record: any) {

    mutate(data?.filter((video: any) => video.id !== record.id), false)
    setEditingKey(null);
    deleteVideoListing(record.id)
      .then((res: any) => {
        toast.success(res.message);
      })
      .catch(responseErrorHandler)
      .finally(mutate)

  }

  return (
    <Form form={form} component={false}>
      {
        !data && !error ? <Skeleton active />
          :
          <>
            <Table
              pagination={false}
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              // @ts-ignore
              dataSource={data?.data?.map((video, i) => ({ ...video, sn: i + 1 }))}
              columns={mergedColumns}
              rowClassName="editable-row"
            />
            <div className="col-lg-12">
              <div className="pagination_area">
                <Pagination
                  style={{ visibility: data?.last_page > 1 ? "visible" : "hidden" }}
                  onChange={setPage}
                  className='pagination'
                  defaultCurrent={data.current_page}
                  pageSize={data.per_page}
                  total={data.total}
                />
              </div>
            </div>
          </>
      }
    </Form>
  );
};

export default VideoList;