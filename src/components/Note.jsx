import React, { useEffect } from 'react'
import {CloseCircleOutlined} from '@ant-design/icons'
import { useNavigate } from "react-router";
import { useAppState } from '../AppState';
import {Button} from 'antd'


const Note = ({id, title, body, created_at, deleteNote}) => {
    const Navigate = useNavigate()
    const {state, dispatch} = useAppState()

    const note = {
        id: id,
        title: title, 
        body: body,
        created_at: created_at
    }
    const style = {
        mouseOver: {
           cursor: 'pointer'
           
        }
    }

    const selectedNote = (note, e) => {
        console.log("selected note:", note)
        dispatch({ type: "selectedNote", payload: note})

        if(state.selectedNote){
          Navigate('/single-note')
        }
    }
    const destroyNote = (note) => {
        return deleteNote(note)
    }

    const clicked = (e, note) => {
        console.log("target.value:", e.target.innerText)
        if(e.target.innerText == "X"){
            destroyNote(note)
        } else{
            selectedNote(note)
        }
    }

    return (
        <div className="note" onClick={(e) => clicked(e, note)} style={style.mouseOver}>
            <div className="title">
                <h3>{title}</h3>
            </div>
            <div className="body" style={{overflow: 'hidden'}}>
                <span>{body.substring(0, 180)}</span>
            </div>
            <div className="note-footer">
                <small>{created_at}</small>
                <Button className="delete-icon" danger onClick={(e) => clicked(e, note)}>
                    X
                </Button>
            </div>
        </div>
    )
}

export default Note