import * as types from '../constants/ActionTypes'

const initialState = {
  loginPending: false
}

export default function (state = initialState, action) {
  const { type, meta = {} } = action
  const { sequence = {} } = meta

  switch (type) {
    case types.LOGIN:
      return {
        ...state,
        loginPending: sequence.type === 'start'
      }
    case types.LOGOUT:
      return initialState
    default:
      return state
  }
}
