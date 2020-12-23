#!/usr/bin/env node
'use strict';

require('dotenv').config()
const csv = require('csv-parser');
const fs = require('fs');
const { exit } = require('process');
require('dotenv').config();
var stringify = require('csv-stringify');
const results = [];

const items = fs.readFileSync(process.env.CSV_UNIQUE)
    .toString() // convert Buffer to string
    .split('\n') // split string to lines
    .map(e => e.trim()) // remove white spaces for each line
    .map(e => e.split(',').map(e => e.trim())); // split each line to array

const uniques = items[0];

console.log(`${uniques.length} unique items`);

const accounts = fs.readFileSync(process.env.CSV_ALL)
    .toString() // convert Buffer to string
    .split('\n') // split string to lines
    .map(e => e.trim()) // remove white spaces for each line
    .map(e => e.split(',').map(e => e.trim())); // split each line to array

accounts.forEach(row => {
    if(uniques.includes(row[0])) {
        results.push(row);
    }
});

console.log(`${results.length} items`);

stringify(results, function(err, output){
    fs.writeFile('results.csv', output, function(err) {
        if(err) {
            console.error(err);
        }
        console.log('Final output file written');
    })
});

