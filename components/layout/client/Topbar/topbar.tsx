/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import LogoImage from "@/public/client/assets/img/logoN.png";
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import { Skeleton } from "antd";

const TopBar = () => {
  const router = useRouter();
  const { data: countries, error, isValidating } = useSWR('user/countries');
  const { data: menu } = useSWR('user/menu');
  const countriesLoading = !countries && !error || isValidating;
  
  const [selectedCountry, setSelectedCountry] = useState();

  useEffect(() => {
    if(menu)
    {
      setSelectedCountry(menu[0].country_id)
    }
  }, [menu])

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

                    <li className="nav-item dropdown has-megamenu">
                      <a className="nav-link" href="#" data-bs-toggle="dropdown">
                        {" "}
                        Destination

                        <i className="fas fa-angle-down" />
                      </a>
                      <div className="dropdown-menu megamenu p-4" role="menu">
                        <div className="d-flex gap-5">
                          <div className="">
                            <h5 className="mt-0">Countries</h5>
                            {
                              countries?.map((res:any, key: number) => (
                                // eslint-disable-next-line react/jsx-key
                                <div key={key} className={`my-3 ${ selectedCountry === res.id ? 'bg-danger' : 'bg-dark ' } p-2 rounded pointer-cursor w-fit`} onClick={() => setSelectedCountry(res?.id)}> 
                                  <a className="fw-600 px-2">  <i className="fa fa-chevron-circle-right mr-3"></i> { res.name }</a> 
                                </div>
                              ))
                            }
                 
                          </div>
                          <div className="">
                            <div className="row g-3">
                              { !menu ? <Skeleton active paragraph={false} /> :
                                menu?.filter((res: any) => res.country_id === selectedCountry).length ?
                                menu?.filter((res: any) => res.country_id === selectedCountry)?.map((res: any, key: number) => (
                                  // eslint-disable-next-line react/jsx-key
                                  <div className="col-lg-2 col-6" key={key}>
                                    <div className="col-megamenu">

                                      <h6 className="title text">{ res.name }</h6>

                                      <img src={res.full_path} alt="" className="nav-image" />
                                      <ul className="list-unstyled mt-2">
                                        { res?.destinatoins?.length ?
                                          res?.destinatoins?.map((resDes:any, key: number) => (
                                            // eslint-disable-next-line react/jsx-key
                                            <li key={key} className="d-flex px-0 gap-2">
                                              <i className="fa fa-chevron-right my-auto mr-2 fa-sm"></i> <a href="#" className="lh-1">{ resDes.name }</a>
                                            </li>
                                          )) : <li className="px-0">
                                            <a href="#"><i className="fa fa-exclamation-circle mb-1"></i> No Data </a>
                                          </li>
                                        }
                                    
                                      </ul>
                                    </div>{" "}
                                    {/* col-megamenu.// */}
                                  </div>
                                )) : <li> <i className="fa fa-exclamation-circle"></i> No Data</li> 
                              }
                            </div>
                          </div>
                        </div>
                      </div>
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
