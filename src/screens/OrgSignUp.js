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
import { connect } from 'react-redux';
import { authFormUpdate, signUpUserThunk } from '../reducers/auth';


export class SignUp extends Component {
    constructor(props) {
        super(props)

        this.onButtonPress = this.onButtonPress.bind(this)
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

    onButtonPress(navigation) {
        const { firstName, lastName, email, password } = this.props
        this.props.signUpUser({
            firstName,
            lastName,
            email,
            orgName,
            description,
            baseLocation,
            establishedDate,
            password
        }, navigation)
    }

    renderButton() {
        if (this.props.loading) return <ActivityIndicator size='large' />
        else {
            return (
                <TouchableOpacity style={styles.buttonContainer}
                    onPress={() => this.onButtonPress(this.props.navigation)}
                >
                    <Text style={styles.buttonText}>SIGN UP</Text>
                </TouchableOpacity>
            )
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.screenContainer}>
                <View style={styles.signUpContainer}>
                    <View style={styles.headerContainer}>
                        <Image style={styles.logo} source={require('../../assets/logvc.png')} />
                    </View>
                </View>
                <View style={styles.formContainer}>
                    <View style={styles.container}>
                        <StatusBar barStyle="light-content" />
                        <TextInput style={styles.input}
                            autoCorrect={false}
                            returnKeyType="next"
                            placeholder="First Name"
                            value={this.props.firstName}
                            onChangeText={(text) => this.props.authFormUpdate({ prop: 'firstName', value: text })}
                        />
                        <TextInput style={styles.input}
                            autoCorrect={false}
                            returnKeyType="next"
                            placeholder="Last Name"
                            value={this.props.lastName}
                            onChangeText={(text) => this.props.authFormUpdate({ prop: 'lastName', value: text })}
                        />
                        <TextInput style={styles.input}
                            autoCorrect={false}
                            returnKeyType="next"
                            placeholder="Email"
                            value={this.props.email}
                            onChangeText={(text) => this.props.authFormUpdate({ prop: 'email', value: text })}
                        />
                        <TextInput style={styles.input}
                            autoCorrect={false}
                            returnKeyType="next"
                            placeholder="Password"
                            secureTextEntry
                            value={this.props.password}
                            onChangeText={(text) => this.props.authFormUpdate({ prop: 'password', value: text })}
                        />
                        <TextInput style={styles.input}
                            autoCorrect={false}
                            returnKeyType="next"
                            placeholder="Organization Name"
                            value={this.props.orgName}
                            onChangeText={(text) => this.props.authFormUpdate({ prop: 'orgName', value: text })}
                        />
                        <TextInput style={styles.input}
                            autoCorrect={false}
                            returnKeyType="next"
                            placeholder="Description"
                            value={this.props.description}
                            onChangeText={(text) => this.props.authFormUpdate({ prop: 'description', value: text })}
                        />
                        <TextInput style={styles.input}
                            autoCorrect={false}
                            returnKeyType="next"
                            placeholder="Base Location"
                            value={this.props.email}
                            onChangeText={(text) => this.props.authFormUpdate({ prop: 'baseLocation', value: text })}
                        />
                        {this.renderError()}
                        {this.renderButton()}

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
    signUpContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 350,
        height: 350
    },
    headerContainer: {
        marginTop: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
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
    errorTextStyle: {
        color: 'red',
        fontSize: 20,
        alignSelf: 'center'
    },
}

const mapStateToProps = ({ auth }) => {
    const { firstName, lastName, email, password, error, loading } = auth;
    return {
        firstName,
        lastName,
        email,
        password,
        error,
        loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUpUser: (credentials, navigation) => {
            dispatch(signUpUserThunk(credentials, navigation))
        },
        authFormUpdate: ({ prop, value }) => {
            dispatch(authFormUpdate({ prop, value }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);