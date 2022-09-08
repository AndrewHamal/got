import CommonBanner from '@/components/common/Common_Banner'
import YoutubeFrame from '@/components/common/YoutubeFrame';
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
                <h2 className="mb-5">Trailer Video</h2>
                <YoutubeFrame
                  width="853"
                  height="480"
                  id="uUHb3cBvWMY"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="guide_heading_area pt-5">
                <h3>Our Collections</h3>
              </div>
            </div>
            <div className="col-md-6 col-sm-12 col-12 text-center mb-5">
              <YoutubeFrame
                id="Ou4u4kOatck"
              />
            </div>
            <div className="col-md-6 col-sm-12 col-12 text-center mb-5">
              <YoutubeFrame
                id="Ou4u4kOatck"
              />
            </div>
            <div className="col-md-6 col-sm-12 col-12 text-center mb-5">
              <YoutubeFrame
                id="Ou4u4kOatck"
              />
            </div>
            <div className="col-md-6 col-sm-12 col-12 text-center mb-5">
              <YoutubeFrame
                id="Ou4u4kOatck"
              />
            </div>
            <div className="col-md-6 col-sm-12 col-12 text-center mb-5">
              <YoutubeFrame
                id="Ou4u4kOatck"
              />
            </div>
            <div className="col-md-6 col-sm-12 col-12 text-center mb-5">
              <YoutubeFrame
                id="Ou4u4kOatck"
              />
            </div>
          </div>
        </div>
      </section>
    </ClientLayout>
  )
}

export default OurTeam