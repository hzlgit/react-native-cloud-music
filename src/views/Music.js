import React, { Component } from 'react'
import { StyleSheet, View, Image, StatusBar, TouchableOpacity } from 'react-native'
import {Icon, Text, Container, Content, Separator, Col, Header, Item, Input, Button, ListItem, Left, Right, Body, Thumbnail} from 'native-base'
import RightButton from '../components/header/RightButton'
import { withNavigationFocus } from 'react-navigation'

class Music extends Component {
    static navigationOptions = ({navigation}) => {
      let params = navigation.state.params
      return {
        title: '我的音乐',
        tabBarLabel: '我的',
        tabBarIcon: ({ focused, tintColor }) =>
          <Image style={{width: 55, height: 55}} source={focused ? require('../../images/tab/music_selected.png') : require('../../images/tab/music_prs.png')} />,
        headerRight: params && params.isShowBoxBtn ? <RightButton isPlaying={params && params.status === 2} onPress={() => navigation.push('PlayBox')} /> : null
      }
    }
    constructor (props) {
      super(props)
      this.state = {
        likeExpand: true,
        scExpand: true
      }
    }
    componentWillReceiveProps (next) {
      if (next.isFocused && next.isFocused !== this.props.isFocused) {
        this.props.navigation.setParams({status: next.playbox.status})
        this.props.navigation.setParams({ isShowBoxBtn: next.music.list && next.music.list.length > 0 })
      }
    }
    componentDidMount () {
      const {user = {}, actions} = this.props
      if (user.userInfo && user.userInfo.id) {
        actions.getPlaylist(user.userInfo.id)
      }
    }
    _onItemPress (list) {
      this.props.navigation.push('MusicList', {playlist: list})
    }
    _renderlist (list) {
      return list.map((res) => {
        return (
          <ListItem key={res.id} onPress={() => this._onItemPress(res)}>
            <Thumbnail square size={80} source={{ uri: res.coverImgUrl }} />
            <Body>
              <Text>{res.name}</Text>
              <Text note>{res.trackCount}首</Text>
            </Body>
          </ListItem>
        )
      })
    }
    render () {
      const {user} = this.props
      return (
        <Container style={{backgroundColor: 'rgb(252,251,254)'}}>
          <StatusBar barStyle='light-content' />
          <Content>
            <View style={styles.list}>
              <ListItem icon>
                <Left>
                  <Icon name='ios-musical-notes-outline' />
                </Left>
                <Body>
                  <Text>本地音乐</Text>
                </Body>
                <Right>
                  <Text note>0</Text>
                  <Icon type='Entypo' name='chevron-thin-right' style={{fontSize: 16}} />
                </Right>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Icon name='ios-time-outline' />
                </Left>
                <Body>
                  <Text>最近播放</Text>
                </Body>
                <Right>
                  <Text note>0</Text>
                  <Icon type='Entypo' name='chevron-thin-right' style={{fontSize: 16}} />
                </Right>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Icon name='ios-headset-outline' />
                </Left>
                <Body>
                  <Text>我的电台</Text>
                </Body>
                <Right>
                  <Text note>0</Text>
                  <Icon type='Entypo' name='chevron-thin-right' style={{fontSize: 16}} />
                </Right>
              </ListItem>
              <ListItem icon last>
                <Left>
                  <Icon name='ios-heart-outline' />
                </Left>
                <Body>
                  <Text>我的收藏</Text>
                </Body>
                <Right>
                  <Text note>0</Text>
                  <Icon type='Entypo' name='chevron-thin-right' style={{fontSize: 16}} />
                </Right>
              </ListItem>
              <Separator>
                <View style={styles.titleWrap}>
                  <TouchableOpacity style={styles.iconBtn} activeOpacity={1} onPress={() => this.setState({likeExpand: !this.state.likeExpand})}>
                    <Icon type='Entypo' name={this.state.likeExpand ? 'chevron-thin-down' : 'chevron-thin-right'} style={{fontSize: 16, color: '#666'}} />
                  </TouchableOpacity>
                  <Text>我创建的歌单</Text>
                </View>

              </Separator>
              {this.state.likeExpand ? this._renderlist(user.like) : null}
              <Separator>
                <View style={styles.titleWrap}>
                  <TouchableOpacity style={styles.iconBtn} activeOpacity={1} onPress={() => this.setState({scExpand: !this.state.scExpand})}>
                    <Icon type='Entypo' name={this.state.scExpand ? 'chevron-thin-down' : 'chevron-thin-right'} style={{fontSize: 16, color: '#666'}} />
                  </TouchableOpacity>
                  <Text>我收藏的歌单</Text>
                </View>
              </Separator>
              {this.state.scExpand ? this._renderlist(user.sc) : null}
            </View>
          </Content>
        </Container>
      )
    }
}
const styles = StyleSheet.create({
  list: {
    // backgroundColor: '#fff'
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconBtn: {
    marginRight: 5
  }
})
export const LayoutComponent = withNavigationFocus(Music)
export function mapStateToProps (state) {
  return {
    user: state.user,
    music: state.music,
    playbox: state.playbox
  }
}
