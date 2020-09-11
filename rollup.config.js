import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import includePaths from 'rollup-plugin-includepaths';
import json from '@rollup/plugin-json';
import inject from '@rollup/plugin-inject';

let includePathOptions = {
    include: {},
    paths: ['src/fetch-wrapper', 'src/api-error', 'src/constants', 'src/validators',],
    external: [],
    extensions: ['.js', '.json', '.html']
};

export default {
    input: 'src/imgix-api.js',
    output: {
        file: 'dist/bundle.js',
        format: 'umd',
        name: 'ImgixAPI',
    },
    external: [
        'node-fetch'
    ],
    plugins: [
        commonjs(),
        nodeResolve(),
        includePaths(includePathOptions),
        json(),
        inject({
            Promise: ['es6-promise', 'Promise']
        })
    ],
};
