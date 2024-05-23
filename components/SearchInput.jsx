import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { icons } from "../constants";
const SearchInput = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white font-pregular flex-1 "
        value={value}
        placeholder="Search for a video topic"
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !showPassword}
      />

      <TouchableOpacity>
        <Image className="w-5 h-5" resizeMode="contain" source={icons.search} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
