import { useEffect, useState } from 'react';
import './App.css';
import Detail from './components/Detail/Detail';
import About from './components/About/About';
import Cards from './components/Cards/Cards.jsx';
import NavBar from './components/Nav/Nav';
import Form from './components/Form/Form';
import Favorites from './components/Favorites/Favorites'
import axios from 'axios'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

function App() {
   
   const { pathname } = useLocation()
   const [characters,setCharacters] = useState([])
   const [access,setAccess] = useState(false)
   const EMAIL = "seba@gmail.com"
   const PASSWORD = "seba1234"


   // const onSearch = (id)=>{

   //    const characterExists = characters.some((character) => character.id === parseInt(id));
   //    if (characterExists) {
   //       window.alert('¡El personaje ya existe!');
   //       return;
   //    }
      
   //    axios(`http://localhost:3001/rickandmorty/character/${id}`).then(( {data} ) => {
   //       console.log(data);
   //       if (data?.name) {
   //       setCharacters((oldChars) => [...oldChars, data]);
   //       } else {
   //          window.alert('¡No hay personajes con este ID!');
   //       }
   //    });
   // }

   const onSearch = async (id)=>{

      const characterExists = characters.some((character) => character.id === parseInt(id));
      if (characterExists) {
         window.alert('¡El personaje ya fue agregado!');
         return;
      }
      try {
         const {data} = await axios.get(`/character/${id}`)
         setCharacters((oldChars) => [...oldChars, data]);
      } catch (error) {
         window.alert(error.response.data.error)
      }
;
   }

   const onClose = (id) => {
      setCharacters((oldChars) => oldChars.filter((character) => character.id !== parseInt(id)));  
   }
      
   const navigate = useNavigate()

   function login(userData) {
      const { email, password } = userData;
      const URL = '/rickandmorty/login/';
      axios(URL + `?email=${email}&password=${password}`).then(({ data }) => {
         const { access } = data;
         setAccess(data);
         access && navigate('/home');
      });
   }

   useEffect(() => {
      !access && navigate('/')
      }, [access])

   return (
      <div className='App'>
         {pathname !== '/' && <NavBar search ={onSearch} />}
         <Routes> 
            <Route path="/" element={<Form login={login} />}/>
            <Route path="/favorites" element={<Favorites close={onClose} />}/>
            <Route path="/home" element={<Cards characters={characters} close={onClose} />} />
            <Route path="/about" element={<About/>}/>
            <Route path="/detail/:id" element={<Detail/>} />
         </Routes>
      </div>
   );
}

export default App;
