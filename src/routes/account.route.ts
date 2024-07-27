import express from 'express';
import {
  createAccount,
  loginToAccount,
  getAllAccounts,
  getAccountById,
  updateAccount,
  deleteAccount,
} from '../controllers/account.controller';

const router = express.Router();

router.post('/signup', createAccount);
router.post('/login', loginToAccount);
router.get('/', getAllAccounts);
router.get('/:id', getAccountById);
router.put('/:id', updateAccount);
router.delete('/:id', deleteAccount);

export default router;
