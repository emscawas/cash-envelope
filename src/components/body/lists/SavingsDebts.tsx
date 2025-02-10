import { useRef, useState, useContext } from "react";
import "./savingsDebts.css";
import DeleteButton from "../../../assets/icons8-delete-button-50.svg";
import { BudgetContext } from "../BudgetPlanner";

interface SavingsDebtsProps {
  index: number;
}

function SavingsDebtsList({ index }: Readonly<SavingsDebtsProps>) {
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const {list, addToList} = useContext(BudgetContext);

  console.log('si list daw ', list)

  const test = () => {
    
  let name = (document.querySelector('.sd-name-text') as HTMLInputElement)?.value;
  let description = (document.querySelector('.sd-description-text') as HTMLInputElement)?.value;
  let budget = (document.querySelector('.budget-text') as HTMLInputElement)?.value;
  let actual = (document.querySelector('.actual-text') as HTMLInputElement)?.value;
    let object = {
      name: name,
      description: description,
      budget: budget,
      actual: actual,
    }

    return object;
  }
  console.log('test ', test())

  const [isModalOpen, setIsModalOpen] = useState(false);
 
  return (
    <div className="sd-lists-container">
        <input
          type="button"
          value="+"
          onClick={() => {setIsModalOpen(true)}}
          // onClick={handleAddClick}
          className="add-needs-button"
        />
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <div className="top-modal-buttons">
                <button
                  className="close-button"
                  onClick={() => {setIsModalOpen(false)}}
                  // onClick={handleCloseModal}
                  aria-label="Close">
                  &times;
                </button>
                <h2 className="modal-content-title">
                  Savings / Debts
                  {/* {isEditMode ? "Edit Need" : "Need Info"} */}
                </h2>
                <div style={{width: '10%'}}>
                {/* {isEditMode && (
                  <button
                    className="delete-button"
                    // onClick={handleDeleteClick}
                    aria-label="Delete">
                    <img src={DeleteButton} alt="Delete" />
                  </button>
                )} */}
                </div>
              </div>
              <div className="modal-content-container">
                <div className="modal-content-left">
                  <div className="sd-container">
                    <input
                      type="text"
                      placeholder=""
                      className="sd-name-text"
                      ref={nameRef}
                    />
                    <span className="sd-name-label">Name</span>
                  </div>
                  <div className="description-container">
                    <textarea
                      className="sd-description-text"
                      placeholder=""
                      maxLength={25}
                      rows={4}
                      ref={descriptionRef}
                    />
                    <span className="sd-description-label">
                      Description
                    </span>
                  </div>
                </div>
                <div className="modal-content-right">
                  <div className="budget-container">
                      <input
                        type="text"
                        className="budget-text"
                        placeholder=""
                        // value={budgetValue}
                        // onChange={handleBudgetValueChange}
                        maxLength={12}
                      />
                      <span className="budget-value-label">Budget</span>
                    </div>
                    <div className="actual-container">
                      <input
                        type="text"
                        className="actual-text"
                        placeholder=""
                        // value={actualValue}
                        // onChange={handleActualValueChange}
                        maxLength={12}
                      />
                      <span className="actual-value-label">Actual</span>
                    </div>
                    <div className="submit-button-container">
                      <input
                        type="button"
                        value="ADD"
                        // value={isEditMode ? "EDIT" : "ADD"}
                        // onClick={handleFormSubmit}
                        onClick={() => {
                          const result = test();
                          addToList(index, result.name, result.description, result.budget, result.actual);
                        }}
                        className="add-needs-list"
                      />
                    </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default SavingsDebtsList;
