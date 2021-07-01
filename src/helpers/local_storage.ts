export const storage_put = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export const storage_get = (key: string) => {
  const value = window.localStorage.getItem(key)

  if (value) {
    return JSON.parse(value)
  }
}
