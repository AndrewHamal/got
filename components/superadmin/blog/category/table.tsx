import { deleteBlogCategory, updateBlogCategory } from '@/api/superadmin/blog';
import { deleteRegion, updateRegion } from '@/api/superadmin/miscs';
import { capitalizeInitials, responseErrorHandler } from '@/services/helper';
import { Form, Input, Popconfirm, Skeleton, Table, Typography } from 'antd';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';

interface Item {
  sn: string;
  id: number;
  category?: any;
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

const CategoryList: React.FC = () => {
  const { data, mutate, error } = useSWR('/admin/blog/categories/all');
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
    },
    {
      title: 'Category Title',
      dataIndex: 'title',
      editable: true,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => updateCategoryHandler(record.id)} style={{ marginRight: 8 }}>
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
            <Popconfirm title="Are you sure to delete the category?" onConfirm={() => deleteCategoryHandler(record)}>
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

  function updateCategoryHandler(id: any) {
    const updatedTitle = capitalizeInitials(form.getFieldValue("title"));
    setEditingKey(null);

    // update locally
    mutate(data?.map((category: any) => {
      if (category.id === id) {
        return ({
          ...category,
          title: updatedTitle,
        })
      } else {
        return category
      }
    }), false)
    updateBlogCategory(id, updatedTitle)
      .then((res: any) => {
        toast.success(res.message);
      })
      .catch(responseErrorHandler)
      .finally(mutate)

  }

  function deleteCategoryHandler(record: any) {

    mutate(data?.filter((category: any) => category.id !== record.id), false)
    setEditingKey(null);
    deleteBlogCategory(record.id)
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
          <Table
            pagination={false}
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            // @ts-ignore
            dataSource={data?.map((category, i) => ({ ...category, sn: i + 1 }))}
            columns={mergedColumns}
            rowClassName="editable-row"
          />
      }
    </Form>
  );
};

export default CategoryList;