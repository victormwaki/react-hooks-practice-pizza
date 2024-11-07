import React, { useState, useEffect } from "react";

// PizzaForm component for adding or updating a pizza
function PizzaForm({ pizzaToEdit, onSubmit }) {
  // Initialize the form data state to hold topping, size, and vegetarian status
  const [formData, setFormData] = useState({
    topping: "",
    size: "Small",
    vegetarian: false,
  });

  // When pizzaToEdit changes (i.e., editing a pizza), update the form fields
  useEffect(() => {
    if (pizzaToEdit) {
      // Set form data with the values from the pizza to be edited
      setFormData({
        topping: pizzaToEdit.topping,
        size: pizzaToEdit.size,
        vegetarian: pizzaToEdit.vegetarian,
      });
    } else {
      // Reset form fields when there's no pizza to edit (for adding a new pizza)
      resetForm();
    }
  }, [pizzaToEdit]);

  // Function to handle input changes for all form fields
  function handleInputChange(event) {
    const { name, value, type } = event.target;
    // Determine the new value, especially for radio buttons
    const newValue = type === "radio" ? value === "Vegetarian" : value;

    // Update formData state with new values
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  }

  // Function to handle form submission
  function handleFormSubmit(event) {
    event.preventDefault(); // Prevent page reload

    // Pass the form data to the onSubmit function, including ID if editing
    if (pizzaToEdit) {
      onSubmit({ ...formData, id: pizzaToEdit.id });
    } else {
      onSubmit({ ...formData });
    }

    // Clear the form after submission
    resetForm();
  }

  // Helper function to reset the form fields to default values
  function resetForm() {
    setFormData({
      topping: "",
      size: "Small",
      vegetarian: false,
    });
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="form-row">
        {/* Input for Pizza Topping */}
        <div className="col-5">
          <input
            className="form-control"
            type="text"
            name="topping"
            placeholder="Pizza Topping"
            value={formData.topping}
            onChange={handleInputChange}
          />
        </div>

        {/* Dropdown for Pizza Size */}
        <div className="col">
          <select
            className="form-control"
            name="size"
            value={formData.size}
            onChange={handleInputChange}
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>

        {/* Radio Buttons for Vegetarian/Non-Vegetarian */}
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Vegetarian"
              checked={formData.vegetarian === true}
              onChange={handleInputChange}
            />
            <label className="form-check-label">Vegetarian</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Not Vegetarian"
              checked={formData.vegetarian === false}
              onChange={handleInputChange}
            />
            <label className="form-check-label">Not Vegetarian</label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="col">
          <button type="submit" className="btn btn-success">
            {pizzaToEdit ? "Update Pizza" : "Add Pizza"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default PizzaForm;
