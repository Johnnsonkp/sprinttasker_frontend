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
            border: "3px solid lightgray",
            borderRadius: "10px",
            height: location.pathname !== '/calendar'? "300px" : '600px',
            maxHeight: location.pathname !== '/calendar'? "300px" : '600px',
            overflow: "hidden",
            width: "100%",
            boxSizing: "border box",
            padding: "0px",
            backgroundColor: 'rgb(244, 244, 244)',
            backgroundColor: '#fff',
            boxShadow: '-2px 2px 8px 3px rgba(0,0,0,0.1)'
          }}
        >
          <h4
            className="display-box-title"
            style={{
              textAlign: "left",
              padding: "3px 10px",
              marginBottom: "3px",
              color: "#fff",
              color: "#111",
              fontWeight: "bolder",
              fontSize: "18px",
            }}
          >
            {title}
          </h4>
          <div
            style={{
              marginBottom: "20px",
              borderTop: '2px solid lightGray',
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