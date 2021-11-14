import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { useParams } from "react-router-dom";

export default function Auth(props) {
  const type = useParams().form.toUpperCase();

  const onFinish = (values) => {
    console.log("Success:");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:");
  };

  return (
    <div className="form-wrapper">
      <h1>{type}</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {type === "LOGIN" ? (
          <> </>
        ) : (
          <>
            <Form.Item
              label="Name"
              name={"name"}
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input placeholder="Name" />
            </Form.Item>
          </>
        )}
        <Form.Item
          label="Username"
          username={"username"}
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          label="Password"
          password={"password"}
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        {type === "LOGIN" ? (
          <> </>
        ) : (
          <>
            <Form.Item
              label="Email"
              email={"email"}
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input placeholder="Email" />
            </Form.Item>
          </>
        )}

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
