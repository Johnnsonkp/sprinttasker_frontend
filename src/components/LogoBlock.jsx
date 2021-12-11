import React from 'react' 

export const LogoBlock = (props) => {
    const styles = {
        innerIcons: {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            border: '2px solid #61dafb',
            width: '85%',
            margin: 'auto',
            borderRadius: '50px',
            backgroundColor: '#f4f4f4',
            boxShadow: '-2px 6px 10px 0 rgb(0 0 0 / 8%)', 
            maxWidth: '1200px'
        },
        landingIcon: {
            width: '120px'
        }
    }
    const Logos = [
        { Logo: props.firstLogo },
        { Logo: props.secondLogo },
        { Logo: props.thirdLogo },
        { Logo: props.fourthLogo }
    ]
    return (
        <div style={styles.innerIcons} className="inner-icons">
          {Logos.map(item => {
            return (
                <img
                    style={styles.landingIcon}
                    className="bannerLogo railsLogo landingIcon"
                    alt="Landing page logo"
                    src={item['Logo']}
                />
            )
          })}
        </div>
    )
}