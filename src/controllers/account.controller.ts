import { Request, Response } from 'express';
import { Account } from '../models/account.model';

export const createAccount = async (req: Request, res: Response) => {
  try {
    const account = new Account(req.body);
    await account.save();
    res.status(201).json(account);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

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
