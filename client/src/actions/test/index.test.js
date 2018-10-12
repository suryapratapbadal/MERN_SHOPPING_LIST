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
      .postOnce('/api/items', { body: JSON.stringify({name:"Oil"}), headers: { 'content-type': 'application/json' } })

    const expectedActions = [
      {payload: "", type: "LOADING"},
      { type: 'ADD_ITEM', payload: {name:'Oil'} }
    ]
    const store = mockStore({ items:[], loading: false })

    return store.dispatch(actions.addItem({name: 'Oil'})).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('creates GET_ITEMS when item retrieved', () => {
    fetchMock
      .getOnce('/api/items', { body: {items:[{id: 1,name: 'milk'}]}, headers: { 'content-type': 'application/json' } })

    const expectedActions = [
      { type: 'GET_ITEMS', payload: {items:[{id: 1,name: 'milk'}]} }
    ]
    const store = mockStore({ items:[{id: 1,name: 'milk'}], loading: false })

    return store.dispatch(actions.getItems()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('creates ADD_RECIPE when new item added', () => {
    fetchMock
      .postOnce('/api/recipes', { body: JSON.stringify({name:"Oil"}), headers: { 'content-type': 'application/json' } })

    const expectedActions = [
      {payload: "", type: "LOADING"},
      { type: 'ADD_RECIPE', payload: {name:'Oil'} }
    ]
    const store = mockStore({ recipes:[], loading: false })

    return store.dispatch(actions.addRecipe({name: 'Oil'})).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('creates GET_RECIPES when item retrieved', () => {
    fetchMock
      .getOnce('/api/recipes/1', { body: {recipes:[{id: 1,name: 'Tea'}]}, headers: { 'content-type': 'application/json' } })

    const expectedActions = [
      { type: 'GET_RECIPES', payload: {recipes:[{id: 1,name: 'Tea'}]} }
    ]
    const store = mockStore({ recipes:[{id: 1,name: 'Tea'}], loading: false })

    return store.dispatch(actions.getRecipes(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })


  
})
