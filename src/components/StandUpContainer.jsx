import "../App.css";

import { Button, Card } from 'antd';
import { Container, Divider, Header, Segment } from "semantic-ui-react";
import React, { useEffect, useRef, useState } from "react";
import { format, formatRelative, subDays } from "date-fns";

import InputListComponent from "./InputList.component.jsx";
import {RightCircleOutlined} from '@ant-design/icons';

export const StandUpComponent = () => {
    const initialText = 'What are you working on today?'
    const standUpLocalStorage = JSON.parse(window.localStorage.getItem("standup"))
    let [data, setData] = useState(standUpLocalStorage ? standUpLocalStorage.value.filter((item) => item !== initialText) : [initialText])
    // let [data, setData] = useState(standUpLocalStorage ? standUpLocalStorage.value.map((item) => [item]) : null)
    let [input, setInput] = useState([])
    let [toggle, setToggle] = useState(false)
    let [blockData, setBlockData] = useState([])
    let [blockInput, setBlockInput] = useState([])
    let [blockToggle, setBlockToggle] = useState(false)
    let [checked, setChecked] = useState(false)
    let counter = 1
    const [flip, setFlip] = useState(false);
    const [height, setHeight] = useState("initial");
    const frontEl = useRef();
    const backEl = useRef();

    const handleAddStandup = (event) => {
        setData([...data, input])
        setToggle(true)
    }
    const handleChange = (event) => {
        setToggle(false)
        console.log("event.target.value:", event.target.value)
        setInput(event.target.value)
    }
    const handleAddRoadBlocks = (event) => {
        setBlockData([...blockData, blockInput])
        setBlockToggle(true)
    }
    const handleRoadBlocksChange = (event) => {
        setBlockToggle(false)
        console.log("event.target.value:", event.target.value)
        setBlockInput(event.target.value)
    }

    const styles = {
        taskContainer: {
            backgroundColor: '#f4f4f4', 
            paddingLeft: '0px', 
            paddingRight: '10px',  
            margin: '8px', 
            marginTop: '0px',
            marginBottom: '0px',
            width: '100%', 
            borderRadius: '4px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            paddingTop: '8px',
            paddingBottom: '8px'
        },
        individualTask: {
            fontSize: '13px', 
            // paddingTop: '5px',
            margin: '0px',
            paddingLeft: '0px',
            paddingRight: '5px',
            display: 'flex'
        }
    }
    const onTaskDelete = (task, index) => {
        setData(data.filter(oldData => oldData !== task))
    
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
    function setCheckedFunction(e, counter){
        console.log('e.currentTarget:', e.currentTarget)
        setChecked(!checked)
        console.log('counter:', counter)
        console.log('checked:', checked)
        console.log("document.getElementById('content').getAttribute('data-key'):", document.getElementById("content").getAttribute('data-key'))
        console.log("e.currentTarget.id === document.getElementById('content').getAttribute('data-key'):", e.currentTarget.id === document.getElementById("content").getAttribute('data-key'))
    }

    return (
        <div 
            style={{ height: height}}
            className={`site-card-border-less-wrapper card ${flip ? "flip" : ""} `} 
        >
            <RightCircleOutlined 
                style={{position: 'relative', left: '135px', bottom: '-70px', zIndex: 2, color: 'red', width: '50px'}}
                onClick={() => setFlip(!flip)}
                width={10}
            />
            <Card 
                title={flip ? `Stand Down @5:00pm` : `Stand Up @5:00am` }
                bordered={false} 
                style={{minWidth: 450, minHeight: 266.14, textAlign: 'left', boxShadow: '0 0 5px 3px rgba(100 100 100 / 30%)' }}>
                <Button 
                    type={'primary'}
                    style={{position: "relative", top: '-45px', left: '300px', cursor: 'pointer'}}
                    onClick={() => setWithExpiry("standup", data, 1642640400000 )}
                >Save Items</Button>

                     
                <div
                    style={{ }}
                >   
                    {!flip ?
                        <div className="front" ref={frontEl} style={{width: '100%', margin: 'auto', position: "relative", top: '-20px'}}>
                            {data && data.length > 0 ? 
                                data.map((content, key) => content !== initialText ? 
                                    (<div style={{display: 'flex', alignItems: 'center', backgroundColor: '#f4f4f4', paddingLeft: '10px', paddingTop: '0px', paddingBottom: '0px', marginTop: '5px', marginBottom: '5px', border: '1px solid #555', width: '100%'}}>
                                        <input 
                                            onClick={(e) => setCheckedFunction(e, counter)} 
                                            type="checkbox" 
                                            id={key} 
                                            name={data.indexOf(content) + counter}
                                            // checked={checked ? true : false}
                                         ></input>
                                    <label style={styles.taskContainer} 
                                        for={key}>
                                        <p style={styles.individualTask} 
                                            >
                                                <div style={{}}>{counter++}. </div>
                                                <span 
                                                    id={'content'}
                                                    data-key={key}
                                                    style={{ textDecoration: checked && input.id === counter ? 'line-through' : null }} 
                                                    key={key}
                                                    >
                                                        {content}
                                                </span>
                                        </p> 
                                        <Button 
                                            onClick={(e) => onTaskDelete(content)} 
                                            className="remove-task-button" 
                                            type="primary" 
                                            danger> X 
                                        </Button>
                                    </label>
                                    </div>
                                    ) 
                                : null) 
                                    : 
                                (<h4>What are you working on today?</h4>)
                            }
                            {counter > 3 ? null : 
                                <div style={{display: 'flex', padding: '5px'}}>
                                    <input
                                        onChange={(event) => handleChange(event)}
                                        value={toggle ? '' : input}
                                        style={{width: '73%', padding: '5px'}}
                                        
                                        placeholder="What are you working on today?"
                                    ></input>
                                    <button style={{marginLeft: '5px', cursor: 'pointer'}} onClick={() => handleAddStandup()}>Add Task</button>
                                </div>
                            }
                        </div> : 
                        <div className="back" ref={backEl}>
                            <h4>Any potential road blocks?</h4>
                            {blockData? blockData.map(content => <div style={{backgroundColor: '#fff', padding: '3px', margin: '8px'}}><p><span>{blockData.indexOf(content) + 1}.</span>{content}</p> </div>) : 
                                <>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                </>
                            }
                            <div style={{display: 'flex'}}>
                                <input
                                    onChange={(event) => handleRoadBlocksChange(event)}
                                    // value={blockToggle ? '' : blockData}
                                ></input>
                                <button onClick={() => handleAddRoadBlocks()}>Road block</button>
                            </div>
                        </div>
                        }   
                </div> 
            </Card>
        </div>
    )
}

export const StandDownComponent = () => {
    let [data, setData] = useState([])
    let [input, setInput] = useState([])
    let [toggle, setToggle] = useState(false)
    let [newData, setNewData] = useState(null)

    const handleAddStandDown = (event) => {
        setData([...data, input])
        setToggle(true)
    }
    const handleChange = (event) => {
        setToggle(false)
        console.log("event.target.value:", event.target.value)
        setInput(event.target.value)
    }

    return (
        <div className="site-card-border-less-wrapper">
            <Card title="Stand Down" bordered={false} style={{width: 450, background: 'yellow', textAlign: 'left' }}>
                
                <h4>What did you work on today?</h4>
                {data? data.map(content => <div style={{backgroundColor: '#fff', padding: '3px', margin: '8px'}}><p><span>{data.indexOf(content) + 1}.</span>{content}</p> </div>) : 
                    <>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </>
                }
                <div style={{display: 'flex'}}>
                    <input
                        onChange={(event) => handleChange(event)}
                        value={toggle ? '' : input}
                    ></input>
                    <button onClick={() => handleAddStandDown()}>Add Task</button>
                </div>
            </Card>
        </div>
    )
}

export const CheckinHeader = () => {
    const start = Date.now();
    const newDate = format(new Date(start), "dd/MM/yyyy")
    const time = formatRelative(subDays(new Date(), 0), new Date());

    return (
        <div>  
            <Header as="h2" textAlign="left">
                Check in - {newDate} - [{time}]
            </Header>
            <Divider />
        </div>
    )
}