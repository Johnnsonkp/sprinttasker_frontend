import React from 'react'
import {Form, Row, Button, Input, Col} from 'antd'; 
import {PlusCircleFilled} from '@ant-design/icons'
const { TextArea } = Input;

const TaskForm = ({onFormSubmit}) => {
    const [form] = Form.useForm(); // use form hook

    const onFinish = () => {
        onFormSubmit({
            name: form.getFieldValue('name'),
            description: form.getFieldValue('description'),
            subtask: form.getFieldValue('subtask'),
            completed: false,
            time_to_complete: form.getFieldValue('completeTime')
        });
        console.log(form.getFieldValue('name'));
        console.log(form.getFieldValue('description'));
        console.log("time:", form.getFieldValue('completeTime'))
        console.log("typeof time:", typeof form.getFieldValue('completeTime'))
        // console.log("Object", [{1: form.getFieldValue('subtask1'), 2: form.getFieldValue('subtask2')}])

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
                            name={'completeTime'}
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


