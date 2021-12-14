import React from 'react' 

export const LogoBlock = (props) => {
    const styles = {
        innerIcons: {
            display: 'flex',
            flexDirection: props.flexDirection ? props.flexDirection : "row",
            justifyContent: props.justifyContent? props.justifyContent : 'space-around',
            flexWrap: props.flexWrap ? props.flexWrap : null,
            alignItems: 'center',
            border: props.blockBorder ? props.blockBorder : null,
            width: props.containerWidth ?  props.containerWidth: '85%',
            height: props.height ? props.height : null,
            margin: 'auto',
            borderRadius: '50px',
            backgroundColor: props.backgroundColor ? props.backgroundColor : '#f4f4f4',
            boxShadow: '-2px 6px 10px 0 rgb(0 0 0 / 8%)', 
            maxWidth: '1200px'
        },
        landingIcon: {
            width: props.iconWidth ? props.iconWidth : "120px",
            border: props.iconBorder ? props.iconBorder  : null,
        }
    }
    const Logos = [
        { Logo: props.firstLogo ? props.firstLogo : null },
        { Logo: props.secondLogo ? props.secondLogo : null },
        { Logo: props.thirdLogo ? props.thirdLogo : null },
        { Logo: props.fourthLogo ? props.fourthLogo : null }
    ]
    let i = 0;
    return (
        <div style={styles.innerIcons} className="inner-icons">
          {Logos.map((item) => {
              i++
            if(item['Logo'] !== null) {
                return (
                    <img
                        key={i}
                        style={styles.landingIcon}
                        className="bannerLogo railsLogo landingIcon"
                        alt="Landing page logo"
                        src={item['Logo']}
                    />
                )
            } 
          })}
        </div>
    )
}