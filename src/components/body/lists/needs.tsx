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
  const descriptionRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = () => {
    if (budgetValue && actualValue) {
      setNeedsList([
        ...needsList,
        {
          budget: budgetValue,
          actual: actualValue,
          needName: nameRef.current?.value || "",
          needDescription: descriptionRef.current?.value || "",
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
              <span className="close-button" onClick={handleCloseModal}>
                &times;
              </span>
              <span>Need Name</span>
              <input type="text" className="income-text" ref={nameRef} />
              <br />
              <span>description</span>
              <input type="text" className="income-text" ref={descriptionRef} />
              <br />
              <span>budget</span>
              <input
                type="text"
                className="income-text"
                placeholder=""
                value={budgetValue}
                onChange={handleBudgetValueChange}
                maxLength={12}
              />
              <br />
              <span>actual</span>
              <input
                type="text"
                className="income-text"
                placeholder=""
                value={actualValue}
                onChange={handleActualValueChange}
                maxLength={12}
              />
              <input
                type="button"
                value="Submit"
                onClick={handleFormSubmit}
                className="add-needs-list"
              />
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
