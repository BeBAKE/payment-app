const z = require("zod");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Account = require("../models/accounts");

const signUpSchema = z.object({
  username: z.string().email().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  password: z.string().min(8),
});

const signinSchema = z.object({
  username: z.string().email().min(1),
  password: z.string().min(8),
});

const updateSchema = z.object({
  password: z.string().min(8).optional(),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
});

// 🔥🔥🔥🔥🔥
const signup = async (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(411).json({ message: "Incorrect inputs" });
  }

  // validating using zod
  const parsedData = signUpSchema.safeParse(data);
  if (!parsedData.success) {
    return res.status(411).json({ message: "Incorrect inputs" });
  }

  // check for already existing data
  const alreadyExistUsername = await User.find(
    { username: parsedData.data.username },
    "username"
  );
  if (alreadyExistUsername.length !== 0) {
    return res.status(411).json({ message: "Email already taken" });
  }

  try {
    // put data in database
    parsedData.data.username = parsedData.data.username.toLowerCase();
    const user = await User.create(parsedData.data);

    // initialize random balance in account db
    await Account.create({
      userId: user._id,
      balance: Math.floor(Math.random() * 10000) + 1,
    });

    // return jwt having _id in it
    const token = jwt.sign(
      { userId: user._id, firstName: user.firstName },
      process.env.JWT_SECRET,
      {
        expiresIn: 60 * 30,
      }
    );

    res.status(200).json({
      message: "User created successfully",
      token: token,
    });
  } catch (error) {
    return res.status(411).json({ message: "Incorrect inputs" });
  }
};

// 🔥🔥🔥🔥🔥
const signin = async (req, res) => {
  try {
    const data = req.body;
    if (!data) {
      throw new Error("Error while logging in e");
    }

    // zod validations
    const parsedData = signinSchema.safeParse(data);
    if (!parsedData.success) {
      throw new Error("Error while logging in b");
    }

    // check for user in database
    const user = await User.findOne({
      username: parsedData.data.username,
      password: parsedData.data.password,
    });
    if (!user) {
      throw new Error("Error while logging in g");
    }

    // send jwt
    const token = jwt.sign(
      { userId: user._id, firstName: user.firstName },
      process.env.JWT_SECRET,
      {
        expiresIn: 60 * 30,
      }
    );
    res.status(200).json({ token: token });
  } catch (error) {
    res.status(411).json({ message: error.message });
  }
};

// 🔥🔥🔥🔥🔥
const updateInfo = async (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(411).json({
      message: "Error while updating information",
    });
  }

  const parsedData = updateSchema.safeParse(data);
  if (!parsedData.success) {
    return res.status(411).json({
      message: "Error while updating information",
    });
  }

  try {
    await User.findByIdAndUpdate(req.userId, parsedData.data, {
      runValidators: true,
    });

    res.status(200).json({
      message: "Updated successfully",
    });
  } catch (error) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }
};

// 🔥🔥🔥🔥🔥
const filteringUser = async (req, res) => {
  const data = req.query.filter;
  if (!data) {
    const bulk = await User.find({});
    return res.status(200).json(bulk);
  }

  // finding user/s in the database
  const regex = new RegExp(`^${data}`, "i");
  const users = await User.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  });

  res.status(200).json({
    user: users.map((e) => {
      return {
        firstName: e.firstName,
        lastName: e.lastName,
        _id: e._id,
      };
    }),
  });
};

module.exports = {
  signin,
  signup,
  updateInfo,
  filteringUser,
};
