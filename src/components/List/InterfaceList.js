import React from 'react';
import './InterfaceList.css';
import InterfaceCard from '../Card/InterfaceCard';
import {Draggable, Droppable} from 'react-beautiful-dnd';
import CreateSlot from '../CreateSlot/CreateSlot';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const InterfaceList = ({listId, index, title, cards}) => {
    return (
        <Draggable draggableId={String(listId)} index={index}>
            {(provided) => (
                <div {...provided.draggableProps}
                     {...provided.dragHandleProps}
                     ref={provided.innerRef}
                     className='container'
                >
                    <Droppable droppableId={String(listId)}>
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                <div className={'list-header'}>
                                    <h4>{title}</h4>
                                        <EditIcon className={'list-edit-button'}/>
                                        <DeleteIcon className={'list-delete-button'}/>
                                </div>

                                {cards.map((card, index) => (
                                    <InterfaceCard key={card.id} id={card.id} index={index} text={card.text}/>
                                ))}
                                {provided.placeholder}
                                <CreateSlot listId={listId}/>
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );
}

export default InterfaceList;
