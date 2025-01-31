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
import { ExclamationCircleOutlined, GoogleOutlined } from "@ant-design/icons";
import { SignUpApi } from "../../store/slices/AuthSlice";
import { useDispatch } from "react-redux";
import SharedInput from "../../shared/SharedInput";
import { useNavigate } from "react-router";
const SignUp = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  const onFinish = async (values) => {
    const FormDataValues = new FormData();
    if (file) FormDataValues.append("avatar", file);
    FormDataValues.append("name", values.name);
    FormDataValues.append("email", values.email);
    FormDataValues.append("password", values.password);

    try {
      await dispatch(SignUpApi(FormDataValues)).then(() => {
        navigate("/verify-otp", { state: { email: values?.email } });
      });
    } catch (error) {
      message.error("Signup failed. Please try again.");
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
    <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg border border-gray-200">
      <div className="text-center mb-8">
        <Upload
          name="avatar"
          showUploadList={false}
          beforeUpload={beforeUpload}
          customRequest={handleUpload}
          className="block mx-auto"
        >
          <div className="relative cursor-pointer group">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 hover:border-primary transition-colors">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera className="w-12 h-12 text-gray-400" />
              )}
            </div>
            <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>
        </Upload>
        <h1 className="text-3xl font-bold text-gray-800 mt-6 mb-2">
          Create Account
        </h1>
        <p className="text-gray-600">Join our community today</p>
      </div>

      <Form form={form} onFinish={onFinish} className="space-y-4">
        <SharedInput
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
          placeholder="Full Name"
          icon={User}
        />

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
          placeholder="Confirm Password"
          icon={Lock}
          type="password"
        />

        <Form.Item>
          <Button
            htmlType="submit"
            className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
          >
            Sign Up <ArrowRight className="w-5 h-5" />
          </Button>
        </Form.Item>
        <Form.Item>
          <p className="text-center text-gray-600">
            Already have an account ?
            <Button
              className="!m-1 !p-0 text-primary"
              onClick={() => navigate("/login")}
              type="link"
            >
              Login
            </Button>
          </p>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
