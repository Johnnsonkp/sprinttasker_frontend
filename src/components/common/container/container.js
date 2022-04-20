export const PrimaryContainer = (props) => {
  return (
    <div
      style={{
        paddingLeft: "100px",
        paddingRight: "0px",
        maxWidth: "1500px",
        width: "100%",
        margin: "auto",
        transition: "all 5s easeInOut",
      }}
    >
      <div className="trackList">
        <div className="dummy-side-panel"></div>
        <div className="tasklist" style={props.style}>
          {props.component ? (
            props.component
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                // border: "1px solid red",
              }}
            >
              <div
                style={{
                  //   border: "1px solid red",
                  width: "49%",
                }}
              >
                {props.componentMulti1}
              </div>
              <div
                style={{
                  //   border: "1px solid red",
                  width: "49%",
                }}
              >
                {props.componentMulti2}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const Wrapper = (props) => {
  return (
    <div
      style={{
        marginTop: "75px",
        // transform: "scaleX(0.8)",
      }}
    >
      {props.component}
    </div>
  );
};
