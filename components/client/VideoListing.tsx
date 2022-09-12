import axiosUser from '@/services/axios/axiosUser';
import { Avatar, Divider, List, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import CropTitle from '../common/CropTitle';
import YoutubeFrame from '../common/YoutubeFrame';

const VideoListing: React.FC = ({ keyword }: any) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const loadMoreData = (newKeyword = false) => {
    if (loading) {
      return;
    }
    setLoading(true);
    axiosUser(`/user/videos?keyword=${keyword ?? ""}&page=${newKeyword ? 1 : data?.current_page + 1}&per_page=1`)
      .then(res => {
        const paginationData = res.data;
        setData({
          ...paginationData,
          data: newKeyword
            ? paginationData.data
            : [...data.data, ...paginationData.data],
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const NEW_KEYWORD = true;
    loadMoreData(NEW_KEYWORD);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 100,
        overflow: 'auto',
        padding: '0 16px',
      }}
    >
      <InfiniteScroll
        className='row text-center'
        style={{ border: "none", height: '100%' }}
        dataLength={data?.data?.length ?? 0}
        next={loadMoreData}
        hasMore={data?.current_page < data?.last_page}
        loader={<Skeleton active paragraph={{ rows: 2 }} />}
        endMessage={<Divider style={{ alignItems: "flex-start" }}>
          <p className="f-14">End Of Results</p>
        </Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          loading={loading}
          className='row-infinite'
          dataSource={data?.data}
          renderItem={(item: any) => (
            <div key={item?.id} className='col-md-6 mb-4'>
              <p className='f-20 mb-2 text-dark'><CropTitle className='f-22 mb-2 text-dark' text={item.title} wordLimit={20} /></p>
              <YoutubeFrame id={item.youtube_link} />
            </div>

          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default VideoListing;