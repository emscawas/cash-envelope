import React, { useState } from "react";
import "./body.css";
import Divider from "../Utils/divider";
import NeedsLists from "./lists/needs";

function BudgetPlanner() {
  const [income, setIncome] = useState("");
  const [needsPercentage, setNeedsPercentage] = useState("50");
  const [totalActual, setTotalActual] = useState(0);

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    if (!isNaN(Number(value))) {
      setIncome(Number(value).toLocaleString());
    }
  };

  const handleNeedsPercentageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/%/g, "");
    if ((!isNaN(Number(value)) && Number(value) <= 100) || value === "") {
      setNeedsPercentage(value);
    }
  };

  const calculateTotalNeeds = () => {
    const totalIncome = Number(income.replace(/,/g, ""));
    const needsPercentageValue =
      Number(needsPercentage.replace(/%/g, "")) / 100;
    const totalCalculatedValue =
      Math.round(totalIncome * needsPercentageValue * 100) / 100;
    return totalCalculatedValue.toLocaleString();
  };

  const handleTotalActualChange = (total: number) => {
    const totalNeed = calculateTotalNeeds().replace(/,/g, "");
    if (total > Number(totalNeed)) {
      document
        .querySelector(".needs-total-budget")
        ?.classList.add("over-budget");
    }
    setTotalActual(total);
  };

  const calculateTotalRemaining = () => {
    const totalNeeds = Number(calculateTotalNeeds().replace(/,/g, ""));
    const result = totalNeeds - totalActual;
    if (result < 0) {
      document.querySelector(".total-remaining")?.classList.add("over-budget");
    }
    return result.toLocaleString();
  };

  return (
    <div className="body">
      {/* make this component for budgetting forms */}
      <form className="budget-form">
        <div className="income-container">
          <input
            type="text"
            className="income-text"
            placeholder=""
            value={income}
            onChange={handleIncomeChange}
            maxLength={12}
          />
          <span className="income-placeholder">Total Income</span>
        </div>
        <div className="needs-percentage-container">
          <input
            type="text"
            className="needs-percentage-text"
            placeholder=""
            value={needsPercentage}
            onChange={handleNeedsPercentageChange}
            maxLength={3}
          />
          <span className="needs-percentage-placeholder">Percentage</span>
        </div>
      </form>
      <br />
      <Divider pixel="3" />
      {/* component for list of budgets allocated */}
      <div className="lists-tracker">
        <NeedsLists onTotalActualChange={handleTotalActualChange} />
      </div>
      <Divider pixel="3" />
      {/* component for footer */}
      <div className="footer">
        <div className="dl-buttons"></div>
        <div className="total-texts">
          <span className="total-needs">
            {needsPercentage}% of Needs: {calculateTotalNeeds()}
          </span>
          <span className="needs-total-budget">
            Total Actual: {totalActual.toLocaleString()}
          </span>
          <span className="total-remaining">
            Remaining: {calculateTotalRemaining()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BudgetPlanner;
