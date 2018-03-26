import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { logoutUserThunk } from '../reducers/auth';
import { getAllEventsThunk } from '../reducers/events'
import { getAllOrganizationsThunk } from '../reducers/organizations';


export class Home extends Component {

    // componentDidMount () {
    //     this.props.getEvents()
    // }

    handlePress() {
        this.props.logoutUser(this.props.navigation)
    }

    render () {
        return (
            <View>
                {/* <TouchableOpacity>

                </TouchableOpacity> */}
                <Button title="submit" onPress={this.handlePress.bind(this)} />
                <Button title="Events" onPress={() => this.props.navigation.navigate('AllEvents')} />
            </View>
        )
    }
}

const mapStateToProps = ({ events, organizations }) => {
    return {
        events,
        organizations
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: (navigation) => {
            dispatch(logoutUserThunk(navigation))
        },
        getEvents: () => {
            dispatch(getAllEventsThunk())
        },
        getOrganizations: () => {
            dispatch(getAllOrganizationsThunk())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
