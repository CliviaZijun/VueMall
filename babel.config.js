module.exports = {
  "presets": [
    '@vue/cli-plugin-babel/preset' //语法的解码规则
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
