import {createAction} from 'redux-actions'
import * as types from '../constants/ActionTypes'
import * as baseService from '../services/baseService'
/**
 * 获取广告图
 */
export const getBanner = createAction(types.GET_BANNER, async () => {
  return await baseService.getBanner()
})
export const getPersonalized = createAction(types.GET_PERSONALIZED, async () => {
  return await baseService.getPersonalized()
})
