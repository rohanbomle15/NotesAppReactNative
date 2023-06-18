import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
  } from "react-native";
  import React from "react";
  import Ionicons from "@expo/vector-icons/Ionicons";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  
  const win = Dimensions.get("window");
  
  export default function NoteItem({ item, setData, data }) {
    const storeData = async () => {
      try {
        await AsyncStorage.setItem("savedNotes", JSON.stringify(data));
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleDetele = () => {
      setData((prev) => prev.filter((data) => data.key != item.key));
      storeData();
    };
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={handleDetele}>
          <View style={styles.flex}>
            <Text>{item.noteTitle}</Text>
            <Ionicons name="trash" size={20} />
          </View>
        </TouchableOpacity>
        <Text>{item.noteText}</Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      width: win.width - 20,
      padding: 10,
      margin: 10,
      borderRadius: 10,
      borderColor: "#0e132b",
      borderWidth: 1,
      borderStyle: "dashed",
    },
    flex: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: "#0e132b",
      paddingBottom: 5,
      marginBottom: 10,
    },
  });