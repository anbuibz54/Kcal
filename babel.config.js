export const presets = ['module:@react-native/babel-preset'];
export const plugins = [
  'react-native-reanimated/plugin',
  '@babel/plugin-proposal-export-namespace-from',
  [
    'module-resolver',
    {
      root: ['./'], // <- this is the same as the baseUrl
      extensions: [
        '.ios.ts',
        '.ios.tsx',
        '.android.ts',
        '.android.tsx',
        '.ts',
        '.tsx',
        '.json',
      ],
      alias: {
        '@': './core/',
        '@global-vars':'./global_variables/',
      },
    },
  ],
];
