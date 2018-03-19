import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { logoutUserThunk } from '../reducers/auth';


export class OrganizationDetail extends Component {

    handlePress() {
        this.props.logoutUser(this.props.navigation)
    }

    render() {
        return (
            <View>
                <Text>ORGANIZATION DETAILLL</Text>
                <Text>ORGANIZATION DETAILLL</Text>
                <Text>ORGANIZATION DETAILLL</Text>
                <Text>ORGANIZATION DETAILLL</Text>
                <Text>ORGANIZATION DETAILLL</Text>
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

export default connect(null, mapDispatchToProps)(OrganizationDetail)