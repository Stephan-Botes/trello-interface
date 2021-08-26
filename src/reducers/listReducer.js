import {
    ADD_CARD,
    ADD_LIST,
    DRAG_OCCURRED,
    REQUEST_LISTS_FAILED,
    REQUEST_LISTS_PENDING,
    REQUEST_LISTS_SUCCESS
} from '../constants';

// Temporary ID placeholder
let listId = 2;
let cardId = 5;

// Initial state used by the list reducer, dummy data still present to test final API calls
const initialState = {
    lists: [
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
    ],
    isPending: false,
    error: '',
    activeBoardName: ''
}

// Redux reducer - Handles all list related actions and updates the store state according to their types
export const listReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case REQUEST_LISTS_PENDING:
            return Object.assign({}, state, {isPending: true});
        case REQUEST_LISTS_SUCCESS:
            return Object.assign({}, state, {
                lists: action.payload.lists,
                activeBoardName: action.payload.activeBoardName,
                isPending: false
            });
        case REQUEST_LISTS_FAILED:
            return Object.assign({}, state, {error: action.payload, isPending: false});

        case ADD_LIST: {
            const newList = {
                title: action.payload,
                id: `list - ${listId}`,
                cards: []
            }
            listId++
            return Object.assign({}, state, {lists: [...state.lists, newList]});
        }

        case ADD_CARD: {
            const newCard = {
                text: action.payload.text,
                id: `card - ${cardId}`
            }
            cardId++;
            const newList = state.lists.map(list => {
                if (list.id === action.payload.listId) {
                    return {
                        ...list,
                        cards: [...list.cards, newCard]
                    }
                } else {
                    return list;
                }
            });
            return Object.assign({}, state, {lists: newList});
        }

        case DRAG_OCCURRED: {
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                draggableId,
                type
            } = action.payload;
            const newState = state;

            // Condition for dropping lists
            if (type === 'list') {
                const list = newState.lists.splice(droppableIndexStart, 1);
                newState.lists.splice(droppableIndexEnd, 0, ...list);
                return Object.assign({}, state, {lists: [...newState.lists]});
            }

            // Condition for dropping cards in the same list
            if (droppableIdStart === droppableIdEnd) {
                const list = state.lists.find(list => droppableIdStart === list.id);
                const card = list.cards.splice(droppableIndexStart, 1);
                list.cards.splice(droppableIndexEnd, 0, ...card);
            }

            // Condition for dropping cards in another list
            if (droppableIdStart !== droppableIdEnd) {
                const listStart = state.lists.find(list => droppableIdStart === list.id);
                const card = listStart.cards.splice(droppableIndexStart, 1);
                const listEnd = state.lists.find(list => droppableIdEnd === list.id);
                listEnd.cards.splice(droppableIndexEnd, 0, ...card);
            }

            return newState;
        }

        default:
            return state;
    }
}
