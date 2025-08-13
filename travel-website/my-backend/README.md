### Step 1: Set Up Your Project Structure

1. **Create a new directory for your backend** (outside your frontend folder):
   ```bash
   mkdir my-backend
   cd my-backend
   ```

2. **Initialize a new Node.js project**:
   ```bash
   npm init -y
   ```

3. **Install necessary packages**:
   ```bash
   npm install express mongoose dotenv cors
   ```

### Step 2: Create the Folder Structure

Create the following folder structure:

```
my-backend/
│
├── config/
│   └── db.js
│
├── models/
│   └── User.js
│
├── routes/
│   └── userRoutes.js
│
├── controllers/
│   └── userController.js
│
├── middleware/
│   └── errorMiddleware.js
│
├── .env
├── server.js
└── package.json
```

### Step 3: Set Up MongoDB Connection

In `config/db.js`, set up the MongoDB connection:

```javascript
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
```

### Step 4: Create a User Model

In `models/User.js`, create a simple user model:

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
```

### Step 5: Create User Controller

In `controllers/userController.js`, create the user controller:

```javascript
const User = require('../models/User');

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

module.exports = { registerUser };
```

### Step 6: Create User Routes

In `routes/userRoutes.js`, set up the user routes:

```javascript
const express = require('express');
const { registerUser } = require('../controllers/userController');

const router = express.Router();

router.post('/', registerUser);

module.exports = router;
```

### Step 7: Set Up Error Middleware

In `middleware/errorMiddleware.js`, create a simple error handler:

```javascript
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = { errorHandler };
```

### Step 8: Create the Server

In `server.js`, set up the Express server:

```javascript
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

### Step 9: Create a `.env` File

Create a `.env` file in the root of your backend directory and add your MongoDB URI:

```
MONGODB_URI=mongodb://localhost:27017/mydatabase
PORT=5000
```

### Step 10: Run Your Backend

1. **Start your MongoDB server** (if not already running):
   ```bash
   mongod
   ```

2. **Run your backend server**:
   ```bash
   node server.js
   ```

### Conclusion

You now have a basic backend setup with Express and MongoDB. You can expand this by adding more models, routes, and controllers as needed for your frontend application. Make sure to handle authentication, validation, and other necessary features based on your application's requirements.