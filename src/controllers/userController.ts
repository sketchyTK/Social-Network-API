import User from '../models/user.js';
import { Request, Response } from 'express';

export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getOneUser = async (_req: Request, res: Response) => {
    try {
        const user = await User.findOne({_id: _req.params.userId});
        if (!user) {
            res.status(404).json({ message: 'No user with that ID' });
        } else {
            res.json(user);
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

export const createUser = async (_req: Request, res: Response) => {
    try {
        const dbUserData = await User.create(_req.body);
        res.json(dbUserData);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const updateUser = async (_req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            {_id: _req.params.userId},
            {$set: _req.body},
            {runValidators: true, new: true}
        );
        if (!user) {
            return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(user);
        return;
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
      return; 
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
        }
        res.json({ message: 'User deleted!' })
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}