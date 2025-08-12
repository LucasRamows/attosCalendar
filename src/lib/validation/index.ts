import * as z from "zod";

export const SignupVaidation = z.object({
  username: z.string().min(2, {message: "Campo não pode ficar vazio"}).max(50),
  email: z.string().endsWith(".com", {message:"Insira um email valido."}),
  access: z.string().min(1, {message: "Campo não pode ficar vazio"}).max(50),
  password: z.string().min(8,{message: "Minimo 8"}),
});

export const SigninVaidation = z.object({
  access: z.string().min(1, {message: "Campo não pode ficar vazio"}).max(50),
  password: z.string().min(4,{message: "Minimo 8"}),
});

export const searchTask = z.object({
  id: z.string().min(1, {message: "Campo não pode ficar vazio"}).max(50),
});