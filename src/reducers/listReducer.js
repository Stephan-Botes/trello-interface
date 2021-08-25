import {ADD_CARD, ADD_LIST, DRAG_OCCURRED} from '../constants';

// Temporary ID placeholder
let listId = 2;
let cardId = 5;

const initialState = [
    {
        title: 'Todo',
        id: `list - ${0}`,
        cards: [
            {
                id: `card - ${0}`,
                text: 'The first card'
            },
            {
                id: `card - ${1}`,
                text: 'The second card'
            }
        ]
    },
    {
        title: 'In progress',
        id: `list - ${1}`,
        cards: [
            {
                id: `card - ${2}`,
                text: 'The third card'
            },
            {
                id: `card - ${3}`,
                text: 'The fourth card'
            },
            {
                id: `card - ${4}`,
                text: 'The fifth card'
            }
        ]
    }
];

export const listReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case ADD_LIST:
            const newList = {
                title: action.payload,
                id: `list - ${listId}`,
                cards: []
            }
            listId++;
            return [...state, newList];

        case ADD_CARD:
            const newCard = {
                text: action.payload.text,
                id: `card - ${cardId}`
            }
            cardId++;
            const newState = state.map(list => {
                if (list.id === action.payload.listId) {
                    return {
                        ...list,
                        cards: [...list.cards, newCard]
                    }
                } else {
                    return list;
                }
            });
            return newState;

        case DRAG_OCCURRED: {
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                draggableId,
                type
            } = action.payload;
            const newState = [...state];

            // Condition for dragging lists
            if(type === 'list') {
                const list = newState.splice(droppableIndexStart,1);
                newState.splice(droppableIndexEnd, 0, ...list);
                return newState;
            }

            // Condition for dropping cards in the same list
            if (droppableIdStart === droppableIdEnd) {
                const list = state.find(list => droppableIdStart === list.id);
                const card = list.cards.splice(droppableIndexStart, 1);
                list.cards.splice(droppableIndexEnd, 0, ...card);
            }

            // Condition for dropping cards in another list
            if (droppableIdStart !== droppableIdEnd) {
                const listStart = state.find(list => droppableIdStart === list.id);
                const card = listStart.cards.splice(droppableIndexStart, 1);
                const listEnd = state.find(list => droppableIdEnd === list.id);
                listEnd.cards.splice(droppableIndexEnd, 0, ...card);
            }

            return newState;
        }

        default:
            return state;
    }
}
