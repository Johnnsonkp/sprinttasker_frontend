import React from "react";
import { Button } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useAppState } from "../AppState";
import Wave from "../utilities/wave";

const Auth = ({ name, username, password, email }) => {
  const type = useParams().form;

  const [formData, setFormData] = React.useState({
    name: "",
    username: "",
    password: "",
    email: "",
  });
  const [userData, setUserData] = React.useState(null);
  const { state, dispatch } = useAppState();
  let navigate = useNavigate();

  React.useEffect(() => {
    if (userData) {
      const { token, user } = userData;
      dispatch({
        type: "auth",
        payload: {
          token,
          user_id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
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
      navigate("/");
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

  const handleSubmit = (event) => {
    event.preventDefault();
    actions[type]().then((data) => {
      setUserData(data);
    });
  };

  return (
    <div className="auth-container">
      <div className="banner">
        <Wave />
      </div>
      <div className="form-wrapper">
        <h1>{type.toUpperCase()}</h1>
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
            <Button
              className="button-submit"
              type="primary"
              shape="round"
              size="large"
            >
              <input
                className="submitBtn"
                type="submit"
                value={type.toUpperCase()}
              />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
