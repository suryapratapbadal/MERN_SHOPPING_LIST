import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../index';
import "isomorphic-fetch";
import fetchMock from 'fetch-mock';
import expect from 'expect'; // You can use any testing library

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {

  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('creates ADD_ITEM when new item added', () => {
    fetchMock
      .postOnce('/api/items', { body: JSON.stringify({ name: "Oil" }), headers: { 'content-type': 'application/json' } })

    const expectedActions = [
      { payload: "", type: "LOADING" },
      { type: 'ADD_ITEM', payload: { name: 'Oil' } }
    ]
    const store = mockStore({ items: [], loading: false })

    return store.dispatch(actions.addItem({ name: 'Oil' })).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('creates GET_ITEMS when item retrieved', () => {
    fetchMock
      .getOnce('/api/items', { body: { items: [{ id: 1, name: 'milk' }] }, headers: { 'content-type': 'application/json' } })

    const expectedActions = [
      { type: 'GET_ITEMS', payload: { items: [{ id: 1, name: 'milk' }] } }
    ]
    const store = mockStore({ items: [{ id: 1, name: 'milk' }], loading: false })

    return store.dispatch(actions.getItems()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  // it('creates UPDATE_ITEM when new item added', () => {
  //   fetchMock
  //     .postOnce('/api/recipes', { body: JSON.stringify({ name: "Oil" }), headers: { 'content-type': 'application/json' } })

  //   const expectedActions = [
  //     { payload: "", type: "LOADING" },
  //     { type: 'ADD_RECIPE', payload: { name: 'Oil' } }
  //   ]
  //   const store = mockStore({ recipes: [], loading: false })

  //   return store.dispatch(actions.addRecipe({ name: 'Oil' })).then(() => {
  //     expect(store.getActions()).toEqual(expectedActions)
  //   })
  // })




})

describe('LogOutfy user actions', () => {
  it('should logout user', () => {
    const expectedAction = {
      type: 'LOG_OUT_USER',
      payload: ''
    }
    expect(actions.logOutUser()).toEqual(expectedAction)
  })
})

describe('Verify user actions', () => {
  it('should Verify user', () => {
    const expectedAction = {
      type: 'VERIFY_USER',
        payload: ''
    }
    expect(actions.verifyUser()).toEqual(expectedAction)
  })
})
