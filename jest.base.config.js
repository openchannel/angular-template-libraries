module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/../../jest.base.setup.ts'],
    moduleNameMapper: {
        "^@openchannel/angular-common-components(.*)$": "<rootDir>/$1",
    }
};
