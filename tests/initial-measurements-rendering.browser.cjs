// Editor Angular real. Sólo datos ficticios; no autenticación ni APIs externas.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const esbuild = require('esbuild');
const sass = require('sass');
const { chromium } = require(process.env.TRAINFIT_PLAYWRIGHT_PATH || 'playwright');
const root = path.resolve(__dirname, '..');
const feature = 'packages/shared-features/src/app/features/onboarding-status';
const out = path.join(root, '.tmp/initial-measurements-rendering-test');
const source = `
import 'zone.js';
import '@angular/compiler';
import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { InitialMeasurementsEditorComponent } from '../../${feature}/components/initial-measurements-editor/initial-measurements-editor.component';
import { MeasurementConflictComponent } from '../../${feature}/components/measurement-conflict/measurement-conflict.component';
import { validateInitialMeasurements, initialMeasurementConflicts } from '../../${feature}/models/initial-measurements';
@Component({selector:'app-root',template:
 '<main><p class="eyebrow">Cuestionario inicial · Datos ficticios</p><h1>Tus medidas de referencia</h1><app-initial-measurements-editor [definitions]="definitions" [rows]="rows" [recent]="recent" [errors]="errors" today="2026-09-10" [disabled]="saving" (rowsChange)="update($event)"></app-initial-measurements-editor><p role="status" *ngIf="missing">Faltan medidas: {{missing}}. Puedes completarlas más adelante.</p><app-measurement-conflict [conflicts]="conflicts" (confirmed)="confirm()" (cancelled)="conflicts=[]"></app-measurement-conflict><div class="actions"><button type="button" id="validate" (click)="validate()">Revisar medidas</button><button type="button" id="conflict" (click)="conflict()">Simular conflicto</button><button type="button" id="saving" (click)="saving=!saving">{{saving ? "Volver a editar" : "Simular envío"}}</button></div></main>'})
class Fixture {
 definitions=[{key:'weight',label:'Peso',unit:'kg',min:20,max:400,hint:'Un pesaje real, sin calcular la media semanal.'},{key:'waist',label:'Cintura',unit:'cm',min:30,max:200,hint:'Mide sin apretar la cinta.'}];
 recent=[{field:'weight',value:78.4,date:'2026-09-03'}];rows=[];errors={};missing='';saving=false;conflicts=[];
 ngOnInit(){window.fixture=this;}
 update(rows){this.rows=rows;this.errors={};this.missing='';this.conflicts=[];}
 validate(){const result=validateInitialMeasurements(this.definitions,this.rows,'2026-09-10');this.errors=result.errors;this.missing=result.missing.map(d=>d.label).join(', ');window.result=result;}
 conflict(){this.validate();this.conflicts=initialMeasurementConflicts({error:{code:'MEASUREMENT_CONFLICT',currentValues:{weight:79}}},window.result.values,this.definitions);}
 confirm(){this.rows=this.rows.map(row=>row.field==='weight'?{...row,confirmedExisting:false,expectedValue:79}:row);this.conflicts=[];this.validate();}
}
@NgModule({imports:[BrowserModule,InitialMeasurementsEditorComponent,MeasurementConflictComponent],declarations:[Fixture],bootstrap:[Fixture]})class FixtureModule{}
platformBrowserDynamic().bootstrapModule(FixtureModule).then(()=>window.ready=true);
`;

test('medidas reales: reutilización fechada, validación y conflicto explícito en móvil y escritorio', { timeout: 90000 }, async () => {
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, 'entry.ts'), source);
  await esbuild.build({ entryPoints: [path.join(out, 'entry.ts')], outfile: path.join(out, 'preview.js'), tsconfig: path.join(root, 'apps/train-fit-front/tsconfig.json'), bundle: true, format: 'esm', target: 'es2022', supported: { 'async-await': false }, plugins: [{ name: 'component-resources', setup(build) {
    build.onLoad({ filter: /\.component\.ts$/ }, ({ path: file }) => {
      const base = path.dirname(file);
      const contents = fs.readFileSync(file, 'utf8').replace(/templateUrl:\s*'([^']+)'/, (_, url) => 'template: ' + JSON.stringify(fs.readFileSync(path.join(base, url), 'utf8'))).replace(/styleUrls:\s*\['([^']+)'\]/, (_, url) => 'styles: [' + JSON.stringify(sass.compile(path.join(base, url)).css) + ']');
      return { contents, loader: 'ts', resolveDir: base };
    });
  }}] });
  fs.writeFileSync(path.join(out, 'index.html'), '<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Medidas iniciales · Datos ficticios</title><style>body{margin:0;padding:32px;background:#121419;color:#f5f5f5;font:16px Arial,sans-serif}main{max-width:620px;margin:auto}h1{font-size:28px;line-height:1.15;margin:8px 0 24px;letter-spacing:-.5px}.eyebrow{font-size:13px;color:#b9bbc2}.actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:24px}.actions button{min-height:44px;border:1px solid #5a5c65;background:#202126;color:white;border-radius:10px;padding:10px 14px;font:inherit}.actions button:focus-visible{outline:2px solid #fe9000;outline-offset:3px}[role=status]{line-height:1.5;color:#ffd3a1}@media(max-width:600px){body{padding:20px}h1{font-size:25px}}</style><app-root></app-root><script type="module" src="/preview.js"></script></html>');
  const server = http.createServer((req, res) => {
    const file = req.url === '/preview.js' ? 'preview.js' : 'index.html';
    res.setHeader('Content-Type', file.endsWith('.js') ? 'text/javascript' : 'text/html');
    res.end(fs.readFileSync(path.join(out, file)));
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: 'chrome' });
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const errors = [];page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://127.0.0.1:' + server.address().port);
    await page.waitForFunction(() => window.ready);
    const weight = page.getByRole('group', { name: 'Peso', exact: true });
    const waist = page.getByRole('group', { name: 'Cintura', exact: true });
    assert.equal(await weight.getByLabel('Valor (kg)').inputValue(), '');
    assert.equal(await weight.getByLabel('Fecha de medición').inputValue(), '2026-09-10');
    await page.screenshot({ path: path.join(out, 'desktop.png'), fullPage: true });
    await weight.getByRole('button', { name: 'Usar esta medida como referencia' }).click();
    assert.equal(await weight.getByLabel('Valor (kg)').inputValue(), '78.4');
    assert.equal(await weight.getByLabel('Fecha de medición').inputValue(), '2026-09-03');
    await page.locator('#validate').click();
    assert.match(await page.getByRole('status').innerText(), /Cintura/);
    assert.deepEqual(await page.evaluate(() => window.result.values), [{ field: 'weight', value: 78.4, date: '2026-09-03', confirmedExisting: true }]);
    await waist.getByLabel('Valor (cm)').fill('0');
    await page.locator('#validate').click();
    assert.equal(await waist.getByRole('alert').count(), 1);
    assert.equal(await waist.getByLabel('Valor (cm)').getAttribute('aria-invalid'), 'true');
    await waist.getByLabel('Valor (cm)').fill('82,5');
    await waist.getByLabel('Fecha de medición').fill('2026-09-11');
    await page.locator('#validate').click();
    assert.match(await waist.getByRole('alert').innerText(), /hasta hoy/);
    await waist.getByLabel('Fecha de medición').fill('2026-09-08');
    await page.locator('#validate').click();
    assert.equal(await page.getByRole('alert').count(), 0);
    assert.equal(await page.evaluate(() => window.result.values.find(v => v.field === 'waist').value), 82.5);
    await weight.getByLabel('Valor (kg)').fill('78,1');
    await page.locator('#validate').click();
    assert.equal(await page.evaluate(() => window.result.values[0].confirmedExisting), undefined);
    assert.equal(await weight.getByLabel('Fecha de medición').inputValue(), '2026-09-03');
    await page.locator('#conflict').click();
    assert.match(await page.locator('.conflict').innerText(), /Registrado: 79 kg/);
    assert.match(await page.locator('.conflict').innerText(), /Tu valor: 78.1 kg/);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: path.join(out, 'mobile.png'), fullPage: true });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
    assert.equal(await page.locator('input').evaluateAll(inputs => inputs.every(input => input.getBoundingClientRect().height >= 44)), true);
    await page.getByRole('button', { name: 'Confirmar mi corrección' }).click();
    assert.equal(await page.evaluate(() => window.result.values[0].expectedValue), 79);
    assert.equal(await page.evaluate(() => window.result.values[0].value), 78.1);
    await page.locator('#saving').click();
    assert.equal(await weight.getByLabel('Valor (kg)').isDisabled(), true);
    await page.locator('#saving').click();
    assert.equal(await weight.getByLabel('Valor (kg)').isDisabled(), false);
    await weight.getByLabel('Valor (kg)').focus();
    await page.keyboard.press('Tab');
    assert.equal(await weight.getByLabel('Fecha de medición').evaluate(input => input === document.activeElement), true);
    await page.setViewportSize({ width: 320, height: 740 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
    assert.deepEqual(errors, []);
  } finally {
    await browser?.close();
    await new Promise(resolve => server.close(resolve));
  }
});
