import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Form,
  Input,
  message,
  Button,
  Alert,
  Checkbox,
  Row,
  Col,
  Card,
} from "antd";
// import { jwtDecode } from "jwt-decode";
import { useMutation } from "@tanstack/react-query";
import * as authApi from "@/identity/apis";
import { Link } from "react-router-dom";
import { saveTokens, saveRolesPermissions } from "@/identity/helpers";
import { UserPermissions, UserRoles } from "@/identity/scopes";
// import { JwtPayload } from "@/identity/type";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import PublicPageFormat from "@/components/public-page-format/PublicPageFormat";
import PublicPageTopContent from "@/components/public-page-top-content/PublicPageTopContent";

export default function SignInPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = React.useState<undefined | any>(undefined);

  const successRedirectUrl: string = location.state?.from?.pathname ?? "/";

  const userLogin = useMutation({
    mutationFn: authApi.loginUser,
  });

  const onFinish = async (values: any) => {
    setError(undefined);
    try {
      userLogin.mutate(values, {
        onSuccess: (response) => {
          const accessToken = response.accessToken;
          const refreshToken = response.refreshToken;
          // const decoded: JwtPayload = jwtDecode(accessToken);

          saveTokens(accessToken, refreshToken);
          saveRolesPermissions([UserRoles.USER], [UserPermissions.TEST_READ]);
          navigate(successRedirectUrl);
        },
        onError: (err: any) => {
          message.error(err?.response?.data?.error?.message);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <PublicPageFormat title="Sign In | Dashboard" description="Sign In Page">
      <Row justify="center">
        <Col span={6}>
          <Card>
            <PublicPageTopContent
              title="Welcome Back !"
              description="Sign in to continue"
            />
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Link to="/forgot-password" className="login-form-forgot">
                  <i className="mdi mdi-lock"></i> Forgot password?
                </Link>
              </Form.Item>

              {error && <Alert message={error} banner type="error" closable />}
              <br />

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={userLogin.isPending}
                >
                  Log in
                </Button>
                Or <a href="">register now!</a>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </PublicPageFormat>
  );
}
