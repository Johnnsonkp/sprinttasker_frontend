import "../App.css";

import React, { useEffect, useState } from "react";
import { destroyNote, getNotes, postNote } from "../services/taskService";

import AllNotes from "../components/AllNotes";
import Loading from "./Loading";
import { useAppState } from "../AppState";
import { useNavigate } from "react-router";

const Notes = () => {
  const styles = {
    textArea: {
      width: "75.8%",
      height: "98vh",
      background: "#323439",
      backgroundColor: "#282c34",
      padding: "100px",
      marginLeft: "10.83333333%",
      color: "#fff",
    },
    container: {
      width: "100%",
      backgroundColor: "#282c34",
      minHeight: "100vh",
      color: "#fff",
      position: "absolute",
      top: "8%",
      paddingBottom: "30px",
    },
    notesContainer: {
      marginLeft: "22%",
    },
  };

  const { state, dispatch } = useAppState();
  const { notes } = state;
  const [loadedNotes, setLoadNotes] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState();
  const navigate = useNavigate();

  const loadNotes = () => {
    getNotes().then((json) => {
      const fetchedNotes = json.filter(
        (parsedNotes) => parsedNotes.user_id === state.user_id
      );
      setLoadNotes(fetchedNotes);
      setNotes(fetchedNotes);
      return fetchedNotes;
    });
  };

  const setNotes = (fetchedNotes) => {
    if (fetchedNotes) {
      dispatch({ type: "getNotes", payload: fetchedNotes });
    }
  };

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      title: text.title,
      body: text.body,
      created_at: date.toLocaleDateString(),
    };
    postNote(newNote).then(() => setRefreshing(true));
  };

  const deleteNote = (note) => {
    return destroyNote(note.id)
      .then(() => setRefreshing(true))
      .then(navigate("/notes"));
  };
  useEffect(() => {
    setRefreshing(false);
    loadNotes();
  }, [refreshing]);

  const loaded = () => {
    return (
      <div id="note" style={styles.container}>
        <div className="note-container" style={styles.notesContainer}>
          <AllNotes
            notes={loadedNotes}
            addNote={addNote}
            deleteNote={deleteNote}
          />
        </div>
      </div>
    );
  };
  return loadedNotes ? loaded() : <Loading />;
};

export default Notes;
