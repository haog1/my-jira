export const isVoid = (val: unknown) =>
  val === undefined || val === null || val === ''

export const cleanObject = (obj: { [key: string]: unknown }) => {
  const result = { ...obj }

  Object.keys(result).forEach(key => {
    const val = result[key]
    if (isVoid(val)) {
      delete result[key]
    }
  })

  return result
}
