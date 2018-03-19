import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { logoutUserThunk } from '../reducers/auth';


export class EventMap extends Component {

    handlePress() {
        this.props.logoutUser(this.props.navigation)
    }

    render() {
        return (
            <View>
                <Text>EVENT MAPPPPP</Text>
                <Text>EVENT MAPPPPP</Text>
                <Text>EVENT MAPPPPP</Text>
                <Text>EVENT MAPPPPP</Text>
                <Text>EVENT MAPPPPP</Text>
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

export default connect(null, mapDispatchToProps)(EventMap)