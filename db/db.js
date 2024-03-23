const {MongoClient} = require("mongodb");

const dbUrl = "mongodb+srv://meyyappan055:nvvPrwEM7JD0Wgl7@cluster0.sw27xd1.mongodb.net/?retryWrites=true&w=majority&appName=cluster0";
const dbName = "authSystem";

const client = new MongoClient(dbUrl,{useNewUrlParser:true, useUnifiedTopology:true});

async function connect_to_database(){
    try{
        await client.connect();
        console.log("database connection is successful!");
        return client.db(dbName);

    } catch(error){
        console.log("failed to connect to database. Error: ",error);
        throw(error);
    }
};

module.exports = {connect_to_database};