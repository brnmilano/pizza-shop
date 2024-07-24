import { http, HttpResponse } from "msw";
import { getManagerRestaurantResponse } from "../get-meneger-restaurant";

export const getManagedRestaurantMock = http.get<
  never,
  never,
  getManagerRestaurantResponse
>("/managed-restaurant", () => {
  return HttpResponse.json({
    id: "custom-restaurant-id",
    name: "Pizza Shop",
    description: "Custom restaurant description",
    createdAt: new Date(),
    managerId: "custom-user-id",
    updatedAt: null,
  });
});
