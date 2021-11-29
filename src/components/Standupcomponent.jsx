import React from 'react';
import { Card } from 'antd';
import {Link} from "react-router-dom";
import {Button} from 'antd';

export default function StandUpComp() {

    const styles = {
        container: {
            marginTop: '0px',
            marginBottom: '0px',
            background: "#f0f2f5",
            height: '180px',
        },
        innerCard: {
            paddingLeft: '10px',
            paddingRight: '10px',
            paddingTop: '20px',
            display: 'flex',
            width: '90%',
            margin: 'auto',
            justifyContent: 'space-around',
            alignItems: 'center'
        }

    }
    return (
        <div style={styles.container}>

            <div style={styles.innerCard} className="site-card-border-less-wrapper">
                <Card title="Stand Up" bordered={false} style={{ width: 400, minHeight: 250, textAlign: 'left' }}>
                <p>Card content</p>
                <p>Card content</p>
                </Card>

                <Card title="Stand Down" bordered={false} style={{ width: 400, minHeight: 250, textAlign: 'left' }}>
                <p>Card content</p>
                <p>Card content</p>
                </Card>
            </div>
            {/* <Button type="primary"><Link to="/stand_up">Stand Up</Link></Button> */}

        </div>
    )
}