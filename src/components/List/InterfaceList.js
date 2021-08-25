import React from 'react';
import './InterfaceList.css';
import InterfaceCard from '../Card/InterfaceCard';
import InterfaceButton from '../Button/InterfaceButton';
import {Draggable, Droppable} from 'react-beautiful-dnd';
import CreateSlot from "../CreateSlot/CreateSlot";
import {Create} from "@material-ui/icons";

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
                                <h4>{title}</h4>
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
