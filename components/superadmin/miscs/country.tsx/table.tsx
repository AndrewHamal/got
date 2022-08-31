import { updateCountry } from '@/api/superadmin/miscs';
import { responseErrorHandler } from '@/services/helper';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useSWR, { mutate } from 'swr';

interface Item {
  sn: string;
  id: number;
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

const CountryList: React.FC = () => {
  const { data, mutate } = useSWR('/admin/countries', {
    revalidateOnMount: false,
    fallbackData: [
      {
        id: 1,
        name: "Nepal"
      },
      {
        id: 2,
        name: "India"
      },
      {
        id: 3,
        name: "China"
      },
    ]
  });
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
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => updateCountryHandler(record.id)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== null} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
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

  function updateCountryHandler(id: any) {
    const updatedName = form.getFieldValue("name");
    mutate(data?.map(country => {
      if (country.id === id) {
        return ({
          ...country,
          name: updatedName,
        })
      } else {
        return country
      }
    }), false)
    setEditingKey(null)
    // updateCountry(id, name)
    //   .then((res: any) => {
    //     toast.success(res.message);
    //   })
    //   .catch(responseErrorHandler)
    //   .finally(mutate)
  }

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        // @ts-ignore
        dataSource={data?.map((country, i) => ({ ...country, sn: i + 1 }))}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default CountryList;