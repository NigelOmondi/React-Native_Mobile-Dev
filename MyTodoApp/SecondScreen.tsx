import React, { useEffect, useState } from 'react';
import { StyleSheet,
         ActivityIndicator,
         View,
         Text,
         Button,
         Alert,
         SafeAreaView,
         SectionList,
         StatusBar,
         TextInput,
         TouchableOpacity,
        } from 'react-native';
import CheckBox from '@react-native-community/checkbox';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      backgroundColor: 'white',
    },
    header: {
      alignItems: 'center',
      padding: 10,
    },
    inputContainer: {
      marginHorizontal: 16,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
    },
    buttonContainer: {
      alignItems: 'center',
      padding: 10,
    },
    todoItemContainer: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
    },
    todoItemText: {
      padding: 5,
      color: 'black',
    },
  });
  


const SecondScreen = ({ navigation }) => {

    const [todoItemsList, setTodoItemsList] = useState([]);
    const [newTodoItem, setNewTodoItem] = useState({ name: '', isComplete: false });
    const [isLoading, setIsLoading] = useState(true);
   
    const [completedTasks, setCompletedTasks] = useState({});
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const sections = [
                { title: 'Incomplete', data: todoItemsList.filter(item => !item.isComplete) },
                { title: 'Complete', data: todoItemsList.filter(item => item.isComplete) },
    ];

    const handleTaskCompletionChange = () => {
        setNewTodoItem(prevState => ({ ...prevState, isComplete: !prevState.isComplete }));
    };

    useEffect(() => {
        setIsLoading(true);
    
        // Fetch data from the API endpoint
        fetch('http://62.12.115.55:8085/api/TodoItems')
          .then(response => response.json())
          .then(data => setTodoItemsList(data))
          .catch(error => console.error('Error fetching data:', error))
          .finally(() => setIsLoading(false));
      }, []);
    
      useEffect(() => {
        // Enable or disable the button based on the input values
        setIsButtonDisabled(newTodoItem.name === '');
      }, [newTodoItem.name]);
    
      const handleAddTodo = () => {
        const todoItemWithCompletion = { ...newTodoItem, completionStatus: newTodoItem.isComplete ? 'Complete' : 'Incomplete' };
    
        fetch('http://62.12.115.55:8085/api/TodoItems', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(todoItemWithCompletion),
        })
          .then(response => response.json())
          .then(data => {
            setTodoItemsList(prevState => [...prevState, data]);
            setCompletedTasks(prevState => ({ ...prevState, [data.id]: data.isComplete }));
            setNewTodoItem({ name: '', isComplete: false });
          })
          .catch(error => console.error('Error adding todo:', error));
      };
    
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={{ fontSize: 18, color: 'black' }}>
              What tasks do you want to track today...
            </Text>
          </View>
          <View style={styles.inputContainer}>
          <TextInput
            style={{
              borderWidth: 1,
              height: 40,
              padding: 10,
              color: 'black',
            }}
            placeholder="Enter Task Title ..."
            placeholderTextColor="black"
            value={newTodoItem.name}
            onChangeText={text => setNewTodoItem(prevState => ({ ...prevState, name: text }))}
          />
          </View>
          <View style={styles.checkboxContainer}>
            <Text style={{ color: 'black' }}>Is the Task Complete?</Text>
            <CheckBox
              title="Is Complete"
              value={newTodoItem.isComplete}
              onValueChange={handleTaskCompletionChange}
              tintColors={{ true: 'black', false: 'black' }}
            />
            <Text> {newTodoItem.isComplete ? '👍' : '👎'}</Text>
          </View>

          <View style={styles.buttonContainer}>
          <Button
            title="Add Todo"
            onPress={handleAddTodo}
            disabled={isButtonDisabled}
          />
          </View>
    
          <View style={{ alignItems: 'center', padding: 10, flex: 1 }}>
            {isLoading ? (
              <Text style={{ color: 'blue',fontSize: 16 }}>Loading data...</Text>
            ) : (
              <SectionList
                sections={sections}
                keyExtractor={(item, index) => item.id.toString() + index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                     onPress={() => navigation.navigate('TodoItemDetails', { todoItem: item })}
                  >
                    <View style={styles.todoItemContainer}>
                      <Text style={styles.todoItemText}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                renderSectionHeader={({ section: { title } }) => (
                  <View>
                    <Text style={{ color: 'black', fontSize: 24 }}>{title}</Text>
                  </View>
                )}
              />
            )}
          </View>
        </SafeAreaView>
      );
    };
    
    export default SecondScreen;