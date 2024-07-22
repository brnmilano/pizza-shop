import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  storeProfile,
  StoreProfile,
} from "@/models/storeProfileValidationSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  getManagerRestaurant,
  getManagerRestaurantResponse,
} from "@/api/get-meneger-restaurant";
import { useForm } from "react-hook-form";
import { updateProfile } from "@/api/update-probile";
import { toast } from "sonner";

export default function StoreProfileDialog() {
  const queryClient = useQueryClient();

  const { data: managedRestaurant } = useQuery({
    queryKey: ["meneged-restaurant"],
    queryFn: getManagerRestaurant,
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfile>({
    resolver: zodResolver(storeProfile),
    values: {
      name: managedRestaurant?.name ?? "",
      description: managedRestaurant?.description ?? "",
    },
  });

  function updateManageRestaurantCache({ name, description }: StoreProfile) {
    const cached = queryClient.getQueryData<getManagerRestaurantResponse>([
      "managed-restaurant",
    ]);

    if (cached) {
      queryClient.setQueryData<getManagerRestaurantResponse>(
        ["managed-restaurant"],
        {
          ...cached,
          name,
          description,
        },
      );
    }

    return { cached };
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate({ description, name }) {
      const { cached } = updateManageRestaurantCache({ name, description });

      return { previousProfile: cached };
    },
    onError(_errors, _variables, context) {
      if (context?.previousProfile) {
        updateManageRestaurantCache(context.previousProfile);
      }
    },
  });

  async function handleUpdateProfile(data: StoreProfile) {
    const { name, description } = data;

    try {
      await updateProfileFn({
        name,
        description,
      });

      toast.success("Perfil atualizado com sucesso");
    } catch {
      toast.error("Falha ao atualizar o perfil, tente novamente");
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da Loja</DialogTitle>

        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="gap-4 space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>

            <Input className="col-span-3" id="name" {...register("name")} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>

            <Textarea
              className="col-span-3"
              id="description"
              {...register("description")}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
          </DialogClose>

          <Button
            disabled={isSubmitting}
            type="submit"
            variant="sucess"
            className="mr-2"
          >
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
