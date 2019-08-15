module.exports = {
  presets: [
    [
      "@vue/app",
      {
        useBuiltIns: "entry"
      }
    ]
  ],
  plugins: [["@babel/transform-runtime"]],
  env: {
    test: {
      plugins: ["dynamic-import-node"]
    }
  }
}
