class PasswordStrength {
    /**
     * Checks the strength of a password based on several criteria.
     * @param {string} password The password to check.
     * @returns {string} 'Invalid', 'Weak', 'Medium', 'Strong', or 'Very Strong'.
     */
    checkStrength(password) {
        if (typeof password !== 'string') {
            return 'Invalid';
        }

        const length = password.length;
        const hasUpper = this.hasUppercase(password);
        const hasLower = this.hasLowercase(password);
        const hasNumber = this.hasNumber(password);
        const hasSpecial = this.hasSpecialCharacter(password);

        let score = 0;
        if (length >= 8) score++;
        if (length >= 12) score++;
        if (hasUpper) score++;
        if (hasLower) score++;
        if (hasNumber) score++;
        if (hasSpecial) score++;

        if (length < 8) return 'Weak';

        if (score >= 6) return 'Very Strong';
        if (score >= 5) return 'Strong';
        if (score >= 3) return 'Medium';
        
        return 'Weak';
    }

    /**
     * Checks if a password meets a minimum length requirement.
     * @param {string} password The password to check.
     * @param {number} minLength The minimum required length. Defaults to 8.
     * @returns {boolean} True if the password has the minimum length, false otherwise.
     */
    hasMinimumLength(password, minLength = 8) {
         if (typeof password !== 'string') return false;
         return password.length >= minLength;
    }

    /**
     * Checks if a password contains at least one uppercase letter.
     * @param {string} password The password to check.
     * @returns {boolean} True if the password contains an uppercase letter, false otherwise.
     */
    hasUppercase(password) {
        if (typeof password !== 'string') return false;
        return /[A-Z]/.test(password);
    }

    /**
     * Checks if a password contains at least one lowercase letter.
     * @param {string} password The password to check.
     * @returns {boolean} True if the password contains a lowercase letter, false otherwise.
     */
    hasLowercase(password) {
        if (typeof password !== 'string') return false;
        return /[a-z]/.test(password);
    }

    /**
     * Checks if a password contains at least one number.
     * @param {string} password The password to check.
     * @returns {boolean} True if the password contains a number, false otherwise.
     */
    hasNumber(password) {
        if (typeof password !== 'string') return false;
        return /[0-9]/.test(password);
    }

    /**
     * Checks if a password contains at least one special character.
     * @param {string} password The password to check.
     * @returns {boolean} True if the password contains a special character, false otherwise.
     */
    hasSpecialCharacter(password) {
        if (typeof password !== 'string') return false;
        return /[!@#$%^&*(),.?":{}|<>]/.test(password);
    }
}

module.exports = PasswordStrength; 