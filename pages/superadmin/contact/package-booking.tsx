import SuperadminLayout from '@/components/layout/superadmin'
import React from 'react'
import useSWR from 'swr'
import { Avatar, Divider, Empty, message, Skeleton, Typography } from 'antd';
import Moment from 'react-moment';
const { Title } = Typography;

function PackageBooking() {

  const { data, error } = useSWR('/admin/booking');
  const loading = !data && !error;


  return (
    <SuperadminLayout title='Package Booking'>
      {
        loading ?
          <div className='card' style={{ borderRadius: "20px" }}>
            <div className='card-body'>
              <Skeleton active className='mt-3' />
            </div>
          </div> :
          data.length ?
            <div className='row'>
              {data.map((book: any) =>
                <div className='col-md-6' key={book.id}>
                  <div className='card mb-4' style={{ borderRadius: "20px" }}>
                    <div className='card-body'>
                      <div className='d-flex align-items-center gap-2 mb-3'>
                        <label>Created At: </label>
                        <span><Moment fromNow>{book.created_at}</Moment></span>
                      </div>
                      <div>
                        <span className='f-20'>{book.destination.name}</span>
                        <br />
                        <span className='f-18'><i>{book.package.name}</i></span>
                      </div>
                      {/* images */}
                      <div className='d-flex gap-5 my-3'>
                        {
                          book.photo_full_path &&
                          <Avatar className='cursor-pointer' size={80} src={book.photo_full_path} onClick={() => window.open(book.photo_full_path)} />
                        }
                        {
                          book.passport_full_path &&
                          <Avatar className='cursor-pointer' size={80} src={book.passport_full_path} onClick={() => window.open(book.passport_full_path)} />
                        }
                      </div>
                      {/* info */}
                      <div className='d-flex align-items-center gap-2 flex-wrap'>
                        {/* name */}
                        <div className='d-flex align-items-center gap-1'>
                          <i className="fa fa-user" /><Title className='mb-0' level={5}>{book.full_name}</Title>
                        </div>
                        <Divider type="vertical" />
                        {/* phone */}
                        <div className='d-flex align-items-center gap-1 cursor-pointer' onClick={() => {
                          navigator.clipboard.writeText(book.phone);
                          message.success("Copied phone to clipboard");
                        }}>
                          <i className="fa fa-phone" /><Title className='mb-0' level={5}>{book.phone}</Title>
                        </div>
                        <Divider type="vertical" />
                        {/* email */}
                        <div className='d-flex align-items-center gap-1 cursor-pointer' onClick={() => {
                          navigator.clipboard.writeText(book.email);
                          message.success("Copied email to clipboard");
                        }}>
                          <i className="fa fa-envelope" /><Title className='mb-0' level={5}>{book.email}</Title>
                        </div>
                        <Divider type="vertical" />
                        {/* address */}
                        <div className='d-flex align-items-center gap-1'>
                          <i className="fa fa-globe" /><Title className='mb-0' level={5}>{book.address}, {book.country}</Title>
                        </div>
                      </div>
                      <Divider />
                      {/* about booking */}
                      <div className='d-flex align-items-center gap-3 flex-wrap'>
                        {/* name */}
                        <div className='d-flex align-items-center gap-2'>
                          <label>No. of Guests: </label>
                          <span>{book.number_of_guests}</span>
                        </div>
                        <Divider type="vertical" />
                        {/* arrival */}
                        <div className='d-flex align-items-center gap-2'>
                          <label>Arrival Date: </label>
                          <span>{book.arrival_date}</span>
                        </div>
                        <Divider type="vertical" />
                        {/* departure */}
                        <div className='d-flex align-items-center gap-2'>
                          <label>Departure Date: </label>
                          <span>{book.departure_date}</span>
                        </div>
                        <Divider type="vertical" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            :
            <div className='card' style={{ borderRadius: "20px" }}>
              <div className='card-body py-5'>
                <Empty description="You don't currently have any bookings" />
              </div>
            </div>
      }

    </SuperadminLayout>
  )
}

export default PackageBooking