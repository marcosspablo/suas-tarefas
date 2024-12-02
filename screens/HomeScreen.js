import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TaskItem from '../components/TaskItem';
import TaskInput from '../components/TaskInput';

const HomeScreen = () => {
  const [taskText, setTaskText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [tasks, setTasks] = useState({
    incomplete: [],
    completed: [],
  });

  const categories = ['Todas', 'Trabalho', 'Pessoal', 'Estudos'];

  // Função para gerar a saudação com base na hora do dia
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return 'Bom dia';
    } else if (hour < 18) {
      return 'Boa tarde';
    } else {
      return 'Boa noite';
    }
  };

  const addTask = (category) => {
    if (taskText.trim()) {
      const newTask = {
        id: Date.now().toString(),
        text: taskText,
        category,
        completed: false,
      };
      setTasks((prevState) => ({
        ...prevState,
        incomplete: [...prevState.incomplete, newTask],
      }));
      setTaskText('');
    }
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks((prevState) => {
      const task = [...prevState.incomplete, ...prevState.completed].find(
        (task) => task.id === taskId
      );

      const newIncompleteTasks = prevState.incomplete.filter(
        (task) => task.id !== taskId
      );
      const newCompletedTasks = prevState.completed.filter(
        (task) => task.id !== taskId
      );

      if (task.completed) {
        return {
          incomplete: [...newIncompleteTasks, { ...task, completed: false }],
          completed: newCompletedTasks,
        };
      } else {
        return {
          incomplete: newIncompleteTasks,
          completed: [...newCompletedTasks, { ...task, completed: true }],
        };
      }
    });
  };

  const deleteCompletedTask = (taskId) => {
    setTasks((prevState) => ({
      ...prevState,
      completed: prevState.completed.filter((task) => task.id !== taskId),
    }));
  };

  // Filtrar tarefas por categoria
  const filterTasksByCategory = (taskList) => {
    if (selectedCategory === 'Todas') return taskList;
    return taskList.filter((task) => task.category === selectedCategory);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{getGreeting()},</Text>
      <Text style={styles.greetingSubText}>Bem-vindo ao seu gerenciador de tarefas!</Text>

      <TaskInput
        value={taskText}
        onChangeText={setTaskText}
        onAddTask={() => addTask(selectedCategory)}
      />

      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.listTitle}>Tarefas Pendentes</Text>
      <FlatList
        data={filterTasksByCategory(tasks.incomplete)}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggleCompleted={toggleTaskCompletion}
            onDeleteTask={deleteCompletedTask}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      <Text style={styles.listTitle}>Tarefas Concluídas</Text>
      <FlatList
        data={filterTasksByCategory(tasks.completed)}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggleCompleted={toggleTaskCompletion}
            onDeleteTask={deleteCompletedTask}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f9fa', // Fundo suave
      padding: 20,
    },
    greetingContainer: {
      alignItems: 'center', // Centraliza horizontalmente
      marginBottom: 20, // Espaçamento entre a saudação e os outros elementos
    },
    greeting: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 5,
      textAlign: 'center', // Garante alinhamento de texto central
    },
    greetingSubText: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center', // Centraliza o subtítulo também
    },
    categoryContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 15,
    },
    categoryButton: {
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 20,
      backgroundColor: '#e9ecef', // Cor neutra
      borderWidth: 1,
      borderColor: '#ced4da',
    },
    selectedCategory: {
      backgroundColor: '#007AFF',
      borderColor: '#007AFF',
    },
    categoryText: {
      fontSize: 14,
      color: '#495057',
      fontWeight: 'bold',
    },
    listTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#343a40',
      marginTop: 20,
      marginBottom: 10,
    },
  });
  

export default HomeScreen;
