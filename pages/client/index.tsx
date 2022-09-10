/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
import ClientLayout from "@/components/layout/client/ClientLayout";
import { Carousel, Empty, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Moment from "react-moment";
import Link from "next/link";
import { useRouter } from "next/router";
import axiosUser from "@/services/axios/axiosUser";

function Index() {

  const { data: destinationHeader, error: destinationHeaderError } = useSWR('user/destinations-header');
  const destLoading = !destinationHeader && !destinationHeaderError;
  const { data: countries } = useSWR('user/countries');
  const { data: blogs } = useSWR('user/blogs', (resource, init) => axiosUser(resource, init).then(res => res.data.data));
  const { data: regions } = useSWR('user/region-chunk');
  const [selectedCountry, setSelectedCountry] = useState();
  let router = useRouter();


  useEffect(() => {
    $(".promotional_tour_slider").owlCarousel({
      loop: true,
      dots: true,
      autoplayHoverPause: true,
      autoplay: true,
      smartSpeed: 1000,
      margin: 10,
      nav: false,
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 2,
        },
        992: {
          items: 3,
        },
        1200: {
          items: 4,
        },
      },
    });
    $(".partner_slider_area").owlCarousel({
      loop: true,
      dots: false,
      autoplayHoverPause: true,
      autoplay: true,
      smartSpeed: 1000,
      margin: 10,
      nav: false,
      responsive: {
        0: {
          items: 2,
        },
        768: {
          items: 4,
        },
        992: {
          items: 4,
        },
        1200: {
          items: 8,
        },
      },
    });

    if (destinationHeader)
      setSelectedCountry(destinationHeader[0].region?.country_id);

  }, [destinationHeader, regions]);

  function regionInside(res) {
    let content = [];
    for (let resp in res) {
      content.push(<div className="destinations_content_box img_animation" key={resp}>
        <a href="top-destinations.html">
          <div className="overlay"></div>
          <img
            src={res[resp].full_path}
            alt="img"
          />
        </a>
        <div className="destinations_content_inner">
          <h3>
            <a href="top-destinations.html">{res[resp].name}</a>
          </h3>
        </div>
      </div>)
    }
    return content;
  }

  function region() {
    return regions?.map((res, key) => (
      <div className="col-lg-6 col-md-6 col-sm-12 col-12" key={key}>
        {regionInside(res)}
      </div>
    ));
  }

  return (
    <ClientLayout>
      <div>
        {destLoading ?
          <img style={{ height: "600px", objectFit: "cover" }} src={"/client/assets/img/imageplaceholder.jpg"} className="d-block w-100" alt={"placeholder"} />
          :
          // Banner Area 
          <Carousel dotPosition={'right'} effect="scrollx" autoplay>
            {
              destinationHeader?.map((res: any, key: number) => (
                // eslint-disable-next-line react/jsx-key
                <div className="carousel" key={key}>
                  <div className="overlay"></div>
                  <img src={res?.file_slider?.full_path ?? "/client/assets/img/imageplaceholder.jpg"} className="d-block w-100" alt={res?.name} />
                  <div className="carousel-caption d-none d-md-block">
                    <h2 className="text-white font-38">{res?.name}</h2>
                    <p className="heading-2 text-faded">{JSON.parse(res?.overview)?.blocks[0]?.text?.substring(0, 130)}...</p>

                    <button className="btn btn-admin-primary mb-5 mt-4">Explore Trip <i className="fa fa-chevron-right"></i></button>
                  </div>
                </div>
              ))
            }
          </Carousel>}

        <section id="theme_search_form">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="theme_search_form_area">
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="flights"
                      role="tabpanel"
                      aria-labelledby="flights-tab"
                    >
                      <div className="tab-content" id="myTabContent1">
                        <div
                          className="tab-pane fade show active"
                          id="oneway_flight"
                          role="tabpanel"
                          aria-labelledby="oneway-tab"
                        >
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="oneway_search_form">
                                <form action="#!">
                                  <div className="row">
                                    <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                      <div className="flight_Search_boxed dropdown_passenger_area text-center">
                                        <div className="dropdown">
                                          <i className="fas fa-certificate font-38 mb-2 mt-1"></i>
                                          <p className="final_count"> Nepal Government certified</p>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                      <div className="flight_Search_boxed dropdown_passenger_area">
                                        <div className="dropdown text-center">
                                          <i className="fas fa-clock font-38 mb-2 mt-1"></i>
                                          <p className="final_count"> Respect guest time value</p>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                      <div className="flight_Search_boxed dropdown_passenger_area">
                                        <div className="dropdown text-center">
                                          <i className="fas fa-network-wired font-38 mb-2 mt-1"></i>
                                          <p className="final_count"> Voluntary community work</p>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                      <div className="flight_Search_boxed dropdown_passenger_area">
                                        <div className="dropdown text-center">
                                          <i className="fa fa-users font-38 mb-2 mt-1"></i>
                                          <p className="final_count">Responsible <br /> tourism</p>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                      <div className="flight_Search_boxed dropdown_passenger_area">
                                        <div className="dropdown text-center">
                                          <i className="fas fa-building font-38 mb-2 mt-1"></i>
                                          <p className="final_count">Professional Team building</p>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                      <div className="flight_Search_boxed dropdown_passenger_area">
                                        <div className="dropdown text-center">
                                          <i className="fa fa-globe font-38 mb-2 mt-1"></i>
                                          <p className="final_count">Multi Country Program</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="roundtrip"
                          role="tabpanel"
                          aria-labelledby="roundtrip-tab"
                        >
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="oneway_search_form">
                                <form action="#!">
                                  <div className="row">
                                    <div className="col-lg-3  col-md-6 col-sm-12 col-12">
                                      <div className="flight_Search_boxed">
                                        <p>From</p>
                                        <input type="text" defaultValue="New York" />
                                        <span>
                                          JFK - John F. Kennedy International...
                                        </span>
                                        <div className="plan_icon_posation">
                                          <i className="fas fa-plane-departure" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-3  col-md-6 col-sm-12 col-12">
                                      <div className="flight_Search_boxed">
                                        <p>To</p>
                                        <input type="text" defaultValue="London " />
                                        <span>LCY, London city airport </span>
                                        <div className="plan_icon_posation">
                                          <i className="fas fa-plane-arrival" />
                                        </div>
                                        <div className="range_plan">
                                          <i className="fas fa-exchange-alt" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-4  col-md-6 col-sm-12 col-12">
                                      <div className="form_search_date">
                                        <div className="flight_Search_boxed date_flex_area">
                                          <div className="Journey_date">
                                            <p>Journey date</p>
                                            <input
                                              type="date"
                                              defaultValue="2022-05-05"
                                            />
                                            <span>Thursday</span>
                                          </div>
                                          <div className="Journey_date">
                                            <p>Return date</p>
                                            <input
                                              type="date"
                                              defaultValue="2022-05-08"
                                            />
                                            <span>Saturday</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                      <div className="flight_Search_boxed dropdown_passenger_area">
                                        <p>Passenger, Class </p>
                                        <div className="dropdown">
                                          <button
                                            className="dropdown-toggle final-count"
                                            data-toggle="dropdown"
                                            type="button"
                                            id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                          >
                                            0 Passenger
                                          </button>
                                          <div
                                            className="dropdown-menu dropdown_passenger_info"
                                            aria-labelledby="dropdownMenuButton1"
                                          >
                                            <div className="traveller-calulate-persons">
                                              <div className="passengers">
                                                <h6>Passengers</h6>
                                                <div className="passengers-types">
                                                  <div className="passengers-type">
                                                    <div className="text">
                                                      <span className="count pcount">
                                                        2
                                                      </span>
                                                      <div className="type-label">
                                                        <p>Adult</p>
                                                        <span>12+ yrs</span>
                                                      </div>
                                                    </div>
                                                    <div className="button-set">
                                                      <button
                                                        type="button"
                                                        className="btn-add"
                                                      >
                                                        <i className="fas fa-plus" />
                                                      </button>
                                                      <button
                                                        type="button"
                                                        className="btn-subtract"
                                                      >
                                                        <i className="fas fa-minus" />
                                                      </button>
                                                    </div>
                                                  </div>
                                                  <div className="passengers-type">
                                                    <div className="text">
                                                      <span className="count ccount">
                                                        0
                                                      </span>
                                                      <div className="type-label">
                                                        <p className="fz14 mb-xs-0">
                                                          Children
                                                        </p>
                                                        <span>
                                                          2 - Less than 12 yrs
                                                        </span>
                                                      </div>
                                                    </div>
                                                    <div className="button-set">
                                                      <button
                                                        type="button"
                                                        className="btn-add-c"
                                                      >
                                                        <i className="fas fa-plus" />
                                                      </button>
                                                      <button
                                                        type="button"
                                                        className="btn-subtract-c"
                                                      >
                                                        <i className="fas fa-minus" />
                                                      </button>
                                                    </div>
                                                  </div>
                                                  <div className="passengers-type">
                                                    <div className="text">
                                                      <span className="count incount">
                                                        0
                                                      </span>
                                                      <div className="type-label">
                                                        <p className="fz14 mb-xs-0">
                                                          Infant
                                                        </p>
                                                        <span>Less than 2 yrs</span>
                                                      </div>
                                                    </div>
                                                    <div className="button-set">
                                                      <button
                                                        type="button"
                                                        className="btn-add-in"
                                                      >
                                                        <i className="fas fa-plus" />
                                                      </button>
                                                      <button
                                                        type="button"
                                                        className="btn-subtract-in"
                                                      >
                                                        <i className="fas fa-minus" />
                                                      </button>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="cabin-selection">
                                                <h6>Cabin Class</h6>
                                                <div className="cabin-list">
                                                  <button
                                                    type="button"
                                                    className="label-select-btn"
                                                  >
                                                    <span className="muiButton-label">
                                                      Economy
                                                    </span>
                                                  </button>
                                                  <button
                                                    type="button"
                                                    className="label-select-btn active"
                                                  >
                                                    <span className="muiButton-label">
                                                      Business
                                                    </span>
                                                  </button>
                                                  <button
                                                    type="button"
                                                    className="label-select-btn"
                                                  >
                                                    <span className="MuiButton-label">
                                                      First Class{" "}
                                                    </span>
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <span>Business</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="top_form_search_button">
                                    <button className="btn btn_theme btn_md">
                                      Search
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="multi_city"
                          role="tabpanel"
                          aria-labelledby="multi_city-tab"
                        >
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="oneway_search_form">
                                <form action="#!">
                                  <div className="multi_city_form_wrapper">
                                    <div className="multi_city_form">
                                      <div className="row">
                                        <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                          <div className="flight_Search_boxed">
                                            <p>From</p>
                                            <input
                                              type="text"
                                              defaultValue="New York"
                                            />
                                            <span>
                                              DAC, Hazrat Shahajalal International...
                                            </span>
                                            <div className="plan_icon_posation">
                                              <i className="fas fa-plane-departure" />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                          <div className="flight_Search_boxed">
                                            <p>To</p>
                                            <input type="text" defaultValue="London " />
                                            <span>LCY, London city airport </span>
                                            <div className="plan_icon_posation">
                                              <i className="fas fa-plane-arrival" />
                                            </div>
                                            <div className="range_plan">
                                              <i className="fas fa-exchange-alt" />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                          <div className="form_search_date">
                                            <div className="flight_Search_boxed date_flex_area">
                                              <div className="Journey_date">
                                                <p>Journey date</p>
                                                <input
                                                  type="date"
                                                  defaultValue="2022-05-05"
                                                />
                                                <span>Thursday</span>
                                              </div>
                                              <div className="Journey_date">
                                                <p>Return date</p>
                                                <input
                                                  type="date"
                                                  defaultValue="2022-05-10"
                                                />
                                                <span>Saturday</span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                          <div className="flight_Search_boxed dropdown_passenger_area">
                                            <p>Passenger, Class </p>
                                            <div className="dropdown">
                                              <button
                                                className="dropdown-toggle final-count"
                                                data-toggle="dropdown"
                                                type="button"
                                                id="dropdownMenuButton1"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                              >
                                                0 Passenger
                                              </button>
                                              <div
                                                className="dropdown-menu dropdown_passenger_info"
                                                aria-labelledby="dropdownMenuButton1"
                                              >
                                                <div className="traveller-calulate-persons">
                                                  <div className="passengers">
                                                    <h6>Passengers</h6>
                                                    <div className="passengers-types">
                                                      <div className="passengers-type">
                                                        <div className="text">
                                                          <span className="count pcount">
                                                            2
                                                          </span>
                                                          <div className="type-label">
                                                            <p>Adult</p>
                                                            <span>12+ yrs</span>
                                                          </div>
                                                        </div>
                                                        <div className="button-set">
                                                          <button
                                                            type="button"
                                                            className="btn-add"
                                                          >
                                                            <i className="fas fa-plus" />
                                                          </button>
                                                          <button
                                                            type="button"
                                                            className="btn-subtract"
                                                          >
                                                            <i className="fas fa-minus" />
                                                          </button>
                                                        </div>
                                                      </div>
                                                      <div className="passengers-type">
                                                        <div className="text">
                                                          <span className="count ccount">
                                                            0
                                                          </span>
                                                          <div className="type-label">
                                                            <p className="fz14 mb-xs-0">
                                                              Children
                                                            </p>
                                                            <span>
                                                              2 - Less than 12 yrs
                                                            </span>
                                                          </div>
                                                        </div>
                                                        <div className="button-set">
                                                          <button
                                                            type="button"
                                                            className="btn-add-c"
                                                          >
                                                            <i className="fas fa-plus" />
                                                          </button>
                                                          <button
                                                            type="button"
                                                            className="btn-subtract-c"
                                                          >
                                                            <i className="fas fa-minus" />
                                                          </button>
                                                        </div>
                                                      </div>
                                                      <div className="passengers-type">
                                                        <div className="text">
                                                          <span className="count incount">
                                                            0
                                                          </span>
                                                          <div className="type-label">
                                                            <p className="fz14 mb-xs-0">
                                                              Infant
                                                            </p>
                                                            <span>Less than 2 yrs</span>
                                                          </div>
                                                        </div>
                                                        <div className="button-set">
                                                          <button
                                                            type="button"
                                                            className="btn-add-in"
                                                          >
                                                            <i className="fas fa-plus" />
                                                          </button>
                                                          <button
                                                            type="button"
                                                            className="btn-subtract-in"
                                                          >
                                                            <i className="fas fa-minus" />
                                                          </button>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="cabin-selection">
                                                    <h6>Cabin Class</h6>
                                                    <div className="cabin-list">
                                                      <button
                                                        type="button"
                                                        className="label-select-btn"
                                                      >
                                                        <span className="muiButton-label">
                                                          Economy
                                                        </span>
                                                      </button>
                                                      <button
                                                        type="button"
                                                        className="label-select-btn active"
                                                      >
                                                        <span className="muiButton-label">
                                                          Business
                                                        </span>
                                                      </button>
                                                      <button
                                                        type="button"
                                                        className="label-select-btn"
                                                      >
                                                        <span className="MuiButton-label">
                                                          First Class{" "}
                                                        </span>
                                                      </button>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <span>Business</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="multi_city_form">
                                      <div className="row">
                                        <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                          <div className="flight_Search_boxed">
                                            <p>From</p>
                                            <input
                                              type="text"
                                              defaultValue="New York"
                                            />
                                            <span>
                                              DAC, Hazrat Shahajalal International...
                                            </span>
                                            <div className="plan_icon_posation">
                                              <i className="fas fa-plane-departure" />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                          <div className="flight_Search_boxed">
                                            <p>To</p>
                                            <input type="text" defaultValue="London " />
                                            <span>LCY, London city airport </span>
                                            <div className="plan_icon_posation">
                                              <i className="fas fa-plane-arrival" />
                                            </div>
                                            <div className="range_plan">
                                              <i className="fas fa-exchange-alt" />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                          <div className="form_search_date">
                                            <div className="flight_Search_boxed date_flex_area">
                                              <div className="Journey_date">
                                                <p>Journey date</p>
                                                <input
                                                  type="date"
                                                  defaultValue="2022-05-05"
                                                />
                                                <span>Thursday</span>
                                              </div>
                                              <div className="Journey_date">
                                                <p>Return date</p>
                                                <input
                                                  type="date"
                                                  defaultValue="2022-05-12"
                                                />
                                                <span>Saturday</span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                          <div className="flight_Search_boxed dropdown_passenger_area">
                                            <p>Passenger, Class </p>
                                            <div className="dropdown">
                                              <button
                                                className="dropdown-toggle final-count"
                                                data-toggle="dropdown"
                                                type="button"
                                                id="dropdownMenuButton1"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                              >
                                                0 Passenger
                                              </button>
                                              <div
                                                className="dropdown-menu dropdown_passenger_info"
                                                aria-labelledby="dropdownMenuButton1"
                                              >
                                                <div className="traveller-calulate-persons">
                                                  <div className="passengers">
                                                    <h6>Passengers</h6>
                                                    <div className="passengers-types">
                                                      <div className="passengers-type">
                                                        <div className="text">
                                                          <span className="count pcount">
                                                            2
                                                          </span>
                                                          <div className="type-label">
                                                            <p>Adult</p>
                                                            <span>12+ yrs</span>
                                                          </div>
                                                        </div>
                                                        <div className="button-set">
                                                          <button
                                                            type="button"
                                                            className="btn-add"
                                                          >
                                                            <i className="fas fa-plus" />
                                                          </button>
                                                          <button
                                                            type="button"
                                                            className="btn-subtract"
                                                          >
                                                            <i className="fas fa-minus" />
                                                          </button>
                                                        </div>
                                                      </div>
                                                      <div className="passengers-type">
                                                        <div className="text">
                                                          <span className="count ccount">
                                                            0
                                                          </span>
                                                          <div className="type-label">
                                                            <p className="fz14 mb-xs-0">
                                                              Children
                                                            </p>
                                                            <span>
                                                              2 - Less than 12 yrs
                                                            </span>
                                                          </div>
                                                        </div>
                                                        <div className="button-set">
                                                          <button
                                                            type="button"
                                                            className="btn-add-c"
                                                          >
                                                            <i className="fas fa-plus" />
                                                          </button>
                                                          <button
                                                            type="button"
                                                            className="btn-subtract-c"
                                                          >
                                                            <i className="fas fa-minus" />
                                                          </button>
                                                        </div>
                                                      </div>
                                                      <div className="passengers-type">
                                                        <div className="text">
                                                          <span className="count incount">
                                                            0
                                                          </span>
                                                          <div className="type-label">
                                                            <p className="fz14 mb-xs-0">
                                                              Infant
                                                            </p>
                                                            <span>Less than 2 yrs</span>
                                                          </div>
                                                        </div>
                                                        <div className="button-set">
                                                          <button
                                                            type="button"
                                                            className="btn-add-in"
                                                          >
                                                            <i className="fas fa-plus" />
                                                          </button>
                                                          <button
                                                            type="button"
                                                            className="btn-subtract-in"
                                                          >
                                                            <i className="fas fa-minus" />
                                                          </button>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="cabin-selection">
                                                    <h6>Cabin Class</h6>
                                                    <div className="cabin-list">
                                                      <button
                                                        type="button"
                                                        className="label-select-btn"
                                                      >
                                                        <span className="muiButton-label">
                                                          Economy
                                                        </span>
                                                      </button>
                                                      <button
                                                        type="button"
                                                        className="label-select-btn active"
                                                      >
                                                        <span className="muiButton-label">
                                                          Business
                                                        </span>
                                                      </button>
                                                      <button
                                                        type="button"
                                                        className="label-select-btn"
                                                      >
                                                        <span className="MuiButton-label">
                                                          First Class{" "}
                                                        </span>
                                                      </button>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <span>Business</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-lg-12">
                                      <div className="add_multy_form">
                                        <button type="button" id="addMulticityRow">
                                          + Add another flight
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="top_form_search_button">
                                    <button className="btn btn_theme btn_md">
                                      Search
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* imagination Area */}
        <section id="go_beyond_area" className="section_padding_top mt-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <div className="heading_left_area">
                  <h2>
                    Go beyond your <span>imagination</span>
                  </h2>
                  <h5>Discover your ideal experience with us</h5>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <div className="imagination_boxed">
                  <a href="top-destinations.html">
                    <img
                      src="client/assets/img/imagination/imagination1.png"
                      alt="img"
                    />
                  </a>
                  <h3>
                    <a href="top-destinations.html">
                      7% Discount for all <span>Airlines</span>
                    </a>
                  </h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <div className="imagination_boxed">
                  <a href="top-destinations.html">
                    <img
                      src="client/assets/img/imagination/imagination2.png"
                      alt="img"
                    />
                  </a>
                  <h3>
                    <a href="#!">
                      Travel around<span>the world</span>
                    </a>
                  </h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <div className="imagination_boxed">
                  <a href="top-destinations.html">
                    <img
                      src="client/assets/img/imagination/imagination3.png"
                      alt="img"
                    />
                  </a>
                  <h3>
                    <a href="top-destinations.html">
                      Luxury resorts<span>top deals</span>
                    </a>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top destinations */}

        <section id="top_destinations" className="section_padding_top">
          <div className="container">
            {/* Section Heading */}
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="section_heading_center">
                  <h2>Top regions</h2>
                </div>
              </div>
            </div>
            <div className="row">

              <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="destinations_content_box img_animation">
                  <img
                    src="client/assets/img/destination/big-img.png"
                    alt="img"
                  />
                  <div className="destinations_content_inner">
                    <h2>Up to</h2>
                    <div className="destinations_big_offer">
                      <h1>50</h1>
                      <h6>
                        <span>%</span> <span>Off</span>
                      </h6>
                    </div>
                    <h2>Holiday packages</h2>
                    <a
                      href="top-destinations.html"
                      className="btn btn_theme btn_md"
                    >
                      Book now
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="row">
                  {!regions ? <Skeleton active /> : region()}
                  {/* {
                  regions?.map((res: any, key: number) => (
                    // eslint-disable-next-line react/jsx-key
                    <div className="col-lg-4 col-md-4 col-sm-12 col-12" key={key}>
                      {
                        Array.from(res)?.map((resData: any, key: number) => (
                          // eslint-disable-next-line react/jsx-key
                          <div className="destinations_content_box img_animation" key={key}>
                            <a href="top-destinations.html">
                              <img
                                src="client/assets/img/destination/destination1.png"
                                alt="img"
                              />
                            </a>
                            <div className="destinations_content_inner">
                              <h3>
                                <a href="top-destinations.html">{resData.name}</a>
                              </h3>
                            </div>
                          </div>
                        ))
                      }
                   </div>
                  ))
                } */}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Explore our hot deals */}
        <section id="explore_area" className="section_padding_top">
          <div className="container">
            {/* Section Heading */}
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="section_heading_center">
                  <h2>Recommended Travels and Tours in Nepal</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="nav-hotels"
                    role="tabpanel"
                    aria-labelledby="nav-hotels-tab"
                  >
                    <div className="row">
                      {!destinationHeader ? <Skeleton /> :
                        destinationHeader?.map((res: any, key: number) => (

                          // eslint-disable-next-line react/jsx-key
                          <div className="col-lg-3 col-md-6 col-sm-6 col-12" key={key} onClick={() => router.push(`destinations/${res.id}`)}>
                            <div className="theme_common_box_two img_hover">
                              <div className="theme_two_box_img">
                                <a href="hotel-details.html">
                                  <img
                                    src={res?.file_slider?.full_path}
                                    alt="img"
                                  />
                                </a>
                                <p>
                                  <i className="fas fa-map-marker-alt" />
                                  {res?.name}
                                </p>
                              </div>
                              <div className="theme_two_box_content">
                                <h4 className="mb-0">
                                  <a href="hotel-details.html">
                                    {res?.name}
                                  </a>
                                </h4>
                                <div className="mb-3 mt-1">
                                  <small>
                                    <span className="review_rating bg-danger p-1 rounded text-white">
                                      {res.no_of_days} days Trek
                                    </span>{" "}
                                  </small>
                                </div>
                                <h3>
                                  ${res?.starting_from}.00 <span>Price starts from</span>
                                </h3>
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Offer Area */}
        <section id="offer_area" className="section_padding_top">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="offer_area_box d-none-phone img_animation">
                  <img src="client/assets/img/offer/offer1.png" alt="img" />
                  <div className="offer_area_content">
                    <h2>Special Offers</h2>
                    <p>
                      Invidunt ut labore et dolore magna aliquyam erat, sed diam
                      voluptua. At vero eos et accusam et justo duo dolores et
                      ea rebum. Stet clita kasd dolor sit amet. Lorem ipsum
                      dolor sit amet.
                    </p>
                    <a href="#!" className="btn btn_theme btn_md">
                      Holiday deals
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                <div className="offer_area_box img_animation">
                  <img src="client/assets/img/offer/offer2.png" alt="img" />
                  <div className="offer_area_content">
                    <h2>News letter</h2>
                    <p>
                      Invidunt ut labore et dolore magna aliquyam erat, sed diam
                      voluptua. At vero eos et.
                    </p>
                    <a href="#!" className="btn btn_theme btn_md">
                      Subscribe now
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                <div className="offer_area_box img_animation">
                  <img src="client/assets/img/offer/offer3.png" alt="img" />
                  <div className="offer_area_content">
                    <h2>Travel tips</h2>
                    <p>
                      Invidunt ut labore et dolore magna aliquyam erat, sed diam
                      voluptua. At vero eos et.
                    </p>
                    <a href="#!" className="btn btn_theme btn_md">
                      Get tips
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*Promotional Tours Area */}
        <section id="promotional_tours" className="section_padding_top">
          <div className="container">
            {/* Section Heading */}
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="section_heading_center">
                  <h2>Our best promotional tours</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="promotional_tour_slider owl-theme owl-carousel dot_style d-flex gap-3">
                  {
                    destinationHeader?.slice(0, 5)?.map((res: any, key: number) => (
                      // eslint-disable-next-line react/jsx-key
                      <div className="theme_common_box_two img_hover w-100" key={key} onClick={() => router.push(`destinations/${res.id}`)}>
                        <div className="theme_two_box_img">
                          <a href="hotel-details.html">
                            <img
                              src={res?.file_slider?.full_path}
                              alt="img"
                            />
                          </a>
                          <p>
                            <i className="fas fa-map-marker-alt" />
                            {res?.name}
                          </p>
                        </div>
                        <div className="theme_two_box_content">
                          <h4>
                            <a href="hotel-details.html">{res?.name} </a>
                          </h4>
                          <div className="mb-3 mt-1">
                            <small>
                              <span className="review_rating bg-danger p-1 rounded text-white">
                                {res.no_of_days} days Trek
                              </span>{" "}
                            </small>
                          </div>
                          <h3>
                            ${res?.starting_from}.00 <span>Price starts from</span>
                          </h3>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Destinations Area */}
        <section id="destinations_area" className="section_padding_top">
          <div className="container">
            {/* Section Heading */}
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="section_heading_center">
                  <h2>Destinations for you</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-10 offset-lg-1">
                <div className="theme_nav_tab">
                  <nav className="theme_nav_tab_item">
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                      {
                        countries?.map((res: any, key: number) => (
                          // eslint-disable-next-line react/jsx-key
                          <button
                            className={`nav-link ${key === 0 ? 'active' : ''}`}
                            id="nav-nepal-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-nepal"
                            type="button"
                            role="tab"
                            aria-controls="nav-nepal"
                            aria-selected="true"
                            key={key}
                            onClick={() => {
                              setSelectedCountry(res?.id);
                            }}
                          >
                            {res?.name}
                          </button>
                        ))
                      }

                    </div>
                  </nav>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="tab-content" id="nav-tabContent1">
                  <div
                    className="tab-pane fade show active"
                    id="nav-nepal"
                    role="tabpanel"
                    aria-labelledby="nav-nepal-tab"
                  >
                    <div className="row">
                      {
                        !destinationHeader ? <Skeleton active /> :

                          destinationHeader?.filter(res => res?.region?.country_id === selectedCountry).length > 0 ?
                            destinationHeader?.filter(res => res?.region?.country_id === selectedCountry)
                              .map((res: any, key: number) => (
                                // eslint-disable-next-line react/jsx-key
                                <div className="col-lg-4 col-md-6 col-sm-12 col-12" key={key} onClick={() => router.push(`destinations/${resDes.id}`)}>
                                  <div className="tab_destinations_boxed">
                                    <div className="tab_destinations_img">
                                      <a href="top-destinations.html">
                                        <img
                                          src={res?.file_slider?.full_path}
                                          alt="img"
                                        />
                                      </a>
                                    </div>
                                    <div className="tab_destinations_conntent">
                                      <h3>
                                        <a href="top-destinations.html">
                                          {res?.name.substring(0, 20)}...
                                        </a>
                                      </h3>
                                      <p>
                                        Price starts at <span>${res?.starting_from}.00</span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )) : <Empty description={"No data Found!"} />
                      }

                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-malaysia"
                    role="tabpanel"
                    aria-labelledby="nav-malaysia-tab"
                  >
                    <div className="row">
                      <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                        <div className="tab_destinations_boxed">
                          <div className="tab_destinations_img">
                            <a href="top-destinations.html">
                              <img
                                src="client/assets/img/destination/destination-small2.png"
                                alt="img"
                              />
                            </a>
                          </div>
                          <div className="tab_destinations_conntent">
                            <h3>
                              <a href="top-destinations.html">Kathmundu tour</a>
                            </h3>
                            <p>
                              Price starts at <span>$85.00</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                        <div className="tab_destinations_boxed">
                          <div className="tab_destinations_img">
                            <a href="top-destinations.html">
                              <img
                                src="client/assets/img/destination/destination-small3.png"
                                alt="img"
                              />
                            </a>
                          </div>
                          <div className="tab_destinations_conntent">
                            <h3>
                              <a href="top-destinations.html">
                                Beautiful pokhara
                              </a>
                            </h3>
                            <p>
                              Price starts at <span>$100.00</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                        <div className="tab_destinations_boxed">
                          <div className="tab_destinations_img">
                            <a href="top-destinations.html">
                              <img
                                src="client/assets/img/destination/destination-small4.png"
                                alt="img"
                              />
                            </a>
                          </div>
                          <div className="tab_destinations_conntent">
                            <h3>
                              <a href="top-destinations.html">
                                Annapurna region
                              </a>
                            </h3>
                            <p>
                              Price starts at <span>$75.00</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                        <div className="tab_destinations_boxed">
                          <div className="tab_destinations_img">
                            <a href="top-destinations.html">
                              <img
                                src="client/assets/img/destination/destination-small6.png"
                                alt="img"
                              />
                            </a>
                          </div>
                          <div className="tab_destinations_conntent">
                            <h3>
                              <a href="top-destinations.html">
                                Langtang region
                              </a>
                            </h3>
                            <p>
                              Price starts at <span>$105.00</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-indonesia"
                    role="tabpanel"
                    aria-labelledby="nav-indonesia-tab"
                  >
                    <div className="row">
                      <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                        <div className="tab_destinations_boxed">
                          <div className="tab_destinations_img">
                            <a href="top-destinations.html">
                              <img
                                src="client/assets/img/destination/destination-small3.png"
                                alt="img"
                              />
                            </a>
                          </div>
                          <div className="tab_destinations_conntent">
                            <h3>
                              <a href="top-destinations.html">
                                Beautiful pokhara
                              </a>
                            </h3>
                            <p>
                              Price starts at <span>$100.00</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                        <div className="tab_destinations_boxed">
                          <div className="tab_destinations_img">
                            <a href="top-destinations.html">
                              <img
                                src="client/assets/img/destination/destination-small4.png"
                                alt="img"
                              />
                            </a>
                          </div>
                          <div className="tab_destinations_conntent">
                            <h3>
                              <a href="top-destinations.html">
                                Annapurna region
                              </a>
                            </h3>
                            <p>
                              Price starts at <span>$75.00</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                        <div className="tab_destinations_boxed">
                          <div className="tab_destinations_img">
                            <a href="top-destinations.html">
                              <img
                                src="client/assets/img/destination/destination-small6.png"
                                alt="img"
                              />
                            </a>
                          </div>
                          <div className="tab_destinations_conntent">
                            <h3>
                              <a href="top-destinations.html">
                                Langtang region
                              </a>
                            </h3>
                            <p>
                              Price starts at <span>$105.00</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-turkey"
                    role="tabpanel"
                    aria-labelledby="nav-turkey-tab"
                  >
                    <div className="row">
                      <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                        <div className="tab_destinations_boxed">
                          <div className="tab_destinations_img">
                            <a href="top-destinations.html">
                              <img
                                src="client/assets/img/destination/destination-small2.png"
                                alt="img"
                              />
                            </a>
                          </div>
                          <div className="tab_destinations_conntent">
                            <h3>
                              <a href="top-destinations.html">Kathmundu tour</a>
                            </h3>
                            <p>
                              Price starts at <span>$85.00</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                        <div className="tab_destinations_boxed">
                          <div className="tab_destinations_img">
                            <a href="top-destinations.html">
                              <img
                                src="client/assets/img/destination/destination-small3.png"
                                alt="img"
                              />
                            </a>
                          </div>
                          <div className="tab_destinations_conntent">
                            <h3>
                              <a href="top-destinations.html">
                                Beautiful pokhara
                              </a>
                            </h3>
                            <p>
                              Price starts at <span>$100.00</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                        <div className="tab_destinations_boxed">
                          <div className="tab_destinations_img">
                            <a href="top-destinations.html">
                              <img
                                src="client/assets/img/destination/destination-small4.png"
                                alt="img"
                              />
                            </a>
                          </div>
                          <div className="tab_destinations_conntent">
                            <h3>
                              <a href="top-destinations.html">
                                Annapurna region
                              </a>
                            </h3>
                            <p>
                              Price starts at <span>$75.00</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-china"
                    role="tabpanel"
                    aria-labelledby="nav-china-tab"
                  >
                    <div className="row">
                      <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                        <div className="tab_destinations_boxed">
                          <div className="tab_destinations_img">
                            <a href="top-destinations.html">
                              <img
                                src="client/assets/img/destination/destination-small4.png"
                                alt="img"
                              />
                            </a>
                          </div>
                          <div className="tab_destinations_conntent">
                            <h3>
                              <a href="top-destinations.html">
                                Annapurna region
                              </a>
                            </h3>
                            <p>
                              Price starts at <span>$75.00</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                        <div className="tab_destinations_boxed">
                          <div className="tab_destinations_img">
                            <a href="top-destinations.html">
                              <img
                                src="client/assets/img/destination/destination-small6.png"
                                alt="img"
                              />
                            </a>
                          </div>
                          <div className="tab_destinations_conntent">
                            <h3>
                              <a href="top-destinations.html">
                                Langtang region
                              </a>
                            </h3>
                            <p>
                              Price starts at <span>$105.00</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-darjeeling"
                    role="tabpanel"
                    aria-labelledby="nav-darjeeling-tab"
                  >
                    <div className="row">
                      <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                        <div className="tab_destinations_boxed">
                          <div className="tab_destinations_img">
                            <a href="top-destinations.html">
                              <img
                                src="client/assets/img/destination/destination-small4.png"
                                alt="img"
                              />
                            </a>
                          </div>
                          <div className="tab_destinations_conntent">
                            <h3>
                              <a href="top-destinations.html">
                                Annapurna region
                              </a>
                            </h3>
                            <p>
                              Price starts at <span>$75.00</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-italy"
                    role="tabpanel"
                    aria-labelledby="nav-italy-tab"
                  >
                    <div className="row">
                      <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                        <div className="tab_destinations_boxed">
                          <div className="tab_destinations_img">
                            <a href="top-destinations.html">
                              <img
                                src="client/assets/img/destination/destination-small4.png"
                                alt="img"
                              />
                            </a>
                          </div>
                          <div className="tab_destinations_conntent">
                            <h3>
                              <a href="top-destinations.html">
                                Annapurna region
                              </a>
                            </h3>
                            <p>
                              Price starts at <span>$75.00</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                        <div className="tab_destinations_boxed">
                          <div className="tab_destinations_img">
                            <a href="top-destinations.html">
                              <img
                                src="client/assets/img/destination/destination-small6.png"
                                alt="img"
                              />
                            </a>
                          </div>
                          <div className="tab_destinations_conntent">
                            <h3>
                              <a href="top-destinations.html">
                                Langtang region
                              </a>
                            </h3>
                            <p>
                              Price starts at <span>$105.00</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* News Area */}
        <section id="home_news" className="section_padding_top">
          <div className="container">
            {/* Section Heading */}
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="section_heading_center">
                  <h2>Latest travel news</h2>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6">
                <div className="home_news_left_wrapper">
                  {
                    !blogs ? <Skeleton /> :
                      blogs?.map((res: any, key: number) => (
                        // eslint-disable-next-line react/jsx-key
                        <div className="home_news_item" key={key} onClick={() => router.push(`blogs/${res.id}`)}>
                          <div className="home_news_img">
                            <a onClick={() => router.push(`blogs/${res.id}`)}>
                              <img
                                src={res?.full_path}
                                alt="img"
                              />
                            </a>
                          </div>
                          <div className="home_news_content">
                            <h3 className="mb-0">
                              <a className="text-capitalize" onClick={() => router.push(`blogs/${res.id}`)}>
                                {res?.title}
                              </a>
                            </h3>
                            <p className="mb-0">
                              {JSON.parse(res?.body)?.blocks[0]?.text?.substring(0, 40)}...
                            </p>
                            <p>
                              <a onClick={() => router.push(`blogs/${res.id}`)}>{res?.date}</a>{" "}
                            </p>
                          </div>
                        </div>
                      ))
                  }

                  <div className="home_news_item">
                    <div className="seeall_link">
                      <Link href="/blogs">
                        <a>See all Blogs <i className="fas fa-arrow-right" /></a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                {
                  !blogs ? <Skeleton /> : <div className="home_news_big">
                    <div className="news_home_bigest img_hover">
                      <a onClick={() => router.push(`blogs/${blogs[0].id}`)}>
                        <img src={blogs[0]?.full_path} alt="img" />
                      </a>
                    </div>
                    <h3>
                      <a onClick={() => router.push(`blogs/${blogs[0].id}`)} className="text-capitalize">
                        {blogs[0]?.title}
                      </a>{" "}
                    </h3>
                    {JSON.parse(blogs[0]?.body)?.blocks[0]?.text?.substring(0, 100)}...
                    <a className="seeall_link mt-2" onClick={() => router.push(`blogs/${blogs[0].id}`)}>
                      Read full article <i className="fas fa-arrow-right" />
                    </a>
                  </div>
                }

              </div>
            </div>
          </div>
        </section>
        {/* Our partners Area */}
        <section id="our_partners" className="section_padding">
          <div className="container">
            {/* Section Heading */}
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="section_heading_center">
                  <h2>Our partners</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="partner_slider_area owl-theme owl-carousel">
                  <div className="partner_logo">
                    <a href="#!">
                      <img src="client/assets/img/partner/1.png" alt="logo" />
                    </a>
                  </div>
                  <div className="partner_logo">
                    <a href="#!">
                      <img src="client/assets/img/partner/2.png" alt="logo" />
                    </a>
                  </div>
                  <div className="partner_logo">
                    <a href="#!">
                      <img src="client/assets/img/partner/3.png" alt="logo" />
                    </a>
                  </div>
                  <div className="partner_logo">
                    <a href="#!">
                      <img src="client/assets/img/partner/4.png" alt="logo" />
                    </a>
                  </div>
                  <div className="partner_logo">
                    <a href="#!">
                      <img src="client/assets/img/partner/5.png" alt="logo" />
                    </a>
                  </div>
                  <div className="partner_logo">
                    <a href="#!">
                      <img src="client/assets/img/partner/6.png" alt="logo" />
                    </a>
                  </div>
                  <div className="partner_logo">
                    <a href="#!">
                      <img src="client/assets/img/partner/7.png" alt="logo" />
                    </a>
                  </div>
                  <div className="partner_logo">
                    <a href="#!">
                      <img src="client/assets/img/partner/8.png" alt="logo" />
                    </a>
                  </div>
                  <div className="partner_logo">
                    <a href="#!">
                      <img src="client/assets/img/partner/5.png" alt="logo" />
                    </a>
                  </div>
                  <div className="partner_logo">
                    <a href="#!">
                      <img src="client/assets/img/partner/3.png" alt="logo" />
                    </a>
                  </div>
                  <div className="partner_logo">
                    <a href="#!">
                      <img src="client/assets/img/partner/2.png" alt="logo" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Cta Area */}
      </div>
    </ClientLayout>
  );
}

export default Index;
