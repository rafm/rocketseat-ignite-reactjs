module.exports = {
    presets: [
        '@babel/preset-env',
        ['@babel/preset-react', {
            runtime: 'automatic' // configuration to make unnecessary the import of "react" dependency on jsx files
        }]
    ]
}
