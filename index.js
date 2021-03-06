/*
  react-native-fullwidth-image

  Original idea taken from
  https://stackoverflow.com/questions/29642685/maintain-aspect-ratio-of-image-with-full-width-in-react-native/40207328
*/

import React, { Component } from 'react'
import { View, Image } from 'react-native'

export default class FullWidthImage extends Component {
    constructor() {
        super()

        this.state = {
            width: this.props.width || null,
            height: this.props.height || null
        }
    }

    _onLayout(event) {
        const containerWidth = event.nativeEvent.layout.width

        if (this.props.ratio) {
            this.setState({
                width: containerWidth,
                height: containerWidth * this.props.ratio
            })
        } else if (this.props.width && this.props.height) {
          this.setState({
              width: containerWidth,
              height: containerWidth * (this.props.height / this.props.width)
          })
        } else if (this.props.source && this.props.source.uri) {
            Image.getSize(this.props.source.uri, (width, height) => {
                this.setState({
                    width: containerWidth,
                    height: containerWidth * height / width
                })
            })
        }
    }

    render() {
        return (
            <View onLayout={this._onLayout.bind(this)}>
                <Image
                    source={this.props.source}
                    style={{
                        width: this.state.width,
                        height: this.state.height
                    }}
                />
            </View>
        )
    }
}
