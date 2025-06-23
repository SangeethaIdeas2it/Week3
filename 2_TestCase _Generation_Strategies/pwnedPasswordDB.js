// pwnedPasswordDB.js

// A mock database of commonly used or "pwned" passwords.
// In a real application, this would be a connection to a real database service.
const pwnedPasswords = new Set([
    '123456',
    'password',
    '12345678',
    'qwerty',
    '123456789',
    '12345',
    '1234',
    '111111',
    '1234567',
    'dragon',
]);

let isConnected = true;

const pwnedPasswordDB = {
    /**
     * Checks if a password is in the pwned list.
     * Simulates an async database query.
     * @param {string} password The password to check.
     * @returns {Promise<boolean>} A promise that resolves to true if the password is pwned.
     */
    isPwned(password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!isConnected) {
                    reject(new Error('Database connection failed.'));
                }
                resolve(pwnedPasswords.has(password));
            }, 50); // Simulate network latency
        });
    },

    /**
     * A utility function for tests to simulate database connection status.
     * @param {boolean} status The desired connection status.
     */
    setConnectionStatus(status) {
        isConnected = status;
    },
};

module.exports = pwnedPasswordDB; 