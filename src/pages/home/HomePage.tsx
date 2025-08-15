import { PopoverDemo } from "@/components/shared/PopOverDemo";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { useRef } from "react";

interface Task {
  id: number;
  name: string;
  description?: string;
  date?: string;
  isPriority?: boolean;
  status: boolean;
  remaining?: string;
}

const HomePage = () => {
  const [taskData, setTaskData] = useState<Task[]>([]);
  const [singleTask, setSingleTask] = useState<Task | undefined>(undefined);
  const [taskDesc, setTaskDesc] = useState<string>("");
  const token = localStorage.getItem("token");
  const addTask = (newTask: Task) => {
    setTaskData((prev) => [...prev, newTask]);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/get-tasks", {
          headers: { Authorization: "Bearer " + token },
          params: { token },
        });
        setTaskData(res.data);
      } catch (err) {
        console.error("Erro ao buscar tasks:", err);
      }
    };
    fetchTasks();
  }, [token]);

  const onTaskClick = (taskId: number) => {
    const task = taskData.find((t) => t.id === taskId);
    if (task) {
      setSingleTask(task);
      setTaskDesc(task.description || "");
    }
  };

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskDesc(e.target.value);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      if (!singleTask) return;

      try {
        await api.put(
          `/update-task/${singleTask.id}`,
          {
            description: taskDesc,
            status: false,
            isPriority: singleTask.isPriority,
          },
          { headers: { Authorization: "Bearer " + token } }
        );
        console.log("Descrição salva!");

        setTaskData((prev) =>
          prev.map((task) =>
            task.id === singleTask.id
              ? { ...task, description: taskDesc }
              : task
          )
        );
      } catch (err) {
        console.error(err);
      }
    }, 5000);
  };

  const onCheckClick = async (id: number) => {
    try {
      const res = await api.put(
        `/update-task/${id}`,
        { status: true },
        { headers: { Authorization: "Bearer " + token } }
      );

      console.log("Task atualizada:", res.data);

      setTaskData((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Erro ao atualizar task:", err);
    }
  };

  return (
    <div className="flex h-screen w-full gap-2">
      <div className="w-1/2 flex flex-col items-start gap-2">
        <PopoverDemo onTaskCreated={addTask}></PopoverDemo>
        <ul className="bg-red-400 rounded-2xl flex flex-col p-4 w-full">
          {taskData
            .filter((task) => task.isPriority)
            .map((task) => (
              <li
                className="w-full flex justify-between items-center cursor-pointer rounded-lg transition-colors duration-200 hover:bg-gray-200/30 p-2"
                key={task.id}
                onClick={() => onTaskClick(task.id)}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={() => onCheckClick(task.id)}
                    className="w-4 h-4 accent-green-500"
                  />
                </div>
                <p>{task.name}</p>
                <p>{task.date}</p>
              </li>
            ))}
        </ul>

        <ul className="bg-yellow-200 rounded-2xl flex flex-col p-4 w-full">
          {taskData
            .filter((task) => !task.isPriority)
            .map((task) => (
              <li
                className="w-full flex justify-between items-center cursor-pointer rounded-lg transition-colors duration-200 hover:bg-gray-400/30 p-2"
                key={task.id}
                onClick={() => onTaskClick(task.id)}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={() => onCheckClick(task.id)}
                    className="w-4 h-4 accent-green-500"
                  />
                </div>
                <p>{task.name}</p>
                <p>{task.date}</p>
              </li>
            ))}
        </ul>
      </div>

      <div className="w-1/2 h-full bg-gray-500 rounded-2xl flex p-4">
        {singleTask ? (
          <textarea
            className="w-screen h-full bg-transparent outline-none resize-none text-white text-lg"
            value={taskDesc}
            onChange={(e) => handleChange(e)}
            placeholder="Selecione uma task para editar..."
          ></textarea>
        ) : (
          <p className="text-white">Selecione uma tarefa para editar</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;

export type { Task };
