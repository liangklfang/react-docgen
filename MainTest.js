// var reactDocs = require('react-docgen');
// var fs = require('fs');
// fs.readFile('./NeedProcess.js',(err,data)=>{
//   var componentInfo = reactDocs.parse(data,reactDocs.resolver.findAllComponentDefinitions);
//   console.log('API抽取结果为:'+JSON.stringify(componentInfo));
// });

const path = require('path');
const fs = require('fs');
const reactDocgen = require('react-docgen');
const ReactDocGenMarkdownRenderer = require('react-docgen-markdown-renderer');
const componentPath = path.join(__dirname, './backup.js');
const renderer = new ReactDocGenMarkdownRenderer({
  componentsBasePath: __dirname
});

fs.readFile(componentPath, (error, content) => {
  const documentationPath = path.basename(componentPath, path.extname(componentPath)) + renderer.extension;
  const doc = reactDocgen.parse(content);
  const rendereredCptInfo = renderer.render(
    /* The path to the component, used for linking to the file. */
    componentPath,
    /* The actual react-docgen AST */
    doc,
    /* Array of component ASTs that this component composes*/
    []);

   console.log('产生的表格为==='+JSON.stringify(rendereredCptInfo));

});
