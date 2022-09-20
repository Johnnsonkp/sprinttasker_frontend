import React, { useEffect, useState } from "react";

export default function Clock() {
  const current = new Date();
  const initialDataObj = {
    hours: current.getHours(),
    minutes: current.getMinutes(),
    seconds: current.getSeconds(),
  };
  const [clock, setClock] = useState(initialDataObj);

  useEffect(() => {
    setClock("");
    setInterval(() => {
      const current = new Date();
      const dataObj = {
        name: "Time: ",
        hours:
          current.getHours() > 9
            ? current.getHours()
            : `0${current.getHours()}`,
        minutes:
          current.getMinutes() > 9
            ? current.getMinutes()
            : `0${current.getMinutes()}`,
        seconds:
          current.getSeconds() > 9
            ? current.getSeconds()
            : `0${current.getSeconds()}`,
      };
      setClock(dataObj);
    }, 1000);
  }, []);

  return (
    <div
      style={{
        color: "#fff",
        fontWeight: "900",
        fontSize: "15px",
        width: "100%",
        letterSpacing: "0px",
      }}
    >
      {clock.hours} : {clock.minutes} : {clock.seconds}
    </div>
  );
}
