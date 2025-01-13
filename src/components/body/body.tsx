import React, { useState } from "react";
import "./body.css";
import Divider from "../Utils/divider";

function BudgetPlanner() {
  const [income, setIncome] = useState("");
  const [needsPercentage, setNeedsPercentage] = useState("50");

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    if (!isNaN(Number(value))) {
      setIncome(Number(value).toLocaleString());
    }
  };

  const handleNeedsPercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/%/g, '');
    if (!isNaN(Number(value)) && Number(value) <= 100 || value === '') {
      setNeedsPercentage(value);
    }
  };

  const calculateTotalNeeds = () => {
    const totalIncome = Number(income.replace(/,/g, ''));
    const needsPercentageValue = Number(needsPercentage.replace(/%/g, '')) / 100;
    return totalIncome * needsPercentageValue;
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
      <Divider pixel="3" />
      {/* component for footer */}
      <div className="footer">
        <div className="dl-buttons"></div>
        <div className="total-texts">
          <span className="total-needs">{calculateTotalNeeds()}</span>
          <span className="needs-total-budget">Total:</span>
        </div>
      </div>
    </div>
  );
}

export default BudgetPlanner;
