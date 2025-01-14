import React, { useState } from "react";
import "./needs.css";

function NeedsLists() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="needs-lists-container">
      <div className="needs-lists">
        test
      </div>
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
              <span>Need</span>
              <input type="text" />
              <br />
              <span>description</span>
              <input type="text" />
              <br />
              <span>budget</span>
              <input type="text" />
              <br />
              <span>actual</span>
              <input type="text" />

              {/* Add your form or content here */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NeedsLists;
