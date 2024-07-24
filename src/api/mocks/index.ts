import { env } from "@/env";
import { setupWorker } from "msw/browser";
import { signInMock } from "./sign-in-mock";
import { registerRestaurantMock } from "./register-restaurant-mocks";
import { getDayOrderAmoutMock } from "./get-day-orders-amout";
import { getMonthOrdersAmoutMock } from "./get-month-orders-amout";
import { getMonthRevenueMock } from "./get-month-revenue";
import { getMonthCanceledOrdersAmoutMock } from "./get-month-canceled-orders-amount";
import { getDailyRevenueInPeriodMock } from "./get-daily-revenue-in-period-mock";
import { getPopularProductsMock } from "./get-popular-products-mock";
import { getProfileMock } from "./get-profile-mock";
import { getManagedRestaurantMock } from "./get-maneged-restaurant-mock";
import { updateProfileMock } from "./update-profile-mock";
import { getOrdersMock } from "./get-orders-mock";
import { getOrderDetailsMock } from "./get-order-details-mock";
import { approveOrderMock } from "./approve-order-mock";
import { cancelOrderMock } from "./cancel-order-mock";
import { deliverOrderMock } from "./deliver-order-mock";
import { dispatchOrderMock } from "./dispatch-order-mock";

/**
 * No momento em que eu chamo a função setupWorker, os mocks ainda não irão funcionar,
 * as requisições ainda não serão interceptadas. Apenas quando o worker.start() for chamado,
 * é que os mocks vão entrar em ação. A partir deste momento, todas as requisições feitas
 * vão ser interceptadas pelo MSW.
 */
export const worker = setupWorker(
  signInMock,
  registerRestaurantMock,
  getDayOrderAmoutMock,
  getMonthOrdersAmoutMock,
  getMonthRevenueMock,
  getMonthCanceledOrdersAmoutMock,
  getDailyRevenueInPeriodMock,
  getPopularProductsMock,
  getProfileMock,
  getManagedRestaurantMock,
  updateProfileMock,
  getOrdersMock,
  getOrderDetailsMock,
  approveOrderMock,
  cancelOrderMock,
  deliverOrderMock,
  dispatchOrderMock,
);

/**
 * Se o modo de execução for diferente de "test", não é necessário iniciar o worker.
 * O worker só deve ser iniciado em ambiente de teste.
 *
 * A função enableMsw é chamada no arquivo src/main.tsx e faz o seguinte:
 * A variável MODE que está nas minhas variáveis de ambiente é igual a "test"? Se não,
 * não irá fazer nada e irá criar a aplicação React normalmente.
 *
 * Se for igual a test, antes de iniciar a aplicação, eu chamo a função enableMsw que
 * vai iniciar o worker e a partir deste momento, todas as requisições feitas na aplicação
 * vão ser interceptadas pelo MSW.
 *
 * Caso tudo funcione da maneira correta, no console irá aparecer a mensagem: `[MSW] Mocking enabled`.
 */
export async function enableMsw() {
  if (env.MODE !== "test") {
    return;
  }

  await worker.start();
}
