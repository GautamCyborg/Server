const mongoose=require("mongoose");

const connect = async (url) => {
    try {
      await mongoose.connect(url);
      console.log("Connected to MongoDB");
    } catch (err) {
      console.error("Error connecting to MongoDB:", err);
    }
  };

module.exports=connect;
