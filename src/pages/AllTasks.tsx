import Loader from "@/components/shared/Loader";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { searchTask } from "@/lib/validation";
import api from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const AllTasks = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof searchTask>>({
    resolver: zodResolver(searchTask),
    defaultValues: {
      id: "",
    },
  });

  async function onSubmit(values: z.infer<typeof searchTask>) {
    setIsLoading(true);
    try {
      const getAllTasks = async () => {
        const data = await api.get("/get-task", {
          headers: { Authorization: "Bearer " + token },
          params:{id:values.id}
        });
        setTaskData(data.data.name);
      };
      getAllTasks();
      setIsLoading(false);
    } catch (error) {
      alert("Houve um erro e não foi possivel criar o usuario");
      setIsLoading(false);

      console.error("Erro ao criar usuário:", error);
    }
  }

  const token = localStorage.getItem("token");
  const [taskData, setTaskData] = useState();
  useEffect(() => {});

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center gap-6"
        >
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>id</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {isLoading ? (
              <div className="flex-center">
                {" "}
                <Loader />
              </div>
            ) : (
              "Buscar"
            )}
          </Button>
        </form>
      </Form>
      <h1>{taskData}</h1>
    </div>
  );
};

export default AllTasks;
