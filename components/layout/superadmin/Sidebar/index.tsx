/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { SuperadminSidebarMenus } from "./menu";

function SuperadminSidebar({ sidebarBoolean }: any) {
  const router = useRouter();

  const isActive = (link: string | undefined) => router.pathname === link;

  useEffect(() => {
    $("#sidebar_menu").metisMenu();
    $("#admin_profile_active").metisMenu();

    $("#sidebar_menu").find("a").removeClass("active");
    $("#sidebar_menu").find("li").removeClass("mm-active");
    $("#sidebar_menu").find("li ul").removeClass("mm-show");
    var current = window.location.pathname;

    $("#sidebar_menu >li a").filter(function () {
      var link = $(this).attr("href");
      if (link) {
        if (current.indexOf(link) != -1) {
          $(this)
            .parents()
            .parents()
            .children("ul.mm-collapse")
            .addClass("mm-show")
            .closest("li")
            .addClass("mm-active");
          // $(this).addClass("active");
          return false;
        }
      }
    });
  }, []);

  return (
    <nav className={`sidebar ${sidebarBoolean && "mini_sidebar"}`}>
      <div className="logo d-flex justify-content-between">
        <a className="large_logo" href="index-2.html">
          <img src="/admin/img/logo.png" alt="" />
        </a>
        <a className="small_logo" href="index-2.html">
          <img src="/admin/img/mini_logo.png" alt="" />
        </a>
        <div className="sidebar_close_icon d-lg-none">
          <i className="ti-close" />
        </div>
      </div>

      <ul id="sidebar_menu">

        {SuperadminSidebarMenus.map((menu) => {
          if (menu.parent) {
            return (
              <li key={menu.title}>
                <a className="has-arrow" href="#" aria-expanded="false">
                  <div className="nav_icon_small">
                    {/* <img src={menu.icon} alt={menu.title} /> */}
                    <i className={menu.icon} alt={menu.title}></i>
                  </div>
                  <div className="nav_title">
                    <span>{menu.title}</span>
                  </div>
                </a>
                <ul>
                  {menu.children.map((cmenu) => {
                    return (
                      <Link key={cmenu.title} href={cmenu.link}>
                        <a className={isActive(cmenu.link) ? "cactive" : ""}>
                          {cmenu.title}
                        </a>
                      </Link>
                    );
                  })}
                </ul>
              </li>
            );
          } else {
            return (
              <Link href={menu.link + ""}>
                <li
                  key={menu.title}
                  className={`${isActive(menu.link) ? "cactive" : ""
                    } sidebar_parent_link cursor-pointer`}
                >
                  <>
                    <div className="nav_icon_small">
                      {/* <img src={menu.icon} alt={menu.title} /> */}
                      <i className={menu.icon} alt={menu.title}></i>
                    </div>
                    <div className="nav_title">
                      <span>{menu.title}</span>
                    </div>
                  </>
                </li>
              </Link>
            );
          }
        })}
      </ul>
    </nav>
  );
}

export default SuperadminSidebar;
