import React from 'react'

import useStyle from '../../utils/useStyle'
import defaultClasses from './footer.module.css'

const Footer = ({ children, isMasked, classes: propsClasses }) => {
    const classes = useStyle(defaultClasses, propsClasses)

    return (
        <div className={classes.root}>
            <div>
                <h1>Footer</h1>
            </div>
            <div className={classes.nav}>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </div>
        </div>
    )
}

export default Footer
