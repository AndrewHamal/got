import ClientLayout from "@/components/layout/client/ClientLayout";
import React from "react";

const Search = () => {
  return (
    <ClientLayout>
      <>
        <section id="common_banner">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="common_bannner_text">
                  <h2>Hotel search result</h2>
                  <ul>
                    <li>
                      <a href="index.html">Home</a>
                    </li>
                    <li>
                      <span>
                        <i className="fas fa-circle"></i>
                      </span>{" "}
                      Hotel
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="theme_search_form_tour">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="theme_search_form_area">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="tour_search_form">
                        <form action="https://andit.co/projects/html/and-tour/!#">
                          <div className="row">
                            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                              <div className="flight_Search_boxed">
                                <p>Destination</p>
                                <input
                                  type="text"
                                  placeholder="Where are you going?"
                                />
                                <span>Where are you going?</span>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                              <div className="form_search_date">
                                <div className="flight_Search_boxed date_flex_area">
                                  <div className="Journey_date">
                                    <p>Check In date</p>
                                    <input type="date" value="2022-05-03" />
                                    <span>Thursday</span>
                                  </div>
                                  <div className="Journey_date">
                                    <p>Check Out date</p>
                                    <input type="date" value="2022-05-05" />
                                    <span>Thursday</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                              <div className="flight_Search_boxed dropdown_passenger_area">
                                <p>Passenger, className </p>
                                <div className="dropdown">
                                  <button
                                    className="dropdown-toggle final-count"
                                    data-toggle="dropdown"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    1 Guests
                                  </button>
                                  <div
                                    className="dropdown-menu dropdown_passenger_info"
                                    aria-labelledby="dropdownMenuButton1"
                                  >
                                    <div className="traveller-calulate-persons">
                                      <div className="passengers">
                                        <h6>Guests</h6>
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
                                                <i className="fas fa-plus"></i>
                                              </button>
                                              <button
                                                type="button"
                                                className="btn-subtract"
                                              >
                                                <i className="fas fa-minus"></i>
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
                                                <i className="fas fa-plus"></i>
                                              </button>
                                              <button
                                                type="button"
                                                className="btn-subtract-c"
                                              >
                                                <i className="fas fa-minus"></i>
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
                                                <i className="fas fa-plus"></i>
                                              </button>
                                              <button
                                                type="button"
                                                className="btn-subtract-in"
                                              >
                                                <i className="fas fa-minus"></i>
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <span>Business</span>
                              </div>
                            </div>
                            <div className="top_form_search_button">
                              <button
                                className="btn btn_theme btn_md"
                                type="button"
                              >
                                Search
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="explore_area" className="section_padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="section_heading_center">
                  <h2>38 hotel found</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3">
                <div className="left_side_search_area">
                  <div className="left_side_search_boxed">
                    <div className="left_side_search_heading">
                      <h5>Filter by price</h5>
                    </div>
                    <div className="filter-price">
                      <div id="price-slider"></div>
                    </div>
                    <button className="apply" type="button">
                      Apply
                    </button>
                  </div>
                  <div className="left_side_search_boxed">
                    <div className="left_side_search_heading">
                      <h5>Filter by Review</h5>
                    </div>
                    <div className="filter_review">
                      <form className="review_star">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label className="form-check-label">
                            <i className="fas fa-star color_theme"></i>
                            <i className="fas fa-star color_theme"></i>
                            <i className="fas fa-star color_theme"></i>
                            <i className="fas fa-star color_theme"></i>
                            <i className="fas fa-star color_theme"></i>
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault1"
                          />
                          <label className="form-check-label">
                            <i className="fas fa-star color_theme"></i>
                            <i className="fas fa-star color_theme"></i>
                            <i className="fas fa-star color_theme"></i>
                            <i className="fas fa-star color_theme"></i>
                            <i className="fas fa-star color_asse"></i>
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault2"
                          />
                          <label className="form-check-label">
                            <i className="fas fa-star color_theme"></i>
                            <i className="fas fa-star color_theme"></i>
                            <i className="fas fa-star color_theme"></i>
                            <i className="fas fa-star color_asse"></i>
                            <i className="fas fa-star color_asse"></i>
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault3"
                          />
                          <label className="form-check-label">
                            <i className="fas fa-star color_theme"></i>
                            <i className="fas fa-star color_theme"></i>
                            <i className="fas fa-star color_asse"></i>
                            <i className="fas fa-star color_asse"></i>
                            <i className="fas fa-star color_asse"></i>
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault5"
                          />
                          <label className="form-check-label">
                            <i className="fas fa-star color_theme"></i>
                            <i className="fas fa-star color_asse"></i>
                            <i className="fas fa-star color_asse"></i>
                            <i className="fas fa-star color_asse"></i>
                            <i className="fas fa-star color_asse"></i>
                          </label>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="left_side_search_boxed">
                    <div className="left_side_search_heading">
                      <h5>Filter by hotel star</h5>
                    </div>
                    <div className="filter_review">
                      <form className="review_star">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefaulta"
                          />
                          <label className="form-check-label">
                            <i className="fas fa-star color_theme"></i>
                            <i className="fas fa-star color_theme"></i>
                            <i className="fas fa-star color_theme"></i>
                            <i className="fas fa-star color_theme"></i>
                            <i className="fas fa-star color_theme"></i>
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefaulf21"
                          />
                          <label className="form-check-label">
                            <i className="fas fa-star color_theme"></i>
                            <i className="fas fa-star color_theme"></i>
                            <i className="fas fa-star color_theme"></i>
                            <i className="fas fa-star color_theme"></i>
                            <i className="fas fa-star color_asse"></i>
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefaultf3"
                          />
                          <label className="form-check-label">
                            <i className="fas fa-star color_theme"></i>
                            <i className="fas fa-star color_theme"></i>
                            <i className="fas fa-star color_theme"></i>
                            <i className="fas fa-star color_asse"></i>
                            <i className="fas fa-star color_asse"></i>
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefaultf4"
                          />
                          <label className="form-check-label">
                            <i className="fas fa-star color_theme"></i>
                            <i className="fas fa-star color_theme"></i>
                            <i className="fas fa-star color_asse"></i>
                            <i className="fas fa-star color_asse"></i>
                            <i className="fas fa-star color_asse"></i>
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefaultf5"
                          />
                          <label className="form-check-label">
                            <i className="fas fa-star color_theme"></i>
                            <i className="fas fa-star color_asse"></i>
                            <i className="fas fa-star color_asse"></i>
                            <i className="fas fa-star color_asse"></i>
                            <i className="fas fa-star color_asse"></i>
                          </label>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="left_side_search_boxed">
                    <div className="left_side_search_heading">
                      <h5>Facilities</h5>
                    </div>
                    <div className="tour_search_type">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefaultf1"
                        />
                        <label className="form-check-label">
                          <span className="area_flex_one">
                            <span>Wake-up call</span>
                            <span>20</span>
                          </span>
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefaultf2"
                        />
                        <label className="form-check-label">
                          <span className="area_flex_one">
                            <span>Flat TV</span>
                            <span>14</span>
                          </span>
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefaultaf3"
                        />
                        <label className="form-check-label">
                          <span className="area_flex_one">
                            <span>Vehicle service</span>
                            <span>30</span>
                          </span>
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefaultaf4"
                        />
                        <label className="form-check-label">
                          <span className="area_flex_one">
                            <span>Guide service</span>
                            <span>22</span>
                          </span>
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefaultaf5"
                        />
                        <label className="form-check-label">
                          <span className="area_flex_one">
                            <span>Internet, Wi-fi</span>
                            <span>41</span>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="left_side_search_boxed">
                    <div className="left_side_search_heading">
                      <h5>Hotel service</h5>
                    </div>
                    <div className="tour_search_type">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefaultt1"
                        />
                        <label className="form-check-label">
                          <span className="area_flex_one">
                            <span>Gymnasium</span>
                            <span>20</span>
                          </span>
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefaultt2"
                        />
                        <label className="form-check-label">
                          <span className="area_flex_one">
                            <span>Mountain Bike</span>
                            <span>14</span>
                          </span>
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefaultt3"
                        />
                        <label className="form-check-label">
                          <span className="area_flex_one">
                            <span>Wifi</span>
                            <span>62</span>
                          </span>
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefaultt4"
                        />
                        <label className="form-check-label">
                          <span className="area_flex_one">
                            <span>Aerobics Room</span>
                            <span>08</span>
                          </span>
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefaultt5"
                        />
                        <label className="form-check-label">
                          <span className="area_flex_one">
                            <span>Golf Cages</span>
                            <span>12</span>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="row">
                  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="theme_common_box_two">
                      <div className="theme_two_box_img">
                        <a href="hotel-details.html">
                          <img src="assets/img/tab-img/hotel1.png" alt="img" />
                        </a>
                        <p>
                          <i className="fas fa-map-marker-alt"></i>New beach,
                          Thailand
                        </p>
                      </div>
                      <div className="theme_two_box_content">
                        <h4>
                          <a href="hotel-details.html">
                            Kantua hotel, Thailand
                          </a>
                        </h4>
                        <p>
                          <span className="review_rating">4.8/5 Excellent</span>{" "}
                          <span className="review_count">(1214 reviewes)</span>
                        </p>
                        <h3>
                          $99.00 <span>Price starts from</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="theme_common_box_two">
                      <div className="theme_two_box_img">
                        <a href="hotel-details.html">
                          <img src="assets/img/tab-img/hotel2.png" alt="img" />
                        </a>
                        <p>
                          <i className="fas fa-map-marker-alt"></i>Indonesia
                        </p>
                        <div className="discount_tab">
                          <span>50%</span>
                        </div>
                      </div>
                      <div className="theme_two_box_content">
                        <h4>
                          <a href="hotel-details.html">
                            Hotel paradise international
                          </a>
                        </h4>
                        <p>
                          <span className="review_rating">4.8/5 Excellent</span>{" "}
                          <span className="review_count">(1214 reviewes)</span>
                        </p>
                        <h3>
                          $99.00 <span>Price starts from</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="theme_common_box_two">
                      <div className="theme_two_box_img">
                        <a href="hotel-details.html">
                          <img src="assets/img/tab-img/hotel3.png" alt="img" />
                        </a>
                        <p>
                          <i className="fas fa-map-marker-alt"></i>Kualalampur
                        </p>
                      </div>
                      <div className="theme_two_box_content">
                        <h4>
                          <a href="hotel-details.html">Hotel kualalampur</a>
                        </h4>
                        <p>
                          <span className="review_rating">4.8/5 Excellent</span>{" "}
                          <span className="review_count">(1214 reviewes)</span>
                        </p>
                        <h3>
                          $99.00 <span>Price starts from</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="theme_common_box_two">
                      <div className="theme_two_box_img">
                        <a href="hotel-details.html">
                          <img src="assets/img/tab-img/hotel4.png" alt="img" />
                        </a>
                        <p>
                          <i className="fas fa-map-marker-alt"></i>Mariana
                          island
                        </p>
                        <div className="discount_tab">
                          <span>50%</span>
                        </div>
                      </div>
                      <div className="theme_two_box_content">
                        <h4>
                          <a href="hotel-details.html">Hotel deluxe</a>
                        </h4>
                        <p>
                          <span className="review_rating">4.8/5 Excellent</span>{" "}
                          <span className="review_count">(1214 reviewes)</span>
                        </p>
                        <h3>
                          $99.00 <span>Price starts from</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="theme_common_box_two">
                      <div className="theme_two_box_img">
                        <a href="hotel-details.html">
                          <img src="assets/img/tab-img/hotel5.png" alt="img" />
                        </a>
                        <p>
                          <i className="fas fa-map-marker-alt"></i>Kathmundu,
                          Nepal
                        </p>
                      </div>
                      <div className="theme_two_box_content">
                        <h4>
                          <a href="hotel-details.html">Hotel rajavumi</a>
                        </h4>
                        <p>
                          <span className="review_rating">4.8/5 Excellent</span>{" "}
                          <span className="review_count">(1214 reviewes)</span>
                        </p>
                        <h3>
                          $99.00 <span>Price starts from</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="theme_common_box_two">
                      <div className="theme_two_box_img">
                        <a href="hotel-details.html">
                          <img src="assets/img/tab-img/hotel6.png" alt="img" />
                        </a>
                        <p>
                          <i className="fas fa-map-marker-alt"></i>Beach view
                        </p>
                      </div>
                      <div className="theme_two_box_content">
                        <h4>
                          <a href="hotel-details.html">Thailand grand suit</a>
                        </h4>
                        <p>
                          <span className="review_rating">4.8/5 Excellent</span>{" "}
                          <span className="review_count">(1214 reviewes)</span>
                        </p>
                        <h3>
                          $99.00 <span>Price starts from</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="theme_common_box_two">
                      <div className="theme_two_box_img">
                        <a href="hotel-details.html">
                          <img src="assets/img/tab-img/hotel7.png" alt="img" />
                        </a>
                        <p>
                          <i className="fas fa-map-marker-alt"></i>Long island
                        </p>
                      </div>
                      <div className="theme_two_box_content">
                        <h4>
                          <a href="hotel-details.html">Zefi resort and spa</a>
                        </h4>
                        <p>
                          <span className="review_rating">4.8/5 Excellent</span>{" "}
                          <span className="review_count">(1214 reviewes)</span>
                        </p>
                        <h3>
                          $99.00 <span>Price starts from</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="theme_common_box_two">
                      <div className="theme_two_box_img">
                        <a href="hotel-details.html">
                          <img src="assets/img/tab-img/hotel8.png" alt="img" />
                        </a>
                        <p>
                          <i className="fas fa-map-marker-alt"></i>Philippine
                        </p>
                      </div>
                      <div className="theme_two_box_content">
                        <h4>
                          <a href="hotel-details.html">
                            Manila international resort
                          </a>
                        </h4>
                        <p>
                          <span className="review_rating">4.8/5 Excellent</span>{" "}
                          <span className="review_count">(1214 reviewes)</span>
                        </p>
                        <h3>
                          $99.00 <span>Price starts from</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="theme_common_box_two">
                      <div className="theme_two_box_img">
                        <a href="hotel-details.html">
                          <img src="assets/img/tab-img/hotel1.png" alt="img" />
                        </a>
                        <p>
                          <i className="fas fa-map-marker-alt"></i>New beach,
                          Thailand
                        </p>
                      </div>
                      <div className="theme_two_box_content">
                        <h4>
                          <a href="hotel-details.html">
                            Kantua hotel, Thailand
                          </a>
                        </h4>
                        <p>
                          <span className="review_rating">4.8/5 Excellent</span>{" "}
                          <span className="review_count">(1214 reviewes)</span>
                        </p>
                        <h3>
                          $99.00 <span>Price starts from</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="theme_common_box_two">
                      <div className="theme_two_box_img">
                        <a href="hotel-details.html">
                          <img src="assets/img/tab-img/hotel1.png" alt="img" />
                        </a>
                        <p>
                          <i className="fas fa-map-marker-alt"></i>New beach,
                          Thailand
                        </p>
                      </div>
                      <div className="theme_two_box_content">
                        <h4>
                          <a href="hotel-details.html">
                            Kantua hotel, Thailand
                          </a>
                        </h4>
                        <p>
                          <span className="review_rating">4.8/5 Excellent</span>{" "}
                          <span className="review_count">(1214 reviewes)</span>
                        </p>
                        <h3>
                          $99.00 <span>Price starts from</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="theme_common_box_two">
                      <div className="theme_two_box_img">
                        <a href="hotel-details.html">
                          <img src="assets/img/tab-img/hotel2.png" alt="img" />
                        </a>
                        <p>
                          <i className="fas fa-map-marker-alt"></i>Indonesia
                        </p>
                        <div className="discount_tab">
                          <span>50%</span>
                        </div>
                      </div>
                      <div className="theme_two_box_content">
                        <h4>
                          <a href="hotel-details.html">
                            Hotel paradise international
                          </a>
                        </h4>
                        <p>
                          <span className="review_rating">4.8/5 Excellent</span>{" "}
                          <span className="review_count">(1214 reviewes)</span>
                        </p>
                        <h3>
                          $99.00 <span>Price starts from</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="theme_common_box_two">
                      <div className="theme_two_box_img">
                        <a href="hotel-details.html">
                          <img src="assets/img/tab-img/hotel3.png" alt="img" />
                        </a>
                        <p>
                          <i className="fas fa-map-marker-alt"></i>Kualalampur
                        </p>
                      </div>
                      <div className="theme_two_box_content">
                        <h4>
                          <a href="hotel-details.html">Hotel kualalampur</a>
                        </h4>
                        <p>
                          <span className="review_rating">4.8/5 Excellent</span>{" "}
                          <span className="review_count">(1214 reviewes)</span>
                        </p>
                        <h3>
                          $99.00 <span>Price starts from</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="pagination_area">
                      <ul className="pagination">
                        <li className="page-item">
                          <a
                            className="page-link"
                            href="#"
                            aria-label="Previous"
                          >
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            1
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            2
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            3
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="cta_area">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <div className="cta_left">
                  <div className="cta_icon">
                    <img src="assets/img/common/email.png" alt="icon" />
                  </div>
                  <div className="cta_content">
                    <h4>Get the latest news and offers</h4>
                    <h2>Subscribe to our newsletter</h2>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="cat_form">
                  <form id="cta_form_wrappper">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your mail address"
                      />
                      <button className="btn btn_theme btn_md" type="button">
                        Subscribe
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </ClientLayout>
  );
};

export default Search;
