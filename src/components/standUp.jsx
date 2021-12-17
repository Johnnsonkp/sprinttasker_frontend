import React from 'react'
import Note from './Note'

const standUp = () => {

    return (
        <Note 
            key={note.id + i} 
            id={note.id} 
            title="Stand Up" 
            body={note.body} 
            created_at={reformatDate(note.created_at)} 
            deleteNote={deleteNote}
        />
    )
}