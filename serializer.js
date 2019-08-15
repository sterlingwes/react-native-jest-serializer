import prettyFormat from 'pretty-format';
import ansi from 'ansi-styles';

const { ReactTestComponent } = prettyFormat.plugins;

const test = val => {
  // console.log(val, '=', ReactTestComponent.test(val))
  return ReactTestComponent.test(val);
};

const compactStyle = styleArray =>
  styleArray
    .filter(styleObj => {
      if (!styleObj) return false;
      return typeof styleObj === 'object';
    })
    .reduce(
      (accumulated, styleObj) => ({
        ...accumulated,
        ...styleObj,
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

const serialize = (...args) => {
  const [component] = args;
  if (component.props) {
    if (Array.isArray(component.props.style)) {
      component.props.style = compactStyle(component.props.style);
    }
    component.props.style = colorizeHexValues(component.props.style);
  }
  return ReactTestComponent.serialize(...args);
};

export { test, serialize };
