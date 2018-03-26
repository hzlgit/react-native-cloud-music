import React, { Component } from 'react'
import { StyleSheet, View, Image, StatusBar } from 'react-native'
import {Icon, Text, Container, Content, Row, Col, Header, Item, Input, Button, ListItem, Left, Right, Body, Thumbnail} from 'native-base'
import RightButton from '../components/header/RightButton'

class Music extends Component {
    static navigationOptions = {
      title: '我的音乐',
      tabBarLabel: '我的',
      tabBarIcon: ({ focused, tintColor }) =>
        <Image style={{width: 55, height: 55}} source={focused ? require('../../images/tab/music_selected.png') : require('../../images/tab/music_prs.png')} />,
      headerRight: (
        <RightButton />
      )
    }
    componentDidMount () {

    }

    gotoLogin = () => {
      this.props.navigation.navigate('Login')
    }

    render () {
      return (
        <Container>
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
                  <Icon type='Entypo' name='chevron-thin-right' style={{fontSize: 16 }} />
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
                  <Icon type='Entypo' name='chevron-thin-right' style={{fontSize: 16 }} />
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
                  <Icon type='Entypo' name='chevron-thin-right' style={{fontSize: 16 }} />
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
                  <Icon type='Entypo' name='chevron-thin-right' style={{fontSize: 16 }} />
                </Right>
              </ListItem>
            </View>
          </Content>
        </Container>
      )
    }
}
const styles = StyleSheet.create({
  list: {
    backgroundColor: '#fff'
  }
})
export const LayoutComponent = Music
export function mapStateToProps (state) {
  return {
    user: state.user
  }
}
