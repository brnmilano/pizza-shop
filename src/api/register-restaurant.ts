import { api } from "@/lib/axios";

export interface RegisterRestaurantBody {
  restaurantName: string;
  managerName: string;
  email: string;
  phone: string;
}

/**
 * Função responsável por registrar um restaurante.
 *
 * Esta função encapsula uma chamada HTTP POST usando axios para enviar os
 * dados de registro de um restaurante para a rota "/restaurants".
 *
 * @param {RegisterRestaurantBody} restaurantData - Interface que contém os dados necessários para registrar um restaurante.
 * @returns {Promise<void>} - Uma Promise que é resolvida quando a requisição POST é concluída. Não retorna nenhum valor.
 */
export async function registerRestaurant({
  restaurantName,
  managerName,
  email,
  phone,
}: RegisterRestaurantBody): Promise<void> {
  await api.post("/restaurants", {
    restaurantName,
    managerName,
    email,
    phone,
  });
}
