import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormMessage,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SigninVaidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import api from "@/services/api";
import { useState } from "react";

const SigninForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof SigninVaidation>>({
    resolver: zodResolver(SigninVaidation),
    defaultValues: {
      access: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SigninVaidation>) {
    setIsLoading(true);
    try {
      const { data: token } = await api.post("/login-user", {
        access: parseInt(values.access),
        key: values.password,
      });
      localStorage.setItem("token", token.token);
      setIsLoading(false);
      navigate("/all-users")
    } catch (error) {
      alert("Não foi");
      setIsLoading(false);

      console.error("Erro ao criar usuário:", error);
    }
  }

  return (
    <main className="w-[80%] md:w-[30%]">
      <div className="justify-center w-full flex items-center">
        <h1 className="font-bold text-2xl pb-4">Entrar na Conta</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center gap-6"
        >
          <FormField
            control={form.control}
            name="access"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID de acesso unico</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
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
              "Entrar"
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center">
            Ainda não tem conta?{" "}
            <Link to="/sign-up" className="text-primary font-bold ml-1">
              Cadastre-se
            </Link>
          </p>
        </form>
      </Form>
    </main>
  );
};

export default SigninForm;
