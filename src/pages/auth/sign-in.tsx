import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { SignInForm } from "@/models/signInValidationSchema";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [loading, setLoading] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<SignInForm>();

  const handleSignIn = async (data: SignInForm) => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log(data);

      toast.success("Enviamos um link de autenticação para o seu e-mail");
    } catch (error) {
      console.error(error);

      toast.error("Credenciais inválidas", {
        action: {
          label: "Tentar novamente",
          onClick: () => {
            handleSignIn(data);
          },
        },
      });
    }

    setLoading(false);
  };

  return (
    <>
      <Helmet title="Login" />

      <div className="p-8">
        <Button asChild variant="secondary" className="absolute right-8 top-8">
          <Link to="/sign-up">Novo estabelecimento</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-bold">
                Seu e-mail
              </Label>

              <Input id="email" type="email" {...register("email")} />
            </div>

            <Button disabled={loading} type="submit" className="w-full">
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
