/**
 * Car AC Diagnostic Decision Tree Dataset
 * Real-world troubleshooting rules calibrated for Saudi Arabian summer climate.
 */

export interface DiagnosticResult {
  id: string;
  primaryCauseAr: string;
  primaryCauseEn: string;
  confidencePercent: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  costEstimateAr: string;
  costEstimateEn: string;
  explanationAr: string;
  explanationEn: string;
  diyCheckAr: string;
  diyCheckEn: string;
  warningAr?: string;
  warningEn?: string;
}

export interface DiagnosticSubQuestion {
  questionAr: string;
  questionEn: string;
  options: {
    labelAr: string;
    labelEn: string;
    result: DiagnosticResult;
  }[];
}

export interface PrimarySymptomNode {
  id: string;
  titleAr: string;
  titleEn: string;
  shortDescAr: string;
  shortDescEn: string;
  icon: string;
  subQuestion: DiagnosticSubQuestion;
}

export const diagnosticTree: PrimarySymptomNode[] = [
  // 1. No cooling at all / Warm air
  {
    id: 'no-cooling',
    titleAr: 'لا يوجد تبريد إطلاقاً (هواء حار)',
    titleEn: 'No Cooling At All (Warm Air)',
    shortDescAr: 'المكيف يخرج هواء ساخناً كأنه مروحة عادية فقط',
    shortDescEn: 'AC blows ambient or hot air, acting like a normal fan',
    icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
    subQuestion: {
      questionAr: 'عند الضغط على زر A/C، هل تلاحظ لقطة الكمبروسر أو نزول خفيف في RPM المحرك؟',
      questionEn: 'When you press the A/C button, does the compressor clutch engage or engine RPM dip slightly?',
      options: [
        {
          labelAr: 'لا، الكمبروسر لا يعمل إطلاقاً ولا توجد أي لقطة أو استجابة',
          labelEn: 'No, compressor does not engage at all, no click or RPM dip',
          result: {
            id: 'zero-gas-or-electrical',
            primaryCauseAr: 'فقدان تام للفريون بسبب تسريب حاد أو احتراق فيوز/ريليه الكمبروسر',
            primaryCauseEn: 'Total refrigerant loss due to severe leak OR blown AC clutch fuse/relay',
            confidencePercent: 90,
            severity: 'critical',
            costEstimateAr: '150 - 450 ريال (كشف تسريب ليزر + شحن فريون) / 50 ريال للفيوز',
            costEstimateEn: '150 - 450 SAR (Laser leak check + recharge) / ~50 SAR for relay',
            explanationAr:
              'عند انعدام الفريون بالكامل، يتدخل حساس الضغط المنخفض (Low Pressure Switch) ويمنع تشغيل الكمبروسر تلقائياً لحمايته من الاحتراق. قد يكون السبب أيضاً تلف ريليه الكلتش في علبة الفيوزات.',
            explanationEn:
              'When refrigerant pressure drops to zero, the low-pressure safety switch disconnects the compressor to prevent self-destruction. A faulty AC relay or blown fuse is also common.',
            diyCheckAr: 'افحص فيوز المكيف (A/C Relay / Fuse) في علبة الفيوزات الرئيسية بالكبوت قبل الذهاب لأي ورشة.',
            diyCheckEn: 'Check the AC fuse and relay in the under-hood fuse box before visiting any shop.',
            warningAr: 'تحذير: لا تعبئ فريون دون فحص تسريب بالليزر أولاً! إذا كان النظام فارغاً فهناك تهريب مؤكد.',
            warningEn: 'Warning: Never recharge without a laser leak test! If system is empty, an active leak exists.',
          },
        },
        {
          labelAr: 'نعم، الكمبروسر يلقط ويعمل ولكن الهواء ما زال حاراً',
          labelEn: 'Yes, compressor engages and spins, but air remains warm',
          result: {
            id: 'control-valve-or-clutch-slip',
            primaryCauseAr: 'تلف بلف التحكم الإلكتروني للكمبروسر (Control Valve) أو عطل بوابة خلط الهواء (Blend Door)',
            primaryCauseEn: 'Faulty electronic control valve OR broken HVAC blend door actuator',
            confidencePercent: 85,
            severity: 'high',
            costEstimateAr: '250 - 650 ريال (تغيير بلف التحكم + فريون) بدلاً من كمبروسر كامل',
            costEstimateEn: '250 - 650 SAR (Control valve + recharge) instead of full compressor',
            explanationAr:
              'في السيارات الحديثة، يدور الكمبروسر لكن الصمام الإلكتروني لا يضخ الغاز، مما يخدع بعض الورش غير المتخصصة لتطلب تغيير كمبروسر كامل بتكلفة باهظة بينما المشكلة في البلف فقط.',
            explanationEn:
              'In modern variable compressors, the pulley spins but internal displacement valve fails to pump gas. Unscrupulous shops often falsely demand replacing the entire compressor.',
            diyCheckAr: 'المس ماسورة المكيف الباردة (الماسورة السميكة بالكبوت)؛ إذا كانت مثلجة فالمشكلة في بوابة الهواء داخل الطبلون وليست بالكمبروسر.',
            diyCheckEn: 'Feel the low-side AC line (thick pipe in engine bay); if ice-cold, the blend door is stuck on heater.',
          },
        },
      ],
    },
  },

  // 2. Weak at idle / cools while driving
  {
    id: 'cools-only-driving',
    titleAr: 'تبريد ضعيف عند التوقف ويتحسن مع المشي',
    titleEn: 'Weak At Idle / Cools While Driving',
    shortDescAr: 'المكيف يبرد على الخطوط السريعة ويقلب حاراً في إشارات وزحمة الرياض',
    shortDescEn: 'AC is freezing on highways but turns warm at stoplights or traffic jams',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    subQuestion: {
      questionAr: 'عند توقف السيارة في الزحمة، هل تدور مراوح تبريد الرديتر بالسرعة العالية؟',
      questionEn: 'When stopped in traffic, do the radiator/condenser cooling fans spin at high speed?',
      options: [
        {
          labelAr: 'المراوح ضعيفة، أو تدور مروحة واحدة فقط، أو ترتفع حرارة المحرك قليلاً',
          labelEn: 'Fans are weak, only one fan runs, or engine temp climbs slightly',
          result: {
            id: 'condenser-fan-failure',
            primaryCauseAr: 'ضعف أو تلف مروحة رديتر المكيف أو اتساخ المكثف الخارجي بالأتربة',
            primaryCauseEn: 'Condenser cooling fan failure or heavily soiled external condenser',
            confidencePercent: 92,
            severity: 'high',
            costEstimateAr: '180 - 450 ريال (دينامو مروحة أو غسيل واجهة المكثف)',
            costEstimateEn: '180 - 450 SAR (Fan motor replacement or condenser flush)',
            explanationAr:
              'عند المشي يتدفق الهواء الطبيعي ويبرد الرديتر، لكن عند التوقف تعتمد السيارة كلياً على المراوح. إذا كانت المروحة ضعيفة، يرتفع ضغط الفريون ويفصل التبريد فوراً.',
            explanationEn:
              'Highway speed rams ambient air through the condenser. At idle, the system relies exclusively on electric fans. Weak fan speed causes high head pressure and cuts cooling.',
            diyCheckAr: 'اغسل واجهة رديتر المكيف بضغط ماء خفيف في المغسلة لإزالة الأتربة والحشرات العالقة.',
            diyCheckEn: 'Gently pressure-wash the front condenser fins to clear caked desert sand and road bugs.',
          },
        },
        {
          labelAr: 'المراوح تعمل بكامل قوتها وحرارة المحرك ممتازة، لكن التبريد يضعف بالوقوف',
          labelEn: 'Fans run at full blast and engine temp is normal, but AC still weakens',
          result: {
            id: 'compressor-valve-wear',
            primaryCauseAr: 'ضعف ضغط بساتم الكمبروسر عند دورات المحرك المنخفضة (RPM) أو نقص جزئي في الفريون',
            primaryCauseEn: 'Compressor internal displacement weakness at low RPM or partial freon leak',
            confidencePercent: 88,
            severity: 'high',
            costEstimateAr: '200 - 550 ريال (وزن فريون بميزان دقيق وفحص بلف التحكم)',
            costEstimateEn: '200 - 550 SAR (Scale recharge + control valve check)',
            explanationAr:
              'عند دوران المحرك بسرعة 800 RPM بالوقوف، لا يستطيع الضاغط الضعيف ضخ كمية كافية. عند زيادة السرعة إلى 2000 RPM يرتفع ضخه ويبرد.',
            explanationEn:
              'At 800 idle RPM, a worn compressor cannot generate adequate pressure differential. As RPM increases to 2,000, mechanical output rises and cooling temporarily recovers.',
            diyCheckAr: 'افحص مستوى برودة المكيف عند وضع القير على N ودوس بنزين خفيف إلى 1500 RPM؛ إذا زادت البرودة فوراً فالمشكلة بلف الكمبروسر.',
            diyCheckEn: 'Put gear in Neutral and rev engine gently to 1500 RPM; if air turns cold instantly, the compressor control valve is failing.',
          },
        },
      ],
    },
  },

  // 3. Intermittent / Cutting off
  {
    id: 'intermittent',
    titleAr: 'المكيف يبرد ويفصل فجأة',
    titleEn: 'AC Blows Cold Then Cuts Off Intermittently',
    shortDescAr: 'يبرد لعشر دقائق ثم يخرج هواء رطباً حاراً، ثم يعود للعمل بعد فترة',
    shortDescEn: 'Cools for 10-15 minutes, turns humid/warm, then randomly restarts',
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    subQuestion: {
      questionAr: 'عندما يفصل المكيف، هل يقل دفع الهواء الخارج من فتحات التكييف أيضاً؟',
      questionEn: 'When the AC cuts off, does the actual blower airflow from the vents drop or restrict?',
      options: [
        {
          labelAr: 'نعم، يضعف دفع الهواء تدريجياً ويخرج رذاذ ماء أو رائحة رطوبة',
          labelEn: 'Yes, airflow chokes gradually and musty humidity or moisture blows out',
          result: {
            id: 'evaporator-freezing',
            primaryCauseAr: 'تجمد ثلاجة المكيف وتحولها إلى قالب ثلج (Evaporator Icing / Freezing)',
            primaryCauseEn: 'Evaporator core freezing into a solid block of ice due to faulty thermistor',
            confidencePercent: 94,
            severity: 'medium',
            costEstimateAr: '150 - 350 ريال (تغيير حساس الثلاجة Thermistor أو تنظيف الثلاجة)',
            costEstimateEn: '150 - 350 SAR (Evaporator thermistor replacement or de-icing service)',
            explanationAr:
              'عند تعطل حساس حرارة الثلاجة، يستمر الكمبروسر بالعمل دون توقف حتى تتجمد الرطوبة وتسد فتحات مرور الهواء تماماً. عند إطفاء المكيف يذوب الثلج ويعود الهواء للتدفق.',
            explanationEn:
              'A faulty freeze sensor causes the compressor to run continuously until moisture freezes over the fins, suffocating airflow. Turning AC off melts the ice block.',
            diyCheckAr: 'عندما يختنق الهواء، أطفئ زر A/C واترك المروحة تعمل 5 دقائق؛ إذا خرج هواء قوي ورطب فالثلاجة كانت متجمدة.',
            diyCheckEn: 'Turn off the A/C button and leave blower fan on high for 5 mins; if strong airflow returns, your evaporator is icing up.',
          },
        },
        {
          labelAr: 'لا، دفع الهواء قوي جداً وطبيعي لكن البرودة تختفي فجأة',
          labelEn: 'No, air volume stays strong, but temperature abruptly turns lukewarm',
          result: {
            id: 'high-pressure-cut-or-clutch-gap',
            primaryCauseAr: 'فصل الكمبروسر بحساس الضغط العالي (Overpressure) أو تآكل خلوص كلتش المكيف',
            primaryCauseEn: 'High-pressure sensor trip due to overcharge OR excessive compressor clutch air gap',
            confidencePercent: 86,
            severity: 'high',
            costEstimateAr: '150 - 350 ريال (ضبط خلوص الكلتش أو سحب الفريون الزائد وضبطه بالميزان)',
            costEstimateEn: '150 - 350 SAR (Clutch gap adjustment or scale freon recalibration)',
            explanationAr:
              'إذا كان الفريون زائداً، يرتفع الضغط فوق 300 PSI بالظهر فيفصل حساس الأمان. في السيارات ذات الكلتش، يتمدد الحديد بالحرارة وتفشل المغناطيسية في شده حتى يبرد.',
            explanationEn:
              'Overcharged freon causes high-side spikes above 300 PSI in midday heat, triggering safety shutoff. On clutch models, thermal expansion widens the gap.',
            diyCheckAr: 'تأكد من عدم تعبئة علبة فريون تجارية مؤخراً بالشارع بدون ميزان رقمي.',
            diyCheckEn: 'Verify if a roadside shop recently added unmeasured freon without a digital scale.',
          },
        },
      ],
    },
  },

  // 4. One side cold, one side warm
  {
    id: 'one-side-warm',
    titleAr: 'مكيف السيارة يبرد من جهة وجهة حار',
    titleEn: 'One Side Cools, Other Side Blows Warm',
    shortDescAr: 'جهة السائق باردة وجهة الراكب دافئة، أو العكس',
    shortDescEn: 'Driver vents blow cold while passenger vents blow lukewarm or vice versa',
    icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4',
    subQuestion: {
      questionAr: 'هل تسمع صوت طقطقة خفيفة (تكتكة) من داخل الطبلون عند تشغيل المكيف أو تغيير الحرارة؟',
      questionEn: 'Do you hear a clicking or tapping noise behind the dashboard when adjusting temp?',
      options: [
        {
          labelAr: 'نعم، يوجد صوت طقطقة متكررة خلف الدرج أو الطبلون',
          labelEn: 'Yes, noticeable repetitive clicking behind glove box or dashboard',
          result: {
            id: 'blend-door-actuator-broken',
            primaryCauseAr: 'تلف مسننات دينامو بوابة خلط الهواء (Blend Door Actuator)',
            primaryCauseEn: 'Broken plastic gears inside the HVAC blend door actuator motor',
            confidencePercent: 95,
            severity: 'medium',
            costEstimateAr: '150 - 350 ريال (استبدال أكتويتر البوابة بدون فك كامل الطبلون)',
            costEstimateEn: '150 - 350 SAR (Actuator replacement without full dashboard removal)',
            explanationAr:
              'في أنظمة التكييف المزدوج (Dual Zone)، تتحكم محركات صغيرة بخلط الهواء البارد مع الحار. عند انكسار تروس المحرك البلاستيكية، تعلق البوابة على وضع الهواء الحار في إحدى الجهات.',
            explanationEn:
              'Dual-zone climate systems use electric servo motors to blend air. Stripped internal plastic gears trap the door on the heater core side.',
            diyCheckAr: 'غير درجة الحرارة من LO إلى HI عدة مرات وراقب هل يتحرك الصوت أو يتغير تدفق الهواء.',
            diyCheckEn: 'Cycle temperature from LO to HI repeatedly to see if clicking changes frequency or location.',
          },
        },
        {
          labelAr: 'لا، لا يوجد أي صوت طقطقة ولكن الفريون لم يفحص منذ فترة طويلة',
          labelEn: 'No clicking sounds, but freon has not been checked in over a year',
          result: {
            id: 'low-freon-half-evaporator',
            primaryCauseAr: 'نقص فريون جزئي يغذي نصف الثلاجة الداخلية فقط',
            primaryCauseEn: 'Low refrigerant charge starving one half of the dual-pass evaporator',
            confidencePercent: 88,
            severity: 'high',
            costEstimateAr: '150 - 350 ريال (فحص تسريب ليزر + إعادة شحن بالميزان)',
            costEstimateEn: '150 - 350 SAR (Laser leak inspection + scale recharge)',
            explanationAr:
              'يدخل الفريون ثلاجة التكييف من جهة السائق، وعندما تكون الشحنة ناقصة يتبخر الغاز في النصف الأول فقط ويصل للنصف الآخر ساخناً، مما يجعل جهة السائق باردة والراكب حاراً!',
            explanationEn:
              'Refrigerant enters the evaporator closest to the driver side. If undercharged, gas vaporizes prematurely, leaving the passenger half starved and warm.',
            diyCheckAr: 'افحص خطوط الفريون تحت الكبوت؛ إذا كانت ماسورة السحب غير باردة بشكل كافٍ فالشحنة ناقصة.',
            diyCheckEn: 'Feel low-side suction pipe under the hood; if lukewarm or sweating lightly, charge is low.',
          },
        },
      ],
    },
  },

  // 5. Strange noises
  {
    id: 'strange-noises',
    titleAr: 'أصوات غريبة (صرير، ونة، احتكاك)',
    titleEn: 'Strange AC Noises (Squealing, Whining, Grinding)',
    shortDescAr: 'صوت مزعج يظهر فور الضغط على زر المكيف أو يرتفع مع دوس البنزين',
    shortDescEn: 'Unusual noise that appears immediately upon pressing A/C or revving engine',
    icon: 'M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z',
    subQuestion: {
      questionAr: 'ما هو الصوت الأكثر دقة الذي تسمعه؟',
      questionEn: 'Which sound best describes what you are hearing?',
      options: [
        {
          labelAr: 'صوت صرير حاد ومزعج (سير يزاعق) عند تشغيل المكيف مباشرة',
          labelEn: 'High-pitched belt squeal immediately when A/C engages',
          result: {
            id: 'loose-belt-or-pulley',
            primaryCauseAr: 'ارتخاء أو تآكل سير المكيف أو ضعف بكرة الشداد (Belt Tensioner)',
            primaryCauseEn: 'Loose or glazed serpentine belt or weak belt tensioner pulley',
            confidencePercent: 93,
            severity: 'medium',
            costEstimateAr: '100 - 250 ريال (تغيير أو شد السير الأصلي)',
            costEstimateEn: '100 - 250 SAR (Belt replacement or tensioner adjustment)',
            explanationAr:
              'عند تشغيل المكيف يضع الكمبروسر حملاً ميكانيكياً فورياً على السير؛ إذا كان السير قديماً أو الشداد مرتخياً يزلق السير على البكرة مصدراً صريراً حاداً.',
            explanationEn:
              'Compressor engagement places sudden rotational load on the belt. A worn belt or loose tensioner slips over the pulley, causing high-pitched screeching.',
            diyCheckAr: 'انظر لسير المكيف وهو مطفأ؛ إذا وجدت شقوقاً دقيقة بالعرض فهو بحاجة للاستبدال فوراً.',
            diyCheckEn: 'Inspect the underside of the serpentine belt; micro-cracks indicate dry rot needing replacement.',
          },
        },
        {
          labelAr: 'صوت ونة طحن عميق (مثل طيارة أو دينامو خربان) يرتفع مع سرعة السيارة',
          labelEn: 'Deep whining or grinding rumble that revs up with engine RPM',
          result: {
            id: 'compressor-bearing-or-internals',
            primaryCauseAr: 'تآكل رمان بكرة الكمبروسر (Bearing) أو جفاف زيت التبريد داخل البساتم',
            primaryCauseEn: 'Worn compressor clutch pulley bearing OR internal piston friction from low oil',
            confidencePercent: 90,
            severity: 'critical',
            costEstimateAr: '250 - 450 ريال (تغيير الرمان فقط إذا لحق عليه) / أو تغيير كمبروسر',
            costEstimateEn: '250 - 450 SAR (Bearing replacement) / or compressor replacement if seized',
            explanationAr:
              'إذا كان الصوت طحن معدني، فرمانات البكرة جافة وبحاجة لتغيير سريع قبل أن تقفل البكرة وتقطع سير المكينة بالكامل على الطريق.',
            explanationEn:
              'A metallic growl indicates dry pulley bearings. Replacing the bearing promptly prevents a total pulley lockup that could snap your serpentine belt on the highway.',
            diyCheckAr: 'أطفئ زر A/C؛ إذا اختفى الصوت فوراً فالمشكلة داخل الكمبروسر، إذا استمر فالصوت في رمان البكرة الخارجي.',
            diyCheckEn: 'Turn off the A/C button; if sound stops instantly, the fault is internal. If it continues, it is the outer pulley bearing.',
          },
        },
      ],
    },
  },

  // 6. Bad odors or water leak
  {
    id: 'odors-and-water',
    titleAr: 'روائح كريهة أو تسريب ماء داخل المقصورة',
    titleEn: 'Musty Odors or Water Leaking Inside Cabin',
    shortDescAr: 'رائحة عفن أو رطوبة عند بداية التشغيل، أو بلل في فرش ودواسات الراكب',
    shortDescEn: 'Musty vinegar smell upon startup, or soaked passenger floor carpet',
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
    subQuestion: {
      questionAr: 'ما هي المشكلة المحددة التي تواجهك داخل المقصورة؟',
      questionEn: 'Which exact symptom is occurring in your cabin?',
      options: [
        {
          labelAr: 'تجمع مياه وبلل تحت دواسة الراكب الأمامي أو السائق',
          labelEn: 'Standing water or damp carpet under front passenger/driver mat',
          result: {
            id: 'clogged-ac-drain',
            primaryCauseAr: 'انسداد هوز تصريف مياه المكيف (AC Evaporator Drain Hose)',
            primaryCauseEn: 'Clogged AC evaporator drain tube backing water into interior carpet',
            confidencePercent: 96,
            severity: 'medium',
            costEstimateAr: '100 - 200 ريال (تسليك وتنظيف مجرى التصريف)',
            costEstimateEn: '100 - 200 SAR (Drain pipe clearing and sanitization)',
            explanationAr:
              'تتكثف رطوبة الجو على ثلاجة المكيف وتخرج عبر هوز صغير أسفل السيارة. بسبب غبار الرياض، ينسد الهوز بالوحل وتفيض المياه داخل الطبلون على أرضية السيارة.',
            explanationEn:
              'Atmospheric humidity condenses on the evaporator and drains beneath the vehicle. Desert dust creates mud plugs, forcing condensation to overflow onto cabin floors.',
            diyCheckAr: 'راقب أسفل سيارتك والمكيف يعمل؛ إذا لم ترَ قطرات ماء تتساقط على الأرض فالهوز مسدود تماماً.',
            diyCheckEn: 'Check beneath the car with AC running; if no water puddles underneath, the drain hose is fully blocked.',
          },
        },
        {
          labelAr: 'رائحة عفن أو غبار كريهة جداً عند أول دقيقة من تشغيل المكيف',
          labelEn: 'Strong musty, stale, or dusty odor during first minute of AC operation',
          result: {
            id: 'moldy-filter-and-evaporator',
            primaryCauseAr: 'تراكم البكتيريا والفطريات على الثلاجة واتساخ فلتر المقصورة',
            primaryCauseEn: 'Bacterial and mold colonies on damp evaporator core plus saturated cabin filter',
            confidencePercent: 95,
            severity: 'low',
            costEstimateAr: '100 - 250 ريال (تغيير فلتر كربوني + تعقيم بالأوزون)',
            costEstimateEn: '100 - 250 SAR (Carbon filter + ozone AC sanitization)',
            explanationAr:
              'رطوبة الثلاجة مع إيقاف السيارة في كراج دافئ ومغلق تخلق بيئة خصبة للعفن والبكتيريا. استبدال الفلتر وتعقيم المجاري ينهي الرائحة فوراً.',
            explanationEn:
              'Trapped moisture on the evaporator core in hot garages breeds mold and mildew colonies. Replacing the filter and running ozone treatment eliminates the smell.',
            diyCheckAr: 'انزع فلتر المكيف خلف الدرج وتفحصه؛ إذا كان رمادياً أو مليئاً بالأتربة استبدله فوراً.',
            diyCheckEn: 'Pull out the cabin filter behind your glove box; replace immediately if blackened or dust-caked.',
          },
        },
      ],
    },
  },
];
