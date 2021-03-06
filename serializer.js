const prettyFormat = require('pretty-format');
const ansi = require('ansi-styles');

const { ReactTestComponent } = prettyFormat.plugins;

const test = val => {
  return ReactTestComponent.test(val);
};

const compactStyle = styleArray =>
  styleArray
    .filter(style => {
      if (!style) return false;
      return typeof style === 'object';
    })
    .reduce(
      (accumulated, styleObj) => ({
        ...accumulated,
        ...(Array.isArray(styleObj) ? compactStyle(styleObj) : styleObj),
      }),
      {},
    );

const hexRgx = /^#(?:[0-9a-fA-F]{3}){1,2}$/;

const addColor = hexValue => {
  const bgColor = ansi.bgColor.ansi16m.hex;
  return `${ansi.modifier.inverse.open}${ansi.color.ansi16m.hex(hexValue)}${hexValue}${
    ansi.color.close
  }${ansi.modifier.inverse.close}`;
};

const colorizeHexValues = styleObj =>
  Object.entries(styleObj).reduce(
    (accumulated, [key, value]) => ({
      ...accumulated,
      [key]: hexRgx.test(value) ? addColor(value) : value,
    }),
    {},
  );

const omitInternalBehaviouralProps = props => {
  const {
    isTVSelectable: omit1,
    onResponderGrant: omit2,
    onResponderMove: omit3,
    onResponderRelease: omit4,
    onResponderTerminate: omit5,
    onResponderTerminationRequest: omit6,
    onStartShouldSetResponder: omit7,
    ...restProps
  } = props;
  return restProps;
};

const serialize = (...args) => {
  const [component, ...restArgs] = args;

  if (!component.props) {
    return ReactTestComponent.serialize(...args);
  }

  const componentCopy = {
    ...component,
    props: omitInternalBehaviouralProps(component.props),
  };

  const props = componentCopy.props;

  if (props.style) {
    if (Array.isArray(props.style)) {
      props.style = compactStyle(props.style);
    }
    props.style = colorizeHexValues(props.style);
  }
  return ReactTestComponent.serialize(...[componentCopy, ...restArgs]);
};

module.exports = { test, serialize };
