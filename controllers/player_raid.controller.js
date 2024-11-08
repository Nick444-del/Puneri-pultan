import connection from "../config/dbconfig";

export const getPlayerRaid = async (req, res) => {
    connection.query("SELECT * FROM player_raids", (err, rows) => {
        if(err) throw err;
        return res.status(200).json({
            data: rows,
            success: true,
            message: "Success"
        })
    })
}

export const createPlayerRaid = async (req, res) => {
    const { player_id, no_super_raids, super_ten, avg_raid_points, total_raid, raid_strike_rate } = req.body
    connection.query("INSERT INTO player_raids (player_id, no_super_raids, super_ten, avg_raid_points, total_raid, raid_strike_rate) VALUES (?, ?, ?, ?, ?, ?)", [player_id, no_super_raids, super_ten, avg_raid_points, total_raid, raid_strike_rate], (err, rows) => {
        if(err){
            return res.status(400).json({
                success: false,
                message: err.message
            })
        }
        return res.status(200).json({
            data: rows,
            success: true,
            message: "Created new Data"
        })
    })
}

export const deletePlayerRaid = async (req, res) => {
    const player_id = req.params;
    connection.query("DELETE FROM player_raids WHERE id = (?)", [player_id], (err, rows) => {
        if(err){
            return res.status(400).json({
                success: false,
                message: err.message
            })
        }
        return res.status(200).json({
            data: rows,
            success: true,
            message: "Data deleted successfully"
        })
    })
}

export const updatePlayerRaid = async (req, res) => {
    const player_id = req.params;
    connection.query("SELECT * FROM player_raids WHERE id = (?)", [player_id], (err, rows) => {
        if(err){
            return res.status(400).json({
                success: false,
                message: err.message
            })
        }
        if(rows.length === 0){
            return res.status(404).json({
                success: false,
                message: "Data not found"
            })
        }
    })
}