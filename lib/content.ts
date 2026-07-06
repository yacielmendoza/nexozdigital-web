// ============================================================================
// Nexoz Digital — bilingual content (ES / EN)
// Single source of truth for all homepage copy. Each section of the homepage
// reads its slice from here through the `useLanguage()` hook.
// ============================================================================

export type Language = "es" | "en";

export type NavLink = { label: string; href: string };

export type Service = {
  /** stable key — also used to pick the placeholder 3D/SVG icon */
  key: string;
  name: string;
  description: string;
  bullets: string[];
  cta: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Copy = {
  // --- navigation / shared ---
  nav: NavLink[];
  navCta: string;

  // --- Section 01 — Hero ---
  hero: {
    eyebrow: string;
    headline: string;
    subhead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    note: string;
  };

  // --- Section 02 — Proof bar ---
  proof: Array<{ icon: string; label: string }>;

  // --- Section 03 — Problem ---
  problem: {
    headline: string;
    intro: string;
    points: Array<{ icon: string; title: string; body: string }>;
  };

  // --- Section 04 — Solution ---
  solution: {
    headline: string;
    body: string;
    differentiators: Array<{ icon: string; title: string; body: string }>;
    cta: string;
  };

  // --- Section 05 — Services ---
  services: {
    eyebrow: string;
    headline: string;
    intro: string;
    items: Service[];
  };

  // --- Section 06 — Process ---
  process: {
    eyebrow: string;
    headline: string;
    steps: ProcessStep[];
  };

  // --- Section 07 — Social proof ---
  social: {
    headline: string;
    note: string;
    testimonials: Testimonial[];
  };

  // --- Section 08 — Lead magnet / form ---
  lead: {
    eyebrow: string;
    headline: string;
    description: string;
    includes: string[];
    /** "What happens after you submit" micro-strip — reduces submit anxiety. */
    steps: string[];
    form: {
      name: string;
      email: string;
      phone: string;
      businessType: string;
      businessTypePlaceholder: string;
      businessTypes: string[];
      submit: string;
      sending: string;
      success: string;
      successNext: string;
      trustNote: string;
      error: string;
    };
  };

  // --- Section 09 — About ---
  about: {
    eyebrow: string;
    headline: string;
    paragraphs: string[];
    signature: string;
  };

  // --- FAQ (AEO/GEO) ---
  faq: {
    headline: string;
    subhead: string;
    items: FaqItem[];
  };

  // --- Section 10 — Final CTA ---
  finalCta: {
    /** everything before the emotional emphasis word(s) */
    headlineLead: string;
    /** the 1-2 word emotional payoff, rendered in the Instrument Serif
     *  editorial accent (Brand Book §4.0) — keep this short and load-bearing;
     *  if the headline reads fine without it, it doesn't belong here. */
    headlineAccent: string;
    subhead: string;
    cta: string;
    note: string;
  };

  // --- Footer ---
  footer: {
    tagline: string;
    columns: Array<{ title: string; links: NavLink[] }>;
    rights: string;
    builtWith: string;
  };
};

// Shared anchors so nav + CTAs stay in sync across languages.
const ANCHORS = {
  services: "#servicios",
  process: "#proceso",
  about: "#nosotros",
  contact: "#diagnostico"
} as const;

export const copy: Record<Language, Copy> = {
  // ==========================================================================
  // ESPAÑOL
  // ==========================================================================
  es: {
    nav: [
      { label: "Servicios", href: ANCHORS.services },
      { label: "Proceso", href: ANCHORS.process },
      { label: "Nosotros", href: ANCHORS.about },
      { label: "Contacto", href: ANCHORS.contact }
    ],
    navCta: "Pide tu Diagnóstico",

    hero: {
      eyebrow: "Agencia Digital Bilingüe · Big Spring, TX",
      headline: "Tu negocio, encontrado. En español, en inglés, en Big Spring.",
      subhead:
        "Diseñamos presencia digital que conecta tu negocio con los clientes que te están buscando. En español. En inglés. En tu ciudad.",
      ctaPrimary: "Obtén tu Diagnóstico Gratuito",
      ctaSecondary: "Ver nuestros servicios",
      note: "Sin compromiso · Respuesta en 24 horas · 100% bilingüe"
    },

    proof: [
      { icon: "star", label: "Google Verificado" },
      { icon: "pin", label: "Big Spring, TX" },
      { icon: "globe", label: "Bilingüe ES/EN" },
      { icon: "bolt", label: "Proyectos entregados" }
    ],

    problem: {
      headline: "¿Tu negocio es invisible en internet?",
      intro:
        "Cada día, clientes potenciales buscan exactamente lo que tú ofreces. Si no te encuentran, encuentran a tu competencia.",
      points: [
        {
          icon: "search-off",
          title: "Nadie te encuentra en Google",
          body: "Sin presencia digital optimizada, tu negocio simplemente no aparece cuando la gente busca tus servicios."
        },
        {
          icon: "clock",
          title: "Pierdes clientes todos los días",
          body: "Un sitio lento, confuso o inexistente envía a tus clientes directo a manos de la competencia."
        },
        {
          icon: "language",
          title: "Tu mensaje no conecta",
          body: "Hablarle a una comunidad bilingüe en un solo idioma deja la mitad de tus clientes fuera de la conversación."
        }
      ]
    },

    solution: {
      headline: "Tu equipo digital. En tu idioma. En tu ciudad.",
      body:
        "Nexoz Digital es el socio que tu negocio necesita para crecer en el mundo digital. Combinamos diseño de alto nivel, estrategia de marketing y automatización con inteligencia artificial — todo con un trato cercano, bilingüe y enfocado en resultados reales.",
      differentiators: [
        {
          icon: "handshake",
          title: "Trato cercano y bilingüe",
          body: "Hablamos tu idioma — literalmente. Atención personal en español e inglés, sin intermediarios."
        },
        {
          icon: "target",
          title: "Enfoque en resultados",
          body: "No vendemos likes. Construimos sistemas que generan clientes, llamadas y ventas medibles."
        },
        {
          icon: "cpu",
          title: "Tecnología e IA a tu favor",
          body: "Automatizamos lo repetitivo para que tú te enfoques en lo que mejor sabes hacer: tu negocio."
        }
      ],
      cta: "Hablemos de tu proyecto"
    },

    services: {
      eyebrow: "Lo que hacemos",
      headline: "Soluciones digitales completas para tu negocio",
      intro:
        "Desde tu primera web hasta sistemas inteligentes de automatización — seis formas concretas de dejar de perder clientes por invisibles.",
      items: [
        {
          key: "web",
          name: "Sitios Web",
          description:
            "Sitios rápidos, modernos y diseñados para convertir visitantes en clientes.",
          bullets: [
            "Diseño responsivo y a medida",
            "Optimizados para velocidad y SEO",
            "Listos para vender 24/7"
          ],
          cta: "Ver sitios"
        },
        {
          key: "marketing",
          name: "Marketing Digital",
          description:
            "Campañas que ponen tu negocio frente a las personas correctas.",
          bullets: [
            "Publicidad en Google y redes",
            "Contenido que conecta",
            "Reportes claros y medibles"
          ],
          cta: "Ver campañas"
        },
        {
          key: "ai",
          name: "Automatización IA",
          description:
            "Agentes y flujos inteligentes que trabajan por ti las 24 horas.",
          bullets: [
            "Respuesta automática a clientes",
            "Seguimiento y CRM conectados",
            "Menos tareas manuales"
          ],
          cta: "Ver automatización"
        },
        {
          key: "brand",
          name: "Diseño de Marca",
          description:
            "Una identidad visual memorable que te distingue de la competencia.",
          bullets: [
            "Logo e identidad completa",
            "Guía de marca consistente",
            "Materiales para cada canal"
          ],
          cta: "Ver identidad"
        },
        {
          key: "seo",
          name: "SEO Local",
          description:
            "Aparece primero cuando tus clientes buscan en tu ciudad.",
          bullets: [
            "Optimización Google Business",
            "Posicionamiento local",
            "Más llamadas y visitas"
          ],
          cta: "Ver posicionamiento"
        },
        {
          key: "tech",
          name: "Tech Services",
          description:
            "Soporte técnico, hosting e integraciones para que todo funcione.",
          bullets: [
            "Hosting y dominios",
            "Mantenimiento y soporte",
            "Integraciones a medida"
          ],
          cta: "Ver soporte"
        }
      ]
    },

    process: {
      eyebrow: "Cómo trabajamos",
      headline: "Cuatro pasos hacia tu crecimiento",
      steps: [
        {
          number: "01",
          title: "Diagnóstico",
          description:
            "Analizamos tu negocio, tu mercado y tu competencia para entender dónde estás y a dónde puedes llegar."
        },
        {
          number: "02",
          title: "Estrategia",
          description:
            "Diseñamos un plan claro y a tu medida, con prioridades reales y resultados esperados."
        },
        {
          number: "03",
          title: "Ejecución",
          description:
            "Construimos e implementamos cada pieza con calidad, rapidez y comunicación constante."
        },
        {
          number: "04",
          title: "Resultados",
          description:
            "Medimos, optimizamos y crecemos contigo. Tu éxito es la métrica que importa."
        }
      ]
    },

    social: {
      headline: "Lo que dicen nuestros clientes",
      note: "Primeros testimonios reales próximamente",
      testimonials: [
        {
          quote:
            "Por fin alguien que entiende mi negocio y me habla claro. Mi sitio se ve increíble y ya estoy recibiendo llamadas.",
          name: "Cliente Nexoz",
          role: "Negocio local · Big Spring, TX",
          initials: "CN"
        },
        {
          quote:
            "El trato bilingüe hizo toda la diferencia. Entendieron exactamente lo que necesitaba mi comunidad.",
          name: "Cliente Nexoz",
          role: "Servicios · West Texas",
          initials: "CN"
        }
      ]
    },

    lead: {
      eyebrow: "Diagnóstico Digital Express",
      headline: "Descarga gratis tu Diagnóstico Digital Express",
      description:
        "Descubre exactamente qué está frenando el crecimiento digital de tu negocio — y qué hacer al respecto. Gratis y sin compromiso.",
      includes: [
        "Análisis de tu presencia digital actual",
        "Comparativa frente a tu competencia local",
        "3 acciones concretas para crecer este mes"
      ],
      steps: [
        "Envías el formulario",
        "Te contactamos en 24-48h",
        "Recibes tu diagnóstico, gratis y sin compromiso"
      ],
      form: {
        name: "Nombre",
        email: "Email",
        phone: "Teléfono (opcional)",
        businessType: "Tipo de negocio",
        businessTypePlaceholder: "Selecciona una opción",
        businessTypes: [
          "Restaurante / Comida",
          "Servicios profesionales",
          "Retail / Tienda",
          "Construcción / Oficios",
          "Salud / Bienestar",
          "Otro"
        ],
        submit: "Quiero mi Diagnóstico Gratuito",
        sending: "Enviando...",
        success: "¡Recibido!",
        successNext:
          "Te contactaremos en 24-48h por email (o WhatsApp si dejaste tu teléfono) con tu Diagnóstico Digital Express.",
        trustNote: "Sin spam. Respondemos en 24-48h.",
        error:
          "Algo salió mal. Escríbenos directamente a hola@nexozdigital.com y lo resolvemos."
      }
    },

    about: {
      eyebrow: "Nuestra historia",
      headline: "Hola, soy Yaciel — fundador de Nexoz Digital",
      paragraphs: [
        "Crecí entre dos idiomas y dos culturas, y siempre vi lo mismo: negocios increíbles de mi comunidad que trabajaban duro pero eran invisibles en internet. No por falta de talento, sino por falta de alguien que les hablara claro y los acompañara.",
        "Fundé Nexoz Digital en Big Spring, TX, para cambiar eso. Aquí no hay tecnicismos vacíos ni promesas infladas — solo trabajo honesto, diseño de calidad y tecnología puesta al servicio de tu crecimiento.",
        "Cuando trabajas con Nexoz, trabajas conmigo y con un equipo que se toma tu negocio tan en serio como tú."
      ],
      signature: "Yaciel · Fundador, Nexoz Digital"
    },

    faq: {
      headline: "Preguntas frecuentes",
      subhead: "Todo lo que necesitas saber antes de dar el primer paso",
      items: [
        {
          question: "¿Cuánto cuesta crear un sitio web profesional?",
          answer:
            "El costo depende del alcance del proyecto. Ofrecemos paquetes desde $500 para sitios básicos hasta proyectos personalizados con automatización IA. En tu Diagnóstico Gratuito te damos un presupuesto exacto sin compromiso."
        },
        {
          question: "¿Trabajan con negocios que no hablan inglés?",
          answer:
            "Sí, eso es precisamente lo que nos hace únicos. Nexoz nació bilingüe. Todo nuestro trabajo — comunicación, documentación, soporte — está disponible en español e inglés."
        },
        {
          question: "¿Cuánto tiempo tarda en estar listo mi sitio web?",
          answer:
            "Un sitio profesional típicamente tarda entre 2 y 4 semanas desde que aprobamos el diseño. Sitios más complejos con automatización pueden tomar 6 a 8 semanas."
        },
        {
          question: "¿Qué incluye el Diagnóstico Digital Gratuito?",
          answer:
            "Analizamos tu presencia actual en Google, redes sociales y competencia local. Al finalizar recibes un reporte con tus brechas más críticas y 3 acciones concretas para mejorar tu visibilidad este mes."
        },
        {
          question: "¿Están ubicados en Big Spring, Texas?",
          answer:
            "Sí. Nexoz Digital Solutions tiene sede en Big Spring, TX y servimos a negocios en todo West Texas y el resto de los Estados Unidos de forma remota."
        },
        {
          question: "¿Qué es la automatización con IA y cómo ayuda a mi negocio?",
          answer:
            "La automatización con IA son sistemas que hacen trabajo repetitivo por ti: responder mensajes, agendar citas, enviar seguimientos. Liberan tu tiempo para que te concentres en atender clientes y crecer."
        },
        {
          question: "¿Puedo actualizar mi sitio web después de que esté listo?",
          answer:
            "Sí. Todos nuestros sitios incluyen un panel de administración donde puedes editar textos, agregar fotos y actualizar precios sin conocimientos técnicos. También ofrecemos planes de mantenimiento mensual."
        },
        {
          question: "¿Hacen marketing en redes sociales para negocios locales?",
          answer:
            "Sí, diseñamos estrategias de contenido y publicidad en Facebook, Instagram y Google orientadas a clientes locales. Todo en español e inglés según tu audiencia."
        },
        {
          question: "¿Qué diferencia a Nexoz de otras agencias digitales?",
          answer:
            "Tres cosas: somos bilingües de verdad (no traducción), entendemos la cultura del empresario hispano desde adentro, y usamos IA en todo lo que hacemos — no como buzzword, sino como herramienta real que reduce tus costos."
        },
        {
          question: "¿Trabajan con negocios fuera de Texas?",
          answer:
            "Sí. Aunque tenemos presencia física en Big Spring, TX, trabajamos 100% de forma remota con negocios en todo Estados Unidos, especialmente con la comunidad hispana."
        }
      ]
    },

    finalCta: {
      headlineLead: "Tu próximo cliente te está buscando",
      headlineAccent: "ahora mismo.",
      subhead:
        "Te decimos exactamente qué está pasando con tu presencia digital — sin costo, sin letra pequeña, sin compromiso.",
      cta: "Sí, quiero mi Diagnóstico",
      note: "Sin compromiso · Respuesta en 24 horas"
    },

    footer: {
      tagline: "Conectamos tu negocio con su siguiente nivel.",
      columns: [
        {
          title: "Servicios",
          links: [
            { label: "Sitios Web", href: ANCHORS.services },
            { label: "Marketing Digital", href: ANCHORS.services },
            { label: "Automatización IA", href: ANCHORS.services },
            { label: "SEO Local", href: ANCHORS.services }
          ]
        },
        {
          title: "Empresa",
          links: [
            { label: "Nosotros", href: ANCHORS.about },
            { label: "Proceso", href: ANCHORS.process },
            { label: "Contacto", href: ANCHORS.contact }
          ]
        }
      ],
      rights: "© 2026 Nexoz Digital Solutions, LLC · Big Spring, TX",
      builtWith: "Hecho con dedicación en West Texas"
    }
  },

  // ==========================================================================
  // ENGLISH
  // ==========================================================================
  en: {
    nav: [
      { label: "Services", href: ANCHORS.services },
      { label: "Process", href: ANCHORS.process },
      { label: "About", href: ANCHORS.about },
      { label: "Contact", href: ANCHORS.contact }
    ],
    navCta: "Request Yours",

    hero: {
      eyebrow: "Bilingual Digital Agency · Big Spring, TX",
      headline: "Your business, finally found. In Spanish, in English, in Big Spring.",
      subhead:
        "We design digital presence that connects your business with the customers already looking for you. In Spanish. In English. In your city.",
      ctaPrimary: "Get your Free Diagnosis",
      ctaSecondary: "See our services",
      note: "No commitment · 24-hour response · 100% bilingual"
    },

    proof: [
      { icon: "star", label: "Google Verified" },
      { icon: "pin", label: "Big Spring, TX" },
      { icon: "globe", label: "Bilingual EN/ES" },
      { icon: "bolt", label: "Projects delivered" }
    ],

    problem: {
      headline: "Is your business invisible online?",
      intro:
        "Every day, potential customers search for exactly what you offer. If they can't find you, they find your competition.",
      points: [
        {
          icon: "search-off",
          title: "Nobody finds you on Google",
          body: "Without an optimized digital presence, your business simply doesn't show up when people search for your services."
        },
        {
          icon: "clock",
          title: "You lose customers every day",
          body: "A slow, confusing, or nonexistent website sends your customers straight to the competition."
        },
        {
          icon: "language",
          title: "Your message doesn't connect",
          body: "Speaking to a bilingual community in just one language leaves half your customers out of the conversation."
        }
      ]
    },

    solution: {
      headline: "Your digital team. In your language. In your city.",
      body:
        "Nexoz Digital is the partner your business needs to grow online. We combine high-end design, marketing strategy, and AI automation — all with a close, bilingual, results-focused approach.",
      differentiators: [
        {
          icon: "handshake",
          title: "Close & bilingual service",
          body: "We speak your language — literally. Personal attention in English and Spanish, no middlemen."
        },
        {
          icon: "target",
          title: "Focused on results",
          body: "We don't sell likes. We build systems that generate real, measurable leads, calls, and sales."
        },
        {
          icon: "cpu",
          title: "Technology & AI on your side",
          body: "We automate the repetitive so you can focus on what you do best: running your business."
        }
      ],
      cta: "Let's talk about your project"
    },

    services: {
      eyebrow: "What we do",
      headline: "Complete digital solutions for your business",
      intro:
        "From your first website to intelligent automation systems — six concrete ways to stop losing customers to invisibility.",
      items: [
        {
          key: "web",
          name: "Websites",
          description:
            "Fast, modern sites designed to turn visitors into customers.",
          bullets: [
            "Responsive, custom design",
            "Optimized for speed & SEO",
            "Ready to sell 24/7"
          ],
          cta: "See websites"
        },
        {
          key: "marketing",
          name: "Digital Marketing",
          description:
            "Campaigns that put your business in front of the right people.",
          bullets: [
            "Google & social advertising",
            "Content that connects",
            "Clear, measurable reports"
          ],
          cta: "See campaigns"
        },
        {
          key: "ai",
          name: "AI Automation",
          description:
            "Smart agents and workflows that work for you around the clock.",
          bullets: [
            "Automated customer replies",
            "Connected follow-up & CRM",
            "Fewer manual tasks"
          ],
          cta: "See automation"
        },
        {
          key: "brand",
          name: "Brand Design",
          description:
            "A memorable visual identity that sets you apart from the rest.",
          bullets: [
            "Logo & full identity",
            "Consistent brand guide",
            "Assets for every channel"
          ],
          cta: "See identity work"
        },
        {
          key: "seo",
          name: "Local SEO",
          description:
            "Show up first when your customers search in your city.",
          bullets: [
            "Google Business optimization",
            "Local search ranking",
            "More calls & visits"
          ],
          cta: "See rankings"
        },
        {
          key: "tech",
          name: "Tech Services",
          description:
            "Technical support, hosting, and integrations so everything just works.",
          bullets: [
            "Hosting & domains",
            "Maintenance & support",
            "Custom integrations"
          ],
          cta: "See support"
        }
      ]
    },

    process: {
      eyebrow: "How we work",
      headline: "Four steps toward your growth",
      steps: [
        {
          number: "01",
          title: "Diagnosis",
          description:
            "We analyze your business, market, and competition to understand where you are and where you can go."
        },
        {
          number: "02",
          title: "Strategy",
          description:
            "We design a clear, custom plan with real priorities and expected results."
        },
        {
          number: "03",
          title: "Execution",
          description:
            "We build and implement every piece with quality, speed, and constant communication."
        },
        {
          number: "04",
          title: "Results",
          description:
            "We measure, optimize, and grow with you. Your success is the metric that matters."
        }
      ]
    },

    social: {
      headline: "What our clients say",
      note: "First real testimonials coming soon",
      testimonials: [
        {
          quote:
            "Finally someone who understands my business and speaks plainly. My site looks amazing and I'm already getting calls.",
          name: "Nexoz Client",
          role: "Local business · Big Spring, TX",
          initials: "NC"
        },
        {
          quote:
            "The bilingual approach made all the difference. They understood exactly what my community needed.",
          name: "Nexoz Client",
          role: "Services · West Texas",
          initials: "NC"
        }
      ]
    },

    lead: {
      eyebrow: "Express Digital Diagnosis",
      headline: "Download your free Express Digital Diagnosis",
      description:
        "Find out exactly what's holding back your business's digital growth — and what to do about it. Free, no strings attached.",
      includes: [
        "Analysis of your current digital presence",
        "Comparison against your local competition",
        "3 concrete actions to grow this month"
      ],
      steps: [
        "You submit the form",
        "We reach out within 24-48h",
        "You get your diagnosis, free, no strings attached"
      ],
      form: {
        name: "Name",
        email: "Email",
        phone: "Phone (optional)",
        businessType: "Type of business",
        businessTypePlaceholder: "Select an option",
        businessTypes: [
          "Restaurant / Food",
          "Professional services",
          "Retail / Store",
          "Construction / Trades",
          "Health / Wellness",
          "Other"
        ],
        submit: "I want my Free Diagnosis",
        sending: "Sending...",
        success: "Got it!",
        successNext:
          "We'll reach out within 24-48h by email (or WhatsApp if you left your phone) with your Express Digital Diagnosis.",
        trustNote: "No spam. We reply within 24-48h.",
        error:
          "Something went wrong. Email us directly at hola@nexozdigital.com and we'll sort it out."
      }
    },

    about: {
      eyebrow: "Our story",
      headline: "Hi, I'm Yaciel — founder of Nexoz Digital",
      paragraphs: [
        "I grew up between two languages and two cultures, and I kept seeing the same thing: amazing businesses in my community working hard but invisible online. Not for lack of talent, but for lack of someone to speak plainly and walk beside them.",
        "I founded Nexoz Digital in Big Spring, TX, to change that. No empty jargon, no inflated promises — just honest work, quality design, and technology put to work for your growth.",
        "When you work with Nexoz, you work with me and a team that takes your business as seriously as you do."
      ],
      signature: "Yaciel · Founder, Nexoz Digital"
    },

    faq: {
      headline: "Frequently asked questions",
      subhead: "Everything you need to know before taking the first step",
      items: [
        {
          question: "How much does it cost to build a professional website?",
          answer:
            "Cost depends on the project scope. We offer packages starting at $500 for basic sites up to custom AI-powered projects. Your Free Diagnosis includes an exact quote with no commitment."
        },
        {
          question: "Do you work with businesses that don't speak English?",
          answer:
            "Yes, that's exactly what makes us unique. Nexoz was born bilingual. All our work — communication, documentation, support — is available in Spanish and English."
        },
        {
          question: "How long does it take to build my website?",
          answer:
            "A professional site typically takes 2 to 4 weeks from design approval. More complex sites with automation may take 6 to 8 weeks."
        },
        {
          question: "What does the Free Digital Diagnosis include?",
          answer:
            "We analyze your current presence on Google, social media, and local competition. You receive a report with your most critical gaps and 3 concrete actions to improve your visibility this month."
        },
        {
          question: "Are you located in Big Spring, Texas?",
          answer:
            "Yes. Nexoz Digital Solutions is headquartered in Big Spring, TX and we serve businesses across West Texas and the rest of the United States remotely."
        },
        {
          question: "What is AI automation and how does it help my business?",
          answer:
            "AI automation means systems that do repetitive work for you: answering messages, scheduling appointments, sending follow-ups. They free your time so you can focus on serving customers and growing."
        },
        {
          question: "Can I update my website after it's ready?",
          answer:
            "Yes. All our sites include an admin panel where you can edit text, add photos, and update prices without technical knowledge. We also offer monthly maintenance plans."
        },
        {
          question: "Do you do social media marketing for local businesses?",
          answer:
            "Yes, we design content and advertising strategies on Facebook, Instagram, and Google targeting local customers. All in Spanish and English depending on your audience."
        },
        {
          question: "What makes Nexoz different from other digital agencies?",
          answer:
            "Three things: we are genuinely bilingual (not translated), we understand Hispanic business culture from the inside, and we use AI in everything we do — not as a buzzword, but as a real tool that reduces your costs."
        },
        {
          question: "Do you work with businesses outside Texas?",
          answer:
            "Yes. Although we have a physical presence in Big Spring, TX, we work 100% remotely with businesses across the United States, especially with the Hispanic community."
        }
      ]
    },

    finalCta: {
      headlineLead: "Your next customer is searching for you",
      headlineAccent: "right now.",
      subhead:
        "We'll tell you exactly what's happening with your online presence — no cost, no fine print, no obligation.",
      cta: "Yes, Send My Diagnosis",
      note: "No commitment · 24-hour response"
    },

    footer: {
      tagline: "Connecting Businesses to Their Next Level.",
      columns: [
        {
          title: "Services",
          links: [
            { label: "Websites", href: ANCHORS.services },
            { label: "Digital Marketing", href: ANCHORS.services },
            { label: "AI Automation", href: ANCHORS.services },
            { label: "Local SEO", href: ANCHORS.services }
          ]
        },
        {
          title: "Company",
          links: [
            { label: "About", href: ANCHORS.about },
            { label: "Process", href: ANCHORS.process },
            { label: "Contact", href: ANCHORS.contact }
          ]
        }
      ],
      rights: "© 2026 Nexoz Digital Solutions, LLC · Big Spring, TX",
      builtWith: "Made with care in West Texas"
    }
  }
};
