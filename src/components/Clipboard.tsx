"use client"

import { Task } from "./Task";
import { TaskEntity } from "@/interfaces/TaskEntity";

interface ClipboardProps {
  tasks: TaskEntity;
}

export function Clipboard({ tasks }: ClipboardProps) {
  return (
    <div>
      <header
        className="
          text-sm
          flex
          justify-between
        "
      >
        <div className="flex gap-2 items-center">
          <strong className="
            text-blue-600
          ">Tarefas criadas</strong>
          <span className="bg-zinc-800
            text-zinc-300
            font-bold
            rounded-xl
            px-2
            py-0.5
          ">{tasks.length}</span>
        </div>
        {/* <div className="flex gap-2 items-center">
          <strong
            className="text-violet-600"
          >Tarefas concluídas</strong>
          <span className="bg-zinc-800
            text-zinc-300
            font-bold
            rounded-xl
            px-2
            py-0.5
          ">{completedTasks.length} de {tasks.length}</span>
        </div> */}
      </header>
      <div className="transition-transform mb-12">
      <label className="group
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
      ">
      </label>
        {
          tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
            />
          )
          )
        }
      </div>
    </div>
  )
}