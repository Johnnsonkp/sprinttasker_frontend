import React, {useEffect, useState, useCallback} from 'react';
import { Card } from 'antd';
import { useAppState } from '../AppState';
import banner from '../std-banner.svg';
// import {
//     StandUpComponent,
//     StandDownComponent,
//     CheckinHeader,
// } from "../components/StandUp.jsx";

import { StandUpComponent } from '../components/StandUp.jsx';

export default function StandUpComp(props) {

    const styles = {
        container: {
            marginTop: '0px',
            marginBottom: '0px',
            background: "#f0f2f5",
            backgroundImage: `url(${banner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            paddingLeft: '10px',
            paddingRight: '10px',
            background: '#fff',
            width: '100%',
            margin: 'auto',
            marginRight: '10px',
            marginLeft: '10px',
            border: '1px solid lightgrey',
            borderRadius: '10px',
            minWidth: '1050px'
        },
        header: {
            width: '100%',
            margin: 'auto',
            paddingLeft: '60px',
            paddingRight: '60px',
            marginRight: '10px',
            marginLeft: '10px',
            minWidth: '1050px',
            border: '1px solid red'
        },
        innerCard: {
            // paddingLeft: '10px',
            // paddingRight: '10px',
            paddingTop: '20px',
            margin: '0px',
            display: 'flex',
            width: '90%',
            // marginLeft: 'auto',
            // marginRight: 'auto',
            margin: 'auto',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundSize: 'center center',
            cursor: 'pointer'
        },
        card: {
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 6px 12px 0px',
            cursor: 'pointer'
        }
       

    }
    const {state} = useAppState()
    const [completedTask, setCompletedTasks] = useState(null)
    const [toggle, setToggle] = useState(false)

    const TaskComplete = () => {
        
        setToggle(false)
        return (
            completedTask.map((task) => (
                console.log("completedTasks forloop:", completedTask),
                <p key={task.id}>{task.name}</p>
            ))   
        )
    }

    useEffect(() => {
        if(toggle){
            setToggle(false)
            setCompletedTasks(state.alltasks)
        }
        
    }, [toggle])
    const Toggled = () => {
        setToggle(!toggle)
        console.log("toggled",toggle)
        return (
            null
        )
    }

    return (
        <div className="trackList">
            <div className="dummy-side-panel"></div>
            <div style={styles.container}>
                <div style={styles.innerCard} className="site-card-border-less-wrapper">
                    <StandUpComponent />
                    <Card style={styles.card} className="singleCard" title="Countdown Timer" bordered={true} style={{ width: 400, minHeight: 200, textAlign: 'left', backgroundColor: '#fff', margin: '10px' }}>
                        <p>0 0 0 0</p>
                        <p>Days Hours Minutes Seconds</p>
                    </Card>

                    <Card style={styles.card} className="singleCard completed-task-card" title="Completed Task" bordered={true} style={{ width: 450, minHeight: 200, maxHeight: '200px', textAlign: 'left', backgroundColor: '#fff', margin: '10px', overflow: 'hidden' }}>
                        {/* {completedTask ? completedTask.map((task) => (
                            console.log("completedTasks forloop:", completedTask),
                            <p key={task.id}>{task.name}</p>
                        )) : null} */}
            
                    </Card>
                </div>
            </div>
        </div>
    )
}