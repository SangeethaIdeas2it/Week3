// policyApi.js

// A mock API client for fetching password policies.
// In a real application, this would make an HTTP request to an external API.

let isApiAvailable = true;

const policyApi = {
    /**
     * Fetches the password policy from a remote server.
     * Simulates an async API call.
     * @returns {Promise<object>} A promise that resolves to the policy object.
     */
    getPolicy() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!isApiAvailable) {
                    reject(new Error('API request failed.'));
                }
                // Realistic test data for a password policy
                resolve({
                    minLength: 8,
                    requiresUppercase: true,
                    requiresLowercase: true,
                    requiresNumber: true,
                    requiresSpecialCharacter: true,
                });
            }, 50); // Simulate network latency
        });
    },

    /**
     * A utility function for tests to simulate API availability.
     * @param {boolean} status The desired API availability status.
     */
    setApiStatus(status) {
        isApiAvailable = status;
    },
};

module.exports = policyApi; 