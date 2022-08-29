import { Breadcrumb } from "antd";
import Link from "next/link";
import React, { ReactElement, useEffect, useState } from "react";
import SuperadminSidebar from "./Sidebar";
import SuperadminTopbar from "./Topbar";

interface IBreadcrumb {
  name: string;
  link?: string;
}

interface IProps {
  title: string;
  breadcrumbs?: Array<IBreadcrumb>;
  children: ReactElement | Array<ReactElement>;
}

function SuperadminLayout(props: IProps) {
  const [value, setValue] = useState(false);
  //   $(".sidebar").toggleClass("mini_sidebar");
  //   $(".main_content ").toggleClass("full_main_content");
  //   $(".footer_part ").toggleClass("full_footer");

  useEffect(() => { }, [value]);
  return (
    <>
      <SuperadminSidebar sidebarBoolean={value} />
      <section
        className={`main_content dashboard_part large_header_bg ${value && "full_main_content"
          }`}
      >
        <SuperadminTopbar />
        <div className="main_content_iner">
          <div className="container-fluid p-0">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="dashboard_header mb_50">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="dashboard_header_title">
                        <h3> {props.title}</h3>
                      </div>
                      {props.breadcrumbs?.length
                        ? props.breadcrumbs.map((bd) => {
                          if (bd.link) {
                            return (
                              <Breadcrumb.Item>
                                <Link href={bd.link}>{bd.name}</Link>
                              </Breadcrumb.Item>
                            );
                          } else {
                            return (
                              <Breadcrumb.Item>{bd.name}</Breadcrumb.Item>
                            );
                          }
                        })
                        : null}
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
  );
}

export default SuperadminLayout;
