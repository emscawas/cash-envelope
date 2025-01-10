import React, { useState } from "react";
import "./body.css";
import Divider from "../Utils/divider";

function BudgetPlanner() {
  const [income, setIncome] = useState("");
  const [percentage, setPercentage] = useState("");

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    if (!isNaN(Number(value))) {
      setIncome(Number(value).toLocaleString());
    }
  };

  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/%/g, '');
    if (!isNaN(Number(value)) && Number(value) <= 100 || value === '') {
      setPercentage(value);
    }
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
        <div className="percentage-container">
          <input
            type="text"
            className="percentage-text"
            placeholder=""
            value={percentage}
            onChange={handlePercentageChange}
            maxLength={3}
          />
          <span className="percentage-placeholder">Percentage</span>
        </div>
      </form>
      <Divider pixel="3" />
      {/* component for list of budgets allocated */}
      <div className="lists-container">
        <div className="list-item">
          <div className="list-item-title">Rent</div>
          <div className="list-item-amount">$1,000</div>
        </div>
        <div className="list-item">
          <div className="list-item-title">Groceries</div>
          <div className="list-item-amount">$200</div>
        </div>
        <div className="list-item">
          <div className="list-item-title">Utilities</div>
          <div className="list-item-amount">$100</div>
        </div>
        <div className="list-item">
          <div className="list-item-title">Transportation</div>
          <div className="list-item-amount">$100</div>
        </div>
        <div className="list-item">
          <div className="list-item-title">Entertainment</div>
          <div className="list-item-amount">$100</div>
        </div>
        <div className="list-item">
          <div className="list-item-title">Miscellaneous</div>
          <div className="list-item-amount">$100</div>
        </div>
      </div>
      {/* component for footer */}
    </div>
  );
}

export default BudgetPlanner;
