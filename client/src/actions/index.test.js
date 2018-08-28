// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk'

// // Actions to be tested
import * as selectActions from './index';

// const middlewares = [thunk]
// const mockStore = configureMockStore(middlewares)
// // const mockStore = configureStore();

// // const mockServiceCreator = (body, succeeds = true) => () =>
// //     new Promise((resolve, reject) => {
// //         setTimeout(() => (succeeds ? resolve(body) : reject(body)), 10);
// //     });



// describe('select_actions', () => {
// beforeEach(() => { // Runs before each test in the suite
//     store.clearActions();   
            
// });

//     describe('Get Items', () => {
//         test('Dispatches the correct action and payload', () => {
//             const expectedActions = [
               
//             ];

//             store.dispatch(selectActions.getItems);
//             expect(store.getActions()).toEqual(expectedActions);
//         });
//     });

//     describe('Get Items', () => {
//         test('Dispatches the correct action and payload', () => {
//             const expectedActions = [
               
//             ];

//             store.dispatch(selectActions.addItem({ name: 'Oil'}));
//             expect(store.getActions()).toEqual(expectedActions);
//         });
//     });

// });


import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
const store = mockStore({items : [{id: '1', name: 'Milk'}]});

const mockResponse = (status, statusText, response) => {
    return new window.Response(response, {
      status: status,
      statusText: statusText,
      headers: {
        'Content-type': 'application/json'
      }
    });
  };

  it('calls request and success actions if the fetch response was successful', () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, '{"items":{id: 1, name: "Milk"}}')));
  
    return store.dispatch(selectActions.getItems)
      .then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(1);
        
        expect(expectedActions).toContainEqual( [{"payload":{"items":[{id: 1, name: "Milk"}]},"type": "GET_ITEMS"}]);
      })
  });
