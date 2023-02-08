class InvalidMissingParamsError extends Error {
    constructor () {
        super('Invalid/Missing params.');
    }
}

module.exports = InvalidMissingParamsError;