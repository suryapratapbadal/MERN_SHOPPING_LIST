
const initialState = {
    items: [],
    loading: false,
    user: false,
};

const itemReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type){
        case 'GET_ITEMS':
            return {
                ...state,
                items: payload,
            };

        case 'ADD_ITEM':
            return {
                ...state,
                items: [...state.items, payload ]
            };

        case 'DELETE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item._id !== payload)
            };

        default:
            return {...state};
    }
};

export default itemReducer;