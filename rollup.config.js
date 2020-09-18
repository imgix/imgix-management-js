export default [
    {
        input: 'src/imgix-api.js',
        output: [
            {
                file: 'dist/imgix-api.cjs.js',
                format: 'cjs'
            },
            {
                file: 'dist/imgix-api.umd.js',
                format: 'umd',
                name: 'ImgixAPI'
            }
        ]
    },
    {
        input: 'src/api-error.js',
        output: {
            file: 'dist/api-error.cjs.js',
            format: 'cjs'
        }
    },
    {
        input: 'src/validators.js',
        output: {
            file: 'dist/validators.cjs.js',
            format: 'cjs'
        }
    },
    {
        input: 'src/fetch-wrapper.js',
        output: {
            file: 'dist/fetch-wrapper.cjs.js',
            format: 'cjs'
        }
    },
    {
        input: 'src/constants.js',
        output: {
            file: 'dist/constants.cjs.js',
            format: 'cjs'
        }
    },
];
