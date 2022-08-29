import React, { ReactElement } from "react";
import Footer from "./Footer/footer";
import TopBar from "./Topbar/topbar";

interface IProps {
  children: ReactElement;
}
const ClientLayout = (props: IProps) => {
  return (
    <>
      <TopBar />
      {props.children}
      <Footer />
    </>
  );
};

export default ClientLayout;
