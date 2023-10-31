// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName

  // custom hook
  function useLocalStorage(...args) {
    if (args.length === 1) {
      return () =>
        JSON.parse(window.localStorage.getItem(args[0])) ?? initialName
    } else if (args.length === 2) {
      return () =>
        window.localStorage.setItem(args[0], JSON.stringify(args[1])) ??
        initialName
    }
  }

  // lazy state initialization
  const [name, setName] = React.useState(useLocalStorage('name'))

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)
  const accessLocalStorage = useLocalStorage('name', name)
  React.useEffect(() => {
    accessLocalStorage()
  }, [accessLocalStorage])

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
