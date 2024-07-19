import { useState } from "react";
import axios from "axios";

function App() {
  const [inputState, setInputState] = useState('')
  const [strokeState, setStrokeState] = useState([0, 0])
  const [curhexagramState, setCurHexagramState] = useState([])

  const[errMsgState, setErrMsgState] = useState('')

  // utility functions for testing chinese only input.
  function containsOnlyChineseCharacters(str) {
    // Regular expression to match Chinese characters
    const chineseRegex = /^[\u4E00-\u9FFF]+$/;
    // Test if the string contains only Chinese characters
    return chineseRegex.test(str);
  }

  function updateInputField(event) {
    setInputState(event.target.value)
  }

  async function countingStroks() {
    if (!containsOnlyChineseCharacters(inputState)){
      setErrMsgState("should only contain Chinese character")
      setCurHexagramState([])
      setStrokeState([0, 0])
      return;
    }

    if (inputState.length === 1) {
      setErrMsgState("Please enter at least two character")
      setCurHexagramState([])
      setStrokeState([0, 0])
      return;
    }

    let sum = 0
    let sum1 = 0

    try {
      const limit = Math.floor(inputState.length / 2)
      for (let i = 0; i < inputState.length; i++) {
        let unicode = inputState.charCodeAt(i)
        let number = await axios.get('api/character/' + unicode.toString())
        if (i < limit) {
          sum += number.data.strokes
        } else {
          sum1 += number.data.strokes
        }
      }
      if (inputState.length % 2 === 0) {
        if (sum > sum1) {
          [sum, sum1] = [sum1, sum];
        }
      }
      setStrokeState([sum, sum1])
      setErrMsgState('')
    } catch(error) {
      setStrokeState(0)
      setErrMsgState(error.message)
    }
    let time = new Date()
    const shichen = Math.floor(((time.getHours() === 0 ? 24 : time.getHours()) + 1) / 2)

    const query = "?upper=" + sum.toString() + "&lower=" + sum1.toString() +  "&shichen=" + shichen.toString()

    try {
      const hexagramResponse = await axios.get("/api/hexagram/hexagrams" + query)
      setCurHexagramState(hexagramResponse.data)
    } catch(error) {
      setErrMsgState(error.message)
      return
    }
    console.log("finished")
  }

  function hexagram() {
    console.log(curhexagramState)
    let info = []
    info.push(<div>Hexagrams.......</div>)
    for (let i = 0; i < curhexagramState.length; i++) {
      info.push(
        <div>
          <div>
            {curhexagramState[i].unicodeChar.toString()}
          </div>
          <div>
            {curhexagramState[i].YijingIndex.toString()}
          </div>
        </div>
      )
    }

    return (
      <div>
        {info}
      </div>
    )
  }

  return (
    <>
      This is the main page
      <label htmlFor="inputString">Please enter</label>
      <input id="inputString" type="text" onChange={(event) => updateInputField(event)}></input>
      <button onClick={countingStroks}>Go!</button>
      <span>{strokeState[0].toString() + " : " + strokeState[1].toString()}</span>
      <div>{errMsgState}</div>
      {hexagram()}
    </>
  )
}

export default App
