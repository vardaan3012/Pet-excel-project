const express = require("express");
const excelToJson = require('convert-excel-to-json');
const fs = require("fs");
try {
    fs.mkdirSync(__dirname + "/excel_uploads");
}
catch (error) { }
const app = express();

const Pet = require('../models/pet');

module.exports.CreatePetsDataInDatabase = function (req, res) {
    const excel_file = req.files.file;

    excel_file.mv(__dirname + "/excel_uploads/" + excel_file.name, function (err, result) {
        if (err)
            throw err;
        else {
            const result = excelToJson({
                sourceFile: __dirname + "/excel_uploads/" + excel_file.name,
                header: {
                    rows: 1
                },
                columnToKey: {
                    A: 'Name',
                    B: 'Type',
                    C: 'Breed',
                    D: 'Age'
                }
            });
            Pet.insertMany(result["Sheet1"])
                .then(function (docs) {
                    res.sendStatus(201);
                })
                .catch(function (err) {
                    res.status(500).send(err);
                });
        }
    });
}

module.exports.getPets = async function (req, res) {
    const data = await Pet.find();
    res.json(data);
}

module.exports.getPet = async function (req, res) {
    try {
        var id = req.params.petId;
        const data = await Pet.findById(id);
        res.json(data);
    }
    catch (error) {
        res.sendStatus(404);
    }
}

module.exports.updatePet = async function (req, res) {
    try {
        var patch_id = req.params.petId;
        const new_data = req.body;
        const data = await Pet.findByIdAndUpdate(patch_id, new_data);
        const updated_data = await Pet.findById(patch_id);
        res.json(updated_data);
    }
    catch (error) {
        res.sendStatus(404);
    }
}

module.exports.deletePet = async function (req, res) {
    try {
        var delete_id = req.params.petId;
        await Pet.findByIdAndDelete(delete_id);
        res.sendStatus(204);
    }
    catch (error) {
        res.sendStatus(404);
    }
}

