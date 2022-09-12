import { Skeleton, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import useSWR from 'swr';

const VideoTrailerList: React.FC = () => {
  const { data, error } = useSWR('/admin/video-trailer');

  interface DataType {
    key: string;
    youtube_link: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Youtube Id',
      dataIndex: 'youtube_link',
      key: 'youtube_link',
      render: id => <a href={`https://www.youtube.com/watch?v=${id}`} target={"_blank"} rel="noreferrer">{id}</a>,
    }
  ];


  if (!data && !error) return <Skeleton active />

  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={[{
        key: data?.id,
        youtube_link: data?.youtube_link
      }]} />
  );
};

export default VideoTrailerList;