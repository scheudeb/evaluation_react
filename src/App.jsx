import React, { useReducer, useEffect } from 'react';
import './App.css';
import DepenseForm from './component/DepenseForm';

const initialState = {
  depenses: [],
  total: 0,
  categorie: {
    sport: 0,
    alimentation: 0,
    loisirs: 0,
    logement: 0,
    transport: 0,
    santé: 0,
    autres: 0,
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
      <DepenseForm dispatch={dispatch} />
      <h1>Total général: {state.total}$</h1>
      <h2>Total par catégorie:</h2>
      <ul>
        {Object.entries(state.categorie).map(([catName, catTotal]) => (
          <li key={catName}>
            {catName}: {catTotal}$
          </li>
        ))}
      </ul>
      {state.depenses.map((dep, index) => (
        <div key={index}>
          <h1>{dep.categorie}</h1>
          <h2>{dep.description}</h2>
          <h3>{dep.prix}$</h3>
        </div>
      ))}
    </>
  );
}



export default App;
