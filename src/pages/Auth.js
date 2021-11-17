import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { useParams, useNavigate, useHistory } from "react-router-dom";
import { useAppState } from "../AppState";
import Task from "../components/TaskItem";

const Auth = (props) => {
  const type = useParams().form;

  const [formData, setFormData] = React.useState({
    name: "",
    username: "",
    password: "",
    email: "",
  });
  const [userData, setUserData] = React.useState(null);
  const { state, dispatch } = useAppState();
  console.log("auth pre sign in:", state);
  let navigate = useNavigate();

  React.useEffect(() => {
    if (userData) {
      console.log("userData:", userData);
      const { token, user } = userData;
      dispatch({
        type: "auth",
        payload: {
          token,
          user_id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          task: user.task_id,
        },
      });
      window.localStorage.setItem(
        "auth",
        JSON.stringify({
          token,
          user_id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
        })
      );
      console.log("auth post sign in:", state);
      // navigate("/my_work");
      navigate("/main");
    }
  }, [userData]);

  const actions = {
    signup: () => {
      return fetch(state.url + "/users", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((response) => response.json());
    },
    login: () => {
      console.log("State url", state.url);
      return fetch(state.url + "/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((response) => response.json());
    },
  };
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  async function handleSubmit(event) {
    event.preventDefault();
    let result = await actions[type]().then((data) => {
      setUserData(data);
    });
    // navigate("main");
  }
  return (
    <div className="form-wrapper">
      <h1>{type}</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {type === "LOGIN" ? (
            <></>
          ) : (
            <>
              <label className="usernameLabel" htmlFor="name">
                Name:
              </label>
              <input
                className="usernameInput"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </>
          )}
          <label className="usernameLabel" htmlFor="username">
            Username:
          </label>
          <input
            className="usernameInput"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />

          <label className="passwordLabel" htmlFor="password">
            Password:
          </label>
          <input
            className="passwordInput"
            type="password"
            name="password"
            inputlabelprops={{
              shrink: true,
            }}
            value={formData.password}
            onChange={handleChange}
          />
          {type === "LOGIN" ? (
            <></>
          ) : (
            <>
              <label className="usernameLabel" htmlFor="email">
                Email:
              </label>
              <input
                className="usernameInput"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </>
          )}
          <Button type="primary" shape="round" size="large">
            <input className="submitBtn" type="submit" value={type} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
