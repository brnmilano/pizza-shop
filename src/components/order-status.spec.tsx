import { render } from "@testing-library/react";
import OrderStatus from "./order-status";

describe("Order Status", () => {
  it("should display the right text when order status is pending", () => {
    const wrapper = render(<OrderStatus status="pending" />);

    const statusText = wrapper.getByText("Pendente");
    const badgeElement = wrapper.getByTestId("badge");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-slate-400");
  });

  it("should display the right text when order status is canceled", () => {
    const wrapper = render(<OrderStatus status="canceled" />);
    const badgeElement = wrapper.queryByTestId("rose");

    const statusText = wrapper.getByText("Cancelado");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-rose-500");
  });

  it("should display the right text when order status is delivering", () => {
    const wrapper = render(<OrderStatus status="delivering" />);
    const badgeElement = wrapper.queryByTestId("amber");

    const statusText = wrapper.getByText("Em entrega");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-amber-500");
  });

  it("should display the right text when order status is processing", () => {
    const wrapper = render(<OrderStatus status="processing" />);
    const badgeElement = wrapper.queryByTestId("amber");

    const statusText = wrapper.getByText("Em preparo");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-amber-500");
  });

  it("should display the right text when order status is delivered", () => {
    const wrapper = render(<OrderStatus status="delivered" />);
    const badgeElement = wrapper.queryByTestId("emerald");

    const statusText = wrapper.getByText("Entregue");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-emerald-500");
  });
});
