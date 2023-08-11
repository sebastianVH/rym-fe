import React, {useState} from "react";
import styles from "./SearchBar.module.css"

export default function SearchBar({search}) {
   const [id,setId] = useState("")

   const handleChange = (event) => {
      setId(event.target.value)
   }
   
   const clearInput = () => {
      document.querySelector('input').value = ''
   }

   return (
      <div className={styles.container}>
         <input className={styles.search} onChange={handleChange} type='search' placeholder="Ingrese el id..." />
         <button className={styles.btnAgregar} onClick={() => {search(id);clearInput()}}>Agregar</button>
      </div>
   );
}
