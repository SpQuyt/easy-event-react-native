import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { loginAPI } from './../../services/apis'
import styles from './styles'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loading: 0,
    }
  }

  onLogin = () => {
    this.setState({ loading: 1 });
    if (this.state.username == '') {
      alert("Ô tên người dùng đang để trống!");
      this.setState({ loading: 0 });
    }
    else if (this.state.password == '') {
      alert("Ô mật khẩu đang để trống!");
      this.setState({ loading: 0 });
    }
    else {
      loginAPI(this.state.username, this.state.password)
        .then((res) => res.json())
        .then((resJSON) => {
          if (resJSON.message == "OK") {
            this.props.navigation.navigate('Home', {
              user_id: resJSON.user_id,
              user_name: this.state.username,
            });
          }
          else {
            alert("Sai mật khẩu hoặc tên người dùng!");
          }
          this.setState({ loading: 0 });
        })
    }
  }

  renderLoading() {
    if (this.state.loading === 0) {
      return (
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={this.onLogin}
          >
            <Text style={styles.text}>ĐĂNG NHẬP</Text>
          </TouchableOpacity>
        </View>
      )
    }
    else if (this.state.loading === 1) {
      return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#fb3" />
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.container_img}>
          <Image
            style={styles.head_image}
            source={require("../../../img/Easy-Event.png")} />
        </View>

        <View style={styles.form}>
          <View style={styles.form_input}>
            <TextInput
              placeholder="Tên người dùng..."
              onChangeText={(username) => this.setState({ username })}
            />
          </View>

          <View style={styles.form_input}>
            <TextInput
              placeholder="Mật khẩu..."
              onChangeText={(password) => this.setState({ password })}
              secureTextEntry={true}
            />
          </View>
        </View>

        <View style={styles.button_container}>
          {this.renderLoading()}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "transparent" }]}
            onPress={() => { }}
          >
            <Text>Không có tài khoản? Tạo mới ở đây</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

}