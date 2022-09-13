import VideoListing from '@/components/client/VideoListing';
import CommonBanner from '@/components/common/Common_Banner'
import YoutubeFrame from '@/components/common/YoutubeFrame';
import ClientLayout from '@/components/layout/client/ClientLayout'
import { Skeleton } from 'antd';
import React, { useCallback, useState } from 'react'
import useSWR from 'swr'
import _debounce from "lodash/debounce";

function VideoSection() {

  const { data } = useSWR('/user/blogs');
  const { data: trailer, error: trailerError } = useSWR('/user/video-trailer');
  const trailerLoading = !trailer && !trailerError;

  const [search, setSearch] = useState<any>('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(_debounce(handleDebounceFn, 1000), []);

  function handleDebounceFn(inputValue: any) {
    setSearch(inputValue);
  }

  return (
    <ClientLayout>
      <CommonBanner title='Video Section' loading={!data} imageUrl={data?.data.lenght ? data?.data[0]?.full_path : ""} breadcrumb={[{ name: "Videos" }]} />
      <section id="tour_guides_area" className="section_padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section_heading_center">
                <h2 className="mb-5">Trailer Video</h2>
                {
                  trailerLoading ? <Skeleton className='px-5' active />
                    :
                    <YoutubeFrame
                      width="100%"
                      height="480"
                      id={trailer.youtube_link}
                    />
                }
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="guide_heading_area pt-5">
                <h3>Our Collections</h3>
              </div>
            </div>
            <div className='d-flex justify-content-center'>
              <input
                onChange={(e) => {
                  e.preventDefault();
                  debounceFn(e?.target?.value);
                }}
                className='w-50 border form-control mb-4' placeholder='Search Video' />
            </div>
            {/* @ts-ignore */}
            <VideoListing keyword={search} />
          </div>
        </div>
      </section>
    </ClientLayout>
  )
}

export default VideoSection