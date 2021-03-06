// Assignment Code
var generateBtn = document.querySelector("#generate");
var lowercase = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var uppercase = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
var nums = ['1','2','3','4','5','6','7','8','9','0'];
var specChars = ['~','`','!','@','#','$','%','^','&','*','(',')','_','-','+','=','{','[','}',']','|',':',';','<','>','?','/'];

var userInput = {
  length: 0,
  includeLowerCase: false,
  includeUpperCase: false,
  includeNums: false,
  includeSpecialCharacters: false,
  getPreferences: function() {

    // prompts the user for the length of their generated password and only
    // allows them to continue once they have entered an acceptable response
    var message = "How many characters long should this password be?";
    do { 
      var validResponse = false;
      this.length = Math.floor(parseFloat(prompt(message)));
      if (isNaN(this.length)) { // if the input is not a number
        message = "You may only enter numbers!";
      } else if (this.length < 8) { // if the input is less than 8 characters
        message = "Password must be at least 8 characters long!";
      } else if (this.length > 128) { // if the input is greater than 128 characters
        message = "Password cannot exceed 128 characters!";
      } else {
        validResponse = true;
      }
    } while(!validResponse);

    //asks the user if they would like to include lowercase letters in their password
    this.includeLowerCase = confirm('Click OK to include lowercase letters');
    //asks the user if they would like the include capital letters in their password
    this.includeUpperCase = confirm('Click OK to include capital letters'); 
    //asks the user if they would like to include numbers in their password
    this.includeNums = confirm('Click OK to include numbers');
    //asks the user if they would like to include special characters in their password
    this.includeSpecialCharacters = confirm('Click OK to include special characters');
  }
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// series of algorithms that generate a random password
function generatePassword() {
  userInput.getPreferences();
  var charList = [];
  var acceptedChars = [];

  //these if statements ensure that one of each type of characters ends up in the password
  //as well as tells the generator what characters are allowed in the password

  //if the user wants to include lowercase letters
  if (userInput.includeLowerCase) {
    charList.push(lowercase[Math.floor(Math.random() * (lowercase.length))]); //ensures that at least one lowercase letter is included
    acceptedChars = acceptedChars.concat(lowercase); //adds the lowercase letters to the options for the password
  }
  //if the user wants to include capital letters
  if (userInput.includeUpperCase) {
    charList.push(uppercase[Math.floor(Math.random() * (uppercase.length))]); //ensures that at least one capital letter is included
    acceptedChars = acceptedChars.concat(uppercase); //adds the capital letters to the options for the password
  }
  //if the user wants to include numbers
  if (userInput.includeNums) {
    charList.push(nums[Math.floor(Math.random() * (nums.length))]); //ensures that at least one number is included
    acceptedChars = acceptedChars.concat(nums); //adds the numbers to the options for the password
  }
  //if the user wants to include special characters
  if (userInput.includeSpecialCharacters) {
    charList.push(specChars[Math.floor(Math.random() * (specChars.length))]); //ensures that at least one special character is included
    acceptedChars = acceptedChars.concat(specChars); //adds the special characters to the options for the password
  }
  console.log(acceptedChars);

  //adds the remaining number of characters to the password 
  for (i = charList.length; i < userInput.length; i++) {
    charList.push(acceptedChars[Math.floor(Math.random() * acceptedChars.length)]);
  }
  console.log(charList);
  
  //shuffles the password to ensure that the first characters are not predictable
  var output = "";
  var size = charList.length;
  for (i = 0; i < size; i++) {
    output = output + charList.splice(Math.floor([Math.random() * charList.length]),1);
  }

  return output;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);