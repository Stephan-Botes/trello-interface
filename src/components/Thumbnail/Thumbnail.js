import React, {useState} from 'react';
import './Thumbnail.css';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {connect} from 'react-redux';
import {editBoardAction} from "../../actions/boardActions";
import Card from "@material-ui/core/Card";
import {Button, TextareaAutosize} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

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
                <input
                    className={'board-edit-input'}
                    type="text"
                    value={boardTitle}
                    onChange={handleChange}
                    autoFocus
                    onFocus={handleFocus}
                    onBlur={handleFinishEditing}
                />
                <div className={'interface-button-container'}>
                    <Button type='submit'>Edit</Button>
                    <CloseIcon onMouseDown={closeForm}/>
                </div>
            </form>
        );
    }

    const renderBoard = () => {
        return (
            <>
                <h4 className={'thumbnail-title'}>{title}</h4>
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
