// Componente real + Angular + Chart.js; HTTP sólo devuelve datos ficticios.
// TRAINFIT_PLAYWRIGHT_PATH permite una instalación externa de Playwright.
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
const out = path.join(root, '.tmp/checkins-rendering-test');
fs.mkdirSync(out, { recursive: true });
const source = `
import 'zone.js';
import '@angular/compiler';
import { Component, NgModule, ApplicationRef, NgZone, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { of } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { addIcons } from 'ionicons';
import * as icons from 'ionicons/icons';
import { defineCustomElement } from 'ionicons/components/ion-icon';
import { HttpService } from 'src/app/core/services/http/http.service';
import { CheckinWorkspaceComponent } from '../../${detail}/components/checkin-workspace/checkin-workspace.component';
import { CheckinHistoryChartComponent } from '../../${detail}/components/checkin-history-chart/checkin-history-chart.component';
import { compareCheckins } from '../../${detail}/components/checkin-workspace/checkin-comparison';
addIcons(icons);defineCustomElement();Chart.register(...registerables);
const metrics = window.metrics = {checks:0,created:0,destroyed:0,stopped:false};
Chart.register({id:'diagnostic',beforeInit(){metrics.created++;},afterDestroy(){metrics.destroyed++;}});
const now = new Date();
const day = offset => {const d=new Date(now);d.setDate(d.getDate()+offset);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');};
const at = offset => day(offset)+'T09:00:00.000Z';
const questions=[{_id:'effort',label:'Esfuerzo propio',type:'scale_1_5',enabled:true},{_id:'done',label:'Plan cumplido',type:'yes_no',enabled:true}];
const schedule={_id:'schedule-a',name:'Bienestar semanal',frequency:'weekly',interval:1,time:'11:00',timeZone:'Europe/Madrid',startDate:day(-21),nextRunAt:at(7),active:true,revision:0,sourceTemplateId:'template-a',enabledFields:['weight','stress_level','sleep_hours','urine_color','comment'],customQuestions:questions};
const history=Array.from({length:4},(_,i)=>({_id:'response-'+i,scheduleId:schedule._id,name:schedule.name,scheduledAt:at(-i*7),respondedAt:at(-i*7),timeZone:'Europe/Madrid',status:i===0?'responded':'reviewed',values:{weight:80+i*.5,stress_level:2+i%3,sleep_hours:7-i*.5,urine_color:2+i,'custom:effort':3,'custom:done':false,comment:'Sin molestias durante el entrenamiento'},customQuestions:questions}));
const pending={_id:'pending',scheduleId:'schedule-b',name:'Medidas mensuales',scheduledAt:at(0),closesAt:at(7),timeZone:'Europe/Madrid',status:'pending'};
const data={schedules:[schedule,{...schedule,_id:'schedule-b',name:'Medidas mensuales',frequency:'monthly'}],entries:[...history,pending,{...pending,_id:'unanswered',scheduledAt:at(-1),status:'unanswered'},{...pending,_id:'future',scheduledAt:at(7),status:'scheduled'}],responses:history,pendingReviews:[history[0]],reviewCount:1,legacyConfig:null,legacyResponses:[]};
window.calls=[];window.compareCheckins=compareCheckins;window.testData=data;
const api={get(url){window.calls.push({method:'get',url});return of(structuredClone(url.endsWith('checkin-templates')?[{...schedule,_id:'template-a'}]:data));},
 post(url,body){window.calls.push({method:'post',url,body});if(url.endsWith('/review')){history[0].status='reviewed';history[0].reviewedAt=new Date().toISOString();history[0].reviewComment=body.comment;data.reviewCount=0;data.pendingReviews=[];}return of({});},
 put(url,body){window.calls.push({method:'put',url,body});return of({});},patch(url,body){window.calls.push({method:'patch',url,body});return of({});}};
const originalCheck=CheckinWorkspaceComponent.prototype.ngOnChanges;
CheckinWorkspaceComponent.prototype.ngOnChanges=function(...args){window.workspace=this;return originalCheck.apply(this,args);};
@Component({selector:'app-root',template:'<nav class="fixture-nav"><button id="leave" (click)="open=false">Salir</button><button id="enter" (click)="open=true">Check-ins</button><span>Cliente de prueba · Progreso</span></nav><app-checkin-workspace *ngIf="open" clientId="fixture-client"></app-checkin-workspace>'})
class Fixture {open=true;ngDoCheck(){metrics.checks++;if(metrics.checks===200){metrics.stopped=true;Object.values(Chart.instances).forEach(c=>c.destroy());}}}
@NgModule({imports:[BrowserModule,FormsModule],declarations:[Fixture,CheckinWorkspaceComponent,CheckinHistoryChartComponent],schemas:[CUSTOM_ELEMENTS_SCHEMA],providers:[{provide:HttpService,useValue:api},{provide:Router,useValue:{navigate:()=>Promise.resolve(true)}}],bootstrap:[Fixture]})class FixtureModule{}
platformBrowserDynamic().bootstrapModule(FixtureModule).then(mod=>{window.app=mod.injector.get(ApplicationRef);window.zone=mod.injector.get(NgZone);window.chartState=()=>Object.values(Chart.instances).map(c=>({data:c.data.datasets[0].data,min:c.options.scales.y.min,max:c.options.scales.y.max,width:c.width,height:c.height}));window.ready=true;});
`;

test('calendario, comparación, revisión y gráfica permanecen estables en escritorio y móvil', { timeout: 90000 }, async () => {
  fs.writeFileSync(path.join(out, 'entry.ts'), source);
  await esbuild.build({ entryPoints: [path.join(out, 'entry.ts')], outfile: path.join(out, 'preview.js'), tsconfig: path.join(root, 'apps/train-fit-trainers/tsconfig.json'), bundle: true, format: 'esm', target: 'es2022', supported: { 'async-await': false }, plugins: [{ name: 'resources', setup(build) {
    build.onResolve({filter:/^src\/app\/core\/services\/http\/http.service$/},()=>({path:'http-mock',namespace:'mock'}));
    build.onLoad({filter:/.*/,namespace:'mock'},()=>({contents:'export class HttpService {}',loader:'ts'}));
    build.onLoad({filter:/checkin-(workspace|history-chart)\.component\.ts$/},({path:file})=>{
      const base=path.dirname(file);
      const contents=fs.readFileSync(file,'utf8').replace(/templateUrl:\s*'([^']+)'/,(_,url)=>'template: '+JSON.stringify(fs.readFileSync(path.join(base,url),'utf8'))).replace(/styleUrls:\s*\['([^']+)'\]/,(_,url)=>'styles: ['+JSON.stringify(sass.compile(path.join(base,url)).css)+']');
      return {contents,loader:'ts',resolveDir:base};
    });
  }}] });
  const tokens=sass.compile(path.join(root,'apps/train-fit-trainers/src/theme/tokens.scss')).css;
  fs.writeFileSync(path.join(out,'index.html'),'<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Check-ins · Datos ficticios</title><style>'+tokens+'body{margin:0;padding:24px;background:var(--tf-bg);color:white;font:14px Arial,sans-serif}app-root{display:block;max-width:1160px;margin:auto}.fixture-nav{display:flex;gap:12px;align-items:center;margin-bottom:24px;color:#c7c7c7}.fixture-nav button{padding:12px;color:white;background:#222;border:1px solid #444;border-radius:8px}@media(max-width:600px){body{padding:12px}.fixture-nav span{display:none}}</style><app-root></app-root><script type="module" src="/preview.js"></script></html>');
  const server=http.createServer((req,res)=>{const file=req.url==='/preview.js'?'preview.js':'index.html';res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':'text/html');res.end(fs.readFileSync(path.join(out,file)));});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  let browser;
  try {
    browser=await chromium.launch({headless:true,channel:'chrome'});
    const page=await browser.newPage({viewport:{width:1440,height:1050}});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:'+server.address().port);
    await page.waitForFunction(()=>window.ready);
    assert.equal(await page.locator('.calendar-day').count(),42);
    assert.equal(await page.locator('.comparison-table tbody tr').count(),7);
    assert.match(await page.locator('.comparison-table').innerText(),/−0,5 kg/);
    assert.equal(await page.getByLabel('Respuesta de referencia').inputValue(),'response-1');
    await page.screenshot({path:path.join(out,'desktop.png'),fullPage:true});
    await page.getByRole('button',{name:'Evolución de este formulario'}).click();
    await page.waitForTimeout(1200);
    const first=await page.evaluate(()=>({metrics:{...window.metrics},charts:window.chartState()}));
    assert.equal(first.metrics.stopped,false);
    assert.deepEqual(first.charts[0].data,[81.5,81,80.5,80]);
    await page.waitForTimeout(400);
    assert.equal(await page.evaluate(()=>window.metrics.checks),first.metrics.checks);
    await page.getByRole('tab',{name:'Color de la orina',exact:true}).click();
    assert.equal((await page.evaluate(()=>window.chartState()))[0].max,8);
    await page.getByRole('tab',{name:'Esfuerzo propio',exact:true}).click();
    assert.equal((await page.evaluate(()=>window.chartState()))[0].max,5);
    await page.evaluate(()=>window.zone.run(()=>{window.savedTrend=window.workspace.trendResponses;window.workspace.trendResponses=[];}));
    assert.equal((await page.evaluate(()=>window.chartState())).length,0);
    await page.evaluate(()=>window.zone.run(()=>window.workspace.trendResponses=window.savedTrend));
    assert.equal((await page.evaluate(()=>window.chartState())).length,1);
    await page.getByRole('button',{name:'Evolución de este formulario'}).click();
    await page.setViewportSize({width:390,height:844});
    await page.screenshot({path:path.join(out,'mobile.png'),fullPage:true});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),true);
    const layout=await page.evaluate(()=>({calendar:document.querySelector('.calendar-panel').getBoundingClientRect().top,review:document.querySelector('.review-panel').getBoundingClientRect().top,day:document.querySelector('.calendar-day').getBoundingClientRect().width}));
    assert.ok(layout.calendar<layout.review);assert.ok(layout.day>=44);
    await page.setViewportSize({width:1440,height:1050});
    await page.getByRole('button',{name:/^Por revisar \d+$/}).click();
    await page.getByLabel('Comentario para el cliente').fill('Buena constancia. Mantén las horas de sueño.');
    await page.getByRole('button',{name:'Marcar revisado',exact:true}).click();
    await page.waitForFunction(()=>window.calls.some(c=>c.url.endsWith('/review')));
    await page.getByRole('heading',{name:'Todo revisado'}).waitFor({state:'visible'});
    assert.equal(await page.evaluate(()=>window.calls.find(c=>c.url.endsWith('/review')).body.comment),'Buena constancia. Mantén las horas de sueño.');
    await page.getByRole('button',{name:'Programar check-in',exact:true}).click();
    await page.getByLabel('Formulario',{exact:true}).first().selectOption('template-a');
    await page.getByLabel('Nombre para este cliente').fill('Sueño cada dos semanas');
    await page.locator('input[name=interval]').fill('2');
    await page.screenshot({path:path.join(out,'editor.png'),fullPage:true});
    await page.getByRole('button',{name:'Guardar programación'}).click();
    await page.waitForFunction(()=>window.calls.some(c=>c.url.endsWith('/checkin-schedules')));
    const saved=await page.evaluate(()=>window.calls.find(c=>c.url.endsWith('/checkin-schedules')).body);
    assert.equal(saved.interval,2);assert.equal(saved.frequency,'weekly');assert.equal(saved.sourceTemplateId,'template-a');
    await page.locator('summary').first().click();
    await page.getByRole('button',{name:'Editar fechas'}).first().click();
    assert.equal(await page.locator('input[name=startDate]').inputValue(),await page.evaluate(()=>window.testData.schedules[0].startDate));
    await page.getByRole('button',{name:'Cancelar',exact:true}).click();
    await page.getByRole('button',{name:'Pedir ahora',exact:true}).first().click();
    await page.waitForFunction(()=>window.calls.some(c=>c.url.endsWith('/request')));
    assert.match(await page.evaluate(()=>window.calls.find(c=>c.url.endsWith('/request')).body.requestKey),/^[\w-]{16,80}$/);
    await page.locator('summary').first().click();
    await page.getByRole('button',{name:'Pausar',exact:true}).first().click();
    await page.waitForFunction(()=>window.calls.some(c=>c.method==='patch'));
    assert.equal(await page.evaluate(()=>window.calls.find(c=>c.method==='patch').body.active),false);
    const rows=await page.evaluate(()=>window.compareCheckins({...window.testData.responses[0],scheduleId:'different'},window.testData.responses[1]));
    assert.equal(rows[0].change,'No comparable');
    assert.equal(rows.find(r=>r.key==='custom:done').current,'No');
    for(let i=0;i<3;i++){await page.locator('#leave').click();assert.equal((await page.evaluate(()=>window.chartState())).length,0);await page.locator('#enter').click();await page.getByRole('button',{name:'Evolución de este formulario'}).click();}
    await page.locator('#leave').click();
    const final=await page.evaluate(()=>window.metrics);
    assert.equal(final.stopped,false);assert.equal(final.created,final.destroyed);assert.deepEqual(errors,[]);
  } finally {await browser?.close();await new Promise(resolve=>server.close(resolve));}
});
