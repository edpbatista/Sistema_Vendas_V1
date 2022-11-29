import React, { useState, useEffect } from "react";
import './CadastroProduto.css';
import Axios from "axios";
import Card from "../../components/cards/card";
import { useNavigate } from "react-router-dom";


function App() {
  const [values, setValues] = useState();

  const [listGames, setProduto] = useState([]);
  
  const navigate = useNavigate();

  console.log(listGames);

  const handleaddValues = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [value.target.name]: value.target.value,
    }));
  };

  const handleRegisterGame = () => {
    Axios.post("http://localhost:3001/cadastroProduto", {
      name: values.name,
      preco_custo: values.preco_custo,
      preco_venda: values.preco_venda,
      quant_estoque: values.quant_estoque,
    }).then((response) => {
      console.log(response)
    });
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/getProduto").then((response) => {
      setProduto(response.data);
    });
  }, []);

  return (
    <div className="app-container">
      <div className="register-container">
        <h1>Cadastro de produto</h1>
        <input
          type="text"
          name="name"
          placeholder="Nome do produto"
          className="register-inputName"
          onChange={handleaddValues}
        />
        <input
          type="text"
          name="preco_custo"
          placeholder="Preço de custo"
          className="register-inputCusto"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder="Preço de venda"
          name="preco_venda"
          className="register-inputVenda"
          onChange={handleaddValues}

        />
        <input
          type="text"
          placeholder="Quantidade do produto"
          name="quant_estoque"
          className="register-inputEstoque"
          onChange={handleaddValues}

        />
        <button onClick={handleRegisterGame} className="register-button">
          Cadastrar
        </button>
        <button className="buttonCadastroUsuarioSair" type="submit"
           onClick={() => [navigate("/Home")]}>
            Voltar
          </button>

      </div>
      
      {typeof listGames !== "undefined" && listGames.map((value) => {
        return <Card key={value.id} listCart={listGames} setListCard={setProduto}
          id={value.id}
          name={value.name}
          preco_custo={value.preco_custo}
          preco_venda={value.preco_venda}
          quant_estoque={value.quant_estoque}

        ></Card>
      })}
    </div>
  );
}

export default App;
