import type { CarBrand, CarModel } from '../data/car-brands';
import type { Language } from './i18n';

interface ModelSeoCopy {
  keyword: string;
  metaTitle: string;
  metaDescription: string;
  heroDescription: string;
  sectionTitle: string;
  paragraphs: string[];
}

function getIssue(issues: string[], index: number, fallback: string): string {
  return issues[index] ?? fallback;
}

function hashSeed(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function pickBySeed<T>(items: T[], seed: number, offset = 0): T {
  return items[(seed + offset) % items.length];
}

export function getModelSeoCopy(brand: CarBrand, model: CarModel, lang: Language): ModelSeoCopy {
  const seed = hashSeed(`${brand.slug}:${model.slug}`);

  if (lang === 'ar') {
    const keyword = pickBySeed(
      [
        `أعطال مكيف ${brand.nameAr} ${model.nameAr} في صيف الرياض`,
        `صيانة وإصلاح مكيف ${brand.nameAr} ${model.nameAr} بالرياض`,
        `ضعف تبريد مكيف ${brand.nameAr} ${model.nameAr} وقت الظهيرة`,
        `تشخيص دورة تكييف ${brand.nameAr} ${model.nameAr}`,
      ],
      seed
    );

    const metaTitle = pickBySeed(
      [
        `${brand.nameAr} ${model.nameAr}: صيانة وإصلاح مكيف السيارة بالرياض | اوتو سيف`,
        `فحص وتصليح مكيف ${brand.nameAr} ${model.nameAr} في الرياض | اوتو سيف`,
        `${brand.nameAr} ${model.nameAr} لا يبرد؟ تشخيص تكييف دقيق بالرياض | اوتو سيف`,
        `صيانة أعطال تكييف ${brand.nameAr} ${model.nameAr} في الرياض | اوتو سيف`,
      ],
      seed,
      1
    );

    const issueOne = getIssue(model.commonAcIssuesAr, 0, 'ضعف التبريد وقت الظهيرة');
    const issueTwo = getIssue(model.commonAcIssuesAr, 1, 'تسريب الفريون من دورة التكييف');
    const issueThree = getIssue(model.commonAcIssuesAr, 2, 'ارتفاع ضغط دورة التكييف في الحر الشديد');

    const contextCue = pickBySeed(
      ['بعد الوقوف تحت أشعة الشمس', 'أثناء القيادة في الزحام', 'خلال ذروة حرارة الظهيرة', 'في المشاوير المتتابعة داخل المدينة'],
      seed,
      2
    );

    const inspectionCue = pickBySeed(
      [
        'قياس ضغط الدورة واختبار حرارة فتحات التكييف',
        'كشف التسريب الإلكتروني وفحص صبغة UV',
        'فحص كلتش الكمبروسر وكفاءة مروحة المكثف',
        'مقارنة كفاءة التبريد بين التوقف وحركة السير',
      ],
      seed,
      3
    );

    const outcomeCue = pickBySeed(
      ['استقرار التبريد داخل المقصورة', 'تقليل الحمل الحراري على الكمبروسر', 'منع تكرار تسريب غاز التبريد', 'استعادة كفاءة التكييف القصوى في الصيف'],
      seed,
      4
    );

    const heroDescription = `فحص وتشخيص متخصص لمكيف ${brand.nameAr} ${model.nameAr} موديلات ${model.years} ${contextCue}، مع تحديد السبب الجذري قبل أي استبدال للقطع.`;
    const metaDescription = `خدمة متخصصة لفحص وإصلاح مكيف ${brand.nameAr} ${model.nameAr} في الرياض. نبدأ بـ ${inspectionCue} لمعالجة ${issueOne} و${issueTwo} بدقة لضمان ${outcomeCue}.`;
    const sectionTitle = pickBySeed(
      [
        `خطة تشخيص مكيف ${brand.nameAr} ${model.nameAr} في حرارة الرياض`,
        `خطوات فحص وإصلاح تكييف ${brand.nameAr} ${model.nameAr}`,
        `حماية كمبروسر ${brand.nameAr} ${model.nameAr} من التلف في الصيف`,
        `معايير ورشة اوتو سيف لصيانة ${brand.nameAr} ${model.nameAr}`,
      ],
      seed,
      5
    );

    // Brand/model-specific meta title overrides for high-impression queries
    let finalMetaTitle = metaTitle;
    if (brand.slug === 'bmw') {
      finalMetaTitle = `${brand.nameAr} ${model.nameAr}: تصليح مكيف بي ام دبليو في الرياض | اوتو سيف`;
    }
    if (brand.slug === 'hyundai' && model.slug === 'sonata') {
      finalMetaTitle = `${brand.nameAr} ${model.nameAr}: فحص وتعبئة فريون السوناتا في الرياض | اوتو سيف`;
    }

    return {
      keyword,
      metaTitle: finalMetaTitle,
      metaDescription,
      heroDescription,
      sectionTitle,
      paragraphs: [
        `مشاكل وأعطال تكييف ${brand.nameAr} ${model.nameAr} تظهر بوضوح ${contextCue}، خصوصاً عندما يتكرر ${issueOne} أو يبدأ ${issueTwo} بالظهور بشكل متقطع. هذه الإشارات تدل عادةً على خلل في توازن ضغوط الدورة أو ضعف تبادل الحرارة في المكثف.`,
        `في أوتو سيف نبدأ أولاً بـ ${inspectionCue} ثم نطابق القراءات مع مواصفات المصنع المعتمدة لسيارات ${brand.nameAr} ${model.nameAr} لموديلات ${model.years}. يساعد هذا التشخيص الدقيق في معرفة ما إذا كان الخلل مرتبطاً بـ ${issueThree} أم يحتاج معالجة بسيطة دون تكاليف إضافية.`,
        `هدفنا دائماً هو تحقيق ${outcomeCue} عبر خطة إصلاح محددة ومدروسة، وتجنب تبديل القطع غير التالفة. إذا لاحظت تراجع برودة المكيف نهاراً، فالفحص المبكر يحمي الكمبروسر ويضمن أداءً مستقراً طوال أشهر الصيف.`,
      ],
    };
  }

  const keyword = pickBySeed(
    [
      `${brand.nameEn} ${model.nameEn} AC repair in Riyadh`,
      `${brand.nameEn} ${model.nameEn} AC maintenance in extreme heat`,
      `${brand.nameEn} ${model.nameEn} weak AC cooling at midday`,
      `${brand.nameEn} ${model.nameEn} AC compressor and freon diagnosis`,
    ],
    seed
  );

  const metaTitle = pickBySeed(
    [
      `${brand.nameEn} ${model.nameEn} AC Repair & Service in Riyadh | Auto Save`,
      `${brand.nameEn} ${model.nameEn} AC Not Cooling? Riyadh Diagnostics | Auto Save`,
      `${brand.nameEn} ${model.nameEn} AC Compressor & Freon Service | Auto Save`,
      `${brand.nameEn} ${model.nameEn} Summer AC Maintenance Riyadh | Auto Save`,
    ],
    seed,
    1
  );

  const issueOne = getIssue(model.commonAcIssuesEn, 0, 'weak cooling under peak heat');
  const issueTwo = getIssue(model.commonAcIssuesEn, 1, 'refrigerant leak in the AC circuit');
  const issueThree = getIssue(model.commonAcIssuesEn, 2, 'pressure instability under heavy thermal load');

  const contextCue = pickBySeed(
    ['after extended sun exposure', 'in stop-and-go traffic', 'during peak midday heat', 'on repeated city commutes'],
    seed,
    2
  );

  const inspectionCue = pickBySeed(
    [
      'pressure readings plus vent-temperature validation',
      'electronic leak detection and UV dye verification',
      'compressor clutch engagement and condenser fan checks',
      'cooling efficiency comparisons between idle and cruising',
    ],
    seed,
    3
  );

  const outcomeCue = pickBySeed(
    ['consistent cabin cooling', 'reduced thermal stress on the compressor', 'prevention of recurring refrigerant loss', 'dependable AC performance in Riyadh summer heat'],
    seed,
    4
  );

  const heroDescription = `Specialized AC diagnostics and repair for ${brand.nameEn} ${model.nameEn} (${model.years}) ${contextCue}, identifying root causes before replacing components.`;
  const metaDescription = `Professional ${brand.nameEn} ${model.nameEn} AC repair in Riyadh. We use ${inspectionCue} to address ${issueOne} and ${issueTwo}, restoring ${outcomeCue}.`;
  const sectionTitle = pickBySeed(
    [
      `${brand.nameEn} ${model.nameEn} AC Diagnostic & Service Plan`,
      `How We Diagnose & Repair ${brand.nameEn} ${model.nameEn} AC Systems`,
      `Preventing Compressor Failure in ${brand.nameEn} ${model.nameEn}`,
      `Auto Save Workshop Guidelines for ${brand.nameEn} ${model.nameEn}`,
    ],
    seed,
    5
  );

  // Brand/model-specific meta title overrides for high-impression queries (English)
  let finalMetaTitle = metaTitle;
  if (brand.slug === 'lincoln') {
    finalMetaTitle = `${brand.nameEn} ${model.nameEn} AC Repair & Diagnostics in Riyadh | Auto Save`;
  }
  if (brand.slug === 'bmw') {
    finalMetaTitle = `${brand.nameEn} ${model.nameEn} AC Repair & Cooling Service | Auto Save`;
  }
  if (brand.slug === 'hyundai' && model.slug === 'sonata') {
    finalMetaTitle = `${brand.nameEn} ${model.nameEn} AC Freon Recharge & Repair in Riyadh | Auto Save`;
  }

  return {
    keyword,
    metaTitle: finalMetaTitle,
    metaDescription,
    heroDescription,
    sectionTitle,
    paragraphs: [
      `AC cooling issues in the ${brand.nameEn} ${model.nameEn} commonly become noticeable ${contextCue}, especially when ${issueOne} coincides with ${issueTwo}. This pattern typically points to thermal cycle stress or pressure imbalance rather than immediate component failure.`,
      `Our certified technicians start with ${inspectionCue}, cross-referencing factory specifications for ${brand.nameEn} ${model.nameEn} (${model.years}). This systematic process pinpoints whether the underlying cause involves ${issueThree} or a simpler service requirement before costs escalate.`,
      `Our priority is to restore ${outcomeCue} through precise, targeted repairs without unnecessary parts replacements. Scheduling an inspection at the first sign of weak cooling protects your compressor and guarantees dependable performance throughout Riyadh's extreme temperatures.`,
    ],
  };
}
