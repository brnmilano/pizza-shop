import { Helmet } from "react-helmet-async";
import MonthRevenueCard from "./month-revenue-card";
import OrdersAmountCard from "./orders-amount-card";
import DayOrdersAmountCard from "./day-orders-amount-card";
import MonthCanceledOrdersAmountCard from "./month-orders-canceled-amount-card";
import PopularProductsChart from "./popular-products-chart";
import { RevenueChart } from "./revenue-chart";

export default function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tighter">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <MonthRevenueCard />

          <OrdersAmountCard />

          <DayOrdersAmountCard />

          <MonthCanceledOrdersAmountCard />
        </div>

        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />

          <PopularProductsChart />
        </div>
      </div>
    </>
  );
}
