# De-Dupe CSV files by leading ID

## Get Started

    cp .env.dist .env && npm install

## File structure

This script assumes the leading column is a unique `id` field, and will de-dupe only on that field.
