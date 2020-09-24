import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import builtins from 'builtin-modules';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';

export default [
    {
        input: 'src/imgix-api.js',
        output:
        {
            file: 'dist/imgix-api.cjs.js',
            format: 'cjs'
        },
        external: [
            'assert',
            'node-fetch'
        ],
        plugins: [
            getBabelOutputPlugin({
                presets: ['@babel/preset-env']
            })
        ],
        exports: 'default'
    },
    {
        input: 'src/imgix-api.js',
        output:
        {
            file: 'dist/imgix-api.umd.js',
            format: 'umd',
            name: 'ImgixAPI',
            globals: {
                'node-fetch': 'nodeFetch'
            }
        },
        external: [
            'node-fetch'
        ],
        plugins: [
            nodePolyfills(),
            // nodeResolve(),
            // commonjs()
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
        },
        external: [ 'assert' ]
    },
    {
        input: 'src/fetch-wrapper.js',
        output: {
            file: 'dist/fetch-wrapper.cjs.js',
            format: 'cjs'
        },
        external: [ 'node-fetch' ],
        plugins: [
            nodePolyfills()
        ]
    },
    {
        input: 'src/constants.js',
        output: {
            file: 'dist/constants.cjs.js',
            format: 'cjs'
        }
    },
];
