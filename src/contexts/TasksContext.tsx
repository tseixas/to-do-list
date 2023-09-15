import {
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import { TaskEntity, TaskFieldEntity } from "../interfaces/TaskEntity";
import firebase from "firebase/compat/app";
import { app, database, auth } from "./firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";

interface TasksContextProps {
  tasks: TaskEntity[];
  getTasks:  () => void;
  createNewTask: (newTask: TaskFieldEntity) => void;
  updateTask: (id: string, body: any) => void;
  deleteTask: (id: string) => void;
}

interface TasksContextProviderProps {
  children: ReactNode;
}

export const TasksContext = createContext({} as TasksContextProps);

export const TasksContextProvider = ({
  children,
}: TasksContextProviderProps) => {
  const [tasks, setTasks] = useState<TaskEntity[]>([]);

  const dbCollection = collection(database, "tasks");

  const createNewTask = (newTask: TaskFieldEntity) => {
    addDoc(dbCollection, {
      description: newTask.description,
      checked: newTask.checked,
    });
  };

  const updateTask = (id: string, body: any) => {
    console.log(id, body);
    updateDoc(doc(database, "tasks", id), body)
  };

  const deleteTask = (id: string) => {
    deleteDoc(doc(database, "tasks", id))
  };

  const getTasks = () => {
    return query(dbCollection);
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        getTasks,
        createNewTask,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = () => useContext(TasksContext);
