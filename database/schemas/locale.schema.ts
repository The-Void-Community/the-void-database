import mongoose, { Schema } from "mongoose";
import { types } from "../index.mongoose";

type Language = "ru" | "en";

interface ILocale {
  user_id: string;
  language: Language;
}

const schema = new Schema<ILocale>({
  user_id: { type: types.String, required: true, unique: true },
  language: { type: types.String, required: false, unique: false, default: "ru" }
});

export default mongoose.model("locale", schema);

export { ILocale, Language, schema };
