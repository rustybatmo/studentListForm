export const URL_PREFIX = '/app';

export function generateAPITypes(prefix) {
  return [`${prefix}_REQUEST`, `${prefix}_SUCCESS`, `${prefix}_FAILURE`];
}
