const config = {
    verbose: true,
    moduleNameMapper: {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "jest-transform-stub",
      "\\.(css|less)$": "jest-transform-stub"
    }
};

module.exports = config;