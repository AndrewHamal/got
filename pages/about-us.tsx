import CommonBanner from '@/components/common/Common_Banner'
import ClientLayout from '@/components/layout/client/ClientLayout'
import Router from 'next/router';
import React from 'react'
import useSWR from 'swr';

function AboutUs() {

  const { data } = useSWR('/user/blogs');

  return (
    <ClientLayout>
      <div>
        <CommonBanner title='About Us' loading={!data} imageUrl={data?.data?.length ? data?.data[0]?.full_path : ""} breadcrumb={[{ name: "About Us" }]} />
        {/* About Us */}
        <section id="about_us_top" className="section_padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="about_us_left">
                  <h5>About us</h5>
                  <h2>We Are The World Best Travel Agency Company Since 2000</h2>
                  <p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
                    no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                    dolor sit amet, consetetur sadipscing elitr </p>
                  <p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
                    no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                    dolor sit amet, consetetur sadipscing elitr </p>
                  <a onClick={() => Router.push('/listing')} className="btn btn_theme btn_md">Find Regions</a>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about_us_right">
                  <img src="client/assets/img/common/abour_right.png" alt="img" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* About Service Area */}
        <section id="about_service_offer" className="section_padding_bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                <div className="about_service_boxed">
                  <img src="client/assets/img/icon/world.png" alt="img" />
                  <h5><a href="#!">Best services</a></h5>
                  <p>Phaseus site amet tristique ligua donec iaculis leo sus cipit. Consec tetur adipiscing elit.
                    Incididunt ut dolore.</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                <div className="about_service_boxed">
                  <img src="client/assets/img/icon/walte.png" alt="img" />
                  <h5><a href="#!">Trusted payment</a></h5>
                  <p>Phaseus site amet tristique ligua donec iaculis leo sus cipit. Consec tetur adipiscing elit.
                    Incididunt ut dolore.</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                <div className="about_service_boxed">
                  <img src="client/assets/img/icon/star.png" alt="img" />
                  <h5><a href="#!">Top facility</a></h5>
                  <p>Phaseus site amet tristique ligua donec iaculis leo sus cipit. Consec tetur adipiscing elit.
                    Incididunt ut dolore.</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                <div className="about_service_boxed">
                  <img src="client/assets/img/icon/persentis.png" alt="img" />
                  <h5><a href="#!">Awesome deals</a></h5>
                  <p>Phaseus site amet tristique ligua donec iaculis leo sus cipit. Consec tetur adipiscing elit.
                    Incididunt ut dolore.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ClientLayout>
  )
}

export default AboutUs