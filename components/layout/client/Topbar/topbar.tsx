/* eslint-disable @next/next/no-img-element */
import React from "react";
import LogoImage from "@/public/client/assets/img/logoSVG.svg";
import { useRouter } from "next/router";
import Link from "next/link";

const TopBar = () => {
  const router = useRouter();
  console.log(router.asPath)
  return (
    <>
      <header className="main_header_arae">
        {/* Navbar Bar */}
        <div className="navbar-area">
          <div className="main-responsive-nav">
            <div className="container">
              <div className="main-responsive-menu">
                <div className="logo">
                  <Link href="/">
                    <img src={LogoImage.src} alt="logo" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="main-navbar">
            <div className="container">
              <nav className="navbar navbar-expand-md navbar-light">
                <a className="navbar-brand" href="index.html">
                  <img src={LogoImage.src} alt="logo" />
                </a>
                <div
                  className="collapse navbar-collapse mean-menu"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          router.push("/");
                        }}
                        href="_target"
                        className={`nav-link ${router.asPath === "/" && "active"}`}
                      >
                        Home
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Tours
                        <i className="fas fa-angle-down" />
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
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Flights
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
                      <a href="#" className="nav-link">
                        Hotel
                        <i className="fas fa-angle-down" />
                      </a>
                      <ul className="dropdown-menu">
                        <li className="nav-item">
                          <a href="hotel-search.html" className="nav-link">
                            Hotel
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="hotel-details.html" className="nav-link">
                            Hotel Booking
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="room-details.html" className="nav-link">
                            Room Details
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="room-booking.html" className="nav-link">
                            Room Booking
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <a href="#" className={`nav-link ${router.asPath.includes("/news") && "active"}`}>
                        News
                        <i className="fas fa-angle-down" />
                      </a>
                      <ul className="dropdown-menu">
                        <li className="nav-item">
                          <Link href="/news" className="nav-link">
                            News
                          </Link>
                        </li>
                        <li className="nav-item">
                          <a href="news-details.html" className="nav-link">
                            New Details
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <a href="contact.html" className="nav-link">
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
          <div className="others-option-for-responsive">
            <div className="container">
              <div className="dot-menu">
                <div className="inner">
                  <div className="circle circle-one" />
                  <div className="circle circle-two" />
                  <div className="circle circle-three" />
                </div>
              </div>
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
