import * as types from '../constants/ActionTypes'
const initialState = {
  userInfo: {},
  userProfile: {},
  userAccount: {},
  like: [], // 创建的歌单
  sc: [], // 收藏
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
      let list = payload.playlist || []
      let sc = []
      let like = []
      list.map((res) => {
        if (res.subscribed) {
          sc.push(res)
        } else {
          like.push(res)
        }
      })
      return {
        ...state,
        like: like,
        sc: sc,
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
