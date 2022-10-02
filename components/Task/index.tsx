import { useEffect, useState } from 'react';
import { StyleSheet, Text, View,  } from 'react-native';
import { Checkbox } from 'react-native-paper';

export interface TaskProps {
  title: string;
  key: number;
  check: boolean;
  status: 'pending' | 'done' | 'progress';
}

const styles = StyleSheet.create({
  card: {
    flex: 1,

    width: '100%',

    display: 'flex',
    flexDirection: 'row',
    
    backgroundColor: '#fff',
    borderRadius: 15,

    padding: 25,
    
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    color: '#f60000'
  },
  square: {
    width: 24,
    height: 24,
    
    backgroundColor: "#17a9b0",
    
    opacity: 0.4,

    borderRadius: 5,
    
    marginRight: 15
  },
  itemText: {
    width: '70%',
    maxWidth: '80%',
    color: '#000',
    fontSize: 12
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5
  }
});

const Task = ({ title, key, status, check }: TaskProps) => {
  const [checked, setChecked] = useState<boolean>(false);
  
  useEffect(() => {
    const task = {
      title,
      id: key,
      status,
      check,
    };
    
    console.log({ task }, 'task');

    setChecked(check);
  },[title, key, status, check]);

  return (
    <View style={styles.card} key={key}>
      <View style={styles.square} />
      <Text style={styles.itemText}>
        { title } {'|'} { status }
      </Text>
      <View style={styles.circular} />
      <Checkbox 
        color='#000'
        uncheckedColor='#C9C9C9'
        status={check ? "checked" : 'unchecked'} 
        onPress={() => setChecked(!checked)} 
      />
    </View>
  );
;}

export default Task;