/**
 * This is an example component.
 **/
class MyComponent extends Component {

  constructor(props) {
    super(props);
  }

  getDefaultProps() {
    return {
      enm: 'Photos',
      one: {
        some: 1,
        type: 2,
        of: 3,
        value: 4
      }
    };
  }

  render() {
    return <div></div>;
  }
}

MyComponent.propTypes = {
    /**
     *  A simple `objectOf` propType.
     */
    one: React.PropTypes.objectOf(React.PropTypes.number),
    /**
     *  A very complex `objectOf` propType.
     */
    two: React.PropTypes.objectOf(React.PropTypes.shape({
      /**
       *  Just an internal propType for a shape.
       *  It's also required, and as you can see it supports multi-line comments!
       */
      id: React.PropTypes.number.isRequired,
      /**
       *  A simple non-required function
       */
      func: React.PropTypes.func,
      /**
       * An `arrayOf` shape
       */
      arr: React.PropTypes.arrayOf(React.PropTypes.shape({
        /**
         * 5-level deep propType definition and still works.
         */
        index: React.PropTypes.number.isRequired
      }))
    })),
    /**
     * `instanceOf` is also supported and the custom type will be shown instead of `instanceOf`
     */
    msg: React.PropTypes.instanceOf(Message),
    /**
     * `oneOf` is basically an Enum which is also supported but can be pretty big.
     */
    enm: React.PropTypes.oneOf([print('News'), 'Photos']),
    /**
     *  A multi-type prop is also valid and is displayed as `Union<String|Message>`
     */
    union: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.instanceOf(Message)
    ])
  };

  export default MyComponent;
