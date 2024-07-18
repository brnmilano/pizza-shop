import { api } from "@/lib/axios";

export interface getProfileResponse {
  name: string;
  id: string;
  email: string;
  phone: string | null;
  role: "manager" | "customer";
  createdAt: Date | null;
  updatedAt: Date | null;
}

/**
 * Função responsável por buscar os dados do usuário logado.
 *
 * Esta função encapsula uma chamada HTTP GET usando axios para buscar os dados do usuário logado.
 *
 * @param {getProfileResponse} - Interface que contém os dados do usuário logado.
 * @returns {Promise<getProfileResponse>} - Uma Promise que é resolvida com os dados do usuário logado.
 */
export async function getProfile() {
  const response = await api.get<getProfileResponse>("/me");

  return response.data;
}
