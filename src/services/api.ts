export interface IApiService {
  hello: () => void
}

function ApiService(): IApiService {
  function hello() {
    return 'Hello'
  }

  return { hello }
}

export default ApiService
