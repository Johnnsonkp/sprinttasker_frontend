import React from "react";
import { useAppState } from "../AppState";
import { useNavigate } from "react-router-dom";

// export default function Form(props){
const Form = (props) => {
    const { state } = useAppState();
    const action = props.match.params.action 
    const [formData, setFormData] = React.useState(state[action])
    let navigate = useNavigate();

    const styles ={
      form: {
        width: '90vw',
        height: '90vw',
        border: '1px solid red',
        background: 'black'
      }
    }

    const actions = {
        new: () => {
          return fetch(state.url + "/notes", {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + state.token,
            },
            body: JSON.stringify(formData),
          }).then((response) => response.json());
        },
        edit: () => {
          console.log("State url", state.url);
          return fetch(state.url + "/notes/" + state.edit.id, {
            method: "put",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + state.token,
            },
            body: JSON.stringify(formData),
          }).then((response) => response.json());
        },
    };

    const handleChange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        actions[action]().then((data) => {
            props.getNotes()
            navigate("/notes/")
        })
    }

    return (
      <div style={styles.form} className="form">
          <form onSubmit={handleSubmit}>
              <input type="text" name="title" value={formData.title} onChange={handleChange}></input>
              <input type="text" name="body" value={formData.body} onChange={handleChange}></input>
              <input type="submit" value={action}/>
          </form>
      </div>
    )
}

export default Form