import React from "react"; 
import { Button, notification, Space } from 'antd';
import {
    StandUpComponent,
    StandDownComponent,
    CheckinHeader,
} from "../components/StandUp.jsx";

const standUpNotification = type => {
    notification[type]({
      message: 'Daily Stand up',
      description:
        'What are you working on today? Are there any potential road blocks?',
      onClick: handleClick()
    });
};

const standDownNotification = type => {
    notification[type]({
      message: 'Daily Stand down',
      description:
        'What did you work on today? Any road blocks?'
    });
};
// ant-notification ant-notification-topRight
const handleClick = () => {
    if(document.querySelector('.ant-notification-topRight')){
        document.querySelector('.ant-notification-topRight').addEventListener('click', () => {
            return  null
        })

    }
}

export function Notification(){
    return(
        <div>
            <Button onClick={() => standUpNotification('info')}>StandUp</Button>
            <Button onClick={() => standDownNotification('info')}>StandDown</Button>
        </div>
    ) 
}