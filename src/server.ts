import app from './app';
import mongoose from "mongoose";
const PORT = process.env.PORT || 3000;
const dbUrl: string = process.env.DB_URL || 'mongodb+srv://sambidchampati:3cwzC2wYWf0psX5G@cluster0.cupye7f.mongodb.net/AssesmentManagerDB?retryWrites=true&w=majority&appName=Cluster0';

async function startServer(): Promise<void> {
  try {
    const start = new Date().getTime();
    await mongoose.connect(dbUrl);
    app.listen(PORT, () => {
      console.log(
        `server started on port ${PORT} in ${new Date().getTime() - start} ms`
      );
    });
  } catch (error) {
    console.log(error, "Error in Connecting DB");
  }
}
  
startServer();