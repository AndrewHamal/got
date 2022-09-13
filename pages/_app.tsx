import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { SWRConfig } from 'swr';
import axiosClient from '@/services/axios/clientfetch';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import "@/public/admin/css/custom.css"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { deleteCookie } from 'cookies-next';
import { logout } from '@/api/superadmin/auth';
import NextNProgress from "nextjs-progressbar";

function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        onError: async (error: any) => {

          if (error?.status === 401) {
            deleteCookie("token");
            await logout();
          }

          if (error?.status === 400) {
            toast.error(error?.message || error?.data?.message);
          }

          if (error?.status === 404) {
            toast.error("Requested Content Not Found!");
          }
        },
        revalidateOnFocus: false,
        fetcher: (resource, init) => axiosClient(resource, init).then(res => res)
      }}
    >
      <NextNProgress />
      <ToastContainer />
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default App
