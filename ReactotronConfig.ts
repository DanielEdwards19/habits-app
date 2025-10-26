import Reactotron from "reactotron-react-native";

Reactotron.configure({
  name: "Habitlys",
}) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!

export default Reactotron;

