import filter from './filter';

describe('Test for filter reducer', () => {
  it('Should return "all" for default state', () => {
    expect(filter(undefined, {})).toEqual('all');
  });
  it('handle SET_FILTER action', () => {
    const action = { type: 'SET_FILTER', filter: 'active' };
    const result = 'active';
    expect(filter(undefined, action)).toEqual(result);
  });
});
