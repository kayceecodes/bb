/**
 * Shorten the length an item name and add '...'.This is to even out each title that represents an item/product
 * @param str: string[]
 * @param numOfChar: number
 * @return str : shortenedStr
 */
export const fixedTitleLength = (str: string, numOfChar: number) => {
  let shortenedStr = str.split('').filter((val, index) => {
    index < (numOfChar - 4)
    val;
  })

  return str.length > numOfChar ? shortenedStr.concat("...") : str
}

/**
 * Takes the name of an item and returns a handle, replaces ' ' with '-'
 * @param {string} itemName 
 * @returns {string} handle
 */
export function convertNameToHandle(itemName: string) {
  /* Find spaces */
  let spaces = new RegExp("[ ]+", "g");
  /* Then replace with hypens in between */
  let handle = itemName.replace(spaces, "-");
  
  let uppercase = new RegExp("[A-Z]", "g");

  return handle.replace(uppercase, (x: string) => x.toLowerCase());
}

  /**
   * Takes in full path, and removes given string, from the path.
   * Returns only the name of the dynamic handle
   * @param {string} path
   * @param {string} stringToRemove 
   * @returns {string}
   */
  // const removeFromPath = (path: string, stringToRemove: string): string => {
  //   /* pointer1 pointer2
  //     While pointer2 is less than array2
  //     Each increaments for every match
  //     if not only increment pointer2
  //    */
  //   let pathArray = path.toString().split('')
  //   let strToRemove = stringToRemove.toString().split('')
  //   let index1 = 0
  //   let index2 = 0
    
  //   while(index2 < strToRemove.length) {
  //     if(pathArray[index1] === strToRemove[index2]) {
  //       index1++
  //       index2++
  //     }
  //     else {
  //       index2++
  //     }
  //     // Need to implement removing string based on what index2 is
  //   }

  //   return ''
  // }