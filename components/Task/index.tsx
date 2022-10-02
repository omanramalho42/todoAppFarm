import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Checkbox } from 'react-native-paper';

import { TitleTask, Status } from './styled';

interface TaskProps {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'progress' | 'done';
  check: boolean;
  emoji: string;
  setCheck: (value: any) => void;
  handleRemoveTask: (value: string) => void;
}

const styles = StyleSheet.create({
  card: {
    width: '95%',

    display: 'flex',
    flexDirection: 'row',
    
    backgroundColor: '#4d4d4d',
    borderRadius: 15,

    padding: 15,
    
    justifyContent: 'space-between',
    alignItems: 'center',

    boxShadow: '0 0 12px 6px rgba(0, 0, 0, 0.3)'
  },
  title: {
    marginTop: 30,
    
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  square: {
    width: 24,
    height: 24,
    
    backgroundColor: "#4dd2ff",
    
    opacity: 0.4,

    borderRadius: 5,
    
    marginRight: 15
  },
  itemText: {
    width: '50%',
    maxWidth: '80%',
    color: '#fff',
    fontSize: 12
  }
});

const Task = ({ 
  title, 
  status, 
  check, 
  id, 
  description, 
  setCheck, 
  emoji, 
  handleRemoveTask 
}: TaskProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.square}>
        <Text>
          { emoji }
        </Text>
      </View>

      <TitleTask style={styles.itemText}>
        { title }
      </TitleTask>
      
      <Status status={status} />

      {/* <Checkbox 
        color='#fff'
        uncheckedColor='#C9C9C9'
        status={checked ? 'checked' : 'indeterminate'} 
        onPress={() => setChecked((value: boolean) => !value)} 
      /> */}
      <Button 
        icon="delete" 
        mode="text"
        color='red'
        style={{ backgroundColor: 'transparent' }}
        onPress={() => handleRemoveTask(title)}
      >
      </Button>
    </View>
  );
;}

export default Task;