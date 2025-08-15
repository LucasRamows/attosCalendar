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
import { SignupVaidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import api from "@/services/api";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof SignupVaidation>>({
    resolver: zodResolver(SignupVaidation),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignupVaidation>) {
    setIsLoading(true);
    try {
      await api.post("/create-user", {
        name: values.username,
        access: parseInt(values.access),
        key: values.password,
        email: values.email,
      });
      navigate("/home");
      setIsLoading(false);
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
      setIsLoading(false);

    }
  }

  return (
    <main className="w-[80%] h-screen md:w-[30%] justify-evenly flex flex-col items-center">
      <div className="flex items-center justify-center">
        {error ? (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Opa!</AlertTitle>
            <AlertDescription>
              Tivemos um problema ao criar a sua conta, verifique as informações
              e tente novamente.
            </AlertDescription>
          </Alert>
        ) : (
          <></>
        )}
      </div>
      <div className="justify-center w-full flex flex-col items-center">
        <img className="w-1/8" src="././public/assets/logo.svg" alt="logo" />

        <h1 className="font-bold text-2xl">Criar Conta</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full justify-center gap-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" className="shad-input" {...field} />
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
                "Criar Conta"
              )}
            </Button>
            <p className="text-small-regular text-light-2 text-center">
              Já tem conta?{" "}
              <Link to="/sign-in" className="text-primary font-bold ml-1">
                Log-in
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default SignupForm;
