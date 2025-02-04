import React, { useState, useRef, useEffect } from "react";
import "./wants.css";
import DeleteButton from "../../../assets/icons8-delete-button-50.svg";

interface WantItem {
  budget: string;
  actual: string;
  name: string;
  description: string;
}

function WantsLists({
  onTotalActualChange,
}: Readonly<{ onTotalActualChange: (total: number) => void }>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [budgetValue, setBudgetValue] = useState("");
  const [actualValue, setActualValue] = useState("");
  const [wantsList, setWantsList] = useState<WantItem[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditMode && currentIndex !== null) {
      const item = wantsList[currentIndex];
      if (nameRef.current) nameRef.current.value = item.name;
      if (descriptionRef.current)
        descriptionRef.current.value = item.description;
    }
    calculateTotalActual(wantsList);
  }, [isEditMode, currentIndex, wantsList]);

  const handleFormSubmit = () => {
    const name = nameRef.current?.value ?? "";
    const description = descriptionRef.current?.value ?? "";

    if (budgetValue && actualValue && name) {
      const newItem = {
        budget: budgetValue,
        actual: actualValue,
        name,
        description,
      };
      if (isEditMode && currentIndex !== null) {
        const updatedList = [...wantsList];
        updatedList[currentIndex] = newItem;
        setWantsList(updatedList);
      } else {
        setWantsList([...wantsList, newItem]);
      }
      setBudgetValue("");
      setActualValue("");
      setIsModalOpen(false);
      setIsEditMode(false);
      setCurrentIndex(null);
    } else {
      alert("Please fill in required fields.");
    }
  };

  const handleEditClick = (index: number) => {
    const item = wantsList[index];
    setBudgetValue(item.budget);
    setActualValue(item.actual);
    if (nameRef.current) nameRef.current.value = item.name;
    if (descriptionRef.current) descriptionRef.current.value = item.description;
    setIsEditMode(true);
    setCurrentIndex(index);
    setIsModalOpen(true);
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
    if (nameRef.current) nameRef.current.value = "";
    if (descriptionRef.current) descriptionRef.current.value = "";
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setBudgetValue("");
    setActualValue("");
    if (nameRef.current) nameRef.current.value = "";
    if (descriptionRef.current) descriptionRef.current.value = "";
    setIsModalOpen(false);
    setIsEditMode(false);
  };

  const calculateTotalActual = (list: WantItem[]) => {
    const total = list.reduce(
      (sum, item) => sum + Number(item.actual.replace(/,/g, "")),
      0
    );
    onTotalActualChange(total);
  };

  const handleDeleteClick = () => {
    if (currentIndex !== null) {
      const updatedList = wantsList.filter(
        (_, index) => index !== currentIndex
      );
      setWantsList(updatedList);
      setBudgetValue("");
      setActualValue("");
      if (nameRef.current) nameRef.current.value = "";
      if (descriptionRef.current) descriptionRef.current.value = "";
      setIsModalOpen(false);
      setIsEditMode(false);
      setCurrentIndex(null);
      calculateTotalActual(updatedList);
    }
  };

  return (
    <div className="wants-lists-container">
      <div className="btn-modal">
        <input
          type="button"
          value="+"
          onClick={handleAddClick}
          className="add-wants-button"
        />
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <div className="top-modal-buttons">
                <button
                  className="close-button"
                  onClick={handleCloseModal}
                  aria-label="Close">
                  &times;
                </button>
                <h2 className="modal-content-title">
                  {isEditMode ? "Edit Want" : "Want Info"}
                </h2>
                {isEditMode && (
                  <button
                    className="delete-button"
                    onClick={handleDeleteClick}
                    aria-label="Delete">
                    <img src={DeleteButton} alt="Delete" />
                  </button>
                )}
              </div>
              <div className="modal-content-container">
                <div className="modal-content-details">
                  <div className="modal-content-left">
                    <div className="need-container">
                      <input
                        type="text"
                        placeholder=""
                        className="need-name-text"
                        ref={nameRef}
                      />
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
                      <span className="need-description-label">
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
                        value={isEditMode ? "EDIT" : "ADD"}
                        onClick={handleFormSubmit}
                        className="add-wants-list"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="wants-lists">
        {wantsList.map((item, index) => (
          <button
            key={`${item.name}-${index}`}
            className="wants-item"
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

export default WantsLists;
