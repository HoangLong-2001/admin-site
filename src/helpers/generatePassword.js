const generatePassword = (length = 3) => {
  const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const specialCharacter = "!@#$%^&*()";
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const numeric = "0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    password +=
      ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length)) +
      specialCharacter.charAt(
        Math.floor(Math.random() * specialCharacter.length)
      ) +
      numeric.charAt(Math.floor(Math.random() * numeric.length)) +
      alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return password;
};

export default generatePassword;
