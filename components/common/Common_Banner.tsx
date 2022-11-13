import Link from 'next/link'
import React, { ReactElement } from 'react'

interface IBreadcrumb {
  name: string,
  link?: string
}

interface IProps {
  loading: boolean
  breadcrumb: Array<IBreadcrumb>
  title: string
  imageUrl: string
}

function CommonBanner({ loading, breadcrumb, title, imageUrl }: IProps): ReactElement {

  if (loading && !imageUrl) {
    return (
      <section>
        <img style={{ height: "400px", objectFit: "cover" }} src={"/client/assets/img/imageplaceholder.jpg"} className="d-block w-100" alt={"placeholder"} />
      </section>
    )
  }

  return (
    <section id="common_banner" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="overlay"></div>
      <div className="container position-relative">
        <div className="row">
          <div className="col-lg-12">
            <div className="common_bannner_text">
              <h2 className='mt-5'>{title}</h2>
              <ul>
                <li><Link href="/">Home</Link></li>
                {
                  breadcrumb?.map((bd: IBreadcrumb, key) => {
                    if (bd.link) {
                      return <li key={key}><span><i className="fas fa-circle" /></span><Link href={`${bd.link}`}>{bd.name}</Link></li>
                    } else {
                      return <li key={key}><span><i className="fas fa-circle" /></span>{bd.name}</li>
                    }
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CommonBanner