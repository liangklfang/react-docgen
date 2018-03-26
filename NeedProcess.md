
## NeedProcess

From [`NeedProcess.js`](NeedProcess.js)

This is an example component.

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**enm** | `(custom validator)` | `'Photos'` | :x: | `oneOf` is basically an Enum which is also supported but can be pretty big.
**msg** | `(custom validator)` |  | :x: | `instanceOf` is also supported and the custom type will be shown instead of `instanceOf`
**one** | `(custom validator)` | `{   some: 1,   type: 2,   of: 3,   value: 4 }` | :x: | A simple `objectOf` propType.
**two** | `(custom validator)` |  | :x: | A very complex `objectOf` propType.
**union** | `(custom validator)` |  | :x: | A multi-type prop is also valid and is displayed as `Union<String|Message>`



