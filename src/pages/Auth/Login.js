import { Button, Form, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import SharedInput from "../../shared/SharedInput";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { LoginApi } from "../../store/slices/AuthSlice";

function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    await dispatch(LoginApi(values)).then(() => {
      navigate("/");
    });
  };
  return (
    <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 mt-6 mb-2">Login</h1>
      <p className="text-gray-600">Sign in to your account</p>

      <Form form={form} onFinish={onFinish} className="space-y-4">
        <SharedInput
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
          placeholder="Email"
          icon={Mail}
        />
        <SharedInput
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          placeholder="Password"
          icon={Lock}
          type="password"
        />
        <Form.Item>
          <Button
            htmlType="submit"
            className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
          >
            Log In <ArrowRight className="w-5 h-5" />
          </Button>
        </Form.Item>
        <Form.Item className="flex justify-end">
          <Button
            onClick={() => navigate("/forgot-password")}
            type="link"
            className="text-primary"
          >
            Forgot Password?
          </Button>
        </Form.Item>
        <Form.Item>
          <p className="text-gray-600 text-center">
            Don't have an account ?
            <Button
              className="!m-1 !p-0 text-primary"
              onClick={() => navigate("/sign-up")}
              type="link"
            >
              Create an Account
            </Button>
          </p>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
