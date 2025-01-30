import { useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import {
  Camera,
  Mail,
  Lock,
  User,
  ArrowRight,
  Github,
  Twitter,
} from "lucide-react";
import { GoogleOutlined } from "@ant-design/icons";
import axios from "axios";
const SignUp = () => {
  const [form] = Form.useForm();
  const [profileImage, setProfileImage] = useState(null);
  const [file, setFile] = useState(null);

  const onFinish = async (values) => {
    const FormDataValues = new FormData();
    if (file) {
      FormDataValues.append("avatar", file);
    }
    FormDataValues.append("name", values.name);
    FormDataValues.append("email", values.email);
    FormDataValues.append("password", values.password);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/signup",
        FormDataValues,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.message) {
        message.success(response.message);
      } else {
        message.error(response.data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) message.error("You can only upload image files!");
    return isImage;
  };

  const handleUpload = ({ file }) => {
    setFile(file);
    setProfileImage(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md shadow-xl border border-white/10">
        <div className="text-center mb-8">
          <Upload
            name="avatar"
            showUploadList={false}
            beforeUpload={beforeUpload}
            customRequest={handleUpload}
            className="block mx-auto"
          >
            <div className="relative cursor-pointer group">
              <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="w-12 h-12 text-primary-500" />
                )}
              </div>
              <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </div>
          </Upload>
          <h1 className="text-3xl font-bold text-white mt-6 mb-2">
            Create Account
          </h1>
          <p className="text-white/70">Join our community today</p>
        </div>

        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
          className="space-y-6"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input
              prefix={<User className="w-5 h-5 text-primary-500" />}
              placeholder="Full Name"
              className="w-full bg-white/5 border-none rounded-xl h-12 focus:text-primary text-white placeholder:text-white/50 hover:bg-white/10 focus:bg-white/10"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input a valid email!",
              },
            ]}
          >
            <Input
              prefix={<Mail className="w-5 h-5 text-primary-500" />}
              placeholder="Email"
              className="w-full bg-white/5 border-none rounded-xl h-12 text-white placeholder:text-white/50 hover:bg-white/10 focus:bg-white/10"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<Lock className="w-5 h-5 text-primary-500" />}
              placeholder="Password"
              className="w-full bg-white/5 border-none rounded-xl h-12 text-white placeholder:text-white/50 hover:bg-white/10 focus:bg-white/10"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={["password"]}
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<Lock className="w-5 h-5 text-primary-500" />}
              placeholder="Confirm Password"
              className="w-full bg-white/5 border-none rounded-xl h-12 text-white placeholder:text-white/50 hover:bg-white/10 focus:bg-white/10"
            />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              className="w-full h-12 bg-primary-500 hover:bg-primary-600 border-none rounded-xl text-lg font-semibold text-white flex items-center justify-center gap-2 transition-all"
            >
              Sign Up <ArrowRight className="w-5 h-5" />
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-white/70">
                Or continue with
              </span>
            </div>
          </div>

          <div className="flex gap-4 justify-center mt-6">
            <Button
              shape="circle"
              icon={<GoogleOutlined className="w-5 h-5 text-white" />}
              className="w-12 h-12 bg-white/10 hover:bg-white/20 border-none flex items-center justify-center transition-all"
            />
            <Button
              shape="circle"
              icon={<Github className="w-5 h-5 text-white" />}
              className="w-12 h-12 bg-white/10 hover:bg-white/20 border-none flex items-center justify-center transition-all"
            />
            <Button
              shape="circle"
              icon={<Twitter className="w-5 h-5 text-white" />}
              className="w-12 h-12 bg-white/10 hover:bg-white/20 border-none flex items-center justify-center transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
