document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('darkModeToggle');
    const langToggle = document.getElementById('langToggle');
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    const html = document.documentElement;
    const bootstrapCss = document.getElementById('bootstrapCss');

    const projectsGrid = document.getElementById('projectsGrid');
    const blogArticlesGrid = document.getElementById('blogArticlesGrid');
    const newsletterForm = document.getElementById('blogNewsletterForm');

    const savedTheme = localStorage.getItem('amrDigitalSpaceTheme');
    const savedLang = localStorage.getItem('amrDigitalSpaceLang') || 'ar';

    const BOOTSTRAP_CSS = {
        ar: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css',
        en: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'
    };

    const fallbackImage = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80";

    const workImages = {
        interior: 'photo_4_2026-06-12_18-01-44.jpg',
        fashion: 'photo_3_2026-06-12_18-01-44.jpg',
        ai: 'photo_2026-06-12_18-02-01.jpg',
        analytics: 'photo_2026-06-12_18-01-59.jpg'
    };

    const translations = {
        ar: {
            navHome: 'الرئيسية',
            navWorks: 'المعرض',
            navCalc: 'الحاسبة',
            navConsult: 'الاستشارة',
            navBlog: 'المدونة',
            navProducts: 'معرض المنتجات',
            navCalculator: 'الحاسبة',
            navConsultation: 'الاستشارة',
            heroTitle: 'معلومات عني',
            heroText: 'أنا عمرو الجنيات، طالب هندسة معلوماتية ومطور واجهات أمامية وخلفية. أقوم بصنع الواجهات وتقديم أفضل تجربة للمستخدم وفق أحدث معايير الويب العالمية.',
            heroReadMoreBtn: 'اقرأ المزيد',
            heroReadLessBtn: 'أقل',
            heroReadMoreContent: 'أستخدم تقنيات حديثة في بناء واجهات سريعة الاستجابة، وأهتم بتحسين الأداء وسهولة الاستخدام وتجربة المستخدم الشاملة على الويب.',
            heroCtaPages: 'استعرض الصفحات',
            heroImageAlt: 'تصميم توضيحي لموقع AmrDigitalSpace',
            statResponsive: 'تجاوب',
            statInteraction: 'تفاعل لكل صفحة',
            aboutLabel: 'لماذا هذا التصميم',
            aboutTitle: 'واجهة بسيطة لكن مرتبة ومهنية',
            aboutText: 'الهدف هو أن تبدو الصفحة الأولى كمدخل واضح للمشروع، مع توزيع منطقي للعناصر، ومساحات مريحة، وألوان هادئة، وتدرج بصري يجذب دون ازدحام.',
            featureCss: 'ألوان وخطوط وهوامش مخصصة',
            featureJs: 'تفاعل بسيط وواضح لكل صفحة',
            worksLabel: 'معرض أعمال',
            worksTitle: 'بطاقات أعمال حديثة تعرض المشاريع بأسلوب بصري غني',
            worksText: 'قسم مخصص لعرض الأعمال بشكل شبكي أنيق، مع صور محسنة، بطاقات ناعمة، ولمسات تفاعلية تجعل العرض أوضح وأكثر جاذبية.',
            blogMainTitle: 'المقالات والتدوينات العالمية',
            blogMainDesc: 'تصفح أحدث المقالات المنتشرة عالمياً حول التقنية، السياسة، الاقتصاد والمناخ لعام ٢٠٢٦.',
            newsletterTitle: 'اشترك في نشرتنا الإخبارية',
            newsletterDesc: 'احصل على تنبيهات فورية فور نشر مقالات جديدة مباشرة في بريدك الإلكتروني.',
            subscribeBtn: 'اشتراك',
            subscribeSuccess: 'شكراً لاشتراكك! تم تسجيل بريدك بنجاح.',
            readMore: 'قراءة المزيد ←',
            toastMessage: 'جاري الانتقال إلى حسابنا على منصة ',
            cartAddedSuccess: '✅ تمت إضافة المنتج إلى السلة بنجاح!',
            cartOffcanvasTitle: '🛍️ سلة التسوق الخاصة بك',
            cartEmpty: 'السلة فارغة تماماً. أضف بعض المنتجات المتميزة لبدء التسوق!',
            checkoutButton: '✓ تأكيد طلب المشتريات',
            orderConfirmed: '🎉 تم استلام وتأكيد طلب الشراء بنجاح! سيقوم عمرو جنيات بالتواصل معك قريباً.',
            removeButton: 'حذف 🗑️',
            addToCartButton: 'أضف للسلة 🛒',
            cartTotalLabel: 'الإجمالي التقديري:',
            productsHeaderDesc: 'تصفح واقتنِ أكثر من 100 منتج متنوع؛ يشمل كورسات برمجية، أدوات تقنية، معدات مكتبية، وكتب تطوير الذات.',
            mainNavAria: 'التنقل الرئيسي',
            toggleNavAria: 'تبديل التنقل',
            toggleLangAria: 'تبديل اللغة',
            toggleThemeAria: 'تبديل الوضع الداكن',


            consultTitle: 'طلب استشارة تقنية',
        consultDesc: 'هل لديك فكرة مشروع أو تحتاج إلى مساعدة برمجية؟ املأ النموذج أدناه وسأقوم بالتواصل معك في أقرب وقت.',
        formNameLabel: 'الاسم الكامل <span class="text-danger">*</span>',
        formNamePlaceholder: 'أدخل اسمك',
        formEmailLabel: 'البريد الإلكتروني <span class="text-danger">*</span>',
        formMessageLabel: 'رسالتك / استفسارك <span class="text-danger">*</span>',
        formMessagePlaceholder: 'اكتب تفاصيل مشروعك أو استشارتك هنا...',
        formSubmitBtn: 'إرسال الطلب الآن 🚀',
        formNameError: 'يرجى إدخال اسمك الكامل.',
        formEmailError: 'يرجى إدخال بريد إلكتروني صحيح.',
        formMessageError: 'لا يمكن إرسال استشارة فارغة، يرجى كتابة رسالتك.',
        formNameError: 'يرجى إدخال اسمك الكامل.',
formEmailError: 'يرجى إدخال بريد إلكتروني صحيح.',
formMessageError: 'لا يمكن إرسال استشارة فارغة، يرجى كتابة رسالتك.',
formAlertError: '⚠️ يرجى تصحيح الأخطاء في الحقول المحددة باللون الأحمر قبل الإرسال.',
formAlertSuccess: '✅ تم استلام طلبك بنجاح! سيتم التواصل معك قريباً.',
    footerText: '&copy; <span id="currentYear"></span> جميع الحقوق محفوظة | تم التطوير بواسطة <span class="developer-name">عمرو جنيات</span>',
        },
        en: {
            navHome: 'Home',
            navWorks: 'Portfolio',
            navCalc: 'Calculator',
            navConsult: 'Consultation',
            navBlog: 'Blog',
            navProducts: 'Products Gallery',
            navCalculator: 'Calculator',
            navConsultation: 'Consultation',
            heroTitle: 'About Me',
            heroText: 'I am Amr Al-Jniyat, a computer engineering student and a front-end/back-end developer. I build interfaces and deliver the best user experience according to the latest global web standards.',
            heroReadMoreBtn: 'Read More',
            heroReadLessBtn: 'Read Less',
            heroReadMoreContent: 'I use modern technologies to build fast responsive interfaces, focusing on performance, usability, and a comprehensive user experience on the web.',
            heroCtaPages: 'Browse Pages',
            heroImageAlt: 'Illustrative design for AmrDigitalSpace',
            statResponsive: 'Responsive',
            statInteraction: 'Interaction per page',
            aboutLabel: 'Why This Design',
            aboutTitle: 'Simple Yet Clean & Professional Interface',
            aboutText: 'The goal is for the homepage to serve as a clear entry point to the project, with a logical layout, comfortable spacing, calm colors, and a visual hierarchy that attracts without clutter.',
            featureCss: 'Custom colors, fonts & margins',
            featureJs: 'Simple, clear interaction per page',
            worksLabel: 'Portfolio',
            worksTitle: 'Modern project cards with rich visual display',
            worksText: 'A dedicated section for showcasing work in an elegant grid, with optimized images, smooth cards, and interactive touches for a clearer and more engaging display.',
            blogMainTitle: 'Global Articles & Insights',
            blogMainDesc: 'Browse the latest worldwide trends in Technology, Politics, Economy, and Climate for 2026.',
            newsletterTitle: 'Subscribe to Our Newsletter',
            newsletterDesc: 'Get instant notifications directly in your inbox as soon as new articles are published.',
            subscribeBtn: 'Subscribe',
            subscribeSuccess: 'Thank you for subscribing! Your email has been registered.',
            readMore: 'Read More →',
            toastMessage: 'Navigating to our account on ',
            cartAddedSuccess: '✅ Product added to cart successfully!',
            cartOffcanvasTitle: '🛍️ Your Shopping Cart',
            cartEmpty: 'Your cart is empty. Add some products to get started!',
            checkoutButton: '✓ Confirm Order',
            orderConfirmed: '🎉 Order Confirmed! Amr Jniat will contact you soon.',
            removeButton: 'Remove 🗑️',
            addToCartButton: 'Add To Cart 🛒',
            productsHeaderDesc: 'Browse and purchase over 100 diverse products including programming courses, tech gadgets, office gear, and self-development books.',
            mainNavAria: 'Main Navigation',
            toggleNavAria: 'Toggle Navigation',
            toggleLangAria: 'Toggle Language',
            toggleThemeAria: 'Toggle Dark Mode',

            consultTitle: 'Request Technical Consultation',
        consultDesc: 'Have a project idea or need coding assistance? Fill out the form below and I will get back to you shortly.',
        formNameLabel: 'Full Name <span class="text-danger">*</span>',
        formNamePlaceholder: 'Enter your name',
        formEmailLabel: 'Email Address <span class="text-danger">*</span>',
        formMessageLabel: 'Your Message / Inquiry <span class="text-danger">*</span>',
        formMessagePlaceholder: 'Write your project details or inquiry here...',
        formSubmitBtn: 'Submit Request Now 🚀',
        formNameError: 'Please enter your full name.',
        formEmailError: 'Please enter a valid email address.',
        formMessageError: 'Consultation cannot be empty, please write your message.',
        formNameError: 'Please enter your full name.',
formEmailError: 'Please enter a valid email address.',
formMessageError: 'Consultation cannot be empty, please write your message.',
formAlertError: '⚠️ Please correct the highlighted errors before submitting.',
formAlertSuccess: '✅ Request received successfully! We will contact you soon.',
        footerText: '&copy; <span id="currentYear"></span> All rights reserved | Developed by <span class="developer-name">Amr Jniat</span>',
        cartTotalLabel: 'Estimated Total:',
        }
    };

    const articlesData = [
        {
            badge: 'AI',
            image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600&auto=format&fit=crop&q=80',
            ar: { category: 'ذكاء اصطناعي', date: '١٢ يونيو ٢٠٢٦', title: 'نماذج الذكاء الاصطناعي متعددة الوسائط', excerpt: 'تجاوزت نماذج الذكاء الاصطناعي الحالية مجرد معالجة النصوص، لتصبح قادرة على فهم وتحليل الفيديو والصوت في نفس اللحظة.' },
            en: { category: 'Artificial Intelligence', date: 'June 12, 2026', title: 'Multimodal AI Models in 2026', excerpt: 'Current AI models have advanced beyond text processing to simultaneously understand and analyze video, audio, and live data.' }
        },
        {
            badge: 'AI',
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
            ar: { category: 'ذكاء اصطناعي', date: '١٠ يونيو ٢٠٢٦', title: 'الحوسبة الحافية ورقاقات الذكاء الاصطناعي المحلية', excerpt: 'تتجه الشركات الكبرى لاعتماد معالجة بيانات الذكاء الاصطناعي مباشرة على رقاقات الهواتف الذكية لحفظ الخصوصية المطلقة للمستخدم.' },
            en: { category: 'Artificial Intelligence', date: 'June 10, 2026', title: 'Edge Computing and Local AI Chips', excerpt: 'Major tech companies are shifting toward processing AI data directly on smartphone microchips to guarantee user privacy.' }
        },
        {
            badge: 'AI',
            image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=600&auto=format&fit=crop&q=80',
            ar: { category: 'ذكاء اصطناعي', date: '٠٨ يونيو ٢٠٢٦', title: 'تأثير الذكاء الاصطناعي التوليدي على هندسة البرمجيات', excerpt: 'أصبحت أدوات المساعدة البرمجية قادرة على بناء تطبيقات كاملة من الأوامر الصوتية، مما يعيد تشكيل دور المطور الأساسي.' },
            en: { category: 'Artificial Intelligence', date: 'June 08, 2026', title: 'Generative AI Impact on Software Engineering', excerpt: 'Coding assistants are now building full-stack applications from voice commands, reshuffling the traditional developer role.' }
        },
        {
            badge: 'Economy',
            image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=600&auto=format&fit=crop&q=80',
            ar: { category: 'اقتصاد', date: '٠٥ يونيو ٢٠٢٦', title: 'صعود العملات الرقمية للبنوك المركزية', excerpt: 'تتسارع البنوك المركزية عالمياً لإطلاق نسخها الرقمية المشفرة لتعزيز سرعة وأمان المعاملات المالية الدولية الفورية.' },
            en: { category: 'Economy', date: 'June 05, 2026', title: 'The Rise of Central Bank Digital Currencies', excerpt: 'Central banks worldwide are accelerating their encrypted digital currencies to optimize secure and instant cross-border payments.' }
        },
        {
            badge: 'Economy',
            image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80',
            ar: { category: 'اقتصاد', date: '٠١ يونيو ٢٠٢٦', title: 'أزمة سلاسل الإمداد العالمية وأثرها على التقنية', excerpt: 'أدت التوترات المستجدة في الممرات المائية الحيوية إلى زيادة تكاليف الشحن وتأثر إنتاج بطاريات السيارات الكهربائية.' },
            en: { category: 'Economy', date: 'June 01, 2026', title: 'Global Supply Chain Crisis & Tech Impacts', excerpt: 'Recent geopolitical tensions in vital shipping lanes have spiked freight costs, heavily impacting electric vehicle battery outputs.' }
        },
        {
            badge: 'Politics',
            image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
            ar: { category: 'سياسة', date: '٢٨ مايو ٢٠٢٦', title: 'مستقبل التحالفات العسكرية في عصر الحروب السيبرانية', excerpt: 'مراجعات استراتيجية داخل القيادات العالمية لإعادة تعريف الدفاع المشترك بعد صعود الأسلحة والمسيرات الذكية التلقائية.' },
            en: { category: 'Politics', date: 'May 28, 2026', title: 'Military Alliances in the Cyberwarfare Era', excerpt: 'Strategic reviews within global commands are redefining joint defense frameworks after the rise of autonomous drone warfare.' }
        },
        {
            badge: 'Climate',
            image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&auto=format&fit=crop&q=80',
            ar: { category: 'تغير مناخ', date: '٢٥ مايو ٢٠٢٦', title: 'طاقة البيروفسكايت الشمسية تكسر الأرقام القياسية', excerpt: 'حققت الأجيال الجديدة من ألواح البيروفسكايت قفزات هائلة في كفاءة امتصاص الضوء وتوليد الطاقة حتى في الأيام الغائمة.' },
            en: { category: 'Climate', date: 'May 25, 2026', title: 'Perovskite Solar Cells Break Efficiency Records', excerpt: 'Next-generation perovskite panels achieve historical leaps in light-harvesting efficiency, even during highly overcast conditions.' }
        },
        {
            badge: 'Climate',
            image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=80',
            ar: { category: 'تغير مناخ', date: '٢٠ مايو ٢٠٢٦', title: 'ظاهرة النينيو المتطرفة وموجات الحر القياسية الكونية', excerpt: 'سجلت مراكز الأرصاد العالمية أعلى درجات حرارة في التاريخ المناخي المكتوب، مما يسرع من خطط الطوارئ الخضراء.' },
            en: { category: 'Climate', date: 'May 20, 2026', title: 'Extreme El Niño and Record Global Heatwaves', excerpt: 'Global meteorological centers registered historical peak temperatures, accelerating transition plans toward green infrastructure.' }
        }
    ];

    const fullArticlesList = [];
    for (let i = 0; i < 30; i++) {
        const baseArticle = articlesData[i % articlesData.length];
        fullArticlesList.push({ ...baseArticle, id: i + 1 });
    }

    const renderBlogArticles = (lang) => {
        if (!blogArticlesGrid) return;
        blogArticlesGrid.innerHTML = '';

        fullArticlesList.forEach(art => {
            const content = lang === 'en' ? art.en : art.ar;
            const btnText = translations[lang].readMore;

            const cardHtml = `
                <div class="col-md-6 col-lg-4" data-reveal="card" data-reveal-delay="${(fullArticlesList.indexOf(art) % 3) + 1}">
                    <article class="card h-100 border-0 shadow-sm position-relative blog-card">
                        <span class="badge blog-badge position-absolute top-0 end-0 m-3 z-3">${art.badge}</span>
                        <div class="ratio ratio-16x9 overflow-hidden rounded-top blog-thumb">
                            <img src="${art.image}"
                                 class="card-img-top object-fit-cover"
                                 alt="${content.title}"
                                 loading="lazy"
                                 onerror="this.onerror=null; this.src='${fallbackImage}';">
                        </div>
                        <div class="card-body d-flex flex-column p-4">
                            <div class="d-flex justify-content-between align-items-center mb-2 text-muted small">
                                <span>${content.category}</span>
                                <span>${content.date}</span>
                            </div>
                            <h5 class="card-title fw-bold mb-2">${content.title} (#${art.id})</h5>
                            <p class="card-text text-muted small mb-4">${content.excerpt}</p>
                            <a href="#" class="text-decoration-none fw-bold mt-auto btn-link-custom">${btnText}</a>
                        </div>
                    </article>
                </div>
            `;
            blogArticlesGrid.insertAdjacentHTML('beforeend', cardHtml);
        });
    };

    const renderProjects = (lang) => {
        if (!projectsGrid) return;
        projectsGrid.innerHTML = '';

        const projects = [
            {
                title: lang === 'ar' ? 'التصميم الداخلي الرقمي' : 'Digital Interior Design',
                desc: lang === 'ar' ? 'نمذجة وإخراج الفراغات المعمارية بدقة متناهية بالاعتماد على محركات الرندرة العالمية لعام 2026.' : 'High-precision architectural space modeling using cutting-edge global rendering engines for 2026.',
                img: workImages.interior,
                link: '#'
            },
            {
                title: lang === 'ar' ? 'منصة الموضة الذكية' : 'Smart Fashion Platform',
                desc: lang === 'ar' ? 'تطوير موقع متكامل لعرض تصاميم الأزياء العصرية مع دعم تقنيات اختيار المقاسات التفاعلية.' : 'Developing an integrated platform for modern fashion layouts backed by interactive sizing tech.',
                img: workImages.fashion,
                link: '#'
            },
            {
                title: lang === 'ar' ? 'تطبيقات الذكاء الاصطناعي' : 'AI Generative Apps',
                desc: lang === 'ar' ? 'بناء واجهات برمجية ذكية تتصل بنماذج التوليد الفوري للنصوص والصور بكفاءة وسرعة عالية.' : 'Building smart UI systems interacting with rapid text and image generative models efficiently.',
                img: workImages.ai,
                link: '#'
            },
            {
                title: lang === 'ar' ? 'تحليل البيانات الإدارية' : 'Administrative Data Analytics',
                desc: lang === 'ar' ? 'لوحات تحكم تفاعلية مخصصة لعرض إحصائيات الشركات ومتابعة مؤشرات الأداء بشكل رسومي مبسط.' : 'Interactive dashboard solutions displaying corporate statistics and tracking KPI matrices visually.',
                img: workImages.analytics,
                link: '#'
            }
        ];

        projects.forEach(p => {
            const btnText = lang === 'ar' ? 'تصفح المشروع ←' : 'View Project →';
            const htmlCard = `
                <div class="col-md-6 col-lg-3" data-reveal="card" data-reveal-delay="${(projects.indexOf(p) % 4) + 1}">
                    <div class="card h-100 info-card border-0 shadow-sm overflow-hidden">
                        <img src="assets/images/${p.img}" class="card-img-top object-fit-cover" alt="${p.title}" style="height: 200px;">
                        <div class="card-body d-flex flex-column p-4">
                            <h5 class="card-title fw-bold mb-2">${p.title}</h5>
                            <p class="card-text text-muted small mb-4">${p.desc}</p>
                            <a href="${p.link}" class="btn btn-sm btn-primary-custom mt-auto align-self-start text-nowrap">${btnText}</a>
                        </div>
                    </div>
                </div>
            `;
            projectsGrid.insertAdjacentHTML('beforeend', htmlCard);
        });
    };

    // ============================================================
    // Toast notification system
    // ============================================================
    const showToastNotification = (message) => {
        // Remove old toast if exists
        const oldToast = document.getElementById('cartSuccessToast');
        if (oldToast) oldToast.remove();

        const toast = document.createElement('div');
        toast.id = 'cartSuccessToast';
        toast.className = 'cart-success-toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        // Force reflow then show
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                toast.classList.add('show');
            });
        });

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    };

    // ============================================================
    // Social links toast (footer)
    // ============================================================
    const socialLinks = document.querySelectorAll('.social-icon');
    const footerToast = document.getElementById('footerToast');
    const toastPlatformEl = document.getElementById('toastPlatform');

    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = link.getAttribute('data-platform');
            if (footerToast && toastPlatformEl) {
                toastPlatformEl.textContent = platform;
                footerToast.classList.add('show');
                setTimeout(() => {
                    footerToast.classList.remove('show');
                    window.open(link.href, '_blank');
                }, 1800);
            } else {
                window.open(link.href, '_blank');
            }
        });
    });

    // ============================================================
    // Current year footer
    // ============================================================
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ============================================================
    // Theme
    // ============================================================
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.setAttribute('data-theme', 'dark');
            html.setAttribute('data-theme', 'dark');
            if (themeIcon) themeIcon.textContent = '☀️';
            localStorage.setItem('amrDigitalSpaceTheme', 'dark');
        } else {
            body.removeAttribute('data-theme');
            html.removeAttribute('data-theme');
            if (themeIcon) themeIcon.textContent = '🌙';
            localStorage.setItem('amrDigitalSpaceTheme', 'light');
        }
    };

    // ============================================================
    // Language
    // ============================================================
    const applyLanguage = (lang) => {
        const isArabic = lang === 'ar';
        html.setAttribute('lang', lang);
        html.setAttribute('dir', isArabic ? 'rtl' : 'ltr');

        if (bootstrapCss) {
            bootstrapCss.setAttribute('href', BOOTSTRAP_CSS[lang]);
        }

        const t = translations[lang];

        document.querySelectorAll('[data-i18n]').forEach((el) => {
            const key = el.getAttribute('data-i18n');
            if (key && t[key] !== undefined) {
                el.innerHTML = t[key];
            }
        });

        document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
            const key = el.getAttribute('data-i18n-aria-label');
            if (key && t[key]) el.setAttribute('aria-label', t[key]);
        });

        document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
            const key = el.getAttribute('data-i18n-alt');
            if (key && t[key]) el.setAttribute('alt', t[key]);
        });

        const titleEl = document.querySelector('title[data-i18n]');
        if (titleEl) {
            const key = titleEl.getAttribute('data-i18n');
            if (key && t[key]) document.title = t[key] + ' | AmrDigitalSpace';
        }

        const readMoreBtn = document.getElementById('readMoreBtn');
        if (readMoreBtn && t.heroReadMoreBtn) {
            const isExpanded = readMoreBtn.getAttribute('aria-expanded') === 'true';
            readMoreBtn.innerHTML = isExpanded ? t.heroReadLessBtn : t.heroReadMoreBtn;
        }

        const readMoreContentEl = document.getElementById('readMoreContent');
        if (readMoreContentEl && t.heroReadMoreContent) {
            const paragraph = readMoreContentEl.querySelector('p');
            if (paragraph) paragraph.innerHTML = t.heroReadMoreContent;
        }

        const emailInput = document.getElementById('newsletterEmail');
        if (emailInput) {
            emailInput.setAttribute('placeholder', isArabic ? 'بريدك الإلكتروني' : 'Your Email Address');
        }

            // placeholders for inputs marked with data-i18n-placeholder
            document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
                const key = el.getAttribute('data-i18n-placeholder');
                if (key && t[key] !== undefined) el.setAttribute('placeholder', t[key]);
            });

            // ensure current year is updated after translations that may replace the footer HTML
            const newYearEl = document.getElementById('currentYear');
            if (newYearEl) newYearEl.textContent = new Date().getFullYear();

        if (langToggle) langToggle.textContent = isArabic ? 'EN' : 'AR';

        const cartOffcanvasLabel = document.getElementById('cartOffcanvasLabel');
        if (cartOffcanvasLabel && t.cartOffcanvasTitle) cartOffcanvasLabel.textContent = t.cartOffcanvasTitle;

        const checkoutBtn = document.getElementById('cartCheckoutBtn');
        if (checkoutBtn && t.checkoutButton) checkoutBtn.textContent = t.checkoutButton;

        localStorage.setItem('amrDigitalSpaceLang', lang);

        renderProjects(lang);
        renderBlogArticles(lang);

        // Re-render store if on products page
        if (document.getElementById('storeProductsGrid') && typeof renderAmrStoreGrid === 'function') {
            renderAmrStoreGrid(lang);
            refreshStoreCartUI();
        }
    };

    // ============================================================
    // Event listeners
    // ============================================================
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const nextTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(nextTheme);
        });
    }

    if (langToggle) {
        langToggle.addEventListener('click', () => {
   const currentLang = document.documentElement.getAttribute('lang') || 'ar';
            const nextLang = currentLang === 'ar' ? 'en' : 'ar';
            applyLanguage(nextLang);
        });
    }

    const readMoreBtn = document.getElementById('readMoreBtn');
    const readMoreContent = document.getElementById('readMoreContent');
    if (readMoreBtn && readMoreContent) {
        readMoreBtn.addEventListener('click', () => {
            const currentLang = html.getAttribute('lang') || 'ar';
            const isExpanded = readMoreBtn.getAttribute('aria-expanded') === 'true';
            if (isExpanded) {
                readMoreContent.classList.add('d-none');
                readMoreBtn.setAttribute('aria-expanded', 'false');
                readMoreBtn.innerHTML = translations[currentLang].heroReadMoreBtn;
            } else {
                readMoreContent.classList.remove('d-none');
                readMoreBtn.setAttribute('aria-expanded', 'true');
                readMoreBtn.innerHTML = translations[currentLang].heroReadLessBtn;
            }
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const statusDiv = document.getElementById('newsletterStatus');
            const currentLang = html.getAttribute('lang') || 'ar';
            if (statusDiv) {
                statusDiv.textContent = translations[currentLang].subscribeSuccess;
                statusDiv.className = "mt-3 small text-success fw-bold";
                statusDiv.classList.remove('d-none');
                newsletterForm.reset();
            }
        });
    }

    // ============================================================
    // Init
    // ============================================================
    if (savedTheme === 'dark') applyTheme('dark');
    else applyTheme('light');

    // ============================================================
    // STORE — Products page logic
    // ============================================================
    const storeBaseItems = [
        {
            ar: { title: 'كورس احترافي كامل لغة C++', desc: 'شرح معمق للخوارزميات وهياكل البيانات الحركية والذاكرة.' },
            en: { title: 'Mastering C++ Pro Course', desc: 'In-depth guide to algorithms, data structures, and memory.' },
            cat: { ar: 'برمجة', en: 'Programming' },
            price: 89.99,
            imageKeywords: ['computer', 'code', 'programming', 'developer']
        },
        {
            ar: { title: 'حقيبة ظهر ذكية للمطورين', desc: 'مقاومة للمياه ومزودة بمنافذ شحن USB مدمجة لحماية حاسوبك.' },
            en: { title: 'Developers Smart Backpack', desc: 'Waterproof tech bag with embedded USB outputs for laptops.' },
            cat: { ar: 'أجهزة', en: 'Hardware' },
            price: 45.00,
            imageKeywords: ['backpack', 'bag', 'tech', 'travel']
        },
        {
            ar: { title: 'دورة برمجية متكاملة لـ Python Backend', desc: 'بناء خوادم مستقرة وإدارة واجهات برمجة التطبيقات الذكية.' },
            en: { title: 'Python Backend Development', desc: 'Building stable server apps and scalable API management.' },
            cat: { ar: 'برمجة', en: 'Programming' },
            price: 95.00,
            imageKeywords: ['server', 'coding', 'laptop', 'development']
        },
        {
            ar: { title: 'لوحة مفاتيح ميكانيكية مضيئة RGB', desc: 'مفاتيح زرقاء سريعة الاستجابة توفر راحة تامة أثناء العمل الطويل.' },
            en: { title: 'RGB Mechanical Keyboard', desc: 'Tactile blue switches optimized for long programming sprints.' },
            cat: { ar: 'أجهزة', en: 'Hardware' },
            price: 59.99,
            imageKeywords: ['keyboard', 'hardware', 'tech', 'gaming']
        }
    ];

    const generate102Products = () => {
        let fullList = [];
        
        for (let i = 1; i <= 102; i++) {
            const base = storeBaseItems[(i - 1) % storeBaseItems.length];
            const keywordIndex = (i - 1) % base.imageKeywords.length;
            const keyword = base.imageKeywords[keywordIndex];
            const seed = `amr-${keyword}-${i}`;
            
            fullList.push({
                id: i,
                cat: base.cat,
                img: `https://picsum.photos/seed/${seed}/600/400?random=${i}`,
                price: parseFloat((base.price + (i * 0.35) % 50).toFixed(2)),
                ar: { title: `${base.ar.title} #${i}`, desc: base.ar.desc },
                en: { title: `${base.en.title} #${i}`, desc: base.en.desc }
            });
        }
        return fullList;
    };

    const generatedProductsList = generate102Products();
    let userShoppingCart = JSON.parse(localStorage.getItem('amrStoreCartData')) || [];

    function findProductById(id) {
        return generatedProductsList.find(product => product.id === id);
    }

   function renderAmrStoreGrid(lang) {
        const storeGrid = document.getElementById('storeProductsGrid');
        if (!storeGrid) return;

        storeGrid.innerHTML = '';
        generatedProductsList.forEach(product => {
            const currentText = lang === 'en' ? product.en : product.ar;
            const currentCat = lang === 'en' ? product.cat.en : product.cat.ar;
            const baseButtonText = translations[lang].addToCartButton || (lang === 'en' ? 'Add To Cart 🛒' : 'أضف للسلة 🛒');
            const currentProductQty = userShoppingCart.find(item => item.id === product.id)?.qty || 0;
            const btnText = currentProductQty > 0 ? `${baseButtonText} (${currentProductQty})` : baseButtonText;

            const cardCol = document.createElement('div');
            cardCol.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
            cardCol.setAttribute('data-reveal', 'card');
            cardCol.setAttribute('data-reveal-delay', String((product.id % 4) + 1));
            
            // التعديل تم في سطر img وتحديداً في حدث onerror
            cardCol.innerHTML = `
                <div class="card h-100 product-store-card border-0 shadow-sm">
                    <div class="store-thumb-wrapper position-relative overflow-hidden">
                        <span class="product-cat-badge position-absolute top-0 end-0 m-3">${currentCat}</span>
                        <img src="${product.img}" 
                             class="card-img-top" 
                             alt="${currentText.title}" 
                             loading="lazy"
                             onerror="this.src='https://via.placeholder.com/600x400/0ea5e9/ffffff?text=Product+${product.id}'; this.style.objectFit='cover';">
                    </div>
                    <div class="card-body d-flex flex-column justify-content-between p-4">
                        <div>
                            <h5 class="card-title fw-bold fs-6 mb-2 text-truncate" title="${currentText.title}">${currentText.title}</h5>
                            <p class="card-text text-muted small mb-3">${currentText.desc}</p>
                        </div>
                        <div class="mt-auto pt-2 border-top">
                            <div class="text-primary fw-bold fs-5 mb-3">${product.price.toFixed(2)} $</div>
                            <button class="btn btn-primary-custom w-100 btn-sm py-2 fw-bold store-add-btn" data-product-id="${product.id}">
                                ${btnText}
                            </button>
                        </div>
                    </div>
                </div>
            `;
            storeGrid.appendChild(cardCol);
        });

       storeGrid.querySelectorAll('.store-add-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const prodId = parseInt(
            e.currentTarget.getAttribute('data-product-id')
        );
        executeAddToCart(prodId);
    });
});

}
    // Make renderAmrStoreGrid accessible in the outer applyLanguage scope
    window.renderAmrStoreGrid = renderAmrStoreGrid;

    function refreshStoreCartUI() {
        const badgeCount = document.getElementById('cartCountBadge');
        const listContainer = document.getElementById('cartItemsListContainer');
        const totalSumLabel = document.getElementById('cartTotalSum');
        const checkoutBtn = document.getElementById('cartCheckoutBtn');
        const currentLang = html.getAttribute('lang') || 'ar';

        let currentTotalCount = userShoppingCart.reduce((sum, item) => sum + item.qty, 0);
        if (badgeCount) {
            badgeCount.textContent = currentTotalCount;
            badgeCount.classList.add('scale-effect');
            setTimeout(() => badgeCount.classList.remove('scale-effect'), 300);
        }

        if (!listContainer) return;

        if (userShoppingCart.length === 0) {
            const emptyMessage = translations[currentLang].cartEmpty || (currentLang === 'en' ? 'Your cart is empty. Add some products to get started!' : 'السلة فارغة تماماً. أضف بعض المنتجات المتميزة لبدء التسوق!');
            listContainer.innerHTML = `<p class="text-center text-muted py-5">${emptyMessage}</p>`;
            if (totalSumLabel) totalSumLabel.textContent = '0.00 $';
            if (checkoutBtn) checkoutBtn.disabled = true;
            return;
        }

        listContainer.innerHTML = '';
        let calculatedTotalPrice = 0;

        userShoppingCart.forEach(item => {
            const product = findProductById(item.id);
            const itemTitle = product ? (currentLang === 'en' ? product.en.title : product.ar.title) : `Item #${item.id}`;
            const itemPrice = product ? product.price : 0;
            calculatedTotalPrice += itemPrice * item.qty;
            const itemRow = document.createElement('div');
            itemRow.className = 'd-flex align-items-center justify-content-between p-3 mb-2 rounded border';
            itemRow.style.backgroundColor = 'var(--page-surface-strong)';
            itemRow.innerHTML = `
                <div style="max-width: 70%;">
                    <div class="fw-bold text-truncate small">${itemTitle}</div>
                    <div class="text-muted small">${itemPrice.toFixed(2)} $ × ${item.qty}</div>
                </div>
                <button class="btn btn-sm btn-link text-danger remove-cart-item-btn p-0 border-0" data-id="${item.id}" style="text-decoration:none; font-weight:700;">${translations[currentLang].removeButton}</button>
            `;
            listContainer.appendChild(itemRow);
        });

        if (totalSumLabel) totalSumLabel.textContent = `${calculatedTotalPrice.toFixed(2)} $`;
        if (checkoutBtn) checkoutBtn.disabled = false;

        listContainer.querySelectorAll('.remove-cart-item-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetId = parseInt(e.target.getAttribute('data-id'));
                userShoppingCart = userShoppingCart.filter(item => item.id !== targetId);
                localStorage.setItem('amrStoreCartData', JSON.stringify(userShoppingCart));
                refreshStoreCartUI();
            });
        });

        if (document.getElementById('storeProductsGrid')) {
            renderAmrStoreGrid(currentLang);
        }
    }

    function executeAddToCart(id) {
        const product = generatedProductsList.find(p => p.id === id);
        if (!product) return;
        const currentLang = html.getAttribute('lang') || 'ar';

        const cartIndex = userShoppingCart.findIndex(item => item.id === id);
        if (cartIndex > -1) {
            userShoppingCart[cartIndex].qty += 1;
        } else {
            userShoppingCart.push({ id: product.id, qty: 1 });
        }

        localStorage.setItem('amrStoreCartData', JSON.stringify(userShoppingCart));
        refreshStoreCartUI();

        // Show success toast notification
        showToastNotification(translations[currentLang].cartAddedSuccess);
    }

    applyLanguage(savedLang === 'en' ? 'en' : 'ar');

    const checkoutButtonNode = document.getElementById('cartCheckoutBtn');
    if (checkoutButtonNode) {
        checkoutButtonNode.addEventListener('click', () => {
            const currentLang = html.getAttribute('lang') || 'ar';
            alert(currentLang === 'en'
                ? '🎉 Order Confirmed!  will contact you soon.'
                : '🎉 تم استلام وتأكيد طلب الشراء بنجاح! سنقوم بالتواصل معك قريباً.');
            userShoppingCart = [];
            localStorage.removeItem('amrStoreCartData');
            refreshStoreCartUI();
        });
    }

    if (document.getElementById('storeProductsGrid')) {
        const initLang = html.getAttribute('lang') || 'ar';
        renderAmrStoreGrid(initLang);
        refreshStoreCartUI();
    }

    // ============================================================
    // Scroll Reveal — يُشغِّل حركة الظهور عند دخول العناصر للشاشة
    // ============================================================
    const initScrollReveal = () => {
        // إن كان المتصفح لا يدعم IntersectionObserver، أظهر كل شيء فوراً
        if (!('IntersectionObserver' in window)) {
            document.querySelectorAll('[data-reveal]').forEach(el => {
                el.classList.add('is-revealed');
            });
            return;
        }

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    revealObserver.unobserve(entry.target); // أظهر مرة واحدة فقط
                }
            });
        }, {
            threshold: 0.12,       // يبدأ الظهور حين يظهر 12% من العنصر
            rootMargin: '0px 0px -40px 0px' // هامش سفلي لبدء أبكر قليلاً
        });

        // راقب كل العناصر الموجودة حالياً
        document.querySelectorAll('[data-reveal]').forEach(el => {
            revealObserver.observe(el);
        });

        // راقب العناصر التي تُضاف ديناميكياً (بطاقات المدونة / المتجر)
        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType !== 1) return;
                    // العنصر نفسه
                    if (node.hasAttribute && node.hasAttribute('data-reveal')) {
                        revealObserver.observe(node);
                    }
                    // أبناؤه
                    node.querySelectorAll && node.querySelectorAll('[data-reveal]').forEach(child => {
                        revealObserver.observe(child);
                    });
                });
            });
        });

        mutationObserver.observe(document.body, { childList: true, subtree: true });
    };

    initScrollReveal();
});





/* ==========================================================================
   ملف التحكم المنطقي والبرمجي الخاص بالحاسبة البسيطة والآمنة من الثغرات
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const screen = document.getElementById('calcScreen');
    const actionButtons = document.querySelectorAll('.btn-num, .btn-operator-custom');
    const btnAC = document.getElementById('btnAC');
    const btnDelete = document.getElementById('btnDelete');
    const btnEqual = document.getElementById('btnEqual');

    // دالة لإضافة القيم النصية المدخلة إلى الشاشة
    const appendValue = (value) => {
        if (screen.value === 'خطأ' || screen.value === 'Error') {
            screen.value = '';
        }
        screen.value += value;
    };

    // دالة لتفريغ مساحة الشاشة بالكامل
    const clearScreen = () => {
        screen.value = '';
    };

    // دالة لمسح آخر خانة مدخلة (تراجع)
    const deleteLast = () => {
        if (screen.value === 'خطأ' || screen.value === 'Error') {
            screen.value = '';
        } else {
            screen.value = screen.value.slice(0, -1);
        }
    };

    // دالة معالجة الخطأ الحسابي وتوجيهه للغة المفعلة حالياً بالصفحة
    const triggerCalculationError = () => {
        const activeLang = document.documentElement.getAttribute('lang') || 'ar';
        screen.value = activeLang === 'ar' ? 'خطأ' : 'Error';
    };

    // دالة تقييم وحساب المعادلة الرياضية بطريقة آمنة
    const calculateResult = () => {
        if (!screen.value) return;
        try {
            // تنفيذ الحسابات بشكل منعزل وآمن بدلاً من eval المفتوح
            const calculatedValue = new Function(`return ${screen.value}`)();
            
            if (isFinite(calculatedValue)) {
                screen.value = calculatedValue;
            } else {
                triggerCalculationError();
            }
        } catch (error) {
            triggerCalculationError();
        }
    };

    // ربط مستمعات الأحداث البرمجية (EventListeners) بالأزرار المستهدفة بشكل مستقل
    actionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            appendValue(btn.getAttribute('data-val'));
        });
    });

    if (btnAC) {
        btnAC.addEventListener('click', clearScreen);
    }
    
    if (btnDelete) {
        btnDelete.addEventListener('click', deleteLast);
    }
    
    if (btnEqual) {
        btnEqual.addEventListener('click', calculateResult);
    }
});


// ============================================================
    // Consultation Form Validation Logic
    // ============================================================
    const consultationForm = document.getElementById('consultationForm');
    
    if (consultationForm) {
        const nameInput = document.getElementById('userName');
        const emailInput = document.getElementById('userEmail');
        const messageInput = document.getElementById('userMessage');
        const formAlert = document.getElementById('formAlert');

        // التحقق من صحة البريد الإلكتروني
        const isValidEmail = (email) => {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        };

        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isFormValid = true;
const currentLang = (document.documentElement && document.documentElement.getAttribute('lang')) || 'ar';
            // إعادة ضبط الحقول
            document.getElementById('nameError').style.display = 'none';
            document.getElementById('emailError').style.display = 'none';
            document.getElementById('messageError').style.display = 'none';
            nameInput.classList.remove('is-invalid');
            emailInput.classList.remove('is-invalid');
            messageInput.classList.remove('is-invalid');

            // التحقق من الاسم
            if (nameInput.value.trim() === '') {
                nameInput.classList.add('is-invalid');
                document.getElementById('nameError').style.display = 'block';
                isFormValid = false;
            }

            // التحقق من الإيميل
            if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value.trim())) {
                emailInput.classList.add('is-invalid');
                document.getElementById('emailError').style.display = 'block';
                isFormValid = false;
            }

            // التحقق من الرسالة
            if (messageInput.value.trim() === '') {
                messageInput.classList.add('is-invalid');
                document.getElementById('messageError').style.display = 'block';
                isFormValid = false;
            }

            // عرض نتيجة الإرسال
            if (!isFormValid) {
                formAlert.className = 'alert alert-danger mt-4 d-block';
                formAlert.innerHTML = currentLang === 'ar' ? '⚠️ يرجى تصحيح الأخطاء في الحقول أعلاه قبل الإرسال.' : '⚠️ Please correct the errors in the fields above before submitting.';
            } else {
                formAlert.className = 'alert alert-success mt-4 d-block';
                formAlert.innerHTML = currentLang === 'ar' ? '✅ تم استلام طلبك بنجاح! سنقوم بالرد عليك قريباً.' : '✅ Request received successfully! We will reply to you soon.';
                
                consultationForm.reset();
                
                setTimeout(() => {
                    formAlert.classList.replace('d-block', 'd-none');
                }, 5000);
            }
        });

        // ============================================================
// نظام التحقق من نموذج الاستشارة الموحد (Form Validation)
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    const consultationForm = document.getElementById('consultationForm');
    
    if (consultationForm) {
        const nameInput = document.getElementById('userName');
        const emailInput = document.getElementById('userEmail');
        const messageInput = document.getElementById('userMessage');
        const formAlert = document.getElementById('formAlert');

        // دالة مخصصة للتحقق من صحة صيغة البريد الإلكتروني
        const isValidEmail = (email) => {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        };

        consultationForm.addEventListener('submit', function(e) {
            // منع إرسال النموذج فوراً لإجراء الفحوصات
            e.preventDefault();
            
            let isFormValid = true;
            const currentLang = document.documentElement.getAttribute('lang') || 'ar';

            // تصفير رسائل الخطأ القديمة قبل كل عملية إرسال
            document.getElementById('nameError').style.display = 'none';
            document.getElementById('emailError').style.display = 'none';
            document.getElementById('messageError').style.display = 'none';
            nameInput.classList.remove('is-invalid');
            emailInput.classList.remove('is-invalid');
            messageInput.classList.remove('is-invalid');

            // التحقق من حقل الاسم
            if (nameInput.value.trim() === '') {
                nameInput.classList.add('is-invalid');
                document.getElementById('nameError').style.display = 'block';
                isFormValid = false;
            }

            // التحقق من حقل الإيميل
            if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value.trim())) {
                emailInput.classList.add('is-invalid');
                document.getElementById('emailError').style.display = 'block';
                isFormValid = false;
            }

            // التحقق من حقل الرسالة
            if (messageInput.value.trim() === '') {
                messageInput.classList.add('is-invalid');
                document.getElementById('messageError').style.display = 'block';
                isFormValid = false;
            }

            // النتيجة النهائية للتحقق والتنفيذ
            if (!isFormValid) {
                formAlert.className = 'alert alert-danger mt-4 d-block';
                formAlert.innerHTML = currentLang === 'ar' ? '⚠️ يرجى تصحيح الأخطاء في الحقول المحددة باللون الأحمر قبل الإرسال.' : '⚠️ Please correct the highlighted errors before submitting.';
            } else {
                formAlert.className = 'alert alert-success mt-4 d-block';
                formAlert.innerHTML = currentLang === 'ar' ? '✅ تم استلام طلبك بنجاح! سيتم التواصل معك قريباً.' : '✅ Request received successfully! We will contact you soon.';
                
                // تفريغ الحقول بأمان بعد انتهاء كافة الفحوصات تماماً
                consultationForm.reset();
                
                // إخفاء رسالة النجاح تلقائياً بعد 5 ثوانٍ
                setTimeout(() => {
                    formAlert.className = 'alert d-none fw-bold';
                }, 5000);
            }
        });

        // ميزة التفاعل اللحظي: إخفاء رسالة الخطأ فور بدء المستخدم بالكتابة
        [nameInput, emailInput, messageInput].forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('is-invalid');
                const errorMsg = this.nextElementSibling;
                if(errorMsg && errorMsg.classList.contains('invalid-feedback')) {
                    errorMsg.style.display = 'none';
                }
            });
        });
    }
});
