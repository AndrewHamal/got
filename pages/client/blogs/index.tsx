/* eslint-disable @next/next/no-img-element */
import CommonBanner from '@/components/common/Common_Banner';
import ClientLayout from '@/components/layout/client/ClientLayout'
import { cropWysiwygText } from '@/services/helper';
import { Empty, Pagination, Skeleton } from 'antd';
import Link from 'next/link';
import Router from 'next/router';
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'

function News() {
  const fallback = "/client/assets/img/imageplaceholder.jpg";

  const [page, setPage] = useState<any>(1);
  const { data, error } = useSWR(`/user/blogs?page=${page}`)
  const [latestBlog, setLatestBlog] = useState<any>(null);
  const blogLoading = !data && !error;

  const hasBlog = !!data?.data.length;

  useEffect(() => {
    if (data && data.data.length && !latestBlog) {
      setLatestBlog(data?.data[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <ClientLayout>
      <CommonBanner
        loading={blogLoading}
        breadcrumb={[
          { name: 'Blogs' }
        ]}
        imageUrl={data?.data?.length ? data?.data[0]?.full_path : ""}
        title={data?.name}
      />
      {
        blogLoading ?
          <div className="p-5"><Skeleton active />
          </div>
          :
          hasBlog ?
            <>
              {/* News Area */}
              <section id="news_main_arae" className="section_padding">
                <div className="container">
                  {/* latest News */}
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="section_heading_center">
                        <h2>Latest News</h2>
                      </div>
                    </div>
                  </div>
                  {latestBlog ?
                    <div className="row">
                      <div className="col-lg-7">
                        <div className="news_area_top_left">
                          <div className="news_area_top_left">
                            <img src={latestBlog?.full_path ?? fallback} alt="img" className='border-rounded' style={{ borderRadius: "10px" }} />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-5">
                        <div className="news_area_top_right">
                          <h2>
                            <Link href={`/blogs/${latestBlog?.id}`}>{latestBlog?.title}</Link>
                          </h2>
                          <p>{cropWysiwygText(latestBlog?.body, 400)}</p>
                          <Link href={`/blogs/${latestBlog?.id}`}>Read full article</Link>
                        </div>
                      </div>
                    </div>
                    : null
                  }
                  {/* blog listing */}
                  <div className="new_main_news_box">
                    <div className="row">
                      {
                        data?.data?.map((blog: any) =>
                          <>
                            <div className="col-lg-4 col-md-6 col-sm-12 col-12" key={blog.id}>
                              <div className="news_item_boxed">
                                <div className="news_item_img">
                                  <Link href={`/blogs/${blog.id}`}>
                                    <img src={blog.full_path ?? fallback} alt="img" className='cursor-pointer' />
                                  </Link>
                                </div>
                                <div className="news_item_content">
                                  <h3><Link href={`/blogs/${blog.id}`}>{blog.title}</Link></h3>
                                  <p>{cropWysiwygText(blog.body)}</p>
                                  <Link href={`/blogs/${data?.data[0]?.id}`}>Read full article</Link>
                                </div>
                              </div>
                            </div>
                          </>
                        )
                      }
                      <div className="col-lg-12">
                        <div className="pagination_area">
                          <Pagination
                            style={{ visibility: data?.last_page > 1 ? "visible" : "hidden" }}
                            onChange={setPage}
                            className='pagination'
                            defaultCurrent={data.current_page}
                            pageSize={data.per_page}
                            total={data.total}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
            :
            <Empty className='mt-5' description="No Blogs Found, come back later!" />
      }
    </ClientLayout >
  )
}

export default News