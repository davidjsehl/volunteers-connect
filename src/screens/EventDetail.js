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

    renderVolunteers(volunteers) {
        return (
            <View>
                {
                    volunteers.map(volunteer => {
                        return (
                            <Text key={volunteer.id}>{volunteer.displayName}</Text>
                        )
                    })
                }
            </View>
        )
    }

    render() {
        console.log('evennnnttttttt', this.props.navigation.state.params.event)
        console.log('propppssssss', this.props)
        const { address, coordinator, date, location, time, title, description, imageUrl } = this.props.navigation.state.params.event
        volunteers = Object.keys(this.props.navigation.state.params.event.volunteers).map(id => this.props.navigation.state.params.event.volunteers[id])
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
                    <View style={styles.cardSection}>
                        <View>
                            <Text>Volunteers</Text>
                        </View>
                        <View>
                            {this.renderVolunteers(volunteers)}
                        </View>
                    </View>
                </View>
                <Button title="Volunteer">
                    Volunteer For This Event!
                </Button>
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

const mapStateToProps = ({ auth }) => {
    return {
        user: auth.user
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: (navigation) => {
            dispatch(logoutUserThunk(navigation))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail)