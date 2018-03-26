import {createAction} from 'redux-actions'
import * as types from '../constants/ActionTypes'
import * as userService from '../services/userService'

/**
 * 登录
 */
export const login = createAction(
  types.LOGIN,
  userService.login,
  (phone, password, resolved, rejected) => {
    return {
      phone,
      resolved,
      rejected
    }
  })

export const getPlaylist = createAction(
  types.GET_PLAY_LIST,
  async (uid) => {
    const playlist = await userService.getPlaylist(uid)
    const subCount = await userService.getSubcount()
    return {
      playlist,
      subCount
    }
  })
