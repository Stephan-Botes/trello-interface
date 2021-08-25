import React, {useState} from "react";
import InterfaceButton from '../Button/InterfaceButton';
import {connect} from "react-redux";
import {addList} from '../../actions/listActions';
import {addCard} from '../../actions/cardActions';
import InterfaceForm from '../Form/InterfaceForm';
import InterfaceFormButton from '../OpenForm/InterfaceFormButton';

const CreateSlot = (props) => {
    const [formOpen, setFormOpen] = useState(false);
    const [text, setText] = useState('');
    const {list} = props;

    const openForm = () => {
        setFormOpen(true);
    }

    const closeForm = () => {
        setFormOpen(false);
    }

    const handleInputChange = (text) => {
        setText(text);
    }

    const handleAddList = () => {
        const {dispatch} = props;
        if (text) {
            dispatch(addList(text));
        }
        return;
    }

    const handleAddCard = () => {
        const {dispatch, listId} = props;
        if (text) {
            dispatch(addCard(listId, text));
        }
        return;
    }

    return formOpen ? (
        <InterfaceForm
            text={text}
            onChange={handleInputChange}
            closeForm={closeForm}
        >
            <InterfaceButton onClick={list ? handleAddList : handleAddCard}>
                {list ? "Add List" : "Add Card"}
            </InterfaceButton>
        </InterfaceForm>
    ) : (
        <InterfaceFormButton list={list} onClick={openForm}>
            {list ? "Add another list" : "Add another card"}
        </InterfaceFormButton>
    );
}

export default connect()(CreateSlot);
