import React from "react";
import "./card.css";
export default function Card(props) {

  return (
    <div className="card-container">
      <h1 className="card-title">{props.name}</h1>
      <p className="card-cartegory">Estoque: {props.quant_estoque}</p>
      <h3 className="card-cost">Preço de custo: R${props.preco_custo}</h3>
      <h3 className="card-cost">Preço de venda: R${props.preco_venda}</h3>
    </div>
  )
}
