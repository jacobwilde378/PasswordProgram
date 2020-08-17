// Assignment code here
// define arrays for acceptable characters
var upperCase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
var lowerCase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
var specialChars = ["!", "#", "$", "%", "&", "*", "+", "-", ".", "/", "?", "@", "~"]

var generatePassword = function () {
  // prompt user for what to include
  var addUpperCase = function () {
    var includeUpperCase = parseInt(window.prompt("Please enter the minimum number of Upper Case Letters to include (0 to 128)", "5"), 10);
    if (includeUpperCase >= 0 && includeUpperCase <= 128) {
      return includeUpperCase
    }
    addUpperCase();
  }
  var addLowerCase = function () {
    var includeLowerCase = parseInt(window.prompt("Please enter the minimum number of Lower Case Letters to include (0 to 128)", "5"), 10);
    if (includeLowerCase >= 0 && includeLowerCase <= 128) {
      return includeLowerCase
    }
    addLowerCase();
  }
  var addNumber = function () {
    var includeNumbers = parseInt(window.prompt("Please enter the minimum number of number to include (0 to 128)","3"), 10);
    if (includeNumbers >= 0 && includeNumbers <= 128) {
      return includeNumbers
    }
    addNumber();
  }
  var addSpecialChar = function () {
    var includeSpecialChar = parseInt(window.prompt("Please enter the minimum number of special characters to include (0 to 128","2"), 10);
    if (includeSpecialChar >= 0 && includeSpecialChar <= 128) {
      return includeSpecialChar
    }
    addSpecialChar();
  }
  
  var setPasswordLength = function (Upper, Lower, Number, Special) {
    starting = (Upper + Lower + Number + Special)
    ending = (128 - starting)
    var thisPasswordLength = window.prompt("Please enter the required password length ("+ starting +" - " + ending + " ).","25");
    if (thisPasswordLength >= starting && thisPasswordLength <= ending) {
      return thisPasswordLength
    }
    setPasswordLength(Upper, Lower, Number, Special);
  }
  //call functions to prompt user
  var Upper = addUpperCase();
  var Lower = addLowerCase();
  var Number = addNumber();
  var Special = addSpecialChar();
  
  var passwordLength = setPasswordLength(Upper, Lower, Number, Special);
  // this will setup which character arrays are available based on the number the user entered.  It will also loop through each one and add random characters from the selected arrays.
  var tempPassword = ""
  var usableSets = []
  var passwordLength = passwordLength
  if (Upper > 0) {
    usableSets.push(upperCase);
    for (i=0; i < Upper; i++) {
      var randomUpperLetter = upperCase[Math.floor(Math.random() * Math.floor(upperCase.length))];
      var tempPassword = tempPassword.concat(randomUpperLetter)
      passwordLength--;
    }
  }
  if (Lower > 0) {
    usableSets.push(lowerCase);
    for (i=0; i < Lower; i++) {
      var randomLowerLetter = lowerCase[Math.floor(Math.random() * Math.floor(lowerCase.length))];
      var tempPassword = tempPassword.concat(randomLowerLetter)
      passwordLength--;
    }
  }
  if (Number > 0) {
    usableSets.push(numbers);
    for (i=0; i < Number; i++) {
      var randomNumber = numbers[Math.floor(Math.random() * Math.floor(numbers.length))];
      var tempPassword = tempPassword.concat(randomNumber)
      passwordLength--;
    }
  }
  if (Special > 0) {
    usableSets.push(specialChars);
    for (i=0; i < Special; i++) {
      var randomSpecialCharacter = specialChars[Math.floor(Math.random() * Math.floor(specialChars.length))];
      var tempPassword = tempPassword.concat(randomSpecialCharacter)
      passwordLength--;
    }
  }
  // set loop for max password length
  for (i = 0; i < passwordLength; i++) {
    var randomCharSet = usableSets[Math.floor(Math.random() * usableSets.length)]; // 0 - 3
    var randomChar = randomCharSet[Math.floor(Math.random() * randomCharSet.length)];
    tempPassword = tempPassword + randomChar
  }
  //randomize password so that the first 4 characters are not as easy to identified
  var password = ""
  startingLength = tempPassword.length
  var tempPassword = tempPassword.split('');
  for (i = 0; i < startingLength; i++) {
    currentLength = tempPassword.length
    randomPos = Math.floor(Math.random() * currentLength);
    var nextCharacter = tempPassword.splice(randomPos, 1);
    password = password + nextCharacter
  }
  console.log(password)
  return password
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);