import React, { useState, useRef, useEffect } from "react";
import "../App.css";
import { Container, Segment, Header, Divider } from "semantic-ui-react";
import InputListComponent from "./InputList.component.jsx";
import { format, formatRelative, subDays } from "date-fns";
import { Card } from 'antd';
import {RightCircleOutlined} from '@ant-design/icons';

export const StandUpComponent = () => {
    let [data, setData] = useState([])
    let [input, setInput] = useState([])
    let [toggle, setToggle] = useState(false)
    let [blockData, setBlockData] = useState([])
    let [blockInput, setBlockInput] = useState([])
    let [blockToggle, setBlockToggle] = useState(false)
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
    function setMaxHeight() {
        const frontHeight = frontEl.current.getBoundingClientRect().height;
        const backHeight = backEl.current.getBoundingClientRect().height;
        setHeight(Math.max(frontHeight, backHeight, 200));
    }
    useEffect(setMaxHeight, [
        data,
        blockData
    ]);
    useEffect(() => {
    window.addEventListener("resize", setMaxHeight);
    return () => window.removeEventListener("resize", setMaxHeight);
    }, []);

    return (
        <div 
            style={{ height: height}}
            className={`site-card-border-less-wrapper card ${flip ? "flip" : ""} `} 
        >
            <RightCircleOutlined 
                style={{position: 'relative', left: '135px', bottom: '-70px', zIndex: 2, color: 'red', width: '5em'}}
                onClick={() => setFlip(!flip)}
                // width={{'3em'}}
            />
            <Card 
                title="Stand Up" 
                bordered={false} 
                style={{width: 300, textAlign: 'left' }}>
                
                <div
                    style={{ }}
                >
                    <div className="front" ref={frontEl}>
                        {data.length > 0 ? data.map(content => <div style={{backgroundColor: '#fff', padding: '3px', margin: '8px'}}><p><span>{data.indexOf(content) + 1}.</span>{content}</p> </div>) : 
                            <>
                                <h4>What are you working on today?</h4>
                            </>
                        }
                        <div style={{display: 'flex'}}>
                            <input
                                onChange={(event) => handleChange(event)}
                                value={toggle ? '' : input}
                            ></input>
                            <button onClick={() => handleAddStandup()}>Add Task</button>
                        </div>
                    </div>
                </div>
            
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
            <Card title="Stand Down" bordered={false} style={{width: 300, background: 'yellow', textAlign: 'left' }}>
                
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