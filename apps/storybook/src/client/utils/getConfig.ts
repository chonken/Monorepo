export const getConfig = async (param: string) => {
  const config = await fetch(`api/configs/${param}`)
  return config.json()
}
