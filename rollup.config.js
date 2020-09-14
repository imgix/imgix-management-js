import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import includePaths from 'rollup-plugin-includepaths';
import json from '@rollup/plugin-json';
import inject from '@rollup/plugin-inject';
import nodePolyFills from 'rollup-plugin-node-polyfills';
import builtins from 'rollup-plugin-node-builtins';
import babel from '@rollup/plugin-babel';

let includePathOptions = {
    include: {},
    paths: ['fetch-wrapper', 'api-error', 'constants', 'validators',],
    external: [],
    extensions: ['.js', '.json', '.html']
};

export default [
    {
        input: 'src/imgix-api.js',
        output: {
            file: 'dist/bundle.umd.js',
            format: 'umd',
            name: 'ImgixAPI',
            intro: 'const global = window;',
            globals: {
                'node-fetch': 'nodeFetch',
                'es6-promise': 'es6Promise',
                'stream': 'Stream',
                'http': 'http',
                'url': 'Url',
                'https': 'https',
                'zlib': 'zlib',
                'assert': 'assert',
            },
        },
        external: [
            'assert',
            'es6-promise'
        ],
        plugins: [
            nodeResolve(),
            commonjs({
                include: [
                    'src/*.js',
                    'node_modules/**'
                ]
            }),
            builtins(),
            babel({
                exclude: 'node_modules/**',
                babelHelpers: 'bundled'
            }),
            includePaths(includePathOptions),
            json(),
            inject({
                Promise: ['es6-promise', 'Promise']
            })
        ]
    },
    {
        input: 'src/imgix-api.js',
        output: {
            file: 'dist/bundle.cjs.js',
            format: 'cjs',
        },
        external: [
            'fetch-wrapper',
            'api-error',
            'validators',
            'constants',
            'node-fetch',
            'assert',
            'es6-promise'
        ],
        plugins: [
            commonjs({
                esmExternals: [
                    'src/validators.js',
                    'src/api-erros.js',
                    'src/constants.js',
                    'src/fetch-wrapper.js',
                ]
            }),
            commonjs(),
            nodeResolve(),
            includePaths(includePathOptions),
            nodePolyFills(),
            json(),
            inject({
                Promise: ['es6-promise', 'Promise']
            })
        ]
    }
];