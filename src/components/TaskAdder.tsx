"use client";

import { useTasksContext } from "@/contexts/TasksContext";
import { TaskEntity, TaskFieldEntity } from "@/interfaces/TaskEntity";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Check, Trash } from "@/assets/Icons";
import { onSnapshot } from "firebase/firestore";

export function TaskAdder() {
  const [newTaskText, setNewTaskText] = useState("");
  const [checkedState, setCheckedState] = useState(false);
  const [tasks, setTasks] = useState<TaskEntity[]>([]);

  const { getTasks, createNewTask, deleteTask, updateTask } = useTasksContext();

  const completedTasks = tasks.filter((task) => task.data.checked);

  const handleChangeText = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskText(event.target.value);
  };

  const handleCreateNewTask = (event: FormEvent) => {
    event.preventDefault();

    const newTask: TaskFieldEntity = {
      checked: false,
      description: newTaskText,
    };

    createNewTask(newTask);
    setNewTaskText("");
    handleGetTasks();
  };

  const handleCheckInput = (
    event: ChangeEvent<HTMLInputElement>,
    task: TaskEntity
  ) => {
    setCheckedState(event.target.checked);
    updateTask(task.id, {
      checked: !task.data.checked,
    });
    handleGetTasks();
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
    handleGetTasks();
  };

  const handleGetTasks = () => {
    const query = getTasks();

    const response: any[] = [];

    onSnapshot(query, (querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        console.log(doc.id);
        response.push({ id: doc.id, data: doc.data() });
        setTasks(response);
      });
    });
  };

  useEffect(() => {
    handleGetTasks();
  }, []);

  return (
    <>
      <form
        onSubmit={handleCreateNewTask}
        className="
          -mt-[2rem]
          flex
          justify-between
          mb-16
          gap-2
        "
      >
        <label
          className="group
        flex
        items-center
        transition-colors
        w-full
        bg-zinc-800
        text-white
        rounded-lg
        border-2
        border-zinc-700
        focus-within:border-violet-600
      "
        >
          <input
            value={newTaskText}
            onChange={handleChangeText}
            placeholder="Adicione uma nova tarefa"
            className="
            p-4
            w-full
            bg-transparent
            outline-none
          "
          />
        </label>
        <button
          className="
            p-4
            text-zinc-300
            bg-blue-600
            rounded-lg
            text-lg
            flex
            justify-center
            items-center
            gap-1
            "
        >
          Criar
        </button>
      </form>

      <div>
        <header
          className="
          text-sm
          flex
          justify-between
        "
        >
          <div className="flex gap-2 items-center">
            <strong
              className="
            text-blue-600
          "
            >
              Tarefas criadas
            </strong>
            <span
              className="bg-zinc-800
            text-zinc-300
            font-bold
            rounded-xl
            px-2
            py-0.5
          "
            >
              {tasks.length}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <strong className="text-violet-600">Tarefas concluídas</strong>
            <span
              className="bg-zinc-800
            text-zinc-300
            font-bold
            rounded-xl
            px-2
            py-0.5
          "
            >
              {completedTasks.length} de {tasks.length}
            </span>
          </div>
        </header>
        <div className="transition-transform mb-12">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`mt-6 flex justify-between 
            items-start p-4 bg-zinc-800 rounded-lg
            outline-1 outline-zinc-400 
            hover:scale-[101%]
            transition-all
            ${task.data.checked ? "opacity-50" : ""}
            `}
            >
              <div className="flex text-sm items-center">
                <label
                  className="
                  flex items-center cursor-pointer
                "
                >
                  <div>
                    <Check
                      size={20}
                      className={
                        task.data.checked
                          ? "text-white bg-violet-600 border-2 border-violet-600 rounded-[50%] p-[0.1rem]"
                          : "bg-transparent rounded-[50%] p-[0.1rem] border-2 border-blue-600 text-transparent"
                      }
                    />
                  </div>
                  <input
                    defaultChecked={task.data.checked}
                    onChange={(event) => handleCheckInput(event, task)}
                    className="
                   opacity-0
                  "
                    type="checkbox"
                  />
                  <p
                    className={`text-zinc-200 select-none ${
                      checkedState ? "line-through" : ""
                    }`}
                  >
                    {task.data.description}
                  </p>
                </label>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="
              border-none 
              outline-none 
              bg-transparent 
              text-zinc-400
              hover:text-zinc-100
              transition-colors
              "
                >
                  <Trash size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
