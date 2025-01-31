import { Button, Form } from "antd";
import { ArrowRight, Mail, Key, Lock } from "lucide-react";
import React, { useState } from "react";
import SharedInput from "../../shared/SharedInput";
import { useNavigate } from "react-router";
import { ResetPasswordApi, SendOtp } from "../../store/slices/AuthSlice";
import { useDispatch } from "react-redux";

function ForgotPass() {
  const [form] = Form.useForm();
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);

  const onFinish = async (values) => {
    if (!otpSent) {
      setEmail(values.email);
      await dispatch(SendOtp({ email: values?.email })).then(() => {
        setOtpSent(true);
      });
    } else {
      await dispatch(
        ResetPasswordApi({
          email: email,
          otp: Number(values.otp),
          newPassword: values.password,
        })
      ).then(() => {
        navigate("/login");
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 mt-6 mb-4">
        {otpSent ? "Enter OTP" : "Forgot Password"}
      </h1>
      <Form form={form} onFinish={onFinish} className="space-y-4">
        {!otpSent ? (
          <>
            <SharedInput
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
              placeholder="Email"
              icon={Mail}
            />
            <Form.Item>
              <Button
                htmlType="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
              >
                Send OTP <ArrowRight className="w-5 h-5" />
              </Button>
            </Form.Item>
            <Form.Item className="flex items-center justify-center">
              <Button
                className=" pr-0 text-primary"
                onClick={() => navigate("/login")}
                type="link"
              >
                Login
              </Button>
            </Form.Item>
          </>
        ) : (
          <>
            <p className="text-gray-600">
              An OTP has been sent to your email. Please enter the OTP below.
            </p>
            <SharedInput
              name="otp"
              rules={[
                { required: true, message: "Please input your OTP!" },
                {
                  pattern: /^\d{6}$/,
                  message: "OTP should be a 6-digit number",
                },
              ]}
              placeholder="OTP"
              icon={Key}
            />
            <SharedInput
              name="password"
              rules={[
                { required: true, message: "Please input your new password!" },
              ]}
              placeholder="New Password"
              icon={Lock}
              type="password"
            />
            <SharedInput
              name="confirm"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
              placeholder="Confirm New Password"
              icon={Lock}
              type="password"
            />
            <Form.Item>
              <Button
                htmlType="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
              >
                Verify OTP <ArrowRight className="w-5 h-5" />
              </Button>
            </Form.Item>
            <div className="flex items-center justify-center gap-3 flex-row">
              <Button
                className=" pr-0 text-primary"
                onClick={() => navigate("/login")}
                type="link"
              >
                Login
              </Button>
              <p>|</p>
              <Button
                className=" !p-0 text-primary"
                type="link"
                onClick={() => {
                  console.log("Resending OTP...");
                }}
              >
                Resend OTP
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
}

export default ForgotPass;
