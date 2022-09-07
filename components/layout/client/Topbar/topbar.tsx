/* eslint-disable @next/next/no-img-element */
import React from "react";
import LogoImage from "@/public/client/assets/img/logoN.png";
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import { Skeleton } from "antd";

const TopBar = () => {
  const router = useRouter();
  const { data: countries, isValidating } = useSWR('user/countries');

  if (!countries && isValidating) return <Skeleton />

  return (
    <>
      <header className="main_header_arae">
        <div className="topbar-area">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-6">
                <ul className="topbar-list">
                  <li>
                    <a href="#!"><i className="fab fa-instagram"></i></a>
                    <a href="#!"><i className="fab fa-facebook"></i></a>
                    <a href="#!"><i className="fab fa-twitter-square"></i></a>
                    <a href="#!"><i className="fab fa-linkedin"></i></a>
                  </li>
                  <li><a href="#!"><span>+977 9860425223</span></a></li>
                  <li><a href="#!"><span>contact@godoftrek.com</span></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Navbar Bar */}
        <div className="navbar-area d-flex">
          <div className="main-responsive-nav">
            <div className="container">
              <div className="main-responsive-menu">
                <div className="logo">
                  <Link href="/">
                    <img src={LogoImage.src} alt="logo" width={'60'} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="main-navbar d-flex w-100">
            <div className="container-fluid">
              <nav className="navbar navbar-expand-md navbar-light">
                <a className="navbar-brand" href="index.html">
                  <img src={LogoImage.src} alt="logo" width={"110"} />
                </a>
                <div
                  className="collapse navbar-collapse mean-menu"
                  id="navbarSupportedContent"
                >

                  <ul className="navbar-nav gap-3">
                    <li className="nav-item">
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          router.push("/");
                        }}
                        href="_target"
                        className={`nav-link ${router.asPath === '/' ? 'active' : ''}`}
                      >
                        Home
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Destination
                        <i className="fas fa-angle-down" />
                      </a>
                      <ul className="dropdown-menu">

                        {
                          countries?.map((res: any, key: number) => (
                            // eslint-disable-next-line react/jsx-key
                            <li className="nav-item" key={key}>
                              <a href="tour-search.html" className="nav-link">
                                {res.name}
                              </a>
                              <ul className="dropdown-menu">

                                {
                                  res?.regions?.map((resRegion: any, key: number) => (
                                    // eslint-disable-next-line react/jsx-key
                                    <li className="nav-item" key={key}>
                                      <a href="tour-search.html" className="nav-link">
                                        {resRegion.name}
                                      </a>

                                      <ul className="dropdown-menu">
                                        {
                                          resRegion?.destinatoins?.map((resDes: any, key: number) => (
                                            // eslint-disable-next-line react/jsx-key
                                            <li className="nav-item" key={key}>
                                              <a href="tour-search.html" className="nav-link">
                                                {resDes.name} - <span className="text-danger">{resDes.no_of_days} days</span>
                                              </a>
                                            </li>
                                          ))
                                        }
                                      </ul>
                                    </li>
                                  ))
                                }
                              </ul>
                            </li>
                          ))
                        }

                        {/* <li className="nav-item">
                          <a href="tour-search.html" className="nav-link">
                            Tour
                          </a>
                          <ul className="dropdown-menu">
                            <li className="nav-item">
                              <a href="tour-search.html" className="nav-link">
                                Tour
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="tour-details.html" className="nav-link">
                                Tour Details
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                href="tour-booking-submission.html"
                                className="nav-link"
                              >
                                Tour Booking
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="nav-item">
                          <a href="tour-details.html" className="nav-link">
                            Tour Details
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="tour-booking-submission.html"
                            className="nav-link"
                          >
                            Tour Booking
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="top-destinations.html" className="nav-link">
                            Top Destination
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="top-destinations-details.html"
                            className="nav-link"
                          >
                            Destination Details
                          </a>
                        </li> */}
                      </ul>
                    </li>

                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Experience
                        <i className="fas fa-angle-down" />
                      </a>
                      <ul className="dropdown-menu">
                        <li className="nav-item">
                          <a
                            href="flight-search-result.html"
                            className="nav-link"
                          >
                            Flight
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="flight-booking-submission.html"
                            className="nav-link"
                          >
                            Flight Booking
                          </a>
                        </li>
                      </ul>
                    </li>

                    <li className="nav-item">
                      <Link href="/blogs" className="nav-link">
                        Blogs
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link href="/blogs" className="nav-link">
                        Offers
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/contact" className="nav-link">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>

            <div className="others-option-for-responsive d-block my-auto ml-auto">
              <div className="container-fluid">
                {/* <div className="dot-menu">
                <div className="inner">
                  <div className="circle circle-one" />
                  <div className="circle circle-two" />
                  <div className="circle circle-three" />
                </div>
              </div> */}
                <div className="container">
                  <div className="option-inner">
                    <div className="others-options d-flex align-items-center">
                      <div className="option-item">
                        <a href="#" className="search-box">
                          <i className="fas fa-search" />
                        </a>
                      </div>
                      <div className="option-item">
                        <a href="contact.html" className="btn  btn_navber">
                          Get free quote
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* search */}
      <div className="search-overlay">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="search-overlay-layer" />
            <div className="search-overlay-layer" />
            <div className="search-overlay-layer" />
            <div className="search-overlay-close">
              <span className="search-overlay-close-line" />
              <span className="search-overlay-close-line" />
            </div>
            <div className="search-overlay-form">
              <form>
                <input
                  type="text"
                  className="input-search"
                  placeholder="Search here..."
                />
                <button type="button">
                  <i className="fas fa-search" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;
