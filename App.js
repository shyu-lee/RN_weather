import React from "react";
import Loading from "./Loading.js";
import * as Location from "expo-location";
import { Alert } from "react-native";
import Axios from "axios";
import Weather from "./Weather";

const API_KEY = "0a3cb14807b5ff17fbbf20fbfc4857a1";

export default class extends React.Component {
  state = {
    isLoading: true
  };
  getWeather = async (latitude, longitude) => {
    const { data } = await Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
    );
    console.log(data);
    this.setState({
      isLoading: false,
      temp: data.main.temp,
      condition: data.weather[0].main
    });
  };
  getLocation = async () => {
    try {
      // throw Error();
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude }
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert("Can't find you", "so Sad");
    }
  };
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading, temp, condition } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <Weather temp={temp} condition={condition} />
    );
  }
}
