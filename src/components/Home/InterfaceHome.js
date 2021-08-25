import './InterfaceHome.css';
import {connect} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {addBoardTitleAction, requestBoardsAction} from '../../actions/boardActions';
import InterfaceCard from '../Card/InterfaceCard';
import {Link} from 'react-router-dom';
import Thumbnail from "../Thumbnail/Thumbnail";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {Button} from "@material-ui/core";

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
        onAddBoard: (boardName) => dispatch(addBoardTitleAction(boardName))
    }
}

const InterfaceHome = (props) => {
    const [boardName, setBoardName] = useState('');

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


    const {isPending, boards} = props;

    const renderBoards = () => {
        return boards.map((board, index) => {
            return (
                <>
                    <Link
                        key={index}
                        to={`/${board.shortLink}`}
                        style={{textDecoration: 'none'}}
                    >
                        <Thumbnail title={board.name}/>
                    </Link>
                </>
            );
        });
    };

    const renderCreateBoard = () => {
        return (
            <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
                <h3>Create a new Board</h3>
                <input
                    onChange={handleChange}
                    value={boardName}
                    placeholder="Your boards title..."
                    type="text"
                />
                <Button type='submit'>Submit</Button>
            </form>
        );
    }

    return (
        <>
            {isPending ?
                <p>Loading</p> :
                <>
                    <div className={'home-container'}>
                        <div className={'board-thumbnails-container'}>
                            {renderBoards()}
                        </div>
                        {renderCreateBoard()}
                    </div>
                </>
            }
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(InterfaceHome);
