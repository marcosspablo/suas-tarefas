import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TaskItem = ({ task, onToggleCompleted, onDeleteTask }) => {
  return (
    <View style={styles.taskContainer}>
      <View style={styles.taskContent}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => onToggleCompleted(task.id)}
        >
          {task.completed && <View style={styles.checkboxChecked} />}
        </TouchableOpacity>
        <Text
          style={[
            styles.taskText,
            task.completed && styles.completedTaskText,
          ]}
        >
          {task.text}
        </Text>
      </View>
      <TouchableOpacity onPress={() => onDeleteTask(task.id)}>
        <Text style={styles.deleteText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    width: 12,
    height: 12,
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
  taskText: {
    fontSize: 16,
    color: '#495057',
  },
  completedTaskText: {
    fontSize: 16,
    color: '#adb5bd',
    textDecorationLine: 'line-through',
  },
  deleteText: {
    fontSize: 14,
    color: '#FF0000',
    marginLeft: 10,
  },
});

export default TaskItem;
