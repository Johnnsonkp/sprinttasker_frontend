import React from 'react'
import Note from './Note'
import AddNote from './AddNote';
import { format } from "date-fns";


const NotesList = ( {notes, handleAddNote, deleteNote}) => {

    const reformatDate = (railsDate) => {
        const newDate = format(new Date(railsDate), "yyyy/MM/dd")
        return newDate
    }
    
    return (
        <>
            { notes? 
                <div className="notes-list">
                    {notes.map((note, i) => (
                        <>
                        <Note
                            key={note.id + i} 
                            id={note.id} 
                            title={note.title} 
                            body={note.body} 
                            created_at={reformatDate(note.created_at)} 
                            deleteNote={deleteNote}
                            />
                        </>
                    ))}
                    <AddNote handleAddNote={handleAddNote}/>
                </div> : null
            }
        </>
                
    );
}

export default NotesList;