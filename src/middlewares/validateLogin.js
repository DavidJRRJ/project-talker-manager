const isEmailInvalid = (email) => {
  const regex = new RegExp('[a-z0-9]+@[a-z]+\\.[a-z]{2,3}');
  if (!email) {
    return {
      message: 'O campo "email" é obrigatório',
    };
  }
  if (!regex.test(email)) {
    return {
      message: 'O "email" deve ter o formato "email@email.com"',
    };
  }

  return false;
};

const isPasswordInvalid = (password) => {
  const passLength = 6;
  if (!password) {
    return {
      message: 'O campo "password" é obrigatório',
    };
  }

  if (password.length < passLength) {
    return {
      message: 'O "password" deve ter pelo menos 6 caracteres',
    };
  }

  return false;
};

const validateLogin = (req, res, next) => {  
  const { email, password } = req.body;  

  if (isEmailInvalid(email)) {
    return res.status(400).send(isEmailInvalid(email));
  }

  if (isPasswordInvalid(password)) {
    return res.status(400).send(isPasswordInvalid(password));
  }

  next();
};

module.exports = validateLogin;