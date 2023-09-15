import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
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
import { onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";

export interface Users {
  id?: string;
  name: string;
  email: string;
}

interface TasksContextProps {
  tasks: TaskEntity[];
  getTasks:  () => void;
  createNewTask: (newTask: TaskFieldEntity) => void;
  updateTask: (id: string, body: any) => void;
  deleteTask: (id: string) => void;
  googleSignIn: () => void;
  logOut: () => void;
  user: Users;
}

interface TasksContextProviderProps {
  children: ReactNode;
}

export const TasksContext = createContext({} as TasksContextProps);

export const TasksContextProvider = ({
  children,
}: TasksContextProviderProps) => {
  const [tasks, setTasks] = useState<TaskEntity[]>([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));

  const dbCollection = collection(database, "tasks");

  const createNewTask = (newTask: TaskFieldEntity) => {
    addDoc(dbCollection, {
      description: newTask.description,
      checked: newTask.checked,
    });
  };

  const updateTask = (id: string, body: any) => {
    updateDoc(doc(database, "tasks", id), body)
  };

  const deleteTask = (id: string) => {
    deleteDoc(doc(database, "tasks", id))
  };

  const getTasks = () => {
    return query(dbCollection);
  }

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  }

  const logOut = () => {
    signOut(auth)
    localStorage.clear()
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      localStorage.setItem('user', JSON.stringify(currentUser))
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <TasksContext.Provider
      value={{
        tasks,
        getTasks,
        createNewTask,
        deleteTask,
        updateTask,
        googleSignIn, 
        logOut, 
        user
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = () => useContext(TasksContext);
