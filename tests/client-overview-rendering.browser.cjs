// Angular/Ionic reales, exclusivamente datos ficticios y sin conexiones al backend.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const esbuild = require('esbuild');
const sass = require('sass');
const { chromium } = require(process.env.TRAINFIT_PLAYWRIGHT_PATH || 'playwright');
const root = path.resolve(__dirname, '..');
const detail = 'apps/train-fit-trainers/src/app/features/clients/pages/client-detail';
const out = path.join(root, '.tmp/client-overview-rendering-test');
const screenshots = path.join(root, '.impeccable/review/client-overview');
fs.mkdirSync(out, { recursive: true });
fs.mkdirSync(screenshots, { recursive: true });
const point = (value, date) => ({ value, date, sourceId: date });
const baseline = (key, value, date) => ({ ...point(value, date), key });
const fixture = {
  identity: { name: 'Marta', lastname: 'Soler', age: 34, birth: '1992-02-15', sex: 0, height: 168, heightCm: 168, profileVersion: 'profile-v1', scopes: ['training', 'nutrition'] },
  stage: { id: 'stage-current', startedAt: '2026-08-01T10:00:00Z', endedAt: null, legacy: false },
  stages: [{ id: 'stage-current', startedAt: '2026-08-01T10:00:00Z', endedAt: null }, { id: 'stage-old', startedAt: '2025-01-01T10:00:00Z', endedAt: '2025-06-01T10:00:00Z' }],
  context: { version: 2, updatedAt: '2026-09-08T10:00:00Z', updatedBy: 'coach', values: { goals: 'Ganar fuerza y volver a entrenar con constancia', healthConditions: 'Molestia de rodilla comunicada. Adaptar ejercicios y revisar tolerancia.', experienceLevel: 'intermediate', availability: 'Tres sesiones de 45 minutos', trainingLocation: 'home', equipment: '', equipmentTags: ['dumbbells', 'bands'], customAnswers: [{ questionId: 'context', label: 'Qué te dificulta entrenar', value: 'Turnos variables de trabajo' }] } },
  intake: { available: true, legacy: false, submittedAt: '2026-08-01T10:00:00Z', missingMeasurements: [] },
  settings: { version: 2, highlightedPerimeters: ['waist', 'hip'] },
  body: { today: '2026-09-10', weight: { initial: baseline('weight', 71.4, '2026-08-01'), last: point(70.8, '2026-09-09'), delta: -0.6, baselineStatus: 'valid', weekly: [
    { start: '2026-08-17', end: '2026-08-23', average: 71.2, count: 3, partial: false },
    { start: '2026-08-24', end: '2026-08-30', average: 71.1, count: 4, partial: false },
    { start: '2026-08-31', end: '2026-09-06', average: 70.95, count: 3, partial: false },
    { start: '2026-09-07', end: '2026-09-13', average: 70.8, count: 1, partial: true },
  ] }, perimeters: [
    { key: 'waist', label: 'Cintura', unit: 'cm', initial: baseline('waist', 79, '2026-08-01'), last: point(78, '2026-09-03'), delta: -1, baselineStatus: 'valid' },
    { key: 'hip', label: 'Cadera', unit: 'cm', initial: baseline('hip', 101, '2026-08-01'), last: point(101, '2026-08-29'), delta: 0, baselineStatus: 'valid' },
  ], availablePerimeters: [{ key: 'waist', label: 'Cintura', unit: 'cm' }, { key: 'hip', label: 'Cadera', unit: 'cm' }, { key: 'chest', label: 'Pecho', unit: 'cm' }], latestMeasuredOn: '2026-09-09' },
  pinnedNotes: [{ _id: 'note-1', text: 'Entrena en casa durante septiembre. Material: mancuernas y bandas.', pinned: true, createdAt: '2026-09-01T10:00:00Z', version: 0 }],
  tasks: { items: [{ _id: 'task-1', title: 'Revisar adaptación de rodilla', notes: '', dueDate: '2026-09-09', status: 'pending', createdAt: '2026-09-07T10:00:00Z', completedAt: null, version: 0 }], total: 1 },
  review: { latest: { _id: 'review-1', createdAt: '2026-09-05T10:00:00Z', conclusion: 'Mantener la carga mientras valoramos tolerancia.', nextStep: 'Comprobar molestias tras dos sesiones.' }, hasNewData: true, observedFingerprint: 'a'.repeat(64), observedAt: '2026-09-10T10:00:00Z' },
  checkins: { pendingReviewCount: 2, waitingResponseCount: 1, lastResponseAt: '2026-09-09T09:00:00Z' },
  nutrition: { values: { allergies: 'Frutos secos', favoriteFoods: 'Legumbres y arroz', dislikedFoods: '', cooksAtHome: 'yes' }, version: 'nutrition-v1' },
  wellbeing: [{ key: 'stress_level', label: 'Estrés', value: 3, displayValue: 'Estrés de fondo constante, pero manejable', recordedAt: '2026-09-09T09:00:00Z', requestId: 'request-1' }],
  sectionsErrors: {}, timeZone: 'Europe/Madrid', readOnly: false,
};
const source = `
import 'zone.js'; import '@angular/compiler';
import { Component, NgModule, NgZone } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { IonicModule } from '@ionic/angular';
import { initialize } from '@ionic/core/components';
import { of, throwError, delay, timer, mergeMap } from 'rxjs';
import { addIcons } from 'ionicons'; import * as icons from 'ionicons/icons';
import { defineCustomElement as defineModal } from '@ionic/core/components/ion-modal';
import { defineCustomElement as defineButton } from '@ionic/core/components/ion-button';
import { defineCustomElement as defineButtons } from '@ionic/core/components/ion-buttons';
import { defineCustomElement as defineHeader } from '@ionic/core/components/ion-header';
import { defineCustomElement as defineFooter } from '@ionic/core/components/ion-footer';
import { defineCustomElement as defineToolbar } from '@ionic/core/components/ion-toolbar';
import { defineCustomElement as defineTitle } from '@ionic/core/components/ion-title';
import { defineCustomElement as defineContent } from '@ionic/core/components/ion-content';
import { defineCustomElement as defineSpinner } from '@ionic/core/components/ion-spinner';
import { defineCustomElement as defineAlert } from '@ionic/core/components/ion-alert';
import { defineCustomElement as defineIcon } from 'ionicons/components/ion-icon';
import { ClientOverviewComponent } from '../../${detail}/components/client-overview/client-overview.component';
import { ClientOverviewApiService } from '../../${detail}/components/client-overview/client-overview-api.service';
import { ClientDetailApiService } from '../../${detail}/services/client-detail-api.service';
initialize({mode:'md',animated:false});
addIcons(icons); [defineModal,defineButton,defineButtons,defineHeader,defineFooter,defineToolbar,defineTitle,defineContent,defineSpinner,defineAlert,defineIcon].forEach(define=>define());
document.documentElement.classList.add('hydrated');
const data = window.data = ${JSON.stringify(fixture)}; window.calls = []; window.conflict = false; window.partialError = false; window.oldMeasurement = 74;
const clone = value => structuredClone(value);
// La escritura y la recarga llegan en turnos distintos, como HttpClient real.
const response = value => of(value).pipe(delay(50));
const failure = error => timer(50).pipe(mergeMap(() => throwError(() => error)));
const api = {
 get(id,stage){ const result=clone(data); if(stage==='stage-old'){result.stage=result.stages[1];result.readOnly=true;} if(window.partialError){result.body=null;result.sectionsErrors={body:'No disponible'};} return response(result); },
 intake(){return of({submittedAt:data.intake.submittedAt,legacy:false,responses:[{key:'goals',label:'Objetivo personal',value:'Ganar fuerza'},{key:'trainingLocation',label:'Lugar de entrenamiento',value:'gym'},{key:'context',label:'Qué te dificulta entrenar',value:'Turnos variables de trabajo'},{key:'weight',label:'Peso inicial',value:71.4,unit:'kg',date:'2026-08-01'}]});},
 notes(){return of({items:clone(data.pinnedNotes),total:data.pinnedNotes.length,nextOffset:null});},
 tasks(){return of({...clone(data.tasks),nextOffset:null});},
 reviews(){return of({items:[clone(data.review.latest)],total:1,nextOffset:null});},
 context(id,version,patch){window.calls.push({kind:'context',version,patch});if(window.conflict)return failure({status:409,error:{message:'Otra edición cambió el contexto'}});Object.assign(data.context.values,patch);data.context.version++;return response({});},
 profile(id,payload){window.calls.push({kind:'profile',payload});Object.assign(data.identity,payload.patch);return of({});},
 settings(id,version,fields){data.settings.highlightedPerimeters=fields;return of({});},
 saveNote(id,noteId,payload){window.calls.push({kind:'note',payload});const note={_id:noteId||'new-note',...payload,createdAt:'2026-09-10T10:00:00Z',version:1};data.pinnedNotes=[note];return of(note);},
 saveTask(id,taskId,payload){window.calls.push({kind:'task',payload});if(taskId){data.tasks.items=[];data.tasks.total=0;}return of({_id:taskId||'new-task',...payload});},
 saveReview(id,payload){window.calls.push({kind:'review',payload});data.review.latest={_id:'new-review',createdAt:'2026-09-10T11:00:00Z',...payload};data.review.hasNewData=false;return response(data.review.latest);},
 saveMeasurement(id,payload){window.calls.push({kind:'measurement',payload});return of({});},
 measurementsOnDate(id,date){window.calls.push({kind:'measurement-preview',date});return response([{_id:'today',date:'2026-09-10',weight:78.4},{_id:'old',date:'2025-02-10',weight:window.oldMeasurement}].filter(row=>row.date===date));},
 saveBaseline(id,payload){window.calls.push({kind:'baseline',payload});return of({});},
};
const original=ClientOverviewComponent.prototype.ngOnChanges;
ClientOverviewComponent.prototype.ngOnChanges=function(changes){window.overview=this;return original.call(this,changes);};
@Component({selector:'app-root',template:'<main><nav class="fixture-nav">TrainFit · Cliente de prueba</nav><app-client-overview clientId="fixture-client" clientName="Marta Soler" [hasTrainingScope]="true" (openTab)="open($event)"></app-client-overview></main>'})
class Fixture {open(tab){window.calls.push({kind:'navigate',tab});}}
@NgModule({imports:[BrowserModule,IonicModule.forRoot({animated:false}),ClientOverviewComponent],declarations:[Fixture],providers:[{provide:ClientOverviewApiService,useValue:api},{provide:ClientDetailApiService,useValue:{getSummary(){return of({routine:{name:'Fuerza en casa'},goal:{name:'Plan de mantenimiento'},adherence:{dimensions:{training:{applicable:true,detail:'2 de 3 sesiones registradas'},nutrition:{applicable:false}}}});},getAnthropometry(){return of([{_id:'measure',date:'2026-09-09',weight:70.8}]);}}}],bootstrap:[Fixture]})class FixtureModule{}
platformBrowserDynamic().bootstrapModule(FixtureModule).then(mod=>{window.zone=mod.injector.get(NgZone);window.ready=true;});
`;

// Comprueba relaciones perceptibles, no una copia de las declaraciones CSS.
async function inspectHierarchy(page) {
  return page.evaluate(() => {
    const visible = element => element.getClientRects().length && getComputedStyle(element).visibility !== 'hidden';
    const type = element => {
      const style = getComputedStyle(element);
      return { size: parseFloat(style.fontSize), weight: parseFloat(style.fontWeight) };
    };
    const failures = [];
    const pairs = [];
    for (const row of document.querySelectorAll('.weight-comparison > div, .context-facts > div')) {
      const label = row.querySelector('.metric-label, dt');
      const value = row.querySelector('strong, dd');
      if (!label || !value || !visible(row)) continue;
      const pair = { label: label.textContent.trim(), labelType: type(label), valueType: type(value) };
      pairs.push(pair);
      if (pair.valueType.size <= pair.labelType.size || pair.valueType.weight <= pair.labelType.weight) {
        failures.push(`La etiqueta «${pair.label}» necesita un valor mayor y de más peso tipográfico`);
      }
      const unit = value.querySelector('small');
      if (unit && type(unit).size >= pair.valueType.size) failures.push(`La unidad de «${pair.label}» compite con su cifra`);
    }
    const metrics = [...document.querySelectorAll('.metric-value')].filter(visible);
    if (!metrics.length) failures.push('No se han encontrado cifras diferenciadas en tablas o perímetros');
    for (const value of metrics) {
      const container = value.closest('td, dd');
      const metadata = container ? [...container.querySelectorAll('small, .metric-unit')] : [];
      for (const meta of metadata) {
        if (type(value).size <= type(meta).size || (!value.classList.contains('metric-missing') && type(value).weight <= type(meta).weight)) {
          failures.push(`La cifra «${value.textContent.trim()}» no destaca sobre su unidad, fecha o texto de ayuda`);
        }
      }
    }
    const sectionTitle = document.querySelector('.workspace-section:not(.context-section) h2');
    const cardTitle = document.querySelector('.comparison-head h3');
    const label = document.querySelector('.metric-label');
    if (!(type(sectionTitle).size > type(cardTitle).size && type(cardTitle).size > type(label).size)) {
      failures.push('Títulos de sección, subtítulos y etiquetas no tienen una jerarquía de tamaño descendente');
    }
    const actions = [...document.querySelectorAll('.attention-strip > button')].filter(visible);
    for (const action of actions) {
      if (getComputedStyle(action).cursor !== 'pointer' || !action.querySelector('ion-icon[name="chevron-forward-outline"]')) {
        failures.push(`La tarjeta pulsable «${action.textContent.trim()}» no comunica navegación`);
      }
    }
    for (const action of document.querySelectorAll('.workspace-section button:not(:disabled), .overview-toolbar button:not(:disabled)')) {
      if (!visible(action)) continue;
      const style = getComputedStyle(action);
      const hasFill = !['transparent', 'rgba(0, 0, 0, 0)'].includes(style.backgroundColor);
      const hasBorder = ['Top', 'Right', 'Bottom', 'Left'].some(side => !['none', 'hidden'].includes(style[`border${side}Style`]) && parseFloat(style[`border${side}Width`]) > 0);
      if (!hasFill && !hasBorder && !style.textDecorationLine.includes('underline')) {
        failures.push(`El botón «${action.textContent.trim()}» no se distingue del texto informativo mediante relleno, borde o subrayado`);
      }
    }
    const primary = document.querySelector('.workspace-section .primary-button');
    const secondary = document.querySelector('.workspace-section .secondary-button, .workspace-section .text-button');
    if (primary && secondary) {
      const a = getComputedStyle(primary), b = getComputedStyle(secondary);
      if (a.backgroundColor === b.backgroundColor && a.border === b.border && a.fontWeight === b.fontWeight) {
        failures.push('Las acciones principales y secundarias tienen la misma apariencia');
      }
    }
    for (const card of document.querySelectorAll('.workspace-section, .weight-comparison, .next-step')) {
      if (!visible(card)) continue;
      if (card.tabIndex >= 0 || ['button', 'link'].includes(card.getAttribute('role')) || getComputedStyle(card).cursor === 'pointer') {
        failures.push(`El bloque informativo ${card.className} aparenta ser una acción`);
      }
    }
    return { pairs, metricCount: metrics.length, clickableCardCount: actions.length, failures };
  });
}

// Composición de texto y fondo a través de los ancestros: contempla fondos
// transparentes y opacidad de grupos, sin dar por hecho el fondo de la tarjeta.
async function inspectContrast(page, selector) {
  return page.locator(selector).evaluateAll(elements => {
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 1;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    const color = value => {
      context.clearRect(0, 0, 1, 1); context.fillStyle = value; context.fillRect(0, 0, 1, 1);
      const rgba = [...context.getImageData(0, 0, 1, 1).data]; rgba[3] /= 255; return rgba;
    };
    const over = (front, back) => {
      const alpha = front[3] + back[3] * (1 - front[3]);
      return alpha ? [0, 1, 2].map(i => (front[i] * front[3] + back[i] * back[3] * (1 - front[3])) / alpha).concat(alpha) : [0, 0, 0, 0];
    };
    const luminance = rgba => {
      const linear = rgba.slice(0, 3).map(value => { const channel = value / 255; return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4; });
      return linear[0] * .2126 + linear[1] * .7152 + linear[2] * .0722;
    };
    return elements.filter(element => element.getClientRects().length && getComputedStyle(element).visibility !== 'hidden' && !element.disabled).map(element => {
      const style = getComputedStyle(element);
      let foreground = color(style.color), background = [0, 0, 0, 0], unsupported = null;
      for (let current = element; current; current = current.parentElement) {
        const currentStyle = getComputedStyle(current);
        if (currentStyle.backgroundImage !== 'none') unsupported = `Fondo de imagen o gradiente en ${current.className || current.tagName}`;
        const layer = color(currentStyle.backgroundColor), opacity = Number(currentStyle.opacity);
        foreground = over(foreground, layer); background = over(background, layer);
        foreground[3] *= opacity; background[3] *= opacity;
      }
      foreground = over(foreground, [255, 255, 255, 1]); background = over(background, [255, 255, 255, 1]);
      const light = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
      const ratio = (light[0] + .05) / (light[1] + .05);
      const large = parseFloat(style.fontSize) >= 24 || (parseFloat(style.fontSize) >= 18.6667 && parseFloat(style.fontWeight) >= 700);
      const minimum = large ? 3 : 4.5;
      return { selector: `${element.tagName.toLowerCase()}.${String(element.className).trim().replace(/\s+/g, '.')}`, text: element.textContent.trim().slice(0, 90), ratio, minimum, foreground, background, unsupported, pass: !unsupported && ratio >= minimum };
    });
  });
}

async function inspectReflow(page) {
  return page.evaluate(() => {
    const failures = [];
    if (document.documentElement.scrollWidth > innerWidth + 1) failures.push(`Documento ${document.documentElement.scrollWidth}px excede viewport ${innerWidth}px`);
    for (const element of document.querySelectorAll('.weight-comparison > div, .context-facts > div, .perimeter-comparison > div, .weekly-table th, .weekly-table td, .section-heading button')) {
      if (!element.getClientRects().length) continue;
      const range = document.createRange(); range.selectNodeContents(element);
      const text = range.getBoundingClientRect(), box = element.getBoundingClientRect();
      if (text.width && (text.left < box.left - 1 || text.right > box.right + 1)) failures.push(`Texto desborda ${element.className || element.tagName}: ${element.textContent.trim().slice(0, 70)}`);
    }
    const table = document.querySelector('.weekly-table');
    if (table.scrollWidth > table.parentElement.clientWidth + 1) failures.push('La tabla semanal desborda su contenedor');
    for (const button of document.querySelectorAll('.note-row > button[aria-label="Editar nota fijada"]')) {
      if (!button.getClientRects().length) continue;
      const walker = document.createTreeWalker(button, NodeFilter.SHOW_TEXT);
      const lines = new Set();
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        if (!node.textContent.trim()) continue;
        const range = document.createRange(); range.selectNodeContents(node);
        for (const rect of range.getClientRects()) if (rect.width > 0) lines.add(Math.round(rect.top));
      }
      if (lines.size > 1) failures.push('La palabra Editar de la nota se parte en varias líneas');
    }
    if (innerWidth <= 680) {
      const comparison = document.querySelector('.weight-comparison');
      const first = comparison.firstElementChild, last = comparison.lastElementChild;
      const firstBox = first.getBoundingClientRect(), lastBox = last.getBoundingClientRect();
      const firstValue = first.querySelector('strong').getBoundingClientRect(), lastValue = last.querySelector('strong').getBoundingClientRect();
      if (Math.abs(firstValue.left - lastValue.left) > 1 || lastBox.width <= firstBox.width * 1.5) {
        failures.push('Cambio no aprovecha una fila completa o su valor no se alinea con Inicial');
      }
    }
    return { width: innerWidth, rootFontSize: getComputedStyle(document.documentElement).fontSize, failures };
  });
}

test('resumen, intake, borrador conflictivo, tareas, revisión y estados funcionan en escritorio y móvil', { timeout: 120000 }, async () => {
  fs.writeFileSync(path.join(out, 'entry.ts'), source);
  await esbuild.build({ entryPoints: [path.join(out, 'entry.ts')], outfile: path.join(out, 'preview.js'), tsconfig: path.join(root, 'apps/train-fit-trainers/tsconfig.json'), bundle: true, format: 'esm', target: 'es2022', supported: { 'async-await': false }, plugins: [{ name: 'resources', setup(build) {
    build.onResolve({ filter: /client-overview-api.service$/ }, () => ({ path: 'overview-api', namespace: 'fixture' }));
    build.onResolve({ filter: /client-detail-api.service$/ }, () => ({ path: 'detail-api', namespace: 'fixture' }));
    build.onLoad({ filter: /.*/, namespace: 'fixture' }, ({ path: file }) => ({ contents: `export class ${file === 'overview-api' ? 'ClientOverviewApiService' : 'ClientDetailApiService'} {}`, loader: 'ts' }));
    build.onLoad({ filter: /client-overview\.component\.ts$/ }, ({ path: file }) => {
      const dir = path.dirname(file);
      let contents = fs.readFileSync(file, 'utf8').replace(/templateUrl:\s*'([^']+)'/, (_, url) => 'template: ' + JSON.stringify(fs.readFileSync(path.join(dir, url), 'utf8'))).replace(/styleUrls:\s*\['([^']+)'\]/, (_, url) => 'styles: [' + JSON.stringify(sass.compile(path.join(dir, url)).css) + ']');
      contents += '\nClientOverviewComponent.ctorParameters = () => [{type:ClientOverviewApiService},{type:ClientDetailApiService},{type:AlertController}];';
      return { contents, loader: 'ts', resolveDir: dir };
    });
  } }] });
  const tokens = sass.compile(path.join(root, 'apps/train-fit-trainers/src/theme/tokens.scss')).css;
  const ionic = ['core', 'normalize', 'structure', 'typography'].map(name => fs.readFileSync(path.join(root, `node_modules/@ionic/angular/css/${name}.css`), 'utf8')).join('\n');
  fs.writeFileSync(path.join(out, 'index.html'), '<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Resumen · Datos ficticios</title><style>' + ionic + tokens + 'html,body{position:static;overflow:auto;height:auto;background:var(--tf-bg);color:var(--tf-text);font-family:Arial,sans-serif}main{max-width:1160px;margin:auto;padding:24px}.fixture-nav{padding:12px 0 24px;color:var(--tf-text-secondary)}ion-modal{--background:var(--tf-surface-1);--ion-background-color:var(--tf-surface-1);--ion-text-color:var(--tf-text)}@media(max-width:600px){main{padding:12px}}</style><app-root></app-root><script type="module" src="/preview.js"></script></html>');
  // El documento completo permite capturar el resumen; los overlays conservan
  // el límite del viewport que aporta ion-app en la aplicación real.
  fs.appendFileSync(path.join(out, 'index.html'), '<style>body{transform:none}ion-modal{position:fixed}</style>');
  const server = http.createServer((req, res) => { const file = req.url === '/preview.js' ? 'preview.js' : 'index.html'; res.setHeader('Content-Type', file.endsWith('.js') ? 'text/javascript' : 'text/html'); res.end(fs.readFileSync(path.join(out, file))); });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: 'chrome' });
    const page = await browser.newPage({ viewport: { width: 1440, height: 1050 } });
    const errors = []; page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') process.stderr.write(message.text() + '\n'); });
    await page.goto(`http://127.0.0.1:${server.address().port}`);
    await page.waitForFunction(() => window.ready && window.overview?.overview);
    await page.waitForTimeout(250);
    await page.getByRole('heading', { name: 'Marta Soler' }).waitFor({ timeout: 5000 });
    assert.match(await page.locator('.weight-comparison').innerText(), /71,4/);
    assert.match(await page.locator('.weekly-table').innerText(), /1 pesaje/);
    const visualEvidence = [];
    const contrastSelectors = '.metric-label, .weight-comparison strong, .weight-comparison small, .weight-comparison > div > .muted, .context-facts dt, .context-facts dd, .note-date, .data-table thead th, .data-table small, .metric-value, .metric-unit, .perimeter-comparison dt, .perimeter-comparison small, .wellbeing-facts dt, .wellbeing-facts dd, .hint, button.primary-button, button.secondary-button, button.text-button, .attention-strip > button > span, .attention-strip > button > strong';
    const auditVisuals = async label => {
      const hierarchy = await inspectHierarchy(page);
      const contrast = await inspectContrast(page, contrastSelectors);
      const reflow = await inspectReflow(page);
      const result = { label, hierarchy, contrast, reflow };
      visualEvidence.push(result);
      fs.writeFileSync(path.join(screenshots, 'hierarchy-audit.json'), JSON.stringify(visualEvidence, null, 2));
      assert.deepEqual(hierarchy.failures, [], `${label}: jerarquía y elementos interactivos`);
      assert.deepEqual(contrast.filter(item => !item.pass).map(item => ({ text: item.text, ratio: item.ratio, minimum: item.minimum, unsupported: item.unsupported })), [], `${label}: contraste WCAG AA de texto sobre fondo compuesto`);
      assert.deepEqual(reflow.failures, [], `${label}: texto legible sin desbordamiento horizontal`);
    };
    await auditVisuals('Escritorio 1440');
    const primaryAction = page.locator('.workspace-section .primary-button').first();
    await primaryAction.focus();
    assert.equal(await primaryAction.evaluate(element => { const style = getComputedStyle(element); return style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0; }), true, 'El foco de teclado se reconoce en los botones');
    await primaryAction.evaluate(element => element.blur());
    await page.screenshot({ path: path.join(screenshots, 'desktop.png'), fullPage: true });
    await page.locator('.weight-comparison').screenshot({ path: path.join(screenshots, 'weight-desktop.png') });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: path.join(screenshots, 'mobile.png'), fullPage: true });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    for (const width of [390, 320]) {
      await page.setViewportSize({ width, height: 844 });
      await auditVisuals(`Móvil ${width}`);
      if (width === 320) await page.locator('.weight-comparison').screenshot({ path: path.join(screenshots, 'weight-mobile-320.png') });
      assert.equal(await page.locator('.weekly-table').evaluate(table => table.scrollWidth <= table.parentElement.clientWidth), true);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      const headers = await page.locator('.weekly-table thead th').evaluateAll(cells => cells.slice(1).map(cell => {
        const range = document.createRange(); range.selectNodeContents(cell);
        const box = range.getBoundingClientRect(); return {left:box.left,right:box.right};
      }));
      assert.ok(headers[0].right < headers[1].left, 'Los encabezados Peso medio y Registros no se solapan');
    }
    const originalRootFontSize = await page.evaluate(() => getComputedStyle(document.documentElement).fontSize);
    const normalWeightFontSize = await page.locator('.weight-comparison strong').first().evaluate(element => parseFloat(getComputedStyle(element).fontSize));
    await page.evaluate(size => document.documentElement.style.fontSize = `${parseFloat(size) * 2}px`, originalRootFontSize);
    const enlargedWeightFontSize = await page.locator('.weight-comparison strong').first().evaluate(element => parseFloat(getComputedStyle(element).fontSize));
    assert.ok(enlargedWeightFontSize >= normalWeightFontSize * 1.95, 'La prueba de ampliación duplica realmente el tamaño del texto');
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: width === 1440 ? 1050 : 844 });
      await auditVisuals(`Texto al 200% · ${width}`);
    }
    await page.screenshot({ path: path.join(screenshots, 'mobile-320-text-200.png'), fullPage: true });
    await page.evaluate(() => document.documentElement.style.removeProperty('font-size'));
    await page.setViewportSize({ width: 1440, height: 1050 });
    await page.getByRole('button', { name: /Ver intake|Ver cuestionario|Cuestionario inicial/ }).first().click();
    await page.getByText('Turnos variables de trabajo', { exact: true }).last().waitFor();
    const intakeContrast = await inspectContrast(page, 'ion-modal.show-modal .intake-answers dt, ion-modal.show-modal .intake-answers dd, ion-modal.show-modal .intake-answers small, ion-modal.show-modal .hint');
    assert.ok(intakeContrast.length > 0, 'Se comprueba también el contraste de las respuestas del intake abierto');
    assert.deepEqual(intakeContrast.filter(item => !item.pass), [], 'El detalle conserva etiquetas, valores y fechas legibles');
    await page.screenshot({ path: path.join(screenshots, 'intake.png') });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: path.join(screenshots, 'intake-mobile.png') });
    await page.evaluate(() => { window.modalDismissed=false; document.addEventListener('ionModalDidDismiss', () => window.modalDismissed=true, {once:true}); });
    await page.getByRole('button', { name: 'Cerrar detalle', exact: true }).click();
    await page.waitForFunction(() => window.modalDismissed && [...document.querySelectorAll('ion-modal')].every(modal => !modal.presented));
    await page.setViewportSize({ width: 1440, height: 1050 });
    await page.getByRole('button', { name: /Editar contexto/ }).first().click();
    await page.locator('textarea[name=goals]').fill('Objetivo corregido de prueba', {timeout:5000});
    await page.screenshot({ path: path.join(screenshots, 'editor.png') });
    await page.setViewportSize({ width: 390, height: 520 });
    await page.evaluate(() => window.conflict = true);
    await page.getByRole('button', { name: 'Guardar', exact: true }).click();
    await page.getByRole('alert').filter({ hasText: 'La información ha cambiado' }).waitFor();
    const conflictMessage = page.getByRole('alert').filter({ hasText: 'La información ha cambiado' });
    await page.waitForFunction(() => document.activeElement?.getAttribute('role') === 'alert');
    const conflictBox = await conflictMessage.boundingBox();
    assert.ok(conflictBox.y >= 0 && conflictBox.y + conflictBox.height <= 520, 'El conflicto se muestra completo al fallar el guardado');
    const reloadBox = await page.getByRole('button', { name: 'Descartar borrador y cargar datos actuales' }).boundingBox();
    assert.ok(reloadBox.y >= 0 && reloadBox.y + reloadBox.height <= 520, 'La acción para resolver el conflicto también queda visible');
    await page.screenshot({ path: path.join(screenshots, 'conflict-short-mobile.png') });
    assert.equal(await page.locator('textarea[name=goals]').inputValue(), 'Objetivo corregido de prueba');
    await page.evaluate(() => { window.modalDismissed=false; document.addEventListener('ionModalDidDismiss', () => window.modalDismissed=true, {once:true}); });
    await page.getByRole('button', { name: 'Cerrar y conservar borrador' }).click();
    await page.waitForFunction(() => window.modalDismissed && [...document.querySelectorAll('ion-modal')].every(modal => !modal.presented));
    await page.setViewportSize({ width: 1440, height: 1050 });
    await page.evaluate(() => window.conflict = false);
    await page.getByRole('button', { name: 'Editar contexto', exact: true }).click();
    assert.equal(await page.locator('textarea[name=goals]').inputValue(), 'Objetivo corregido de prueba');
    await page.evaluate(() => { window.modalDismissed=false; document.addEventListener('ionModalDidDismiss', () => window.modalDismissed=true, {once:true}); });
    await page.getByRole('button', { name: 'Guardar', exact: true }).click();
    await page.waitForFunction(() => window.modalDismissed && document.querySelectorAll('ion-modal.show-modal').length === 0
      && [...document.querySelectorAll('ion-modal')].every(modal => !modal.presented), null, {timeout:5000});
    await page.waitForFunction(() => !window.overview.loading);
    assert.equal(await page.locator('.goal-text').innerText(), 'Objetivo corregido de prueba');
    await page.getByRole('button', { name: 'Registrar medición', exact: true }).click();
    await page.locator('input[name=measurementValue]').fill('78.1');
    await page.locator('input[name=correctExisting]').waitFor();
    assert.match(await page.locator('ion-modal.editor-modal .notice').innerText(), /78,4/);
    await page.getByRole('button', { name: 'Guardar', exact: true }).click();
    await page.getByRole('alert').filter({ hasText: 'Confirma la corrección' }).waitFor();
    assert.equal(await page.evaluate(() => window.calls.filter(call => call.kind === 'measurement').length), 0);
    await page.locator('input[name=correctExisting]').check();
    await page.getByRole('button', { name: 'Guardar', exact: true }).click();
    await page.waitForFunction(() => document.querySelectorAll('ion-modal.show-modal').length === 0
      && [...document.querySelectorAll('ion-modal')].every(modal => !modal.presented), null, {timeout:5000});
    assert.deepEqual(await page.evaluate(() => window.calls.find(call => call.kind === 'measurement').payload.expectedValues), {weight:78.4});
    await page.waitForFunction(() => !window.overview.loading);
    await page.getByRole('button', { name: 'Registrar medición', exact: true }).click();
    await page.locator('input[name=measurementDate]').fill('2025-02-10');
    await page.locator('input[name=measurementValue]').fill('73.8');
    await page.waitForFunction(() => window.overview.editor?.measurementExpectedValue === 74);
    assert.equal(await page.evaluate(() => window.calls.filter(call => call.kind === 'measurement-preview').at(-1).date), '2025-02-10');
    await page.locator('input[name=correctExisting]').waitFor();
    await page.getByRole('button', { name: 'Cerrar y conservar borrador' }).click();
    await page.waitForFunction(() => [...document.querySelectorAll('ion-modal')].every(modal => !modal.presented));
    await page.evaluate(() => window.oldMeasurement = 74.2);
    await page.getByRole('button', { name: 'Registrar medición', exact: true }).click();
    await page.waitForFunction(() => window.overview.editor?.measurementExpectedValue === 74.2);
    assert.equal(await page.locator('input[name=measurementValue]').inputValue(), '73.8');
    assert.equal(await page.locator('input[name=measurementDate]').inputValue(), '2025-02-10');
    assert.match(await page.locator('ion-modal.editor-modal .notice').innerText(), /74,2/);
    await page.getByRole('button', { name: 'Cerrar y conservar borrador' }).click();
    await page.waitForFunction(() => [...document.querySelectorAll('ion-modal')].every(modal => !modal.presented));
    await page.getByRole('button', { name: 'Completar tarea: Revisar adaptación de rodilla' }).first().click();
    await page.waitForFunction(() => window.calls.some(call => call.kind === 'task'));
    await page.getByRole('button', { name: 'Registrar revisión', exact: true }).click();
    await page.locator('textarea[name=conclusion]').fill('Mantener el plan adaptado');
    await page.locator('textarea[name=nextStep]').fill('Revisar después de dos sesiones');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: path.join(screenshots, 'review-mobile.png') });
    const closeBox = await page.getByRole('button', { name: 'Cerrar formulario', exact: true }).boundingBox();
    assert.ok(closeBox.width >= 44 && closeBox.height >= 44, 'Cerrar formulario debe medir al menos 44×44');
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => Boolean(document.activeElement.closest('ion-modal'))), true);
    await page.setViewportSize({ width: 390, height: 520 });
    const saveBox = await page.getByRole('button', { name: 'Guardar', exact: true }).boundingBox();
    await page.screenshot({ path: path.join(screenshots, 'review-short-mobile.png') });
    assert.ok(saveBox.y >= 0 && saveBox.y + saveBox.height <= 520, 'Guardar sigue visible con poca altura');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole('button', { name: 'Guardar', exact: true }).click();
    await page.waitForFunction(() => window.calls.some(call => call.kind === 'review'));
    assert.equal(await page.evaluate(() => window.calls.find(call => call.kind === 'review').payload.nextStep), 'Revisar después de dos sesiones');
    await page.waitForFunction(() => document.querySelectorAll('ion-modal.show-modal').length === 0
      && [...document.querySelectorAll('ion-modal')].every(modal => !modal.presented), null, {timeout:5000});
    await page.evaluate(() => {
      window.data.context.values.goals = 'Objetivo explicado con detalle. '.repeat(30);
      window.data.context.values.healthConditions = 'Contexto que conviene consultar íntegro. '.repeat(24);
      window.data.pinnedNotes = Array.from({length:5}, (_, i) => ({_id:'long-note-'+i, text:'Observación importante con todo su contexto. '.repeat(16), pinned:true, version:0,createdAt:'2026-09-01T10:00:00Z'}));
      window.zone.run(() => window.overview.refresh());
    });
    await page.getByRole('button', {name:'Ver objetivo completo'}).waitFor();
    await page.evaluate(() => scrollTo(0,0));
    const attention = await page.locator('.attention-strip').boundingBox();
    assert.ok(attention.y + attention.height < 844, 'Los pendientes aparecen antes de textos largos');
    await page.screenshot({ path: path.join(screenshots, 'long-context-mobile.png') });
    await page.getByRole('button', {name:'Ver objetivo completo'}).click();
    assert.equal(await page.locator('.goal-text').innerText(), 'Objetivo explicado con detalle. '.repeat(30).trim());
    await page.evaluate(() => { window.partialError = true; window.zone.run(() => window.overview.refresh()); });
    await page.getByText('No se han podido cargar las mediciones.', { exact: true }).waitFor();
    assert.equal(await page.getByRole('heading', { name: 'Marta Soler' }).count(), 1);
    await page.getByLabel('Etapa de seguimiento').selectOption('stage-old');
    await page.waitForFunction(() => window.overview.historical);
    assert.equal(await page.getByRole('button', { name: 'Registrar revisión', exact: true }).count(), 0);
    assert.deepEqual(errors, []);
  } finally {
    await browser?.close();
    await new Promise(resolve => server.close(resolve));
  }
});
