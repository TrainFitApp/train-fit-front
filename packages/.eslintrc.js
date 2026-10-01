const path = require('node:path');

// El código compartido por las tres apps. Se analiza UNA vez desde aquí, no
// tres veces desde cada app: son las mismas 66.000 líneas y daría los mismos
// avisos tres veces.
//
// Los tipos salen de apps/train-fit-front/tsconfig.app.json, que es el único
// tsconfig del repo cuyo `include` abarca packages/** entero. El tsconfig.json
// de cada app NO lo incluye, y sin un programa que contenga el fichero las
// reglas con información de tipos no pueden funcionar.
//
// En JS y no en JSON porque `tsconfigRootDir` se resuelve contra el directorio
// de trabajo, no contra el fichero de configuración: con __dirname el lint
// funciona igual se lance desde la raíz o desde aquí dentro.
const repoRoot = path.join(__dirname, '..');

module.exports = {
  root: true,
  ignorePatterns: ['**/node_modules/**', '**/*.test.js', '**/*.test.cjs'],
  extends: ['../.eslintrc.base.json'],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: [path.join(repoRoot, 'apps/train-fit-front/tsconfig.app.json')],
        tsconfigRootDir: repoRoot,
      },
    },
  ],
};
