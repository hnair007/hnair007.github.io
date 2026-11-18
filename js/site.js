import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const STACK = [
  { name:'databases', c:'#34d399', rows:[['SQL','core'],['PostgreSQL','core'],['MongoDB','nosql'],['Pocketbase','backend']] },
  { name:'data_analytics', c:'#38bdf8', rows:[['Databricks','pipelines'],['Power BI','viz'],['Tableau','viz'],['Splunk Enterprise','observability']] },
  { name:'backend', c:'#a78bfa', rows:[['C# / .NET','lang'],['Python','lang'],['C++ / C','lang'],['Java','lang'],['GraphQL','api'],['REST APIs','api']] },
  { name:'infra_devops', c:'#fbbf24', rows:[['Docker','containers'],['Linux','os'],['Azure DevOps','ci'],['Git / GitHub / Fork','vcs'],['TFS','vcs']] },
  { name:'frontend', c:'#f472b6', rows:[['Vue','ui'],['React / React Native','ui'],['JavaScript','lang'],['HTML / CSS','ui']] },
  { name:'practices', c:'#94a3b8', rows:[['Agile: Scrum & Kanban','process'],['Team leadership & mentoring','lead'],['AI-assisted development (Cursor)','ai'],['Multi-threaded systems','arch']] },
];

const JOBS = [
  { role:'Sr. Software Engineer', co:'Jensen USA · Florida', when:'Aug 2024 — Present',
    tags:['C# / .NET','GraphQL','SQL','Docker','Vue','AI-assisted dev'],
    pts:['Built and maintained production software across backend and frontend systems using C#/.NET, Vue, GraphQL, SQL, Docker and Linux-based workflows',
      'Delivered end-to-end features involving configuration models, UI components, metrics, alarms, simulation logic and schema/type integration',
      'Added diagnostics, operational metrics and status handling to improve observability and troubleshooting in complex production systems',
      'Improved reliability and maintainability by refactoring legacy logic and creating reusable configuration-driven components',
      'Used AI coding assistants to speed up development and debugging while critically reviewing generated code for quality and correctness',
      'Developed embedded control system software for advanced washer and dryer technologies, focused on performance, reliability and energy efficiency'] },
  { role:'Lead Software Engineer', co:'L&T Technology Services Ltd · Florida', when:'Apr 2020 — Aug 2024',
    tags:['Python','Databricks','PostgreSQL','C#','Azure DevOps','Team lead'],
    pts:['Designed and implemented data pipelines for equipment automation systems using Python and Databricks to process and analyze large datasets',
      'Developed and maintained data-driven automation programs in C#, integrating real-time equipment sensor data into PostgreSQL databases',
      'Led a team of software engineers building scalable data solutions and optimizing workflows for large-scale datasets',
      'Mentored the team on data engineering best practices, software architecture and coding standards',
      'Used Azure DevOps for task tracking, test execution and documentation, building a central knowledge base for data engineering processes',
      'Coordinated with cross-functional engineering teams to align on project objectives and delivery'] },
  { role:'Senior Engineer', co:'Doerfer Companies · Iowa', when:'Apr 2018 — Feb 2020',
    tags:['SCADA','VB scripting','TwinCAT 3','TFS'],
    pts:['Developed SCADA control logic, alarms and user interfaces using VB scripting for industrial automation',
      'Developed the control program for an algae reactor system using TwinCAT 3',
      'Built a wheel-lift control system for automatically guided, high-precision vehicles using TwinCAT 3 Beckhoff',
      'Managed Team Foundation Server (TFS) for version control and project management'] },
  { role:'Senior Software Engineer', co:'AG-Tronix Inc · Florida', when:'Feb 2017 — Mar 2018',
    tags:['SQL','REST APIs','Python','IoT'],
    pts:['Managed the SQL database and developed REST APIs for remote monitoring data',
      'Extended the open-source Weewx platform to collect and monitor remote sensor data',
      'Developed a model for monitoring and controlling a water management system',
      'Built edge data collection on Arduino and Raspberry Pi using C and Python'] },
  { role:'Research Assistant', co:'Florida International University · Florida', when:'Jan 2016 — Dec 2016',
    tags:['Splunk','Smart Grid','Arduino','Android'],
    pts:['Assessed Smart Grid assets, categorized threats and vulnerabilities, predicted attack vectors and visualized them for control-room operators in Splunk Enterprise',
      'Modeled, monitored and analyzed renewable integration using Arduino, MATLAB GUI and real-time hardware-in-the-loop measurement',
      'Built an adaptive lighting controller that programs Kelvin CCT LEDs to classroom needs, with a front-end and back-end GUI in Android Studio'] },
  { role:'Senior Software Engineer', co:'Marine Electricals Pvt. Ltd. · India', when:'Apr 2012 — Mar 2015',
    tags:['C#','Real-time monitoring','UI logic'],
    pts:['Programmed real-time alarm monitoring and switchboard power management logic in C#',
      'Designed and developed user interface logic for lift control panels and navigation light control systems',
      'Evaluated client change requests and performed troubleshooting and debugging during commissioning'] },
  { role:'Data Engineer', co:'Power Matrix Solution Pvt. Ltd. · India', when:'Oct 2007 — Nov 2008',
    tags:['Tableau','Analysis','Reporting'],
    pts:['Built Tableau reports to track power quality findings and mitigation actions',
      'Performed power quality studies, analysis, recommendations and thermal scanning reports'] },
];

const SYSTEMS = [
  { t:'Equipment sensor data pipeline', d:'At L&T: real-time sensor data from automated field equipment, processed with Python and Databricks and stored in PostgreSQL for large-scale analysis. Built by a team I led.',
    flow:[['Equipment sensors','#38bdf8'],['Python + Databricks','#a78bfa'],['PostgreSQL','#34d399'],['Analytics','#fbbf24']] },
  { t:'Production backend with built-in observability', d:'At Jensen USA: C#/.NET services behind a GraphQL API with SQL storage, shipped in Docker, with metrics, alarms and diagnostics so production issues are visible before they hurt.',
    flow:[['Machines & config','#38bdf8'],['C# / .NET services','#a78bfa'],['SQL','#34d399'],['GraphQL + Vue UI','#fbbf24']] },
  { t:'Remote water-management monitoring', d:'At AG-Tronix: sensors and pump stations reporting remote data through Weewx into a SQL database, exposed through REST APIs for monitoring and control.',
    flow:[['Sensors / PLCs','#38bdf8'],['Weewx logic','#a78bfa'],['SQL database','#34d399'],['REST API','#fbbf24']] },
  { t:'Smart-grid threat analytics', d:'At FIU: every grid asset assessed and classified by threat and vulnerability, then turned into Splunk visualizations control-room operators could act on.',
    flow:[['Grid assets','#38bdf8'],['Threat model','#a78bfa'],['Splunk index','#34d399'],['Operator dashboards','#fbbf24']] },
];

document.getElementById('schema').innerHTML = STACK.map(t=>`
  <div class="table reveal" style="--c:${t.c}">
    <header>${t.name}<small>${t.rows.length} rows</small></header>
    <ul>${t.rows.map(([n,k])=>`<li><b>${n}</b><span>${k}</span></li>`).join('')}</ul>
  </div>`).join('');

document.getElementById('timeline').innerHTML = JOBS.map((j,i)=>`
  <details class="job" ${i===0?'open':''}>
    <summary><div><h3>${j.role}</h3><div class="co">${j.co}</div></div><div class="when">${j.when}</div>
      <div class="tags">${j.tags.map(t=>`<span>${t}</span>`).join('')}</div><div class="more">▾</div></summary>
    <ul>${j.pts.map(p=>`<li>${p}</li>`).join('')}</ul>
  </details>`).join('');

document.getElementById('sysGrid').innerHTML = SYSTEMS.map((s,i)=>`
  <article class="sys reveal"><div class="num">pipeline_0${i+1}</div><h3>${s.t}</h3><p>${s.d}</p>
    <div class="flow">${s.flow.map(([n,c])=>`<span style="--c:${c}">${n}</span>`).join('<i>→</i>')}</div></article>`).join('');

const io = new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting) return; e.target.classList.add('in'); io.unobserve(e.target);
  e.target.querySelectorAll?.('[data-count]').forEach(countUp);
}),{threshold:.15});
document.querySelectorAll('.reveal,.job,.stats').forEach(el=>io.observe(el));
function countUp(el){
  const to=+el.dataset.count, dec=+(el.dataset.dec||0), t0=performance.now();
  (function f(t){ const k=Math.min((t-t0)/1400,1), v=to*(1-Math.pow(1-k,3)); el.textContent=v.toFixed(dec); if(k<1) requestAnimationFrame(f); })(t0);
}

const menuBtn=document.getElementById('menuBtn');
menuBtn.onclick=()=>document.body.classList.toggle('menu-open');
document.querySelectorAll('.mnav a').forEach(a=>a.onclick=()=>document.body.classList.remove('menu-open'));

const QUERIES = [
  "SELECT * FROM engineers WHERE focus = 'data' AND years >= 14;",
  "INSERT INTO your_team VALUES ('Hari Nair', 'data engineer');",
  "SELECT stack FROM hari WHERE tool IN ('PostgreSQL', 'Databricks', 'GraphQL');",
];
const typed=document.getElementById('typed');
const hl=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;')
  .replace(/'[^']*'?/g,m=>`<span class="str">${m}</span>`)
  .replace(/\b(SELECT|FROM|WHERE|AND|INSERT|INTO|VALUES|IN)\b/g,'<span class="kw">$1</span>');
(async function typeLoop(){
  const wait=ms=>new Promise(r=>setTimeout(r,ms));
  for(let q=0;;q=(q+1)%QUERIES.length){
    const s=QUERIES[q];
    for(let i=1;i<=s.length;i++){ typed.innerHTML=hl(s.slice(0,i)); await wait(28+Math.random()*40); }
    await wait(2600);
    for(let i=s.length;i>=0;i-=3){ typed.innerHTML=hl(s.slice(0,i)); await wait(12); }
    await wait(300);
  }
})();

const MOBILE = matchMedia('(max-width:900px)').matches;
const canvas=document.getElementById('gl');
const renderer=new THREE.WebGLRenderer({canvas,antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio, MOBILE?1.5:2));
renderer.setClearColor(0x060a12,1);
const scene=new THREE.Scene();
scene.fog=new THREE.Fog(0x060a12, 14, 34);
const camera=new THREE.PerspectiveCamera(45,1,.1,100);
camera.position.set(0,1.2,15);

const composer=new EffectComposer(renderer);
composer.addPass(new RenderPass(scene,camera));
const bloom=new UnrealBloomPass(new THREE.Vector2(1,1),.9,.6,.15);
composer.addPass(bloom);
composer.addPass(new OutputPass());

const C={ src:new THREE.Color('#38bdf8'), tx:new THREE.Color('#a78bfa'), db:new THREE.Color('#34d399'), out:new THREE.Color('#fbbf24') };
const world=new THREE.Group(); scene.add(world);

function label(text,color,size=.42){
  const fs=64,c=document.createElement('canvas'),x=c.getContext('2d');
  x.font=`500 ${fs}px "IBM Plex Mono", monospace`; const w=x.measureText(text).width+40;
  c.width=w; c.height=fs+30; x.font=`500 ${fs}px "IBM Plex Mono", monospace`; x.textBaseline='middle';
  x.fillStyle=color; x.fillText(text,20,c.height/2);
  const t=new THREE.CanvasTexture(c); t.colorSpace=THREE.SRGBColorSpace;
  const s=new THREE.Sprite(new THREE.SpriteMaterial({map:t,transparent:true,depthWrite:false,opacity:.85}));
  s.scale.set(size*w/c.height,size,1); return s;
}
const glowLine=(geo,color,op=.9)=>new THREE.LineSegments(new THREE.EdgesGeometry(geo),new THREE.LineBasicMaterial({color,transparent:true,opacity:op}));

const SRC=[['equipment sensors',2.6],['SCADA',.9],['IoT devices',-.9],['REST / GraphQL',-2.6]].map(([name,y])=>{
  const g=new THREE.Group(); g.position.set(-6,y,0);
  g.add(new THREE.Mesh(new THREE.BoxGeometry(.7,.7,.7),new THREE.MeshBasicMaterial({color:0x0a1a2a})));
  g.add(glowLine(new THREE.BoxGeometry(.7,.7,.7),C.src));
  const l=label(name,'#7dd3fc'); l.position.set(-1.4,0,0); g.add(l);
  world.add(g); return g;
});

const etl=new THREE.Group(); etl.position.set(-.6,0,0); world.add(etl);
const etlOuter=glowLine(new THREE.IcosahedronGeometry(1.3,1),C.tx,.8); etl.add(etlOuter);
const etlInner=new THREE.Mesh(new THREE.IcosahedronGeometry(.6,0),new THREE.MeshBasicMaterial({color:C.tx,wireframe:true}));
etl.add(etlInner);
const etlCore=new THREE.Mesh(new THREE.SphereGeometry(.22,24,24),new THREE.MeshBasicMaterial({color:0xe9ddff})); etl.add(etlCore);
const etlL=label('Databricks / ETL','#c4b5fd'); etlL.position.set(0,-1.9,0); etl.add(etlL);

const db=new THREE.Group(); db.position.set(4,0,0); world.add(db);
const disks=[];
for(let i=0;i<4;i++){
  const d=new THREE.Group(); d.position.y=(i-1.5)*.62;
  const geo=new THREE.CylinderGeometry(1,1,.42,48,1);
  d.add(new THREE.Mesh(geo,new THREE.MeshBasicMaterial({color:0x061a14,transparent:true,opacity:.85})));
  const ring=(y)=>{ const r=new THREE.Mesh(new THREE.TorusGeometry(1,.012,6,96),new THREE.MeshBasicMaterial({color:C.db})); r.rotation.x=Math.PI/2; r.position.y=y; return r; };
  d.add(ring(.21),ring(-.21)); db.add(d); disks.push(d);
}
const dbL=label('PostgreSQL / SQL','#6ee7b7'); dbL.position.set(0,-1.85,0); db.add(dbL);

const OUT=[['GraphQL API',1.5],['Power BI · Tableau',-1.5]].map(([name,y])=>{
  const g=new THREE.Group(); g.position.set(7.6,y,0);
  const geo=new THREE.PlaneGeometry(1.2,.8);
  g.add(new THREE.Mesh(geo,new THREE.MeshBasicMaterial({color:0x1a1406,side:THREE.DoubleSide,transparent:true,opacity:.9})));
  g.add(glowLine(geo,C.out));
  for(let b=0;b<4;b++){ const h=.12+Math.random()*.45;
    const bar=new THREE.Mesh(new THREE.PlaneGeometry(.14,h),new THREE.MeshBasicMaterial({color:C.out}));
    bar.position.set(-.36+b*.24,-.3+h/2,.01); bar.userData.h=h; g.add(bar); }
  const l=label(name,'#fcd34d'); l.position.set(0,-.75,0); g.add(l);
  world.add(g); return g;
});

const paths=[];
const mk=(a,b,ca,cb,n,speed,bend=0)=>{
  const mid=a.clone().lerp(b,.5); mid.z+=bend; mid.y+= (b.y-a.y)*.1;
  const curve=new THREE.CatmullRomCurve3([a,mid,b]);
  world.add(new THREE.Mesh(new THREE.TubeGeometry(curve,48,.012,6,false),
    new THREE.MeshBasicMaterial({color:ca.clone().lerp(cb,.5),transparent:true,opacity:.22})));
  paths.push({curve,ca,cb,n,speed});
};
SRC.forEach((s,i)=>mk(s.position.clone().add(new THREE.Vector3(.4,0,0)),etl.position.clone(),C.src,C.tx,70,.16+i*.02,(i-1.5)*.6));
mk(etl.position.clone(),db.position.clone().add(new THREE.Vector3(-1,0,0)),C.tx,C.db,160,.22,.4);
OUT.forEach((o,i)=>mk(db.position.clone().add(new THREE.Vector3(1,0,0)),o.position.clone().add(new THREE.Vector3(-.6,0,0)),C.db,C.out,60,.2,i?-.5:.5));

const total=paths.reduce((a,p)=>a+p.n,0);
const pPos=new Float32Array(total*3), pCol=new Float32Array(total*3), pSize=new Float32Array(total);
const meta=[];
paths.forEach((p,pi)=>{ for(let k=0;k<p.n;k++) meta.push({pi,off:Math.random(),jit:new THREE.Vector3((Math.random()-.5)*.12,(Math.random()-.5)*.12,(Math.random()-.5)*.12),sp:.8+Math.random()*.5}); });
meta.forEach((m,i)=>pSize[i]=.6+Math.random()*1.4);
const pGeo=new THREE.BufferGeometry();
pGeo.setAttribute('position',new THREE.BufferAttribute(pPos,3));
pGeo.setAttribute('color',new THREE.BufferAttribute(pCol,3));
pGeo.setAttribute('aSize',new THREE.BufferAttribute(pSize,1));
const packets=new THREE.Points(pGeo,new THREE.ShaderMaterial({
  transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,vertexColors:true,
  uniforms:{uPR:{value:renderer.getPixelRatio()}},
  vertexShader:`attribute float aSize; uniform float uPR; varying vec3 vC;
    void main(){ vC=color; vec4 mv=modelViewMatrix*vec4(position,1.); gl_PointSize=aSize*uPR*(60./-mv.z); gl_Position=projectionMatrix*mv; }`,
  fragmentShader:`varying vec3 vC; void main(){ float d=length(gl_PointCoord-.5); float a=smoothstep(.5,0.,d); gl_FragColor=vec4(vC*1.6,a); }`,
}));
world.add(packets);

const grid=new THREE.GridHelper(60,60,0x1e3a5f,0x0f1d30); grid.position.y=-4.2; grid.material.transparent=true; grid.material.opacity=.5; scene.add(grid);
const DN=900, dp=new Float32Array(DN*3);
for(let i=0;i<DN;i++){ dp[i*3]=(Math.random()-.5)*50; dp[i*3+1]=(Math.random()-.5)*30; dp[i*3+2]=-Math.random()*30; }
const dg=new THREE.BufferGeometry(); dg.setAttribute('position',new THREE.BufferAttribute(dp,3));
scene.add(new THREE.Points(dg,new THREE.PointsMaterial({size:.05,color:0x5b7aa8,transparent:true,opacity:.6})));

const mouse={x:0,y:0,sx:0,sy:0};
addEventListener('pointermove',e=>{ mouse.x=e.clientX/innerWidth-.5; mouse.y=e.clientY/innerHeight-.5; });
function resize(){
  const w=innerWidth,h=innerHeight; renderer.setSize(w,h,false); composer.setSize(w,h); bloom.setSize(w,h);
  camera.aspect=w/h; camera.updateProjectionMatrix();
  const mob=w<900;
  world.scale.setScalar(mob? Math.min(w/h*1.05,.62) : Math.min(w/h*.62,1));
  world.userData.baseX = mob? -0.4 : 3.2;
  world.userData.baseY = mob? 3.2 : 0.2;
}
addEventListener('resize',resize); resize();

const tmp=new THREE.Vector3(), col=new THREE.Color(), clock=new THREE.Clock();
(function loop(){
  const t=clock.getElapsedTime(), sy=scrollY/innerHeight;
  mouse.sx+=(mouse.x-mouse.sx)*.05; mouse.sy+=(mouse.y-mouse.sy)*.05;

  const hero=Math.min(sy,1.5);
  world.position.set(world.userData.baseX - hero*3.2, world.userData.baseY + hero*1.5, -hero*4);
  world.rotation.y = -.28 + mouse.sx*.5 + hero*.5;
  world.rotation.x = .12 + mouse.sy*.25;
  camera.position.y = 1.2 - sy*.6;
  grid.position.z = (t*1.5)%1;

  meta.forEach((m,i)=>{
    const p=paths[m.pi]; const u=(m.off + t*p.speed*m.sp)%1;
    p.curve.getPointAt(u,tmp).add(m.jit);
    pPos[i*3]=tmp.x; pPos[i*3+1]=tmp.y; pPos[i*3+2]=tmp.z;
    col.copy(p.ca).lerp(p.cb,u); pCol[i*3]=col.r; pCol[i*3+1]=col.g; pCol[i*3+2]=col.b;
  });
  pGeo.attributes.position.needsUpdate=true; pGeo.attributes.color.needsUpdate=true;

  etlOuter.rotation.set(t*.25,t*.35,0); etlInner.rotation.set(-t*.6,t*.4,0);
  etlCore.scale.setScalar(1+Math.sin(t*4)*.15);
  disks.forEach((d,i)=>{ d.rotation.y=t*.3*(i%2?1:-1); d.children[1].material.color.copy(C.db).multiplyScalar(.6+.6*Math.max(0,Math.sin(t*3-i*.9))); d.children[2].material.color.copy(d.children[1].material.color); });
  SRC.forEach((s,i)=>{ for(let k=0;k<2;k++){ s.children[k].rotation.y=t*.6+i; s.children[k].rotation.x=t*.4; } });
  OUT.forEach(o=>o.children.forEach(ch=>{ if(ch.userData.h){ const k=.6+.4*Math.sin(t*2+ch.position.x*8); ch.scale.y=k; ch.position.y=-.3+ch.userData.h*k/2; } }));

  composer.render(); requestAnimationFrame(loop);
})();
