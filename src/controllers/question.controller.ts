import { Request, Response } from 'express';
import { Question } from '../models/question.model';

export const createQuestion = async (req: Request, res: Response) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json(question);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllQuestions = async (req: Request, res: Response) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getQuestionById = async (req: Request, res: Response) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json(question);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json(question);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
