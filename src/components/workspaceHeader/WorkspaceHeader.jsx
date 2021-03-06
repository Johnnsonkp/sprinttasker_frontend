import Avatar from "antd/lib/avatar/avatar"
import TimerContainer from "../TimerContainer"

export const WorkSpaceHeader = (props) => {
    return (
        <div id="menu-banner" className="trackList ">
          <div className="dummy-side-panel"></div>
          <div className="tasklist">
            <div className="rest-title workspace-textfield">
            { props.title?
                props.title
                :
                <>
                    <div style={{fontSize: '25px', display: 'flex', alignItems: 'center'}}>
                        <Avatar
                            style={{
                                backgroundColor: "#f56a00",
                                verticalAlign: "middle",
                                marginLeft: "15px",
                                marginRight: "15px",
                                position: 'relative',
                                display: 'block'
                            }}
                            size={45}
                            gap={0}
                            >
                            {props.userFirstInitials}
                        </Avatar>
                        {props.welcomeTitle}, {props.User}
                    
                    </div>
                </>
            }
            </div>
            {/* <div style={{ position: "relative", top:'-20px',  left: "75%", alignItems: 'center' }}> */}
            {/* <div style={{ position: "absolute", top:'120px',  left: "75%" }}>
              <TimerContainer />
            </div> */}
            <div style={{ position: "fixed", top:'53px', left: "77%", zIndex: '9000' }}>
              <TimerContainer />
            </div>
          </div>
        </div>
    )
}