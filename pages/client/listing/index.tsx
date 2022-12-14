import ClientLayout from "@/components/layout/client/ClientLayout";
import { Carousel, Empty, Skeleton } from "antd";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";

function ListingById() {
    const router = useRouter();
    let { region, greater_than, less_than, no_of_days, keyword: topKey }: any = router.query;
    let regRef: any = useRef();

    const [regions, setRegions] = useState(region);
    const [tour, setTour] = useState(false);
    const [keyword, setKeyword] = useState();
    const [trek, setTrek] = useState(false);
    const [lessThan, setLessThan] = useState('');
    const [noOfDays, setNoOfDays] = useState('');
    const [greaterThan, setGreaterThan] = useState('');

    const { data: destinationHeader, error: destinationHeaderError } = 
    useSWR(`user/region/filter?regions=${regions || ''}&less_than=${lessThan || ''}&greater_than=${greaterThan || ''}&no_of_days=${noOfDays || ''}&tour=${tour}&trek=${trek}&keyword=${keyword || ''}`);
    const { data: allRegions, error } = useSWR(`user/regions`);
    const destLoading = !destinationHeader && !destinationHeaderError;

    useEffect(() => {
      if(topKey){
        setKeyword(topKey)
      }
    }, [topKey])

    function checkRegion(e: any)
    {
      regRef.click();
    }

    function checkTour(e: any)
    {
      if(e.target.checked)
      {
        setTour(true);
      }else{
        setTour(false);
      }
    }

    function checkTrek(e: any)
    {
      if(e.target.checked)
      {
        setTrek(true);
      }else{
        setTrek(false);
      }
    }

    function search(e: any)
    {
      setKeyword(e.target.value);
    }

    const submitRegion = (event: any) => {
      event.preventDefault();
      let form: any = new FormData(event.target);

      let regionIds: any = [];
      for(var pair of form.entries()) {
        console.log(pair)
        regionIds.push(pair[1]);
      }
      
      regionIds = regionIds.join(',');
      setRegions(regionIds);
      router.push({
        pathname: '/listing',
        query: { 
          region: regionIds,
          less_than: less_than,
          greater_than: greater_than,
          no_of_days: no_of_days,
          trek: trek,
          tour: tour
        }
      })
    };
    
    useEffect(() => {
      if(tour){

      }
    }, [tour, trek])

    return (
      <ClientLayout>
        {/* Common Banner Area */}
         {/* <section>
          {destLoading ?
          <img style={{ height: "200px", objectFit: "cover" }} src={"/client/assets/img/imageplaceholder.jpg"} className="d-block w-100" alt={"placeholder"} />
          :
          // Banner Area 
          <Carousel autoplay dotPosition={'right'} effect="scrollx">
            {
              destinationHeader[0]?.files?.map((res: any, key: number) => (
                // eslint-disable-next-line react/jsx-key
                <div className="carousel" key={key}>
                  <div className="overlay"></div>
                  <img style={{ height: '200px' }} src={res?.full_path ?? "/client/assets/img/imageplaceholder.jpg"} className="d-block w-100" alt={res?.name} />
                  <div className="carousel-caption d-none mt-4 d-md-block">
                    <h2 className="text-white font-38">Destination by Region</h2>
                    <p className="heading-2 text-faded"> { destinationHeader[0]?.region?.name }  <i className="fa fa-chevron-right"></i></p>
                  </div>
                </div>
              ))
            }
          </Carousel>}

          { destinationHeader?.length === 0 && <div className="my-5"></div> }
        </section> */}

        {/* Destinations Areas */}
        <section id="top_testinations" className="section_padding">
          
          <div className="container mt-5">
            <div className="py-3"></div>
            {/* Section Heading */}
            { destinationHeader?.length > 0 && <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="section_heading_center">
                  <h2>{ destinationHeader?.length } destinations found</h2>
                </div>
              </div>
            </div>}
            <div className="row">
              <div className="col-lg-3">
                <input className="form-control border mb-3" onKeyUp={search} placeholder="Search By Keyword" />
                <div className="left_side_search_area">
                <div className="left_side_search_boxed">
                    <div className="left_side_search_heading">
                      <h5>Filter by Regions</h5>
                    </div>
                    <div className="mt-0">
                      <form className="mt-4" onSubmit={submitRegion}>
                        {
                          !allRegions ? <Skeleton/> : allRegions?.map((res: any, key: number) => (
                            // eslint-disable-next-line react/jsx-key
                            <div className="form-check mb-2" key={key}>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="region[]"
                                checked={region?.split(',').includes(res.id.toString()) ? true : false}
                                defaultValue={res.id}
                                id={`flexCheckDefault${res.id}`}
                                onChange={checkRegion}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`flexCheckDefault${res.id}`}
                              >
                                { res.name }
                              </label>

                              <button hidden type="submit" ref={(e: any) => regRef = e} ></button>
                            </div>
                          ))
                        }
                    
                      </form>
                    </div>
                  </div>

                  <div className="left_side_search_boxed">
                    <div className="left_side_search_heading">
                      <h5 className="mb-0">Filter by Tour/Trek</h5>
                    </div>
                    <div className="mt-4">
                      <div className="d-flex gap-3">
                        <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="tour"
                            value={1}
                            id={`flexCheckDefaultss`}
                            onChange={checkTour}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`flexCheckDefaultss`}
                          >
                            Tour
                          </label>
                        </div>
                      </div>

                      <div className="d-flex gap-3">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="trek"
                            value={2}
                            id={`flexCheckDefaultsss`}
                            onChange={checkTrek}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`flexCheckDefaultsss`}
                          >
                            Trek
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="left_side_search_boxed">
                    <div className="left_side_search_heading">
                      <h5 className="mb-0">Filter by Starting Price</h5>
                    </div>
                    <div className="mt-4 mb-3">
                      <label htmlFor=""> Greater than ($) </label>
                      <div className="d-flex gap-3">
                        <input defaultValue={greater_than} onKeyUp={(e: any) => { 
                          router.push({
                            pathname: '/listing',
                            query: { 
                              region: region,
                              less_than: less_than,
                              greater_than: e.target.value,
                              no_of_days: no_of_days 
                            }
                          }); 
                          setGreaterThan(e.target.value)}} className="form-control"/>
                      </div>
                    </div>

                    <div className="">
                      <label htmlFor=""> Less than ($) </label>
                      <div className="d-flex gap-3">
                        <input defaultValue={greater_than}  className="form-control" onKeyUp={(e: any) => { 
                          setLessThan(e.target.value);
                          router.push({
                            pathname: '/listing',
                            query: { 
                              region: region,
                              less_than: e.target.value,
                              greater_than: greater_than,
                              no_of_days: no_of_days 
                            }
                          });
                        }} />
                      </div>
                    </div>
                  </div>
   
                  <div className="left_side_search_boxed">
                    <div className="left_side_search_heading">
                      <h5>No of Days</h5>
                    </div>
                    <div className="tour_search_type">
                      <div className="">
                        <label htmlFor="">Select Trip days </label>
                        <div className="d-flex gap-3">
                          {/* <input className="form-control" onKeyUp={(e: any) => setLessThan(e.target.value)} /> */}
                          <select className="form-control" onChange={(e) => {
                              setNoOfDays(e.target.value);
                              router.push({
                                pathname: '/listing',
                                query: { 
                                  region: region,
                                  less_than: less_than,
                                  greater_than: greater_than,
                                  no_of_days: e.target.value 
                                }
                              });
                            }}>
                            {[2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29].map((res: any, key: number) => (
                              // eslint-disable-next-line react/jsx-key
                              <option value={res} selected={no_of_days?.toString() === res?.toString() ? true : false} key={key}>{res}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="row">
                  { !destinationHeader ? <Skeleton/> : destinationHeader?.length ? destinationHeader?.map((res: any, key: number) => (
                    // eslint-disable-next-line react/jsx-key
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12 position-relative left-0" key={key}>
                    {(res?.offer !== '') && <p className="position-absolute offer">{res?.offer}</p>}
                    <div className="top_destinations_box img_hover pointer-cursor" onClick={() => router.push(`destinations/${res.id}`)}>
                      <div className="heart_destinations bg-danger px-1 rounded">
                        { res.no_of_days } days
                      </div>
                      <a>
                        <img src={res.files[0].full_path} alt="img" style={{ height: '400px' }} />
                      </a>
                      <div className="overlay"></div>
                      <div className="top_destinations_box_content">
                        <h4 className="text-white">
                          <a onClick={() => router.push(`destinations/${res.id}`)}>{ res.name }</a>
                        </h4>
                        <p>
                          { JSON.parse(res.overview).blocks[0].text.substring(0, 200) }...
                        </p>
                        <h3>
                          ${res.starting_from}.00 <span>Price starts from</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                  )) : <Empty description="No Data Found!"/>
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
      </ClientLayout>
      )
}

export default ListingById;