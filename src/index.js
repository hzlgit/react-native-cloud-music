import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {StyleProvider} from 'native-base'
import * as NavigationComponent from './views/Navigation'
import configureStore from './store/configureStore'
import getTheme from '../native-base-theme/components'
import platform from './themes'
import connectComponent from './utils/connectComponent'
import { PersistGate } from 'redux-persist/es/integration/react'
import Loading from './components/Loading'
import * as playboxActions from './actions/playbox'
import Sound from 'react-native-sound'
import {getNextById} from './utils'

const Navigation = connectComponent(NavigationComponent)
const { persistor, store } = configureStore()
const onBeforeLift = () => {
  // take some action before the gate lifts
}
export default class Root extends Component {
  constructor () {
    super()
    store.subscribe(this.onStoreUpdate.bind(this))
    Sound.setCategory('Playback', true)
  }
  onStoreUpdate () {
    const {playbox = {}, music = {}} = store.getState()
    const {playingMusic} = music // 当前播放音乐
    if (playbox.sound && playbox !== this.playbox) {
      this.playbox = playbox
      this.sound = playbox.sound
      // 监听状态的改变
      switch (playbox.status) {
        case 1:
          this.sound.stop().release()
          break
        case 2:
          this.sound.play((success) => {
            console.log('playing...', success)
            // 自然播放结束,自动播放下一首
            if (success) {
              this.sound.release()
              store.dispatch(playboxActions.playMusic(getNextById(playingMusic, music.list)))
            } else {
              this.sound.reset()
            }
          })
          this.sound.setVolume(0.5)
          break
        case 3:
          this.sound.pause()
          break
      }
      // console.log(this.sound)
      // 监听播放的进度
      // this.sound.getCurrentTime((seconds) => console.log('at ' + seconds))
      // playbox.sound.release()
    }
  }

  render () {
    return (
      <StyleProvider style={getTheme(platform)}>
        <Provider store={store}>
          <PersistGate
            loading={<Loading />}
            onBeforeLift={onBeforeLift}
            persistor={persistor}>
            <Navigation />
          </PersistGate>
        </Provider>
      </StyleProvider>
    )
  }
}
