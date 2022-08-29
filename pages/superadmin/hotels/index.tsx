import SuperadminLayout from '@/components/layout/superadmin';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import React, { ReactElement, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';

interface DataType {
  hotel_name: string;
  category: string;
  location: string;
  admin: string;
  status: string;
  action: ReactElement;
  // key: string;
  // name: string;
  // age: number;
  // address: string;
}

type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    hotel_name: "Shangri-la",
    category: "Hotel",
    location: "Lazimpat, Kathmandu, Nepal",
    admin: "Lokesh Bajracharya",
    status: "true",
    action: <Button className="btn btn-admin-dark">Login</Button>
  },
  {
    hotel_name: "Shangri-la",
    category: "Hotel",
    location: "Lazimpat, Kathmandu, Nepal",
    admin: "Lokesh Bajracharya",
    status: "true",
    action: <Button className="btn btn-admin-dark">Login</Button>
  },
  {
    hotel_name: "Shangri-la",
    category: "Hotel",
    location: "Lazimpat, Kathmandu, Nepal",
    admin: "Lokesh Bajracharya",
    status: "true",
    action: <Button className="btn btn-admin-dark">Login</Button>
  },
  {
    hotel_name: "Shangri-la",
    category: "Hotel",
    location: "Lazimpat, Kathmandu, Nepal",
    admin: "Lokesh Bajracharya",
    status: "true",
    action: <Button className="btn btn-admin-dark">Login</Button>
  },
];

const App: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'hotel_name',
      key: 'hotel_name',
      width: '20%',
      sorter: (a, b) => a.hotel_name.length - b.hotel_name.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('hotel_name'),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: '20%',
      sorter: (a, b) => a.category.length - b.category.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('category'),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      width: '20%',
      sorter: (a, b) => a.location.length - b.location.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('location'),
    },
    {
      title: 'Admin',
      dataIndex: 'admin',
      key: 'admin',
      width: '20%',
      sorter: (a, b) => a.admin.length - b.admin.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('admin'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      ...getColumnSearchProps('status'),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      ...getColumnSearchProps('action'),
    },
  ];

  return (
    <SuperadminLayout title="Hotels">
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 6, total: 10 }} />
    </SuperadminLayout>

  );
};

export default App;