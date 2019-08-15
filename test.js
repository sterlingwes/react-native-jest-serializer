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
      ></View>
    );

    const tree = renderer.create(<Component />).toJSON();

    it('merge an array to the relevant style object', () => {
      expect(tree).toMatchInlineSnapshot(`
                        <View
                          style={
                            Object {
                              "flex": 1,
                              "height": 10,
                              "position": "absolute",
                              "transform": Array [
                                Object {
                                  "perspective": 850,
                                },
                                Object {
                                  "translateX": -100,
                                },
                                Object {
                                  "rotateY": "60deg",
                                },
                              ],
                            }
                          }
                        />
                  `);
    });
  });

  describe('when a style value is a hex colour', () => {
    const Component = () => <View style={{ color: '#c0ffee' }} />;

    const tree = renderer.create(<Component />).toJSON();

    it('should render the colour to the terminal', () => {
      expect(tree).toMatchInlineSnapshot(`
        <View
          style={
            Object {
              "color": "[7m[38;2;192;255;238m#c0ffee[39m[27m",
            }
          }
        />
      `);
    });
  });
});
