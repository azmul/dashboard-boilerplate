import { Table } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PRIVATE_ROUTERS } from "@/routers/private";
import * as Hooks from "@/hooks";
import TableTopContent from "@/components/table-top-content/TableTopContent";
import TableActions from "@/components/table-actions/TableActions";
import TodoSortableTable from "@/components/sortable-table/SortableTable";
import PageFilter from "@/components/page-filter/PageFilter";
import * as todoApi from "../apis";
import * as todoType from "../type";

export default function TodoTable() {
  const queryClient = useQueryClient();
  const currentSearch = Hooks.useSearch();

  const deleteTodo = useMutation({
    mutationFn: todoApi.deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PRIVATE_ROUTERS.TODO_SCREEN.title],
      });
    },
  });

  const todo: Hooks.QueryResult = useQuery({
    queryKey: [PRIVATE_ROUTERS.TODO_SCREEN.title, currentSearch],
    queryFn: ({ queryKey }) => todoApi.getTodos(queryKey[1]),
  });

  const { data: todoData, meta: todoMeta } = Hooks.useData(todo);

  return (
    <>
      <TableTopContent
        title="Todo Table"
        createTitle="Create Todo"
        createPath={PRIVATE_ROUTERS.TODO_CREATE_SCREEN.path}
      />

      <PageFilter status start_at end_at />

      <TodoSortableTable
        dataSource={todoData}
        loading={todo.isLoading}
        showSizeChanger
        meta={todoMeta}
        scroll={1100}
      >
        <Table.Column<todoType.TodoType>
          key="id"
          title="Id"
          dataIndex="id"
          width={100}
        />
        <Table.Column<todoType.TodoType>
          key="title"
          title="Title"
          dataIndex="title"
        />
        <Table.Column<todoType.TodoType>
          key="userId"
          title="User Id"
          width={100}
          dataIndex="userId"
        />

        <Table.Column<todoType.TodoType>
          key="completed"
          title="Completed"
          width={120}
          align="center"
          render={(_, item) => (item?.completed ? "Yes" : "No")}
        />
        <Table.Column<todoType.TodoType>
          key="actions"
          title="Actions"
          fixed="right"
          width={100}
          render={(_, Todo) => (
            <TableActions
              editPath={`/todo/${Todo.id}`}
              title="Todo"
              onDelete={() => {
                deleteTodo.mutate(Todo.id);
              }}
            />
          )}
        />
      </TodoSortableTable>
    </>
  );
}
