
import reducer from '../modal';
import { SHOW_MODAL, HIDE_MODAL  } from '../../constants';
import expect from 'expect';

describe('post reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should handle SHOW_MODAL', () => {
    const startAction = {
      type: SHOW_MODAL,
      payload: "My modal"
    };
 
    expect(reducer(undefined, startAction)).toEqual([startAction.payload]);
  });

  it('should handle HIDE_MODAL', () => {
    const startAction = {
      type: HIDE_MODAL,
    };
 
    expect(reducer(undefined, startAction)).toEqual([]);
  });
});