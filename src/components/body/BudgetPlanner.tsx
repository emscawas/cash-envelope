import React, { createContext, useState, useMemo, useEffect } from "react";
import "./budgetplanner.css";
import Divider from "../Utils/Divider";
import NeedsLists from "./lists/Needs";
import WantsLists from "./lists/Wants";
import SavingsDebtsList from "./lists/SavingsDebts";

//testing context usage here
interface BudgetItems {
  budget: string;
  actual: string;
  name: string;
  description: string;
  id: number;
  parentIndex: number
}

interface BudgetLists {
  list: BudgetItems[];
  addToList: (
    id: number,
    parentIndex: number,
    name: string,
    description: string,
    budget: string,
    actual: string
  ) => void;
  editItem: (
    id: number,
    name: string,
    description: string,
    budget: string,
    actual: string
  ) => void;
  deleteItem: (id: number, parentIndex: number) => void;
}

export const BudgetContext = createContext<BudgetLists>({
  list: [],
  addToList: () => {},
  editItem: () => {},
  deleteItem: () => {},
});
// end

function BudgetPlanner() {
  const defaultPercentages = ["50", "30", "20"];
  const [income, setIncome] = useState("");
  const [budgetsPercentage, setBudgetsPercentage] = useState(defaultPercentages[0]);
  // const [totalActual, setTotalActual] = useState(0);
  const [currentBudget, setCurrentBudget] = useState(0);
  const [list, setList] = useState<BudgetItems[]>([]);
  const [budgetsPercentages, setBudgetsPercentages] = useState(defaultPercentages);

  // testing context usage here
  const addToList = (
    id: number,
    parentIndex: number,
    name: string,
    description: string,
    budget: string,
    actual: string
  ) => {
    setList((prevList) => [
      ...prevList,
      { id, parentIndex, name, description, budget, actual },
    ]);
  };

  const editItem = (
    id: number,
    name: string,
    description: string,
    budget: string,
    actual: string
  ) => {
    const updatedList = list.map((item) =>
      item.id === id ? { ...item, name, description, budget, actual } : item
    );
    setList(updatedList);
  };

  const deleteItem = (id: number, parentIndex: number) => {
    if (id !== null && parentIndex !== null) {
      const updatedList = list.filter((item) => !(item.id === id && item.parentIndex === parentIndex));
      setList(updatedList);
    }
  };

  const contextValue = useMemo(() => ({ list, addToList, editItem, deleteItem }), [list]);
  // end

  useEffect(() => {
    setBudgetsPercentage(budgetsPercentages[currentBudget]);
  }, [currentBudget, budgetsPercentages]);

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    if (!isNaN(Number(value))) {
      setIncome(Number(value).toLocaleString());
    }

    const elements = document.querySelectorAll(".needs-total-budget");
    elements.forEach((element) => {
      Number(value) > Number(totalActual)
        ? element?.classList.remove("over-budget")
        : element?.classList.add("over-budget");
    });
  };

  const handleBudgetsPercentageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/%/g, "");
    if ((!isNaN(Number(value)) && Number(value) <= 100) || value === "") {
      setBudgetsPercentage(value);
      setBudgetsPercentages((prev) => {
        const newPercentages = [...prev];
        newPercentages[currentBudget] = value;
        return newPercentages;
      });
    }
  };

  const calculateTotalNeeds = () => {
    const totalIncome = Number(income.replace(/,/g, ""));
    const budgetsPercentageValue =
      Number(budgetsPercentage.replace(/%/g, "")) / 100;
    const totalCalculatedValue =
      Math.round(totalIncome * budgetsPercentageValue * 100) / 100;
    return totalCalculatedValue.toLocaleString();
  };

  // const handleTotalActualChange = (total: number) => {
  //   const totalNeed = calculateTotalNeeds().replace(/,/g, "");
  //   const elements = document.querySelectorAll(".needs-total-budget");

  //   elements.forEach((element) => {
  //     total > Number(totalNeed)
  //       ? element?.classList.add("over-budget")
  //       : element?.classList.remove("over-budget");
  //   });

  //   setTotalActual(total);
  // };

  const handleTotalActualChangeV2 = () => {
    const activeBudget = list.filter((item) => item.parentIndex === currentBudget)
    const totalActual = activeBudget.reduce((sum, list) => {
      const actual = isNaN(Number(list.actual)) ? list.actual.replace(/,/g, "") : list.actual;

      return sum + Number(actual)
    }, 0)

    return totalActual;
  }

  // const calculateTotalRemaining = () => {
  //   const totalNeeds = Number(calculateTotalNeeds().replace(/,/g, ""));
  //   const elements = document.querySelectorAll(".total-remaining");
  //   const result = totalNeeds - totalActual;

  //   elements.forEach((element) => {
  //     result < 0
  //       ? element?.classList.add("over-budget")
  //       : element?.classList.remove("over-budget");
  //   });

  //   return result.toLocaleString();
  // };

  const calculateTotalRemainingv2 = () => {
    const totalPercentageValue = Number(calculateTotalNeeds().replace(/,/g, ""))
    const totalActiveBudget = handleTotalActualChangeV2()
    const result = totalPercentageValue - totalActiveBudget

    const elements = document.querySelectorAll(".total-remaining");
    elements.forEach((element) => {
      result < 0
        ? element?.classList.add("over-budget")
        : element?.classList.remove("over-budget");
    });

    return result.toLocaleString();
  }

  const budgetPlannerBody = [
    <NeedsLists index={0} key="needs" />,
    <WantsLists index={1} key="wants" />,
    <SavingsDebtsList index={2} key="sd" />,
  ];

  const title = (currentBudget: number) => {
    switch (currentBudget) {
      case 1:
        return "Wants";
      case 2:
        return "Savings/Debts";
      default:
        return "Needs";
    }
  };

  const nextBudgetPlanner = () => {
    setCurrentBudget((prevIndex) => (prevIndex + 1) % budgetPlannerBody.length);
  };

  const prevBudgetPlanner = () => {
    setCurrentBudget((prevIndex) =>
      prevIndex === 0 ? budgetPlannerBody.length - 1 : prevIndex - 1
    );
  };

  const generatePayloadForAPI = () => {
    const needsList = list.filter((list) => list.parentIndex === 0).map(({id,  parentIndex, ...rest }) => rest);
    const wantsList = list.filter((list) => list.parentIndex === 1).map(({ id, parentIndex, ...rest }) => rest);
    const savingsdebtsList = list.filter((list) => list.parentIndex === 2).map(({ id, parentIndex, ...rest }) => rest);

    const params = {
      income: Number(income.replace(/,/g, "")),
      needs_list: [needsList],
      wants_list: [wantsList],
      savings_debts_list: [savingsdebtsList]
    }

    return (params)
  }

  return (
    <BudgetContext.Provider value={contextValue}>
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
              value={budgetsPercentage}
              onChange={handleBudgetsPercentageChange}
              maxLength={3}
            />
            <span className="percentage-placeholder">Percentage</span>
          </div>
        </form>
        <br />
        <div className="navigations">
          <input
            type="button"
            className="prev-button"
            value="<"
            onClick={prevBudgetPlanner}
          />
          <span>{title(currentBudget)}</span>
          <input
            type="button"
            className="next-button"
            value=">"
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
          <div className="dl-buttons">
            <input
              type="button"
              className="btn-download-excel"
              value="XLSX"
              onClick={() => generatePayloadForAPI()}
            />
          </div>
          <div className="total-texts">
            <div className="total-labels">
              <span className="total-needs">{budgetsPercentage}% of {title(currentBudget)}:</span>
              <span className="needs-total-budget">Total Actual:</span>
              <span className="total-remaining">Remaining:</span>
            </div>
            <div className="total-values">
              <span>{calculateTotalNeeds()}</span>
              <span className="needs-total-budget">
                {handleTotalActualChangeV2().toLocaleString()}
              </span>
              {/* <span className="needs-total-budget">
                {totalActual.toLocaleString()}
              </span> */}
              <span className="total-remaining">
                {calculateTotalRemainingv2()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </BudgetContext.Provider>
  );
}

export default BudgetPlanner;
