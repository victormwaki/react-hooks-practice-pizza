import React from "react";
import Pizza from "./Pizza"; 

function PizzaList({ pizzas, setPizzaToEdit}) {// Accepting two props: pizzas (array) and onEdit (function)}
  return (
    <table className="table table-striped">
      <thead>  
        <tr> 
          <th scope="col">Topping</th>  
          <th scope="col">Size</th>
          <th scope="col">Vegetarian?</th> 
          <th scope="col">Edit</th>  
        </tr>
      </thead>
      <tbody>
      {
          // Mapping over the pizzas array and rendering a Pizza component for each pizza
          pizzas.map(pizza => (
            <Pizza key={pizza.id} pizza={pizza} setPizzaToEdit={setPizzaToEdit} />  // For each pizza, render a Pizza component
          ))
        }
      </tbody>
      </table>
  )
}
      export default PizzaList;