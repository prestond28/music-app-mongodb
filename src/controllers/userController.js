"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHighScore = void 0;
const mongodb_1 = require("mongodb");
const index_1 = require("../db/index");
// Update high score or create user if not exists
const updateHighScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, highscore } = req.body;
    console.log(id, name, highscore);
    if (!mongodb_1.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid user id' });
    }
    if (!name || typeof highscore !== 'number') {
        return res.status(400).json({ error: 'Name and highScore are required' });
    }
    try {
        const db = (0, index_1.getDb)();
        const result = yield db.collection('users').findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, { $set: { name, highscore } }, { upsert: true, returnDocument: 'after' });
        if (!result || !result.value) {
            return res.status(404).json({ error: 'User not found or not created' });
        }
        res.json(result.value);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});
exports.updateHighScore = updateHighScore;
