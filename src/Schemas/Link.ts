import mongoose, { Schema } from 'mongoose';

const LinkSchema = new Schema({
    newLink: String,
    oldLink: String,
  });
  
export default mongoose.model('links', LinkSchema);