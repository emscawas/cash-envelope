import React, { useState, useRef } from "react";
import "./needs.css";

interface NeedItem {
  budget: string;
  actual: string;
  needName: string;
  needDescription: string;
}

function NeedsLists() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [budgetValue, setBudgetValue] = useState("");
  const [actualValue, setActualValue] = useState("");
  const [needsList, setNeedsList] = useState<NeedItem[]>([]);

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleFormSubmit = () => {
    if (budgetValue && actualValue) {
      setNeedsList([
        ...needsList,
        {
          budget: budgetValue,
          actual: actualValue,
          needName: nameRef.current?.value ?? "",
          needDescription: descriptionRef.current?.value ?? "",
        },
      ]);
      setBudgetValue("");
      setActualValue("");
      setIsModalOpen(false);
    } else {
      alert("Please fill in both budget and actual values.");
    }
  };

  const handleBudgetValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    if (!isNaN(Number(value))) {
      setBudgetValue(Number(value).toLocaleString());
    }
  };
  const handleActualValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    if (!isNaN(Number(value))) {
      setActualValue(Number(value).toLocaleString());
    }
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="needs-lists-container">
      <div className="btn-modal">
        <input
          type="button"
          value="+"
          onClick={handleAddClick}
          className="add-needs-button"
        />
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <button
                className="close-button"
                onClick={handleCloseModal}
                aria-label="Close"
              >
                &times;
              </button>
              <div className="modal-content-container">
                <h2 className="modal-content-title">Need Info</h2>
                <div className="modal-content-details">
                  <div className="modal-content-left">
                    <div className="need-container">
                      <input 
                      type="text" 
                      placeholder=""
                      className="need-name-text" 
                      ref={nameRef} />
                      <span className="need-name-label">Name</span>
                    </div>
                    <div className="description-container">
                      <textarea
                        className="need-description-text"
                        placeholder=""
                        maxLength={25}
                        rows={4}
                        ref={descriptionRef}
                      />
                      <span className="need-description-label">Description</span>
                    </div>
                  </div>
                  <div className="modal-content-right">
                    <div className="budget-container">
                      <input
                        type="text"
                        className="budget-text"
                        placeholder=""
                        value={budgetValue}
                        onChange={handleBudgetValueChange}
                        maxLength={12}
                      />
                      <span className="budget-value-label">Budget</span>
                    </div>
                    <div className="actual-container">
                      <input
                        type="text"
                        className="actual-text"
                        placeholder=""
                        value={actualValue}
                        onChange={handleActualValueChange}
                        maxLength={12}
                      />
                      <span className="actual-value-label">Actual</span>
                    </div>
                    <div className="submit-button-container">
                      <input
                        type="button"
                        value="ADD"
                        onClick={handleFormSubmit}
                        className="add-needs-list"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="needs-lists">
        {needsList.map((item, index) => (
          <div key={index} className="needs-item">
            <span>Name: {item.needName}</span>
            <span>Description: {item.needDescription}</span>
            <span>Budget: {item.budget}</span>
            <span>Actual: {item.actual}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NeedsLists;
