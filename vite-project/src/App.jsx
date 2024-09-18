import React, { useEffect, useState } from "react"; 
import { Auth } from "../components/Auth"; 
import { db } from "../config/Firebase.config.js"; 
import { doc, getDocs, collection, addDoc, deleteDoc } from "firebase/firestore"; 
import { auth } from "../config/Firebase.config.js"; 

function App() {   
  const [gameList, setGameList] = useState([]);   
  const [gameName, setGameName] = useState("");   
  const [gameGenre, setGameGenre] = useState("");   
  const [gameStudio, setGameStudio] = useState("");   

  // Define the collection reference
  const gameCollection = collection(db, 'Games');    

  useEffect(() => {     
    const getGamesList = async () => {       
      try {         
        const data = await getDocs(gameCollection);         
        const newGameList = data.docs.map((doc) => ({           
          ...doc.data(),           
          id: doc.id,         
        }));         
        setGameList(newGameList);       
      } catch (e) {         
        console.log(e.message);       
      }     
    };      

    getGamesList(); // Fetch game list on component mount
  }, []);  // Empty array means this runs once when the component mounts

  // Function to submit new game
  const submitGame = async () => {     
    try {       
      await addDoc(gameCollection, {         
        Title: gameName,         
        Genre: gameGenre,         
        Studio: gameStudio,         
        userId: auth?.currentUser?.uid       
      });       
      setGameName('');  // Reset input fields after submission
      setGameGenre('');       
      setGameStudio('');     
    } catch (e) {       
      console.log(e.message);     
    }   
  };    

  // Function to delete a game
  const deleteGame = async (id) => {     
    try {       
      const gameDoc = doc(db, 'Games', id);  // Reference the specific document       
      await deleteDoc(gameDoc);     
    } catch (e) {       
      console.log(e.message);     
    }   
  };    

  return (     
    <>       
      <div>         
        <label>Game Name:</label>         
        <input           
          type="text"           
          value={gameName}           
          onChange={(e) => setGameName(e.target.value)}  // Store input value in state         
        />          

        <label>Game Genre:</label>         
        <input           
          type="text"           
          value={gameGenre}           
          onChange={(e) => setGameGenre(e.target.value)}  // Store input value in state         
        />          

        <label>Game Studio:</label>         
        <input           
          type="text"           
          value={gameStudio}           
          onChange={(e) => setGameStudio(e.target.value)}  // Store input value in state         
        />          

        <button onClick={submitGame}> Submit </button>       
      </div>        

      <h1>Firebase Auth</h1>       
      <Auth />        

      <h1>Games List</h1>       
      <div>         
        <ul>           
          {gameList.map((game) => (             
            <li key={game.id}>               
              <p>{game.Title}</p>               
              <p>{game.Studio}</p>               
              <button onClick={() => deleteGame(game.id)}>Delete Game</button>             
            </li>           
          ))}         
        </ul>       
      </div>     
    </>   
  ); 
}  

export default App;
