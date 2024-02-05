import * as React from "react";
import { Form, Input, Switch } from "antd";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import FormDrawer from "@/components/drawer/FormDrawer";
import { PRIVATE_ROUTERS } from "@/routers/private";
import * as Hooks from "@/hooks";
import * as todoApi from "../apis";

export default function TodoDrawer() {
  const [error, setError] = React.useState<undefined | any>(undefined);
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);

  const isCreate: boolean = Hooks.usePath(
    PRIVATE_ROUTERS.TODO_CREATE_SCREEN.path
  );

  const { id } = useParams();

  const createEditTodo = useMutation({
    mutationFn: isCreate ? todoApi.createTodo : todoApi.editTodo,
    onSuccess: () => {
      setIsSubmitted(true);
      setError(undefined);
    },
    onError: (error: any) => {
      setError(error?.response?.data?.error);
    },
  });

  const onFinish = (values: any) => {
    createEditTodo.mutate(isCreate ? values : { id: Number(id), ...values });
  };

  const onClose = () => {
    setIsSubmitted(false);
  };

  const todo: Hooks.QueryResult = useQuery({
    queryKey: ["todo", id],
    queryFn: ({ queryKey }) => todoApi.getTodoById(queryKey[1]),
    enabled: !isNaN(Number(id)),
  });

  const { data: todoData, error: todoError } = Hooks.useData(todo);
  Hooks.useEditPageTitle(todoData?.title);

  React.useEffect(() => {
    setError(todoError);
  }, [todoError?.message]);

  return (
    <FormDrawer
      title={isCreate ? "Create Todo" : "Edit Todo"}
      basePath={PRIVATE_ROUTERS.TODO_SCREEN}
      error={error}
      buttonLoading={createEditTodo.isPending}
      buttonDisabled={todo.isLoading}
      onFinish={onFinish}
      isSubmitted={isSubmitted}
      isCreate={isCreate}
      onClose={onClose}
      data={
        !isCreate && {
          title: todoData?.title,
          description: todoData?.description,
          completed: todoData?.completed,
        }
      }
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: "Please input title!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea />
      </Form.Item>

      <Form.Item label="Completed" name="completed" valuePropName="checked">
        <Switch checkedChildren="Yes" unCheckedChildren="No" />
      </Form.Item>

      {!isCreate && (
        <Form.Item
          label="Active Status"
          name="isActive"
          valuePropName="checked"
        >
          <Switch checkedChildren="Active" unCheckedChildren="InActive" />
        </Form.Item>
      )}
    </FormDrawer>
  );
}
