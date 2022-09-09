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

function DestinationById() {
  const router = useRouter();
  const { id } = router.query;

  const { data: blogs } = useSWR(`/user/blogs`);
  const { data, error } = useSWR(id ? `/user/blog/${id}` : null);

  const loading = !data && !error;

  console.log({ data })

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
                            <h2>{data.title}</h2>
                            <p><Moment fromNow>{data.updated_at}</Moment></p>
                          </div>
                        </div>
                        <div className="tour_details_img_wrapper">
                          <div className="carousel">
                            <div className="overlay"></div>
                            <img src={data?.full_path} className="d-block w-100" alt={data?.title} />
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
                            !blogs ? <Skeleton active />
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
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="write_your_review_wrapper">
                        <h3 className="heading_theme">Contact Us</h3>
                        <div className="write_review_inner_boxed">
                          <form action="https://andit.co/projects/html/and-tour/!#" id="news_comment_form">
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="form-froup">
                                  <input type="text" className="form-control bg_input" placeholder="Enter full name" />
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-froup">
                                  <input type="text" className="form-control bg_input" placeholder="Enter email address" />
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="form-froup">
                                  <textarea rows={6} placeholder="Write your comments" className="form-control bg_input" defaultValue={""} />
                                </div>
                                <div className="comment_form_submit">
                                  <button className="btn btn_theme btn_md">Send</button>
                                </div>
                              </div>
                            </div>
                          </form>
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