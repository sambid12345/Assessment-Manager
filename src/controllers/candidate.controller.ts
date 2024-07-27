import { Request, Response } from 'express';
import { Candidate } from '../models/candidate.model';

export const createCandidate = async (req: Request, res: Response) => {
  try {
    const candidate = new Candidate(req.body);
    await candidate.save();
    res.status(201).json(candidate);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllCandidates = async (req: Request, res: Response) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getCandidateById = async (req: Request, res: Response) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    res.status(200).json(candidate);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateCandidate = async (req: Request, res: Response) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    res.status(200).json(candidate);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteCandidate = async (req: Request, res: Response) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    res.status(200).json({ message: 'Candidate deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
