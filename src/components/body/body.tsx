import React, { useState } from 'react';
import './body.css';

function BudgetPlanner() {
  const [income, setIncome] = useState('');
  const [percentage, setPercentage] = useState('');

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    if (!isNaN(Number(value))) {
      setIncome(Number(value).toLocaleString());
    }
  };

  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/%/g, '');
    if (!isNaN(Number(value)) || value === '') {
      setPercentage(value ? `${value}%` : '');
    }
  };

  return (
    <div className="body">
      {/* make this component for budgetting forms */}
      <form className='budget-form'>
        <input
          type="text"
          className='income-text'
          placeholder=''
          value={income}
          onChange={handleIncomeChange}
          maxLength={12}
        />
        <span className='income-placeholder'>Total Income</span>
        <input
          type="text"
          className='percentage-text'
          placeholder=''
          value={percentage}
          onChange={handlePercentageChange}
          maxLength={3}
        />
        <span className='percentage-placeholder'>Percentage</span>
      </form>

      {/* another component after this for list of budgets allocated */}
    </div>
  );
}

export default BudgetPlanner;