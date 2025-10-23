import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

import cors from 'cors';

// Initialize Prisma and Express
const prisma = new PrismaClient();
const app = express();

// CORS Configuration
const allowedOrigins = ['http://c0c8cwg8cs0gos8woogckw4k.185.85.238.238.sslip.io'];
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
};
app.use(cors(corsOptions));

// Use JSON middleware to parse request bodies
app.use(express.json());

const PORT = process.env.PORT || 3000;

/**
 * Main endpoint to check if the server is running.
 */
app.get('/', (req: Request, res: Response) => {
  res.send('Global Connect API is running!');
});

/**
 * API endpoint for user registration.
 * Expects { email, username, password } in the request body.
 */
app.post('/api/register', async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    // Basic validation
    if (!email || !username || !password) {
      return res.status(400).json({ error: 'Email, username, and password are required.' });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (existingUser) {
      return res.status(409).json({ error: 'User with this email or username already exists.' });
    }

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user in the database
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    // Respond with the created user (omitting the password)
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);

  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
});

/**
 * Start the Express server.
 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
