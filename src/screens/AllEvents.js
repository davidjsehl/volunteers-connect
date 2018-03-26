import React, { Component } from 'react';
import { ListView, View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';
import { logoutUserThunk } from '../reducers/auth';
import { getAllEventsThunk } from '../reducers/events';
import EventListItem from './components/EventListItem';


const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
});

export class AllEvents extends Component {

    constructor(props) {
        super(props)
        this.state = {}

        this.renderRow = this.renderRow.bind(this)

    };

    componentDidMount() {
        this.props.getEvents()
    };

    onSearchChange(text) {
        this.setState({ searchTerm: text })
    };

    renderRow(event) {
        return <EventListItem event={event} navigation={this.props.navigation} />
    }

    render() {
        const filteredEvents = this.state.searchTerm ? this.props.events.filter(event => {
            return event.title.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) !== -1
        }) : this.props.events;

        const dataSource = ds.cloneWithRows(filteredEvents);

        return (
            <View>
                <SearchBar 
                    lightTheme
                    onChangeText={(text) => this.onSearchChange(text)}
                    placeholder='Search Events...'
                    placeholderTextColor='#fff'
                />
                <ListView 
                    dataSource={dataSource}
                    renderRow={this.renderRow}
                    enableEmptySections
                />
            </View>
        )
    }
};

const mapStateToProps = ({ events }) => {
    return {
        events,
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: (navigation) => {
            dispatch(logoutUserThunk(navigation))
        },
        getEvents: () => {
            dispatch(getAllEventsThunk())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AllEvents);