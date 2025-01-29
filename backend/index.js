import app from "./src/app.js";
import DbConnection from "./src/db.js";

DbConnection()
.then(()=>{
    app.listen(3000,()=>{
        console.log("App is listen at : http://localhost:3000")
    })
})
.catch(error=>console.log(error))