import { useSelector } from "react-redux";

function formatCurrency(value) {
  const format =  new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);

  console.log(format)
  return format;
}



function BalanceDisplay() {
  const balance = useSelector((state) => state.account.balance);
  return <div className="balance">{formatCurrency(balance)}</div>;
}

export default BalanceDisplay;
