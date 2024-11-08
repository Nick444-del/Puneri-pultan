import connection from "../config/dbconfig";

export const getplayedData = async (req, res) => {
    connection.query('SELECT * FROM overall_played', (err, data) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
        return res.status(200).json({
            data: data,
            success: true,
            message: "Success"
        })
    })
}

export const createPlayedData = async (req, res) => {
    const { player_id, match_played, total_points_earned, most_points_match, not_out_percentage } = req.body;
    connection.query('INSERT INTO overall_played (player_id, match_played, total_points_earned, most_points_match, not_out_percentage) VALUES (?, ?, ?, ?, ?)', [player_id, match_played, total_points_earned, most_points_match, not_out_percentage], (err, rows) => {
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

export const deletePlayedData = async (req, res) => {
    const player_id = req.params.id;
    connection.query('DELETE FROM overall_played WHERE id = ?', [player_id], (err, rows) => {
        if(err) return res.status(500).json({ success: false, message: err.message });
        return res.status(200).json({
            data: rows,
            success: true,
            message: "Data deleted successfully"
        })
    })
}

export const getPlayedDataById = async (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM overall_played WHERE id = ?', [id], (err, rows) => {
        if(err) return res.status(500).json({ success: false, message: err.message });
        if(rows.length === 0){
            return res.status(404).json({
                success: false, 
                message: "Data not Found"
            })
        }
        return res.status(200).json({
            data: rows,
            success: true,
            message: "Success"
        })
    })
}

export const updatePlayedDataById = async (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM overall_played WHERE id = ?', [id], (err, rows) => {
        if(err) return res.status(500).json({ success: false, message: err.message });
        if(rows.length === 0){
            return res.status(404).json({
                success: false, 
                message: "Data not Found"
            })
        }
        const { player_id, match_played, total_points_earned, most_points_match, not_out_percentage } = req.body;
        connection.query('UPDATE * FROM overall_played WHERE id = ?')
    })
}