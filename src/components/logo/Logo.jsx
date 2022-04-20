import * as styles from './logo.styles'

import { Link } from 'react-router-dom'
import React from 'react'
import logo from './logo.svg'

export const Logo = () => {

    return (
        <div style={styles.outerBox}>
            <Link to="/" style={styles.link}>
                <img src={logo} className="App-logo" alt="logo" style={styles.logoImage}/>
                <h4 style={styles.logoTitle}>TaskSprinter</h4>
            </Link> 
        </div>
    )
}