import React from 'react';

// Web stub for React Native's codegenNativeComponent used by native view specs.
// react-native-web does not provide this module; on web these components are
// resolved via react-native-web's own implementations instead.
export default function codegenNativeComponent(name: string) {
  return Object.assign(
    React.forwardRef((props: Record<string, unknown>, ref: React.Ref<unknown>) =>
      React.createElement('View', {
        ...props,
        ref,
        // eslint-disable-next-line react/no-unknown-property
        __nativeName: name,
      })
    ),
    { displayName: `codegenNativeComponent(${name})` }
  );
}