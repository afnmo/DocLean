require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db')
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')
const doctorRoutes = require('./routes/doctors');
const appointmentRoutes = require('./routes/appointments')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 5000; 


// database connection
connection()

// middlewares
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true 
}));
app.use(cookieParser());

// routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);



// endpoints
app.get('/api/data', (req, res) => { 
  res.json({ message: 'Hello from Express!' });
}); 


app.get("/api/auth/check", (req, res) => {
    const token = req.cookies.access_token; 
    console.log("Access token:", token);

    if (!token) {
        console.log("No token found, user not authenticated");
        return res.status(401).send({ message: "Not authenticated" });
    }

    jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decoded) => {
        if (err) {
            console.log("Invalid token:", err.message);
            return res.status(401).send({ message: "Invalid token" }); 
        }

    
        console.log("Token verified, decoded user ID:", decoded._id);

   
        return res.status(200).send({ message: "Authenticated", userId: decoded._id });
    });
});

app.post("/api/auth/logout", (req, res) => {
    return res
        .clearCookie("access_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        })
        .status(200)
        .json({ message: "Logged out successfully" });
});



app.listen(port, () => { 
  console.log(`Server is running on port ${port}...`); 
});