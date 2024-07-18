import { api } from "@/lib/axios";

export interface getManagerRestaurantResponse {
  name: string;
  id: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  description: string | null;
  managerId: string | null;
}

/**
 * Função responsável por buscar os dados do gerente do restaurante logado.
 *
 * Esta função encapsula uma chamada HTTP GET usando axios para buscar os dados do gerente do restaurante.
 *
 * @param {getManagerRestaurantResponse} - Interface que contém os dados do gerente do restaurante.
 * @returns {Promise<getManagerRestaurantResponse>} - Uma Promise que é resolvida com os dados do gerente do restaurante.
 */
export async function getManagerRestaurant() {
  const response = await api.get<getManagerRestaurantResponse>(
    "/managed-restaurant",
  );

  return response.data;
}
