import React, { useState, useEffect } from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

// Main App component to manage the pizza app
function App() {
  // State to hold list of pizzas
  const [pizzas, setPizzas] = useState([]);
  
  // State to hold the pizza being edited
  const [pizzaToEdit, setPizzaToEdit] = useState(null);

  // Fetch pizzas from the server when the component first mounts
  useEffect(() => {
    fetch("http://localhost:3001/pizzas")
      .then((res) => res.json()) // Convert response to JSON
      .then((data) => setPizzas(data)); // Store the data in pizzas state
  }, []); //dependancy array

  // Function to handle form submission (for adding or editing a pizza)
  function handleFormSubmit(updatedPizza) {
    if (updatedPizza.id) {
      // Edit existing pizza by sending a PATCH request
      fetch(`http://localhost:3001/pizzas/${updatedPizza.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPizza),
      })
        .then((res) => res.json()) // Get updated pizza from server
        .then((newPizza) => {
          // Update the pizza list with the edited pizza
          setPizzas((prevPizzas) =>
            prevPizzas.map((pizza) =>
              pizza.id === newPizza.id ? newPizza : pizza
            )
          );
          setPizzaToEdit(null); // Clear the pizzaToEdit state
        });
    } else {
      // Add new pizza by sending a POST request
      fetch("http://localhost:3001/pizzas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPizza),
      })
        .then((res) => res.json()) // Get newly created pizza from server
        .then((newPizza) => {
          // Add new pizza to the pizzas list
          setPizzas((prevPizzas) => [...prevPizzas, newPizza]);
        });
    }
  }

  return (
    <>
      <Header />
      {/* Pass the pizza to edit and the form submission handler to PizzaForm */}
      <PizzaForm pizzaToEdit={pizzaToEdit} onSubmit={handleFormSubmit} />
      
      {/* Pass the pizzas list and editing function to PizzaList */}
      <PizzaList pizzas={pizzas} setPizzaToEdit={setPizzaToEdit} />
    </>
  );
}

export default App;
