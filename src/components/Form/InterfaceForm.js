import React from 'react';
import Card from '@material-ui/core/Card';
import {TextareaAutosize} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {connect} from 'react-redux';
import './InterfaceForm.css';

const InterfaceForm = ({list, text = '', onChange, closeForm, children}) => {
    const itemPlaceholder = list ? 'Enter list title...' : 'Enter a title for this card...';

    const handleFocus = e => {
        e.target.select();
    };

    return (
        <div className={'form-container'}>
            <Card className={'text-area-container'}>
                <TextareaAutosize
                    className={'interface-text-field'}
                    placeholder={itemPlaceholder}
                    autoFocus
                    onFocus={handleFocus}
                    value={text}
                    onBlur={closeForm}
                    onChange={(event) => onChange(event.target.value)}
                />
            </Card>
            <div className={'interface-button-container'}>
                {children}
                <CloseIcon className={'close-button'} onMouseDown={closeForm}/>
            </div>
        </div>
    );
}

export default connect()(InterfaceForm);
