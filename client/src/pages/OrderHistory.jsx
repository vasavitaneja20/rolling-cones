import { useEffect, useState } from "react";

import NavBar from "../components/NavBar";
import OrderCard from "../components/OrderCard";

import API from "../api/axios";

import "../styles/pages/StaffDashboard.css";

function OrderHistory() {

  const [orders, setOrders] =
    useState([]);

  const [page, setPage] =
    useState(1);

  const [hasMore, setHasMore] =
    useState(true);

  const LIMIT = 12;


  useEffect(() => {

    const fetchHistory =
      async () => {

        try {

          const response =
            await API.get(
              `/api/orders/history?page=${page}&limit=${LIMIT}`
            );

          setOrders(
            response.data.orders
          );

          setHasMore(
            response.data.hasMore
          );

        } catch (error) {

          console.error(error);

        }
      };

    fetchHistory();

  }, [page]);


  return (

    <>

      <NavBar cartCount={0} />

      <main className="staff-dashboard container">

        <header className="staff-dashboard__header">

          <h1>
            Order History
          </h1>

          <p>
            Archived completed orders
          </p>

        </header>


        <section className="staff-dashboard__grid">

          {orders.length === 0 ? (

            <div className="staff-dashboard__empty">

              <h2>
                No history found
              </h2>

            </div>

          ) : (

            orders.map((order) => (

              <OrderCard
                key={order.orderNumber}
                orderId={order.orderNumber}
                items={order.items}
                totalAmount={order.totalAmount}
                status={order.orderStatus}
              />

            ))

          )}

        </section>


        <div className="staff-dashboard__pagination">

          <button
            onClick={() =>
              setPage((prev) => prev - 1)
            }
            disabled={page === 1}
          >

            Previous

          </button>


          <span>
            Page {page}
          </span>


          <button
            onClick={() =>
              setPage((prev) => prev + 1)
            }
            disabled={!hasMore}
          >

            Next

          </button>

        </div>

      </main>

    </>

  );
}

export default OrderHistory;