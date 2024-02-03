import * as React from "react";
import { Breadcrumb, Spin } from "antd";
import { useLocation, Link } from "react-router-dom";
import { UtilHelper } from "@/utils";
import { useBreadCrumb } from "@/state/breadcrumb";

export default function BreadCrumb() {
  const location = useLocation();

  const { editPageTitle, clearAll } = useBreadCrumb((state: any) => {
    return {
      editPageTitle: state.editPageTitle,
      clearAll: state.clearAll,
    };
  });

  let currentLink = "";

  const crumbItems: string[] = location.pathname.split("/");

  const crumbs = crumbItems.map((crumb: string, index: number) => {
    if (index === 0)
      return {
        title: <Link to="/">Home</Link>,
      };

    if (index === crumbItems.length - 1)
      return {
        title: isNaN(Number(crumb))
          ? UtilHelper.formatString(crumb)
          : editPageTitle ?? <Spin size="small" />,
      };

    currentLink = currentLink + `/${crumb}`;

    return {
      title: <Link to={currentLink}>{UtilHelper.formatString(crumb)}</Link>,
    };
  });

  React.useEffect(() => {
    clearAll();
  }, [location.pathname]);

  return location.pathname === "/" ? null : <Breadcrumb  items={crumbs} />;
}
