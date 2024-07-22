import { api } from "@/lib/axios";

/**
 * Função para deslogar o usuário
 *
 * @returns {Promise<void>} Uma Promise que é resolvida quando a requisição POST é concluída. Não retorna nenhum valor.
 */
export async function signOut() {
  await api.post("/sign-out");
}
