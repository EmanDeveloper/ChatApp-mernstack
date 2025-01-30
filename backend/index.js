import DbConnection from "./src/db.js";
import { server } from "./src/lib/socket.js";

DbConnection()
.then(()=>{
    server.listen(3000,()=>{
        console.log("server is listen at : http://localhost:3000")
    })
})
.catch(error=>console.log(error))