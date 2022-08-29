import HotelGalleryComponent from '@/components/hoteladmin/forms/gallery'
import HoteladminLayout from '@/components/layout/hoteladmin'
import { Image } from 'antd'
import React from 'react'

function HotelGallery() {

  return (
    <HoteladminLayout title="Gallery">
      <div className="row justify-content-center">
        <div className="col-lg-12 card shadow">
          <div className="white_card card_height_100 mb_30">
            <div className="white_card_header">
              <div className="box_header m-0">
                <div className="main-title">
                  <h3 className="m-0">Image Gallery</h3>
                </div>
              </div>
            </div>
            <div className="white_card_body">
              <h6 className="card-subtitle mb-4">
                Upload your hotel image here
              </h6>
              <HotelGalleryComponent />
              <hr />
              <div className="mt-4 d-flex gap-5 flex-wrap">
                <Image
                  alt="img"
                  width={200}
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
                <Image
                  alt="img"
                  width={200}
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
              </div>
            </div>
          </div>
        </div >
      </div >
    </HoteladminLayout>
  )
}

export default HotelGallery