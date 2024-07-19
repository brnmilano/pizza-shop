import { api } from "@/lib/axios";

interface UpdateProfileBody {
  name: string;
  description: string | null;
}

/**
 * Função responsável por atualizar o perfil do usuário.
 *
 * Esta função encapsula uma chamada HTTP PUT usando axios para enviar os dados de atualização do perfil do usuário.
 *
 * @param {SignInBody} Interface contendo os dados de atualização do perfil do usuário.
 * @returns {Promise<void>} Uma Promise que é resolvida quando a requisição PUT é concluída. Não retorna nenhum valor.
 */
export async function updateProfile({ name, description }: UpdateProfileBody) {
  await api.put("/profile", {
    name,
    description,
  });
}
