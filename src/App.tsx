import { useEffect, useState } from 'react';
import './App.css';

interface Character {
  id: string;
  attributes: {
    name: string;
  }
}
function App() {
  // 'https://api.potterdb.com/v1/characters?filter[name_cont]=Weasley'
  const API_URL = 'https://api.potterdb.com/v1'
  const searchFilter = 'albus'
  const [data, setData] = useState<Character[]>([])
  const [errMsg, setErrMsg] = useState<string | null>(null)
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    const fetchAlbus = async() => {
      try {
        const res = await fetch(`${API_URL}/characters?filter[name_cont]=${searchFilter}`, { signal })
        const resJson = await res.json()
        const resData = resJson.data
        setData(resData)
      } catch (error) {
        const msg = (error as Error).message
        setErrMsg(msg)
      }
    }
    
    fetchAlbus()
    return() => {
      controller.abort()
    }
  }, [searchFilter])
  return (
    <div>
      <div>
        {
          errMsg ? <p style={{ color: 'red' }}>
            {errMsg}
          </p> : null
        }
        <h2>Hello</h2>
        <p>
          For this interview, you'll be utilizing the{' '}
          <a href="https://docs.potterdb.com/apis/rest">Potter DB</a> to fetch a
          list of characters from Harry Potter. We would like you to retrieve
          all characters who's name matches 'albus'
        </p>
      </div>
      <ul>
      {
        data.map((character) => (
          <li key={character.id}>
            <span>{character.attributes.name}</span>
          </li>   
        ))
      }
      </ul>
    </div>
  );
}

export default App;
