import React from "react";
import Rainbow from "../rainbow.png";
import "../App.css";
import './wave.css'

export default function Wave() {

    const styles = {
        rainbow: {
          background: `url(${Rainbow})`,
          backgroundPosition: "bottom 10% right,top 25% left",
          backgroundColor: "transparent",
          backgroundSize: '20%',
        },
        box: {
          bottom: 0,
          left: 0,
          position: "absolute",
          width: "100% " 
        },
        rainbowWrap: {
          height: "100%",
          left: 0,
           position: "absolute",
            top: 0,
            width: "100%"
        },
        
    }

    return (
        <div className="rainbow-wrap" style={styles.rainbowWrap}>
        <div className="box" style={styles.box}>
          <div className="ribbon wave -one">
            <div className="ribbon wave -two" style={styles.rainbow}></div>
          </div>
        </div>
      </div>
    )

}