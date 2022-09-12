/* eslint-disable @next/next/no-img-element */
import CommonBanner from '@/components/common/Common_Banner';
import YoutubeFrame from '@/components/common/YoutubeFrame';
import ClientLayout from '@/components/layout/client/ClientLayout'
import { Carousel, Skeleton, Tabs } from 'antd';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import useSWR from 'swr';
import BookPackageDrawer from './Drawer';
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
        <BookPackageDrawer
          packDrawer={packDrawer}
          closeDrawer={() => setPackDrawer(null)}
        />
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
                            {data?.location?.whole_location
                              ? <h5><i className="fas fa-globe" /> Address- {data?.location?.whole_location}</h5>
                              : null
                            }
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
                                        <div id={"k" + it.id} className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                          <div className="accordion-body">
                                            {
                                              it.youtube_link &&
                                              <div className='text-center mt-4 mb-3'>
                                                <YoutubeFrame
                                                  width="500px"
                                                  height="250px"
                                                  id={it.youtube_link}
                                                />
                                              </div>
                                            }

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
                            <Tabs.TabPane tab={<h4 className="">Included</h4>} key="item-1">
                              <Editor
                                //@ts-ignore
                                toolbarHidden
                                contentState={JSON.parse(data.included)}
                                readOnly
                              />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab={<h4 className="">Excluded</h4>} key="item-2">
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
                        {
                          data?.location?.lat && data.location.long ?
                            <div className="tour_details_boxed">
                              <h3 className="heading_theme">Tours location</h3>
                              <div className="google-map-code">
                                <iframe
                                  src={`https://maps.google.com/maps?q=${data.location.lat},${data.location.long}&hl=es;z=14&output=embed`}
                                  width="100%"
                                  height="450"
                                  frameBorder="0"
                                  style={{ border: 0 }}
                                  allowFullScreen={true}
                                  aria-hidden="false"
                                  tabIndex={0}></iframe>
                              </div>
                            </div>
                            : null
                        }
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
                                  Book Now
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
              </section>
            </div>
        }
      </div >

    </ClientLayout >
  )
}

export default DestinationById