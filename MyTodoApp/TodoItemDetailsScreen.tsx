import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  Button,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';


const styles = StyleSheet.create({
  todoItemContainer: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  todoItemText: {
    padding: 5,
    color: 'black',
  },
  buttonContainer: {
    padding: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const TodoItemDetailsScreen = ({ route, navigation }) => {
  const { todoItem } = route.params;
  const [updatedTodoItem, setUpdatedTodoItem] = useState({
    name: todoItem.name,
    isComplete: todoItem.isComplete,
  });

  const handleUpdate = () => {
    Alert.alert(
      'Update Todo Item',
      'Edit the details:',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Update',
          onPress: () => {
            // Implement your update logic here
            // For example, make a PUT request to your API
            fetch(`http://62.12.15.55:8085/api/TodoItems/${todoItem.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedTodoItem),
            })
              .then(response => {
                if (response.ok) {
                  // Successfully updated, navigate back to the previous screen
                  navigation.goBack();
                } else {
                  throw new Error('Failed to update');
                }
              })
              .catch(error => console.error('Error updating todo:', error));
          },
          style: 'default',
        },
      ],
      { cancelable: false }
    );
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirm Deletion',
      `Are you sure you want to delete "${todoItem.name}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            // Implement your delete logic here
            // For example, make a DELETE request to your API
            fetch(`http://62.12.15.55:8085/api/TodoItems/${todoItem.id}`, {
              method: 'DELETE',
            })
              .then(response => {
                if (response.ok) {
                  // Successfully deleted, navigate back to the previous screen
                  navigation.goBack();
                } else {
                  throw new Error('Failed to delete');
                }
              })
              .catch(error => console.error('Error deleting todo:', error));
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <View style={styles.todoItemContainer}>
        <Text style={styles.todoItemText}>{`Name: ${todoItem.name}`}</Text>
        <Text style={styles.todoItemText}>{`Status: ${todoItem.isComplete ? 'Complete' : 'Incomplete'}`}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Delete" onPress={handleDelete} color="red" />

        <Button
          title="Edit Details"
          onPress={handleUpdate}
        />
       
    </View>
  </>
  );
};


export default TodoItemDetailsScreen;