import React from 'react'

import useStyle from '../../utils/useStyle'
import defaultClasses from './header.module.css'

const Header = ({ children, isMasked, classes: propsClasses }) => {
    const classes = useStyle(defaultClasses, propsClasses)

    return (
        <div className={classes.root}>
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

export default Header
