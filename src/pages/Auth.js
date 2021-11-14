import React from "react";

export default function Auth(props) {
  const type = props.match.params.form;
  return <h1>{type}</h1>;
}
