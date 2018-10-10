
const initialState = {
    items: [],
    recipes: [],
    loading: false,
    user: false,
};

const itemReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'GET_ITEMS':
            return {
                ...state,
                items: payload,
            };

        case 'ADD_ITEM':
            return {
                ...state,
                items: [...state.items, payload],
                loading: false
            };

        case 'DELETE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item._id !== payload),
                loading: false
            };

        case 'UPDATE_ITEM':
            return {
                ...state,
                items:[...state.items.filter(item => item._id !== payload._id), payload],
                loading: false
            };

        case 'VERIFY_USER':
            return {
                ...state,
                user: true
            };

        case 'LOG_OUT_USER':
            return {
                ...state,
                user: false
            };

        case 'GET_RECIPES':
            return {
                ...state,
                recipes: payload,
            };

        case 'ADD_RECIPE':
            return {
                ...state,
                recipes: state.recipes ? [...state.recipes, payload] : [],
                loading: false
            };

        case 'DELETE_RECIPE':
            return {
                ...state,
                recipes: state.recipes.filter(recipes => recipes._id !== payload),
                loading: false
            };

        case 'LOADING':
            return {
                ...state,
                loading: true,
            };

        default:
            return { ...state };
    }
};

export default itemReducer;