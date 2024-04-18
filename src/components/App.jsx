import React, { Suspense, Fragment, lazy } from 'react'

import useStyle from '../utils/useStyle'
import defaultClasses from './app.module.css'
import Header from './header'

const Footer = lazy(() => import('./footer'))

const App = ({ children, isMasked, classes: propsClasses }) => {
    const classes = useStyle(defaultClasses, propsClasses)

    return (
        <Fragment>
            <Header />
            <div className={defaultClasses.root}>test</div>{' '}
            <Suspense fallback={<div>Loading</div>}>
                <Footer />
            </Suspense>
        </Fragment>
    )
}

export default App
