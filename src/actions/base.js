import {createAction} from 'redux-actions'
import * as types from '../constants/ActionTypes'
import * as baseService from '../services/baseService'
/**
 * 获取广告图
 */
export const getBanner = createAction(types.GET_BANNER, async () => {
  const banners = await baseService.getBanner()
  return banners
})
export const getPersonalized = createAction(types.GET_PERSONALIZED, async () => {
  const personalized = await baseService.getPersonalized()
  return personalized
})
