/////Items Actions/////

export const getItems = () => {
    return async (dispatch, getState) => {

        return fetch('/api/items', {
            method: 'GET',
            mode: 'cors',
        }).then(data => data.json()).then((dataJson) => {
            
            dispatch({
                type: 'GET_ITEMS',
                payload: dataJson
            });

        }).catch(err=> console.log(err));


    }
};

export const addItem = item => {
    return async (dispatch, getState) => {
        dispatch({
            type: 'LOADING',
            payload: ''
        });
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
        dispatch({
            type: 'LOADING',
            payload: ''
        });
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
        dispatch({
            type: 'LOADING',
            payload: ''
        });
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



export const verifyUser = () => {
    return {
        type: 'VERIFY_USER',
        payload: ''
    };
};

export const logOutUser = () => {
    console.log('action Creators call')
    return {
        type: 'LOG_OUT_USER',
        payload: ''
    };
};