import React from 'react';
import './InterfaceButton.css';
import {Button} from '@material-ui/core';

const InterfaceButton = ({children, onClick}) => {
    return (
        <>
            <Button className={'interface-button'} variant='contained' onMouseDown={onClick}>
                {children}
            </Button>
        </>
    );
}

export default InterfaceButton;
