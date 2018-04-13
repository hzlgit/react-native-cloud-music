import {createAction} from 'redux-actions'
import * as types from '../constants/ActionTypes'
import Sound from 'react-native-sound'
import {Alert} from 'react-native'

// 播放状态
export const changePlayStatus = createAction(
  types.CHANGE_PLAY_STATUS,
  (status) => {
    return {
      status
    }
  }
)
// 播放音乐
export const playMusic = createAction(
  types.PLAY_MUSIC,
  async (music) => {
    const result = await new Promise(function (resolve, reject) {
      const sound = new Sound(music.musicUrl, '', (error) => {
        if (!error) {
          // sound.play()
          resolve({
            music,
            sound
          })
        } else {
          reject(error)
        }
      })
    })
    return result
  })
// 播放模式
export const changePlayMode = createAction(
  types.CHANGE_PLAY_MODE,
  (mode) => {
    return {
      mode
    }
  }
)
