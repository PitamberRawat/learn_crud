const app = require('./src/app')
const connectDB = require('./src/config/db')

const PORT =3100;

connectDB();

app.listen(PORT, ()=>{
    console.log("server is running on port 3100");
    
})