import { deleteBlog } from '@/api/superadmin/blog';
import SuperadminLayout from '@/components/layout/superadmin';
import { cropTitle, responseErrorHandler } from '@/services/helper';
import { Popconfirm, Skeleton, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
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
      title: 'Title',
      dataIndex: 'title',
      // @ts-ignore
      sorter: (a, b) => a.name > b.name,
      filterSearch: true,
    },
    {
      title: 'Category',
      dataIndex: 'category'
    },
    {
      title: 'Youtube Link',
      dataIndex: 'youtube_link'
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
    <SuperadminLayout title="Blogs">
      {
        !data && !error ?
          <Skeleton active />
          :
          <Table
            columns={columns}
            dataSource={data?.map((dest: any) => ({
              ...dest,
              category: dest.category?.title,
              body: cropTitle(JSON.parse(dest.body)?.blocks[0]?.text, 50)
            }))}
            pagination={false}
          />
      }
    </SuperadminLayout>
  )
};

export default App;