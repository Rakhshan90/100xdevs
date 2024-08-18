import { Client } from "pg";

const client = new Client({
    connectionString: 'postgresql://rakhshan:mysecretpassword@localhost:5432/rakhshan'
});


const createUserTable = async () => {
    await client.connect();
    const res = await client.query(`
        CREATE TABLE users3 (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `)
    console.log(res);

    await client.end();
}

// createUserTable();

const createAddressesTable = async () => {
    await client.connect();
    const res = await client.query(`
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
    `)
    console.log(res);

    await client.end();
}

// createAddressesTable();

const insertUser = async (username: string, email: string, password: string) => {
    await client.connect();
    const query = `INSERT INTO users (username, email, password) 
    VALUES ($1, $2, $3);`
    const values = [username, email, password];
    const res = await client.query(query, values);

    console.log(res);

    await client.end();
}

// insertUser('i.rkahshan007', 'rakhshan@gmail.com', 'pass');


const getUser = async (username: string) => {
    await client.connect();
    const query = `SELECT * FROM users WHERE username = $1`
    const value = [username];
    const res = await client.query(query, value);

    console.log(res.rows);

    await client.end();
}

// getUser('rakhshan90');

async function insertUserAndAddress(
    username: string, 
    email: string, 
    password: string, 
    city: string, 
    country: string, 
    street: string, 
    pincode: string
) {
    try {
        await client.connect();

        // Start transaction
        await client.query('BEGIN');

        // Insert user
        const insertUserText = `
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING id;
        `;
        const userRes = await client.query(insertUserText, [username, email, password]);
        const userId = userRes.rows[0].id;

        // Insert address using the returned user ID
        const insertAddressText = `
            INSERT INTO addresses (user_id, city, country, street, pincode)
            VALUES ($1, $2, $3, $4, $5);
        `;
        await client.query(insertAddressText, [userId, city, country, street, pincode]);

        // Commit transaction
        await client.query('COMMIT');

        console.log('User and address inserted successfully');
    } catch (err) {
        await client.query('ROLLBACK'); // Roll back the transaction on error
        console.error('Error during transaction, rolled back.', err);
        throw err;
    } finally {
        await client.end(); // Close the client connection
    }
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
async function getUserDetailsWithAddress(userId: string) {
    
    try {
        await client.connect();
        const query = `
            SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
            FROM users u
            JOIN addresses a ON u.id = a.user_id
            WHERE u.id = $1
        `;
        const result = await client.query(query, [userId]);

        if (result.rows.length > 0) {
            console.log('User and address found:', result.rows[0]);
            return result.rows[0];
        } else {
            console.log('No user or address found with the given ID.');
            return null;
        }
    } catch (err) {
        console.error('Error during fetching user and address:', err);
        throw err;
    } finally {
        await client.end();
    }
}
getUserDetailsWithAddress("1");