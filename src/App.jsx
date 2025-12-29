import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <button className="btn btn-soft">Default</button>
<button className="btn btn-soft btn-primary">Primary</button>
<button className="btn btn-soft btn-secondary">Secondary</button>
<button className="btn btn-soft btn-accent">Accent</button>
    </>
  )
}

export default App
