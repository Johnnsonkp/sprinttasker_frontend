import React, {useState, useEffect} from 'react'
import NotesList from './NotesList';
import { getNotes, postNote } from '../services/taskService';
import { useAppState } from '../AppState';

const AllNotes = () => {
    const {state, dispatch} = useAppState()
    const [refreshing, setRefreshing] = useState(false)
    const [notes, setNotes] = useState([])
    //     {
    //         id: 0,
    //         title: "This is the title",
    //         body: "This is the body of my first notes",
    //         created_at: "15/04/2021"
    //     },
    //     {
    //         id: 1,
    //         title: "This is the title",
    //         body: "This is the body of my first notes",
    //         created_at: "15/04/2021"
    //     },
    //     {
    //         id: 2,
    //         title: "This is the title",
    //         body: "This is the body of my first notes",
    //         created_at: "15/04/2021"
    //     },
    //     {
    //         id: 3,
    //         title: "This is the title",
    //         body: "This is the body of my first notes",
    //         created_at: "15/04/2021"
    //     }
    // ]);

    const refresh = () => {
        getNotes().then((res) => {
            // console.log("Allnotes.jsx notes:", res)
            setNotes(res)
            // console.log("refresh notes function", notes)
            dispatch({type: "getNotes", payload: notes});
        })
    }

    const createdNote = (note) => {
        console.log("About to post to database note, refreshing", note, refreshing)
        postNote(note).then(() => setRefreshing(true))
        console.log("Note added to database refreshing:", refreshing)
    }

    const addNote = (text) => {
        console.log("addNote", text)
        const date = new Date();
        const newNote = {
            title: text.title,
            body: text.body,
            created_at: date.toLocaleDateString()
        }
        // const newNotes = [...notes, newNote];
        // setNotes(newNotes)
        createdNote(newNote)
    }

    useEffect(() => {
        setRefreshing(false)
        refresh()
    }, [refreshing])

    return (
        <div className="notes-container">
            <NotesList notes={notes} handleAddNote={addNote}/>
        </div>
    )
}

export default AllNotes;