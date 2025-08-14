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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

const SigninForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

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
      navigate("/home");
    } catch (error) {
       setError(true)
      setTimeout(() => {
        setError(false)
      }, 5000);
      setIsLoading(false);

      console.error("Erro ao criar usuário:", error);
    }
  }

  return (
    <main className="w-[80%] h-screen md:w-[30%] justify-center flex flex-col items-center">
      <div className="flex items-center justify-center mb-5">
        {error ? (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Opa!</AlertTitle>
            <AlertDescription>
              Tivemos um problema ao logar na sua conta, verifique as informações
              e tente novamente.
            </AlertDescription>
          </Alert>
        ) : (
          <></>
        )}
      </div>
      <div className="justify-center w-full flex flex-col items-center">
        <img className="w-1/8" src="././public/assets/logo.svg" alt="logo" />
        <h1 className="font-bold text-2xl">Entrar na Conta</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full justify-center gap-6"
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
      </div>
    </main>
  );
};

export default SigninForm;
