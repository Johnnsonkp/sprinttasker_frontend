import React from "react";
import { useLocation, useNavigate } from "react-router";

export const DisplayBox = ({component, title, link}) => {
    const navigate = useNavigate();
    const styles = {
        placeHolder: {
            backgroundColor: '#fff'
        }
    }

    return (
        <div
          id="homeContent"
          style={{
            marginTop: "30px",
            border: "1px solid #1890ff",
            borderRadius: "10px",
            height: "280px",
            maxHeight: "280px",
            overflow: "hidden",
            width: "100%",
            boxSizing: "border box",
            padding: "0px",
            backgroundColor: "#1890ff"
          }}
        >
          <h3
            style={{
              textAlign: "left",
              padding: "8px",
              marginBottom: "3px",
              color: "#fff",
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
            <div className="inner" style={{backgroundColor: component? "#1890ff" : "#fff"}}>
                {component}
            </div>
          </div>
        </div>
    )
}