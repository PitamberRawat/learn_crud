import app from './src/app.js'
import connectDB from './src/config/db.js'

const PORT =3100;

connectDB();

app.listen(PORT, ()=>{
    console.log("server is running on port 3100");
    
})