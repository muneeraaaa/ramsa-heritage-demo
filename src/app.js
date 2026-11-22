/* RAMSA demo frontend. Site modules split by agent ownership for parallel development. */
import {state,s,practice,pt,btn,photo} from './shared.js';
import {appHeader,footer} from './components/ui.js';
import {government,riskFactors} from './features/government.js';
import {tourist,pearl,weave} from './features/experiences.js';
import {youth,artisan} from './features/community.js';
import {home,mapPage,gallery,explore} from './pages/overview.js';
const tourSteps=[
 {route:'home',titleAr:'المشكلة والحل',titleEn:'The problem and solution',descAr:'نحتاج أكثر من الأرشفة: رصد الأولويات وربط المعرفة بالتعلم الحقيقي.',descEn:'Safeguarding takes more than archiving: assess needs and connect knowledge to living learning.'},
 {route:'government/assessment',titleAr:'الحكومة تشخّص',titleEn:'Government diagnoses',descAr:'غيّر المؤشرات وشاهد أولوية المراجعة والعوامل المرتبطة.',descEn:'Change illustrative inputs to see the assessment respond.'},
 {route:'government/review',titleAr:'من التقييم إلى اقتراح تدخل',titleEn:'From assessment to a proposed action',descAr:'راجع أسباب الأولوية والأدلة المطلوبة والتدخل المقترح وكيفية متابعة أثره.',descEn:'See what drives the priority, what evidence to check, and how to follow up on the proposed pilot.'},
 {route:'government/documentation',titleAr:'خبراء وممارسون يتحققون',titleEn:'Experts and practitioners verify',descAr:'شاهد كيف يُراجع نموذج المعرفة قبل استخدامه في التعليم.',descEn:'Review a fictional record and its demonstration approval workflow.'},
 {route:'pearl',titleAr:'الزائر يعيش التجربة',titleEn:'Tourist tries the simulation',descAr:'ابدأ الرحلة؛ اختر لغة المرشد، ثم اجمع المحار افتراضياً.',descEn:'Choose guide language, board the vessel, then collect simulated oysters.'},
 {route:'youth',titleAr:'التعلّم يستمر خارج VR',titleEn:'Learning continues beyond VR',descAr:'شاهد كيف تظهر ورشة مقترحة ومسار انتقال المهارة.',descEn:'Explore a proposed workshop and a learner pathway.'},
 {route:'artisan',titleAr:'الحرفي شريك أساسي',titleEn:'Practitioners remain central',descAr:'شاهد المساهمة والمراجعة والورشة والحقوق.',descEn:'Explore contributions, cultural review, workshop proposal and rights.'},
 {route:'government/impact',titleAr:'قياس الأثر والمواءمة',titleEn:'Measure outcomes and alignment',descAr:'لا نخلط بين المشاهدات وبين استمرار مهارة حقيقية؛ التفاصيل في صفحة عن رمسة.',descEn:'We keep digital engagement separate from living craft continuity; detailed evidence is in About.'}
];
function tourPanel(){if(!state.tour)return '';const step=tourSteps[state.tourIndex];return `<div class="tour-panel" role="region" aria-label="${s('الجولة الإرشادية','Guided tour')}"><div class="eyebrow">${s('جولة المحكّمين','Judging tour')} · ${state.tourIndex+1}/${tourSteps.length}</div><div class="progress"><span style="width:${(state.tourIndex+1)/tourSteps.length*100}%"></span></div><h3>${s(step.titleAr,step.titleEn)}</h3><p>${s(step.descAr,step.descEn)}</p><div class="tour-actions">${btn('tour-prev',s('السابق','Previous'),'btn btn-outline btn-small',state.tourIndex===0?'disabled':'')}${btn('tour-next',state.tourIndex===tourSteps.length-1?s('إنهاء','Finish'):s('التالي','Next'),'btn btn-primary btn-small')}${btn('tour-stop',s('خروج','Exit'),'btn btn-outline btn-small')}</div></div>`}
function userModal(){if(state.modal===null)return '';let inner='';if(state.modal.type==='image'){const i=state.modal.index;inner=`<img src="${photo(`future-visions/vision-${i}.webp`)}" alt="RAMSA concept ${i}"><div class="modal-caption">${s('تصور بصري افتراضي مولد عبر رؤى المستقبل. الأرقام والشخصيات والشعارات داخل الصورة ليست أدلة واقعية.','Future Visions concept illustration; in-image figures, people and logos are not evidence of real deployment.')}</div>`}
 if(state.modal.type==='form'){const k=state.modal.kind;const isArtisan=k==='contribute'||k==='workshop';inner=`<div style="padding:26px 20px"><h2 style="font-size:1.7rem">${k==='youth'?s('تسجيل اهتمام تجريبي','Demo learning interest'):k==='contribute'?s('إضافة معرفة تراثية','Sample knowledge contribution'):s('اقتراح ورشة تعليمية','Propose a learning workshop')}</h2><p class="muted">${s('لن تُرسل البيانات إلى خادم. لا تكتب معلومات شخصية حقيقية.','Nothing is sent to a server. Please do not enter real personal information.')}</p><form id="demo-form"><div class="form-line"><label>${k==='youth'?s('مسار التعلّم','Learning pathway'):k==='contribute'?s('نوع المادة','Type of content'):s('عنوان الورشة','Workshop title')}</label><input name="topic" maxlength="80" required placeholder="${k==='youth'?pt(practice(state.lastLearn)):k==='contribute'?s('وصف تقنية حرفية','Description of a craft technique'):s('ورشة سفّ الخوص — مثال','Palm weaving workshop — sample')}" /></div><div class="form-line"><label>${s('تفاصيل توضيحية','Demonstration details')}</label><textarea name="message" rows="3" required maxlength="350" placeholder="${s('اكتب وصفاً افتراضياً دون أسماء أو بيانات شخصية','Use a fictional description without personal data')}"></textarea></div><div class="vr-controls"><button type="submit" class="btn btn-primary">${s('حفظ محلياً في النموذج','Save in browser demo')}</button>${btn('close-modal',s('إلغاء','Cancel'),'btn btn-outline')}</div></form></div>`}
 if(state.modal.type==='intervention'){const f=riskFactors()[state.modal.index]||riskFactors()[0];inner=`<div style="padding:30px 25px"><span class="badge gold">${s('خطة تدخل تصورية','Illustrative action plan')}</span><h2 style="font-size:1.65rem;margin:15px 0">${f.rec}</h2><p>${s('سبب الاقتراح','Reason')}: ${f.n} (${f.v}/100)</p><hr class="hairline"><h3>${s('كيف ننفّذها؟','Suggested sequence')}</h3><p>${s('جمع بيانات أدق ومناقشة أصحاب المعرفة، تحديد الإجراء المناسب مع المختصين، اختيار جهة تنفيذ، وضع مؤشرات أثر، ثم مراجعة النتائج بعد التجربة.','Gather stronger evidence and consult practitioners; agree a suitable intervention; identify delivery partners; define outcome measures; review results after a pilot.')}</p><p class="tiny-note">${s('هذه ليست خطة معتمدة أو قرارًا حكوميًا.','Not an approved or governmental action plan.')}</p>${btn('close-modal',s('إغلاق','Close'),'btn btn-outline')}</div>`}
 return `<div class="modal-backdrop" id="modal-backdrop"><div class="modal-box" role="dialog" aria-modal="true"><button class="modal-close" aria-label="Close" data-action="close-modal">✕</button>${inner}</div></div>`}
function setLang(l){state.lang=l;try{localStorage.setItem('ramsa-language',JSON.stringify(l))}catch{}render()}
function navigate(route,scroll=true){const parts=route.replace(/^\/?/,'').split('/');state.route=parts[0]||'home';state.sub=parts[1]||'overview';state.menu=false;state.modal=null;render();if(scroll)window.scrollTo({top:0,behavior:'instant'});document.title=s('رمسة — من الإنذار إلى الإحياء','RAMSA — From Risk to Revival')}
function render(){document.documentElement.lang=state.lang;document.documentElement.dir=state.lang==='ar'?'rtl':'ltr';const page={home,tourist,pearl,weaving:weave,youth,artisan,government,map:mapPage,gallery,explore}[state.route]||home;document.getElementById('app').innerHTML=appHeader()+`<main id="main-content">${page()}</main>`+footer()+tourPanel()+userModal();}
function updateHash(route){window.location.hash='/'+route;if(window.location.hash==='#/'+route)navigate(route)}
function toast(message){const target=document.getElementById('toast');target.innerHTML=`<div class="notification">${message}</div>`;clearTimeout(toast.timer);toast.timer=setTimeout(()=>target.innerHTML='',3100)}
function speak(){const text=document.getElementById('guide-text')?.innerText;if(!text)return;if(!('speechSynthesis'in window)){toast(s('النطق غير متاح في هذا المتصفح','Speech is unavailable in this browser'));return}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=state.lang==='ar'?'ar-AE':'en-US';u.rate=.9;speechSynthesis.speak(u);toast(s('اللغة والنطق يعتمدان على الأصوات المثبتة في جهازك','Speech pronunciation depends on your device voices'))}
function act(el){const action=el.dataset.action;const id=el.dataset.id;const index=Number(el.dataset.index||0);
 switch(action){
  case'lang':setLang(state.lang==='ar'?'en':'ar');break;
  case'menu':state.menu=!state.menu;render();break;
  case'tour-start':state.tour=true;state.tourIndex=0;updateHash(tourSteps[0].route);break;
  case'tour-prev':state.tourIndex=Math.max(0,state.tourIndex-1);updateHash(tourSteps[state.tourIndex].route);break;
  case'tour-next':if(state.tourIndex===tourSteps.length-1){state.tour=false;updateHash('explore');toast(s('شكراً لاستكشاف رحلة رمسة!','Thanks for exploring RAMSA!'))}else{state.tourIndex++;updateHash(tourSteps[state.tourIndex].route)}break;
  case'tour-stop':state.tour=false;render();break;
  case'choose-practice':state.practice=id;state.metrics=id==='pearl'?{scarcity:70,learners:75,continuity:76,documentation:61,support:72}:id==='boats'?{scarcity:45,learners:58,continuity:49,documentation:53,support:37}:id==='sadu'?{scarcity:59,learners:71,continuity:64,documentation:54,support:51}:{scarcity:80,learners:85,continuity:64,documentation:72,support:68};if(state.sub!=='assessment')updateHash('government/assessment');else render();break;
  case'intervention':state.modal={type:'intervention',index};render();break;
  case'approve':state.approved=!state.approved;render();toast(s('تم تحديث حالة الموافقة داخل المحاكاة فقط','Demo approval status updated locally'));break;
  case'next-vr':if(state.vrStage===3&&state.collected.length<3)break;state.vrStage=Math.min(4,state.vrStage+1);render();break;
  case'prev-vr':state.vrStage=Math.max(0,state.vrStage-1);render();break;
  case'reset-pearl':state.vrStage=0;state.collected=[];render();break;
  case'set-ar':setLang('ar');state.vrStage=1;render();break;
  case'set-en':setLang('en');state.vrStage=1;render();break;
  case'tool':toast([s('الفطام كان يساعد على سد الأنف خلال الغوص.','Traditional nose clip for diving.'),s('الديين كيس شبكي لجمع المحار.','A netted oyster-collection bag.'),s('حجر يساعد على سرعة النزول؛ التفاصيل التاريخية تتطلب مراجعة الخبراء.','A descent weight; specialist historical review needed.')][index]);break;
  case'collect':if(!state.collected.includes(index)){state.collected.push(index);render();toast(state.collected.length===3?s('جمعت المحار كله!','All oysters collected!'):s('أحسنت! جمعت محارة.','An oyster collected!'))}break;
  case'weave-over':case'weave-under':if(state.weaveCount>=8)break;const desired=state.weaveCount%2===0?'weave-over':'weave-under';if(action===desired){state.weaveCount++;render();toast(state.weaveCount===8?s('أكملت النمط التفاعلي!','Pattern completed!'):s('أحسنت! تابع التسلسل.','Good! Continue the pattern.'))}else toast(s('جرّب الحركة الأخرى لتستمر في التسلسل.','Try the other motion to continue the alternating sequence.'));break;
  case'weave-reset':state.weaveCount=0;render();break;
  case'select-learn':state.lastLearn=id;state.youthProgress=Math.max(1,state.youthProgress);render();break;
  case'show-youth-form':state.modal={type:'form',kind:'youth'};render();break;
  case'artisan-contribute':state.modal={type:'form',kind:'contribute'};render();break;
  case'artisan-workshop':state.modal={type:'form',kind:'workshop'};render();break;
  case'region':state.region=id;render();break;
  case'gallery-filter':state.activeGallery=id;render();break;
  case'open-image':state.modal={type:'image',index};render();break;
  case'close-modal':state.modal=null;render();break;
  case'speak-guide':speak();break;
 }
}
document.addEventListener('click',e=>{const a=e.target.closest('[data-action]');if(a){if(a.disabled)return;e.preventDefault();act(a);return}const p=e.target.closest('[data-practice]');if(p){state.practice=p.dataset.practice;state.metrics={scarcity:80,learners:85,continuity:64,documentation:72,support:68}}if(e.target.id==='modal-backdrop'){state.modal=null;render()}});
document.addEventListener('input',e=>{const key=e.target.dataset.metric;if(!key)return;state.metrics[key]=Number(e.target.value);const out=document.getElementById('value-'+key);if(out)out.textContent=e.target.value; // refresh on change for computed score
});
document.addEventListener('change',e=>{if(e.target.matches('[data-metric]'))render()});
document.addEventListener('submit',e=>{if(e.target.id!=='demo-form')return;e.preventDefault();const d=new FormData(e.target);const topic=String(d.get('topic')||'').trim(),msg=String(d.get('message')||'').trim();if(!topic||!msg)return;const kind=state.modal?.kind;if(kind==='youth'){state.youthProgress=Math.max(state.youthProgress,3);try{localStorage.setItem('ramsa-youth-progress',JSON.stringify(state.youthProgress))}catch{}}if(kind==='contribute')state.contribution=true;if(kind==='workshop')state.workshop=true;state.modal=null;render();toast(s('تم حفظ حالة تجريبية داخل المتصفح فقط. لم يُرسل أي طلب.','Saved locally for demonstration only. No request was submitted.'))});
window.addEventListener('hashchange',()=>navigate(decodeURIComponent(location.hash.replace(/^#\/?/,''))||'home'));
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&state.modal){state.modal=null;render()}});
window.addEventListener('DOMContentLoaded',()=>navigate(decodeURIComponent(location.hash.replace(/^#\/?/,''))||'home',false));
