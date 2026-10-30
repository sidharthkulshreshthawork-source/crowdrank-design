import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const read=path=>readFileSync(new URL(path,import.meta.url),'utf8');

test('modular app has responsive HTML entry point',()=>{
 const html=read('../web/index.html');
 assert.match(html,/<meta name="viewport"/);
 assert.match(html,/<main\b/);
 assert.match(html,/<script type="module" src="\.\/app\.mjs"/);
});
test('all core flows and truthful practice labels are present',()=>{
 const app=read('../web/app.mjs');
 assert.match(app,/PRACTICE|Practice/);
 assert.match(app,/fictional|illustrative|no survey/i);
 assert.match(app,/data-action="lock"/);
 assert.ok(app.includes("actionButton('share'"));
 assert.match(app,/data-action="weekly"/);
 assert.match(app,/aria-live/);
});
test('accessibility essentials exist in the stylesheet',()=>{
 const css=read('../web/styles.css');
 assert.match(css,/:focus-visible/);
 assert.match(css,/@media\s*\(prefers-reduced-motion:\s*reduce\)/);
 assert.match(css,/@media\s*\(max-width:/);
 assert.match(css,/min-height:\s*44px/);
});
test('local icon and manifest are present',()=>{
 assert.ok(existsSync(new URL('../web/icon.svg',import.meta.url)));
 assert.ok(existsSync(new URL('../web/manifest.webmanifest',import.meta.url)));
});
test('root standalone game includes self-contained content and scripts',()=>{
 const html=read('../index.html');
 assert.match(html,/<style>/);
 assert.match(html,/<script>/);
 assert.match(html,/PRACTICE/);
});
