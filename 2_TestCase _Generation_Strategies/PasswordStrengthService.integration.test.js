const PasswordStrengthService = require('./PasswordStrengthService');
const pwnedPasswordDB = require('./pwnedPasswordDB');
const policyApi = require('./policyApi');

// Mock the external dependencies
jest.mock('./pwnedPasswordDB');
jest.mock('./policyApi');

describe('PasswordStrengthService - Integration Tests', () => {
    let service;

    beforeEach(() => {
        service = new PasswordStrengthService();
        // Reset mocks before each test
        pwnedPasswordDB.isPwned.mockClear();
        policyApi.getPolicy.mockClear();
    });

    test('should return valid for a strong, unique password', async () => {
        // Arrange
        const testPassword = 'aStrongPassword123!';
        pwnedPasswordDB.isPwned.mockResolvedValue(false); // Not a pwned password
        policyApi.getPolicy.mockResolvedValue({ // Standard policy
            minLength: 8,
            requiresUppercase: true,
            requiresLowercase: true,
            requiresNumber: true,
            requiresSpecialCharacter: true,
        });

        // Act
        const result = await service.checkPassword(testPassword);

        // Assert
        expect(result.isValid).toBe(true);
        expect(result.message).toBe('Password is valid and secure.');
        expect(pwnedPasswordDB.isPwned).toHaveBeenCalledWith(testPassword);
        expect(policyApi.getPolicy).toHaveBeenCalledTimes(1);
    });

    test('should return invalid for a pwned password', async () => {
        // Arrange
        const testPassword = 'password'; // A very common password
        pwnedPasswordDB.isPwned.mockResolvedValue(true); // Is a pwned password

        // Act
        const result = await service.checkPassword(testPassword);

        // Assert
        expect(result.isValid).toBe(false);
        expect(result.message).toBe('This password has appeared in a data breach and is not secure.');
        expect(pwnedPasswordDB.isPwned).toHaveBeenCalledWith(testPassword);
        expect(policyApi.getPolicy).not.toHaveBeenCalled(); // Should not check policy if pwned
    });

    test('should return invalid if password does not meet policy', async () => {
        // Arrange
        const testPassword = 'weak';
        pwnedPasswordDB.isPwned.mockResolvedValue(false);
        policyApi.getPolicy.mockResolvedValue({ // Strict policy
            minLength: 10,
            requiresUppercase: true,
            requiresLowercase: true,
            requiresNumber: false,
            requiresSpecialCharacter: false,
        });

        // Act
        const result = await service.checkPassword(testPassword);

        // Assert
        expect(result.isValid).toBe(false);
        expect(result.message).toBe('Password must be at least 10 characters long.');
    });

    test('should handle database failure gracefully', async () => {
        // Arrange
        const testPassword = 'aGoodPassword1!';
        const dbError = new Error('Database connection failed.');
        pwnedPasswordDB.isPwned.mockRejectedValue(dbError);

        // Act
        const result = await service.checkPassword(testPassword);

        // Assert
        expect(result.isValid).toBe(false);
        expect(result.message).toBe('Could not verify password security. Please try again later.');
    });

    test('should handle API failure gracefully', async () => {
        // Arrange
        const testPassword = 'aGoodPassword1!';
        const apiError = new Error('API request failed.');
        pwnedPasswordDB.isPwned.mockResolvedValue(false);
        policyApi.getPolicy.mockRejectedValue(apiError);

        // Act
        const result = await service.checkPassword(testPassword);

        // Assert
        expect(result.isValid).toBe(false);
        expect(result.message).toBe('Could not retrieve password policy. Please try again later.');
    });
}); 