import React, {useEffect} from 'react';
import './InterfaceBoard.css';
import Header from '../Header/Header';
import {connect} from 'react-redux';
import InterfaceList from '../List/InterfaceList';
import {requestListsAction, sort, updateListsOrder} from '../../actions/listActions';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import CreateSlot from '../CreateSlot/CreateSlot';
import {useParams} from 'react-router-dom';

const mapStateToProps = (state) => {
    return {
        activeBoardName: state.boardReducer.activeBoardName,
        lists: state.listReducer.lists,
        isPending: state.listReducer.isPending
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRequestLists: (boardID) => dispatch(requestListsAction(boardID)),
        onDragAndDrop: (sourceID, destinationID, sourceIndex, destinationIndex, draggedID, type) => dispatch(sort(sourceID, destinationID, sourceIndex, destinationIndex, draggedID, type)),
        onListOrderChange: (newLists) => dispatch(updateListsOrder(newLists))
    }
}

const InterfaceBoard = (props) => {
    const {lists} = props;
    const {boardID} = useParams();

    // Function used to load lists of the board on component mount
    useEffect(() => {
        props.onRequestLists(boardID);
    }, [])

    // Function used to update Trello list order
    useEffect(() => {
        props.onListOrderChange(lists);
    }, [lists])

    // Function used to persist the dragged order of the components with react-dnd
    const onDragEnd = (result) => {
        const {destination, source, draggableId, type} = result;
        if (!destination) {
            return;
        }
        props.onDragAndDrop(source.droppableId, destination.droppableId, source.index, destination.index, draggableId, type);
    }

    return (
        <div className='board-container'>
            {/*{isPending ?
            <img className={'loading-icon'} src={'https://c.tenor.com/hQz0Kl373E8AAAAi/loading-waiting.gif'}/> :
            }*/}
            <DragDropContext onDragEnd={onDragEnd}>
                <div>
                    <Header title={props.activeBoardName}/>
                    <Droppable droppableId='all-lists' direction='horizontal' type='list'>
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}
                                 className='list-container'>
                                {lists.map((list, index) =>
                                    <InterfaceList key={list.id}
                                                   listId={list.id}
                                                   index={index}
                                                   title={list.title}
                                                   cards={list.cards}/>
                                )}
                                <CreateSlot list></CreateSlot>
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(InterfaceBoard);
