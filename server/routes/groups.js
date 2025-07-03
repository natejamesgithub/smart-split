const express = require('express'); 
const router = express.Router();  
const Group = require("../models/Group"); 


// POST / api/groups - create a new group 
router.post("/", async (req, res) => {
    const { name, members, createdBy } = req.body; 

    if (!name || !members || !Array.isArray(members) || members.length == 0) {
        return res.status(400).json({ message: "Group name and member emails are required."}); 
    }

    try {
        const newGroup = new Group({ name, members, createdBy }); 
        await newGroup.save();
        res.status(201).json(newGroup); 
    } catch (err) {
        console.error("[ERROR] Creating group:", err); 
        res.status(500).json({ message: "Failed to create group."}); 
    }
}); 

// GET / api/groups?user=email - fetch groups for a specific user 
router.get("/", async (req, res) => {
    const { user } = req.query; 
    if (!user) return res.status(400).jsob({ message: "Missing user email."}); 

    try {
        const groups = await Group.find({ members: user }); 
        res .json(groups); 
    } catch (err) {
        console.error("[ERROR] Fetching groups:", err); 
        res.status(500).json({ message: "Failed to fetch groups."}); 
    }
}); 

// GET /api/groups/:id - fetch one group by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params; 

    try { 
        const group = await Group.findById(id); 
        if (!group) return res.status(404).json({ message: "Group not found."}); 
        res.json(group); 
    } catch (err) {
        console.error("[ERROR] Fetching group by ID:", err); 
        res.status(500).json({ message: "Failed to fetch group."}); 
    }
}); 

module.exports = router; 