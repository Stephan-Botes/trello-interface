import React, {useCallback, useState} from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import './InterfaceButton.css';
import {Button, Card, Icon, TextareaAutosize} from '@material-ui/core';
import {connect} from 'react-redux';
import {addList} from '../../actions/listActions';
import {addCard} from '../../actions/cardActions';

const InterfaceButton = ({children, onClick}) => {
    // const [addForm, setAddForm] = useState(false);
    // const [textfield, setTextfield] = useState('');
    // const {list} = props;
    // const buttonItem = list ? 'list' : 'card';
    // const buttonClass = list ? 'list-button' : 'card-button';
    // const itemPlaceholder = list ? 'Enter list title' : 'Enter card title';
    //
    // const handleAddList = () => {
    //     const {dispatch} = props;
    //     if (textfield)
    //         dispatch(addList(textfield));
    //     return;
    // }
    //
    // const handleAddCard = () => {
    //     const {dispatch, listId} = props;
    //     if (textfield)
    //         dispatch(addCard(listId, textfield));
    //     return;
    // }

    return (
        <>
            <Button className={'interface-button'} variant="contained" onMouseDown={onClick}>
                {children}
            </Button>
        </>
    );
}

export default InterfaceButton;
