export default class InvalidMissingParamsError extends Error {
  constructor() {
    super('Invalid/Missing params.');
  }
}
