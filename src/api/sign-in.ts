import { api } from "@/lib/axios";

export interface SignInBody {
  email: string;
}

/**
 * Função responsável por logar o usuário.
 *
 * Esta função encapsula uma chamada HTTP POST usando axios para enviar os
 * dados de login do usuário para a rota "/authenticate".
 *
 * @param {SignInBody} signInData - Interface que contém os dados necessários para logar o usuário.
 * @returns {Promise<void>} Uma Promise que é resolvida quando a requisição POST é concluída. Não retorna nenhum valor.
 */
export async function signIn({ email }: SignInBody): Promise<void> {
  await api.post("/authenticate", { email });
}
