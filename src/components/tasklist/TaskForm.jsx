import {Button, Col, Form, Input, InputNumber, Row} from 'antd';
import React, {useEffect, useState} from 'react'

import {PlusCircleFilled} from '@ant-design/icons'

const { TextArea } = Input;

const TaskForm = ({onFormSubmit}) => {
    const [form, resetField] = Form.useForm(); // use form hook
    const [subtasks, setSubtasks] = useState([])
    const [newSubtask, addNewSubtask] = useState()
    let [counter, incrementCounter] = useState(0)
    let [order, setOrder] = useState()
    let [clearField, setClearField] = useState(false)

    const handleChange = (e, index) => {
        setClearField(false)
        const { name, value } = e.target
        let subtaskList = [...subtasks]
        subtaskList[counter] = value
        
        addNewSubtask(subtaskList)
    }
    const orderOnChange = (e) => {
        // setOrder(e.target.value)

        console.log("orderOnChange:", e.target)
    }
    const handleAddSubtask = () => {
        form.setFieldsValue({
            subtask: ''
        })
        incrementCounter(counter = counter + 1)
        setSubtasks([...newSubtask])
    }
    const onFinish = () => {
        onFormSubmit({
            name: form.getFieldValue('name'),
            description: form.getFieldValue('description'),
            order: order,
            subitems: subtasks,
            reward: form.getFieldValue('reward'),
            completed: false,
            time_to_complete: form.getFieldValue('ttcomplete')
        });
        form.resetFields();
    }

    useEffect(() => {
        setClearField(true)
    }, [handleAddSubtask, clearField])

    return(
        <div>
            <Form 
                style={{paddingBottom: '15px'}}
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
                    <Col xs={24} s={24} md={17} lg={19} xl={6}>
                    <ol style={{display: subtasks.length? 'block' : 'none'}}>
                        {subtasks && subtasks.map((item, index) => {
                            return <li key={index}>{item}</li>
                        })}
                    </ol>
                    <Form.Item
                        name={'subtask'}
                        key={`${counter}`}
                    >   
                        <Input 
                            onChange={(e) => handleChange(e)}
                            placeholder="Add a Subtask" 
                        />
                    </Form.Item>
                    </Col>
                    <Col xs={24} s={24} md={17} lg={19} xl={7}>
                        <Form.Item
                            name={'reward'}
                        >
                            <Input placeholder="Reward on task completion" 
                            />
                        </Form.Item>
                    </Col>
                    
                    <Col xs={24} s={24} md={17} lg={19} xl={4}>
                        <Form.Item
                            name={'ttcomplete'}
                        >
                            <Input placeholder="Allocated time in minutes" />
                        </Form.Item>
                    </Col>
                
                    <Col xs={24} s={24} md={17} lg={19} xl={3}>
                        <Form.Item
                            name={'order'}
                        >
                            <InputNumber min={1} max={10} defaultValue={null} 
                                style={{width: '100%', float: 'left'}}
                                keyboard={false}
                                bordered={true}
                                controls={true}
                                size={'medium'}
                                value={order}
                                onChange={setOrder}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <div style={{display: 'flex'}}>
                    <Col
                        style={{paddingRight: '10px'}} 
                        xs={24} s={24} md={7} lg={5} xl={4}>
                            <Button type="secondary" 
                                onClick={() => handleAddSubtask()}
                            >
                            <PlusCircleFilled />
                                Add subtask
                            </Button>
                    </Col>
                    <Col 
                        style={{paddingLeft: '10px'}}
                        xs={24} s={24} md={7} lg={5} xl={4}>
                        <Button type="primary" htmlType="submit" block>
                        <PlusCircleFilled />
                            Add Task
                        </Button>
                    </Col>
                
                </div>
            </Form>
        </div>
    )
}

export default TaskForm


