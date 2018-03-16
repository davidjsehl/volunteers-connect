import React, { Component } from 'react'
import {
    View,
    Text,
    Input,
    TextInput,
    KeyboardAvoidingView,
    StatusBar,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import { authFormUpdate, loginUserThunk } from '../reducers/auth'

export class Login extends Component {

    onButtonPress(navigation) {
        const { email, password } = this.props;
        this.props.loginUser({
            email,
            password
        }, navigation)
    }

    renderError() {
        if (this.props.error) {
            return (
                <View style={{ backgroundColor: '#4D5966' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            )
        }
    }

    renderButton() {
        if (this.props.loading) return <ActivityIndicator size='large' />
        else {
            return (
                <TouchableOpacity style={styles.buttonContainer}
                    onPress={() => this.onButtonPress(this.props.navigation)}
                >
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
            )
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.screenContainer}>

                <View style={styles.loginContainer}>
                    <Image style={styles.logo} source={require('../../assets/logvc.png')} />
                </View>
                <View style={styles.formContainer}>
                    <View style={styles.container}>
                        <StatusBar barStyle="light-content" />
                        <TextInput style={styles.input}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType='email-address'
                            returnKeyType="next"
                            placeholder='Email'
                            value={this.props.email}
                            onChangeText={(text) => this.props.authFormUpdate({ prop: 'email', value: text })}
                        />

                        <TextInput style={styles.input}
                            placeholder='Password'
                            value={this.props.password}
                            onChangeText={(text) => this.props.authFormUpdate({ prop: 'password', value: text })}
                            secureTextEntry
                        />

                        {this.renderError()}

                        {this.renderButton()}

                        <Text style={styles.loginText}>Dont have an account?</Text>
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('SignUp')}>
                            <Text style={styles.buttonText}>SIGN UP</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = {
    screenContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    loginContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 350,
        height: 350
    },
    container: {
        padding: 20
    },
    input: {
        height: 30,
        backgroundColor: 'rgba(91, 87, 86, 0.2)',
        marginBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
    },
    buttonContainer: {
        backgroundColor: '#367BA5',
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    loginButton: {
        backgroundColor: '#775839',
        color: '#fff'
    },
    errorTextStyle: {
        color: 'red',
        fontSize: 20,
        alignSelf: 'center'
    },
    loginText: {
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 14,
        color: 'rgba(91, 87, 86, 0.7)'
    }
}

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;
    return {
        email,
        password,
        error,
        loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (credentials, navigation) => {
            dispatch(loginUserThunk(credentials, navigation))
        },
        authFormUpdate: ({ prop, value }) => {
            dispatch(authFormUpdate({ prop, value }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);