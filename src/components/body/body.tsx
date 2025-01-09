import React, { useState } from "react";
import "./body.css";

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
      {/* another component after this for list of budgets allocated */}
    </div>
  );
}

export default BudgetPlanner;
