import { CompletedRate, DailyCompletedTask } from './CompletedTask';
import React, {useCallback, useEffect, useState} from 'react';

import { Card } from 'antd';
import  {StandUpComponent} from './StandUpContainer.jsx';
import banner from '../std-banner.svg';
import { useAppState } from '../AppState';

export default function StandUpComp(props) {

    const styles = {
        container: {
            marginTop: '0px',
            marginBottom: '0px',
            background: "#f0f2f5",
            backgroundImage: `url(${banner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            paddingTop: '0px',
            paddingLeft: '10px',
            paddingRight: '10px',
            background: '#fff',
            width: '100%',
            margin: 'auto',
            marginRight: '10px',
            marginLeft: '10px',
            border: '1px solid lightgrey',
            borderRadius: '10px',
            minWidth: '1050px',
            minHeight: '310px'
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
            paddingTop: '20px',
            margin: '0px',
            display: 'flex',
            width: '100%',
            margin: 'auto',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundSize: 'center center',
            cursor: 'pointer'
        },
        card: {
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 6px 12px 0px',
            cursor: 'pointer',
            marginTop: '50px'
        }
       

    }
    const {state} = useAppState()
    const [completedTask, setCompletedTasks] = useState(null)
    const [toggle, setToggle] = useState(false)
    const [showHide, SetShowHide] = useState(null)

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
                    {   !showHide?
                        <DailyCompletedTask SetShowHide={SetShowHide}/> : <CompletedRate SetShowHide={SetShowHide}/>
                    }
                    
                </div>
            </div>
        </div>
    )
}
