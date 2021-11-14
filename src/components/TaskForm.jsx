import React from 'react'
import {Form, Row, Column, Button, Input, Col} from 'antd'; 
import {PlusCircleFilled} from '@ant-design/icons'
import { render } from '@testing-library/react';

const TaskForm = ({onFormSubmit}) => {
    const [form] = Form.useForm(); // use form hook

    const onFinish = () => {
        onFormSubmit({
            name: form.getFieldValue('name'),
            completed: false 
        });
        console.log(form.getFieldValue('name'));

        form.resetFields();
    }

    return(
        <Form 
            form={form} 
            onFinish={onFinish} 
            layout="horizontal" 
            className="task-form">
            <Row gutter={20}>
                <Col xs={24} s={24} md={17} lg={19} xl={20}>
                    <Form.Item
                        name={'name'}
                        rules={[{ required: true, message: "This field is required"}]}>
                        <Input placeholder="What needs to be done?" />
                    </Form.Item>
                </Col>
                <Col xs={24} s={24} md={7} lg={5} xl={4}>
                    <Button type="primary" htmlType="submit" block>
                    <PlusCircleFilled />
                        Add Task
                    </Button>
                </Col>
            </Row>

        </Form>
    )
}

export default TaskForm