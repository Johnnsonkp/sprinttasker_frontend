import React, { useState } from "react";
import "../App.css";
import { Container, Segment, Header, Divider } from "semantic-ui-react";
import InputListComponent from "../components/InputList.component.jsx";
import { format, formatRelative, subDays } from "date-fns";

export const StandUpComponent = () => {
    let [data, setData] = useState("Enter the first task you're working on today")
    let [toggle, setToggle] = useState(false)
    let [newData, setNewData] = useState(null)

    const handleAddStandup = (event) => {
        console.log("event.target.value:", event.target.value)
        setToggle(true)
        setData(event.target.value)
    }

    return (
        <div>  
            <Header as="h3" textAlign="left">
                Stand Up:
            </Header>
            <Segment style={{ minHeight: "100px", margin: "10px" }}>
                <InputListComponent data={[data]}>
                </InputListComponent>
            </Segment>
        </div>
    )
}

export const StandDownComponent = () => {
    return (
        <div>  
            <Header as="h3" textAlign="left">
                Stand Down:
            </Header>
            <Segment style={{ minHeight: "100px", margin: "10px" }}>
                <InputListComponent
                data={[
                    "Enter the first task that was completed",
                    "Enter the second task that was completed",
                    "Enter the third task that was completed"
                ]}
                />
            </Segment>
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