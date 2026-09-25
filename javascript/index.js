const TRANSLATIONS = {
  ar: {
    meta: { title: "MedSky Training Academy" },
    nav: {
      home: "الرئيسية",
      courses: "الدورات",
      programs: "نحو الاحتراف",
      programsShort: "البرامج",
      trainers: "المدربون",
      contact: "تواصل معنا",
      signup: "إبدأ مجاناٌ",
    },
    theme: { light: "فاتح", dark: "داكن" },
    mobile: { appearance: "المظهر", language: "اللغة", login: "تسجيل الدخول" },
    hero: {
      badge: "مسارات تدريبية متكاملة",
      title1: "حوّل شغفك الطبي",
      title2: "إلى ريادة حقيقية",
      desc: "وجهتك الرقمية الأقوى لتطوير وتأهيل الكوادر الصحية. برامج تخصصية تحت إشراف قادة القطاع الطبي والخبراء، صُممت لتمنحك كفاءة استثنائية تجعلك الخيار الأول في سوق العمل.",
      explore: "استكشف الدورات",
      trustText: "متخصص طبي مسجّل من حول العالم",
      scrollHint: "مرر للاستكشاف",
    },
    marquee: {
      "1": "تأهيل مهني متكامل",
      "2": "+3 دورة متخصصة",
      "3": "مدربون أطباء ومترجمون",
      "4": "تعلم بالوتيرة التي تناسبك",
      "5": "وصول مدى الحياة",
      "6": "مجتمع +5,000 مترجم",
      "7": "محاضرات مباشرة ومسجلة",
    },
    stats: {
      trainees: "متدرب حول العالم",
      courses: "دورة متخصصة",
      trainers: "مدرب خبير",
      satisfaction: "نسبة الرضا",
    },
    why: {
      tag: "لماذا MedSky؟",
      title1: "منصتك المتكاملة..",
      title2: "الأكاديمية الأولى لتدريب وتطوير الكوادر الصحية",
      subtitle: "منصتك الأولى لبناء مسيرة مهنية بلا حدود",
      card1: { title: "برامج معتمدة", desc: "جميع البرامج معتمدة دولياً ومعترف بها من قِبل كبرى منظمات الترجمة والرعاية الصحية حول العالم." },
      card2: { title: "مدربون خبراء", desc: "تعلّم من أطباء ممارسين ومترجمين مرخّصين وخبراء لغويين طبيين يمتلكون عقوداً من الخبرة الميدانية." },
      card3: { title: "تعلم مرن عبر الإنترنت", desc: "تعلّم بالوتيرة التي تناسبك من خلال محاضرات فيديو وجلسات مباشرة ولوحات نقاش غير متزامنة." },
      card4: { title: "تدريب تطبيقي", desc: "تطبيقات عملية ونماذج محاكاة واختبارات حقيقية، تؤهلك لتخطي التحديات واحتراف تخصصك بثقة" },
      card5: { title: "دعم ومتابعة مستمرة", desc: "احصل على دعم وإرشاد مستمر من المدربين وفريق الأكاديمية طوال فترة الدراسة لضمان تحقيق أفضل استفادة." },
      card6: { title: "مجتمع الوظائف", desc: "وصول حصري إلى جروب يضم فرص العمل والتدريب والمشاريع المناسبة لخريجي الدبلومة." },
    },
    courses: {
      tag: "الدورات المميزة",
      title1: "ابدأ رحلتك",
      title2: "مع MedSky",
      subtitle: "مناهج متكاملة... تدريب عملي... ومستقبل مهني تصنعه بثقة",
      badge: "شامل",
      card1: { hours: "60 ساعة", level: "متقدم", title: "دبلومة الترجمة الطبية التحريرية بالذكاء الاصطناعي", desc: "برنامج متكامل يضم المسار النظري (60 ساعة) والمسار العملي لبناء مترجم طبي احترافي.", reviews: "(1.2k تقييم)" },
      card2: { hours: "80 ساعة", level: "متقدم", title: "دبلومة الترجمة الطبية الفورية الشاملة", desc: "برنامج مكثف يدمج المهارة اللغوية والبروتوكول المهني والتدريب العملي المباشر.", reviews: "(980 تقييم)" },
      enroll: "سجّل الآن",
      viewAll: "عرض جميع الدورات",
    },
    process: {
      tag: "كيف يعمل",
      title1: "طريقك لتصبح",
      title2: "مترجماً طبياً معتمداً",
      step1: { title: "سجل وانطلق", desc: "ابدأ مسارك التعليمي، حدد أهدافك، واكتشف نقاط قوتك عبر تقييمنا الأولي." },
      step2: { title: "تعمّق", desc: "اكتسب المعرفة من مصادرها، وتابع محاضرات متخصصة تضيء لك الطريق نحو سوق العمل." },
      step3: { title: "احترف", desc: "طبق مهارتك على تدريبات واقعية، واصقل أسلوبك في الترجمة تحت إشراف نخبة من الخبراء." },
      step4: { title: "تألق", desc: "احصل على اعتمادك الدولي، واجعل شهادتك دليلاً على كفاءتك في سوق العمل العالمي." },
    },
    benefits: {
      tag: "المميزات",
      title1: "كل ما تحتاجه",
      title2: "لتنجح",
      subtitle: "صمّمنا كل جانب من جوانب ميدسكاي لإزالة العوائق وتسريع نموك كمترجم طبي محترف.",
      item1: { title: "تعلم 100% عبر الإنترنت", desc: "ادرس من أي مكان في العالم مع اتصال بالإنترنت — بلا تنقل ورسوم جامعية." },
      item2: { title: "وصول مدى الحياة", desc: "ادفع مرة واحدة وصل إلى مواد الدورة والتحديثات والمحتوى الجديد إلى الأبد." },
      item3: { title: "موارد قابلة للتنزيل", desc: "محاضرات تدريبية متخصصة، مواد تعليمية تطبيقية، تمارين واختبارات، وتسجيلات كاملة للمحاضرات متاحة للرجوع إليها في أي وقت." },
      item4: { title: "دعم الخبراء", desc: "احصل على إجابات من المدربين والموجهين خلال 24 ساعة عبر بوابة الدعم." },
      item5: { title: "مجتمع الوظائف", desc: "وصول حصري إلى جروب يضم فرص العمل والتدريب والمشاريع المناسبة لخريجي الدبلومة." },
      badge: { title: "وصول مدى الحياة", desc: "تعلّم بالوتيرة التي تناسبك" },
    },
    trainers: {
      tag: "فريق التدريب",
      title1: "تعلّم من",
      title2: "أطباء ومترجمين معتمدين",
      subtitle: "مدربونا ليسوا أكاديميين فحسب — بل ممارسون ميدانيون يجمعون بين الخبرة الطبية والكفاءة اللغوية.",
      rating: "5.0 تقييم",
      t1: { role: "طبيب ومترجم طبي تحريري", name: "د.حمزة عياش", desc: "طبيب بشري ومترجم طبي تحريري بخبرة تزيد عن 6 سنوات في مجال الترجمة الطبية والتدريب، ومؤسس أكاديمية MedSky، حيث ساهم في تدريب وتأهيل مئات المترجمين الطبيين وإعدادهم لسوق العمل وفق المعايير المهنية الدولية.", students: "+700 طالب", courses: "18 دورة" },
      t2: { role: "طبيب ومترجم طبي فوري", name: "د. حامد حمد", desc: "طبيب بشري ومدرب في الترجمة الطبية الفورية بخبرة تزيد عن 3 سنوات، متخصص في تأهيل المترجمين الطبيين وتزويدهم بالمهارات العملية اللازمة للتعامل باحترافية مع مختلف سيناريوهات التواصل الطبي.", students: "+300 طالب", courses: "12 دورة" },
    },
    testi: {
      tag: "أراء وتجارب",
      title1: "كفاءة واحترافية حظيت بتقدير",
      title2: "من متخصصي المجال الطبي حول العالم",
      list: [
        { name: "Raghad Omar", role: "Doctor ", text: "أنهيت ورشة LinkedIn & CV مع الدكتور المبدع حمزة عياش. ورشة مليئة بالمعلومات النوعية والمهارات التي يحتاجها كل صيدلي ليظهر احترافيته للعالم. شكرًا دكتور حمزة على هذا العطاء المتميز، أنصح الجميع بالاستفادة من خبراته.", gender: "f" },
        { name: " Amna Khaled", role: "Doctor ", text: "دورة جدًا رائعة وشرحها سلس وسهل، ومحاضرات مليئة بالمعلومات القيّمة، بارك الله في جهودكم.", gender: "m" },
       { name: "Ammar Ayman", role: " Doctor", text: "الكورس ممتاز وكافٍ، ودكتور حمزة متعاون جدًا مع المتدربين.", gender: "f" },
        { name: "Nada Alsalmi", role: "Doctor ", text: "كورس أكثر من رائع، بالتوفيق.", gender: "f" },
        { name: "Mohammed Alhour", role: "Doctor ", text: " بكل صراحة كورس الترجمة الطبية مميز جدًا ومفيد تحت إشراف وتدريب دكتور حمزة المثّاق كعادته والخبير بالمجال،سيوسّع خبراتك ومهاراتك، بعدها سيوضح لك كيفية دخول مجال العمل كمترجم طبي محترف والانطلاق نحو التميز. ", gender: "f" },
        { name: "Reem Sobe", role: "English Literature Graduate", text: "بارك الله بك دكتور، فعلًا كانت دورة مميزة وناجحة، شكرًا جزيلًا لك، لم تبخل علينا بالمعلومات القيمة، جعل الله جهدك معنا في ميزان حسناتك.", gender: "f" },
        { name: "Nada Fayyad", role: "Doctor ", text: "يعطيك ألف عافية دكتور على مجهودك معنا، أسلوبك بالشرح سهّل علينا كثير، وإن شاء الله بميزان حسناتك وتوفيق الله إلك، ما قصرت معنا، وفعلاً كان كورس رائع جدًا، ومعلومات وخبرة جديدة إلنا ووسع مداركنا للعلم والعمل، موفقين جميعًا.", gender: "f" },
        { name: "Rania Rasheed", role: " Clinical Pharmacist", text: "I wholeheartedly recommend Dr. Hamza based on his exceptional expertise in the highly demanding field of medical translation. Dr. Hamza rigorously prepared me for real-world scenarios, emphasizing the critical importance of 100% accuracy and consistency in high-stakes documents like medical reports. Furthermore, his knowledge of ethical considerations and international medical regulations is exemplary, ensuring that his teaching goes beyond simple language transfer to include the necessary professional context required to safeguard patient health and legal compliance.", gender: "f" },
        { name: "Fatma Nouh", role: " Pharmacist", text: "Dr. Hamza is an outstanding medical translator and instructor. During the medical translation course I attended, he combined deep knowledge with practical examples, which helped me improve my skills significantly. His professionalism and dedication are truly inspiring. I highly recommend him to anyone seeking professional medical translation training.", gender: "f" },
        { name: "Aya Saeed", role: " Doctor", text: "أود أن أُعبر عن خالص امتناني وتقديري لأكاديمية MedSky على هذه الورشة النوعية المميزة في إعداد CV وبناء حساب احترافي على LinkedIn، والتي شكّلت إضافة حقيقية لمسيرتي الأكاديمية والمهنية. كانت الورشة ثرية بالمحتوى العملي، حيث تعلمت بشكل واضح كيف أقوم ببناء سيرة ذاتية احترافية تعكس مهاراتي وخبراتي بطريقة منظمة وجذابة، بعيدًا عن الأخطاء الشائعة التي يقع فيها الكثيرون، كما استفدت بشكل كبير في فهم آلية تحسين حسابي على LinkedIn، من حيث اختيار الكلمات المفتاحية المناسبة، وطريقة عرض الخبرات، وبناء هوية مهنية قوية تعزز فرصي في سوق العمل. ولا يسعني إلا أن أتقدم بجزيل الشكر للدكتور حمزة، الذي تميز بأسلوبه الراقي وشرحه السلس والواضح، إضافة إلى حرصه على إيصال المعلومة بدقة واحترافية، وتقديمه لنصائح عملية قيمة نابعة من خبرة حقيقية، مما جعل الورشة تفاعلية ومثمرة إلى أبعد حد. بكل صدق، كانت تجربة ملهمة يحتاجها كل طالب وخريج يسعى لتطوير نفسه ومواكبة متطلبات سوق العمل، وأوصي بشدة الجميع على حضور مثل هذه الورشات القيّمة.", gender: "f" },
        { name: "Medhat Awadallah", role: "Doctor ", text: "كانت تجربة ثرية ساهمت في تعزيز مهاراتي في اللغة الإنجليزية الطبية وفهم المصطلحات الطبية المتخصصة وتطوير القدرة على ترجمة المحتوى الطبي بدقة واحترافية، وأتقدم بخالص الشكر والتقدير للدكتور Hamza Ayyash وفريق MedSky Training Academy على هذا البرنامج المتميز، وعلى ما بذلوه من جهد في تقديم محتوى علمي وتطبيقي قيّم كان له أثر كبير في تطوير مهارات المشاركين.", gender: "f" },
        { name: "Tasnim Badawy", role: " Veterinary", text: "الحمد لله تم الانتهاء بنجاح من برنامج الترجمة الطبية التحريرية، شكرًا Medsky على هذا البرنامج المتميز الذي قدم محتوى شاملًا واحترافيًا غطّى كل ما يتعلق بالترجمة الطبية، من أسس الترجمة والصياغة والتدقيق اللغوي والبحث والتسويق إلى CAT Tools، وكان له أثر كبير في تطوير مهاراتي، أسأل الله أن ينفع بكم ويجعله في ميزان حسناتكم.", gender: "f" },
        { name: "Ahmed Elbalawi", role: "Doctor ", text: "كانت تجربة مميزة ساعدتني على تطوير مهاراتي اللغوية والطبية، واكتساب أساس قوي في الترجمة الطبية، مع خالص الشكر للدكتور Hamza Ayyash وفريق MedSky Training Academy على المحتوى العلمي والتطبيقي الشامل الذي شمل الترجمة والتدقيق اللغوي واستخدام CAT Tools، وأسهم في تأهيلي لسوق العمل.", gender: "f" },
        { name: "Reem Ehab", role: " Dentist", text: "كورس رائع ومميز، تعلمت منه الكثير واكتسبت أساسًا قويًا للبدء في مجال الترجمة والاستمرار فيه، وأتقدم بخالص الشكر للدكتور على كل ما قدمه من معلومات وخبرة ودعم طوال فترة الكورس، وأسأل الله له دوام النجاح والتوفيق.", gender: "f" },
        { name: "Doha Thabet", role: "Doctor ", text: "شكرًا د. حمزة على هذه التجربة الرائعة والمميزة، فقد تعلمنا الكثير واكتشفنا مهارات جديدة وسّعت مداركنا، وكان دعمك ومتابعتك خطوة بخطوة سببًا في نجاح هذه الرحلة، مع خالص التمنيات لك وللجميع بدوام التوفيق والنجاح.", gender: "f" },
        { name: "Mariam Mohammed", role: " Doctor", text: "ألف شكر د.حمزه فعلا كورس مميز ومفيد جداً من الجانب العلمي والعملي كمان . وحضرتك كريم وصبور وبتعطي اللي عندك بكل حب وإخلاص بارك الله في عملك و زادك من فضله وكرمه", gender: "f" },
        { name: "Jana Hany", role: " Doctor", text: "جزاك الله خير الجزاء يا دكتور على مجهودك و دايما بتساعدنا وما بتخبل علينا بارك الله فى علمك وعملك و ربنا يزيدك كانت من افضل الكورسات فعلا اللى اخدتها واستفدت منها كتير كتير بجد شكرا", gender: "f" },
        { name: "Tasneem Adel", role: "Doctor ", text: "شكراً جداً لصبرك وطول بالك معانا ربنا يجازيك عنا كل خير كان راوند ممتع الصراحة انتهى سريعاً استمتعنا جداً بالمحتوى وحبينا الترجمة", gender: "f" },
      ],
    },
    faq: {
      tag: "الأسئلة الشائعة",
      title1: "أسئلة شائعة",
      title2: "وإجاباتها",
      q1: { q: "ما هي مستويات اللغة الإنجليزية المطلوبة للالتحاق بالدبلومة؟", a: "* الترجمة الطبية التحريرية: لا تتطلب مستوىً عالياً جداً أو تعجيزياً؛ فالمستوى العادي كافٍ للبدء، حيث نركز على بناء المصطلحات وتطوير مهارات الصياغة.<br>* الترجمة الطبية الفورية: نظراً لطبيعة العمل الحية والتواصل المباشر، فإنها تتطلب مستوى لا يقل عن (B2) لضمان الاستجابة السريعة والدقة أثناء الترجمة الشفهية." },
      q2: { q: "ما هي فرص ومجالات العمل المتاحة بعد التخرج؟", a: "الفرص واسعة ومتوفرة بكثرة في كلا المجالين (التحريري والفوري). يمكنك العمل بنظام الدوام الكامل (Full-time)، أو الدوام الجزئي (Part-time) أو العمل كـفريلانسر (Freelancer) مع شركات ترجمة محلية ودولية ومستشفيات ومؤسسات دولية من أي مكان في العالم." },
      q3: { q: "هل أحصل على شهادة بعد اجتياز الدبلومة؟", a: "نعم، ستحصل على شهادات معتمدة توثق مجهودك: <br>في الدبلومة التحريرية: ستحصل على شهادتين؛ الأولى تثبت حضورك وإنهاءك للمحاضرات النظرية، والثانية ستحصل عليها بعد اجتياز الاختبار العملي بنجاح لتثبت كفاءتك.<br>في الدبلومة الفورية: ستحصل على شهادة رسمية بإتمام 80 ساعة تدريبية مكثفة تؤهلك للممارسة الفورية." },
      q4: { q: "هل المحاضرات ستكون متوفرة ومسجلة بعد انتهاء فترة الدبلومة؟", a: "نعم، بالتأكيد. جميع المحاضرات يتم تسجيلها ورفعها بجودة عالية، وتظل متوفرة لك لتستطيع الرجوع إليها ومشاهدتها في أي وقت تشاء ومن أي مكان، لضمان استمرارية الاستفادة والمراجعة." },
      q5: { q: "هل يتوفر دعم وتواصل مع المحاضرين خلال الدبلومة وبعد انتهائها؟", a: "نعم، الدعم الفني والأكاديمي مستمر طوال الوقت. يمكنك التواصل مع المحاضرين والمدربين عند مواجهة أي مشكلة أو للاستفسار عن أي نقطة، سواء أثناء فترة الدراسة أو حتى بعد تخرجك وانطلاقك في سوق العمل؛ نحن معك خطوة بخطوة." },
      q6: { q: "هل الدبلومة مقتصرة فقط على خريجي الكليات الطبية؟", a: "لا، الدبلومة متاحة للجميع. سواء كنت خريجاً لكليات طبية (طب، صيدلة، تمريض، علوم) أو خريجاً لكليات اللغات والترجمة والآداب، أو حتى محباً للمجال وتريد تغيير مسارك المهني. نحن نبدأ معك من الصفر في شرح المصطلحات الطبية وتبسيطها لتناسب كافة الخلفيات الدراسية." },
      q7: { q: "هل سنتعلم استخدام أدوات الترجمة بمساعدة الحاسوب (CAT Tools) في دبلومة الترجمة الطبية التحريرية بالذكاء الاصطناعي؟", a: "نعم، بالتأكيد (في الدبلومة التحريرية). يتضمن التدريب العملي شرحاً تطبيقياً لأهم برامج وأدوات الترجمة الاحترافية التي تطلبها الشركات العالمية مثل (Trados و MemoQ)، بالإضافة إلى كيفية دمج الذكاء الاصطناعي في سير عملك كمترجم محترف (MTPE) لتزيد من سرعتك وإنتاجيتك." },
      q8: { q: "كيف يتم التدريب العملي في دبلومة الترجمة الفورية؟", a: "التدريب في الدبلومة الفورية يعتمد على \"المحاكاة الحية\"؛ حيث يتم تدريبك على مواقف حقيقية داخل العيادات والمستشفيات، والمؤتمرات الطبية عبر الإنترنت، والترجمة عبر الهاتف والفيديو (VRI & OPI)، مع تزويدك بتقنيات أخذ الملاحظات السريعة والتحكم في التوتر." },
      q9: { q: "ما الذي يميز هذه الدبلومة عن أي كورسات ترجمة أخرى؟", a: "* ما يميزنا هو \"الواقعية والعملية\". نحن لا نمنحك مجرد مصطلحات للحفظ، بل ننقل لك خبرة سوق العمل الحقيقية، ونوفر لك بيئة تدريب تفاعلية، ودعماً مستمراً، مع التركيز على مهارات \"البيزنس والتسويق\" للمترجم، وهي الحلقة المفقودة في معظم الدورات الأخرى والتي تضمن لك كسب دخل مادي مميز بالعملات الأجنبية." },
      q10: { q: "هل توجد تطبيقات ومشاريع عملية خلال فترة الدبلومة؟", a: "نعم، وبشكل مكثف. منهجنا لا يعتمد على التلقين النظري، بل يقوم في أساسه على التطبيق العملي. طوال فترة الدبلومة ستعمل على مشاريع وتدريبات تحاكي تماماً سوق العمل، مما يساعدك على اكتساب الخبرة الفعلية وبناء معرض أعمال (Portfolio) قوي ومحترف تقدمه للعملاء بثقة عند التخرج." },
      q11: { q: "هل أحتاج إلى خبرة سابقة في مجال الترجمة للالتحاق بالدبلومة؟", a: "لا يشترط وجود أي خبرة سابقة. الدبلومة مصممة لتأخذ بيدك خطوة بخطوة؛ حيث نبدأ من الأساسيات والقواعد الأولية للترجمة الطبية، ثم ننتقل تدريجياً وبتسلسل مدروس نحو المستويات المتقدمة والاحترافية، مما يضمن لك اكتساب كافة المهارات والتقنيات اللازمة لتصبح مترجماً محترفاً حتى لو كانت هذه تجربتك الأولى." },
      q12: { q: "هل يمكنني الالتحاق بالدبلومة وحضور المحاضرات من خارج مصر؟", a: "نعم، بكل تأكيد. جميع دبلوماتنا تُقدم أونلاين (Online) بالكامل عبر منصات تفاعلية متطورة. يمكنك الحضور والمشاركة والتفاعل مع المحاضرين، والاستفادة من كافة التدريبات والمزايا والدعم الفني والدراسي من أي دولة في العالم وبمرونة تامة تناسب وقتك." },
    },
    cta: {
      title: "هل أنت جاهز للبدء؟",
      desc: "انضم إلى آلاف المتدربين الذين غيّروا مساراتهم المهنية مع MedSky",
      button: "تواصل معنا عبر الواتساب",
    },
    footer: {
      brandDesc: "الأكاديمية الرائدة عبر الإنترنت لتطوير الكوادر الطبية.. نمنحك الأدوات الذكية لتَقود مسيرتك المهنية بثقة وتميز",
      academyHeading: "الأكاديمية",
      certificates: "الشهادات",
      blog: "المدونة",
      supportHeading: "الدعم",
      helpCenter: "مركز المساعدة",
      communityForum: "منتدى المجتمع",
      legalHeading: "القانونية",
      cookiePolicy: "سياسة الكوكيز",
      refundPolicy: "سياسة الاسترداد",
      accessibility: "إمكانية الوصول",
      country: "مصر",
      copyright: "&copy; 2026 MedSky للتدريب الطبي. جميع الحقوق محفوظة.",
    },
  },

  en: {
    meta: { title: "MedSky Training Academy" },
    nav: {
      home: "Home",
      courses: "Courses",
      programs: "Toward Mastery",
      programsShort: "Programs",
      trainers: "Trainers",
      contact: "Contact Us",
      signup: "Start Free",
    },
    theme: { light: "Light", dark: "Dark" },
    mobile: { appearance: "Appearance", language: "Language", login: "Log In" },
    hero: {
      badge: "Comprehensive Training Tracks",
      title1: "Turn Your Passion for Medicine",
      title2: "Into Real Leadership.",
      desc: "Your strongest digital destination for developing and qualifying healthcare talent. Specialized programs supervised by leaders and experts in the medical field, designed to give you exceptional competence that makes you the top choice in the job market.",
      explore: "Explore the Courses",
      trustText: "medical specialists registered from around the world",
      scrollHint: "Scroll to explore",
    },
    marquee: {
      "1": "Accredited medical translation",
      "2": "3+ specialized courses",
      "3": "Trainers who are doctors and translators",
      "4": "Learn at your own pace",
      "5": "Lifetime access",
      "6": "Community of 5,000+ translators",
      "7": "Live and recorded lectures",
    },
    stats: {
      trainees: "trainees worldwide",
      courses: "specialized courses",
      trainers: "expert trainers",
      satisfaction: "satisfaction rate",
    },
    why: {
      tag: "Why MedSky?",
      title1: "Your all-in-one platform..",
      title2: "The leading academy for training and developing healthcare talent",
      subtitle: "Your first platform for building a limitless career",
      card1: { title: "Accredited Programs", desc: "All programs are internationally accredited and recognized by major translation and healthcare organizations worldwide." },
      card2: { title: "Expert Trainers", desc: "Learn from practicing physicians, licensed translators, and medical linguistics experts with decades of field experience." },
      card3: { title: "Flexible Online Learning", desc: "Learn at your own pace through video lectures, live sessions, and asynchronous discussion boards." },
      card4: { title: "Hands-on Training", desc: "Practical applications, simulation models, and real assessments that prepare you to overcome challenges and master your specialty with confidence." },
      card5: { title: "Ongoing Support & Follow-up", desc: "Get continuous support and guidance from trainers and the academy team throughout your studies to ensure you get the most benefit." },
      card6: { title: "Employment Community", desc: "Exclusive access to a group featuring job, training, and project opportunities suited to diploma graduates." },
    },
    courses: {
      tag: "Featured Courses",
      title1: "Start Your Journey",
      title2: "With MedSky",
      subtitle: "Comprehensive curricula... hands-on training... and a career you build with confidence",
      badge: "Comprehensive",
      card1: { hours: "60 hours", level: "Advanced", title: "Written Medical Translation Diploma", desc: "A complete program combining the theoretical track (60 hours) and the practical track to build a professional medical translator.", reviews: "(1.2k reviews)" },
      card2: { hours: "80 hours", level: "Advanced", title: "Comprehensive Medical Interpreting Diploma", desc: "An intensive program integrating language skill, professional protocol, and live practical training.", reviews: "(980 reviews)" },
      enroll: "Enroll Now",
      viewAll: "View All Courses",
    },
    process: {
      tag: "How It Works",
      title1: "Your path to becoming",
      title2: "a Certified Medical Translator",
      step1: { title: "Register & Begin", desc: "Start your learning journey, set your goals, and discover your strengths through our initial assessment." },
      step2: { title: "Dive Deep", desc: "Gain knowledge from its sources, and follow specialized lectures that light your way toward the job market." },
      step3: { title: "Master It", desc: "Apply your skill to real exercises, and refine your translation style under the guidance of top experts." },
      step4: { title: "Shine", desc: "Earn your international accreditation, and let your certificate prove your competence in the global job market." },
    },
    benefits: {
      tag: "Benefits",
      title1: "Everything You Need",
      title2: "to Succeed",
      subtitle: "We designed every aspect of MedSky to remove obstacles and accelerate your growth as a professional medical translator.",
      item1: { title: "100% Online Learning", desc: "Study from anywhere in the world with an internet connection — no commuting, no university fees." },
      item2: { title: "Lifetime Access", desc: "Pay once, access course materials, updates, and new content forever." },
      item3: { title: "Downloadable Resources", desc: "Glossaries, reference sheets, sample documents, and study guides available offline." },
      item4: { title: "Expert Support", desc: "Get answers from trainers and mentors within 24 hours via the support portal." },
      item5: { title: "Employment Community", desc: "Exclusive access to a group featuring job, training, and project opportunities suited to diploma graduates." },
      badge: { title: "Lifetime Access", desc: "Learn at your own pace" },
    },
    trainers: {
      tag: "Training Team",
      title1: "Learn From",
      title2: "Certified Doctors and Translators",
      subtitle: "Our trainers aren't just academics — they're field practitioners who combine medical expertise with linguistic proficiency.",
      rating: "5.0 rating",
      t1: { role: "Physician & Written Medical Translator", name: "Dr. Hamza Ayyash", desc: "A physician and written medical translator with over 6 years of experience in medical translation and training, and founder of MedSky Academy, where he has helped train and qualify hundreds of medical translators according to international professional standards.", students: "700+ students", courses: "18 courses" },
      t2: { role: "Physician & Medical Interpreter", name: "Dr. Hamed Hamad", desc: "A physician and trainer in medical interpreting with over 3 years of experience, specializing in qualifying medical translators and equipping them with the practical skills needed to handle various medical communication scenarios professionally.", students: "300+ students", courses: "12 courses" },
    },
    testi: {
      tag: "Reviews & Experiences",
      title1: "Competence and professionalism recognized",
      title2: "by medical field specialists around the world",
      list: [
        { name: "Sara Abdullah", role: "Written Medical Translator, Egypt", text: "The diploma completely changed my career path — the content is very practical and the trainers are wonderfully responsive.", gender: "f" },
        { name: "Ahmed Alzahrani", role: "Medical Interpreter, Saudi Arabia", text: "Very realistic training on real scenarios, I felt ready for the job market from day one.", gender: "m" },
        { name: "Reem Alshammari", role: "Written Diploma Graduate, Kuwait", text: "The practical track was a turning point — I learned CAT Tools no one had taught me before.", gender: "f" },
        { name: "Mahmoud Ezzat", role: "Medical Translator, Jordan", text: "The continuous support from the academy even after graduation is something rare in any other course.", gender: "m" },
        { name: "Heba Youssef", role: "Medical Interpreter, Palestine", text: "I benefited a lot from the live simulation sessions, my confidence in my skills grew a lot.", gender: "f" },
        { name: "Khaled Ibrahim", role: "Written Medical Translator, Iraq", text: "The content is organized and professional, and easy to follow even with a busy schedule.", gender: "m" },
        { name: "Mariam Alnajjar", role: "Interpreting Diploma Graduate, Lebanon", text: "The trainers are real doctors, which added great depth to my understanding of medical terminology.", gender: "f" },
        { name: "Omar Alsayed", role: "Freelance Medical Translator, Egypt", text: "After the diploma I was able to work with global translation companies and my income increased noticeably.", gender: "m" },
      ],
    },
    faq: {
      tag: "Frequently Asked Questions",
      title1: "Frequently Asked",
      title2: "Questions",
      q1: { q: "What English level is required to join the diploma?", a: "Written medical translation: does not require a very high or difficult level; a normal level is enough to start, as we focus on building terminology and writing skills.<br>Medical interpreting: due to the live, direct-communication nature of the work, it requires a level of at least B2 to ensure quick, accurate responses during oral interpreting." },
      q2: { q: "What job opportunities are available after graduation?", a: "Opportunities are wide and plentiful in both fields (written and interpreting). You can work full-time, part-time, or as a freelancer with local and international translation companies, hospitals, and international institutions from anywhere in the world." },
      q3: { q: "Do I get a certificate after completing the diploma?", a: "Yes, you'll receive accredited certificates documenting your effort: in the written diploma you'll receive two certificates — one confirming your attendance and completion of the theoretical lectures, and the second after successfully passing the practical exam. In the interpreting diploma, you'll receive an official certificate for completing 80 intensive training hours that qualify you for interpreting practice." },
      q4: { q: "Will lectures remain available and recorded after the diploma ends?", a: "Yes, absolutely. All lectures are recorded and uploaded in high quality, and remain available for you to revisit and watch anytime, from anywhere, to ensure continued benefit and review." },
      q5: { q: "Is there support and communication with instructors during and after the diploma?", a: "Yes, technical and academic support is available at all times. You can reach out to instructors and trainers whenever you face an issue or have a question, whether during your studies or even after graduating and entering the job market — we're with you every step of the way." },
      q6: { q: "Is the diploma limited to medical college graduates only?", a: "No, the diploma is open to everyone — whether you're a graduate of medical colleges (medicine, pharmacy, nursing, science) or of languages, translation, and arts colleges, or simply someone passionate about the field wanting to change their career path. We start with you from scratch, explaining and simplifying medical terminology to suit all academic backgrounds." },
      q7: { q: "Will we learn to use CAT Tools in the written medical translation diploma?", a: "Yes, absolutely (in the written diploma). The practical training includes hands-on instruction in the leading professional translation tools required by global companies, such as Trados and MemoQ, in addition to how to integrate AI into your workflow as a professional translator (MTPE) to increase your speed and productivity." },
      q8: { q: "How is practical training conducted in the interpreting diploma?", a: "Training in the interpreting diploma relies on \"live simulation\"; you're trained on real situations inside clinics and hospitals, online medical conferences, and phone/video interpreting (VRI & OPI), along with quick note-taking techniques and stress-management skills." },
      q9: { q: "What sets this diploma apart from other translation courses?", a: "What sets us apart is \"realism and practicality.\" We don't just give you terms to memorize — we pass on real job-market experience, provide an interactive training environment and ongoing support, with a focus on \"business and marketing\" skills for translators, which is the missing link in most other courses and what secures you a distinguished income in foreign currency." },
      q10: { q: "Are there hands-on applications and projects during the diploma?", a: "Yes, intensively. Our curriculum doesn't rely on theoretical instruction alone — it's fundamentally built on practical application. Throughout the diploma, you'll work on projects and exercises that closely simulate the job market, helping you gain real experience and build a strong, professional portfolio to confidently present to clients upon graduation." },
      q11: { q: "Do I need prior translation experience to join the diploma?", a: "No prior experience is required. The diploma is designed to guide you step by step, starting from the fundamentals and basic rules of medical translation, then gradually progressing through a well-planned sequence toward advanced, professional levels — ensuring you gain all the skills and techniques needed to become a professional translator, even if this is your first experience." },
      q12: { q: "Can I join the diploma and attend lectures from outside Egypt?", a: "Yes, absolutely. All our diplomas are delivered fully online through advanced interactive platforms. You can attend, participate, and interact with instructors, and benefit from all the training, features, and technical/academic support from any country in the world, with full flexibility that suits your schedule." },
    },
    cta: {
      title: "Ready to Get Started?",
      desc: "Join thousands of trainees who changed their careers with MedSky",
      button: "Contact Us via WhatsApp",
    },
    footer: {
      brandDesc: "The leading online academy for developing medical talent.. giving you the smart tools to lead your career with confidence and excellence",
      academyHeading: "Academy",
      certificates: "Certificates",
      blog: "Blog",
      supportHeading: "Support",
      helpCenter: "Help Center",
      communityForum: "Community Forum",
      legalHeading: "Legal",
      cookiePolicy: "Cookie Policy",
      refundPolicy: "Refund Policy",
      accessibility: "Accessibility",
      country: "Egypt",
      copyright: "&copy; 2026 MedSky Medical Training. All rights reserved.",
    },
  },
};

const LANG_META = {
  ar: { dir: "rtl", flag: "🇸🇦", label: "العربية" },
  en: { dir: "ltr", flag: "🇬🇧", label: "English" },
};

const LANG_KEY = "medsky-lang";
const THEME_KEY = "medsky-theme";

(function () {
  "use strict";

  let currentLang = "ar";
  const root = document.documentElement;

  function resolveKey(dict, key) {
    const parts = key.split(".");
    let node = dict;
    for (const part of parts) {
      if (node == null) return undefined;
      node = node[part];
    }
    return node;
  }
  function t(key) {
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.ar;
    const value = resolveKey(dict, key);
    return value !== undefined ? value : key;
  }

  /* ---------- 1) اللودر ---------- */
  const siteLoader = document.getElementById("siteLoader");
  function hideLoader() {
    if (!siteLoader) return;
    siteLoader.classList.add("loader-hide");
    setTimeout(() => siteLoader.remove(), 600);
  }
  const loaderStart = performance.now();
  const MIN_LOADER_TIME = 700;
  function finishLoader() {
    const elapsed = performance.now() - loaderStart;
    const remaining = Math.max(MIN_LOADER_TIME - elapsed, 0);
    setTimeout(hideLoader, remaining);
  }
  if (document.readyState === "complete") {
    finishLoader();
  } else {
    window.addEventListener("load", finishLoader);
  }
  setTimeout(finishLoader, 3500); // شبكة أمان: يشيل اللودر خلال 3.5 ثانية كحد أقصى مهما صار

  /* ---------- 2) الوضع الليلي/الفاتح (زر أيقونة واحد: شمس ⇄ قمر) ---------- */
  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    const mobileVal = document.getElementById("mobileThemeValue");
    if (mobileVal) mobileVal.textContent = t(theme === "dark" ? "theme.dark" : "theme.light");
  }
  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) applyTheme(saved);
    else applyTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }
  function toggleTheme() {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  }
  ["themeToggle", "mobileThemeToggle"].forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener("click", toggleTheme);
  });

  /* ---------- 3) الترجمة ---------- */
  function applyTranslations(lang) {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.ar;

    document.title = resolveKey(dict, "meta.title");

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = resolveKey(dict, key);
      if (value !== undefined) el.innerHTML = value;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const value = resolveKey(dict, el.getAttribute("data-i18n-placeholder"));
      if (value !== undefined) el.setAttribute("placeholder", value);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const value = resolveKey(dict, el.getAttribute("data-i18n-aria"));
      if (value !== undefined) el.setAttribute("aria-label", value);
    });

    const heroExploreIcon = document.getElementById("heroExploreIcon");
    const coursesCtaIcon = document.getElementById("coursesCtaIcon");
    [heroExploreIcon, coursesCtaIcon].forEach((icon) => {
      if (!icon) return;
      icon.classList.remove("fa-arrow-left", "fa-arrow-right");
      icon.classList.add(lang === "en" ? "fa-arrow-right" : "fa-arrow-left");
    });

    const mobileThemeVal = document.getElementById("mobileThemeValue");
    if (mobileThemeVal) {
      const activeTheme = root.getAttribute("data-theme") || "light";
      mobileThemeVal.textContent = resolveKey(dict, activeTheme === "dark" ? "theme.dark" : "theme.light");
    }
  }

  function updateLanguage(lang) {
    if (!TRANSLATIONS[lang]) lang = "ar";
    currentLang = lang;
    const meta = LANG_META[lang] || LANG_META.ar;

    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", meta.dir);

    document.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });

    applyTranslations(lang);
    buildTestimonials();
    localStorage.setItem(LANG_KEY, lang);
  }

  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      updateLanguage(btn.getAttribute("data-lang"));
      closeAllDropdowns();
    });
  });

  /* ---------- 4) قائمة اللغة (أيقونة + Dropdown) ---------- */
  const dropdowns = [
    { trigger: "langToggle", menu: "langMenu", parent: "langDD" },
  ];
  function closeAllDropdowns() {
    dropdowns.forEach(({ trigger, menu, parent }) => {
      const tEl = document.getElementById(trigger);
      const m = document.getElementById(menu);
      const p = document.getElementById(parent);
      if (m) m.classList.remove("open");
      if (tEl) tEl.setAttribute("aria-expanded", "false");
      if (p) p.classList.remove("open-state");
    });
  }
  dropdowns.forEach(({ trigger, menu, parent }) => {
    const tEl = document.getElementById(trigger);
    const m = document.getElementById(menu);
    const p = document.getElementById(parent);
    if (!tEl || !m) return;
    tEl.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = m.classList.contains("open");
      closeAllDropdowns();
      if (!isOpen) {
        m.classList.add("open");
        tEl.setAttribute("aria-expanded", "true");
        if (p) p.classList.add("open-state");
      }
    });
  });
  document.addEventListener("click", closeAllDropdowns);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAllDropdowns(); });

  /* ---------- 5) القائمة الجوالة (لوحة عائمة) ---------- */
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileClose = document.getElementById("mobileClose");

  function openMobileMenu() {
    if (!mobileMenu || !hamburger) return;
    mobileMenu.classList.add("open");
    hamburger.classList.add("active");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeMobileMenu() {
    if (!mobileMenu || !hamburger) return;
    mobileMenu.classList.remove("open");
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  if (hamburger) hamburger.addEventListener("click", () => {
    mobileMenu.classList.contains("open") ? closeMobileMenu() : openMobileMenu();
  });
  if (mobileClose) mobileClose.addEventListener("click", closeMobileMenu);
  if (mobileMenu) mobileMenu.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", closeMobileMenu));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu && mobileMenu.classList.contains("open")) closeMobileMenu();
  });

  /* ---------- 6) الناف بار عند التمرير + تحديد القسم النشط ---------- */
  const navbar = document.getElementById("navbar");
  const navSpySections = [
    ["hero", "home"],
    ["courses", "courses"],
    ["programs", "programs"],
    ["trainers", "trainers"],
    ["testimonials", ""],
  ];
  let navSpyCurrent = null;
  function updateNavSpy() {
    let current = "home";
    navSpySections.forEach(([sectionId, navId]) => {
      const el = document.getElementById(sectionId);
      if (el && el.getBoundingClientRect().top <= 140) current = navId;
    });
    if (current === navSpyCurrent) return;
    navSpyCurrent = current;
    document.querySelectorAll("[data-nav]").forEach((a) => {
      if (a.getAttribute("data-nav") === current) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }
  function onScrollNav() {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 24);
    updateNavSpy();
  }
  window.addEventListener("scroll", onScrollNav, { passive: true });
  window.addEventListener("resize", updateNavSpy);
  onScrollNav();

  /* ---------- 7) حركات الظهور ---------- */
  const revealEls = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");
  if ("IntersectionObserver" in window) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.getAttribute("data-delay")) || 0;
          setTimeout(() => entry.target.classList.add("visible"), delay);
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach((el) => revealObs.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  /* ---------- 8) ripple ---------- */
  document.querySelectorAll(".btn-ripple").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height);
      ripple.className = "ripple-el";
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ---------- 9) عداد الإحصائيات ---------- */
  function animateCount(el, target, duration) {
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }
  const statsSection = document.getElementById("stats");
  if (statsSection && "IntersectionObserver" in window) {
    const statNumbers = statsSection.querySelectorAll(".stat-number");
    const statsObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          statNumbers.forEach((el) => {
            const target = parseInt(el.getAttribute("data-target"), 10) || 0;
            animateCount(el, target, 1300);
          });
          statsObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    statsObs.observe(statsSection);
  }

  /* ---------- 10) أكورديون الأسئلة الشائعة ---------- */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    if (!question || !answer) return;
    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove("open");
          openItem.querySelector(".faq-answer").style.maxHeight = null;
          openItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        }
      });
      item.classList.toggle("open", !isOpen);
      question.setAttribute("aria-expanded", String(!isOpen));
      answer.style.maxHeight = !isOpen ? answer.scrollHeight + "px" : null;
    });
  });

  /* ---------- 11) مودال الفوتر ---------- */
  const MODAL_KEYS = {
    "courses": { icon: "fa-graduation-cap", titleKey: "nav.courses", bodyKey: null },
    "programs": { icon: "fa-layer-group", titleKey: "nav.programs", bodyKey: null },
    "certificates": { icon: "fa-certificate", titleKey: "footer.certificates", bodyKey: null },
    "blog": { icon: "fa-newspaper", titleKey: "footer.blog", bodyKey: null },
    "help-center": { icon: "fa-circle-question", titleKey: "footer.helpCenter", bodyKey: null },
    "community-forum": { icon: "fa-people-group", titleKey: "footer.communityForum", bodyKey: null },
    "contact-us": { icon: "fa-envelope", titleKey: "nav.contact", bodyKey: null },
    "cookie-policy": { icon: "fa-cookie-bite", titleKey: "footer.cookiePolicy", bodyKey: null },
    "refund-policy": { icon: "fa-rotate-left", titleKey: "footer.refundPolicy", bodyKey: null },
    "accessibility": { icon: "fa-universal-access", titleKey: "footer.accessibility", bodyKey: null },
  };
  const MODAL_BODY_FALLBACK = {
    ar: {
      "courses": "تعرّف على دبلومتي الترجمة الطبية التحريرية والفورية من خلال قسم الدورات.",
      "programs": "مسار متكامل يرافقك من التعلّم حتى الاحتراف.",
      "certificates": "شهادات معتمدة دولياً تُمنح بعد اجتياز المسار النظري والعملي.",
      "blog": "محتوى تعريفي حول عالم الترجمة الطبية سيتم إضافته قريباً.",
      "help-center": "لأي استفسار حول الدبلومات أو التسجيل، تواصل مع فريقنا عبر واتساب.",
      "community-forum": "انضم لمجتمع خريجي ميدسكاي وشارك الخبرات وفرص العمل.",
      "contact-us": "يمكنكم التواصل معنا عبر واتساب على الرقم +20 15 05628143.",
      "cookie-policy": "يستخدم موقعنا ملفات تعريف الارتباط لتحسين تجربتك أثناء التصفح.",
      "refund-policy": "لأي استفسار حول سياسة الاسترداد، تواصل مباشرة مع فريق الدعم.",
      "accessibility": "نحرص على أن تكون منصتنا متاحة وسهلة الاستخدام لجميع المتدربين.",
    },
    en: {
      "courses": "Learn about our Written and Interpreting medical translation diplomas through the Courses section.",
      "programs": "An integrated path that walks with you from learning to mastery.",
      "certificates": "Internationally accredited certificates awarded after passing the theoretical and practical tracks.",
      "blog": "Introductory content about the world of medical translation will be added soon.",
      "help-center": "For any question about the diplomas or registration, reach our team via WhatsApp.",
      "community-forum": "Join the MedSky graduate community and share experience and job opportunities.",
      "contact-us": "You can reach us via WhatsApp at +20 15 05628143.",
      "cookie-policy": "Our website uses cookies to improve your browsing experience.",
      "refund-policy": "For any question about the refund policy, please contact the support team directly.",
      "accessibility": "We're committed to making our platform accessible and easy to use for all trainees.",
    },
  };

  const footerModalOverlay = document.getElementById("footerModalOverlay");
  const footerModalIcon = document.getElementById("footerModalIcon");
  const footerModalTitle = document.getElementById("footerModalTitle");
  const footerModalBody = document.getElementById("footerModalBody");
  const footerModalClose = document.getElementById("footerModalClose");
  let currentModalKey = null;

  function renderFooterModal(key) {
    const cfg = MODAL_KEYS[key];
    if (!cfg) return;
    if (footerModalIcon) footerModalIcon.innerHTML = `<i class="fa-solid ${cfg.icon}"></i>`;
    if (footerModalTitle) footerModalTitle.textContent = t(cfg.titleKey);
    const body = (MODAL_BODY_FALLBACK[currentLang] || MODAL_BODY_FALLBACK.ar)[key] || "";
    if (footerModalBody) footerModalBody.innerHTML = `<p>${body}</p>`;
  }
  function openFooterModal(key) {
    if (!MODAL_KEYS[key] || !footerModalOverlay) return;
    currentModalKey = key;
    renderFooterModal(key);
    footerModalOverlay.classList.add("open");
  }
  function closeFooterModal() {
    if (footerModalOverlay) footerModalOverlay.classList.remove("open");
    currentModalKey = null;
  }
  document.querySelectorAll("[data-modal]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      openFooterModal(link.getAttribute("data-modal"));
    });
  });
  if (footerModalClose) footerModalClose.addEventListener("click", closeFooterModal);
  if (footerModalOverlay) footerModalOverlay.addEventListener("click", (e) => {
    if (e.target === footerModalOverlay) closeFooterModal();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeFooterModal(); });

  /* ---------- 12) زر العودة للأعلى ---------- */
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", () => backToTop.classList.toggle("show", window.scrollY > 360), { passive: true });
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ---------- 13) تمرير سلس ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  /* ---------- 14) قسم آراء وتجارب: شريطين يتحركان تلقائياً بعكس بعض (بطاقات موحّدة بدون صور) ---------- */
  function starsHtml() {
    return '<i class="fa-solid fa-star"></i>'.repeat(5);
  }

  function initialsFor(name) {
    const clean = (name || "").trim();
    return clean ? clean.charAt(0).toUpperCase() : "•";
  }

  function testiCardHtml(item) {
    return `
      <div class="testi-card">
        <div class="testi-card-top">
          <div class="stars">${starsHtml()}</div>
          <i class="fa-solid fa-quote-right testi-quote"></i>
        </div>
        <p>${item.text}</p>
        <div class="testi-author">
          <div class="testi-avatar">${initialsFor(item.name)}</div>
          <div><strong>${item.name}</strong><span>${item.role}</span></div>
        </div>
      </div>`;
  }

  function buildTestimonials() {
    const container = document.getElementById("testiRowsContainer");
    if (!container) return;

    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.ar;
    const list = (dict.testi && dict.testi.list) || TRANSLATIONS.ar.testi.list;
    if (!list || !list.length) return;

    const half = Math.ceil(list.length / 2);
    const rowA = list.slice(0, half);
    const rowB = list.slice(half);

    const rowAHtml = rowA.map((item) => testiCardHtml(item)).join("");
    const rowBHtml = rowB.map((item) => testiCardHtml(item)).join("");

    container.innerHTML = `
      <div class="testi-track dir-left">${rowAHtml}${rowAHtml}</div>
      <div class="testi-track dir-right">${rowBHtml}${rowBHtml}</div>
    `;
  }

  /* ---------- 15) الانتقال لصفحة الدورة عند الضغط على الكارد ---------- */
  document.querySelectorAll(".course-card[data-course-link]").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("a")) return; // زر "سجّل الآن" يبقى يفتح واتساب عادي
      const link = card.getAttribute("data-course-link");
      if (link) window.location.href = link;
    });
  });

  /* ---------- التشغيل الأولي ---------- */
  const savedLang = localStorage.getItem(LANG_KEY) || "ar";
  initTheme();
  updateLanguage(savedLang);
  if (currentModalKey) renderFooterModal(currentModalKey);
})();