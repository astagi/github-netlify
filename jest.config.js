module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  collectCoverage: true,
  collectCoverageFrom: ["lambda/*.js", "src/**/*.vue", "!**/node_modules/**"]
}
