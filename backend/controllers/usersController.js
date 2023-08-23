import User from "../models/User.js";

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
    const storedUser = await user.save();
    res.json(storedUser);
  } catch (error) {
    console.log(error);
  }
};

export { register };
