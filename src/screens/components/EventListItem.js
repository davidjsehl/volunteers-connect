import React, { Component } from 'react';
import { View, Text, Button, TouchableWithoutFeedback, Image } from 'react-native';
import { connect } from 'react-redux';


export class EventListItem extends Component {

    render() {
        return (
            <TouchableWithoutFeedback>
                <View>
                    
                    <Text>{this.props.event.title}</Text>
                </View>

            </TouchableWithoutFeedback>
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

export default connect(null, mapDispatchToProps)(EventListItem)