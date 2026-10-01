// Tabla de traducciones en español (común + app) para los tests que ejecutan
// código traducido: así siguen comprobando los mismos textos que ve el usuario.
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const isObject = (value) => value && typeof value === 'object' && !Array.isArray(value);

function merge(base, override) {
  const result = { ...base };
  for (const [key, value] of Object.entries(override)) {
    result[key] = isObject(value) && isObject(result[key]) ? merge(result[key], value) : value;
  }
  return result;
}

function esTable(app) {
  return merge(read('packages/shared-core/src/assets/i18n/es.json'), read(`apps/${app}/src/assets/i18n/es.json`));
}

// Mismo comportamiento que TranslateService#instant: interpola {{param}} y
// devuelve la clave si no existe.
function esTranslator(app) {
  const table = esTable(app);
  const instant = (key, params) => {
    const value = key.split('.').reduce((node, part) => (isObject(node) ? node[part] : undefined), table);
    if (typeof value !== 'string') return value === undefined ? key : value;
    return params ? value.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (all, name) => (params[name] ?? all)) : value;
  };
  return { instant, currentLang: 'es' };
}

module.exports = { esTable, esTranslator };
