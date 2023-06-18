import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  Pressable,
  Button,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";

import NoteItem from "./components/noteitem";
const win = Dimensions.get("window");

export default function App() {
  const [data, setData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = () => {
    if (title.length < 3 || desc.length < 3) {
      Alert.alert(
        "Come on!",
        "Please add something meaningful...",
        [{ text: "Ok" }]
      );
    } else {
      setData((prev) => [
        {
          noteTitle: title,
          noteText: desc,
          key: Date.now().toString(),
        },
        ...prev,
      ]);
      toggleModal();
      setTitle("");
      setDesc("");
    }
  };
  const getData = async () => {
    try {
      let data = await AsyncStorage.getItem("savedNotes");
      if (data !== null) {
        setData(JSON.parse(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    storeData();
  }, [data]);
  const storeData = async () => {
    try {
      await AsyncStorage.setItem("savedNotes", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.topBar}>
        <Text style={styles.titleText}>Notes(Offline)</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <NoteItem item={item} setData={setData} data={data} />
        )}
      />
      <Pressable style={styles.bottomBar} onPress={toggleModal}>
        <Text style={styles.plus}>+</Text>
      </Pressable>
      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.titleText}>Create a Note</Text>
          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={(val) => setTitle(val)}
            style={styles.inputField}
          />
          <TextInput
            placeholder="Description"
            multiline={true}
            value={desc}
            onChangeText={(val) => setDesc(val)}
            style={styles.inputField}
          />
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={toggleModal} color="#d64161" />
            <Button title="Add Note" onPress={handleSubmit} color="#82b74b" />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topBar: {
    backgroundColor: "#feb236",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    width: win.width,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  bottomBar: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 100,
    height: 50,
    width: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#feb236",
  },
  plus: {
    fontSize: 32,
    color: "#FFF",
    fontWeight: "bold",
  },
  inputField: {
    marginVertical: 12,
    padding: 10,
    backgroundColor: "#ffef96",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});