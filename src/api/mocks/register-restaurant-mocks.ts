import { http, HttpResponse } from "msw";
import { RegisterRestaurantBody } from "../register-restaurant";

/**
 * A tipagem genérica never significa que nunca vou ter parâmetros
 */
export const registerRestaurantMock = http.post<never, RegisterRestaurantBody>(
  "/restaurants",
  async ({ request }) => {
    /**
     * O objeto `request` contém todas as informações da requisição feita.
     */
    const { restaurantName } = await request.json();

    if (restaurantName === "Pizza Shop") {
      return new HttpResponse(null, { status: 201 });
    }

    return new HttpResponse(null, { status: 401 });
  },
);
