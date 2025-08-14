import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Loader } from "lucide-react";
import { useState } from "react";

export function PopoverDemo() {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = () => {
    console.log(name);
    console.log(date);
    console.log(desc);
    console.log(isChecked);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Criar Nova Tarefa</Button>
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
                className="col-span-2 h-8"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Data</Label>
              <Input
                id="data"
                placeholder="01/02/2005"
                onChange={(e) => setDate(e.target.value)}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Descrição</Label>
              <Input
                id="description"
                placeholder="..."
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
           <Button type="submit">
              {isLoading ? (
                <div className="flex-center">
                  {" "}
                  <Loader />
                </div>
              ) : (
                "Criar"
              )}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
