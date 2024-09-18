import React, { useEffect, useState } from "react";
import { Auth } from "../components/Auth";
import { db } from "../config/Firebase.config.js";
import { doc,getDocs, collection, addDoc ,deleteDoc} from "firebase/firestore";

function App() {
  const [gameList, setGameList] = useState([]);
  const [gameName, setGameName] = useState("");
  const [gameGenre, setGameGenre] = useState("");
  const [gameStudio, setGameStudio] = useState("");

  const gameCollection = collection(db, 'Games');

  useEffect(() => {
    const getGamesList = async () => {
      try {
        const data = await getDocs(gameCollection);
        const newGameList = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(newGameList);
        setGameList(newGameList);
      } catch (e) {
        console.log(e.message);
      }
    };

    getGamesList(); // Call the function here
  }, []);

  const submitGame = async ()=>{
    try{
      await addDoc(gameCollection,{
        Title:gameName,
        Genre:gameGenre,
        Studio:gameStudio,
      })
    }
    catch(e)
    {
      console.log(e.message)
    }

  }

  const deleteGame = async (id)=>{
    try
    {
      const gameDoc = doc(db,'Games',id)

      await deleteDoc(gameDoc);
    }
    catch(e)
    {
      console.log(e.message)
    }
  }


  return (
    <>
      <div>
        <label>Game Name:</label>
        <input
          type="text"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)} // Store input value in state
        />

        <label>Game Genre:</label>
        <input
          type="text"
          value={gameGenre}
          onChange={(e) => setGameGenre(e.target.value)} // Store input value in state
        />

        <label>Game Studio:</label>
        <input
          type="text"
          value={gameStudio}
          onChange={(e) => setGameStudio(e.target.value)} // Store input value in state
        />

        <button onClick={submitGame}> Submit </button>
      </div>

      <h1>Firebase Auth</h1>
      <Auth />

      <h1>Games List</h1>
      <div>
        <ul>
          {gameList.map((game) => 
          (
            <li key={game.id}>
              <p>{game.Title}</p>
              <p>{game.Studio}</p>
              <button onClick={()=>deleteGame(game.id)}>Delete Game</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
