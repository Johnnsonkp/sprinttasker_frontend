import React, {useState, useEffect} from 'react'
import { useAppState } from '../AppState'

export const SingleNote = ({ handleAddNote}) => {
    const [noteText] = useState();
    const {state} = useAppState()
    const {selectedNote} = state
    const [body, setBody] = useState(selectedNote.body)

    console.log("selectedNote:", selectedNote)

    const handleChange = (event) => {
      setBody(event.target.value)
      console.log(event.target.value);
    };

    const handleSaveClick = (event) => {
      handleAddNote(noteText);
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
                        onChange={handleChange}
                        value={selectedNote.title}
                        style={{ border: "3px solid #323439", fontSize: '20px', fontWeight: 'bolder' }}
                    ></textarea> 
                    <textarea
                        rows="20"
                        cols="10"
                        placeholder="Type to add a note..."
                        onChange={handleChange}
                        value={body}
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