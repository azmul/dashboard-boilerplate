import * as React from "react";
import { Button, Form, Input, message, Space, Alert, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import * as authApi from "@/identity/apis";
import { UserOutlined } from "@ant-design/icons";
import PublicPageFormat from "@/components/public-page-format/PublicPageFormat";
import PublicPageTopContent from "@/components/public-page-top-content/PublicPageTopContent";

export default function ForgotPassword() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [error, setError] = React.useState<undefined | any>(undefined);

  const forgotPassword = useMutation({
    mutationFn: authApi.forgotPassword,
  });

  const onFinish = async (values: any) => {
    try {
      forgotPassword.mutate(values, {
        onSuccess: () => {
          message.success("Mail Successfully Sent");
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

  return (
    <PublicPageFormat
      title="Forgot Password | Dashboard"
      description="Forgot Password Page"
    >
      <Row justify="center">
        <Col span={6}>
          <PublicPageTopContent
            title="Forgot Password !"
            description="Enter email to continue to Dashboard RMS."
          />
          <Form
            form={form}
            name="forgotPassword"
            onFinish={onFinish}
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
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            {error && error?.message && (
              <Alert message={error?.message} type="error" />
            )}
            <br />
            <Form.Item>
              <Space>
                <Button
                  loading={forgotPassword.isPending}
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
        </Col>
      </Row>
    </PublicPageFormat>
  );
}
