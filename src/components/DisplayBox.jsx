import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";

export const DisplayBox = ({component, title, link, customFunction}) => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div
          id="homeContent"
          style={{
            marginBottom: '0px',
            border: "2px solid lightGrey",
            borderRadius: "10px",
            height: location.pathname !== '/calendar'? "300px" : '600px',
            maxHeight: location.pathname !== '/calendar'? "300px" : '600px',
            overflow: "hidden",
            width: "100%",
            boxSizing: "border box",
            padding: "0px",
            backgroundColor: "#f7f7f7",
            backgroundColor: 'lightgray',
            backgroundColor: 'rgb(244, 244, 244)'
          }}
        >
          <h3
            className="display-box-title"
            style={{
              textAlign: "left",
              padding: "8px",
              marginBottom: "3px",
              color: "#fff",
              color: "#111",
              fontWeight: "bolder",
              fontSize: "18px",
            }}
          >
            {title}
          </h3>
          <div
            style={{
              marginBottom: "20px",
              borderTop: '3px solid rgb(244, 244, 244)',
              width: "100%",
              height: location.pathname !== '/calendar'? "250px" : '800px',
              overflow: "hidden",
            }}
            id="projects"
            onClick={() => {
              navigate(link);
            }}
          >
            <div 
              className="inner" 
              style={{backgroundColor: component? "#fff" : "#fff", height: '100%', boxSize: 'border-box', marginBottom: '0px', paddingBottom: '0px'}} onLoad={() => customFunction}>
                {component}
            </div>
          </div>
        </div>
    )
}