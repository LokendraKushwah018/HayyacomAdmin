import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'

const Container = ({ children }) => {
    return (
        <>
            <div className='wrapper'>
                <Header />
                <Sidebar />

                {children}

                <Footer />

            </div>
        </>
    )
}

export default Container

