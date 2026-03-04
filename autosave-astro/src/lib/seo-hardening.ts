import type { Language } from './i18n';

interface ThinContentInput {
  primaryTextLength: number;
  faqCount: number;
  keyBlockCount: number;
  linkHubCount: number;
}

export function shouldNoindexThinContent(input: ThinContentInput): boolean {
  const score =
    (input.primaryTextLength >= 220 ? 1 : 0) +
    (input.faqCount >= 3 ? 1 : 0) +
    (input.keyBlockCount >= 3 ? 1 : 0) +
    (input.linkHubCount >= 3 ? 1 : 0);

  return score < 3;
}

function trimMetaDescription(text: string): string {
  if (text.length <= 160) return text;
  return `${text.slice(0, 157).trim()}...`;
}

export function getServiceSeoByFamily(
  slug: string,
  serviceName: string,
  durationMinutes: number,
  lang: Language
): { title: string; description: string; familyKey: string } {
  const familyKey = slug.includes('recharge')
    ? 'recharge'
    : slug.includes('leak')
      ? 'leak'
      : slug.includes('diagnostic')
        ? 'diagnostic'
        : slug.includes('cleaning')
          ? 'cleaning'
          : slug.includes('replacement')
            ? 'replacement'
            : 'general';

  const arTitleMap: Record<string, string> = {
    recharge: `${serviceName} في الرياض | استقرار تبريد أدق`,
    leak: `${serviceName} في الرياض | تحديد المصدر بدقة`,
    diagnostic: `${serviceName} في الرياض | تشخيص السبب الجذري`,
    cleaning: `${serviceName} في الرياض | تحسين كفاءة الهواء`,
    replacement: `${serviceName} في الرياض | توافق وأداء مضمون`,
    general: `${serviceName} في الرياض | خطوات ومدة واضحة`,
  };

  const enTitleMap: Record<string, string> = {
    recharge: `${serviceName} in Riyadh | Cooling Stability`,
    leak: `${serviceName} in Riyadh | Source-Accurate`,
    diagnostic: `${serviceName} in Riyadh | Root-Cause Focus`,
    cleaning: `${serviceName} in Riyadh | Airflow Efficiency`,
    replacement: `${serviceName} in Riyadh | Fit & Performance`,
    general: `${serviceName} in Riyadh | Steps & Timing`,
  };

  const arDescMap: Record<string, string> = {
    recharge: `صفحة ${serviceName} تركز على ثبات التبريد بعد التعبئة، مدة تقديرية ${durationMinutes} دقيقة، وروابط تشخيص مرتبطة بالرياض.`,
    leak: `صفحة ${serviceName} تركز على عزل مصدر التسريب بدقة، مدة تقديرية ${durationMinutes} دقيقة، وخطوات فحص عملية في الرياض.`,
    diagnostic: `صفحة ${serviceName} تركز على تحديد السبب الجذري أولاً، مدة تقديرية ${durationMinutes} دقيقة، مع مسار تشخيص واضح للرياض.`,
    cleaning: `صفحة ${serviceName} تركز على جودة الهواء وكفاءة دورة المكيف، مدة تقديرية ${durationMinutes} دقيقة، ومحتوى محلي للرياض.`,
    replacement: `صفحة ${serviceName} تركز على توافق القطعة وضبط الأداء بعد التركيب، مدة تقديرية ${durationMinutes} دقيقة، وخيارات مرتبطة بالرياض.`,
    general: `صفحة ${serviceName} تعرض خطوات التنفيذ والمدة المتوقعة ${durationMinutes} دقيقة مع روابط داخلية متخصصة لبيئة الرياض.`,
  };

  const enDescMap: Record<string, string> = {
    recharge: `${serviceName} page focuses on post-recharge cooling stability, ~${durationMinutes} min workflow, and Riyadh-specific diagnostic links.`,
    leak: `${serviceName} page focuses on leak-source isolation, ~${durationMinutes} min process, and practical Riyadh-oriented inspection flow.`,
    diagnostic: `${serviceName} page focuses on root-cause confirmation first, ~${durationMinutes} min workflow, and Riyadh-specific diagnostic path.`,
    cleaning: `${serviceName} page focuses on airflow quality and AC cycle efficiency, ~${durationMinutes} min process, with Riyadh-local context.`,
    replacement: `${serviceName} page focuses on part fit and post-install performance, ~${durationMinutes} min workflow, with Riyadh-specific links.`,
    general: `${serviceName} page provides clear execution steps and ~${durationMinutes} min timing with specialized Riyadh-focused internal links.`,
  };

  const title = lang === 'ar' ? arTitleMap[familyKey] : enTitleMap[familyKey];
  const description = trimMetaDescription(lang === 'ar' ? arDescMap[familyKey] : enDescMap[familyKey]);

  return { title, description, familyKey };
}

export function getSymptomSeoByFamily(
  slug: string,
  symptomTitle: string,
  lang: Language
): { title: string; description: string; familyKey: string } {
  const familyKey = slug.includes('smell')
    ? 'smell'
    : slug.includes('noise')
      ? 'noise'
      : slug.includes('cooling') || slug.includes('warm-air')
        ? 'cooling'
        : slug.includes('airflow')
          ? 'airflow'
          : slug.includes('water') || slug.includes('lines-freezing')
            ? 'fluid'
            : slug.includes('compressor-not-engaging') || slug.includes('fuse') || slug.includes('stopped-working')
              ? 'electrical'
              : slug.includes('shakes')
                ? 'load'
                : 'general';

  const arTitleMap: Record<string, string> = {
    smell: `${symptomTitle} | مسار تشخيص الروائح`,
    noise: `${symptomTitle} | تحليل أصوات المكيف`,
    cooling: `${symptomTitle} | أسباب ضعف التبريد`,
    airflow: `${symptomTitle} | تشخيص تدفق الهواء`,
    fluid: `${symptomTitle} | فحص الخطوط والتكاثف`,
    electrical: `${symptomTitle} | فحص الدائرة الكهربائية`,
    load: `${symptomTitle} | تأثير الحمل والتشغيل`,
    general: `${symptomTitle} | تشخيص السبب والحل`,
  };

  const enTitleMap: Record<string, string> = {
    smell: `${symptomTitle} | Odor Diagnosis Path`,
    noise: `${symptomTitle} | AC Noise Analysis`,
    cooling: `${symptomTitle} | Cooling Cause Map`,
    airflow: `${symptomTitle} | Airflow Diagnosis`,
    fluid: `${symptomTitle} | Line & Condensate Checks`,
    electrical: `${symptomTitle} | Electrical Diagnosis`,
    load: `${symptomTitle} | Load Behavior Check`,
    general: `${symptomTitle} | Cause & Fix Path`,
  };

  const arDescMap: Record<string, string> = {
    smell: `صفحة ${symptomTitle} تركز على تشخيص الروائح، الأسباب المحتملة، وخطوات الفحص قبل الإصلاح لتقليل التكرار.`,
    noise: `صفحة ${symptomTitle} تركز على تحديد مصدر الصوت، ترتيب الاحتمالات، وخطوات تشخيص عملية قبل الإصلاح.`,
    cooling: `صفحة ${symptomTitle} تركز على كفاءة التبريد تحت الحمل، الأسباب الأكثر شيوعاً، ومسار فحص واضح.`,
    airflow: `صفحة ${symptomTitle} تركز على مسار تدفق الهواء داخل المقصورة، الاحتمالات، وخطوات تحقق متدرجة.`,
    fluid: `صفحة ${symptomTitle} تركز على الخطوط والتكاثف، احتمالات التسريب والتجمد، وخطوات فحص ميدانية.`,
    electrical: `صفحة ${symptomTitle} تركز على أعطال التحكم الكهربائي للمكيف وخطوات التحقق قبل استبدال الأجزاء.`,
    load: `صفحة ${symptomTitle} تركز على تأثير تشغيل المكيف على الحمل والأداء مع تشخيص احتمالات مرتبطة بالمحرك.`,
    general: `صفحة ${symptomTitle} تركز على الأسباب المرجحة وخطوات التشخيص العملي قبل قرار الإصلاح.`,
  };

  const enDescMap: Record<string, string> = {
    smell: `${symptomTitle} page focuses on odor diagnosis, likely causes, and practical pre-repair checks to reduce recurrence.`,
    noise: `${symptomTitle} page focuses on noise-source isolation, cause prioritization, and practical diagnostic checks before repair.`,
    cooling: `${symptomTitle} page focuses on cooling efficiency under load, common causes, and a structured inspection path.`,
    airflow: `${symptomTitle} page focuses on cabin airflow path diagnosis, likely causes, and stepwise verification checks.`,
    fluid: `${symptomTitle} page focuses on lines and condensate behavior, leak/freeze risk patterns, and field-ready checks.`,
    electrical: `${symptomTitle} page focuses on AC electrical control failures and validation steps before component replacement.`,
    load: `${symptomTitle} page focuses on AC load behavior and engine-related diagnostic patterns with practical checks.`,
    general: `${symptomTitle} page focuses on likely causes and practical diagnosis steps before selecting a repair path.`,
  };

  const title = lang === 'ar' ? arTitleMap[familyKey] : enTitleMap[familyKey];
  const description = trimMetaDescription(lang === 'ar' ? arDescMap[familyKey] : enDescMap[familyKey]);

  return { title, description, familyKey };
}
