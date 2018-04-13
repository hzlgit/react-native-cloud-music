import React, { Component } from 'react'
import { StyleSheet, View, Image, StatusBar, Platform, Animated, Dimensions, ImageBackground, TouchableOpacity, Slider, Easing } from 'react-native'
import {Icon, Text, Container, Col, Header, Item, Input, Button, ListItem, Left, Right, Body, Thumbnail, Title, Row} from 'native-base'
import RightButton from '../components/header/RightButton'
import {HeaderBackButton, withNavigationFocus} from 'react-navigation'
import {px2dp, MillisecondToTime} from '../utils'
import { BlurView } from 'react-native-blur'
import LinearGradient from 'react-native-linear-gradient'
import theme from '../themes'

class PlayBox extends Component {
  static navigationOptions =({navigation}) => {
    return {
      title: '歌单',
      header: null
    }
  }
  constructor (props) {
    super(props)
    this.state = {
      centerHeight: 0,
      currentTime: '0:00',
      progress: 0,
      bounceValue: new Animated.Value(1), // 你可以改变这个值看
      rotateValue: new Animated.Value(0), // 旋转角度的初始值
      translateY: new Animated.Value(-5),
      translateX: new Animated.Value(42),
      animatedTop: new Animated.Value(1)
    }
  }
  sliderChange () {

  }
  startAnimation = () => {
    this.state.bounceValue.setValue(1)// 和上面初始值一样，所以
    // 弹动没有变化
    this.state.rotateValue.setValue(0)
    return Animated.parallel([
      // 通过Animated.spring等函数设定动画参数
      // 可选的基本动画类型: spring, decay, timing
      Animated.spring(this.state.bounceValue, {
        toValue: 1, // 变化目标值，也没有变化
        friction: 20 // friction 摩擦系数，默认40
      }),
      Animated.timing(this.state.rotateValue, {
        toValue: 1, // 角度从0变1
        duration: 15000, // 从0到1的时间
        easing: Easing.out(Easing.linear) // 线性变化，匀速旋转
      })
      // 调用start启动动画,start可以回调一个函数,从而实现动画循环
    ])
  }
  play () {
    const {playbox, music, navigation, actions} = this.props
    // 播放
    if (playbox.status !== 2) {
      if (!playbox.sound) {
        actions.playMusic(music.list[0]) // 播放列表第一首
      } else {
        actions.changePlayStatus(2)
      }
      Animated.loop(this.startAnimation()).start()
      this.getCurrentTime() // 更新进度
      Animated.parallel([
        Animated.timing(this.state.translateY, {
          toValue: 0,
          duration: 300
        }),
        Animated.timing(this.state.translateX, {
          toValue: 0,
          duration: 300
        }),
        Animated.timing(this.state.animatedTop, {
          toValue: 0,
          duration: 300
        })
      ]).start()
      // 暂停
    } else {
      Animated.parallel([
        Animated.timing(this.state.animatedTop, {
          toValue: 1,
          duration: 300
        }),
        Animated.timing(this.state.translateX, {
          toValue: 40,
          duration: 300
        }),
        Animated.timing(this.state.translateY, {
          toValue: -5,
          duration: 300
        })
      ]).start()
      this.startAnimation().stop()
      actions.changePlayStatus(3)
      // 卸载定时器
      this.interval && clearInterval(this.interval)
    }
  }
  getCurrentTime () {
    this.interval = setInterval(() => {
      const {playbox} = this.props
      if (playbox.sound) {
        playbox.sound.getCurrentTime((seconds) => {
          let progress = seconds / playbox.sound.getDuration()// 计算进度
          this.setState({currentTime: MillisecondToTime(seconds), progress: progress})
        })
      }
    }, 1000)
  }
  render () {
    const {playbox, music, navigation} = this.props
    const sound = playbox.sound
    const duration = MillisecondToTime(sound && sound.getDuration())
    let playingMusic = music.playingMusic
    // 如果没有准备播放的音乐，默认选择列表第一首
    if (!playingMusic) {
      playingMusic = music.list[0]
    }
    return (
      <Container style={{paddingTop: 0}}>
        <StatusBar barStyle='light-content' />
        <ImageBackground style={{flex: 1}} source={require('../../images/playbox/cm2_poplay_mid_prs.png')}>
          <BlurView style={{ flex: 1, paddingTop: theme.toolbarHeight }} blurType='light' blurAmount={10} >
            <View style={{position: 'absolute', top: 0, left: 0, right: 0, zIndex: 35}}>
              <LinearGradient colors={['#43423F', '#51514D', '#60605B']}>
                <Header style={{backgroundColor: 'transparent', borderBottomColor: '#848480'}}>
                  <Left><HeaderBackButton tintColor={Platform.select({
                    ios: '#fff'
                  })} onPress={() => navigation.pop()} /></Left>
                  <Body>
                    <Title ref={(t) => { this._title = t }}>{playingMusic.name}</Title>
                  </Body>
                  <Right>
                    {/* <RightButton /> */}
                  </Right>
                </Header>
              </LinearGradient>
            </View>
            <TouchableOpacity activeOpacity={1} style={styles.cdContainer} onPress={this.showLyric}>
              {/* {
                showLyic ? (
                  <View style={styles.cdContainer}>
                    <ScrollView style={{width: screen.width}} contentContainerStyle={{alignItems: 'center', paddingTop: '30%', paddingBottom: '30%'}} ref={lyricScroll => this.lyricScroll = lyricScroll}>
                      {
                        lyricArr.map((v, i) => (
                          <Normal color={v === currentLrc ? color.theme : color.white} key={i} style={{paddingTop: 5, paddingBottom: 5}}>{v.replace(/\[.*\]/g, '')}</Normal>
                        ))
                      }
                    </ScrollView>

                  </View>
                ) : ( */}
              <View style={styles.cdContainer}>
                <View style={{position: 'absolute', top: -18, left: 22, width: width, alignItems: 'center', zIndex: 18}}>
                  <Animated.Image source={require('../../images/playbox/cm2_play_needle_play.png')}
                    style={{width: 80,
                      height: 140,
                      transform: [
                        {rotate: this.state.animatedTop.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0deg', '-45deg']
                        })},
                        {translateX: this.state.translateX},
                        {translateY: this.state.translateY}
                      ]}} />
                </View>
                <View style={styles.albumContainer}>
                  <ImageBackground source={require('../../images/playbox/play_disc.png')} style={styles.albumBack}>
                    <Animated.Image
                      source={{uri: playingMusic.album.blurPicUrl + '?param=200y200'}}
                      style={[{width: size - 105, height: size - 105, borderRadius: (size - 105) / 2},
                        {transform: [
                          {scale: this.state.bounceValue},
                          {rotateZ: this.state.rotateValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '360deg']
                          })}
                        ]}]}
                    />
                  </ImageBackground>
                </View>
              </View>
              {/* )
              } */}
            </TouchableOpacity>
            <View style={styles.toolBar}>
              <TouchableOpacity>
                <Image style={styles.btnIcon} source={require('../../images/playbox/love.png')} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image style={styles.btnIcon} source={require('../../images/playbox/dld.png')} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image style={styles.btnIcon} source={require('../../images/playbox/cmt.png')} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image style={styles.btnIcon} source={require('../../images/playbox/more.png')} />
              </TouchableOpacity>
            </View>
            <View style={styles.progressBar}>
              <View style={styles.tip}>
                <Text style={{color: '#fff', marginRight: 5, fontWeight: '100', fontSize: 12}}>{this.state.currentTime}</Text>
              </View>
              <Slider
                maximumTrackTintColor='#fff'
                minimumTrackTintColor='red'
                thumbStyle={styles.thumb}
                trackStyle={{height: 2}}
                style={{flex: 1}}
                value={this.state.progress}
                onValueChange={value => this.sliderChange(value)}
              />
              <View style={styles.tip}>
                <Text style={{color: '#fff', marginLeft: 5, fontWeight: '100', fontSize: 12}}>
                  {duration}
                </Text>
              </View>
            </View>
            <View style={styles.footBar}>
              <View style={styles.footBarButton}>
                <TouchableOpacity>
                  <Image style={styles.btnIcon} source={require('../../images/playbox/loop.png')} />
                </TouchableOpacity>
                <View style={styles.footBarCenter}>
                  <TouchableOpacity>
                    <Image style={styles.btnIcon} source={require('../../images/playbox/prev.png')} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.play()}>
                    <Image style={styles.btnIcon} source={playbox.status === 2 ? require('../../images/playbox/pause.png') : require('../../images/playbox/play.png')} />
                  </TouchableOpacity>
                  <TouchableOpacity >
                    <Image style={styles.btnIcon} source={require('../../images/playbox/next.png')} />
                  </TouchableOpacity>
                </View>
                <View style={styles.footBarButton}>
                  <TouchableOpacity >
                    <Image style={styles.btnIcon} source={require('../../images/playbox/list.png')} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </BlurView>
        </ImageBackground>
      </Container>
    )
  }
}
const {width, height} = Dimensions.get('window')
const size = width - 40
const styles = StyleSheet.create({
  cdContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  thumb: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    borderColor: '#fff',
    borderWidth: 7,
    borderRadius: 10
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12
  },
  toolBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8
  },
  tip: {
    width: 35,
    alignItems: 'center',
    justifyContent: 'center'
  },
  albumContainer: {
    width: size,
    height: size,
    marginTop: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: size / 2,
    backgroundColor: '#9F9D97'
  },
  albumBack: {
    width: size - 15,
    height: size - 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnIcon: {
    width: 55,
    height: 55
  },
  footBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8
  },
  footBarButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  footBarCenter: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center'
  }
})
export const LayoutComponent = withNavigationFocus(PlayBox)
export function mapStateToProps (state) {
  return {
    user: state.user,
    ui: state.musicUI,
    music: state.music,
    playbox: state.playbox
  }
}
