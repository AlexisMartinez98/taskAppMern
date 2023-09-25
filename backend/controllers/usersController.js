import User from "../models/User.js";
import generateId from "../helpers/generateId.js";
import generateJWT from "../helpers/generateJwt.js";

const register = async (req, res) => {
  //evitar registros duplicados
  const { email } = req.body;
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    const error = new Error("El usuario ya existe");
    return res.status(400).json({ msg: error.message });
  }
  try {
    const user = new User(req.body);
    user.token = generateId();
    const storedUser = await user.save();
    res.json(storedUser);
  } catch (error) {
    console.log(error);
  }
};

const autentication = async (req, res) => {
  const { email, password } = req.body;
  //comprobar si el usuario existe
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  //comprobar si el usuario esta confirmado
  if (!user.confirm) {
    const error = new Error("Tu cuenta no esta confirmada");
    return res.status(403).json({ msg: error.message });
  }

  //comprobar la contraseña correcta
  if (await user.comparePassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id),
    });
  } else {
    const error = new Error("Tu contraseña no es correcta");
    return res.status(403).json({ msg: error.message });
  }
};

const confirm = async (req, res) => {
  const { token } = req.params;
  const userConfirm = await User.findOne({ token: token });
  if (!userConfirm) {
    const error = new Error("Token no valido");
    return res.status(404).json({ msg: error.message });
  }
  try {
    userConfirm.confirm = true;
    userConfirm.token = "";
    await userConfirm.save();
    res.json({ msg: "Usuario confirmado" });
  } catch (error) {
    console.log(error);
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  try {
    user.token = generateId();
    await user.save();
    res.json({ msg: "Se ha enviado un correo para cambiar la contraseña" });
  } catch (error) {
    console.log(error);
  }
};

const comprobationToken = async (req, res) => {
  const { token } = req.params;
  const validToken = await User.findOne({ token });
  if (validToken) {
    res.json({ msg: "Token valido y el usuario existe" });
  } else {
    const error = new Error("Token no valido");
    return res.status(404).json({ msg: error.message });
  }
};

const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const userValidate = await User.findOne({ token });

  if (userValidate) {
    userValidate.password = password;
    userValidate.token = "";
    try {
      await userValidate.save();
      res.json({ msg: "Contraseña cambiada correctamente" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Token no valido");
    return res.status(404).json({ msg: error.message });
  }
};

const profil = async () => {
  console.log("desde perfil");
};

export {
  register,
  autentication,
  confirm,
  forgetPassword,
  comprobationToken,
  newPassword,
  profil,
};
