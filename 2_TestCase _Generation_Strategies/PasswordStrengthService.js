const PasswordStrength = require('./PasswordStrength');
const pwnedPasswordDB = require('./pwnedPasswordDB');
const policyApi = require('./policyApi');

class PasswordStrengthService {
    constructor() {
        this.strengthChecker = new PasswordStrength();
    }

    /**
     * Checks a password against the company policy and a list of pwned passwords.
     * This is an integration point that uses multiple services.
     * @param {string} password The password to check.
     * @returns {Promise<{isValid: boolean, message: string}>}
     */
    async checkPassword(password) {
        // 1. Check against pwned password database
        try {
            const isPwned = await pwnedPasswordDB.isPwned(password);
            if (isPwned) {
                return { isValid: false, message: 'This password has appeared in a data breach and is not secure.' };
            }
        } catch (error) {
            return { isValid: false, message: 'Could not verify password security. Please try again later.' };
        }

        // 2. Fetch policy from API
        let policy;
        try {
            policy = await policyApi.getPolicy();
        } catch (error) {
            return { isValid: false, message: 'Could not retrieve password policy. Please try again later.' };
        }

        // 3. Check against policy
        if (!this.strengthChecker.hasMinimumLength(password, policy.minLength)) {
            return { isValid: false, message: `Password must be at least ${policy.minLength} characters long.` };
        }
        if (policy.requiresUppercase && !this.strengthChecker.hasUppercase(password)) {
            return { isValid: false, message: 'Password must contain at least one uppercase letter.' };
        }
        if (policy.requiresLowercase && !this.strengthChecker.hasLowercase(password)) {
            return { isValid: false, message: 'Password must contain at least one lowercase letter.' };
        }
        if (policy.requiresNumber && !this.strengthChecker.hasNumber(password)) {
            return { isValid: false, message: 'Password must contain at least one number.' };
        }
        if (policy.requiresSpecialCharacter && !this.strengthChecker.hasSpecialCharacter(password)) {
            return { isValid: false, message: 'Password must contain at least one special character.' };
        }

        // 4. All checks passed
        return { isValid: true, message: 'Password is valid and secure.' };
    }
}

module.exports = PasswordStrengthService; 