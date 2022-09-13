/* eslint-disable @next/next/no-img-element */
import CommonBanner from '@/components/common/Common_Banner';
import ClientLayout from '@/components/layout/client/ClientLayout'
import { Carousel, Skeleton, Tabs } from 'antd';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr';
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod: any) => mod.Editor),
  { ssr: false }
);
import Moment from 'react-moment';
import { cropTitle } from '@/services/helper';
import axiosUser from '@/services/axios/axiosUser';

function DestinationById() {
  const router = useRouter();
  const { id } = router.query;

  // @ts-ignore
  const { data: blogs } = useSWR(`/user/blogs`, (resource, init) => axiosUser(resource, init).then(res => res.data.data));
  const { data, error } = useSWR(id ? `/user/blog/${id}` : null);

  const loading = !data && !error;

  return (
    <ClientLayout>
      <div>
        <CommonBanner
          loading={loading}
          breadcrumb={[
            { name: "Blogs", link: '/blogs' },
            { name: data?.title }
          ]}
          imageUrl={data?.full_path}
          title={data?.name}
        />

        {
          loading ? <div className="p-5"><Skeleton active /></div>
            :
            <div>
              {/* Tour Search Areas */}
              <section id="tour_details_main" className="section_padding">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="tour_details_leftside_wrapper">
                        <div className="tour_details_heading_wrapper">
                          <div className="tour_details_top_heading">
                            <h2 className='text-capitalize'>{data.title}</h2>
                            <p><Moment fromNow>{data.updated_at}</Moment></p>
                          </div>
                        </div>
                        <div className="tour_details_img_wrapper">
                          <div className="carousel blog">
                            <div className="overlay"></div>
                            <img src={data?.full_path} className="d-block w-100 blog-img" alt={data?.title} />
                          </div>
                        </div>
                        {/* overview */}
                        <div className="tour_details_boxed">
                          <h3 className="heading_theme">Overview</h3>
                          <div className="tour_details_boxed_inner">
                            <Editor
                              //@ts-ignore
                              toolbarHidden
                              contentState={JSON.parse(data.body)}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Other Blogs */}
                    <div className="col-lg-4">
                      <div className="news_details_rightbar">
                        <div className="news_details_right_item">
                          <h3>Other Blogs</h3>
                          {
                            !blogs || !blogs.length ? <Skeleton active />
                              :
                              blogs?.map((blog: any) =>
                                <div className="recent_news_item" key={blog.id}>
                                  <div className="recent_news_img">
                                    <img src={blog.full_path} alt="img" className='w-100' style={{ height: "65px" }} />
                                  </div>
                                  <div className="recent_news_text">
                                    <h5><Link href={`/blogs/${blog.id}`}>{cropTitle(blog.title, 20)}</Link></h5>
                                    <p><Link href={`/blogs/${blog.id}`}><Moment fromNow>{blog.updated_at}</Moment></Link></p>
                                  </div>
                                </div>
                              )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
        }
      </div >

    </ClientLayout>
  )
}

export default DestinationById