import * as React from "react";
import { Drawer, Alert, Form, Space, Button, Spin, message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useSearch } from "@/state/search";
import { useQueryClient } from "@tanstack/react-query";
interface IProps {
  basePath: { path: string; title: string };
  children: React.ReactNode;
  title: string;
  error: any | undefined;
  buttonLoading: boolean;
  buttonDisabled: boolean;
  isSubmitted: boolean;
  isCreate: boolean;
  data: any;
  onFinish: (values: any) => void;
  onClose: () => void;
  width?: number;
}

const FromDrawerFunc = React.memo(function FromDrawer({
  basePath,
  children,
  title,
  error,
  buttonLoading,
  buttonDisabled,
  isSubmitted = false,
  isCreate,
  data,
  onFinish,
  onClose,
  width = 500,
}: IProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { clearAll, search } = useSearch((state: any) => {
    return {
      clearAll: state.clearAll,
      search: state.search,
    };
  });

  const [open, setOpen] = React.useState(false);

  const onFinishFailed = (errorInfo: any) => {
    console.log(errorInfo);
  };

  const handleClose = () => {
    form.resetFields();
    navigate({ pathname: basePath.path, search });
  };

  React.useEffect(() => {
    form.setFieldsValue(data ?? {});
  }, [data]);

  React.useEffect(() => {
    const paths = location.pathname.split("/");
    if (paths.length > 2) setOpen(true);
    else setOpen(false);
  }, [location]);

  React.useEffect(() => {
    if (isSubmitted) {
      onClose();
      message.success(`${isCreate ? "Created" : "Updated"} Successfully`);
      queryClient.invalidateQueries({ queryKey: [basePath.title] });
      if (isCreate) {
        clearAll();
        navigate({ pathname: basePath.path, search: "" });
      } else {
        navigate({ pathname: basePath.path, search });
      }
    }
  }, [isSubmitted]);

  return (
    <Drawer
      width={width}
      title={title}
      placement="right"
      onClose={handleClose}
      open={open}
    >
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
        layout="vertical"
      >
        {children}
        {error && error?.message && (
          <Alert message={error?.message} banner type="error" closable />
        )}
        <Form.Item>
          <Space>
            <Button
              loading={buttonLoading}
              htmlType="submit"
              disabled={buttonDisabled}
              type={buttonDisabled ? "default" : "primary"}
            >
              {buttonDisabled ? (
                <>
                  Loading...
                  <Spin />
                </>
              ) : (
                "Submit"
              )}
            </Button>
            <Button onClick={handleClose}>Close</Button>
          </Space>
        </Form.Item>
      </Form>
    </Drawer>
  );
});

export default FromDrawerFunc;
