import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../store/user-store";
// import { useTransaction } from "../hooks/react-query-hooks";

function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const Dashboard = () => {
  const user = useUser();
  // const { data: transactions, isLoading } = useTransaction();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

  // if (isLoading) {
  //   return <h1>Loading...</h1>;
  // }
  return (
    <section className="ml-10">
      <h1>Transaction History</h1>

      <ul>
        {user?.transactions &&
          user?.transactions.map((transaction) => (
            <li key={transaction.id} className="flex flex-col mb-3 ">
              N{numberWithCommas(transaction.amount)}
              <span className="text-xs">
                {new Date(transaction.createdAt).toLocaleString()}
              </span>
            </li>
          ))}
      </ul>
    </section>
  );
};
