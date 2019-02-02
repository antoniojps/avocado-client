const initialState = {
  list: [],
  isLoading: true,
  current_page: 1,
  hasMore: true,
  total: null,
  per_page: null,
  error: false,
  search: '',
};
export default (counterName = '') => (state = initialState, { type, data }) => {
  switch (type) {
  case `FETCH_${counterName}_SUCCESS`:
    // eslint-disable-next-line
      const {
      meta: {
          current_page, last_page, total, per_page, // eslint-disable-line
      }, data: list,
    } = data;
    return {
      ...state,
      list: [...state.list, ...list],
      isLoading: false,
      current_page,
        hasMore: current_page < last_page, // eslint-disable-line
      total,
      per_page,
      error: false,
    }

  case `FETCH_${counterName}_LOADING`:
    return { ...state, isLoading: true, error: false }
  default:
    return state;
  }
}
