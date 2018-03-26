import React, { Component } from 'react';
import { View, Text, Button, TouchableWithoutFeedback, Image } from 'react-native';
import { connect } from 'react-redux';


export class EventListItem extends Component {

    onRowPress(event) {
        this.props.navigation.navigate('EventDetail', { event })
    }

    render() {
        const { event } = this.props
        return (
            <TouchableWithoutFeedback onPress={() => this.onRowPress(event)}>
                <View>
                    <View style={styles.cardContainer}>
                        <View style={styles.cardSection}>
                            <View style={styles.imageContainer}>
                                <Image style={styles.imageStyle} source={{ uri: event.imageUrl }} />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.eventTitle}>{event.title}</Text>
                                <Text styles={styles.eventDescription}>{event.description.slice(0, 45) + '...'}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = {
    cardContainer: {
        backgroundColor: '#ddd',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 7
    },
    cardSection: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        flex: .8
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    imageStyle: {
        height: 50,
        width: 75
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