import {Button, Col, Form, Input, Row} from 'antd';

import {PlusCircleFilled} from '@ant-design/icons'
import React from 'react'

const { TextArea } = Input;

const TaskForm = ({onFormSubmit}) => {
    const [form] = Form.useForm(); // use form hook

    const onFinish = () => {
        onFormSubmit({
            name: form.getFieldValue('name'),
            description: form.getFieldValue('description'),
            subtask: form.getFieldValue('subtask'),
            completed: false,
            time_to_complete: form.getFieldValue('ttcomplete')
        });

        console.log('complete:',  form.getFieldValue('ttcomplete'))
        console.log('typeof complete:', typeof form.getFieldValue('ttcomplete'))
        form.resetFields();
    }

    return(
        <div>
            <Form 
                form={form} 
                onFinish={onFinish} 
                layout="horizontal" 
                className="task-form hideForm">
                <Row gutter={20}>
                    <Col xs={24} s={24} md={17} lg={19} xl={20}>
                        <Form.Item
                            name={'name'}
                            rules={[{ required: true, message: "This field is required"}]}>
                            <Input placeholder="What needs to be done?" />
                        </Form.Item>
                        <Form.Item
                            name={'description'}>
                            <TextArea placeholder="Task Description" />
                        </Form.Item>
                
                    </Col>
                    <Col xs={24} s={24} md={17} lg={19} xl={8}>
                        <Form.Item
                            name={'subtask'}
                        >
                            <Input placeholder="Add a Subtask" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} s={24} md={17} lg={19} xl={8}>
                        <Form.Item
                            name={'ttcomplete'}
                        >
                            <Input placeholder="Timer to complete" />
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
        </div>
    )
}

export default TaskForm


