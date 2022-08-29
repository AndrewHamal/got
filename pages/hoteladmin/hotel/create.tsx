/* eslint-disable @next/next/no-img-element */
import { createHotel } from '@/api/hoteladmin/hotel';
import { appDecrypt, objectToFormData, responseErrorHandler } from '@/services/helper';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import HoteladminTopbar from '@/components/layout/hoteladmin/Topbar';
import useUser from '@/services/hooks/useUser';
import { NextPageContext } from 'next';
import { deleteCookie, getCookie } from 'cookies-next';
import { TOKEN_KEY, USER_TYPE_KEY } from '@/services/constants';
import axiosServer from '@/services/axios/serverfetch';
import Router from 'next/router';
import HotelForm from '@/components/hoteladmin/forms/hotel';

export default function CreateHotel() {

  const [loading, setLoading] = useState(false);
  const formMethods = useForm();
  const { reset, setError } = formMethods;
  const { mutateUser } = useUser();

  function createHotelHandler(data: any) {
    setLoading(true);
    createHotel(objectToFormData(data))
      .then((res: any) => {
        reset();
        mutateUser();
        toast.success(res.message);
        Router.push('/hoteladmin');
      })
      .catch((err: any) => responseErrorHandler(err, setError))
      .finally(() => setLoading(false))
  }

  return (
    <>
      <HoteladminTopbar />
      <div className="row justify-content-center" style={{ marginTop: "5em" }}>
        <div className="col-lg-6 card shadow">
          <div className="white_card card_height_100 mb_30">
            <div className="white_card_header">
              <div className="box_header m-0">
                <div className="main-title">
                  <h3 className="m-0">Create Hotel</h3>
                </div>
              </div>
            </div>
            <div className="white_card_body">
              <h6 className="card-subtitle mb-4">
                Enter your hotel details to get a dashboard
              </h6>
              <HotelForm
                submitHandler={createHotelHandler}
                loading={loading}
                formMethods={formMethods}
              />
            </div>
          </div>
        </div >
      </div >
    </>
  )
}


export const getServerSideProps = async (ctx: NextPageContext) => {
  const { req, res } = ctx;
  const token = appDecrypt(getCookie(TOKEN_KEY, ctx) + "");

  const { data: hotelUser } = await axiosServer(token).get('/hotel/user')
    .catch((err: any) => {
      console.log({ err });

      deleteCookie(USER_TYPE_KEY, { req, res });
      deleteCookie(TOKEN_KEY, { req, res });

      return {
        redirect: {
          destination: '/client'
        }
      }
    })

  if (hotelUser.hotel_id) {
    return {
      redirect: {
        destination: '/hoteladmin/hotel/update'
      }
    }
  }

  return {
    props: {}
  }
}