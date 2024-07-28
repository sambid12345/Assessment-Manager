import { Request, Response } from 'express';
import { Account } from '../models/account.model';
import bcrypt from "bcryptjs"

export const createAccount = async (req: Request, res: Response) => {

    const { username, email, password, role} = req.body;

    // Check if user with the provided email or username already exists
    const existingUser = await Account.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with the provided email or username already exists' });
    }

    // Hash the password using bcrypt (includes salting)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
  try {
    const account = new Account(
        {
            username,
            email,
            password: hashedPassword,
            role
        }
    );
    await account.save();
    res.status(201).json(account);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const loginToAccount = async (req: Request, res: Response) => {
    console.log('login requested', req.body);
    try {
        const { email, password } = req.body;
  
        // Check if user exists with the provided email
        const user = await Account.findOne({ email });
        if (!user) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
  
        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Respond with success message
        let userInfo = {userMail:user.email, userName: user.username, userRole: user.role};
        res.status(200).json({ 
          message: 'Login successful', 
          userInfo: userInfo
        });
      } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
}

export const getAllAccounts = async (req: Request, res: Response) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAccountById = async (req: Request, res: Response) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    res.status(200).json(account);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateAccount = async (req: Request, res: Response) => {
  try {
    const account = await Account.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    res.status(200).json(account);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const account = await Account.findByIdAndDelete(req.params.id);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
