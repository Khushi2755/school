const db = require("../db"); // Ensure correct path

// Add a new school
exports.addSchool = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const sql = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
        await db.execute(sql, [name, address, latitude, longitude]);
        res.status(201).json({ message: "School added successfully" });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// List schools based on latitude and longitude
exports.listSchools = async (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: "Latitude and longitude are required" });
    }

    try {
        const sql = `
            SELECT *, 
            ( 6371 * acos( cos( radians(?) ) * cos( radians( latitude ) ) * 
            cos( radians( longitude ) - radians(?) ) + sin( radians(?) ) * 
            sin( radians( latitude ) ) ) ) AS distance 
            FROM schools 
            ORDER BY distance 
            LIMIT 10
        `;
        
        const [schools] = await db.execute(sql, [latitude, longitude, latitude]);
        res.status(200).json(schools);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
