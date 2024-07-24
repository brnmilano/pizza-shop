import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import SignIn from "./sign-in";
import { HelmetProvider } from "react-helmet-async";

describe("SignIn", () => {
  it("should set default email input value if email is present on search params", () => {
    const wrapper = render(<SignIn />, {
      /**
       * Utilizando a propriedade wrapper, eu consigo testar componentes que dependem de um contexto.
       * Por exemplo, o SignIn
       * @param param0
       * @returns MemoryRouter
       */
      wrapper: ({ children }) => {
        return (
          /**
           * MemoryRouter é um componente que serve para simular a navegação de rotas.
           * A grande diferença para o Router do browser é que a rota fica salva apenas na memória.
           * initialEntries é um array que simula as rotas que o usuário acessou.
           */
          <MemoryRouter initialEntries={["/sign-in?email=johndoe@exemple.com"]}>
            <HelmetProvider>
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </HelmetProvider>
          </MemoryRouter>
        );
      },
    });

    const emailInput = wrapper.getByLabelText("Seu e-mail") as HTMLInputElement;

    expect(emailInput.value).toEqual("johndoe@exemple.com");
  });
});
