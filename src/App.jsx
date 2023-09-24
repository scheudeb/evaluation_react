import React, { useReducer, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './App.css';
import DepenseForm from './component/DepenseForm';

const initialState = {
  depenses: [],
  total: 0,
  categorie: {
    Alimentation: 0,
    Logement: 0,
    Transport: 0,
    Divertissement: 0,
    Santé: 0,
    Education: 0,
    Autres: 0,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      const updatedCategorie = { ...state.categorie };
      updatedCategorie[action.payload.categorie] += (
        isNaN(action.payload.prix) ? 0 : parseInt(action.payload.prix)
      );

      const updatedTotal = state.total + (
        isNaN(action.payload.prix) ? 0 : parseInt(action.payload.prix)
      );

      return {
        ...state,
        depenses: [...state.depenses, action.payload],
        total: updatedTotal,
        categorie: updatedCategorie,
      };

    default:
      return state;
  }
};



function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Calculer le total pour chaque catégorie une seule fois, lorsque le composant App est monté.
  useEffect(() => {
    const calculateTotalByCategory = () => {
      const updatedCategorie = { ...state.categorie };
      Object.entries(updatedCategorie).forEach(([catName, catTotal]) => {
        updatedCategorie[catName] = state.depenses
          .filter((dep) => dep.categorie === catName)
          .reduce((acc, dep) => acc + dep.prix, 0);
      });

      dispatch({ type: 'update', payload: { categorie: updatedCategorie } });
    };

    calculateTotalByCategory();
  }, [state.depenses]);

  return (
    <>
  <div className="l-depenses">
    <h1>Mes dépenses <i class="fa-solid fa-sack-dollar"></i></h1>
      <DepenseForm dispatch={dispatch} />
      <div className='c-depenses'>
        <h2>Total général: {state.total}€</h2>
        <ul>
        <h2>Total par catégorie:</h2>
          {Object.entries(state.categorie).map(([catName, catTotal]) => (
            <li key={catName}>
              {catName}: {catTotal}€
            </li>
          ))}
        </ul>
     
      {state.depenses.map((dep, index) => (
        <div key={index}>
          <h2>{dep.categorie}</h2>
          <h3>{dep.description}</h3>
          <h4>{dep.prix}€</h4>
        </div>
      ))}
      </div>
      </div>
    </>
  );
}



export default App;
