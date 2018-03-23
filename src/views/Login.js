import React, { Component } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import {NavigationActions} from 'react-navigation';
import {Container, Input, Item, Label, Icon, Button, Text} from 'native-base'
const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'Main'})
    ]
});

class Login extends Component {
    static navigationOptions = {
        title: '手机号登录',
    }
    constructor(props){
        super(props)
        this.state = {
            phone: null,
            password: null
        }
    }

    onLogin = () => {
        this.props.navigation.dispatch(resetAction)
    }

    onClose = () => {
        this.props.navigation.goBack();
    }

    render() {
        const { fetching } = this.props
        return (
            <Container style={styles.container}>
                <Item>
                    <Icon active name='ios-phone-portrait-outline'/>
                    <Input
                        style={styles.input}
                        autoFocus 
                        placeholder="手机号" 
                        keyboardType="numeric"
                        value={this.state.phone}
                        onChangeText={(phone)=>this.setState({phone})}
                    />
                </Item>
                <Item last>
                    <Icon active name='ios-lock-outline' />
                    <Input 
                        style={styles.input}
                        placeholder="密码" 
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={(password)=>this.setState({password})}
                    />
                </Item>
                <View style={{padding:12}}>
                    <Button rounded dark block onPress={()=>this.onLogin()}>
                        <Text>登录</Text>
                    </Button>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        // backgroundColor:"#fff"
        
    },
    input:{
       
    }
})
export const LayoutComponent = Login;
export function mapStateToProps(state) {
    return {
        user:state.user
    }
}
