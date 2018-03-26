import * as types from '../constants/ActionTypes'

const initialState = {
  getBannerPending: false,
  getPersonalizedPending: false
}

export default function (state = initialState, action) {
  const { type, meta = {} } = action
  const { sequence = {} } = meta

  switch (type) {
    case types.GET_BANNER:
      return {
        ...state,
        getBannerPending: sequence.type === 'start'
      }
    case types.GET_PERSONALIZED:
      return {
        ...state,
        getPersonalizedPending: sequence.type === 'start'
      }
    default:
      return state
  }
}
