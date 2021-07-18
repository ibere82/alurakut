import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  githubURL: {
    type: String,
    required: false,
  },
  githubImage: {
    type: String,
    required: false,
  },
  recados: {
    type: Number,
    required: false,
  },
  fotos: {
    type: Number,
    required: false,
  },
  videos: {
    type: Number,
    required: false,
  },
  fas: {
    type: Number,
    required: false,
  },
  mensagens: {
    type: Number,
    required: false,
  },
  confiavel: {
    type: Number,
    required: false,
  },
  legal: {
    type: Number,
    required: false,
  },
  sexy: {
    type: Number,
    required: false,
  }
});

let userModel;

try {
  // Trying to get the existing model to avoid OverwriteModelError
  userModel = mongoose.model("users");
} catch {
  userModel = mongoose.model("users", userSchema, "users");
}

export { userModel };