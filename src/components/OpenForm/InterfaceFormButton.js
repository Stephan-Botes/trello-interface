import React from 'react';
import './InterfaceOpenForm.css';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const InterfaceFormButton = ({ list, children, onClick }) => {
    const buttonClass = list ? 'list-button' : 'card-button';

    return (
        <div className={`open-form-button ${buttonClass}`} onClick={onClick}>
            <AddCircleOutlineIcon/>
            <p style={{ flexShrink: 0 }}>{children}</p>
        </div>
    );
};

export default InterfaceFormButton;
