import itemReducer from './itemReducer';


describe('select_reducer', () => {
    describe('INITIAL_STATE', () => {
        test('is correct', () => {
          const action = { type: 'dummy_action' };
          const initialState = { items: [], loading: false};
      
          expect(itemReducer(undefined, action)).toEqual(initialState);
          expect(itemReducer(undefined, action)).toMatchSnapshot();
        });
      });

      describe('GET_ITEMS', () => {
        test('returns the correct state', () => {
          const action = { type: 'GET_ITEMS', payload: {items:[{id: 1, name: 'Milk'}]} };
      
          expect(itemReducer(undefined, action)).toMatchSnapshot();
        });
      });

      describe('ADD_ITEM', () => {
        test('returns the correct state', () => {
          const action = { type: 'ADD_ITEM', payload: {items:[{id: 1, name: 'Milk'}]} };
      
          expect(itemReducer(undefined, action)).toMatchSnapshot();
        });
      });

      describe('DELETE_ITEM', () => {
        test('returns the correct state', () => {
          const action = { type: 'DELETE_ITEM', payload: 1};
      
          expect(itemReducer(undefined, action)).toMatchSnapshot();
        });
      });
  });

