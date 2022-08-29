import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { SWRConfig } from 'swr';
import axiosClient from '@/services/axios/clientfetch';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import "@/public/admin/css/custom.css"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateIfStale: false,
        fetcher: (resource, init) => axiosClient(resource, init).then(res => res.data)
      }}
    >
      <ToastContainer />
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default App
