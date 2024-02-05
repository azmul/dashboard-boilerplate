import PageFormat from "@/components/page-format/PageFormat";
import TodoTable from "./table/Table";
import TodoDrawer from "./drawer/Drawer"

export default function TodoPage() {
  return (
    <PageFormat title="Todo | Dashboard" description="Todo Page">
      <TodoTable />
      <TodoDrawer />
    </PageFormat>
  );
}
