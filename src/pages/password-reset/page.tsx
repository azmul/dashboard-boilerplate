import * as React from "react";
import { Button, Form, Input, message, Space, Alert } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import * as authApi from "@/identity/apis";
import { QueryParams } from "./type";
import { queryParams } from "./constant";
import qs from "query-string";
import PublicPageFormat from "@/components/public-page-format/PublicPageFormat";
import * as IdentityType from "@/identity/type";
import PublicPageTopContent from "@/components/public-page-top-content/PublicPageTopContent";

export default function ResetPassword() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const [queries, setQueries] = React.useState<QueryParams>(queryParams);

  const [error, setError] = React.useState<undefined | any>(undefined);

  const changePassword = useMutation({
    mutationFn: authApi.passwordReset,
  });

  const onFinish = async (values: any) => {
    const payload: IdentityType.PasswordReset = {
      email: values.email,
      password: values.password,
      token: queries.token,
    };

    try {
      changePassword.mutate(payload, {
        onSuccess: () => {
          message.success("Password Reset Successful");
        },
        onError: (err: any) => {
          setError(err?.response?.data?.error);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onClose = () => {
    navigate("/sign-in");
  };

  React.useEffect(() => {
    const params: any = qs.parse(location.search);
    form.setFieldsValue({
      email: params?.email,
    });
    setQueries(params);
  }, [location.search]);

  return (
    <PublicPageFormat
      title="Forgot Password | Dashboard"
      description="Forgot Password Page"
    >
      <PublicPageTopContent
        title="Password Reset!"
        description="Enter new password to continue to Dashboard RMS."
      />

      <Form
        form={form}
        name="changePassword"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        scrollToFirstError
        layout="vertical"
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        {error && error?.message && (
          <Alert message={error?.message} type="error" />
        )}
        <br />
        <Form.Item>
          <Space>
            <Button
              loading={changePassword.isPending}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
            <Button type="link" onClick={onClose}>
              Login
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </PublicPageFormat>
  );
}
