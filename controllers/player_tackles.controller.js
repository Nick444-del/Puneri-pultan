import connection from "../config/dbconfig.js";

export const getTackle = async (req, res) => {
    connection.query("SELECT * FROM player_tackle", (err, rows) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
        return res.status(200).json({
            data: rows,
            success: true,
            message: "Success"
        })
    })
}

export const createTackle = async (req, res) => {
    const { player_id, no_of_super_tackles, total_tackle, tackle_strike_rate } =  req.body

    connection.query("INSERT INTO player_tackle (player_id, no_of_super_tackles, total_tackle, tackle_strike_rate) VALUES (?, ?, ?, ?)", [player_id, no_of_super_tackles, total_tackle, tackle_strike_rate], (err, rows) => {
        if(err){
            return res.status(500).json({ success: false, message: err.message })
        }
        try {
            return res.status(200).json({
                data: rows,
                success: true,
                message: "Success"
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    })
}

export const getTackleById = async (req, res) => {
    const id = req.params;
    connection.query('SELECT * FROM player_tackle WHERE id = ?', [id], (err, rows) => {
        if(err) return res.status(500).json({ success: false, message: err.message });
        return res.status(200).json({
            data: rows,
            success: true,
            message: "Success"
        })
    })
}

export const updateTackleById = async (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM player_tackle WHERE id = ?', [id], (err, rows) => {
        if(err) return res.status(500).json({ success: false, message: err.message });
        if(rows.length === 0){
            return res.status(404).json({
                success: false,
                message: "Data not found"
            })
        }
        const { player_id, no_of_super_tackles, total_tackle, tackle_strike_rate } = req.body;
        connection.query('UPDATE player_tackle SET player_id = ?, no_of_super_tackles = ?, total_tackle = ?, tackle_strike_rate = ? WHERE id = ?', [player_id, no_of_super_tackles, total_tackle, tackle_strike_rate, id], (err, rows) => {
            if(err) return res.status(500).json({ success: false, message: err.message });
            return res.status(200).json({
                data: rows,
                success: true,
                message: "Success"
            })
        })
    })
}

export const deleteTackleById = async (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM player_tackle WHERE id = ?', [id], (err, rows) => {
        if(err) return res.status(500).json({ success: false, message: err.message });
        return res.status(200).json({
            data: rows,
            success: true,
            message: "Success"
        })
    })
}