import React from 'react';
import { Card } from 'antd';
import banner from '../std-banner.svg';


export default function StandUpComp() {

    const styles = {
        container: {
            marginTop: '0px',
            marginBottom: '0px',
            background: "#f0f2f5",
            height: '180px',
            backgroundImage: `url(${banner})`,
            backgroundSize: 'center center',
            padding: '0px'
            // border: '1px solid red'
        },
        innerCard: {
            // paddingLeft: '10px',
            // paddingRight: '10px',
            paddingTop: '20px',
            display: 'flex',
            width: '90%',
            // marginLeft: 'auto',
            // marginRight: 'auto',
            margin: 'auto',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundImage: `url(${banner})`,
            backgroundSize: 'center center'
        }

    }
    return (
        <div style={styles.container}>

            <div style={styles.innerCard} className="site-card-border-less-wrapper">
                <Card title="Stand Up" bordered={true} style={{ width: 400, minHeight: 200, textAlign: 'left', backgroundColor: '#feff9c' }}>
                <p>Card content</p>
                <p>Card content</p>
                </Card>

                <Card title="Stand Down" bordered={true} style={{ width: 400, minHeight: 200, textAlign: 'left', backgroundColor: '#feff9c' }}>
                <p>Card content</p>
                <p>Card content</p>
                </Card>
            </div>
            {/* <Button type="primary"><Link to="/stand_up">Stand Up</Link></Button> */}

        </div>
    )
}