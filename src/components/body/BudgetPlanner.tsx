import React, { useState } from "react";
import "./budgetplanner.css";
import Divider from "../Utils/Divider";
import NeedsLists from "./lists/Needs";
import WantsLists from "../body/lists/Wants";

function BudgetPlanner() {
  const [income, setIncome] = useState("");
  const [needsPercentage, setNeedsPercentage] = useState("50");
  const [totalActual, setTotalActual] = useState(0);
  const [currentBudget, setCurrentBudget] = useState(0);

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

  const handleTotalActualChange = (total: number, lists: object) => {
    const totalNeed = calculateTotalNeeds().replace(/,/g, "");
    const elements = document.querySelectorAll(".needs-total-budget");

    elements.forEach((element) => {
      total > Number(totalNeed) ? element?.classList.add("over-budget") : element?.classList.remove("over-budget");
    });
    
    setTotalActual(total);
  };

  const calculateTotalRemaining = () => {
    const totalNeeds = Number(calculateTotalNeeds().replace(/,/g, ""));
    const elements = document.querySelectorAll(".total-remaining");
    const result = totalNeeds - totalActual;

    elements.forEach((element) => {
      result < 0 ? element?.classList.add("over-budget") : element?.classList.remove("over-budget");
    });

    return result.toLocaleString();
  };

  const budgetPlannerBody = [<NeedsLists needsData={handleTotalActualChange} key="needs" />, <WantsLists wantsData={handleTotalActualChange} key="wants" />];

  const nextBudgetPlanner = () => {
    setCurrentBudget((prevIndex) => (prevIndex + 1) % budgetPlannerBody.length);
    console.log("next")
  };

  const prevBudgetPlanner = () => {
    setCurrentBudget((prevIndex) =>
      prevIndex === 0 ? budgetPlannerBody.length - 1 : prevIndex - 1
    );
    console.log("prev")
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
      <div className="navigations">
        <input 
            type="button"
            className="prev-button"
            value="prev"
            onClick={prevBudgetPlanner}
          />
        <span>{currentBudget == 0 ? "Needs" : "Wants"}</span>
        <input 
          type="button"
          className="prev-button"
          value="next"
          onClick={nextBudgetPlanner}
        />
      </div>
      <Divider pixel="3" />
      {/* component for list of budgets allocated */}
      <div className="lists-tracker">
        {budgetPlannerBody[currentBudget]}
      </div>
      <Divider pixel="3" />
      {/* component for footer */}
      <div className="footer">
        <div className="dl-buttons"></div>
        <div className="total-texts">
          <div className="total-labels">
            <span className="total-needs">{needsPercentage}% of Needs:</span>
            <span className="needs-total-budget">Total Actual:</span>
            <span className="total-remaining">Remaining:</span>
          </div>
          <div className="total-values">
            <span>{calculateTotalNeeds()}</span>
            <span className="needs-total-budget">{totalActual.toLocaleString()}</span>
            <span className="total-remaining">{calculateTotalRemaining()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BudgetPlanner;
