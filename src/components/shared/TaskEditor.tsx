import { useState, useEffect } from "react";
import api from "@/services/api";

function TaskEditor({ task }: { task:any }) {
  const [taskDesc, setTaskDesc] = useState(task?.description);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (task.id && taskDesc.trim() !== "") {
        api.put(`/update-task/${task.id}`, { description: taskDesc })
          .then(() => console.log("Descrição salva!"))
          .catch(err => console.error(err));
      }
    }, 5000);

    return () => clearTimeout(delay); 
  }, [taskDesc, task.id]);

  return (
    <textarea
      className="w-screen h-full bg-transparent outline-none resize-none text-white text-lg"
      value={taskDesc}
      onChange={(e) => setTaskDesc(e.target.value)}
      placeholder="Selecione uma task para editar..."
    ></textarea>
  );
}

export default TaskEditor