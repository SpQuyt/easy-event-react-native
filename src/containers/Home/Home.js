import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Platform,
} from 'react-native';
import { loadEventsAPI } from './../../services/apis'
import styles from './styles'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: 1,
        }
    }

    componentWillMount() {
        loadEventsAPI()
            .then(res => res.json())
            .then(resJSON => {
                for (var i = 0; i < resJSON.events.length; i++) {
                    this.state.data.push(resJSON.events[i])
                }
                console.log(this.state.data)
                this.setState({ loading: 0 })
            })
    }

    render() {
        if (this.state.loading === 0) {
            return (
                <View style={{ flex: 1 }}>
                    <FlatList
                        style={{ flex: 1 }}
                        data={this.state.data}
                        extraData={this.state.data}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item }) =>
                            <View style={styles.GridViewBlockStyle}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate("QR", {
                                            eventname: item.name
                                        })
                                    }}
                                >
                                    <Text style={styles.GridViewInsideTextItemStyle}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            </View>}
                        numColumns={1}
                    />
                </View>
            )
        }
        else {
            return (
                <View style={styles.MainContainer}>
                    <ActivityIndicator size="large" color="red" />
                </View>
            )
        }
    }
}
