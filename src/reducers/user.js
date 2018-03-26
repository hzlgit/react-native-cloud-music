import * as types from '../constants/ActionTypes'
const initialState = {
  userInfo: {},
  userProfile: {},
  userAccount: {},
  playlist: [],
  subCount: {}
}
export default function (state = initialState, action) {
  const {payload, error, meta = {}, type} = action
  const {sequence = {}, phone} = meta
  if (sequence.type === 'start' || error) {
    return state
  }
  switch (type) {
    case types.LOGIN:
      if (payload.code === 200) {
        return {
          ...state,
          userAccount: phone,
          userInfo: payload.account,
          userProfile: payload.profile
        }
      }
      return state
    case types.GET_PLAY_LIST:
      return {
        ...state,
        playlist: payload.playlist,
        subCount: payload.subCount
      }
    case types.LOGOUT:
      return {
        ...state,
        token: null,
        users: state.users
      }
    default:
      return state
  }
}
