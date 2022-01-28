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
            padding: '0px !important'
        }
    }
    let sortedTask = state.alltasks? state.alltasks.sort((a, b) => (a.created_at < b.created_at) ? 1 : -1) : null
    let counter = 1

    return (
        <>
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
                    backgroundColor: '#fff', 
                    marginTop: '20px', 
                    marginLeft: '10px', 
                    marginRight: '10px', 
                    overflowY: 'scroll' 
                }}>
                {state.alltasks && sortedTask && sortedTask.map(task => task.completed === true &&
                    reformatDate(task.created_at, "dd/MM/yyyy") === reformatDate(Date.now(), "dd/MM/yyyy") &&
                        <div style={{border: '1px solid lightGray', marginBottom: '5px', padding: '3px', backgroundColor:'rgba(0, 200, 117, 0.8)', color: '#111'}}>
                            {counter++}. <span style={{listStyle: 'none', fontSize: '12px', paddingLeft: '2px'}} key={task.id}>{task.name}</span>
                        </div> 
                    ) 
                } 
                <Button 
                    type={'primary'}
                    style={{marginTop: '10px', float: 'right', cursor: 'pointer', fontSize: '12px', position: 'relative', top: state.alltasks? null : '120px', left: state.alltasks? null : '0px'}}
                    onClick={() => SetShowHide(false)}
                >Completion Rate (%)</Button>
                
            </Card>  
        </>
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
    const completedPercentage = (taskCreatedToday, completedTaskCount) => {
        const percentage = taskCreatedToday / completedTaskCount * 100
        return parseInt(percentage)
    }

    return (
        <Card 
            title="Completion Rate (%)"
            style={styles.card} 
            bordered={true} 
            style={{ 
                width: 490, 
                minHeight: 266.14, 
                maxHeight: 266.14, 
                textAlign: 'left', 
                backgroundColor: '#fff', 
                marginTop: '20px', 
                marginLeft: '10px', 
                marginRight: '10px', 
                overflow: 'hidden' 
            }}>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '10px', paddingRight: '10px', paddingTop: '10px', paddingBottom: '10px', border: '1px solid lightGrey', background: 'rgb(244, 244, 244)'}}>
                <Progress 
                    type="circle" 
                    percent={completedPercentage(completedTaskCount(), taskCreatedToday())} 
                    width={'100px'}
                    strokeColor={completedPercentage(completedTaskCount(), taskCreatedToday()) >= 80? 'lightGreen' : completedPercentage(completedTaskCount(), taskCreatedToday()) > 50? 'orange' : 'red'}
                    trailColor={'#444'}
                    style={{
                        marginLeft: '10px', 
                        marginRight: '10px', 
                        border: '1px solid lightGrey',
                        background: 'rgb(244, 244, 244)', 
                        background: '#fff',
                        paddingTop: '10px', 
                        paddingBottom: '10px', 
                        paddingLeft: '10px', 
                        paddingRight: '10px'}}
                    />

                <h5 style={{margin: '0px', textAlign: 'left', border: '1px solid lightGrey', paddingTop: '50px', paddingBottom: '50px', paddingLeft: '15px', paddingRight: '15px', background: 'rgb(244, 244, 244)'}}>Created Tasks: {taskCreatedToday()}</h5>

                <h5 style={{margin: '0px', textAlign: 'left', border: '1px solid lightGrey', paddingTop: '50px', paddingBottom: '50px', paddingLeft: '10px', paddingRight: '10px', background: 'rgb(244, 244, 244)'}}>Completed Tasks: {completedTaskCount()}</h5>
            </div>
            <Button 
                type={'primary'}
                style={{marginTop: '10px', float: 'right', cursor: 'pointer', fontSize: '12px'}}
                onClick={() => SetShowHide(true)}
            >Completed Tasks</Button>
            
        </Card>
    )
}