const path = require('path');

module.exports = {
  entry: './src/index.js', // Adjust the entry point if different
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: {
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      zlib: require.resolve('browserify-zlib'),
      stream: require.resolve('stream-browserify'),
      assert: require.resolve('assert'),
      crypto: require.resolve('crypto-browserify'),
      os: require.resolve('os-browserify/browser'),
      buffer: require.resolve('buffer/'),
      url: require.resolve('url/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      // Add other rules as needed
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 5000,
  },
};