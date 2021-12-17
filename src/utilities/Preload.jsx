import React, {useEffect, useState} from 'react'
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function Preload(props){
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const [toggle, setToggle] = useState(false);
    
    useEffect(() => {
        const timer = setTimeout(() => {
          setToggle(!toggle);
        }, props.timeoutLengthInSeconds);
        setToggle(false)
        return () => clearTimeout(timer);
    }, []);

    const Spinner = () => {
        return (
            <div>
                <Spin 
                    style={{margin: "auto", 
                    position: "absolute", 
                    top: "45%", 
                    left: "55%", 
                    display: toggle ? 'none' : 'block'
                    }} 
                    indicator={antIcon}
                />
            </div>
        )
    }
    return (
        <div>
            {toggle ? (props.handleFunction) : (<Spinner />)}
        </div>
    );
    
} 