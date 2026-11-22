/* RAMSA – static, bilingual, interactive concept demonstration. No backend, real user data, or AI service. */
const ASSET='./assets/';
const readStorage=(key,fallback)=>{try{const v=localStorage.getItem(key);return v===null?fallback:JSON.parse(v)}catch{return fallback}};
const state={lang:readStorage('ramsa-language','ar'),route:'home',sub:'overview',practice:'khoos',metrics:{scarcity:80,learners:85,continuity:64,documentation:72,support:68},collected:[],vrStage:0,weaveCount:0,selectedTool:'',modal:null,menu:false,tour:false,tourIndex:0,form:null,approved:false,contribution:false,workshop:false,profile:null,region:'ajman',youthProgress:readStorage('ramsa-youth-progress',0),activeGallery:'all',lastLearn:'khoos'};
const s=(ar,en)=>state.lang==='ar'?ar:en;
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const content={
 practices:[
  {id:'pearl',ar:'الغوص على اللؤلؤ',en:'Pearl diving',typeAr:'التراث البحري',typeEn:'Maritime heritage',img:'future-visions/vision-5.webp',risk:77,detailAr:'معارف الغوص التقليدي وأدواته وحياة البحر وتاريخه الاقتصادي.',detailEn:'Traditional pearling knowledge, tools, maritime life and historical economic context.'},
  {id:'khoos',ar:'سفّ الخوص',en:'Palm-frond weaving',typeAr:'حرفة تقليدية',typeEn:'Traditional craft',img:'slides/image24.jpeg',risk:73,detailAr:'حرفة تعتمد على سعف النخيل وعمليات تجهيز الخوص ونسجه يدوياً.',detailEn:'A palm-frond craft involving preparing and hand-weaving strips from palm leaves.'},
  {id:'sadu',ar:'حياكة السدو',en:'Al Sadu weaving',typeAr:'حرفة نسيج',typeEn:'Textile craft',img:'slides/image9.png',risk:65,detailAr:'حياكة نسيج تقليدي تختلف في أدواتها وتقنياتها عن سفّ الخوص.',detailEn:'A traditional textile practice with tools and techniques distinct from palm-frond weaving.'},
  {id:'boats',ar:'صناعة السفن الخشبية',en:'Traditional wooden boat building',typeAr:'تراث بحري',typeEn:'Maritime craft',img:'slides/image5.jpeg',risk:46,detailAr:'معارف تصميم وبناء السفن والأدوات المرتبطة بالتراث البحري.',detailEn:'Knowledge of wooden vessel construction and tools associated with maritime heritage.'}
 ],
 roles:[
  {id:'government',emoji:'▦',ar:'الجهات المختصة',en:'Government & heritage authorities',descAr:'اعرف أي الممارسات تحتاج إلى دعم، ولماذا، وما التدخل المناسب.',descEn:'Assess which traditions may need support, why, and what action could help.'},
  {id:'tourist',emoji:'◉',ar:'الزوار والسياح',en:'Visitors & tourists',descAr:'اكتشف التراث، وعِش رحلة الغوص أو سفّ الخوص، ثم شارك على أرض الواقع.',descEn:'Explore heritage, try pearl diving or weaving, then connect to real experiences.'},
  {id:'youth',emoji:'✦',ar:'الشباب والمتعلّمون',en:'Youth & learners',descAr:'اكتشف حرفة، جرّبها، وتعرّف إلى مسار التدريب والتلمذة.',descEn:'Discover a skill, try an activity, and explore workshop and mentorship pathways.'},
  {id:'artisan',emoji:'❖',ar:'الحرفيون والممارسون',en:'Artisans & practitioners',descAr:'ساهم في توثيق المعرفة، وراجع محتواها، واقترح ورشة لتعليمها.',descEn:'Contribute knowledge, review how it is represented, and propose a workshop.'}
 ],
 sourceLinks:[
  ['Ajman Vision 2030','https://ajman2030.ae/vision/'],
  ['UAE Tourism Strategy 2031','https://u.ae/en/about-the-uae/strategies-initiatives-and-awards/strategies-plans-and-visions/tourism/uae-tourism-strategy-2031'],
  ['Ajman Open Data','https://data.ajman.ae/'],
  ['Ajman Statistics Centre','https://scc.ajman.ae/'],
  ['Ajman tourism data','https://ajmantourism.ae/opendata/data-sets'],
  ['Ajman Memory — WAM','https://www.wam.ae/en/article/c3c1pbs-ammar-bin-humaid-launches-ajman-memory-project'],
  ['Artisans Majlis — WAM','https://www.wam.ae/en/article/c14v1ve-ajman-tourism-launches-artisans-majlis-support'],
  ['UNESCO ethics — Intangible cultural heritage','https://ich.unesco.org/en/ethics-and-ich-00866']
 ]
};
const practice=id=>content.practices.find(p=>p.id===id)||content.practices[1];
const pt=p=>s(p.ar,p.en);
const ahref=(route,title,cls='btn btn-primary')=>`<a class="${cls}" href="#/${route}">${title}</a>`;
const btn=(action,label,cls='btn btn-primary',attrs='')=>`<button class="${cls}" data-action="${action}" ${attrs}>${label}</button>`;
const placeholder=()=>`<span class="badge warning">${s('عرض افتراضي — بيانات توضيحية','Illustrative demo data')}</span>`;
const photo=(name)=>`${ASSET}${name}`;

export {ASSET,readStorage,state,s,esc,content,practice,pt,ahref,btn,placeholder,photo};
