import { deleteDestination } from '@/api/superadmin/destination';
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
  const { data, mutate, error } = useSWR(`/admin/customize?page=${page}&keyword=${keyword}`);

  const columns: ColumnsType<DataType> = [
    {
        title: 'Destination',
        dataIndex: 'destination_id',
        // @ts-ignore
        sorter: (a, b) => a.name > b.name,
        filterSearch: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      // @ts-ignore
      sorter: (a, b) => a.name > b.name,
      filterSearch: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      // @ts-ignore
      sorter: (a, b) => a.email > b.email,
      filterSearch: true,
    },
    {
      title: 'No. of Days',
      dataIndex: 'trip_duration',
      sorter: (a: any, b: any) => a.trip_duration - b.trip_duration,
      filterSearch: true,
    },
    {
      title: 'Guests',
      dataIndex: 'no_of_guests',
      sorter: (a: any, b: any) => a.no_of_guests - b.no_of_guests,
      filterSearch: true,
    },
    {
      title: 'Price',
      dataIndex: 'price'
    },
    {
        title: 'Country',
        dataIndex: 'country'
    },
    {
        title: 'Landline',
        dataIndex: 'landline'
    },
    {
        title: 'Mobile',
        dataIndex: 'mobile'
    },
    {
        title: 'Message',
        dataIndex: 'message'
    }
  ];

  useEffect(() => {
    mutate();
  }, [mutate])

  function deleteDestinationHandler(id: number) {
    mutate(data?.filter((dest: any) => dest.id !== id), false)
    deleteDestination(id)
      .then((res: any) => {
        toast.success(res.message);
      })
      .catch(responseErrorHandler)
      .finally(mutate)
  }

  function search(e: any)
  {
    setKeyword(e.target.value)
  }

  return (
    <SuperadminLayout title="Customize Trip">
        <div className='col-md-5 mb-4'>
            <input onChange={search} placeholder='Search by Email' className='form-control'/>
        </div>
      {
        !data && !error ?
          <Skeleton active />
          :
          <Table
            columns={columns}
            dataSource={data?.data?.map((dest: any) => ({
              ...dest,
              destination_id: dest.destination?.name,
              price: '$'+dest.range_from +' - '+ '$'+dest.range_to
            }))}
            pagination={{
                total: data?.total,
                current: data?.current_page,
                pageSize: data?.per_page,
                onChange: (e) => {
                    setPage(e);
                }
            }}
          />
      }
    </SuperadminLayout>
  )
};

export default App;