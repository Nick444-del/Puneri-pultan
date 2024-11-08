import multer from "multer";
import fs from "fs";

import connection from "../config/dbconfig";
import storage from "../utilities/image";
import { fivehunderd } from "../utilities/error";

const upload = multer({ storage: storage });

export const getPlayers = async (req, res) => {
    connection.query('SELECT * FROM player_basic', (err, rows) => {
        if (err) {
            fivehunderd(err);
        };
        return res.status(200).json({
            data: rows,
            success: true,
            message: "Success"
        })
    })
}

export const createPlayer = async (req, res) => {
    const uploadImageWithData = upload.fields([
        { name: "player_icon_image", maxCount: 1 },
        { name: "player_hero_image", maxCount: 1 },
        { name: "player_full_image", maxCount: 1 }
    ]);
    uploadImageWithData(req, res, async (err) => {
        if (err) return res.status(400).json({ message: err.message, success: false });
        let player_icon_image = null;
        let player_hero_image = null;
        let player_full_image = null;

        if (req.files["player_icon_image"]) {
            player_icon_image = req.files["player_icon_image"][0].filename;
        }
        if (req.files["player_hero_image"]) {
            player_hero_image = req.files["player_hero_image"][0].filename;
        }
        if (req.files["player_full_image"]) {
            player_full_image = req.files["player_full_image"][0].filename;
        }
        // console.log(player_icon_image, player_hero_image, player_full_image);
        const { jersey_no, position, player_name, player_dob, player_nationality } = req.body;

        connection.query(`INSERT INTO player_basic(jersey_no, position, player_name, player_dob, player_nationality, player_icon_image, player_hero_image, player_full_image) VALUES(?,?,?,?,?,?,?,?)`,
            [jersey_no, position, player_name, player_dob, player_nationality, player_icon_image, player_hero_image, player_full_image], (err, rows) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    })
                }
                try {
                    return res.status(201).json({
                        data: rows,
                        success: true,
                        message: "Success"
                    })
                } catch (error) {
                    return res.status(500).json({
                        success: false,
                        message: error.message
                    })
                    // fivehunderd(error);
                }
            });
    })
}

export const deletePlayer = (req, res) => {
    const { id } = req.params;
    connection.query(`SELECT * FROM player_basic WHERE id = ?`, [id], (err, data) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
        if (data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Data not found"
            })
        }
        const player = data[0];
        if (player.player_icon_image) {
            console.log(player.player_icon_image);
            fs.unlinkSync(`./uploads/${player.player_icon_image}`, (err) => {
                if (err) console.log(`Failed to delete player_full_image: ${err.message}`)
            })
        }
        if (player.player_hero_image) {
            console.log(player.player_hero_image);
            fs.unlinkSync(`./uploads/${player.player_hero_image}`, (err) => {
                if (err) console.log(`Failed to delete player_full_image: ${err.message}`)
            })
        }
        if (player.player_full_image) {
            console.log(player.player_full_image);
            fs.unlinkSync(`./uploads/${player.player_full_image}`, (err) => {
                if (err) console.log(`Failed to delete player_full_image: ${err.message}`)
            })
        }
    });
    connection.query(`DELETE FROM player_basic WHERE id = (?)`, [id], (err, rows) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
        try {
            return res.status(200).json({
                data: rows,
                success: true,
                message: "Data deleted successfully"
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    })
}

export const getPlayer = (req, res) => {
    const { id } = req.params;
    connection.query(`SELECT * FROM player_basic WHERE id = (?)`, [id], (err, rows) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Data not found"
            })
        }
        return res.status(200).json({
            data: rows,
            success: true,
            message: "Success"
        })
    })
}

export const updatePlayer = (req, res) => {
    const { id } = req.params;

    connection.query('SELECT * FROM player_basic WHERE id = ?', [id], (err, rows) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Player not found"
            });
        }

        const updateImageWithData = upload.files([
            { name: "player_icon_image", maxCount: 1 },
            { name: "player_hero_image", maxCount: 1 },
            { name: "player_full_image", maxCount: 1 }
        ]);

        updateImageWithData(req, res, async (err) => {
            if (err) return res.status(400).json({ success: false, message: err.message });

            let player_icon_image = rows[0].player_icon_image;
            let player_hero_image = rows[0].player_hero_image;
            let player_full_image = rows[0].player_full_image;

            if (req.files && req.files["player_icon_image"]) {
                fs.unlink(`./uploads/${player_icon_image}`, (err) => {
                    if (err) console.log(`Failed to delete player_icon_image: ${err.message}`);
                });
                player_icon_image = req.files["player_icon_image"][0].filename;
            }
            if (req.files && req.files["player_hero_image"]) {
                fs.unlink(`./uploads/${player_hero_image}`, (err) => {
                    if (err) console.log(`Failed to delete player_hero_image: ${err.message}`);
                });
                player_hero_image = req.files["player_hero_image"][0].filename;
            }
            if (req.files && req.files["player_full_image"]) {
                fs.unlink(`./uploads/${player_full_image}`, (err) => {
                    if (err) console.log(`Failed to delete player_full_image: ${err.message}`);
                });
                player_full_image = req.files["player_full_image"][0].filename;
            }

            const { jersey_no, position, player_name, player_dob, player_nationality } = req.body;

            connection.query(
                `UPDATE player_basic SET jersey_no = ?, position = ?, player_name = ?, player_dob = ?, player_nationality = ?, player_icon_image = ?, player_hero_image = ?, player_full_image = ? WHERE id = ?`,
                [jersey_no, position, player_name, player_dob, player_nationality, player_icon_image, player_hero_image, player_full_image, id],
                (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    }

                    // Optionally, perform a SELECT query to return the updated data if needed
                    return res.status(200).json({
                        success: true,
                        message: "Player updated successfully",
                        affectedRows: result.affectedRows
                    });
                }
            );
        });
    });
};

export const getPlayerWithAllData = async (req, res) => {
    connection.query(`SELECT * FROM player_basic 
        INNER JOIN player_raids ON player_basic.id = player_raids.player_id 
        INNER JOIN player_role ON player_basic.position = player_role.id
        INNER JOIN overall_played ON player_basic.id = overall_played.player_id
        INNER JOIN player_tackle ON player_basic.id = player_tackle.player_id`, (err, rows) => {
        if(err) return res.status(500).json({ error: err.message });
        return res.status(200).json({
            data: rows,
            success: true,
            message: "Success"
        })
    })
}