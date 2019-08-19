import React from 'react';
import { View } from 'react-native';
import renderer from 'react-test-renderer';

expect.addSnapshotSerializer(require('./serializer'));

describe('style prop serializing', () => {
  describe('style with overrides and nested objects', () => {
    const Component = () => (
      <View
        style={[
          0,
          { height: 1, position: 'absolute' },
          undefined,
          { flex: 1, height: 10 },
          null,
          false,
          10,
          {
            transform: [{ perspective: 850 }, { translateX: -100 }, { rotateY: '60deg' }],
          },
          true,
        ]}
      />
    );

    const tree = renderer.create(<Component />).toJSON();

    it('merge an array to the relevant style object', () => {
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when a style value is a hex colour', () => {
    const Component = () => <View style={{ color: '#c0ffee' }} />;

    const tree = renderer.create(<Component />).toJSON();

    it('should render the colour to the terminal', () => {
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when there is no style prop', () => {
    const Component = () => <View coolView />;
    const tree = renderer.create(<Component />).toJSON();

    it('should still render a snapsoht', () => {
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when a component has behaviour-related props', () => {
    const fn = () => {};
    const Component = () => (
      <View
        isTVSelectable
        onResponderGrant={fn}
        onResponderMove={fn}
        onResponderRelease={fn}
        onResponderTerminate={fn}
        onResponderTerminationRequest={fn}
        onStartShouldSetResponder={fn}
      />
    );

    const tree = renderer.create(<Component />).toJSON();

    it('should strip them from the snapshot output', () => {
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when there is nested style arrays', () => {
    const Component = () => (
      <View
        style={[{ height: 1, position: 'absolute' }, [{ height: 100 }, [{ position: 'relative' }]]]}
      />
    );

    const tree = renderer.create(<Component />).toJSON();

    it('should recurse through them and combine styles into the root object', () => {
      expect(tree).toMatchSnapshot();
    });
  });
});
