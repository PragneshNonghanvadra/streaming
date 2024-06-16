const User = require("../../model/user");

async function update(req, res, next) {
  const { role, id } = req.body;

  if (!role || !id) {
    return res.status(500).json({
      message: "Please provide role OR id",
      error: "missing id or role",
    });
  }

  try {
    const user = await User.findById(id);

    if (user.role !== "admin") {
      user.role = role;
      user.save((err) => {
        //Monogodb error checker
        if (err) {
          res
            .status(400)
            .json({ message: "An error occurred", error: err.message });
          process.exit(1);
        }
        res.status(201).json({ message: "Update successful", user });
      });
    } else {
      res.status(400).json({ message: "User is already an Admin" });
    }
  } catch (e) {
    res
      .status(400)
      .json({ message: "An error occurred", error: error.message });
  }
}

async function deleteUser(req, res, next) {
  const { id } = req.body;
  try {
    const user = await User.findById(id);
    await user.remove();

    res.status(201).json({ message: "User deleted successfully", user });
  } catch (e) {
    res
      .status(400)
      .json({ message: "An error occurred", error: error.message });
  }
}

module.exports = { update, deleteUser };
