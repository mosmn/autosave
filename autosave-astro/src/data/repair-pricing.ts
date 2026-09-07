/**
 * Repair Pricing & Tabby/Tamara Installment Dataset
 * Calibrated for Riyadh & Saudi automotive maintenance market.
 */

export type VehicleTierId = 'sedan' | 'suv' | 'large-4x4' | 'luxury';
export type PartsTierId = 'denso' | 'oem' | 'aftermarket';

export interface VehicleTier {
  id: VehicleTierId;
  nameAr: string;
  nameEn: string;
  examplesAr: string;
  examplesEn: string;
}

export interface ServiceJob {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  durationHoursAr: string;
  durationHoursEn: string;
  warrantyAr: string;
  warrantyEn: string;
  baseLaborSar: number;
  partsPricing: Record<
    VehicleTierId,
    {
      partsMinSar: number;
      partsMaxSar: number;
      laborFactor: number;
    }
  >;
}

export const vehicleTiers: VehicleTier[] = [
  {
    id: 'sedan',
    nameAr: 'سيدان واقتصادي',
    nameEn: 'Sedan & Compact',
    examplesAr: 'كامري، كورولا، النترا، التيما، صني، أكسنت، مازدا 6',
    examplesEn: 'Camry, Corolla, Elantra, Altima, Sunny, Accent, Mazda 6',
  },
  {
    id: 'suv',
    nameAr: 'كروس أوفر وSUV مدمج',
    nameEn: 'Crossover & Compact SUV',
    examplesAr: 'توسان، راف فور، سبورتاج، CX-5، كولراي',
    examplesEn: 'Tucson, RAV4, Sportage, CX-5, Coolray',
  },
  {
    id: 'large-4x4',
    nameAr: 'دفع رباعي عائلي بمكيفين',
    nameEn: 'Large 4x4 / Dual AC SUV',
    examplesAr: 'لاندكروزر، تاهو، يوكن، باترول، اكسبدشن، فورتشنر',
    examplesEn: 'Land Cruiser, Tahoe, Yukon, Patrol, Expedition, Fortuner',
  },
  {
    id: 'luxury',
    nameAr: 'سيارات فاخرة وأوروبية',
    nameEn: 'Luxury & European',
    examplesAr: 'لكزس، مرسيدس بنز، BMW، رينج روفر، أودي',
    examplesEn: 'Lexus, Mercedes-Benz, BMW, Range Rover, Audi',
  },
];

export const serviceJobs: ServiceJob[] = [
  {
    id: 'laser-recharge',
    nameAr: 'فحص ليزر لكشف التسريب + تعبئة فريون بميزان إلكتروني',
    nameEn: 'Laser Leak Inspection + Digital Scale Freon Recharge',
    descriptionAr: 'فحص دورة التكييف بالكامل بأشعة الليزر وكشف التنفيس مع تعبئة غاز أمريكي أصلي بالميزان الإلكتروني الدقيق.',
    descriptionEn: 'Full ultrasonic/laser leak check followed by gram-precise virgin American freon recharge and vacuuming.',
    durationHoursAr: '45 دقيقة إلى ساعة',
    durationHoursEn: '45 mins to 1 hour',
    warrantyAr: 'ضمان 3 أشهر على التهريب',
    warrantyEn: '3 months leak warranty',
    baseLaborSar: 120,
    partsPricing: {
      sedan: { partsMinSar: 80, partsMaxSar: 130, laborFactor: 1.0 },
      suv: { partsMinSar: 100, partsMaxSar: 160, laborFactor: 1.1 },
      'large-4x4': { partsMinSar: 150, partsMaxSar: 220, laborFactor: 1.3 },
      luxury: { partsMinSar: 140, partsMaxSar: 240, laborFactor: 1.4 },
    },
  },
  {
    id: 'control-valve',
    nameAr: 'استبدال بلف التحكم الإلكتروني للكمبروسر (بدون تغيير كامل)',
    nameEn: 'Compressor Electronic Control Valve Replacement',
    descriptionAr: 'حل ذكي لتبريد الوقوف الضعيف دون الحاجة لدفع تكلفة كمبروسر كامل جديد، مع غسيل خفيف وشحن فريون.',
    descriptionEn: 'Cost-saving fix for warm idle air without replacing the full compressor, including recharge.',
    durationHoursAr: 'ساعتان',
    durationHoursEn: '2 hours',
    warrantyAr: 'ضمان 6 أشهر',
    warrantyEn: '6 months warranty',
    baseLaborSar: 220,
    partsPricing: {
      sedan: { partsMinSar: 180, partsMaxSar: 280, laborFactor: 1.0 },
      suv: { partsMinSar: 200, partsMaxSar: 320, laborFactor: 1.15 },
      'large-4x4': { partsMinSar: 250, partsMaxSar: 380, laborFactor: 1.3 },
      luxury: { partsMinSar: 300, partsMaxSar: 500, laborFactor: 1.5 },
    },
  },
  {
    id: 'compressor-replace',
    nameAr: 'استبدال كمبروسر جديد + تنظيف دورة التكييف + رديتر',
    nameEn: 'Full Compressor Replacement + System Flush + Condenser',
    descriptionAr: 'تركيب كمبروسر جديد أصلي مع غسيل كيميائي لمجاري الهواء لإزالة برادة الحديد وتغيير فلتر المجفف.',
    descriptionEn: 'New compressor installation with complete chemical line flush to eliminate metal shavings, plus drier replacement.',
    durationHoursAr: '3 - 5 ساعات',
    durationHoursEn: '3 - 5 hours',
    warrantyAr: 'ضمان 6 أشهر إلى سنة كاملة',
    warrantyEn: '6 months to 1 full year warranty',
    baseLaborSar: 380,
    partsPricing: {
      sedan: { partsMinSar: 950, partsMaxSar: 1650, laborFactor: 1.0 },
      suv: { partsMinSar: 1200, partsMaxSar: 2100, laborFactor: 1.2 },
      'large-4x4': { partsMinSar: 1500, partsMaxSar: 2600, laborFactor: 1.4 },
      luxury: { partsMinSar: 2200, partsMaxSar: 4200, laborFactor: 1.8 },
    },
  },
  {
    id: 'evaporator-core',
    nameAr: 'استبدال ثلاجة المكيف داخل الطبلون + فحص البوابات',
    nameEn: 'In-Dash AC Evaporator Core Replacement',
    descriptionAr: 'فك طبلون احترافي بأيدي فنيين متخصصين دون خدوش أو أصوات ديكور، واستبدال الثلاجة المسربة مع شحن الفريون.',
    descriptionEn: 'Meticulous dashboard removal by experienced technicians without rattles, evaporator core replacement, and refill.',
    durationHoursAr: 'يوم عمل كامل',
    durationHoursEn: '1 full working day',
    warrantyAr: 'ضمان سنة كاملة ضد التسريب',
    warrantyEn: '1 year leak warranty',
    baseLaborSar: 450,
    partsPricing: {
      sedan: { partsMinSar: 350, partsMaxSar: 750, laborFactor: 1.0 },
      suv: { partsMinSar: 450, partsMaxSar: 900, laborFactor: 1.2 },
      'large-4x4': { partsMinSar: 550, partsMaxSar: 1200, laborFactor: 1.4 },
      luxury: { partsMinSar: 800, partsMaxSar: 1900, laborFactor: 1.8 },
    },
  },
  {
    id: 'condenser-fan',
    nameAr: 'استبدال رديتر المكيف الخارجي (Condenser) أو مروحة التبريد',
    nameEn: 'AC Condenser Replacement or Auxiliary Fan Motor',
    descriptionAr: 'علاج تسريبات الرديتر الأمامي الناتج عن صدمات الحصى أو شروخ اللحام، مع تفريغ وإعادة تعبئة الفريون.',
    descriptionEn: 'Replacing gravel-punctured or cracked front condenser, new O-rings, vacuum and precision recharge.',
    durationHoursAr: 'ساعتان إلى 3 ساعات',
    durationHoursEn: '2 - 3 hours',
    warrantyAr: 'ضمان 6 أشهر',
    warrantyEn: '6 months warranty',
    baseLaborSar: 200,
    partsPricing: {
      sedan: { partsMinSar: 280, partsMaxSar: 600, laborFactor: 1.0 },
      suv: { partsMinSar: 350, partsMaxSar: 750, laborFactor: 1.2 },
      'large-4x4': { partsMinSar: 450, partsMaxSar: 980, laborFactor: 1.4 },
      luxury: { partsMinSar: 700, partsMaxSar: 1600, laborFactor: 1.7 },
    },
  },
];

export function calculateRepairCost(
  serviceId: string,
  vehicleTierId: VehicleTierId,
  partsTier: PartsTierId = 'denso'
) {
  const service = serviceJobs.find((s) => s.id === serviceId) ?? serviceJobs[0];
  const tierPricing = service.partsPricing[vehicleTierId] ?? service.partsPricing.sedan;

  // Parts modifier
  let partsMin = tierPricing.partsMinSar;
  let partsMax = tierPricing.partsMaxSar;
  if (partsTier === 'oem') {
    partsMin = Math.round(partsMin * 1.35);
    partsMax = Math.round(partsMax * 1.35);
  } else if (partsTier === 'aftermarket') {
    partsMin = Math.round(partsMin * 0.75);
    partsMax = Math.round(partsMax * 0.75);
  }

  const laborSar = Math.round(service.baseLaborSar * tierPricing.laborFactor);
  const totalMin = partsMin + laborSar;
  const totalMax = partsMax + laborSar;

  // 4 Equal Installments (Tabby & Tamara standard)
  const installmentMin = Math.round((totalMin / 4) * 100) / 100;
  const installmentMax = Math.round((totalMax / 4) * 100) / 100;

  return {
    service,
    laborSar,
    partsMin,
    partsMax,
    totalMin,
    totalMax,
    installmentMin,
    installmentMax,
  };
}
