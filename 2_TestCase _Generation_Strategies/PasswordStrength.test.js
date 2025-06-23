const PasswordStrength = require('./PasswordStrength');

describe('PasswordStrength', () => {
    let passwordStrength;

    beforeEach(() => {
        passwordStrength = new PasswordStrength();
    });

    describe('checkStrength', () => {
        // Failure scenarios
        test('should return Invalid for non-string input', () => {
            // Arrange
            const invalidPasswords = [null, undefined, 123, {}, []];
            
            // Act & Assert
            invalidPasswords.forEach(password => {
                expect(passwordStrength.checkStrength(password)).toBe('Invalid');
            });
        });

        // Weak passwords
        test('should return Weak for passwords shorter than 8 characters', () => {
            // Arrange
            const password = 'abc';
            // Act
            const strength = passwordStrength.checkStrength(password);
            // Assert
            expect(strength).toBe('Weak');
        });
        
        test('should return Weak for 8-character password with only one character type', () => {
            // Arrange
            const password = 'abcdefgh';
            // Act
            const strength = passwordStrength.checkStrength(password);
            // Assert
            expect(strength).toBe('Weak');
        });

        // Medium passwords
        test('should return Medium for password with adequate length and multiple character types', () => {
            // Arrange
            const password = 'Password1';
            // Act
            const strength = passwordStrength.checkStrength(password);
            // Assert
            expect(strength).toBe('Medium');
        });

        // Strong passwords
        test('should return Strong for long password with multiple character types', () => {
            // Arrange
            const password = 'Password1234';
            // Act
            const strength = passwordStrength.checkStrength(password);
            // Assert
            expect(strength).toBe('Strong');
        });

        test('should return Very Strong for very long password with all character types', () => {
             // Arrange
            const password = 'Password123!';
            // Act
            const strength = passwordStrength.checkStrength(password);
            // Assert
            expect(strength).toBe('Very Strong');
        });
    });

    describe('hasMinimumLength', () => {
        // Success scenarios
        test('should return true if password length is equal to minimum', () => {
            // Arrange
            const password = '12345678';
            // Act & Assert
            expect(passwordStrength.hasMinimumLength(password, 8)).toBe(true);
        });

        test('should return true if password length is greater than minimum', () => {
            // Arrange
            const password = '123456789';
            // Act & Assert
            expect(passwordStrength.hasMinimumLength(password, 8)).toBe(true);
        });

        // Failure scenarios
        test('should return false if password length is less than minimum', () => {
            // Arrange
            const password = '1234567';
            // Act & Assert
            expect(passwordStrength.hasMinimumLength(password, 8)).toBe(false);
        });
        
        test('should return false for non-string input', () => {
            // Arrange
            const password = null;
            // Act & Assert
            expect(passwordStrength.hasMinimumLength(password, 8)).toBe(false);
        });
    });

    describe('hasUppercase', () => {
        test('should return true for password with uppercase letters', () => {
            // Arrange
            const password = 'Password';
            // Act & Assert
            expect(passwordStrength.hasUppercase(password)).toBe(true);
        });

        test('should return false for password without uppercase letters', () => {
            // Arrange
            const password = 'password';
            // Act & Assert
            expect(passwordStrength.hasUppercase(password)).toBe(false);
        });
    });

    describe('hasLowercase', () => {
        test('should return true for password with lowercase letters', () => {
            // Arrange
            const password = 'Password';
            // Act & Assert
            expect(passwordStrength.hasLowercase(password)).toBe(true);
        });

        test('should return false for password without lowercase letters', () => {
            // Arrange
            const password = 'PASSWORD';
            // Act & Assert
            expect(passwordStrength.hasLowercase(password)).toBe(false);
        });
    });

    describe('hasNumber', () => {
        test('should return true for password with numbers', () => {
            // Arrange
            const password = 'Password123';
            // Act & Assert
            expect(passwordStrength.hasNumber(password)).toBe(true);
        });

        test('should return false for password without numbers', () => {
            // Arrange
            const password = 'Password';
            // Act & Assert
            expect(passwordStrength.hasNumber(password)).toBe(false);
        });
    });

    describe('hasSpecialCharacter', () => {
        test('should return true for password with special characters', () => {
            // Arrange
            const password = 'Password!';
            // Act & Assert
            expect(passwordStrength.hasSpecialCharacter(password)).toBe(true);
        });

        test('should return false for password without special characters', () => {
            // Arrange
            const password = 'Password123';
            // Act & Assert
            expect(passwordStrength.hasSpecialCharacter(password)).toBe(false);
        });
    });
}); 