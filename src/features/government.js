import {state, s, content, practice, pt, btn, placeholder, photo, ahref} from '../shared.js';
import {pageHero, flow} from '../components/ui.js';

function govSidebar() {
  const tabs = [
    ['overview', s('نظرة عامة', 'Overview')],
    ['inventory', s('الجرد', 'Inventory')],
    ['assessment', s('التقييم', 'Assessment')],
    ['interventions', s('التدخلات', 'Interventions')],
    ['review', s('موجز المراجعة', 'Decision brief')],
    ['documentation', s('مراجعة المعرفة', 'Knowledge review')],
    ['impact', s('قياس الأثر', 'Impact')],
  ];
  return `
    <nav class="sidebar" aria-label="${s('أقسام لوحة التراث', 'Heritage dashboard sections')}">
      ${tabs.map(([id, title]) => `
        <a class="side-link ${state.sub === id ? 'active' : ''}" href="#/government/${id}" ${state.sub === id ? 'aria-current="page"' : ''}>${title}</a>`).join('')}
    </nav>`;
}

function government() {
  const hero = pageHero(
    s('مسار الجهات المختصة', 'Government journey'),
    s('لوحة قرارات التراث', 'Heritage decision dashboard'),
    s('قيّم احتياجات الممارسات التراثية، وراجع التدخلات والمعرفة الموثقة، وحدّد كيف ستقيس أثرها.', 'Assess heritage needs, review proposed actions and documented knowledge, and decide how to measure outcomes.'),
    placeholder(),
  );
  return `${hero}
    <section class="section tight">
      <div class="container">
        <div class="dashboard-shell">${govSidebar()}<div class="dashboard-main">${govPanel()}</div></div>
      </div>
    </section>`;
}

function govPanel() {
  switch (state.sub) {
    case 'inventory': return govInventory();
    case 'assessment': return govAssessment();
    case 'interventions': return govInterventions();
    case 'review': return govDecisionBrief();
    case 'documentation': return govDocumentation();
    case 'impact': return impact();
    default: return govOverview();
  }
}

function govOverview() {
  return `
    <div class="split">
      <div class="surface card">
        <h2 class="panel-title">${s('الجرد التراثي', 'Heritage inventory')}</h2>
        <p class="muted">${s('اختر ممارسة لتبدأ التقييم بقيمها الافتراضية.', 'Choose a practice to assess its illustrative starting values.')}</p>
        ${content.practices.map(item => `
          <button type="button" class="practice-row" data-action="choose-practice" data-id="${item.id}" style="width:100%;text-align:start">
            <img class="thumb" src="${photo(item.img)}" alt="">
            <span class="info"><b>${pt(item)}</b><small>${s(item.typeAr, item.typeEn)}</small></span>
          </button>`).join('')}
      </div>
      <div class="surface card">
        <h2 class="panel-title">${s('ما الذي سنقيسه؟', 'What would we measure?')}</h2>
        <ul>${impactMeasures.map(({label}) => `<li>${s(...label)}</li>`).join('')}</ul>
        ${ahref('government/impact', s('عرض مؤشرات الأثر', 'View impact measures'), 'btn btn-outline btn-small')}
      </div>
    </div>
    <div class="surface card" style="margin-top:20px">
      <h2 class="panel-title">${s('كيف ترتبط هذه الخطوات؟', 'How the steps connect')}</h2>
      ${flow()}
    </div>`;
}

function govInventory() {
  return `
    <div class="surface card">
      <h2 class="panel-title">${s('جرد الممارسات التراثية', 'Heritage practice inventory')}</h2>
      <p class="muted">${s('يستخدم العرض قيماً افتراضية لهذه الممارسات لأغراض التقييم التجريبي.', 'The demonstration uses hypothetical indicator values for these practices.')}</p>
      <div class="grid grid-2">
        ${content.practices.map(item => `
          <div class="surface card card-hover">
            <img class="practice-photo" src="${photo(item.img)}" alt="">
            <h3 style="margin-top:15px">${pt(item)}</h3>
            <p>${s(item.detailAr, item.detailEn)}</p>
            ${btn('choose-practice', s('استكشف التقييم', 'Explore assessment'), 'btn btn-primary', `data-id="${item.id}"`)}
          </div>`).join('')}
      </div>
    </div>`;
}

const indicators = [
  {
    key: 'scarcity', weight: 30,
    label: ['ندرة الممارسين', 'Practitioner scarcity'],
    action: ['دعم الممارسين النشطين', 'Support active practitioners'],
    evidence: ['تحقّق من عدد الممارسين النشطين وقدرتهم على مواصلة الممارسة.', 'Confirm the number of active practitioners and their capacity to continue.'],
    pilot: ['اتفق مع الممارسين على إتاحة الأدوات والمواد ومساحة مناسبة للممارسة.', 'Agree with practitioners on access to tools, materials and space for regular practice.'],
    measure: ['عدد الممارسين الذين واصلوا الممارسة بعد ثلاثة أشهر.', 'Practitioners still practising after three months.'],
  },
  {
    key: 'learners', weight: 27,
    label: ['قلّة المتعلّمين الشباب', 'Limited young learners'],
    action: ['إطلاق تدريب بإشراف الممارسين', 'Pilot practitioner-led apprenticeships'],
    evidence: ['اسأل الممارسين عن المتدرّبين الحاليين وعوائق الالتحاق أو الاستمرار.', 'Ask practitioners about current apprentices and barriers to joining or continuing.'],
    pilot: ['اتفق على جلسات عملية متكررة ومهارة محددة يقيّمها الممارس.', 'Agree on recurring hands-on sessions and a skill the practitioner can assess.'],
    measure: ['عدد المتعلّمين الذين أتقنوا المهارة وواصلوا التدريب بعد ثلاثة أشهر.', 'Learners who demonstrated the skill and continued practising at three months.'],
  },
  {
    key: 'continuity', weight: 18,
    label: ['ضعف انتظام الممارسة', 'Limited practice continuity'],
    action: ['إتاحة فرص منتظمة للممارسة', 'Create regular practice opportunities'],
    evidence: ['راجع مواعيد الممارسة خلال الموسم واسأل عن أسباب الانقطاع.', 'Review the practice calendar for the season and ask what interrupts it.'],
    pilot: ['جرّب مواعيد منتظمة تناسب الممارسين وتراعي مواسم الحرفة.', 'Pilot a recurring schedule that suits practitioners and respects the practice’s season.'],
    measure: ['نسبة الجلسات التي أُقيمت فعلياً من الجلسات المتفق عليها.', 'Share of agreed practice sessions actually held.'],
  },
  {
    key: 'documentation', weight: 13,
    label: ['فجوات التوثيق', 'Documentation gaps'],
    action: ['توثيق التقنيات ومراجعتها مع الممارسين', 'Record and verify techniques with practitioners'],
    evidence: ['حدّد الخطوات الناقصة وما يسمح أصحاب المعرفة بتوثيقه ومشاركته.', 'Identify missing steps and what knowledge holders permit recording and sharing.'],
    pilot: ['وثّق خطوة واحدة بالموافقة، ثم راجع الوصف والترجمة وحدود الإتاحة.', 'Record one approved step, then review the description, translation and access limits.'],
    measure: ['عدد السجلات التي اجتازت مراجعة الدقة والحقوق والإتاحة.', 'Records that pass accuracy, rights and access review.'],
  },
  {
    key: 'support', weight: 12,
    label: ['فجوات الدعم', 'Support gaps'],
    action: ['مراجعة عوائق الدعم مع الممارسين', 'Review support barriers with practitioners'],
    evidence: ['اسأل الممارسين عن العوائق وحدّد ما تغطيه البرامج القائمة.', 'Ask practitioners about barriers and map what existing programmes cover.'],
    pilot: ['اختر عائقاً موثقاً وجرّب دعماً محدوداً بالاتفاق مع الممارسين.', 'Choose one evidenced barrier and pilot a limited support measure with practitioners.'],
    measure: ['عدد الممارسين الذين تلقّوا دعماً ساعدهم على مواصلة الممارسة.', 'Practitioners who received support that helped them continue practising.'],
  },
];

function riskFactors() {
  return indicators.map(indicator => {
    const v = state.metrics[indicator.key];
    return {
      ...indicator,
      n: s(...indicator.label),
      rec: s(...indicator.action),
      v,
      contribution: v * indicator.weight,
    };
  }).sort((a, b) => b.contribution - a.contribution);
}

function points(contribution) {
  return (contribution / 100).toFixed(2);
}

const evidenceLevels = {
  unreviewed: {
    label: ['لم تُراجع الأدلة', 'Evidence unreviewed'],
    guidance: ['ابدأ بمراجعة المصادر والتواصل مع الممارسين قبل استخدام النتيجة.', 'Review the sources and consult practitioners before using the score.'],
  },
  preliminary: {
    label: ['أدلة أولية', 'Preliminary evidence'],
    guidance: ['استكمل البيانات الناقصة وقارنها بروايات الممارسين قبل اختيار تدخل.', 'Fill evidence gaps and cross-check practitioner accounts before selecting an intervention.'],
  },
  corroborated: {
    label: ['أدلة متقاطعة في المحاكاة', 'Corroborated in the simulation'],
    guidance: ['اعرض الأدلة والافتراضات على الممارسين والمختصين قبل اتخاذ أي قرار فعلي.', 'Bring the evidence and assumptions to practitioners and specialists before making any real decision.'],
  },
};
const evidenceByPractice = new Map();

function evidenceSelect(id) {
  const selected = evidenceByPractice.get(id) ?? 'unreviewed';
  return `
    <div class="form-line">
      <label for="government-evidence">${s('حالة الأدلة التجريبية', 'Demo evidence status')}</label>
      <select id="government-evidence" aria-describedby="government-evidence-guidance">
        ${Object.entries(evidenceLevels).map(([key, item]) => `
          <option value="${key}" ${key === selected ? 'selected' : ''}>${s(...item.label)}</option>`).join('')}
      </select>
      <p id="government-evidence-guidance" class="tiny-note" aria-live="polite">${s(...evidenceLevels[selected].guidance)}</p>
      <p class="tiny-note">${s('حالة الأدلة ترشد المراجعة البشرية؛ وتبقى النتيجة الحسابية كما هي.', 'Evidence status guides human review. The numerical score stays the same.')}</p>
    </div>`;
}

if (typeof document !== 'undefined') {
  document.addEventListener('change', event => {
    const {id, value} = event.target;
    if (id === 'government-evidence') {
      evidenceByPractice.set(state.practice, value);
      document.getElementById('government-evidence-guidance').textContent = s(...evidenceLevels[value].guidance);
    }
    if (event.target.dataset.metric && document.activeElement === event.target) {
      // The shared change handler redraws the dashboard. Return focus to the same slider.
      queueMicrotask(() => document.getElementById(id)?.focus({preventScroll: true}));
    }
  });
}

function assessmentSummary() {
  const factors = riskFactors();
  const total = factors.reduce((sum, factor) => sum + factor.contribution, 0);
  const score = Math.round(total / 100);
  const [, badge, priority] = [
    [70, 'red', s('أولوية مراجعة مرتفعة', 'Higher review priority')],
    [40, 'warning', s('أولوية مراجعة متوسطة', 'Moderate review priority')],
    [0, 'good', s('أولوية مراجعة منخفضة', 'Lower review priority')],
  ].find(([min]) => score >= min);
  return {factors, total, score, badge, priority};
}

function govAssessment() {
  const selected = practice(state.practice);
  const {factors, total, score, badge, priority} = assessmentSummary();
  return `
    <div class="surface card">
      <h2 class="panel-title">${s('تقييم قابل للتفسير', 'Explainable assessment')}</h2>
      <div class="tabs" role="group" aria-label="${s('اختر ممارسة تراثية', 'Choose a heritage practice')}">
        ${content.practices.map(item => {
          const active = item.id === selected.id;
          return btn('choose-practice', pt(item), `tab ${active ? 'active' : ''}`, `data-id="${item.id}" aria-pressed="${active}"`);
        }).join('')}
      </div>
      <p class="muted">${s(selected.detailAr, selected.detailEn)}</p>
      <div class="split">
        <div class="surface card">
          <h3 class="panel-title">${s('أولوية المراجعة التجريبية', 'Illustrative review priority')}</h3>
          <div class="score-disc" style="--percent:${score}" aria-label="${s(`النتيجة ${score} من 100`, `Score ${score} out of 100`)}"><strong>${score}</strong></div>
          <p class="text-center"><span class="badge ${badge}">${priority}</span></p>
          <p class="tiny-note">${s('نضرب كل مؤشر في وزنه، ثم نجمع النقاط ونقرّب الناتج. حدود الأولوية: 0–39 منخفضة، 40–69 متوسطة، 70–100 مرتفعة.', 'Multiply each indicator by its weight, then add and round the points. Priority bands are 0–39 lower, 40–69 moderate, and 70–100 higher.')}</p>
          <hr class="hairline">
          <h3>${s('العوامل حسب مساهمتها في النتيجة', 'Factors ranked by contribution')}</h3>
          ${factors.map(factor => `
            <div class="chart-row-head" style="margin-top:13px">
              <span>${factor.n}</span><strong>${points(factor.contribution)} ${s('نقطة', 'pts')}</strong>
            </div>
            <div class="tiny-note"><bdi dir="ltr">${factor.v}/100 × ${factor.weight}%</bdi></div>`).join('')}
          <p><strong>${s('المجموع قبل التقريب', 'Unrounded total')} <bdi>${points(total)}/100</bdi></strong></p>
        </div>
        <div class="surface card">
          <h3 class="panel-title">${s('عدّل المؤشرات', 'Adjust the indicators')}</h3>
          <p class="tiny-note">${s('0 يعني عدم وجود فجوة؛ و100 يعني فجوة كبيرة. غيّر القيم لاختبار سيناريو افتراضي.', '0 means no gap and 100 means a significant gap. Change the values to test a hypothetical scenario.')}</p>
          ${indicators.map(({key, label, weight}) => `
            <div class="form-line">
              <div class="range-head">
                <label for="metric-${key}">${s(...label)} (${weight}%)</label>
                <b id="value-${key}">${state.metrics[key]}</b>
              </div>
              <input id="metric-${key}" type="range" min="0" max="100" step="1" value="${state.metrics[key]}" data-metric="${key}">
            </div>`).join('')}
          ${evidenceSelect(selected.id)}
          ${ahref('government/interventions', s('راجع التدخلات المقترحة', 'Review suggested interventions'))}
        </div>
      </div>
    </div>`;
}

function govInterventions() {
  const factors = riskFactors().filter(factor => factor.contribution > 0);
  return `
    <div class="surface card">
      <h2 class="panel-title">${s('تدخلات مقترحة لصون التراث', 'Suggested safeguarding interventions')}</h2>
      <p><strong>${pt(practice(state.practice))}</strong></p>
      <p class="muted">${s('ترتّب المحاكاة التدخلات حسب مساهمة الفجوات في النتيجة. يختار الممارسون والمختصون الإجراء بعد مراجعة الأدلة.', 'The simulation ranks actions by how much each gap contributes to the score. Practitioners and specialists choose an action after reviewing the evidence.')}</p>
      ${factors.length ? `
        <div class="grid grid-2">
          ${factors.map((factor, index) => `
            <div class="recommendation">
              <div class="badge ${index < 2 ? 'warning' : ''}">${factor.n} · ${points(factor.contribution)} ${s('نقطة', 'pts')}</div>
              <h3 style="margin:12px 0 6px">${factor.rec}</h3>
              <details>
                <summary>${s('عرض خطة العمل التجريبية', 'View the illustrative action plan')}</summary>
                <dl>
                  <dt><strong>${s('تحقّق من الأدلة', 'Check the evidence')}</strong></dt>
                  <dd>${s(...factor.evidence)}</dd>
                  <dt><strong>${s('جرّب تدخلاً محدوداً', 'Run a pilot')}</strong></dt>
                  <dd>${s(...factor.pilot)}</dd>
                  <dt><strong>${s('تابع النتيجة', 'Track the outcome')}</strong></dt>
                  <dd>${s(...factor.measure)}</dd>
                </dl>
              </details>
            </div>`).join('')}
        </div>` : `
        <p>${s('جميع الفجوات في هذا السيناريو تساوي صفراً. تحقّق من الأدلة مع الممارسين عند المراجعة الدورية.', 'All gaps in this scenario are zero. Confirm the evidence with practitioners during routine review.')}</p>`}
      ${ahref('government/review', s('افتح موجز المراجعة', 'Open decision brief'), 'btn btn-primary')}
    </div>`;
}

function govDecisionBrief() {
  const selected = practice(state.practice);
  const {factors, score, badge, priority} = assessmentSummary();
  const evidence = evidenceLevels[evidenceByPractice.get(selected.id) ?? 'unreviewed'];
  const drivers = factors.filter(factor => factor.contribution > 0).slice(0, 2);
  const lead = drivers[0];
  return `
    <div class="surface card">
      <h2 class="panel-title">${s('موجز قرار صون التراث', 'Safeguarding decision brief')}</h2>
      <h3>${pt(selected)}</h3>
      <p class="muted">${s('يلخّص هذا الموجز السيناريو الحالي للمراجعة مع الممارسين والمختصين. جميع القيم افتراضية.', 'Use this summary of the current scenario to discuss next steps with practitioners and specialists. All values are hypothetical.')}</p>
      <div class="split">
        <div class="surface card">
          <h3>${s('مبررات الأولوية', 'Why this priority')}</h3>
          <p><span class="badge ${badge}">${priority}</span> <strong><bdi>${score}/100</bdi></strong></p>
          ${drivers.length ? `
            <ul>${drivers.map(factor => `<li>${factor.n} · <bdi>${points(factor.contribution)}</bdi> ${s('نقطة', 'pts')}</li>`).join('')}</ul>` : `
            <p>${s('لم تُسجّل فجوات في هذا السيناريو.', 'No gaps were entered for this scenario.')}</p>`}
          ${ahref('government/assessment', s('عدّل المؤشرات', 'Edit assessment'), 'btn btn-outline btn-small')}
        </div>
        <div class="surface card">
          <h3>${s('ما الذي يحتاج إلى مراجعة؟', 'What needs review?')}</h3>
          <p><strong>${s(...evidence.label)}</strong></p>
          <p>${s(...evidence.guidance)}</p>
          <p>${lead ? s(...lead.evidence) : s('راجع المؤشرات دورياً مع الممارسين وحدّد موعد المتابعة.', 'Review the indicators with practitioners and agree on a follow-up date.')}</p>
        </div>
      </div>
      ${lead ? `
        <div class="surface card" style="margin-top:18px">
          <h3>${s('تدخل مقترح للمناقشة', 'Pilot to discuss')} · ${lead.rec}</h3>
          <p>${s(...lead.pilot)}</p>
          <p><strong>${s('ما الذي سنقيسه؟', 'What would we track?')}</strong> ${s(...lead.measure)}</p>
        </div>` : ''}
      <div class="vr-controls" style="margin-top:18px">
        ${ahref('government/documentation', s('افتح سجل المراجعة التوضيحي', 'Open sample review record'), 'btn btn-outline')}
        ${ahref('government/impact', s('عرض مؤشرات الأثر', 'View impact measures'), 'btn btn-outline')}
      </div>
    </div>`;
}

function govDocumentation() {
  const status = state.approved
    ? s('اجتاز المراجعة في المحاكاة', 'Review passed in simulation')
    : s('بانتظار مراجعة تجريبية', 'Awaiting simulated review');
  const criteria = [
    s('الموافقة والاستخدام: يؤكد صاحب المعرفة المادة المسموح بتسجيلها والجمهور المسموح له بالاطلاع.', 'Consent and use: the knowledge holder confirms what may be recorded and who may access it.'),
    s('الدقة الثقافية: يراجع ممارس الوصف ويقارن المختص الترجمة بالأصل.', 'Cultural accuracy: a practitioner checks the description and a specialist checks the translation against the original.'),
    s('النسب والإتاحة: تُحترم رغبة صاحب المعرفة في طريقة النسب وتبقى الأجزاء المقيّدة خارج المادة العامة.', 'Attribution and access: respect the knowledge holder’s attribution preferences and keep restricted details out of public material.'),
  ];
  return `
    <div class="surface card">
      <h2 class="panel-title">${s('مراجعة المعرفة قبل استخدامها في التعلّم', 'Review knowledge before educational use')}</h2>
      <div class="grid grid-2">
        <div class="surface card">
          <span class="badge">${s('سجل خيالي · KH-01', 'Fictional record · KH-01')}</span>
          <h3 style="margin-top:14px">${s('سفّ الخوص: تجهيز الشرائط', 'Palm-frond weaving: preparing the strips')}</h3>
          <blockquote style="border-inline-start:3px solid var(--gold);padding-inline-start:15px">
            ${s('نجهّز شرائط الخوص بعناية، ثم نتدرّب على ترتيبها ونسجها خطوة بخطوة.', 'We prepare the palm strips carefully, then practise arranging and weaving them step by step.')}
          </blockquote>
          <p class="tiny-note">${s('صياغة خيالية أُعدّت للعرض. الاستخدام المقترح: مقدمة تعليمية عامة بعد المراجعة والموافقة.', 'Fictional wording written for the demo. Proposed use is a public learning introduction after review and consent.')}</p>
        </div>
        <div class="surface card">
          <h3>${s('ما الذي يراجعه المختص؟', 'What does a reviewer check?')}</h3>
          <ul>${criteria.map(item => `<li>${item}</li>`).join('')}</ul>
          <p role="status"><span class="badge ${state.approved ? 'good' : 'warning'}">${status}</span></p>
          ${btn('approve', state.approved ? s('أعد حالة المراجعة', 'Reset simulated review') : s('حاكِ اجتياز المراجعة', 'Simulate passing review'), 'btn btn-primary')}
          <p class="tiny-note">${s('هذا الزر يغيّر حالة العرض فقط؛ الموافقة الفعلية يقررها أصحاب المعرفة والمختصون.', 'This action updates the demo status. Real consent and approval come from knowledge holders and specialists.')}</p>
          ${ahref('government/impact', s('تابع إلى قياس الأثر', 'Continue to impact measures'), 'btn btn-outline')}
        </div>
      </div>
    </div>`;
}

const impactMeasures = [
  {
    label: ['استمرارية التراث الحي', 'Living heritage continuity'],
    count: 6, total: 15, color: 'green',
    measure: ['المتدرّبون الذين واصلوا الممارسة بعد ثلاثة أشهر من أصل من بدأوا التدريب.', 'Apprentices still practising at three months out of those who began training.'],
    evidence: ['متابعة الممارسين مع المتدرّبين.', 'Practitioner follow-up with apprentices.'],
  },
  {
    label: ['جودة التوثيق', 'Documentation quality'],
    count: 8, total: 12, color: 'gold',
    measure: ['السجلات التي اجتازت مراجعة الدقة والحقوق والإتاحة من أصل السجلات المراجَعة.', 'Records that passed accuracy, rights and access checks out of those reviewed.'],
    evidence: ['سجل مراجعة المواد.', 'Record review log.'],
  },
  {
    label: ['مشاركة الشباب', 'Youth participation'],
    count: 9, total: 24,
    measure: ['المسجّلون الشباب الذين حضروا جلسة عملية واحدة على الأقل من أصل المسجّلين.', 'Young people who attended at least one hands-on session out of those registered.'],
    evidence: ['سجل حضور الجلسات.', 'Session attendance register.'],
  },
  {
    label: ['تفاعل الزوار', 'Visitor engagement'],
    count: 59, total: 100,
    measure: ['الزوار الذين أكملوا المحاكاة الرقمية من أصل من بدأوها.', 'Visitors who completed the digital simulation out of those who started it.'],
    evidence: ['عدّاد البدء والإكمال في النموذج المقترح.', 'Start and completion counts in the proposed prototype.'],
  },
  {
    label: ['فرص الحرفيين', 'Artisan opportunities'],
    count: 3, total: 12,
    measure: ['الحرفيون الذين قدّموا ورشة مدفوعة من أصل المشاركين في البرنامج التجريبي.', 'Artisans who delivered a paid workshop out of those in the pilot programme.'],
    evidence: ['سجل تنفيذ الورش والمدفوعات في البرنامج المقترح.', 'Workshop delivery and payment records in the proposed pilot.'],
  },
  {
    label: ['كفاءة المراجعة الحكومية', 'Government review efficiency'],
    count: 8, total: 16,
    measure: ['حالات المراجعة التي أُغلقت خلال 30 يوماً من أصل الحالات المغلقة.', 'Review cases closed within 30 days out of all closed review cases.'],
    evidence: ['تواريخ فتح الحالات وإغلاقها.', 'Case opening and closure dates.'],
  },
];

function impact() {
  return `
    <div class="surface card">
      <h2 class="panel-title">${s('ستة مؤشرات لقياس الأثر', 'Six ways to measure impact')}</h2>
      <p class="muted">${s('تعرض البطاقات أعداداً افتراضية ومصادر أدلة مقترحة لبرنامج تجريبي.', 'Each card uses hypothetical counts and shows what evidence a pilot would gather.')}</p>
      <div class="grid grid-2">
        ${impactMeasures.map(({label, count, total, color, measure, evidence}) => {
          const percent = Math.round(count / total * 100);
          return `
            <div class="mini-kpi">
              <div class="chart-row-head"><strong>${s(...label)}</strong><bdi>${percent}%</bdi></div>
              <div class="bar ${color ?? ''}" aria-hidden="true"><span style="width:${percent}%"></span></div>
              <p><bdi>${count}/${total}</bdi> · ${s(...measure)}</p>
              <p class="tiny-note">${s(...evidence)}</p>
            </div>`;
        }).join('')}
      </div>
      <div class="surface card" style="margin-top:18px">
        <p>${s('قد يُكمل كثير من الزوار التجربة الرقمية. ولقياس استمرارية الحرفة نتابع من واصل الممارسة الفعلية بعد ثلاثة أشهر.', 'Many visitors might complete the digital experience. To measure living heritage continuity, follow up on who is still practising three months later.')}</p>
        ${ahref('youth', s('استكشف مسار التعلّم', 'Explore the learning pathway'), 'btn btn-outline')}
      </div>
    </div>`;
}

export {government, riskFactors};
