import React, { useState, useEffect, useCallback } from 'react';

import { StatusBar } from 'expo-status-bar';

import { 
  DefaultTheme, 
  Provider as PaperProvider, 
  Badge, 
  Button, 
  TextInput as Input,
  Switch 
} from 'react-native-paper';

import { 
  KeyboardAvoidingView, 
  StyleSheet, 
  Text,
  View,
  Platform,
  Keyboard,
  FlatList,
  Modal,
  SafeAreaView,
  Pressable
} from 'react-native';

import Task from './components/Task';

interface TaskProps {
  title: string;
  id: string;
  status: 'pending' | 'progress' | 'done';
  description: string;
  emoji: string;
  check: boolean;
}

export default function App() {

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'tomato',
      secondary: 'yellow',
    },
  };

  const [text, setText] = useState<string>('');
  const [check, setCheck] = useState<boolean>(false);

  const [tasks, setTasks] = useState<TaskProps[]>([]);

  const validation = (text: string) => {
    if(text === '' || text.length === 0) {
      window.alert('Texto inválido!');
      setText('');
      return false;
    }
    
    //TRANSFORMANDO CADA CARACTERE EM UM ARRAY PARA EFEITO DE COMPARACAO
    const arrayCharactersText = text.split('');
    const specialCharacters = ['#','@','!'];

    //VERIFICAR SE OS CARACTERES SAO VALIDOS
    for(let i = 0;i < specialCharacters.length;i++) {
      const existSpecialChar = arrayCharactersText.some((char) => char === specialCharacters[i]);
      if(existSpecialChar) {
        window.alert('Voce nao pode inserir caracteres especiais');
        setText('');
        return false;
      }
    }

    //VERIFICAR SE JA EXISTE UM ITEM COM TITULO IGUAL
    const exists = tasks.some(({ title }) => title.includes(text));
    if(exists) {
      window.alert('Voce nao pode inserir um titulo que já existe');
      setText('');
      return false;
    }

    return true;
  }
  
  const handleAddingNewTask = useCallback(({ 
    title, 
    status = 'pending', 
    description, 
    emoji = '✅'
  }: any, event?: Event ) => {
    Keyboard.dismiss();

    console.log(
      title, 
      description, 
      emoji, 
      status, 
      'body'
    );

    try {
      event?.preventDefault();

      if(!validation(title)) {
        // window.alert('Ocorreu um erro!');
        // throw 'Texto inválido!';
        return;
      }

      const obj: any = {
        title: title.trim(),
        description: title.description,
        status,
        emoji,
        check: check,
        id: '0'
      }

      if(tasks.length === 0) {
        setTasks([obj]);
        window.alert('Task criada com sucesso!');
        setShowModal((value) => !value);

        return;
      } else {
        setTasks(tasks.map(({ 
          title, 
          description,
          emoji,
          check, 
          status, 
          id 
        }, idx ) => 
          ({ title, 
            description, 
            emoji,
            check: check, 
            status, 
            id: `${idx}${id}` 
          })
        ).concat(obj));

        setShowModal((value) => !value);
        window.alert('Task criada com sucesso!');
      }

      setCheck(false);
      setText('');
      return;
    } catch (error: any) {
      throw 'Ocorreu um erro inesperado: '+ error;
    }
  },[check, tasks]);

  const handleRemoveTask = (id: string) => {
    try {
      //REMOVER APENAS SE FOR EXATAMENTE IGUAL!
      if(tasks.length > 0) {
        const filteredTasks: TaskProps[] = tasks.filter((item) => 
          !item.title.includes(id) && { item }
        );
        setTasks(filteredTasks);

        window.alert('Task removida com sucesso! #' +id);
        return
      }
    } catch (error: any) {
      throw 'Ocorreu um erro ao remover a task:  ' + error
    }
  }

  const [data, setData] = useState<any[] | null>(null);
  const [emojs, setEmojs] = useState<any[] | null>(null);

  useEffect(() => {
    if(tasks) {
      setData(tasks);

      const statusEmoj = [
        { icon: '🐮' },
        { icon: '🤠' },
        { icon: '🐶' },
        { icon: '🚜' },
        { icon: '🐣' },
        { icon: '🧹' },
        { icon: '🐴' },
        { icon: '🐤' }
      ];
      
      setEmojs(statusEmoj);
    };
  },[tasks]);

  const handleCreateNewTask = async (
    title: string, 
    description: string, 
    emoji?: string, 
    status?: string
  ) => {
    try {
      const body = {
        title,
        description,
        status,
        emoji,
      };

      if(description === '') {
        window.alert('Preencha o campo de descricao');
        setDescription('');
        return;
      }

      if(responsible === '') {
        window.alert("Preencha o campo do responsável");
        setResponsible('');
        return;
      }

      if(title === '') {
        window.alert('Preencha o campo de titulo');
        setTitle('');
        return;
      }

      await handleAddingNewTask(body);

      setDescription('');
      setTitle('');
      setFilter('');
      setResponsible('');
    } catch (error: any) {
      throw 'Ocorreu um erro inesperado' + error;
    }
  };

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [responsible, setResponsible] = useState<string>('');
  const [emoji, setEmoji] = useState<string>('');

  const [showModal, setShowModal] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);

  const [filter,setFilter] = useState<string>('');
  
  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <View 
          style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-around' 
          }}
      >
        <Text style={styles.title}>
          Farm task 🐮
        </Text>
        <Switch 
          style={{ marginLeft: 40 }}
          value={toggle}
          onValueChange={() => 
            setToggle((value) => !value
          )}
          color='#000'
        />
      </View>

        <Modal 
          animationType='slide'
          transparent={false}
          visible={showModal}
          onRequestClose={() => {
              window.alert('O modal foi fechado com sucesso!');
              setShowModal((value) => !value);
          }}
        >
          <SafeAreaView>
            <Button
              icon=''
              onPress={() => setShowModal(!showModal)}
            >
              Voltar
            </Button>
            <View 
              style={{ 
                padding: 15, 
                display: 'flex', 
                flexDirection: 'column' 
              }}
            >  
              <Text>Insira o nome da task...</Text>
              <Input 
                keyboardType='default' 
                placeholder='Informe o titulo da task' 
                value={title}
                style={{ marginBottom: 20 }}
                onChangeText={(text) => setTitle(text)}
              />
              
              <Text>Insira a descrição da task...</Text>
              <Input 
                keyboardType='default' 
                placeholder='Informe a descrição da task' 
                value={description} 
                style={{ marginBottom: 20 }}
                onChangeText={(text) => setDescription(text)}
              />

              
              <Text>Insira um responsável para a task...</Text>
              <Input 
                keyboardType='default' 
                placeholder='Informe o responsável da task' 
                value={responsible} 
                style={{ marginBottom: 20 }}
                onChangeText={(text) => setResponsible(text)}
              />
              
              <Text>Selecione um ícone para task...</Text>
              <FlatList 
                data={emojs} 
                style={{ 
                  marginTop: 5, 
                  marginBottom: 15 
                }}
                horizontal
                renderItem={({ item }: any) => (
                  <View style={{ padding: 10 }}>
                    <Button 
                      onPress={() => setEmoji(item.icon)}
                    >
                      <Text
                        style={{ 
                          fontSize: 30, 
                          backgroundColor: `${item.icon === emoji ? 'rgba(0,0,0,0.2)' : 'transparent'}`,
                        }}
                      >
                        { item.icon }
                      </Text>
                    </Button>
                  </View>
                )}
              />

              {/* <Text>Selecione o dia da task...</Text>
              <View style={{ marginBottom: 10 }}>
                <Text>
                  Date
                </Text>
              </View> */}

              {/* <Text>Escolha a localização onde a tarefa será feita...</Text>
              <View 
                style={{ 
                  marginBottom: 10, 
                  height: 175, 
                  borderWidth: 1, 
                  opacity: 0.4, 
                  backgroundColor: '#d99d9d9', 
                  borderColor: '#c9c9c9', 
                  borderRadius: 10 
                }}
              >
                <Text>MAP</Text>
              </View> */}
            </View>

            <Button 
              onPress={() => 
                handleCreateNewTask(title, description)
              }
              loading={description.length === 0 || title.length === 0}
            >
                + CRIAR TASK
            </Button>
          </SafeAreaView>
        </Modal>

        <FlatList
          data={filter.length > 0 ? 
            data?.filter((i) => 
              i.title
              .toLowerCase()
              .includes(filter.toLowerCase())
            ) : ( data ) 
          }
          renderItem={({ item }: any) => (
            <View style={styles.cardContainer}>
              <Task 
                emoji={item.emoji}
                check={item.check}
                id={item.id}
                status={item.status}
                description={item.description}
                title={item.title}
                handleRemoveTask={handleRemoveTask}
                setCheck={setCheck}
                key={item.id}
              />
            </View>
          )}
          style={{ marginBottom: 50 }}
          horizontal={false}
          ListEmptyComponent={() => (
            <View>
              <Text>Create a new task...</Text>
            </View>
          )}
        />
        
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? "padding" : "height"}
          style={styles.writeTaskManager}
        >
          <View>
            <Input
              right
              disabled={tasks.length === 0}
              mode={'flat'}
              placeholder="Find your task"
              selectionColor='#000'
              underlineColor='#5537ff'
              activeUnderlineColor='#cd10f3'
              dense
              style={styles.input}
              value={filter || ''}
              onChangeText={(value: string) => setFilter(value)}
            />
          </View>
    
            <Badge 
              visible={tasks.length > 0} 
              style={{ 
                backgroundColor: '#74c3ff', 
                margin: 3, 
                position: 'absolute', 
                top: -25, 
                right: -10 
              }}
            >
              {tasks.length}
            </Badge>
            <View style={styles.addWrapper}>
                <Button 
                  icon="" 
                  mode="contained"
                  disabled={text.length > 20}
                  style={{ 
                    backgroundColor: '#1198ff', 
                    borderRadius: 10, 
                    height: '100%', 
                    alignItems: 'center', 
                    justifyContent: 'center'
                  }}
                  onPress={() => 
                    setShowModal((value) => !value)
                  }
                >
                  <Text style={styles.addText}>
                    +
                  </Text>
                </Button>
            </View>
        </KeyboardAvoidingView>

        <StatusBar />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbdbdb',

    alignItems: 'center',

    padding: 20
  },
  title: {
    marginTop: 30,
    marginBottom: 20,
    
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  addText: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
