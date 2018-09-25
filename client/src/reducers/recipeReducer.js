
const recipeReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: payload,
            };

        case 'ADD_RECIPE':
            return {
                ...state,
                recipes: state.recipes ? [...state.recipes, payload] : []
            };

        case 'DELETE_RECIPE':
            return {
                ...state,
                recipes: state.recipes.filter(recipes => recipes._id !== payload)
            };
       
        default:
            return { ...state };
    }
};

export default recipeReducer;