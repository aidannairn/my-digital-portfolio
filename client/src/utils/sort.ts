type sortArg<T> = keyof T | `-${string & keyof T}` | string

/**
* Returns a comparator for objects of type T that can be used by sort functions, where T objects are compared by the specified T properties.
*
* @param sortBy - The names of the properties to sort by, in precedence order.
*                 
* Prefix any object property name with `-` to sort it in descending order.
*/

const byPropertiesOf = <T extends object> (sortBy: Array<sortArg<T>>) => {
  const compareByProperty = (arg: sortArg<T>) => {
    let key: keyof T
    let sortOrder = 1

    if (typeof arg === 'string' && arg.startsWith('-')) {
      sortOrder = -1
      key = arg.substring(1) as keyof T
    } else {
      key = arg as keyof T
    }

    return (a: T, b: T) => {
      const genericToLowerCase = (generic: any) => 
        typeof generic === 'string' ? generic.toLowerCase() : generic

      const currentValue = genericToLowerCase(a[key])
      const comparandValue = genericToLowerCase(b[key])

      const result = currentValue < comparandValue ? -1 : currentValue > comparandValue ? 1 : 0

      return result * sortOrder
    }
  }
  
  return (obj1: T, obj2: T) => {
    let i = 0
    let result = 0
    const numberOfProperties = sortBy?.length

    while (!result && i < numberOfProperties) {
      result = compareByProperty(sortBy[i])(obj1, obj2)
      i++
    }

    return result
  }
}

/**
* Sorts an array of T by the specified properties of T.
*
* @param arr - The array to be sorted, all of the same type T
* @param sortBy - The names of the properties to sort by, in precedence order.
* 
* Prefix any object property name with `-` to sort it in descending order.
*/

const sort = <T extends object> (arr: T[], ...sortBy: Array<sortArg<T>>) => 
  arr.sort(byPropertiesOf<T>(sortBy))

export { sort, byPropertiesOf }