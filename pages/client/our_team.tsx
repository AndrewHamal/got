import CommonBanner from '@/components/common/Common_Banner'
import ClientLayout from '@/components/layout/client/ClientLayout'
import React from 'react'
import useSWR from 'swr'

function OurTeam() {

  const { data } = useSWR('/user/blogs');
  // const { data: teams } = useSWR('/user/teams');

  return (
    <ClientLayout>
      <CommonBanner title='Our Team' loading={!data} imageUrl={data?.data[0]?.full_path} breadcrumb={[{ name: "Our Team" }]} />
      <section id="tour_guides_area" className="section_padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="section_heading_center">
                <h2>Meet with our experienced team members</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="guide_heading_area pt-5">
                <h3>Our Team</h3>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="tour_guides_boxed">
                <img src="/client/assets/img/tour-guides/guide-5.png" alt="img" />
                <div className="tour_guide_content">
                  <ul>
                    <li><a href="https://www.youtube.com/watch?v=uUHb3cBvWMY" target={"_blank"} rel="noreferrer"><i className="fab fa-youtube" /></a></li>
                  </ul>
                  <h3>Anna naomi</h3>
                  <p>CTO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ClientLayout>
  )
}

export default OurTeam