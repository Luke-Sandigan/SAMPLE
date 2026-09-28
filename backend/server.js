require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');

if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is missing in .env');
    process.exit(1);
}

const app = express();
app.use(express.json());
app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));