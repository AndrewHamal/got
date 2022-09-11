import SuperadminLayout from '@/components/layout/superadmin'
import React, { useState } from 'react'
import useSWR from 'swr'
import { Avatar, Divider, Empty, message, Pagination, Skeleton, Typography } from 'antd';
import Moment from 'react-moment';
const { Title } = Typography;

function PackageBooking() {

  const [page, setPage] = useState(1);
  const { data, error } = useSWR(`/admin/contact?page=${page}`);
  const loading = !data && !error;


  return (
    <SuperadminLayout title='Contact Listing'>
      {
        loading ?
          <div className='card' style={{ borderRadius: "20px" }}>
            <div className='card-body'>
              <Skeleton active className='mt-3' />
            </div>
          </div> :
          data.total > 0  ?
            <div className='row'>
              {data.data.map((book: any) =>
                <div className='col-md-6' key={book.id}>
                  <div className='card mb-4' style={{ borderRadius: "20px" }}>
                    <div className='card-body'>
                      <div className='d-flex align-items-center gap-2 mb-3'>
                        <label>Created At: </label>
                        <span><Moment fromNow>{book.created_at}</Moment></span>
                      </div>
                      {/* <div>
                        <span className='f-20'>{book.destination.name}</span>
                        <br />
                        <span className='f-18'><i>{book.package.name}</i></span>
                      </div> */}
                      {/* info */}
                      <div className='d-flex align-items-center gap-2 flex-wrap'>
                        {/* name */}
                        <div className='d-flex align-items-center gap-1'>
                          <i className="fa fa-user" /><Title className='mb-0' level={5}>{book.first_name} {book.last_name}</Title>
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
                      </div>
                      <Divider className='mb-3'/>
                        <h5 className='mt-0'>Message</h5>
                        <p> { book.message } </p>
                    </div>
                  </div>
                </div>
              )}

            <div className="col-lg-12">
                <div className="pagination_area">
                  <Pagination
                    style={{ visibility: data?.last_page > 1 ? "visible" : "hidden" }}
                    onChange={setPage}
                    className='pagination'
                    defaultCurrent={data.current_page}
                    pageSize={data.per_page}
                    total={data.total}
                    />
                </div>
            </div>
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