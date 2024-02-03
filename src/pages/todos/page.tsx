import * as React from "react";
import PageFormat from "@/components/page-format/PageFormat";

const TodoTable = React.lazy(() => import("./table/Table"));
const TodoDrawer = React.lazy(() => import("./drawer/Drawer"));

export default function TodoPage() {
  return (
    <PageFormat title="Todo | Dashboard" description="Todo Page">
      <TodoTable />
      <TodoDrawer />
    </PageFormat>
  );
}
