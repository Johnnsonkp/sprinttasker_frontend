import "../../App.css";

import { Button, Card } from 'antd';
import React, { useEffect, useRef, useState } from "react";

import {styles} from './standUp.styles'

export const StandUpComponent = () => {
    const initialText = {task: 'What are you working on today?', toggle: false}
    const standUpLocalStorage = JSON.parse(window.localStorage.getItem("standup"))
    let [data, setData] = useState(standUpLocalStorage ? standUpLocalStorage.value.filter((item) => item !== initialText) : [initialText.task])
    let [input, setInput] = useState([])
    let [toggle, setToggle] = useState(false)
    let counter = 1
    const [flip, setFlip] = useState(false);
    const frontEl = useRef();

    const handleAddStandup = (event) => {
        data.filter((content) => console.log("filter:", content, initialText.task))
        let newData = data.filter((content) => content !== initialText.task)
        setData([...newData, input]) 
        setToggle(true)
    }
    const handleChange = (event) => {
        setToggle(false)
        let data = {task: event.target.value, toggle: false}
        setInput(data)
    }
    const onTaskDelete = (task, index) => {
        setData(data.filter(oldData => oldData !== task))
    }
    const onTaskToggle = (task, index) => {
        let toggledData = data.filter((oldData) => oldData.task === task.task? oldData.toggle = !oldData.toggle : null)
        let newData = data.filter((content) => content !== initialText.task)

        setData(newData, ...toggledData)
    }
    function setWithExpiry(key, value, ttl) {
        const now = new Date()
        const eod = +new Date("2022-01-19T12:00:00+1100")
        let arr = []
        value[0] === initialText ?
            arr.push(value[1], value[2], value[3]) :
            arr.push(value[0], value[1], value[2])
            
        const item = {
            value: arr,
        }
        localStorage.setItem(key, JSON.stringify(item))
        alert("Stand up saved")
    }
    function getWithExpiry(key) {
        const itemStr = localStorage.getItem(key)
        if (!itemStr) {
            return null
        }
        const item = JSON.parse(itemStr)
        const now = new Date()
        if (now.getTime() > item.expiry) {
            localStorage.removeItem(key)
            return null
        }
        return item.value
    }
    
    return (
        <div style={styles.container}>
            <Card 
                title={flip ? `Daily priorities` : `Daily priorities` }
                bordered={false} 
                style={{minWidth: 450, minHeight: 266.14, maxHeight: 266.14, textAlign: 'left', boxShadow: '0 0 5px 3px rgba(100 100 100 / 30%)' }}>
                <Button 
                    type={'primary'}
                    style={{position: "relative", top: '-80px', left: '75%', cursor: 'pointer', fontSize: '14px', marginTop: '20px', background: '#f4f4f4', color: '#111', border: '1px solid #fff', background: 'rgba(0, 0, 255, 0.3)', color: "#f5f5f5", fontWeight: 'bold'}}
                    onClick={() => setWithExpiry("standup", data, 1642640400000 )}
                >Save Items</Button>
                <div
                    style={{ }}
                >   
                        <div className="front" ref={frontEl} style={{width: '100%', margin: 'auto', position: "relative", top: '-55px'}}>
                            {  data.map((content, key) => content.task? 
                                content.task !== null &&
                                (<div style={{display: 'flex', alignItems: 'center', backgroundColor: '#fff',backgroundColor: '#00f1', background: 'rgba(255,255,255,0.3)', paddingLeft: '10px', paddingTop: '0px', paddingBottom: '0px', marginTop: '5px', marginBottom: '0px', border: '1px solid #999', width: '100%', borderRadius: '5px'}}
                                >   
                                    <input onClick={() => onTaskToggle(content)} type="checkbox" id={key} checked={content.toggle? true : false}/>
                                    <label style={styles.taskContainer} for={key}>
                                        <p style={styles.individualTask} key={key}>
                                            <div style={{paddingRight: '5px'}}>{counter++}. </div>
                                            <span id={'content'} data-key={key} key={key}
                                                style={{ textDecoration: content.toggle? 'line-through' : null, fontSize: '14px' }} 
                                            >
                                                { content.task}
                                            </span>
                                        </p>
                                        <Button onClick={(e) => onTaskDelete(content)} className="remove-task-button" type="primary" danger> X 
                                        </Button>
                                    </label>
                                </div>) : 
                                (<h4>What are you working on today?</h4>))}
                            {counter > 3 ? null : 
                                <div style={{display: 'flex', padding: '5px'}}>
                                    <input
                                        onChange={(event) => handleChange(event)}
                                        value={toggle ? '' : input.task}
                                        style={{width: '80%', padding: '5px'}}
                                        placeholder="What are you working on today?"
                                    ></input>
                                    <button style={{marginLeft: '5px', cursor: 'pointer'}} onClick={() => handleAddStandup()}>Add Task</button>
                                </div>
                            }
                        </div> 
                </div> 
            </Card>
        </div>
    )
}
