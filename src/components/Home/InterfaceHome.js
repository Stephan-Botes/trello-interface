import './InterfaceHome.css';
import {connect} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Thumbnail from '../Thumbnail/Thumbnail';
import {Button, TextField} from '@material-ui/core';
import {
    addBoardAction,
    deleteBoardAction,
    editBoardAction,
    requestBoardsAction,
    setActiveBoardAction
} from '../../actions/boardActions';

const mapStateToProps = (state) => {
    return {
        isPending: state.boardReducer.isPending,
        boards: state.boardReducer.boards,
        error: state.boardReducer.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRequestBoards: () => dispatch(requestBoardsAction()),
        onAddBoard: (boardName) => dispatch(addBoardAction(boardName)),
        onDeleteBoard: (boardID) => dispatch(deleteBoardAction(boardID)),
        onEditBoard: (boardID, newBoardName) => dispatch(editBoardAction(boardID, newBoardName)),
        onSetActiveBoard: (boardID) => dispatch(setActiveBoardAction(boardID))
    }
}

const InterfaceHome = (props) => {
    const [boardName, setBoardName] = useState('');
    const {isPending, boards} = props;

    useEffect(() => {
        props.onRequestBoards();
    }, [])

    const handleChange = (event) => {
        setBoardName(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onAddBoard(boardName);
    }

    const setActiveBoard = (boardID) => {
        props.onSetActiveBoard(boardID);
    }

    const renderBoards = () => {
        return boards.map((board, index) => {
            return (
                <>
                    <Link
                        key={index}
                        to={`/${board.id}`}
                        style={{textDecoration: 'none'}}
                        onClick={() => setActiveBoard(board.id)}
                    >
                        <Thumbnail
                            id={board.id}
                            title={board.name}
                            deleteBoard={props.onDeleteBoard}
                            editBoard={props.onEditBoard}
                        />
                    </Link>
                </>
            );
        });
    }

    // Renders a form to allow creation of new boards
    const renderCreateBoard = () => {
        return (
            <form className={'create-board-form'} onSubmit={handleSubmit}>
                <h3>Create a new Board</h3>
                <TextField
                    style={{color: 'green'}}
                    onChange={handleChange}
                    value={boardName}
                    placeholder='Your board title...'
                    type='text'/>
                <Button variant='contained' className={'create-board-submit-button'} type='submit'>Submit</Button>
            </form>
        );
    }

    return (
        <>
            {isPending ?
                <div className={'home-container'}>
                    <img className={'loading-icon'} src={'https://c.tenor.com/hQz0Kl373E8AAAAi/loading-waiting.gif'}/>
                </div> :
                <>
                    <div className={'home-container'}>
                        {renderCreateBoard()}
                        <div className={'board-thumbnails-container'}>
                            {renderBoards()}
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(InterfaceHome);
