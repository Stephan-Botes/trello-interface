import React, {useState} from 'react';
import {Button, Card, CardActions, CardContent, Typography} from '@material-ui/core';
import './InterfaceCard.css';
import {Draggable} from 'react-beautiful-dnd';
import InterfaceButton from '../Button/InterfaceButton';
import InterfaceForm from '../Form/InterfaceForm';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from 'react-redux';

const InterfaceCard = ({id, index, text, listID, dispatch}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [cardText, setCardText] = useState(text);

    const handleTextChange = (text) => {
        setCardText(text);
    }

    const saveCard = (event) => {
        event.preventDefault();
        // dispatch(editCard(id, listID, cardText));
        setIsEditing(false);
    }

    const closeForm = e => {
        setIsEditing(false);
    }

    const deleteCard = e => {
        // console.log(listID);
        // dispatch(deleteCard(id, listID));
        console.log(`Handle delete`);
    }

    const renderEditForm = () => {
        return (
            <InterfaceForm text={cardText} onChange={handleTextChange} closeForm={closeForm}>
                <InterfaceButton onClick={saveCard}>Save</InterfaceButton>
            </InterfaceForm>
        );
    }

    const renderCard = () => {
        return (
            <Draggable draggableId={String(id)} index={index}>
                {(provided) => (
                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                         className='card-container'>
                        <Card>
                            <EditIcon className={'edit-button'} onClick={() => setIsEditing(true)}/>
                            <DeleteIcon className={'delete-button'} onClick={deleteCard}/>
                            <CardContent>
                                <Typography>{text}</Typography>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </Draggable>
        );
    }

    return isEditing ? renderEditForm() : renderCard();
}

export default connect()(InterfaceCard);
