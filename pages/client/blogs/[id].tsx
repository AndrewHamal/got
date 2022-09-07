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

function DestinationById() {
  const router = useRouter();
  const { id } = router.query;

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
                            <h2>{data.title}</h2>
                            <p>{data.updated_at}</p>
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
                    <div className="col-lg-4">
                      <div className="tour_details_right_sidebar_wrapper">
                        <div className="tour_detail_right_sidebar">
                          <div className="tour_details_right_boxed">
                            <div className="tour_details_right_box_heading">
                              <h3>Other Blogs</h3>
                            </div>
                            <div className="valid_date_area">
                              <div className="valid_date_area_one">
                                <h5>Valid from</h5>
                                <p>01 Feb 2022</p>
                              </div>
                              <div className="valid_date_area_one">
                                <h5>Valid till</h5>
                                <p>15 Feb 2022</p>
                              </div>
                            </div>
                            <div className="tour_package_details_bar_list">
                              <h5>Package details</h5>
                              <ul>
                                <li><i className="fas fa-circle" />Buffet breakfast as per the Itinerary</li>
                                <li><i className="fas fa-circle" />Visit eight villages showcasing Polynesian
                                  culture
                                </li>
                                <li><i className="fas fa-circle" />Complimentary Camel safari, Bonfire,</li>
                                <li><i className="fas fa-circle" />All toll tax, parking, fuel, and driver
                                  allowances
                                </li>
                                <li><i className="fas fa-circle" />Comfortable and hygienic vehicle</li>
                              </ul>
                            </div>
                            <div className="tour_package_details_bar_price">
                              <h5>Price</h5>
                              <div className="tour_package_bar_price">
                                <h6><del>$ 35,500</del></h6>
                                <h3>$ 30,500 <sub>/Per serson</sub> </h3>
                              </div>
                            </div>
                          </div>
                          <div className="tour_select_offer_bar_bottom">
                            <button className="btn btn_theme btn_md w-100" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Select
                              offer</button>
                          </div>
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

    </ClientLayout >
  )
}

export default DestinationById