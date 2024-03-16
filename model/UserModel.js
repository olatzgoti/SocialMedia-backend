const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Por favor rellena tu nombre"],
    },
    email: {
      type: String,
     // match: [/.+\@.+\..+/, "Este correo no es válido"],
      //      unique: true,
      required: [true, "Por favor rellena tu correo"],
    },
    password: {
      type: String,
      required: [true, "Por favor rellena tu contraseña"],
    },
    age: {
      type: Number,
      required: [true, "Por favor rellena tu edad"],
    },
    role: { 
      type: String, 
    },
    tokens: [],
    likedPosts: [{ type: ObjectId, ref: "Post"}],
    publishedPostsIds: [{ type: ObjectId, ref: "Post" }],
    commentedPostsIds: [{ type: ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  const user = this._doc;
  delete user.tokens;
  delete user.password;
  return user;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
