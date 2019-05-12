import itemReducer from '../itemReducer';


describe('select_reducer', () => {
  describe('INITIAL_STATE', () => {
    test('is correct', () => {
      const action = { type: 'dummy_action' };
      const initialState = { items: [], loading: false, recipes: [], user: true };

      expect(itemReducer(undefined, action)).toEqual(initialState);
      expect(itemReducer(undefined, action)).toMatchSnapshot();
    });
  });

  describe('GET_ITEMS', () => {
    test('returns the correct state', () => {
      const action = { type: 'GET_ITEMS', payload: { items: [{ id: 1, name: 'Milk' }] } };

      expect(itemReducer(undefined, action)).toMatchSnapshot();
    });
  });

  describe('ADD_ITEM', () => {
    test('returns the correct state', () => {
      const action = { type: 'ADD_ITEM', payload: { items: [{ id: 1, name: 'Milk' }] } };

      expect(itemReducer(undefined, action)).toMatchSnapshot();
    });
  });

  describe('DELETE_ITEM', () => {
    test('returns the correct state', () => {
      const action = { type: 'DELETE_ITEM', payload: 1 };

      expect(itemReducer(undefined, action)).toMatchSnapshot();
    });
  });

  describe('UPDATE_ITEM', () => {
    test('returns the correct state', () => {
      const action = { type: 'UPDATE_ITEM', payload: { items: [{ id: 1, name: 'Milk' }] }  };

      expect(itemReducer(undefined, action)).toMatchSnapshot();
    });
  });

  describe('VERIFY_USER', () => {
    test('returns the correct state', () => {
      const action = { type: 'VERIFY_USER', payload: '' };

      expect(itemReducer(undefined, action)).toMatchSnapshot();
    });
  });

  describe('LOG_OUT_USER', () => {
    test('returns the correct state', () => {
      const action = { type: 'LOG_OUT_USER', payload: '' };

      expect(itemReducer(undefined, action)).toMatchSnapshot();
    });
  });

  describe('GET_RECIPES', () => {
    test('returns the correct state', () => {
      const action = { type: 'GET_RECIPES', payload: { recipes: [{ id: 1, name: 'tea' }] } };

      expect(itemReducer(undefined, action)).toMatchSnapshot();
    });
  });

  describe('ADD_RECIPE', () => {
    test('returns the correct state', () => {
      const action = { type: 'ADD_RECIPE', payload: { recipes: [{ id: 1, name: 'tea' }] } };

      expect(itemReducer(undefined, action)).toMatchSnapshot();
    });
  });

  describe('DELETE_RECIPE', () => {
    test('returns the correct state', () => {
      const action = { type: 'DELETE_RECIPE', payload: 1 };

      expect(itemReducer(undefined, action)).toMatchSnapshot();
    });
  });

  describe('LOADING', () => {
    test('returns the correct state', () => {
      const action = { type: 'LOADING', payload: '' };

      expect(itemReducer(undefined, action)).toMatchSnapshot();
    });
  });
});

