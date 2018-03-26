import React, { Component } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { connect } from 'react-redux';
// import Card from './components/Card';
// import CardSection from './components/CardSection';
import { logoutUserThunk } from '../reducers/auth';


export class EventDetail extends Component {

    handlePress() {
        this.props.logoutUser(this.props.navigation)
    }

    render() {
        console.log('detaillll props', this.props.navigation.state.params.event)
        const { address, coordinator, date, location, time, title, description, imageUrl } = this.props.navigation.state.params.event
        return (
            <View>
                <View style={styles.cardContainer}>
                    <View style={styles.cardSection}>
                        <View style={styles.imageContainer}> 
                            <Image source={{ uri: imageUrl }} style={styles.image}/>
                        </View>
                        <View>
                            <Text>{date}</Text>
                            <Text>{time}</Text>
                        </View>
                        <View>
                            <Text>{title}</Text>
                            <Text>{description}</Text>
                        </View>
                    </View>
                </View>
                <Button title="submit" onPress={this.handlePress.bind(this)} />
            </View>
        )
    }
}

const styles = {
    cardContainer: {
        // display: 'flex',
        // justifyContent: 'center'
        margin: 10
    },
    cardSection: {
        justifyContent: 'flex-start',
        position: 'relative'
    },
    imageContainer: {

    },
    image: {
        height: 200,
        width: 250,
        alignSelf: 'center'
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: (navigation) => {
            dispatch(logoutUserThunk(navigation))
        }
    }
}

export default connect(null, mapDispatchToProps)(EventDetail)