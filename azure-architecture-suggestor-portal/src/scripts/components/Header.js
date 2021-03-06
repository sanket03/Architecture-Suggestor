import React from 'react';
import '../../styles/Header.scss';

const Header = () =>  {
    return (
        <div id = 'header'>
        <div className = 'custom-row'>
            <h2>Azure solution architectures</h2>
            <p>Architectures to help you design and implement secure, highly-available, performant and resilient solutions on Azure. </p>
        </div>
        </div>
    );
}

export default Header;
