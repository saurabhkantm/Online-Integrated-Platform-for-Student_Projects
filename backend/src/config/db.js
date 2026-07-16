import mongoose from "mongoose";

export default async function connectDb() {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(console.log("DB connected"))
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
}
