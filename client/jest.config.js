const config = {
    verbose: true,
    moduleNameMapper: {
      "\\.(css|less)$": "jest-transform-stub"
    }
};

module.exports = config;