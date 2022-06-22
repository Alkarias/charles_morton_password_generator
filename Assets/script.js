// Assignment Code
var generateBtn = document.querySelector("#generate");
var userInput = {
  length: 0,
  includeLowerCase: false,
  includeUpperCase: false,
  includeNums: false,
  includeSpecialCharacters: false,
  getPreferences: function() {

    var message = "How many characters long should this password be?";
    do {
      this.length = Number(prompt(message));
      var validResponse = false;
      if (this.length >= 8 && this.length <= 128) {
        validResponse = true;
      } else {
        message = "Must be between 8 and 128 characters!";
      }
    } while (!validResponse);

    this.includeLowerCase = confirm('would you like to include lowercase letters?');
    this.includeUpperCase = confirm('Would you like to include capital letters?'); 
    this.includeNums = confirm('Would you like to include numbers?');
    this.includeSpecialCharacters = confirm('Would you like to include special characters?');
  }
}
// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

function generatePassword() {
  userInput.getPreferences();
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
