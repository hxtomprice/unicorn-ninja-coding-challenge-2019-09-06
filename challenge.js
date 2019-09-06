const kaprekarsConstantSteps = number => {
  if (!isInputValid(number)) {
    throw new Error(`Input has duplicate digits and will not generate Kaprekar's Constant`)
  }

  let current = number
  let count = 0
  const kaprekarsConstant = 6174
  while (current !== kaprekarsConstant) {
    current = generateNextNumber(current)
    count++
  }
  return count
}

const generateNextNumber = number => { // 231
  const numberArray = convertIntegerToArrayOfDigits(number) // [2,3,1]
  const normalisedArary = padArrayToFourDigits(numberArray) // [0,2,3,1]
  const sortedArray = sortArrayOfDigits(normalisedArary) // [0,1,2,3]
  const reversedArray = reverseArrayOfDigits(sortedArray) // [3,2,1,0]
  const lowestNumber = convertArrayOfDigitsToInteger(sortedArray) // 123
  const highestNumber = convertArrayOfDigitsToInteger(reversedArray) // 3210
  return highestNumber - lowestNumber
}

const convertIntegerToArrayOfDigits = integer => {
  if (!integer) return []
  const nextInteger = Math.floor(integer / 10)
  const lastDigit = integer % 10
  return [lastDigit].concat(convertIntegerToArrayOfDigits(nextInteger))
}

const convertArrayOfDigitsToInteger = (arrayOfDigits, multiplier = 1) => {
  if (!arrayOfDigits.length) return 0
  const arrayClone = [ ...arrayOfDigits ]
  const lastDigit = arrayClone.pop()
  return convertArrayOfDigitsToInteger(arrayClone, multiplier * 10) + (lastDigit * multiplier)
}

const padArrayToFourDigits = arrayOfDigits => {
  if (arrayOfDigits.length < 4) return [ 0 ].concat(arrayOfDigits)
  return arrayOfDigits
}

const isInputValid = integer => {
  const arrayOfDigits = convertIntegerToArrayOfDigits(integer)
  if (arrayOfDigits.length < 3) return false
  return [ ...new Set(arrayOfDigits) ].length === arrayOfDigits.length
}

const sortArrayOfDigits = arrayOfDigits => {
  return [ ...arrayOfDigits ].sort((a, b) => a > b)
}

const reverseArrayOfDigits = arrayOfDigits => {
  return [ ...arrayOfDigits ].reverse()
}

module.exports = { kaprekarsConstantSteps }
