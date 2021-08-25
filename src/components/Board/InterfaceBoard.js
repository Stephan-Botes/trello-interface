import './InterfaceBoard.css';
import Header from '../Header/Header';
import {connect} from 'react-redux';
import InterfaceList from '../List/InterfaceList';
import InterfaceButton from '../Button/InterfaceButton';
import {addList, sort} from '../../actions/listActions';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import InterfaceFormButton from "../OpenForm/InterfaceFormButton";
import CreateSlot from '../CreateSlot/CreateSlot';

const mapStateToProps = (state) => {
    return {
        lists: state.listReducer
    }
}

const InterfaceBoard = (props) => {
    const {lists, onAddList} = props;

    // Function used to persist the dragged order of the components
    const onDragEnd = (result) => {
        const {destination, source, draggableId, type} = result;
        if (!destination)
            return;
        props.dispatch(sort(source.droppableId, destination.droppableId, source.index, destination.index, draggableId, type));
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="App">
                <Header/>
                <Droppable droppableId='all-lists' direction='horizontal' type='list'>
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className='list-container'>
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
    );
}

export default connect(mapStateToProps)(InterfaceBoard);
