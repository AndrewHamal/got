import HoteladminLayout from '@/components/layout/hoteladmin';
import axiosServer from '@/services/axios/serverfetch';
import { TOKEN_KEY, USER_TYPE_KEY } from '@/services/constants';
import { appDecrypt } from '@/services/helper';
import { deleteCookie, getCookie } from 'cookies-next';
import { NextPageContext } from 'next'
import React from 'react'

function HoteladminIndex() {
    return (
        <HoteladminLayout title='Dashboard'>
            <></>
        </HoteladminLayout>

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

    if (!hotelUser.hotel_id) {
        return {
            redirect: {
                destination: '/hoteladmin/hotel/create'
            }
        }
    }

    return {
        props: {}
    }
}

export default HoteladminIndex