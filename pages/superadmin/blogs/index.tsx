import { deleteBlog } from '@/api/superadmin/blog';
import { deleteDestination } from '@/api/superadmin/destination';
import SuperadminLayout from '@/components/layout/superadmin';
import { cropTitle, responseErrorHandler } from '@/services/helper';
import { Popconfirm, Skeleton, Table, Typography } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import Router from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';

interface DataType {
  key: React.Key;
  name: string;
  region: string;
  age: number;
  no_of_days: number;
  starting_from: number;
  address: string;
}

const App: React.FC = () => {

  const { data, mutate, error } = useSWR('/admin/blogs');

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      // @ts-ignore
      sorter: (a, b) => a.name > b.name,
      filterSearch: true,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      // @ts-ignore
      sorter: (a, b) => a.region > b.region,
      filterSearch: true,
    },
    {
      title: 'Youtube Link',
      dataIndex: 'no_of_days',
      sorter: (a, b) => a.no_of_days - b.no_of_days,
      filterSearch: true,
    },
    {
      title: 'Price',
      dataIndex: 'starting_from',
      sorter: (a, b) => a.starting_from - b.starting_from,
      filterSearch: true,
    },
    {
      title: 'Body',
      dataIndex: 'body'
    },
    {
      title: 'Action',
      dataIndex: 'id',
      width: '20%',
      render: id => (
        <>
          <Typography.Link style={{ marginRight: 8 }} onClick={() => Router.push(`/superadmin/blogs/edit/${id}`)}>
            Edit
          </Typography.Link>
          <Popconfirm title="Are you sure to delete this blog?" onConfirm={() => deleteBlogHandler(id)}>
            <Typography.Link>
              Delete
            </Typography.Link>
          </Popconfirm>
        </>
      )
    }
  ];

  function deleteBlogHandler(id: number) {
    mutate(data?.filter((dest: any) => dest.id !== id), false);
    deleteBlog(id)
      .then((res: any) => {
        toast.success(res.message);
      })
      .catch(responseErrorHandler)
      .finally(mutate)
  }

  return (
    <SuperadminLayout title="Destinations">
      {
        !data && !error ?
          <Skeleton active />
          :
          <Table
            columns={columns}
            dataSource={data?.map((dest: any) => ({
              ...dest,
              category_id: dest.category_id?.title,
              body: cropTitle(JSON.parse(dest.body)?.blocks[0]?.text, 50)
            }))}
            pagination={false}
          />
      }
    </SuperadminLayout>
  )
};

export default App;