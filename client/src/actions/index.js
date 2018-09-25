/////Items Actions/////

export const getItems = () => {
    return async (dispatch, getState) => {
        // dispatch(loading());
        return fetch('/api/items', {
            method: 'GET',
            mode: 'cors',
        }).then(data => data.json()).then((dataJson) => {
            dispatch({
                type: 'GET_ITEMS',
                payload: dataJson
            });

        })


    }
};

export const addItem = item => {
    return async (dispatch, getState) => {
        return fetch('/api/items', {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
        }).then(data => data.json()).then((dataJson) => {
            dispatch({
                type: 'ADD_ITEM',
                payload: dataJson
            });

        })


    }
};

export const deleteItem = id => {
    return async (dispatch, getState) => {
        return fetch('/api/items/' + id, {
            method: 'DELETE',
            mode: 'cors',
        }).then(data => data.json()).then((dataJson) => {
            dispatch({
                type: 'DELETE_ITEM',
                payload: id
            });

        })


    }
};

export const updateItem = (id, updateData) => {
    return async (dispatch, getState) => {
        return fetch('/api/items/' + id, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData),
        }).then(data => data.json()).then((dataJson) => {
            dispatch({
                type: 'UPDATE_ITEM',
                payload: dataJson
            });

        }).catch(err => console.log(err));


    }
};
//////Items Action End////////


//////Recipe Actions////////


export const getRecipes = item_id => {
    return async (dispatch, getState) => {
        // dispatch(loading());
        return fetch('/api/recipes/' + item_id, {
            method: 'GET',
            mode: 'cors',
        }).then(data => data.json()).then((dataJson) => {
            dispatch({
                type: 'GET_RECIPES',
                payload: dataJson
            });

        })


    }
};

export const addRecipe = recipe => {
    return async (dispatch, getState) => {
        return fetch('/api/recipes', {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recipe),
        }).then(data => data.json()).then((dataJson) => {
            dispatch({
                type: 'ADD_RECIPE',
                payload: dataJson
            });

        })


    }
};

export const deleteRecipe = id => {
    return async (dispatch, getState) => {
        return fetch('/api/recipes/' + id, {
            method: 'DELETE',
            mode: 'cors',
        }).then(data => data.json()).then((dataJson) => {
            dispatch({
                type: 'DELETE_RECIPE',
                payload: id
            });

        })


    }
};

//////Recipe Actions End///////////


export const verifyUser = () => {
    console.log('action Creators call')
    return {
        type: 'VERIFY_USER',
        payload: ''
    };
};

