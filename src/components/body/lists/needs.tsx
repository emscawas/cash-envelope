import React, { useState, useRef, useEffect } from "react";
import "./needs.css";

interface NeedItem {
  budget: string;
  actual: string;
  name: string;
  description: string;
}

function NeedsLists() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [budgetValue, setBudgetValue] = useState("");
  const [actualValue, setActualValue] = useState("");
  const [needsList, setNeedsList] = useState<NeedItem[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditMode && currentIndex !== null) {
      const item = needsList[currentIndex];
      if (nameRef.current) nameRef.current.value = item.name;
      if (descriptionRef.current) descriptionRef.current.value = item.description;
    }
  }, [isEditMode, currentIndex, needsList]);

  const handleFormSubmit = () => {
    const name = nameRef.current?.value ?? '';
    const description = descriptionRef.current?.value ?? '';

    if (budgetValue && actualValue && name) {
      const newItem = { budget: budgetValue, actual: actualValue, name, description };
      console.log("newItem", newItem);
      if (isEditMode && currentIndex !== null) {
        const updatedList = [...needsList];
        updatedList[currentIndex] = newItem;
        setNeedsList(updatedList);
      } else {
        setNeedsList([...needsList, newItem]);
      }
      setBudgetValue('');
      setActualValue('');
      setIsModalOpen(false);
      setIsEditMode(false);
      setCurrentIndex(null);
    } else {
      alert('Please fill in required fields.');
    }
  };

  const handleEditClick = (index: number) => {
    const item = needsList[index];
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
    if (nameRef.current) nameRef.current.value = '';
    if (descriptionRef.current) descriptionRef.current.value = '';
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setBudgetValue('');
    setActualValue('');
    if (nameRef.current) nameRef.current.value = '';
    if (descriptionRef.current) descriptionRef.current.value = '';
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
                <h2 className="modal-content-title">{isEditMode ? 'Edit Need' : 'Need Info'}</h2>
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
                        value={isEditMode ? 'EDIT' : 'ADD'}
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
          <div key={`${item.name}-${index}`} className="needs-item">
            <div className="list-left">
              <span>Name: {item.name}</span>
              <span>Description: {item.description}</span>
            </div>
            <div className="list-right">
              <span>Budget: {item.budget}</span>
              <span>Actual: {item.actual}</span>
            </div>
            <button onClick={() => handleEditClick(index)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NeedsLists;
