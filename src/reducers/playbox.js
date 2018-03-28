import * as types from '../constants/ActionTypes'

const initialState = {
  playingMusic: null, // 当前播放音乐
  status: 1, // 播放状态 1停止2播放3暂停
  mode: 1 // 1顺序播放，2随机播放，3单曲循环
}

export default function (state = initialState, action) {
  const {payload, error, meta = {}, type} = action
  const {sequence = {}} = meta
  if (sequence.type === 'start' || error) {
    return state
  }
  switch (type) {
    case types.CHANGE_PLAY_STATUS:
      return {
        ...state,
        status: payload.status,
        music: payload.music
      }
    case types.CHANGE_PLAY_MODE:
      return {
        ...state,
        mode: payload.mode
      }
    default:
      return state
  }
}
