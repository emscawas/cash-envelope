import { useState, useContext } from "react";
import "./savingsDebts.css";
import DeleteButton from "../../../assets/icons8-delete-button-50.svg";
import { BudgetContext } from "../BudgetPlanner";

interface SavingsDebtsProps {
  index: number;
}

function SavingsDebtsList({ index }: Readonly<SavingsDebtsProps>) {
  const { list, addToList, editItem } = useContext(BudgetContext);

  const savingsDebtsObject = () => {
    return {
      name: name,
      description: description,
      budget: budget,
      actual: actual,
    };
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [actual, setActual] = useState("");

  const handleEditClick = (index: number) => {
    const item = list[index];

    setIsEditMode(true);
    setIsModalOpen(true);

    // editing for context
    setName(item.name);
    setDescription(item.description);
    setBudget(item.budget);
    setActual(item.actual);
  };

  return (
    <div className="sd-lists-container">
      <input
        type="button"
        value="+"
        onClick={() => {
          setIsModalOpen(true);
          if (!isEditMode) {
            setName("");
            setDescription("");
            setBudget("");
            setActual("");
          }
        }}
        // onClick={handleAddClick}
        className="add-needs-button"
      />
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="top-modal-buttons">
              <button
                className="close-button"
                onClick={() => {
                  setIsModalOpen(false);
                  setName("");
                  setDescription("");
                  setBudget("");
                  setActual("");
                  setIsEditMode(false);
                }}
                // onClick={handleCloseModal}
                aria-label="Close">
                &times;
              </button>
              <h2 className="modal-content-title">
                Savings / Debts
                {/* {isEditMode ? "Edit Need" : "Need Info"} */}
              </h2>
              <div style={{ width: "10%" }}>
                {isEditMode && (
                  <button
                    className="delete-button"
                    // onClick={handleDeleteClick}
                    aria-label="Delete">
                    <img src={DeleteButton} alt="Delete" />
                  </button>
                )}
              </div>
            </div>
            <div className="modal-content-container">
              <div className="modal-content-left">
                <div className="sd-container">
                  <input
                    type="text"
                    placeholder=""
                    className="sd-name-text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <span className="sd-name-label">Name</span>
                </div>
                <div className="description-container">
                  <textarea
                    className="sd-description-text"
                    placeholder=""
                    maxLength={25}
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <span className="sd-description-label">Description</span>
                </div>
              </div>
              <div className="modal-content-right">
                <div className="budget-container">
                  <input
                    type="text"
                    className="budget-text"
                    placeholder=""
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
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
                    value={actual}
                    onChange={(e) => setActual(e.target.value)}
                    // onChange={handleActualValueChange}
                    maxLength={12}
                  />
                  <span className="actual-value-label">Actual</span>
                </div>
                <div className="submit-button-container">
                  <input
                    type="button"
                    value={isEditMode ? "EDIT" : "ADD"}
                    // onClick={handleFormSubmit}
                    onClick={() => {
                      const result = savingsDebtsObject();
                      if (isEditMode) {
                        editItem(
                          index,
                          result.name,
                          result.description,
                          result.budget,
                          result.actual
                        );
                      } else {
                        addToList(
                          index,
                          result.name,
                          result.description,
                          result.budget,
                          result.actual
                        );
                      }

                      setName("");
                      setDescription("");
                      setBudget("");
                      setActual("");
                      setIsEditMode(false);
                      setIsModalOpen(false);
                    }}
                    className="add-needs-list"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="sd-lists">
        {list.map((item, index) => (
          <button
            key={`${item.name}-${index}`}
            className="needs-item"
            onClick={() => handleEditClick(index)}
            tabIndex={0}>
            <div className="list-left">
              <span>Name: {item.name}</span>
              <span>Description: {item.description}</span>
            </div>
            <div className="list-right">
              <span>Budget: {item.budget}</span>
              <span>Actual: {item.actual}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SavingsDebtsList;
