import { CompletedRate, DailyCompletedTask } from '../CompletedTask';
import React, {useCallback, useEffect, useState} from 'react';

import { Card } from 'antd';
import  {StandUpComponent} from '../standupComponent/StandUpContainer.jsx';
import banner from '../../std-banner.svg';
import {styles} from './slideDashboard.styles'
import { useAppState } from '../../AppState';

export default function StandUpComp(props) {
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
                    {   showHide?
                        <DailyCompletedTask SetShowHide={SetShowHide}/> : <CompletedRate SetShowHide={SetShowHide}/>
                    }
                </div>
            </div>
        </div>
    )
}
