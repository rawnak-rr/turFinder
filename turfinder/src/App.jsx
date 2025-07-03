import { useState } from 'react'
import './App.css'
import { NavBar } from './components/navBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    NavBar()
  )
}

export default App
