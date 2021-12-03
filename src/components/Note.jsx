import React from 'react'
import {CloseCircleOutlined} from '@ant-design/icons'
import { useNavigate } from "react-router";
import { useAppState } from '../AppState';


const Note = ({id, title, body, created_at}) => {
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

    const selectedNote = (note) => {
        console.log("selected note:", note)
        dispatch({ type: "selectedNote", payload: note})

        if(state.selectedNote){
          Navigate('/single-note')
        }
    }


    return (
        <div className="note" onClick={() => selectedNote(note)} style={style.mouseOver}>
            <div className="title">
                <h4>{title}</h4>
            </div>
            <div className="body">
                <span>{body}</span>
            </div>
            <div className="note-footer">
                <small>{created_at}</small>
                <CloseCircleOutlined type="danger" className="delete-icon"/>
            </div>
        </div>
    )
}

export default Note