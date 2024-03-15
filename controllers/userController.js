const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');


function generateAuthToken(user) {
    
    const expiresIn = '1h';
    
    const token = jwt.sign({ id: user._id }, 'your_secret_key', { expiresIn });
    return token;
}

class UserController {
    async registerUser(req, res) {
        try {
            const { name, email, password } = req.body;
            
            
            const hashedPassword = await bcrypt.hash(password, 10);
    
            
            const newUser = await User.create({ name, email, password: hashedPassword });
    
            
            res.status(201).json(newUser);
        } catch (error) {
            
            res.status(500).json({ message: error.message });
        }
    }
    
    async getAllUser(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getOne(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async delete(req, res) {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async loginUser(req, res) {
        try {
            const { email, name } = req.body;
            
            
            const user = await User.findOne({ email, name });
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or name' });
            }
            
            
            const token = generateAuthToken(user);
    
            
            res.json({ token });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
}

module.exports = new UserController();
