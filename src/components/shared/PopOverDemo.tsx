import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import api from "@/services/api";
import { Loader } from "lucide-react";
import { useState } from "react";
import SuccessPopUp from "./SuccessPopUp";
import ErrorPopUp from "./ErrorPopUp";
import type { Task } from "@/pages/home/HomePage";

interface PopoverDemoProps {
  onTaskCreated?: (task: Task) => void; // recebe a função do pai
}

export function PopoverDemo({ onTaskCreated }: PopoverDemoProps) {
  const token = localStorage.getItem("token");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    value = value.replace(/\D/g, "");

    if (value.length > 8) value = value.slice(0, 8);

    if (value.length > 4) {
      value = value.replace(/(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3");
    } else if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{0,2})/, "$1/$2");
    }

    setDate(value);
  };
  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      console.log("Submitting task:", { name, date, desc, isChecked });
      const response = await api.post("/create-task", {

        name: name,
        date: date,
        description: desc,
        isPriority: isChecked,

      },
        { headers: { Authorization: "Bearer " + token } }
      );
      setIsLoading(false);
      setSuccess(true);
      if (onTaskCreated) onTaskCreated(response.data);
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
      setName("");
      setDate("");
      setDesc("");
      setIsChecked(false);
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      setName("");
      setDate("");
      setDesc("");
      setIsChecked(false);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
      setIsLoading(false);
    }

  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="default" className="bg-green-500">Criar Nova Tarefa</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Criar uma nova tarefa</h4>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Nome da Tarefa</Label>
              <Input
                id="name"
                value={name}
                className="col-span-2 h-8"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Data</Label>
              <Input
                id="data"
                value={date}
                placeholder="01/02/2005"
                onChange={(e) => handleDateChange(e)}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Descrição</Label>
              <Input
                id="description"
                placeholder="..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="col-span-2 h-8"
              />
            </div>
            <div className=" grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Prioridade</Label>
              <Input
                type="checkbox"
                id="isPriority"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="w-[10%] col-span-2 h-8"
              />
            </div>
            <Button onClick={() => handleSubmit()} type="submit">
              {isLoading ? (
                <div className="flex-center">
                  {" "}
                  <Loader />
                </div>
              ) : (
                "Criar"
              )}
            </Button>
            <SuccessPopUp success={success} />
            <ErrorPopUp error={error} />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
