import uuid  from 'uuid';
const initialState = {
    items: [
        { id: uuid(), name: 'Eggs' },
        { id: uuid(), name: 'Milk' },
        { id: uuid(), name: 'Meat' },
        { id: uuid(), name: 'Breads' },
    ],
};

const itemReducer = (state = initialState, action) => {
    const { type } = action;
    switch(type){
        case 'GET_ITEMS':
            return {...state};

        // case 'ADD_ITEM':
        //     console.log('in reducer',type,payload);
        //     return state;

        // case 'DELETE_ITEM':
        //     console.log('in reducer',type,payload);
        //     return state;
        default:
            return {...state};
    }
};

export default itemReducer;