import { createNodeConfig } from '@nurdiansyah/eslint-config-devel';
const configs = createNodeConfig({ isBrowser: true });
configs.push({
  ignores: ['node_modules', 'build', 'coverage'],
});
export default configs;
