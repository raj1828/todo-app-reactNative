import { useState } from "react";
import { Text, View, Button, Alert, StyleSheet, Modal, SafeAreaView } from "react-native";

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.centerdView}>
      <Modal
      transparent={true} // Make the background transparent
      animationType="slide" // Animation type
      visible={modalVisible}
      
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>My Modal </Text>
          <Text style={styles.modalContent}>This is the content of the modal.</Text>
          <Button title="Close" onPress={() => setModalVisible(false)}  />
        </View>
      </SafeAreaView>
    </Modal>
      
        <View 
      style={{
        height: 60,  
        justifyContent: "space-around",  
        margin: 20,
        flexDirection: "row",
        alignItems: "center",  
      }}
    >
      <Text
        style={{
          fontSize: 40,
          fontWeight: 'bold',
          marginRight: 10,
        }}
      >ToDo App</Text>

      <Button
        title="Add Task"
        style={{ height: 40 }}
        onPress={() => setModalVisible(true)}
      />
    </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  modalContainer: {
    width: '80%', 
    backgroundColor: 'white', 
    borderRadius: 10, 
    padding: 20, 
    elevation: 5, // Android shadow effect
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalContent: {
    fontSize: 16,
    marginBottom: 20,
  },
  centerdView:{
    felx: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})
