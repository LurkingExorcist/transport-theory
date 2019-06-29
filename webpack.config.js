module.exports = {
  context: __dirname,
  devtool: "source-map",
  entry: './src/client.js',
  mode: 'development',
  output: {
    path: __dirname + "/public/dist",
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    }
  },
  
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
}