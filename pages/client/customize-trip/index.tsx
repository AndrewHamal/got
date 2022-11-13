/* eslint-disable @next/next/no-img-element */
import { customize } from '@/api/client/customize';
import CommonBanner from '@/components/common/Common_Banner';
import ClientLayout from '@/components/layout/client/ClientLayout'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import useSWR from 'swr';

function Customize() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function customizeTrip(e: any)
  {
    setLoading(true);
    e.preventDefault();
    let formData = new FormData(e.target);

    customize(formData)
    .then(res => {
      toast.success(res?.data?.message);
      setLoading(false);
      e.target.reset();
    }).catch(err => {
      setLoading(true);
    })
  }

  const { data, error } = useSWR(`user/region/filter`);

  return (
    <ClientLayout>
      <div>
        <CommonBanner
          loading={loading}
          breadcrumb={[
            { name: "Customize Trip", link: '/customize-trip' },
            { name: data?.name }
          ]}
          imageUrl={data?.files?.length ? data?.files[0]?.full_path : ""}
          title={'Customize Trip'}
        />
        
        <div className="container py-5">
          <form onSubmit={customizeTrip}>
            <div className="row">
              <div className="col-md-12 mb-4">
                <h4>Trip Information</h4>
              </div>
              <div className='col-md-4 mb-4'>
                <label htmlFor="">Trip Name</label>
                {!data ? 'Loading...' : 
                <select name='destination_id' required className='form-control'>
                  {
                    data?.map((res: any, key: number) => (
                      <option value={res.id} key={key}>{res.name}</option>
                    ))
                  }
                </select>}
              </div>

              <div className='col-md-4 mb-4'>
                <label htmlFor="">Hotel Booking</label>
                <select name='budget' className='form-control'>
                  <option value={'Low Budget'}>Low Budget</option>
                  <option value={'Mid Budget'}>Mid Budget</option>
                  <option value={'High Budget'}>High Budget</option>
                </select>
              </div>

              <div className='col-md-4 mb-4'>
                <label htmlFor="">Trip Duration in Days:</label>
                <input name='trip_duration' required type={"number"} className='form-control'/>
              </div>

              <div className='col-md-4 mb-4'>
                <label htmlFor=""> Number of Guests:</label>
                <input name='no_of_guests' required type={"number"}  className='form-control'/>
              </div>

              <div className='col-md-8 mb-4'>
                <label htmlFor="">Price Range (eg: $100 - $2000)</label>
                <div className='d-flex gap-4'>
                  <input placeholder='from' required name='range_from' type={"number"} className='form-control w-50'/>
                  <input placeholder='to' required name='range_to' type={"number"} className='form-control w-50'/>
                </div>
              </div>

              <div className='col-md-4 mb-4'>
                {/* <label htmlFor="">Trip Duration in Days:</label>
                <input className='form-control'/> */}
              </div>

              <div className="col-md-12 mb-4">
                <h4>Your Personal Information</h4>
              </div>

              <div className='col-md-4 mb-4'>
                <label htmlFor="">Name</label>
                <input name='name' required className='form-control'/>
              </div>

              <div className='col-md-4 mb-4'>
                <label htmlFor="">Email</label>
                <input type={"email"} name='email' required className='form-control'/>
              </div>

              <div className='col-md-4 mb-4'>
                <label htmlFor="">Country</label>
                <input name='country' className='form-control'/>
              </div>

              <div className='col-md-4 mb-4'>
                <label htmlFor="">Phone(landline)</label>
                <input name='landline' className='form-control'/>
              </div>

              <div className='col-md-4 mb-4'>
                <label htmlFor="">Phone(mobile)</label>
                <input name='mobile' required className='form-control'/>
              </div>

              <div className='col-md-12 mb-4'>
                <label htmlFor="">Your Message :</label>
                <textarea name='message' className='form-control'/>
              </div>

              <div className='col-md-12 mt-4'>
                <button disabled={loading} type='submit' className='btn btn-admin-primary'>
                  {loading ? 'Loading...' : 'Submit'} 
                </button>
              </div>
            </div>

          </form>
        </div>
      </div >

    </ClientLayout >
  )
}

export default Customize