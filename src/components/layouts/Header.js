import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Header.css';

export default function Header() {

    return (
        <header id='headerstyle'>
            <h1>PET</h1>
            <p id='headbtn'>
                <Link id='profilebtn' to='/profile'>profile</Link>
                <Link id='viewbtn' to='/viewreviews'>View Reviews</Link>
                <Link id='writebtn' to='/'>Wrtie/Request Reviews</Link>
                <Link id='logbtn' to='/'>Log Out</Link>
            </p>
        </header>
    )
}


