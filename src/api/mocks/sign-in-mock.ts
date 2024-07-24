import { http, HttpResponse } from "msw";
import { SignInBody } from "../sign-in";

/**
 * A tipagem genérica never significa que nunca vou ter parâmetros
 */
export const signInMock = http.post<never, SignInBody>(
  "/authenticate",
  async ({ request }) => {
    /**
     * O objeto `request` contém todas as informações da requisição feita.
     */
    const { email } = await request.json();

    if (email === "johndoe@exemple.com") {
      return new HttpResponse(null, {
        status: 200,
        headers: {
          // Quando uma requisição de autenticação é feita nessa aplicação, o backend
          // usa basicamente um Cookie chamado "auth" para determinar se o usuário está
          // autenticado ou não.
          "Set-Cookie": "auth=sample-jwt",
        },
      });
    }

    return new HttpResponse(null, { status: 401 });
  },
);
