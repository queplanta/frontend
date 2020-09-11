import React from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

const BreadcrumbsWithHome = (props) => (
  <>
    <BreadcrumbsItem to="/">Início</BreadcrumbsItem>
    {props.children}
  </>
);

export default BreadcrumbsWithHome;
