import React, { useState, useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';

import { 
  KeyboardAvoidingView, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View,
  Platform
} from 'react-native';

import Task from './components/Task';

interface TaskProps {
  title: string;
  id: number;
  check: boolean;
  status: 'done' | 'progress' | 'pending';
};

export default function App() {

  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    console.log({ tasks });
  },[tasks]);

  const handleAddingNewTask = (text: string) => {
    try {
      
      if(!text || text.length < 0 || text === '') {
        window.alert('Titulo invalido!');
        return;
      };

      const obj: TaskProps = {
        title: text,
        id: 0,
        status: 'done',
        check: true
      }

      if(tasks.length !== 0) {
        setTasks(() => tasks.map((item) => item).concat(obj));

        window.alert('Task adicionada com sucesso');
        setText('');
        return;
      } else {
        setTasks([ obj ]);
        setText('');

        window.alert('Task adicionada com sucesso');
        return
      }
    } catch (error) {
      throw 'Ocorreu um erro inesperado: ' + error
    }
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Today`s tasks
      </Text>
      
      {tasks.map(({ title, id, status, check }, index) => (
        <View style={styles.cardContainer} key={index}>
          <Task 
            title={title} 
            key={id} 
            status={status}
            check={check} 
          />
        </View>
      ))}
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? "padding" : "height"}
        style={styles.writeTaskManager}
      >
        <TextInput 
          style={styles.input} 
          placeholder={'Write a task'} 
          value={text || ''}
          onChangeText={(value: string) => setText(value)}
        />
        <TouchableOpacity
          onPress={() => handleAddingNewTask(text)}
        >
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>
              +
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      
      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbdbdb',

    padding: 15
  },
  title: {
    marginTop: 30,
    
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  cardContainer: {
    marginTop: 10,

    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    paddingVertical: 15,
    marginHorizontal: 15,
    
    backgroundColor: '#FFF',
    borderRadius: 60,

    borderColor: '#C0C0C0',
    borderWidth: 1,

    width: 250,
  },
  writeTaskManager: {
    position: 'absolute',
    bottom: 16,
    
    width: '100%',
    
    flexDirection: 'row',
    
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addWrapper: {
    width: 60,
    height: 60,
    
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#C0C0C0',
   
    backgroundColor: '#fff',
    
    justifyContent: 'center',
    alignItems: 'center'
  },
  addText: {

  }
});
