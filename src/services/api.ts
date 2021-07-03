// So do I still care about the resolver? It seems like a lot of legwork
// What do I want out of the service class?
// Easy to use methods
// DI into nested components
// Easier state management
// Simpler state output
// Don't have to pass state through
// Easy integration with API

import { useState } from 'react'

export interface IApiService {
  hello: () => void
  getCounter(): number
  increment: () => void
}

function ApiService(): IApiService {
  const [counter, setCounter] = useState(0)

  function hello() {
    return 'Hello'
  }

  function getCounter(): number {
    return counter
  }

  function increment() {
    setCounter(counter + 1)
  }

  return { hello, getCounter, increment }
}

export default ApiService
