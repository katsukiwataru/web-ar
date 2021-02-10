import type { Reducer } from 'react';

interface State {
  pageNumber: number;
}

interface Action {
  type: 'increment' | 'decrement';
  payload?: any;
}

export const initialPage: State = {
  pageNumber: 1,
};

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { ...state, pageNumber: state.pageNumber + 1 };
    case 'decrement':
      if (state.pageNumber > 1) {
        return { ...state, pageNumber: state.pageNumber - 1 };
      }
      return { ...state, pageNumber: state.pageNumber };
  }
};
