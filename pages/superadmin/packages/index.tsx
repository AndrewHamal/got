import { deleteItinerary } from '@/api/superadmin/itinerary';
import SuperadminLayout from '@/components/layout/superadmin';
import { cropTitle, responseErrorHandler } from '@/services/helper';
import { Popconfirm, Skeleton, Table, Typography } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import Router from 'next/router';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  no_of_days: number;
  starting_from: number;
  address: string;
}

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const App: React.FC = () => {

  const { data, mutate, error, isValidating } = useSWR('/admin/packages');

  useEffect(() => {
    mutate();
  },[mutate])

  const columns: ColumnsType<DataType> = [
    {
      title: 'Title',
      dataIndex: 'name',
      // @ts-ignore
      sorter: (a, b) => a.name > b.name,
      filterSearch: true,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      // @ts-ignore
      sorter: (a, b) => a.name > b.name,
      filterSearch: true,
    },
    {
      title: 'Valid From',
      dataIndex: 'valid_from',
      sorter: (a, b) => a.age - b.age,
      filterSearch: true,
    },
    {
      title: 'Valid Till',
      dataIndex: 'valid_till',
      sorter: (a, b) => a.age - b.age,
      filterSearch: true,
    },
    {
      title: 'Details',
      dataIndex: 'details',
      sorter: (a, b) => a.no_of_days - b.no_of_days,
      filterSearch: true,
    },
    {
      title: 'Destination',
      dataIndex: 'destination',
      sorter: (a, b) => a.no_of_days - b.no_of_days,
      filterSearch: true,
    },
    {
      title: 'Action',
      dataIndex: 'id',
      width: '20%',
      render: id => (
        <>
          <Typography.Link style={{ marginRight: 8 }} onClick={() => Router.push(`/superadmin/packages/edit/${id}`)}>
            Edit
          </Typography.Link>
          <Popconfirm title="Are you sure to delete this destination?" onConfirm={() => deleteItineraryHandler(id)}>
            <Typography.Link>
              Delete
            </Typography.Link>
          </Popconfirm>
        </>
      )
    }
  ];

  function deleteItineraryHandler(id: number) {
    mutate(data?.filter((dest: any) => dest.id !== id), false)
    deleteItinerary(id)
    .then((res: any) => {
      toast.success(res.message);
    })
    .catch(responseErrorHandler)
    .finally(mutate)
  }

  return (
    <SuperadminLayout title="Packages">
      {
        !data && !error && isValidating ?
          <Skeleton active />
          :
          <Table
            columns={columns}
            dataSource={data?.map((dest: any) => ({
              ...dest,
              price: `$${dest.price}`,
              details: cropTitle(JSON.parse(dest.details)?.blocks[0]?.text, 2000) + '...',
              destination: <Typography.Link style={{ marginRight: 8 }} onClick={() => Router.push(`/superadmin/destinations/${dest.destination.id}`)}>
                <i className='fa fa-link'></i> {dest.destination.name.toUpperCase()}
              </Typography.Link>
            }))}
            onChange={onChange}
            pagination={false}
          />
      }
    </SuperadminLayout>
  )
};

export default App;