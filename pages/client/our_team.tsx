import CommonBanner from '@/components/common/Common_Banner'
import ClientLayout from '@/components/layout/client/ClientLayout'
import { Skeleton } from 'antd';
import React from 'react'
import useSWR from 'swr'

function OurTeam() {

  const { data } = useSWR('/user/blogs');
  const { data: teams } = useSWR('/user/teams');

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
       

            { !teams ? <div className="col-lg-3 col-md-6 col-sm-12 col-12"> <Skeleton active/> </div>
            : teams.map((res: any, key: number) => (
              // eslint-disable-next-line react/jsx-key
              <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                <div className="tour_guides_boxed">
                  <img src={res.full_path} alt="img" />
                  <div className="tour_guide_content">
                    <ul>
                      <li><a href={res.youtube_link} target={"_blank"} rel="noreferrer"><i className="fab fa-youtube" /></a></li>
                    </ul>
                    <h3>{ res.name }</h3>
                    <p className='text-capitalize'>{ res.designation }</p>
                  </div>
                </div>
              </div>
            )) 
            }
          </div>
        </div>
      </section>
    </ClientLayout>
  )
}

export default OurTeam