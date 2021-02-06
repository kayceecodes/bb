/**
 * Shorten the length an item name and add '...'.This is to even out each title that represents an item/product
 * @param str: string[]
 * @param numOfChar: number
 * @return str : shortenedStr
 */
export const fixedTitleLength = (str: string, numOfChar: number) => {
  let shortenedStr = str.split('').filter((val, index) => index < (numOfChar - 4))

  return str.length > numOfChar ? shortenedStr.concat("...") : str
}

// console.log(fixedTitleLength('Night Stones of Blue', 15))