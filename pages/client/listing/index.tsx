/* eslint-disable @next/next/no-img-element */
import ClientLayout from "@/components/layout/client/ClientLayout";
import { Carousel, Empty, Skeleton } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

function ListingById() {
  const router = useRouter();
  let { region }: any = router.query;

  const [regions, setRegions] = useState(region);

  const { data: destinationHeader, error: destinationHeaderError } = useSWR(`user/region/filter?regions=${regions || ''}`);
  const { data: allRegions, error } = useSWR(`user/regions`);
  const destLoading = !destinationHeader && !destinationHeaderError;

  function checkRegion(e: any) {
    let id = e.target.value;
    if (region)
      id = region + ',' + id;
    else
      id = id;

    router.push({
      pathname: '/listing',
      query: { region: id }
    })

    setRegions(id);
  }

  return (
    <ClientLayout>
      {/* Common Banner Area */}
      <section>
        {destLoading ?
          <img style={{ height: "400px", objectFit: "cover" }} src={"/client/assets/img/imageplaceholder.jpg"} className="d-block w-100" alt={"placeholder"} />
          :
          // Banner Area 
          <Carousel autoplay dotPosition={'right'} effect="scrollx">
            {
              destinationHeader[0]?.files?.map((res: any, key: number) => (
                // eslint-disable-next-line react/jsx-key
                <div className="carousel" key={key}>
                  <div className="overlay"></div>
                  <img style={{ height: '400px' }} src={res?.full_path ?? "/client/assets/img/imageplaceholder.jpg"} className="d-block w-100" alt={res?.name} />
                  <div className="carousel-caption d-none mt-4 d-md-block">
                    <h2 className="text-white font-38">Destination by Region</h2>
                    <p className="heading-2 text-faded"> {destinationHeader[0]?.region?.name}  <i className="fa fa-chevron-right"></i></p>
                  </div>
                </div>
              ))
            }
          </Carousel>}

        {destinationHeader?.length === 0 && <div className="my-5"></div>}
      </section>

      {/* Destinations Areas */}
      <section id="top_testinations" className="section_padding">

        <div className="container">
          {/* Section Heading */}
          {destinationHeader?.length > 0 && <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="section_heading_center">
                <h2>{destinationHeader?.length} destinations found</h2>
              </div>
            </div>
          </div>}
          <div className="row">
            <div className="col-lg-3">
              <div className="left_side_search_area">
                <div className="left_side_search_boxed">
                  <div className="left_side_search_heading">
                    <h5>Filter by Regions</h5>
                  </div>
                  <div className="mt-0">
                    <form className="mt-4">
                      {
                        allRegions?.map((res: any, key: number) => (
                          // eslint-disable-next-line react/jsx-key
                          <div className="form-check mb-2" key={key}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue={res.id}
                              id={`flexCheckDefault${res.id}`}
                              onChange={checkRegion}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`flexCheckDefault${res.id}`}
                            >
                              {res.name}
                            </label>
                          </div>
                        ))
                      }

                    </form>
                  </div>
                </div>

                <div className="left_side_search_boxed">
                  <div className="left_side_search_heading">
                    <h5 className="mb-0">Filter by Starting Price</h5>
                  </div>
                  <div className="mt-4 mb-3">
                    <label htmlFor=""> Greater than ($) </label>
                    <div className="d-flex gap-3">
                      <input className="form-control" />
                      <button className="btn btn-primary w-100">Search</button>
                    </div>
                  </div>

                  <div className="">
                    <label htmlFor=""> Less than ($) </label>
                    <div className="d-flex gap-3">
                      <input className="form-control" />
                      <button className="btn btn-primary w-100">Search</button>
                    </div>
                  </div>
                </div>

                <div className="left_side_search_boxed">
                  <div className="left_side_search_heading">
                    <h5>Tour type</h5>
                  </div>
                  <div className="tour_search_type">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                        id="flexCheckDefaultf1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefaultf1"
                      >
                        <span className="area_flex_one">
                          <span>Ecotourism</span>
                          <span>17</span>
                        </span>
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                        id="flexCheckDefaultf2"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefaultf2"
                      >
                        <span className="area_flex_one">
                          <span>Escorted tour </span>
                          <span>14</span>
                        </span>
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                        id="flexCheckDefaultf3"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefaultf3"
                      >
                        <span className="area_flex_one">
                          <span>Family trips</span>
                          <span>30</span>
                        </span>
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                        id="flexCheckDefaultf4"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefaultf4"
                      >
                        <span className="area_flex_one">
                          <span>Group tour</span>
                          <span>22</span>
                        </span>
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                        id="flexCheckDefaultf5"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefaultf5"
                      >
                        <span className="area_flex_one">
                          <span>City trips</span>
                          <span>41</span>
                        </span>
                      </label>
                    </div>
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
                        defaultValue=""
                        id="flexCheckDefaultt1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefaultt1"
                      >
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
                        defaultValue=""
                        id="flexCheckDefaultt2"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefaultt2"
                      >
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
                        defaultValue=""
                        id="flexCheckDefaultt3"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefaultt3"
                      >
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
                        defaultValue=""
                        id="flexCheckDefaultt4"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefaultt4"
                      >
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
                        defaultValue=""
                        id="flexCheckDefaultt5"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefaultt5"
                      >
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
                {!destinationHeader ? <Skeleton /> : destinationHeader?.length ? destinationHeader?.map((res: any, key: number) => (
                  // eslint-disable-next-line react/jsx-key
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12" key={key}>
                    <div className="top_destinations_box img_hover">
                      <div className="heart_destinations bg-danger px-1 rounded">
                        {res.no_of_days} days
                      </div>
                      <Link href={`/destinations/${res.id}`}>
                        <img src={res.files[0].full_path} alt="img" style={{ height: '400px' }} />
                      </Link>
                      <div className="overlay"></div>
                      <div className="top_destinations_box_content">
                        <h4>
                          <Link href={`/destinations/${res.id}`}>{res.name}</Link>
                        </h4>
                        <p>
                          {JSON.parse(res.overview).blocks[0].text.substring(0, 200)}...
                        </p>
                        <h3>
                          ${res.starting_from}.00 <span>Price starts from</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                )) : <Empty description="No Data Found!" />
                }
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Cta Area */}
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
    </ClientLayout>
  )
}

export default ListingById;