import { useState, useEffect } from 'react'
import Arena from './components/arena'

function App() {

  const [botsArr, setBotsArr] = useState([])

  const [botName, setBotName] = useState('')
  const [botValue, setBotValue] = useState(null)
  const [botColor, setBotColor] = useState('')
  
  const handleSubmit = () =>{

  }

  return (
    <>
    <div>
      {/* <form action="" onSubmit={handleSubmit} >
        <div>
          <label htmlFor="name">Bot Name:</label>
          <input name="name" id="name" type="text" placeholder="Bender" onChange={(e) => setBotName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="value">Bot Value:</label>
          <select>
            <option name="value" id="value" value="0">0</option>
            <option name="value" id="value" value="1">1</option>
          </select>
        </div>
  
        <div>
          <label htmlFor="color">Bot color:</label>
          <select>
            <option name="red" id="red" value="red">Red</option>
            <option name="orange" id="orange" value="orange">Orange</option>
            <option name="violet" id="violet" value="violet">Violet</option>
            <option name="blue" id="blue" value="blue">Blue</option>
            <option name="green" id="green" value="green">Green</option>
            <option name="grey" id="grey" value="orange">Grey</option>
            <option name="yellow" id="yellow" value="orange">Yellow</option>
          </select>
        </div>

      </form> */}
    </div>
    <Arena />
    </>
  )
}

export default App
