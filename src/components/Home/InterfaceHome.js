import './InterfaceHome.css';
import {connect} from 'react-redux';
import React, {useEffect} from 'react';
import {requestBoardsAction} from '../../actions/boardActions';
import InterfaceCard from '../Card/InterfaceCard';
import {Link} from 'react-router-dom';
import Thumbnail from "../Thumbnail/Thumbnail";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const mapStateToProps = (state) => {
    return {
        isPending: state.boardReducer.isPending,
        boards: state.boardReducer.boards,
        error: state.boardReducer.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRequestBoards: () => dispatch(requestBoardsAction())
    }
}

const InterfaceHome = (props) => {
    useEffect(() => {
        props.onRequestBoards();
    }, [])

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
            // <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
            //     <CreateTitle>Create a new Board</CreateTitle>
            //     <CreateInput
            //         onChange={handleChange}
            //         value={newBoardTitle}
            //         placeholder="Your boards title..."
            //         type="text"
            //     />
            // </form>
            <p>Create new board here</p>
        );
    };

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
