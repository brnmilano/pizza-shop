import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { SignUpForm } from "@/models/signUpValidationSchema";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { registerRestaurant } from "@/api/register-restaurant";

export default function SignUp() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<SignUpForm>();

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  });

  const handleSignUp = async (data: SignUpForm) => {
    const { restaurantName, managerName, email, phone } = data;

    setLoading(true);

    try {
      await registerRestaurantFn({
        restaurantName,
        managerName,
        email,
        phone,
      });

      console.log(data);

      toast.success("Restaurante cadastrado com sucesso!", {
        action: {
          label: "Fazer Login",
          onClick: () => {
            navigate(`/sign-in?email=${email}`);
          },
        },
      });
    } catch (error) {
      console.error(error);

      toast.error("Erro ao cadastrar restaurante.", {
        action: {
          label: "Tentar novamente",
          onClick: () => {
            handleSignUp(data);
          },
        },
      });
    }

    setLoading(false);
  };

  return (
    <>
      <Helmet title="Cadastro" />

      <div className="p-8">
        <Button asChild variant="secondary" className="absolute right-8 top-8">
          <Link to="/sign-in">Fazer Login</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>

            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas!
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="restaurantName" className="font-bold">
                Nome do estabelecimento
              </Label>

              <Input
                id="restaurantName"
                type="text"
                {...register("restaurantName")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName" className="font-bold">
                Seu nome
              </Label>

              <Input
                id="managerName"
                type="text"
                {...register("managerName")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-bold">
                Seu e-mail
              </Label>

              <Input id="email" type="email" {...register("email")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="font-bold">
                Seu celular
              </Label>

              <Input id="phone" type="tel" {...register("phone")} />
            </div>

            <Button disabled={loading} type="submit" className="w-full">
              Finalizar cadastro
            </Button>

            <p className="px-9 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos{" "}
              <a href="" className="underline underline-offset-4">
                Termos de serviço
              </a>{" "}
              e{" "}
              <a href="" className="underline underline-offset-4">
                Políticas de privacidade
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
