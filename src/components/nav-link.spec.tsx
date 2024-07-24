import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavLink from "./nav-link";

describe("NavLink", () => {
  it("should highlight the nav link when is the current page link", () => {
    const wrapper = render(
      <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </>,
      {
        /**
         * Utilizando a propriedade wrapper, eu consigo testar componentes que dependem de um contexto.
         * Por exemplo, o NavLink depende do contexto de rotas para saber se ele é a rota atual.
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
            <MemoryRouter initialEntries={["/about"]}>{children}</MemoryRouter>
          );
        },
      },
    );

    expect(wrapper.getByText("Home").dataset.current).toEqual("false");
    expect(wrapper.getByText("About").dataset.current).toEqual("true");

    wrapper.debug();
  });
});
