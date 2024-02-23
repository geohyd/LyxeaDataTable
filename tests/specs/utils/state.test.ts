import State from '../../../lib/utils/State';

describe('State', () => {
  describe('Initialization', () => {
    it('should initialize with the provided initial value', () => {
      const initialState = { count: 0 };
      const state = new State(initialState);
      expect(state.value).toEqual(initialState);
    });
  });

  describe('Getters and Setters', () => {
    it('should get the current value', () => {
      const initialState = { count: 0 };
      const state = new State(initialState);
      expect(state.value).toEqual(initialState);
    });

    it('should set the value to a new value', () => {
      const initialState = { count: 0 };
      const newState = { count: 1 };
      const state = new State(initialState);
      state.value = newState;
      expect(state.value).toEqual(newState);
    });
  });

  describe('getState', () => {
    it('should get the entire state if no key is provided', () => {
      const initialState = { count: 0 };
      const state = new State(initialState);
      expect(state.getState()).toEqual(initialState);
    });

    it('should get the value of a specific key if provided', () => {
      const initialState = { count: 0 };
      const state = new State(initialState);
      expect(state.getState('count')).toEqual(initialState.count);
    });
  });

  describe('setState', () => {
    it('should update the state using a function callback', () => {
      const initialState = { count: 0 };
      const state = new State<{ count: number }>(initialState);
      state.setState((prevState) => ({ count: prevState.count + 1 }));
      expect(state.value).toEqual({ count: 1 });
    });

    it('should update the state using a direct value', () => {
      const initialState = { count: 0 };
      const newState = { count: 1 };
      const state = new State<{ count: number }>(initialState);
      state.setState((state) => {
        state = newState;
        return state;
      });
      expect(state.value).toEqual(newState);
    });

    it('should notify listeners after updating state', () => {
      const initialState = { count: 0 };
      const state = new State<{ count: number }>(initialState);
      const mockListener = jest.fn();
      state.subscribe(mockListener);
      state.setState({ count: 1 });
      expect(mockListener).toHaveBeenCalledTimes(1);
      expect(mockListener).toHaveBeenCalledWith({ count: 1 });
    });
  });
});
