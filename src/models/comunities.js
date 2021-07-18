import mongoose from 'mongoose';

const comunitySchema = mongoose.Schema({

  creatorId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

let comunityModel;

try {
  // Trying to get the existing model to avoid OverwriteModelError
  comunityModel = mongoose.model("comunities");
} catch {
  comunityModel = mongoose.model("comunities", comunitySchema, "comunities");
}

export { comunityModel };