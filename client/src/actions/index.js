export const getItems = () => {
    return async (dispatch, getState) => {
        fetch('/api/items', {
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
        fetch('/api/items', {
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
        fetch('/api/items/' + id, {
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



// export const setItemsLoading = () => {
//     return {
//         type: 'ITEMS_LOADING',
//         payload: ''
//     };
// };

