module.exports = {
    // ... other webpack configurations
    module: {
      rules: [
        {
          test: /\.jsx?$/, // Transpile both .js and .jsx files
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
  };
  