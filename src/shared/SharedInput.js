import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import React from "react";

const SharedInput = ({
  name,
  rules,
  placeholder,
  icon,
  type = "text",
  dependencies,
}) => {
  const [form] = Form.useForm(); 

  return (
    <Form.Item
      name={name}
      rules={rules}
      dependencies={dependencies}
      validateTrigger="onBlur"
      help={form?.getFieldError(name)?.[0]} 
      hasFeedback
    >
      {type === "password" ? (
        <Input.Password
          prefix={React.createElement(icon, {
            className: "w-5 h-5 text-primary",
          })}
          placeholder={placeholder}
          className="w-full bg-gray-100 border border-gray-300 rounded-lg h-12 placeholder:text-gray-500 hover:border-primary focus:border-primary focus:shadow-primary/20"
        />
      ) : (
        <Input
          prefix={React.createElement(icon, {
            className: "w-5 h-5 text-primary",
          })}
          placeholder={placeholder}
          className="w-full bg-gray-100 border border-gray-300 rounded-lg h-12 placeholder:text-gray-500 hover:border-primary focus:border-primary focus:shadow-primary/20"
        />
      )}
    </Form.Item>
  );
};

export default SharedInput;
