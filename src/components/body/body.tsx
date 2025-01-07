import './body.css';

function BudgetPlanner() {
  return (
    <div className="body">
      <form className='budget-form'>
        <input type="number" className='income-text' placeholder=''/>
        <span className='income-placeholder'>Total Income</span>
      </form>
    </div>
  );
}

export default BudgetPlanner;