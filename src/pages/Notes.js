import React, { useState, useEffect } from "react";
import { useAppState } from "../AppState";
import { getNotes, destroyNote, postNote } from "../services/taskService";
import "../App.css";
import AllNotes from "../components/AllNotes";
import Loading from "./Loading";
import { useNavigate } from "react-router";
import SearchBar from "../components/SearchBar";

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
      console.log("json notes", json);
      const fetchedNotes = json;
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
    return (
      destroyNote(note.id)
        // .then((res) => console.log(res))
        .then(() => setRefreshing(true))
        .then(navigate("/notes"))
    );
  };

  // const onRefresh = useCallback(async () => {
  //   setRefreshing(true);
  //   let loadedNotes = await loadNotes();
  //   setLoadNotes(loadedNotes);
  //   console.log(notes);
  //   setRefreshing(false);
  //   console.log("Refreshing state", refreshing);
  // }, [refreshing]);

  useEffect(() => {
    setRefreshing(false);
    loadNotes();
  }, [refreshing]);

  const loaded = () => {
    return (
      <div style={styles.container}>
        <div style={styles.notesContainer}>
          {/* <SearchBar handleSearchNote={setSearchText} /> */}
          <AllNotes
            // searchText={searchText}
            // notes={notes}
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
