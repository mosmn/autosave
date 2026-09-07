export interface FuelOption {
  id: '91' | '95' | 'diesel';
  nameAr: string;
  nameEn: string;
  pricePerLiterSAR: number;
}

export const SAUDI_FUEL_PRICES: Record<string, FuelOption> = {
  '91': {
    id: '91',
    nameAr: 'بنزين 91 ممتاز',
    nameEn: 'Gasoline 91 Octane',
    pricePerLiterSAR: 2.18,
  },
  '95': {
    id: '95',
    nameAr: 'بنزين 95 سوبر',
    nameEn: 'Gasoline 95 Octane',
    pricePerLiterSAR: 2.33,
  },
  diesel: {
    id: 'diesel',
    nameAr: 'ديزل نقل وخفيف',
    nameEn: 'Automotive Diesel',
    pricePerLiterSAR: 1.15,
  },
};

export interface EngineCategory {
  id: '4cyl' | '6cyl' | '8cyl';
  nameAr: string;
  nameEn: string;
  examplesAr: string;
  examplesEn: string;
  baseConsumptionL100km: number;
  idleLitersPerHourWithAC: number; // Extra liters consumed per idle hour with AC
  cityAcPenaltyPercent: number;    // % extra fuel used in city driving with AC
  highwayAcPenaltyPercent: number; // % extra fuel used on highway with AC
}

export const ENGINE_CATEGORIES: Record<string, EngineCategory> = {
  '4cyl': {
    id: '4cyl',
    nameAr: '4 سلندر (سيدان / كروس أوفر)',
    nameEn: '4-Cylinder (Sedan / Crossover)',
    examplesAr: 'كامري، سوناتا، كورولا، مازدا 6، راف فور، توسان',
    examplesEn: 'Camry, Sonata, Corolla, Mazda 6, RAV4, Tucson',
    baseConsumptionL100km: 7.5,
    idleLitersPerHourWithAC: 0.9,
    cityAcPenaltyPercent: 15,
    highwayAcPenaltyPercent: 4.5,
  },
  '6cyl': {
    id: '6cyl',
    nameAr: '6 سلندر (SUV متوسط / سيدان كبير)',
    nameEn: '6-Cylinder (Midsize SUV / Large Sedan)',
    examplesAr: 'برادو، باترول V6، ماكسيما، إكسبلورر، تشارجر، باليسيد',
    examplesEn: 'Prado, Patrol V6, Maxima, Explorer, Charger, Palisade',
    baseConsumptionL100km: 11.0,
    idleLitersPerHourWithAC: 1.3,
    cityAcPenaltyPercent: 18,
    highwayAcPenaltyPercent: 5.0,
  },
  '8cyl': {
    id: '8cyl',
    nameAr: '8 سلندر (SUV عائلي كبير / بيك أب)',
    nameEn: '8-Cylinder (Full-size SUV / Pickup Truck)',
    examplesAr: 'لاندكروزر V8، تاهو، يوكون، باترول V8، فورد F-150، سييرا',
    examplesEn: 'Land Cruiser V8, Tahoe, Yukon, Patrol V8, F-150, Sierra',
    baseConsumptionL100km: 15.5,
    idleLitersPerHourWithAC: 1.7,
    cityAcPenaltyPercent: 20,
    highwayAcPenaltyPercent: 5.5,
  },
};

export interface AcFuelCalculationResult {
  engine: EngineCategory;
  fuel: FuelOption;
  dailyKm: number;
  cityPercentage: number;
  highwayPercentage: number;
  // Calculations:
  monthlyKm: number;
  baseMonthlyLiters: number;
  baseMonthlyCostSAR: number;
  acExtraMonthlyLiters: number;
  acExtraMonthlyCostSAR: number;
  acExtraAnnualCostSAR: number;
  totalMonthlyCostWithAcSAR: number;
  acCostSharePercentage: number;
  // Comparison: AC vs Open Windows on Highway
  openWindowsDragPenaltyPercent: number; // Extra drag consumes approx 12-15% more fuel at 120 km/h
  highwayVerdictAr: string;
  highwayVerdictEn: string;
  // Cost per 1 hour idling in traffic
  idleCostPerHourSAR: number;
  // Savings Tips
  savingsTipsAr: string[];
  savingsTipsEn: string[];
}

export function calculateAcFuelCost(params: {
  engineId: '4cyl' | '6cyl' | '8cyl';
  fuelId: '91' | '95' | 'diesel';
  dailyKm: number;
  cityPercentage: number; // 0 to 100
}): AcFuelCalculationResult {
  const engine = ENGINE_CATEGORIES[params.engineId] || ENGINE_CATEGORIES['4cyl'];
  const fuel = SAUDI_FUEL_PRICES[params.fuelId] || SAUDI_FUEL_PRICES['91'];
  const dailyKm = Math.max(5, Math.min(params.dailyKm, 300));
  const cityPct = Math.max(0, Math.min(params.cityPercentage, 100));
  const highwayPct = 100 - cityPct;

  const monthlyKm = dailyKm * 30;

  // Base consumption without AC:
  const baseMonthlyLiters = (monthlyKm / 100) * engine.baseConsumptionL100km;
  const baseMonthlyCostSAR = baseMonthlyLiters * fuel.pricePerLiterSAR;

  // Weighted AC penalty percentage:
  const weightedAcPenaltyPct =
    (cityPct / 100) * engine.cityAcPenaltyPercent +
    (highwayPct / 100) * engine.highwayAcPenaltyPercent;

  // Extra liters due to AC:
  const acExtraMonthlyLiters = baseMonthlyLiters * (weightedAcPenaltyPct / 100);
  const acExtraMonthlyCostSAR = acExtraMonthlyLiters * fuel.pricePerLiterSAR;
  const acExtraAnnualCostSAR = acExtraMonthlyCostSAR * 12;

  const totalMonthlyCostWithAcSAR = baseMonthlyCostSAR + acExtraMonthlyCostSAR;
  const acCostSharePercentage = Math.round((acExtraMonthlyCostSAR / totalMonthlyCostWithAcSAR) * 100);

  // Hourly idle cost with AC:
  const idleCostPerHourSAR = Number((engine.idleLitersPerHourWithAC * fuel.pricePerLiterSAR).toFixed(2));

  // Open windows drag penalty at 120 km/h:
  const openWindowsDragPenaltyPercent = 12.5; // SAE aerodynamic research benchmark

  const highwayVerdictAr =
    'في سرعات الخط السريع (100 - 120 كم/ساعة)، تشغيل المكيف يستهلك بنزين أقل بكثير من فتح النوافذ! فتح النوافذ يكسر انسيابية الهواء ويزيد مقاومة السحب (Aerodynamic Drag) بنسبة 12% إلى 15%، بينما يستهلك المكيف حوالي 5% فقط.';
  const highwayVerdictEn =
    'At highway cruising speeds (100 - 120 km/h), running the AC consumes significantly less fuel than opening windows! Open windows destroy aerodynamic airflow and cause 12% to 15% drag penalty, whereas the modern AC compressor adds only ~5%.';

  const savingsTipsAr = [
    'استخدم زر تدوير الهواء الداخلي (Recirculation): يقلل جهد الكمبروسر بنسبة 30% لأنه يبرد هواء المقصورة البارد بدلاً من سحب هواء الرياض الحار 48°C.',
    'افحص ضغط الفريون ونظافة رديتر المكيف: انسداد الرديتر بالأتربة يرفع ضغط الغاز ويجعل الكمبروسر يثقل حركة المحرك ويستهلك وقوداً مضاعفاً.',
    'أوقف السيارة في الظل أو استخدم شماسة الزجاج الأمامي: تقليل حرارة المقصورة المركونة من 70°C إلى 45°C يوفر أول 15 دقيقة من التشغيل الأقصى للكمبروسر.',
    'غير فلتر المكيف المسدود: ضعف تدفق الهواء يجبر السائق على وضع المروحة والحرارة على أقصى درجة دون فائدة تذكر.',
    'استبدل زيت الكمبروسر عند الصيانة: الزيت التالف يزيد الاحتكاك الداخلي لبساتم الكمبروسر ويرفع المقاومة الميكانيكية على سير المحرك.',
  ];

  const savingsTipsEn = [
    'Always use Cabin Recirculation mode: Cuts compressor workload by 30% by cooling already chilled air rather than 48°C ambient air.',
    'Clean your AC Condenser and check freon pressure: A clogged condenser skyrockets head pressure, bogging down the engine and burning extra fuel.',
    'Park in shade or use windshield sunshades: Lowering parked cabin temp from 70°C to 45°C eliminates the initial high-load compressor spike.',
    'Replace clogged cabin air filters: Restricted airflow forces you to crank fans and temperature to max settings unnecessarily.',
    'Maintain fresh compressor PAG oil: Degraded oil increases internal piston friction and parasitic mechanical drag on the serpentine belt.',
  ];

  return {
    engine,
    fuel,
    dailyKm,
    cityPercentage: cityPct,
    highwayPercentage: highwayPct,
    monthlyKm,
    baseMonthlyLiters: Math.round(baseMonthlyLiters),
    baseMonthlyCostSAR: Math.round(baseMonthlyCostSAR),
    acExtraMonthlyLiters: Math.round(acExtraMonthlyLiters),
    acExtraMonthlyCostSAR: Math.round(acExtraMonthlyCostSAR),
    acExtraAnnualCostSAR: Math.round(acExtraAnnualCostSAR),
    totalMonthlyCostWithAcSAR: Math.round(totalMonthlyCostWithAcSAR),
    acCostSharePercentage,
    openWindowsDragPenaltyPercent,
    highwayVerdictAr,
    highwayVerdictEn,
    idleCostPerHourSAR,
    savingsTipsAr,
    savingsTipsEn,
  };
}
