import mongoose, { Document, model, Schema } from "mongoose";
import { IUser } from "./users";

export interface IProduct extends Document {
  title: string;
  desc: string;
  price: number;
  images: string[];
  user: IUser | string;

}

const productsSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String, required: true }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

export default model<IProduct>("Product", productsSchema);


