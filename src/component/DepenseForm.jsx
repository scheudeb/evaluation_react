
import { useState } from "react";
function DepenseForm({dispatch}) {
  
  const categories = [
    "Alimentation",
    "Logement",
    "Transport",
    "Divertissement",
    "Santé",
    "Éducation",
    "Autres",
  ];
  const [selectedCategory, setSelectedCategory] = useState("Alimentation");
  const [description, setdescription] = useState("");
  const [prix, setprix] = useState("");

  const handleChange = (e) => {
    const {value} = e.target
    setSelectedCategory(value)
}
const descriptionHandleChange=(e)=>{
  setdescription(e.target.value)
}

const submitHandler=(e)=>{
e.preventDefault()
dispatch({
  type: "add",
  payload: {
    categorie: selectedCategory,
    description,
    prix,
  },
});
setdescription("")
setprix("")


}

  return (
    <form  onSubmit={submitHandler}  >
      <label htmlFor="">
        Description
        <input value={description} onChange={descriptionHandleChange } type="text" placeholder="description..." />

      </label>
      <label htmlFor="">
    Prix
        <input value={prix} onChange={(event)=> setprix(event.target.value) } type="number" placeholder="votre prix..." />
      </label>
      <select name={'category'} value={selectedCategory} onChange={handleChange}>
            {
                categories.map((category, index) => <option key={index} value={category}>{category}</option>)
            }
        </select>
        <button type="submit" >Ajouter</button>
    </form>
    )
}

export default DepenseForm