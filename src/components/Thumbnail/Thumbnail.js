import React, {useState} from 'react';
import './Thumbnail.css';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {connect} from 'react-redux';
import {Button, TextField} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const Thumbnail = (props) => {
    const {id, title, deleteBoard, editBoard} = props;
    const [isEditing, setIsEditing] = useState(false);
    const [boardTitle, setBoardTitle] = useState(title);

    const onDeleteBoard = (event) => {
        event.preventDefault();
        deleteBoard(id);
    }

    const onEditBoard = (event) => {
        event.preventDefault();
        setIsEditing(true);
    }

    const handleFocus = (event) => {
        event.target.select();
    }

    const handleChange = (event) => {
        event.preventDefault();
        setBoardTitle(event.target.value);
    }

    const handleFinishEditing = (event) => {
        event.preventDefault();
        setIsEditing(false);
        editBoard(id, boardTitle);
    }

     const closeForm = () => {
        setIsEditing(false);
     }

    const renderEditInput = () => {
        return (
            <form onSubmit={handleFinishEditing}>
                <TextField
                    className={'board-edit-input'}
                    type='text'
                    value={boardTitle}
                    onChange={handleChange}
                    autoFocus
                    onFocus={handleFocus}
                    onBlur={handleFinishEditing}
                />
                <div className={'interface-button-container'}>
                    {/*<Button type='submit'>Edit</Button>*/}
                    <Button variant='contained' className={'edit-board-submit-button'} type='submit'>Submit</Button>
                    <CloseIcon className={'edit-board-close-button'} onMouseDown={closeForm}/>
                </div>
            </form>
        );
    }

    const renderBoard = () => {
        return (
            <>
                <h4 className={'thumbnail-title'}>
                    {title.length < 70 ? title : `${title.substr(0,70)}...`}
                </h4>
                <div className={'thumbnail-button-container'}>
                    <EditIcon className={'edit-board-button'} onClick={onEditBoard}/>
                    <DeleteIcon className={'delete-board-button'} onClick={onDeleteBoard}/>
                </div>
            </>
        );
    }

    return (
        <div className={'thumbnail-container'}>
            {isEditing ? renderEditInput(): renderBoard()}
        </div>
    );
}

export default connect()(Thumbnail);
