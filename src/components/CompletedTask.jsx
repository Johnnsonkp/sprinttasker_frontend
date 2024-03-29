import { Button, Card, Progress } from 'antd';
import React, {useCallback, useEffect, useState} from 'react';

import { format } from "date-fns";
import { reformatDate } from '../utilities/utilFunctions';
import { useAppState } from '../AppState';

export const DailyCompletedTask = ({SetShowHide}) => {
    const { state, dispatch } = useAppState();
    const [task, setTask] = useState(state.alltasks || null)
    const styles = {
        card: {
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 6px 12px 0px',
            cursor: 'pointer',
            marginTop: '50px',
            padding: '0px !important',
            background: 'rgb(198, 255, 221)'
        }
    }
    let sortedTask = state.alltasks? state.alltasks.sort((a, b) => (a.created_at < b.created_at) ? 1 : -1) : null
    let counter = 1

    return (
        <div id='completed' 
        style={{
            background: 'rgb(198, 255, 221)',
            marginTop: '20px',
        }}
        >
            <Card 
                title="Today's Completed Tasks"
                style={styles.card} 
                bordered={true} 
                style={{ 
                    width: 450,
                    width: 490, 
                    minHeight: 266.14, 
                    maxHeight: 266.14,
                    textAlign: 'left', 
                    // backgroundColor: '#fff', 
                    // backgroundColor: '#ffffff;',
                    // backgroundColor: '#f5f6f8',
                    // backgroundColor: 'rgba(0, 0, 255, 0.25)',
                    // marginTop: '20px', 
                    // marginLeft: '10px', 
                    // marginRight: '10px', 
                    overflowY: 'scroll' 
                }}>
                {state.alltasks && sortedTask && sortedTask.map(task => task.completed === true &&
                    reformatDate(task.created_at, "dd/MM/yyyy") === reformatDate(Date.now(), "dd/MM/yyyy") &&
                        <div style={{border: '1px solid rgba(111,111,111,0.1)', marginBottom: '5px', padding: '3px', backgroundColor:'rgba(0, 200, 117, 0.5)', color: '#111'}}>
                            {counter++}. <span style={{listStyle: 'none', fontSize: '12px', paddingLeft: '2px'}} key={task.id}>{task.name}- <span style={{color: 'red'}}>{task.timer}</span></span>
                        </div> 
                    ) 
                } 
                <Button 
                    type={'primary'}
                    style={{marginTop: '10px', float: 'right', cursor: 'pointer', fontSize: '14px', position: 'relative', background: 'rgb(244, 244, 244)', color: '#111', border: 'rgb(244, 244, 244)', bottom: '70px', background: 'rgba(0, 0, 255, 0.3)', color: "#f5f5f5", fontWeight: 'bold'}}
                    onClick={() => SetShowHide(false)}
                >Completion Rate (%)</Button>
                
            </Card>  
        </div>
    )
}

export const CompletedRate = ({SetShowHide}) => {
    const { state, dispatch } = useAppState();
    const [task, setTask] = useState(state.alltasks || null)
    const styles = {
        card: {
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 6px 12px 0px',
            cursor: 'pointer',
            marginTop: '50px',
            padding: '0px !important'
        }
    }
    

    const completedTaskCount = () => {
        let counter = 0
        {state.alltasks && state.alltasks.map(task => task.completed === true &&
            reformatDate(task.created_at, "dd/MM/yyyy") === reformatDate(Date.now(), "dd/MM/yyyy") ? 
                counter++ : null
            )
            return parseInt(counter)
        }
    }
    const taskCreatedToday = () => {
        let counter = 0
        {state.alltasks && state.alltasks.map(task => reformatDate(task.created_at, "dd/MM/yyyy") ===  reformatDate(Date.now(), "dd/MM/yyyy") ?
                counter++ : null
            )
            return parseInt(counter)
        }
    }
    const totalTimeWorkedOnTask = () => {
        let counter = 0
        {state.alltasks && state.alltasks.map((task) => {
            counter += parseFloat(task.timer) 
        })}
            
        return counter
        
    }
    const completedPercentage = (taskCreatedToday, completedTaskCount) => {
        const percentage = taskCreatedToday / completedTaskCount * 100
        return parseInt(percentage)
    }

    return (
        <div id='completed' 
        style={{
            background: 'rgb(198, 255, 221)',
            marginTop: '20px',
        }}
        >
        <Card 
            title="Completion Rate (%)"
            // style={styles.card} 
            bordered={true} 
            style={{ 
                width: 490, 
                minHeight: 266.14, 
                maxHeight: 266.14, 
                textAlign: 'left', 
                // backgroundColor: '#fff', 
                // backgroundColor: '#b8c6db;',
                backgroundColor: 'rgba(0, 0, 255, 0.25)',
                // backgroundImage: 'linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)',
                // backgroundColor: '#f5f6f8',
                // background: 'rgb(198, 255, 221)',
                // marginTop: '20px', 
                // marginLeft: '10px', 
                // marginRight: '10px', 
                overflow: 'hidden' ,
                opacity: 1
            }}>
                
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '10px', paddingRight: '10px', paddingTop: '10px', paddingBottom: '10px'}}>
                <Progress 
                    strokeWidth={12}
                    type="circle" 
                    percent={completedPercentage(completedTaskCount(), taskCreatedToday())} 
                    width={'100px'}
                    strokeColor={completedPercentage(completedTaskCount(), taskCreatedToday()) >= 80? 'lightGreen' : completedPercentage(completedTaskCount(), taskCreatedToday()) > 50? 'orange' : 'red'}
                    trailColor={'#9996'}
                    style={{
                        marginLeft: '5px', 
                        marginRight: '5px', 
                        border: '2px solid blue',
                        background: 'rgb(244, 244, 244)',
                        
                        
                        background: '#fff',
                        background: '#00f1',
                        background: 'rgba(255,255,255,0.3)',
                        paddingTop: '10px', 
                        paddingBottom: '10px', 
                        paddingLeft: '10px', 
                        paddingRight: '10px'}}
                    />
                <div 
                    style={{margin: '0px', textAlign: 'center', paddingTop: '15px', paddingBottom: '15px', paddingLeft: '20px', paddingRight: '20px', background: 'rgb(244, 244, 244)', background: '#00f1', background: 'rgba(255,255,255,0.3)', border: '2px solid lightgray'}}>
                    <h5 style={{textAlign: 'left'}}>Tasks</h5>
                    <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <h5 style={{paddingRight: '10px'}}>{taskCreatedToday()}</h5>
                        <p>Created</p>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <h5 style={{paddingRight: '10px'}}>{completedTaskCount()}</h5>
                        <p>Completed</p>
                    </div>
                </div>

                <div 
                    style={{margin: '0px', textAlign: 'left', paddingTop: '35px', paddingBottom: '35px', paddingLeft: '10px', paddingRight: '10px', background: 'rgb(244, 244, 244)', background: '#00f1', background: 'rgba(255,255,255,0.3)', border: '2px solid lightgray'}}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <h5>Minutes worked</h5>
                        <p>{totalTimeWorkedOnTask()} Mins</p>
                    </div>
                </div>
            </div>
            <Button 
                type={'primary'}
                style={{marginTop: '0px', float: 'right', cursor: 'pointer', fontSize: '14px', color: '#111', border: 'rgb(244, 244, 244)', position: 'relative', bottom: '210px', background: 'rgba(0, 0, 255, 0.3)', color: "#f5f5f5", fontWeight: 'bold'}}
                onClick={() => SetShowHide(true)}
            >Completed Tasks</Button>
        </Card>
        </div>
    )
}