import { useState, useContext } from "react";
import "./wants.css";
import DeleteButton from "../../../assets/icons8-delete-button-50.svg";
import { BudgetContext } from "../BudgetPlanner";

interface WantsProps {
  index: number;
}

function WantsList({ index }: Readonly<WantsProps>) {
  const { list, addToList, editItem, deleteItem } = useContext(BudgetContext);
  
  const filteredList = list.filter((item) => item.parentIndex === index);
  const newId = (list[list.length - 1]?.id || 0) + 1;

  const wantsObject = () => {
    return {
      id: id,
      parentId: index,
      name: name,
      description: description,
      budget: budget,
      actual: actual,
    };
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [id, setId] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [actual, setActual] = useState("");

  const handleAddClick = () => {
    setIsModalOpen(true);
    if (!isEditMode) {
      setName("");
      setDescription("");
      setBudget("");
      setActual("");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setName("");
    setDescription("");
    setBudget("");
    setActual("");
    setIsEditMode(false);
  };

  const handleEditClick = (id: number) => {
    const item = list.find((item) => item.id === id);

    if (item) {
      setIsEditMode(true);
      setIsModalOpen(true);

      // editing for context
      setId(item.id);
      setName(item.name);
      setDescription(item.description);
      setBudget(item.budget);
      setActual(item.actual);
    }
  };

  const handleDeleteClick = () => {
    deleteItem(id);
    setIsModalOpen(false);
    setIsEditMode(false);
  };

  const handleValueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const value = e.target.value.replace(/,/g, "");
    if (!isNaN(Number(value))) {
      setState(Number(value).toLocaleString());
    }
  };

  const handleFormSubmit = () => {
    const result = wantsObject();
    if (isEditMode) {
      editItem(
        id,
        result.name,
        result.description,
        result.budget,
        result.actual
      );
    } else {
      addToList(
        newId,
        result.parentId,
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
  };

  return (
    <div className="wants-lists-container">
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
                {isEditMode ? "Edit Wants" : "Wants"}
              </h2>
              <div className="delete-button">
                {isEditMode && (
                  <button
                    className="delete-button-icon"
                    onClick={handleDeleteClick}
                    aria-label="Delete">
                    <img src={DeleteButton} alt="Delete" />
                  </button>
                )}
              </div>
            </div>
            <div className="modal-content-container">
              <div className="modal-content-left">
                <div className="want-container">
                  <input
                    type="text"
                    placeholder=""
                    className="want-name-text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <span className="want-name-label">Name</span>
                </div>
                <div className="description-container">
                  <textarea
                    className="want-description-text"
                    placeholder=""
                    maxLength={25}
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <span className="want-description-label">Description</span>
                </div>
              </div>
              <div className="modal-content-right">
                <div className="budget-container">
                  <input
                    type="text"
                    className="budget-text"
                    placeholder=""
                    value={budget}
                    onChange={(e) => handleValueChange(e, setBudget)}
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
                    onChange={(e) => handleValueChange(e, setActual)}
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
      )}
      <div className="wants-lists">
        {filteredList.length > 0 ? (
          filteredList.map((item: any, index: number) => (
            <button
              key={`${item.name}-${index}`}
              className="wants-item"
              onClick={() => handleEditClick(item.id)}
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
          ))
        ) : (
          <span>Click + to add items.</span>
        )}
      </div>
    </div>
  );
}

export default WantsList;
