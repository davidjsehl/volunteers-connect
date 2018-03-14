import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
const ImagePicker = require('react-native-image-picker');
import { uploadPostThunk } from '../reducers/post';

export class Post extends Component {


    

    _pickImage () {
        ImagePicker.showImagePicker({
            title: 'Select Image/Video',
            mediaType: 'mixed',
            videoQuality: 'high'
        }, response => {
            console.log('resssssssponsee', response)
            this.props.uploadPost(response)
        })
    }
    render () {
        console.log('propppssssssss', this.props)
        return (
            <View>
                <Button title="submit" onPress={this._pickImage.bind(this)}/>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        uploadPost: (response) => {
            dispatch(uploadPostThunk(response))
        }
    }
}

export default connect(null, mapDispatchToProps)(Post)