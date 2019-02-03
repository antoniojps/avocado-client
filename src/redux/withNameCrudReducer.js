const initialState = {
  list: [],
  isLoading: false,
  isPostLoading: false,
  isPutLoading: false,
  isDeleteLoading: false,
  current_page: 0,
  hasMore: true,
  total: null,
  per_page: null,
  error: false,
};
export default (context = '') => (state = initialState, {
  type, data,
}) => {
  switch (type) {
  /** FETCH  */

  case `FETCH_${context}_SUCCESS`:
    // eslint-disable-next-line
      const {
      meta: {
          current_page, last_page, total, per_page // eslint-disable-line
      }, data: list,
    } = data;
    return {
      ...state,
        list: current_page === 1 ? list : [...state.list, ...list],// eslint-disable-line
      isLoading: false,
      current_page,
        hasMore: current_page < last_page, // eslint-disable-line
      total,
      per_page,
      error: false,
    }
  case `FETCH_${context}_LOADING`:
      return { ...state, isLoading: true }// eslint-disable-line

    /** POST  */

  case `POST_${context}_SUCCESS`:
    return { ...state, isPostLoading: false, list: [data, ...state.list] }
  case `POST_${context}_LOADING`:
    return { ...state, isPostLoading: true }

    /** PUT  */

  case `PUT_${context}_SUCCESS`:
    return {
      ...state,
      isPutLoading: true,
      list: state.list.map(row => (row.id === data.id ? data : row)),
    }
  case `PUT_${context}_LOADING`:
    return { ...state, isPutLoading: false }

    /** DELETE  */

  case `DELETE_${context}_SUCCESS`:
    return {
      ...state,
      isDeleteLoading: false,
      list: state.list.filter(({ id }) => id !== +data.id),
    }
  case `DELETE_${context}_LOADING`:
    return { ...state, isDeleteLoading: true }

  default:
    return state;
  }
}
