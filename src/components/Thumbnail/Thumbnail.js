import React from 'react';
import './Thumbnail.css';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const editBoardTitle = (event) => {
    event.preventDefault();
}

const deleteBoard = (event) => {
    event.preventDefault();
}

const Thumbnail = ({title}) => {
    return (
        <div className={'thumbnail-container'}>
            <h4 className={'thumbnail-title'}>{title}</h4>
            <div className={'thumbnail-button-container'}>
                <EditIcon className={'edit-board-button'} onClick={editBoardTitle}/>
                <DeleteIcon className={'delete-board-button'} onClick={deleteBoard}/>
            </div>
        </div>
    );
};

export default Thumbnail;
