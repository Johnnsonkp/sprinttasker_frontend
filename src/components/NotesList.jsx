import React from 'react'
import Note from './Note'
import AddNote from './AddNote';
import { format } from "date-fns";


const NotesList = ( {notes, handleAddNote}) => {

    const reformatDate = (railsDate) => {
        console.log("rails date:", railsDate)
        const newDate = format(new Date(railsDate), "yyyy/MM/dd")

        console.log("date", newDate)
        return newDate
    }
    return (
        <>
            <div className="notes-list">
                {notes.map((note) => (
                    <Note 
                        id={note.id} 
                        title={note.title} 
                        body={note.body} 
                        created_at={reformatDate(note.created_at)} />
                ))}
                <AddNote handleAddNote={handleAddNote}/>
            </div>
        </>
    );
}

export default NotesList;