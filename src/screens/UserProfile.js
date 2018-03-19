import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { logoutUserThunk } from '../reducers/auth';


export default class UserProfile extends Component {

    handlePress() {
        this.props.logoutUser(this.props.navigation)
    }

    render() {
        return (
            <View>
                <Text>USER PROFILEEEEE</Text>
                <Text>USER PROFILEEEEE</Text>
                <Text>USER PROFILEEEEE</Text>
                <Text>USER PROFILEEEEE</Text>
                <Text>USER PROFILEEEEE</Text>
                <Button title="submit" onPress={this.handlePress.bind(this)} />
            </View>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: (navigation) => {
            dispatch(logoutUserThunk(navigation))
        }
    }
}

export default connect(null, mapDispatchToProps)(UserProfile)