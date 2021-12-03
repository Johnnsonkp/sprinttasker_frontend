// import React, { useState, useEffect } from "react";
import { PlusCircleFilled } from "@ant-design/icons";
import { Form, Row, Button, Input, Col } from "antd";

const AddNote = ({ handleAddNote }) => {
  const { TextArea } = Input;
  const [form] = Form.useForm(); // use form hook

  const onFinish = () => {
    handleAddNote({
      title: form.getFieldValue("title"),
      body: form.getFieldValue("body"),
      //   created_at: new Date(),
    });
    console.log(form.getFieldValue("title"));
    console.log(form.getFieldValue("body"));
    form.resetFields();
  };

  const styles = {
    title: {
      backgroundColor: "transparent",
    },
  };

  return (
    <div className="note new">
      <Form
        form={form}
        onFinish={onFinish}
        layout="horizontal"
        className="task-form hideForm"
      >
        <Row gutter={2}>
          <Col xs={24} s={24} md={17} lg={19} xl={24}>
            <Form.Item
              name={"title"}
              rules={[{ required: true, message: "This field is required" }]}
              style={styles.title}
            >
              <Input
                placeholder="Add a title"
                style={{ backgroundColor: "#e1e1e1" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={2}>
          <Col xs={24} s={24} md={17} lg={19} xl={24}>
            <Form.Item name={"body"}>
              <TextArea
                rows={3}
                placeholder="Type to add a note..."
                bordered={false}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={6}>
          <Col xs={24} s={24} md={7} lg={5} xl={10}>
            <Button type="primary" htmlType="submit" block>
              <PlusCircleFilled />
              Add Note
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default AddNote;
