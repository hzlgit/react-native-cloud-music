import * as types from '../constants/ActionTypes'
const initialState = {
  userInfo: null
}
export default function (state = initialState, action) {
  const {payload, error, meta = {}, type} = action
  const {sequence = {}, mobile, account} = meta
  if (sequence.type === 'start' || error) {
    return state
  }
  switch (type) {
    case types.LOGIN:
      return {
        ...state,
        token: payload.token,
        userName: mobile
      }
    default:
      return state
  }
}
