import React from "react";
import { useNavigate } from "react-router";

export const DisplayBox = ({component, title, link}) => {
    const navigate = useNavigate();
    return (
        <div
          id="homeContent"
          style={{
            marginTop: "30px",
            border: "3px solid rgb(98 178 251)",
            border: "3px solid lightGrey",
            borderRadius: "10px",
            height: "280px",
            maxHeight: "280px",
            overflow: "hidden",
            width: "100%",
            boxSizing: "border box",
            padding: "0px",
            // backgroundColor: "#1890ff",
            backgroundColor: "rgb(98 178 251)",
            // backgroundColor: "#fff"
          }}
        >
          <h3
            className="display-box-title"
            style={{
              textAlign: "left",
              padding: "8px",
              marginBottom: "3px",
              color: "#fff",
              // color: "#111",
              fontWeight: "bolder",
              fontSize: "18px",
            }}
          >
            {title}
          </h3>
          <div
            style={{
              // marginTop: "20px",
              marginBottom: "20px",
              width: "100%",
              height: "250px",
              border: "1px solid lightgrey",
              borderRadius: "5px",
              overflow: "hidden",
            }}
            id="projects"
            onClick={() => {
              navigate(link);
            }}
          >
            <div className="inner" style={{backgroundColor: component? "#fff" : "#fff"}}>
                {component}
            </div>
          </div>
        </div>
    )
}