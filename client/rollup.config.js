import typescript from 'rollup-plugin-typescript2';

const tsconfig = {
    useTsconfigDeclarationDir: true,
}

export default [
    {
        input: './src/uimaker.ts',
        output: {
            file: './dist/uimaker.js',
            format: 'umd',
            name: "UIMaker"
        },
        plugins: [typescript(tsconfig)],
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
        plugins: [typescript(tsconfig)],
    }    
]