import { Breadcrumb } from 'antd'
import Link from 'next/link'
import React, { ReactElement } from 'react'
import HoteladminSidebar from './Sidebar'
import HoteladminTopbar from './Topbar'

interface IBreadcrumb {
    name: string
    link?: string
}

interface IProps {
    title: string
    breadcrumbs?: Array<IBreadcrumb>
    children: ReactElement | Array<ReactElement>
}

function HoteladminLayout(props: IProps) {
    return (
        <>
            <HoteladminSidebar />
            <section className="main_content dashboard_part large_header_bg">
                <HoteladminTopbar />
                <div className="main_content_iner ">
                    <div className="container-fluid p-0">
                        <div className="row justify-content-center">
                            <div className="col-12">
                                <div className="dashboard_header mb_50">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="dashboard_header_title">
                                                <h3> {props.title}</h3>
                                            </div>
                                            {
                                                props.breadcrumbs?.length ?
                                                    props.breadcrumbs.map(bd => {
                                                        if (bd.link) {
                                                            return (
                                                                <Breadcrumb.Item>
                                                                    <Link href={bd.link}>{bd.name}</Link>
                                                                </Breadcrumb.Item>
                                                            )
                                                        } else {
                                                            return (
                                                                <Breadcrumb.Item>{bd.name}</Breadcrumb.Item>
                                                            )
                                                        }
                                                    })
                                                    : null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {props.children}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HoteladminLayout