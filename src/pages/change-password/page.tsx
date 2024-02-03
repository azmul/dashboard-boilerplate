import PageFormat from "@/components/page-format/PageFormat";
import { Form, Input, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import * as authApi from "@/identity/apis";
import * as IdentityType from "@/identity/type";
import { getTokens } from "@/identity/helpers";
import { formItemLayout, tailFormItemLayout } from "./constant";

export default function ChangePasswordPage() {
  const [form] = Form.useForm();

  const changePassword = useMutation({
    mutationFn: authApi.passwordReset,
  });

  const onFinish = async (values: any) => {
    const { accessToken } = getTokens();

    const payload: IdentityType.PasswordReset = {
      token: accessToken,
      email: values.email,
      password: values.password,
    };

    try {
      changePassword.mutate(payload, {
        onSuccess: () => {
          message.success("Password Reset Successful");
        },
        onError: (err: any) => {
          message.error(err?.response?.data?.error?.message);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PageFormat
      title="Change Password | Dashboard"
      description="Change Password Page"
    >
      <Form
        {...formItemLayout}
        form={form}
        name="changePassword"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        scrollToFirstError
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
          <Input />
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

        <Form.Item {...tailFormItemLayout}>
          <button
            type="submit"
            className="btn btn-primary w-md waves-effect waves-light"
          >
            Change Password
          </button>
        </Form.Item>
      </Form>
    </PageFormat>
  );
}
