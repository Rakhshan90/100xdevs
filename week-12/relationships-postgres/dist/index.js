"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    connectionString: 'postgresql://rakhshan:mysecretpassword@localhost:5432/rakhshan'
});
const createUserTable = () => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    const res = yield client.query(`
        CREATE TABLE users3 (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);
    console.log(res);
    yield client.end();
});
// createUserTable();
const createAddressesTable = () => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    const res = yield client.query(`
        CREATE TABLE addresses (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            city VARCHAR(100) NOT NULL,
            country VARCHAR(100) NOT NULL,
            street VARCHAR(255) NOT NULL,
            pincode VARCHAR(20),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
    `);
    console.log(res);
    yield client.end();
});
// createAddressesTable();
const insertUser = (username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    const query = `INSERT INTO users (username, email, password) 
    VALUES ($1, $2, $3);`;
    const values = [username, email, password];
    const res = yield client.query(query, values);
    console.log(res);
    yield client.end();
});
// insertUser('i.rkahshan007', 'rakhshan@gmail.com', 'pass');
const getUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    const query = `SELECT * FROM users WHERE username = $1`;
    const value = [username];
    const res = yield client.query(query, value);
    console.log(res.rows);
    yield client.end();
});
// getUser('rakhshan90');
function insertUserAndAddress(username, email, password, city, country, street, pincode) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            // Start transaction
            yield client.query('BEGIN');
            // Insert user
            const insertUserText = `
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING id;
        `;
            const userRes = yield client.query(insertUserText, [username, email, password]);
            const userId = userRes.rows[0].id;
            // Insert address using the returned user ID
            const insertAddressText = `
            INSERT INTO addresses (user_id, city, country, street, pincode)
            VALUES ($1, $2, $3, $4, $5);
        `;
            yield client.query(insertAddressText, [userId, city, country, street, pincode]);
            // Commit transaction
            yield client.query('COMMIT');
            console.log('User and address inserted successfully');
        }
        catch (err) {
            yield client.query('ROLLBACK'); // Roll back the transaction on error
            console.error('Error during transaction, rolled back.', err);
            throw err;
        }
        finally {
            yield client.end(); // Close the client connection
        }
    });
}
// Example usage
// insertUserAndAddress(
//     'alenparker', 
//     'alen.parker@example.com', 
//     'securepassword123', 
//     'New York', 
//     'USA', 
//     '123 Broadway St', 
//     '10001'
// );
// Async function to fetch user data and their address together
function getUserDetailsWithAddress(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const query = `
            SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
            FROM users u
            JOIN addresses a ON u.id = a.user_id
            WHERE u.id = $1
        `;
            const result = yield client.query(query, [userId]);
            if (result.rows.length > 0) {
                console.log('User and address found:', result.rows[0]);
                return result.rows[0];
            }
            else {
                console.log('No user or address found with the given ID.');
                return null;
            }
        }
        catch (err) {
            console.error('Error during fetching user and address:', err);
            throw err;
        }
        finally {
            yield client.end();
        }
    });
}
getUserDetailsWithAddress("1");
