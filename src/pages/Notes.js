import React, { Component, useState, useEffect, useCallback } from "react";
import { useAppState } from "../AppState";
import { getNotes } from "../services/taskService";
import "../App.css";
import { Link, Route, Routes } from "react-router-dom";
// import { Route } from "react-router";
import Form from "../components/Form.jsx";
import { SingleNote } from "../components/SingleNote";
import AllNotes from "../components/AllNotes";

const Notes = () => {
  const styles = {
    textArea: {
      width: "75.8%",
      height: "98vh",
      background: "#323439",
      backgroundColor: "#282c34",
      padding: "100px",
      // border: "3px solid #1b1a21",
      // border: "3px solid red",
      marginLeft: "10.83333333%",
      color: "#fff",
    },
    container: {
      // display: "flex",
      // justifyContent: "center",
      // flexDirection: "column",
      // alignItems: "center",
      width: "100%",
      // background: "#323439",
      backgroundColor: "#282c34",
      minHeight: "100vh",
      // width: "100%",
      color: "#fff",
    },
    notesContainer: {
      marginLeft: "22%",
    },
  };

  const { state, dispatch } = useAppState();
  const { token, url, notes } = state;
  const [loadedNotes, setLoadNotes] = useState();
  const initialText = "Enter Notes Here...";
  const [text, setText] = useState(initialText);
  const [refreshing, setRefreshing] = useState(false);

  const loadNotes = () => {
    getNotes().then((json) => {
      console.log("json notes", json);
      const fetchedNotes = json;
      setLoadNotes(fetchedNotes);
      setNotes(fetchedNotes);
      // dispatch({ type: "getNotes", payload: fetchedNotes });
      return fetchedNotes;
    });
    // .then(
    //   console.log(
    //     "fetch notes completed loadedNotes notes:",
    //     loadedNotes,
    //     notes
    //   )
    // );
  };

  const setNotes = (fetchedNotes) => {
    if (fetchedNotes) {
      console.log("setNotes", fetchedNotes);
      dispatch({ type: "getNotes", payload: fetchedNotes });
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    let loadedNotes = await loadNotes();
    setLoadNotes(loadedNotes);
    console.log(notes);
    setRefreshing(false);
    console.log("Refreshing state", refreshing);
  }, [refreshing]);

  useEffect(() => {
    {
      loadNotes();
    }
  }, []);

  const loaded = () => {
    return (
      <div style={styles.container}>
        <div style={styles.notesContainer}>
          <AllNotes />
        </div>
      </div>
    );
  };
  return notes ? loaded() : <h1>Loading...</h1>;
};

export default Notes;
