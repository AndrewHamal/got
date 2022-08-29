import React from "react";
import LogoImage from "@/public/client/assets/img/logoSVG.svg";
import { useRouter } from "next/router";

const TopBar = () => {
  const router = useRouter();
  return (
    <>
      <header className="main_header_arae">
        {/* Top Bar */}
        <div className="topbar-area">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-6">
                <ul className="topbar-list">
                  <li>
                    <a href="#!">
                      <i className="fab fa-facebook" />
                    </a>
                    <a href="#!">
                      <i className="fab fa-twitter-square" />
                    </a>
                    <a href="#!">
                      <i className="fab fa-instagram" />
                    </a>
                    <a href="#!">
                      <i className="fab fa-linkedin" />
                    </a>
                  </li>
                  <li>
                    <a href="#!">
                      <span>+977-9868108816</span>
                    </a>
                  </li>
                  <li>
                    <a href="#!">
                      <span>contact@xyz.com</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-6 col-md-6">
                <ul className="topbar-others-options">
                  <li>
                    <a
                      href="_target"
                      onClick={(e) => {
                        e.preventDefault();
                        router.push("/login");
                      }}
                    >
                      Login
                    </a>
                  </li>
                  <li>
                    <a
                      href="_target"
                      onClick={(e) => {
                        e.preventDefault();
                        router.push("/register");
                      }}
                    >
                      Sign up
                    </a>
                  </li>
                  <li>
                    <div className="dropdown language-option">
                      <button
                        className="dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <span className="lang-name" />
                      </button>
                      <div className="dropdown-menu language-dropdown-menu">
                        <a className="dropdown-item" href="#">
                          English
                        </a>
                        <a className="dropdown-item" href="#">
                          Arabic
                        </a>
                        <a className="dropdown-item" href="#">
                          French
                        </a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="dropdown language-option">
                      <button
                        className="dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <span className="lang-name" />
                      </button>
                      <div className="dropdown-menu language-dropdown-menu">
                        <a className="dropdown-item" href="#">
                          USD
                        </a>
                        <a className="dropdown-item" href="#">
                          BD
                        </a>
                        <a className="dropdown-item" href="#">
                          URO
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Navbar Bar */}
        <div className="navbar-area">
          <div className="main-responsive-nav">
            <div className="container">
              <div className="main-responsive-menu">
                <div className="logo">
                  <a href="index.html">
                    <img src={LogoImage.src} alt="logo" />
                  </a>
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
                        className="nav-link active"
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
                      <a href="#" className="nav-link">
                        News
                        <i className="fas fa-angle-down" />
                      </a>
                      <ul className="dropdown-menu">
                        <li className="nav-item">
                          <a href="news.html" className="nav-link">
                            News
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="news-details.html" className="nav-link">
                            New Details
                          </a>
                        </li>
                      </ul>
                    </li>
                    {/* <li className="nav-item">
                      <a href="#" className="nav-link">
                        Pages
                        <i className="fas fa-angle-down" />
                      </a>
                      <ul className="dropdown-menu">
                        <li className="nav-item">
                          <a href="about.html" className="nav-link">
                            About
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="tour-guides.html" className="nav-link">
                            Team
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="testimonials.html" className="nav-link">
                            Testimonials
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="faqs.html" className="nav-link">
                            FAQ
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="booking-confirmation.html"
                            className="nav-link"
                          >
                            Booking Confirmation
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="#" className="nav-link">
                            User Pages
                          </a>
                          <ul className="dropdown-menu">
                            <li className="nav-item">
                              <a href="login.html" className="nav-link">
                                Login
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="register.html" className="nav-link">
                                Register
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                href="forgot-password.html"
                                className="nav-link"
                              >
                                Forget Password
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="verify-otp.html" className="nav-link">
                                Verify OTP
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                href="reset-password.html"
                                className="nav-link"
                              >
                                Reset Password
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="nav-item">
                          <a href="#" className="nav-link">
                            Customer Dashboard
                          </a>
                          <ul className="dropdown-menu">
                            <li className="nav-item">
                              <a href="dashboard.html" className="nav-link">
                                Dashboard
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="hotel-booking.html" className="nav-link">
                                Hotel booking
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                href="flight-booking.html"
                                className="nav-link"
                              >
                                Flight booking
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="tour-booking.html" className="nav-link">
                                Tour booking
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                href="booking-history.html"
                                className="nav-link"
                              >
                                Booking history
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="my-profile.html" className="nav-link">
                                My profile
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="wallet.html" className="nav-link">
                                Wallet
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="notification.html" className="nav-link">
                                Notifications
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="nav-item">
                          <a href="privacy-policy.html" className="nav-link">
                            Privacy Policy
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="error.html" className="nav-link">
                            404 Error
                          </a>
                        </li>
                      </ul>
                    </li> */}
                    <li className="nav-item">
                      <a href="contact.html" className="nav-link">
                        Contact
                      </a>
                    </li>
                  </ul>
                  <div className="others-options d-flex align-items-center">
                    <div className="option-item">
                      <a href="#" className="search-box">
                        <i className="bi bi-search" />
                      </a>
                    </div>
                    <div className="option-item">
                      <a href="become-vendor.html" className="btn  btn_navber">
                        Become a partner
                      </a>
                    </div>
                  </div>
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
