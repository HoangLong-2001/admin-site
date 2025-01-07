const emailValidate = (email) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
  return emailRegex.test(email);
};
export const passwordValidate = (password) => {
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
  return passwordRegex.test(password);
};
const fullNameValidate = (fullName) => {
  const regexPattern = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i;
  return regexPattern.test(fullName);
};
export const registerValidation = (value) => {
  const { fullName, email, password } = value;
  const isValid = [];
  isValid.push(fullNameValidate(fullName));
  isValid.push(emailValidate(email));
  isValid.push(passwordValidate(password));
  return isValid;
};

export const loginValidation = ({ email, password }) => {
  return emailValidate(email) && passwordValidate(password);
};
