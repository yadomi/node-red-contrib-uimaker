import typescript from 'rollup-plugin-typescript2';

export default [
    {
        input: './src/uimaker.ts',
        output: {
            file: './dist/uimaker.js',
            format: 'umd',
            name: "UIMaker"
        },
        plugins: [typescript()],
    },
    {
        input: './src/with-react.tsx',
        output: {
            file: './dist/with-react.js',
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