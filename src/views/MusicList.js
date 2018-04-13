import React, { Component } from 'react'
import { StyleSheet, View, Image, StatusBar, Platform, Animated, Dimensions } from 'react-native'
import {Icon, Text, Container, Content, Separator, Col, Header, Item, Input, Button, ListItem, Left, Right, Body, Thumbnail, Title, Row} from 'native-base'
import RightButton from '../components/header/RightButton'
import {HeaderBackButton, withNavigationFocus} from 'react-navigation'
import {px2dp} from '../utils'
import { BlurView } from 'react-native-blur'
import LinearGradient from 'react-native-linear-gradient'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import LoadingContainer from '../components/LoadingContainer'
import theme from '../themes'

class MusicList extends Component {
  static navigationOptions =({navigation}) => {
    return {
      title: '歌单',
      header: null
    //   headerLeft: (
    //     <HeaderBackButton tintColor={Platform.select({
    //       ios: '#fff'
    //     })} onPress={() => navigation.pop()} />
    //   ),
    //   headerRight: (
    //     <RightButton />
    //   )
    }
  }
  constructor (props) {
    super(props)
    this.state = {
      list: null,
      isEdit: false,
      isShow: true,
      fadeAnim: new Animated.Value(1)
    }
  }
  componentDidMount () {
    const {navigation, actions} = this.props
    const {playlist} = navigation.state.params
    actions.getPlaylistDetail(playlist.id, (result) => {
      this.setState({list: result.tracks})
    })
  }
  componentWillReceiveProps (next) {
    if (next.isFocused && next.isFocused !== this.props.isFocused) {
      this.props.navigation.setParams({status: next.playbox.status})
      this.props.navigation.setParams({ isShowBoxBtn: next.music.list && next.music.list.length > 0 })
    }
  }
  playAll () {
    const {navigation, actions, music} = this.props
    actions.removeAllMusic()// 清空列表
    actions.addMusicToList(this.state.list)// 添加音乐到播放列表
    actions.playMusic(music.list[0])// 播放列表第一首
  }
  _renderlist () {
    const {ui} = this.props
    if (ui.getPlaylistPending || !this.state.list) {
      return <LoadingContainer />
    }
    return this.state.list.map((item, index) => {
      return (
        <ListItem icon key={item.id}>
          <Left>
            <Text>{index + 1}</Text>
          </Left>
          <Body>
            <Text>{item.name}</Text>
          </Body>
          <Right>
            <Icon name='ios-more' />
          </Right>
        </ListItem>
      )
    })
  }
  _renderSectionHeader () {
    return (
      <View ref={(v) => { this._section = v }}>
        <ListItem icon onPress={() => this.playAll()}>
          <Left>
            <Image style={{width: 20, height: 20}} source={require('../../images/note_btn_play_white.png')} />
          </Left>
          <Body>
            <Text>播放全部</Text>
          </Body>
        </ListItem>
      </View>

    )
  }
  _onChangeHeaderVisibility (e) {
    if (e) {
      this._section.setNativeProps({
        style: {
          backgroundColor: '#fff',
          position: 'absolute',
          top: theme.toolbarHeight,
          width: '100%'

        }
      })
      this._title.setNativeProps({
        style: {
          display: 'flex'
        }
      })
    } else {
      this._title.setNativeProps({
        style: {
          display: 'none'
        }
      })
    }
  }
  _renderBackground () {
    return (
      <LinearGradient colors={['#000', '#444', '#666']} />
    )
  }
  _renderFixedHeader () {
    const {navigation} = this.props
    return (
      <View style={styles.fixedSection}>
        <Header style={{backgroundColor: 'transparent', borderBottomWidth: null}}>
          <Left><HeaderBackButton tintColor={Platform.select({
            ios: '#fff'
          })} onPress={() => navigation.pop()} /></Left>
          <Body>
            <Title ref={(t) => { this._title = t }}>歌单</Title>
          </Body>
          <Right>
            <RightButton />
          </Right>
        </Header>
      </View>
    )
  }
  _renderStickyHeader () {
    const {navigation} = this.props
    const {playlist} = navigation.state.params
    return (
      <View style={styles.header}>
        <Header>
          <Left />
          <Body>
            <Title>{playlist.name}</Title>
          </Body>
          <Right />
        </Header>
        {this._renderSectionHeader()}
      </View>
    )
  }
  _renderForeground () {
    const {navigation} = this.props
    const {playlist} = navigation.state.params
    return (
      <View style={styles.foreground}>
        <View style={styles.foreground_content}>
          <View style={styles.foreground_left}>
            <Thumbnail square style={{width: 100, height: 100}} source={{uri: playlist.coverImgUrl}} />
          </View>
          <View style={styles.foreground_right}>
            <Text style={{color: '#fff'}}>{playlist.name}</Text>
          </View>
        </View>
        <View style={styles.foreground_bottom}>
          <View style={styles.btnWrap}>
            <Button transparent under>
              <Icon name='ios-checkbox-outline' style={{color: '#fff'}} />
              <Text>收藏</Text>
            </Button>
          </View>
          <View style={styles.btnWrap}>
            <Button transparent under>
              <Icon name='ios-chatboxes-outline' style={{color: '#fff'}} />
              <Text>评论</Text>
            </Button>
          </View>
          <View style={styles.btnWrap}>
            <Button transparent under>
              <Icon name='ios-open-outline' style={{color: '#fff'}} />
              <Text>分享</Text>
            </Button>
          </View>
          <View style={styles.btnWrap}>
            <Button transparent under>
              <Icon name='ios-cloud-download-outline' style={{color: '#fff'}} />
              <Text>下载</Text>
            </Button>
          </View>
        </View>
      </View>
    )
  }
  render () {
    const {user} = this.props
    return (
      <Container style={{backgroundColor: '#f7f7f7', paddingTop: 0}}>
        <StatusBar barStyle='light-content' />
        <LinearGradient colors={['#000', '#444', '#666']} style={{flex: 1}}>
          <ParallaxScrollView
            stickyHeaderIndices={[0]}
            backgroundColor='transparent'
            contentBackgroundColor='rgb(252,252,254)'
            onChangeHeaderVisibility={(e) => this._onChangeHeaderVisibility(e)}
            // style={{ flex: 1, backgroundColor: '#fff', overflow: 'hidden' }}
            renderBackground={() => this._renderBackground()}
            renderFixedHeader={() => this._renderFixedHeader()}
            stickyHeaderHeight={headerHeight}
            renderStickyHeader={() => this._renderStickyHeader()}
            renderForeground={() => this._renderForeground()}
            parallaxHeaderHeight={parallaxHeight}>
            {this._renderSectionHeader()}
            {this._renderlist()}
          </ParallaxScrollView>
        </LinearGradient>
      </Container>
    )
  }
}
const {width, height} = Dimensions.get('window')
const parallaxHeight = theme.toolbarHeight + 200
const headerHeight = theme.toolbarHeight + 45
const styles = StyleSheet.create({
  bg: {
    width: width,
    height: width,
    resizeMode: 'cover'
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  back: {
    flex: 1,
    height: parallaxHeight
  },
  iconBtn: {
    marginRight: 5
  },
  header: {
    height: headerHeight
  },
  fixedSection: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: theme.toolbarHeight,
    backgroundColor: 'transparent'
  },
  foreground: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column'
  },
  foreground_content: {
    height: 120,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  foreground_bottom: {
    height: 65,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  foreground_left: {
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 12
  },
  foreground_right: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 12
  },
  btnWrap: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
export const LayoutComponent = withNavigationFocus(MusicList)
export function mapStateToProps (state) {
  return {
    user: state.user,
    ui: state.musicUI,
    music: state.music,
    playbox: state.playbox
  }
}
