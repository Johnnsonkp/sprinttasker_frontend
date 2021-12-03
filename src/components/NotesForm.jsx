import React, {useState} from 'react'
import {Form, Row, Column, Button, Input, Col} from 'antd'; 
import {PlusCircleFilled} from '@ant-design/icons'
import { render } from '@testing-library/react';
import { Descriptions, } from 'antd';
const { TextArea } = Input;

const NotesForm = ({onFormSubmit}) => {
    const [form] = Form.useForm(); // use form hook

    const onFinish = () => {
        onFormSubmit({
            title: form.getFieldValue('title'),
            body: form.getFieldValue('body'),
        });
        console.log(form.getFieldValue('title'));
        console.log(form.getFieldValue('body'));

        form.resetFields();
    }

    return(
        <div>
            <Form 
                form={form} 
                onFinish={onFinish} 
                layout="vertical" 
                className="task-form hideForm">
                <Row gutter={20}>
                    <Col xs={24} s={24} md={17} lg={19} xl={20}>
                        <Form.Item
                            name={'title'}
                            rules={[{ required: true, message: "Notes must have a title"}]}>
                            <Input placeholder="What needs to be done?" />
                        </Form.Item>
                        <Form.Item
                            name={'body'}>
                            <TextArea placeholder="Task Description" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} s={24} md={7} lg={5} xl={4}>
                        <Button type="primary" htmlType="submit" block>
                        <PlusCircleFilled />
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default NotesForm