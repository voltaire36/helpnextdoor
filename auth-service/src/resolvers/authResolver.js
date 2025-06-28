const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../config/jwt");

const resolvers = {
  Mutation: {
    signup: async (_, { username, email, password, role }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("User already exists");

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        username,
        email,
        password: hashedPassword,
        role,
      });
      await user.save();

      const token = generateToken(user);
      return { ...user._doc, id: user._id, token };
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Invalid credentials");

      const token = generateToken(user);
      return { ...user._doc, id: user._id, token };
    },

    logout: () => {
      return "Logged out";
    },
  },
};

module.exports = resolvers;
