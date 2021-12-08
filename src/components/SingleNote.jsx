import React, {useState, useEffect} from 'react'
import { useAppState } from '../AppState'
import { updateNote } from '../services/taskService';
 

export const SingleNote = () => {
    const {state} = useAppState()
    const {selectedNote} = state
    const [body, setBody] = useState(selectedNote.body)
    const [title, setTitle] = useState(selectedNote.title)

    console.log("selectedNote:", selectedNote)

    const handleTitleChange = (event) => {
      setTitle(event.target.value)
      console.log(event.target.value);
    };
    const handleBodyChange = (event) => {
        setBody(event.target.value)
        console.log(event.target.value);
    };

    const handleSaveClick = () => {
      const updatedNote = {
        id: state.selectedNote.id, 
        title: title, 
        body: body 
      }
      updateNote(updatedNote).then(() => alert("Note saved!"))
    };

    const styles = {
        container: {
            backgroundColor: '#282c34',
            minHeight: '100vh',
            width: '100%',
            margin: '0px'
        },
    }

    useEffect(() => {
        setBody(selectedNote.body)
    }, [selectedNote])

    return(
        <div style={styles.container}>
            <div className="singleNoteContainer">
                <div className="singleNote">
                    <textarea
                        placeholder="Add a note title"
                        onChange={handleTitleChange}
                        value={title}
                        style={{ border: "3px solid #323439", fontSize: '20px', fontWeight: 'bolder' }}
                    ></textarea> 
                    <textarea
                        rows="20"
                        cols="10"
                        placeholder="Type to add a note..."
                        onChange={handleBodyChange}
                        value={body}
                        style={{ textAlign: 'left', padding: '30px' }}
                    ></textarea>
                    <div className="note-footer">
                        <small>{selectedNote.created_at}</small>
                        <button className="save" onClick={handleSaveClick}>
                            Save
                        </button>
                    </div>
            </div>
            </div>
      </div>
    )
}