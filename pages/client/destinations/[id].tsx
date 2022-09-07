/* eslint-disable @next/next/no-img-element */
import CommonBanner from '@/components/common/Common_Banner';
import ClientLayout from '@/components/layout/client/ClientLayout'
import { Carousel, Drawer, Modal, Skeleton, Tabs } from 'antd';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import useSWR from 'swr';
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod: any) => mod.Editor),
  { ssr: false }
);

function DestinationById() {
  const router = useRouter();
  const { id } = router.query;

  const [packDrawer, setPackDrawer] = useState<any>(false);

  const { data, error } = useSWR(id ? `/user/destination/${id}` : null);
  const loading = !data && !error;

  return (
    <ClientLayout>
      <div>
        <Drawer style={{ top: '90px' }} title={packDrawer?.name} placement="right" onClose={() => setPackDrawer(null)} open={packDrawer} visible={!!packDrawer}>
          <p>{packDrawer?.name}</p>
          <p>{packDrawer?.name}</p>
          <p>{packDrawer?.name}</p>
        </Drawer>
        <CommonBanner
          loading={loading}
          breadcrumb={[
            { name: "Destinations", link: '/destinations' },
            { name: data?.name }
          ]}
          imageUrl={data?.files[0]?.full_path}
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
                            <h2>{data.name}</h2>
                            <h5><i className="fas fa-map-marker-alt" /> Region- {data.region.name}</h5>
                            <h5><i className="fas fa-clock" /> Duration- {data.no_of_days}</h5>
                          </div>
                          {/* <div className="toru_details_top_bottom_item">
                            <div className="tour_details_top_bottom_icon">
                              <i className="fas fa-clock" />
                            </div>
                            <div className="tour_details_top_bottom_text">
                              <div className="d-flex align-items-center">
                                <h5>Duration</h5>
                                <p>{data.no_of_days} days</p>
                              </div>
                            </div>
                          </div> */}
                        </div>
                        <div className="tour_details_img_wrapper">
                          <Carousel dotPosition={'right'} effect="fade" >
                            {
                              data.files?.map((res: any, key: number) => (
                                // eslint-disable-next-line react/jsx-key
                                <div className="carousel" key={key}>
                                  <div className="overlay"></div>
                                  <img src={res?.full_path} className="d-block w-100" alt={res?.name} />
                                  <div className="carousel-caption d-none d-md-block">
                                    <h2 className="text-white font-38">{res?.name}</h2>
                                  </div>
                                </div>
                              ))
                            }
                          </Carousel>
                        </div>
                        {/* overview */}
                        <div className="tour_details_boxed">
                          <h3 className="heading_theme">Overview</h3>
                          <div className="tour_details_boxed_inner">
                            <Editor
                              //@ts-ignore
                              toolbarHidden
                              contentState={JSON.parse(data.overview)}
                              readOnly
                            />
                          </div>
                        </div>
                        {/* Itenary */}
                        {
                          data.itineraries.length ?
                            <div className="tour_details_boxed">
                              <h3 className="heading_theme">Itinerary</h3>
                              <div className="tour_details_boxed_inner">
                                <div className="accordion" id="accordionExample">

                                  {data.itineraries.map((it: any) =>
                                    <div className="accordion_flex_area" key={it.id}>
                                      <div className="accordion_left_side">
                                        <h5>Day {it.day}</h5>
                                      </div>
                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id={it.id}>
                                          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#k${it.id}`} aria-expanded="true" aria-controls="collapseOne">
                                            {it.title}
                                          </button>
                                        </h2>
                                        <div id={"k" + it.id} className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                          <div className="accordion-body">
                                            <Editor
                                              //@ts-ignore
                                              toolbarHidden
                                              contentState={JSON.parse(it.content)}
                                              readOnly
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                </div>
                              </div>
                            </div>
                            : null
                        }
                        {/* included excluded */}
                        <div className="tour_details_boxed">
                          <Tabs type='card'>
                            <Tabs.TabPane tab={<h3 className="heading_theme">Included</h3>} key="item-1">
                              <Editor
                                //@ts-ignore
                                toolbarHidden
                                contentState={JSON.parse(data.included)}
                                readOnly
                              />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab={<h3 className="heading_theme">Excluded</h3>} key="item-2">
                              <Editor
                                //@ts-ignore
                                toolbarHidden
                                contentState={JSON.parse(data.not_included)}
                                readOnly
                              />
                            </Tabs.TabPane>
                          </Tabs>
                        </div>
                        {/* trek info */}
                        {
                          data.trek_info ?
                            <div className="tour_details_boxed">
                              <h3 className="heading_theme">Trek Info</h3>
                              <div className="tour_details_boxed_inner">
                                <Editor
                                  //@ts-ignore
                                  toolbarHidden
                                  contentState={JSON.parse(data.trek_info)}
                                  readOnly
                                />
                              </div>
                            </div>
                            : null
                        }

                        {/* map location */}
                        {/* <div className="tour_details_boxed">
                          <h3 className="heading_theme">Tours location</h3>
                          <div className="map_area">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3677.6962663570607!2d89.56355961427838!3d22.813715829827952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff901efac79b59%3A0x5be01a1bc0dc7eba!2sAnd+IT!5e0!3m2!1sen!2sbd!4v1557901943656!5m2!1sen!2sbd" />
                          </div>
                        </div> */}
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="tour_details_right_sidebar_wrapper">
                        {
                          data.packages.map((pack: any) =>
                            <div className="tour_detail_right_sidebar" key={pack.id}>
                              <div className="tour_details_right_boxed">
                                <div className="tour_details_right_box_heading">
                                  <h3>{pack.name}</h3>
                                </div>
                                <div className="valid_date_area">
                                  {
                                    pack.valid_from ?
                                      <div className="valid_date_area_one">
                                        <h5>Valid from</h5>
                                        <p>{pack.valid_from}</p>
                                      </div>
                                      : null
                                  }
                                  {
                                    pack.valid_till ?
                                      <div className="valid_date_area_one">
                                        <h5>Valid Till</h5>
                                        <p>{pack.valid_till}</p>
                                      </div>
                                      : null
                                  }
                                </div>
                                <div className="tour_package_details_bar_list">
                                  <h5>Package details</h5>
                                  <Editor
                                    //@ts-ignore
                                    toolbarHidden
                                    contentState={JSON.parse(pack.details)}
                                    readOnly
                                  />
                                </div>
                                <div className="tour_package_details_bar_price">
                                  <h5>Price</h5>
                                  <div className="tour_package_bar_price">
                                    <h3>${pack.price} <sub>/Per person</sub> </h3>
                                  </div>
                                </div>
                              </div>
                              <div className="tour_select_offer_bar_bottom">
                                <button className="btn btn_theme btn_md w-100"
                                  onClick={e => {
                                    e.preventDefault();
                                    setPackDrawer(pack);
                                  }}
                                >
                                  Contact
                                </button>
                              </div>
                            </div>
                          )
                        }
                        <div className="tour_detail_right_sidebar">
                          <div className="tour_details_right_boxed">
                            <div className="tour_details_right_box_heading">
                              <h3>Why choose us</h3>
                            </div>
                            <div className="tour_package_details_bar_list first_child_padding_none">
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
              {/*Related tour packages Area */}

            </div>
        }
      </div >

    </ClientLayout >
  )
}

export default DestinationById