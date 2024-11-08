import connection from "../config/dbconfig.js";

export const getPlayerRole = async (req, res) => {
    connection.query('SELECT * FROM player_role', (err, rows) => {
        if(err) throw err;
        return res.status(200).json({
            data: rows,
            success: true,
            message: "Success"
        })
    })
}

export const createPlayerRole = async (req, res) => {
    const { player_role } = req.body
    console.log(player_role);
    connection.query(`INSERT INTO player_role(player_role) VALUES (?)`,[player_role], (err, rows) => {
        if (err){
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
        try{
            return res.status(200).json({
                data: rows,
                success: true,
                message: "Success"
            })
        }catch(err){
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
    })
}

export const deletePlayerRole = async (req, res) => {
    const { id } = req.params;
    connection.query(`DELETE FROM player_role WHERE id = (?)`, [id], (err, rows) => {
        if(err){
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
        try{
            return res.status(200).json({
                data: rows,
                success: true,
                message: "Data deleted successfully"
            })
        }catch(err){
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
    })
}

export const getPlayerRoleById = async (req, res) => {
    const { id } = req.params;
    connection.query(`SELECT * FROM player_role WHERE id = (?)`, [id], (err, rows) => {
        if(err){
            return res.status(500).json({
                success: false,
                message: err.message
            })
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

export const updatePlayerRole = async (req, res) => {
    const { id } = req.params;
    const { player_role } = req.body;
    connection.query(`UPDATE player_role SET player_role = (?) WHERE id = (?)`, [player_role, id], (err, rows) => {
        if(err){
            return res.status(500).json({
                success: false,
                message: err.message
            })
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