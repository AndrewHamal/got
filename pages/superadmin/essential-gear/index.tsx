import { deleteDestination, deleteGear } from '@/api/superadmin/destination';
import SuperadminLayout from '@/components/layout/superadmin';
import { cropTitle, responseErrorHandler } from '@/services/helper';
import { Popconfirm, Skeleton, Table, Typography } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
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

  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const { data, mutate, error } = useSWR(`/admin/essential`);

  const columns: ColumnsType<DataType> = [
    {
        title: 'Title',
        dataIndex: 'title',
        // @ts-ignore
        sorter: (a, b) => a.name > b.name,
        filterSearch: true,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      // @ts-ignore
      sorter: (a, b) => a.name > b.name,
      filterSearch: true,
    },
    {
      title: 'Action',
      dataIndex: 'id',
      width: '20%',
      render: id => (
        <>
          <Typography.Link style={{ marginRight: 8 }} onClick={() => Router.push(`/superadmin/essential-gear/edit/${id}`)}>
            Edit
          </Typography.Link>
          <Popconfirm title="Are you sure to delete this Gear?" onConfirm={() => deleteGearHandler(id)}>
            <Typography.Link>
              Delete
            </Typography.Link>
          </Popconfirm>
        </>
      )
    }
  ];

  function deleteGearHandler(id: number)
  {
    deleteGear(id)
    .then(res => {
      toast.success(res?.data?.message)
      mutate();
    })
  }

  useEffect(() => {
    mutate();
  }, [mutate])

  return (
    <SuperadminLayout title="Essential Gear">
      {
        !data && !error ?
          <Skeleton active />
          :
          <Table
            columns={columns}
            dataSource={data?.map((dest: any) => ({
              ...dest,
              image: <img width={"80"} src={dest.full_path} alt={dest.title}/>,
            }))}
            pagination={false}
          />
      }
    </SuperadminLayout>
  )
};

export default App;