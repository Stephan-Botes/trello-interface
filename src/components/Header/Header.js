import React from 'react';

const Header = ({title}) => {
    return (
        <div className={'row'}>
            <p className={'page-header'}>{title}</p>
        </div>
    );
};

export default Header;
