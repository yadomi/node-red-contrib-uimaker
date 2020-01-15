import typescript from '@rollup/plugin-typescript';

export default [
    {
        input: './src/uimaker.ts',
        output: {
            file: './uimaker.js',
            format: 'umd',
            name: "UIMaker"
        },
        plugins: [typescript()],
    },
    {
        input: './src/with-react.tsx',
        output: {
            file: './react.js',
            format: 'esm',
            globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
            },
        },
        external: ['react', 'react-dom'],
        plugins: [typescript()],
    }    
]