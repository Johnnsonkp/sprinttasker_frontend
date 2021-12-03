import React, {useState, useEffect} from 'react'
import { getNotes } from '../services/taskService'
import { useAppState } from '../AppState'

export const SingleNote = ({note, handleAddNote}) => {
    const [noteText, setNoteText] = useState();
    const {state, dispatch} = useAppState()
    const {selectedNote} = state
    console.log("selectedNote:", selectedNote)

    const handleChange = (event) => {
      console.log(event.target.value);
    //   setNoteText(event.target.value);
    };

    const handleSaveClick = (event) => {
      handleAddNote(noteText);
      // createNotes();
    };

    const styles = {
        container: {
            // marginLeft: "20.83333333%",
            backgroundColor: '#282c34',
            minHeight: '100vh',
            width: '100%',
            margin: '0px'
        },
    }

    return(
        <div style={styles.container}>
            <div className="singleNoteContainer">
                <div className="singleNote">
                    <textarea
                        // rows="2"
                        // cols="2"
                        placeholder="Add a note title"
                        onChange={handleChange}
                        value={selectedNote.title}
                        style={{ border: "1px solid red", fontSize: '20px', fontWeight: 'bolder' }}
                    ></textarea> 
                    <textarea
                        rows="20"
                        cols="10"
                        placeholder="Type to add a note..."
                        onChange={handleChange}
                        value={selectedNote.body}
                    ></textarea>
                    <div className="note-footer">
                        <small>200 Remaining</small>
                        <button className="save" onClick={handleSaveClick}>
                            Save
                        </button>
                    </div>
            </div>
            </div>
      </div>
    )
}