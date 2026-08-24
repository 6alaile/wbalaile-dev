import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

const SKILLS: { category: string; items: { name: string; icon?: string }[] }[] = [
  {
    category: 'Languages',
    items: [
      { name: 'HTML', icon: '/icons/html5-svgrepo-com.svg' },
      { name: 'CSS', icon: '/icons/css3-svgrepo-com.svg' },
      { name: 'JavaScript', icon: '/icons/javascript-svgrepo-com.svg' },
      { name: 'Python', icon: '/icons/python-svgrepo-com.svg' },
      { name: 'SQL', icon: '/icons/sql-svgrepo-com.svg' },
      { name: 'Solidity', icon: '/icons/light-solidity-svgrepo-com.svg' },
    ],
  },
  {
    category: 'Frameworks',
    items: [
      { name: 'Vue.js', icon: '/icons/vue-dot-js-svgrepo-com.svg' },
      { name: 'Express.js', icon: '/icons/express-svgrepo-com.svg' },
      { name: 'Django', icon: '/icons/django-svgrepo-com.svg' },
      { name: 'Bootstrap', icon: '/icons/bootstrap-svgrepo-com.svg' },
      { name: 'React', icon: '/icons/react-svgrepo-com.svg' },
      { name: 'Tailwind CSS', icon: '/icons/tailwind-svgrepo-com.svg' },
    ],
  },
  {
    category: 'Databases',
    items: [
      { name: 'MongoDB', icon: '/icons/mongodb-svgrepo-com.svg' },
      { name: 'MySQL', icon: '/icons/mysql-svgrepo-com.svg' },
      { name: 'PostgreSQL', icon: '/icons/postgresql-svgrepo-com.svg' },
    ],
  },
  {
    category: 'Tools',
    items: [
      { name: 'Node.js', icon: '/icons/node-dot-js-svgrepo-com.svg' },
      { name: 'Vite', icon: '/icons/vite-svgrepo-com.svg' },
      { name: 'GitHub', icon: '/icons/github-svgrepo-com.svg' },
      { name: 'cPanel', icon: '/icons/cpanel-svgrepo-com.svg' },
      { name: 'Webflow', icon: '/icons/webflow-svgrepo-com.svg' },
      { name: 'Shopify', icon: '/icons/shopify-svgrepo-com.svg' },
      { name: 'Hardhat', icon: '/icons/hardhat-seeklogo.com.svg' },
    ],
  },
]

const PROJECTS = [
  {
    title: 'Risk Management Calculator',
    type: 'Frontend Tool',
    description:
      'A precision forex risk calculator built for traders to size positions, manage drawdown, and protect capital across currency pairs.',
    tags: ['JavaScript', 'HTML/CSS', 'Trading'],
    img: '/portfolio/risk-management-calculator-3-active.png',
    url: 'https://forex-calculator.netlify.app',
    page: '/pages/forex-calculator.html',
    category: 'Front-End Web Development, Web Design, Finance',
    publishDate: '22 June, 2021',
    about:
      'A calculator that can be used by traders to determine whether they can open a position based on the balance in their account.\n\nThis tool was built using HTML, CSS and JavaScript. The source code can be found on Github. The layout is based on Neuomorphic design principles.',
    images: [
      '/portfolio/risk-management-calculator-1.png',
      '/portfolio/risk-management-calculator-2-intructions.png',
      '/portfolio/risk-management-calculator-3-active.png',
      '/portfolio/risk-management-calculator-4-github.png',
    ],
  },
  {
    title: 'MojaCoin',
    type: 'Web3 / Smart Contract',
    description:
      'BEP20 token deployed on Binance Smart Chain with custom tokenomics. Built using Solidity and Hardhat with full EVM compatibility.',
    tags: ['Solidity', 'Hardhat', 'BEP20', 'DeFi'],
    img: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&h=500&fit=crop&auto=format',
    url: 'https://github.com/wilby-mj/Moja-Coin',
    page: '/pages/mojaCoin-token.html',
    category: 'Blockchain Development',
    publishDate: '15 February, 2022',
    about:
      'MojaCoin is a cryptocurrency token built on the Binance Smart Chain using the BEP20 standard. As of writing the token has been deployed to the Testnet only and is available to view on BSCScan Testnet or the GitHub repo.',
    images: [],
  },
  {
    title: 'Football Odds AI',
    type: 'Backend Application',
    description:
      'Server-side prediction engine that aggregates match data, applies statistical models, and surfaces value bets across major leagues.',
    tags: ['Python', 'Django', 'APIs', 'ML'],
    img: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=500&fit=crop&auto=format',
    url: 'https://github.com/wilby-mj/Foootball-Odds-AI',
    page: '/pages/football-odds-ai.html',
    category: 'Back-End Development, Artificial Intelligence (AI), Football',
    publishDate: 'ETA 2022',
    about:
      'A robot that scrapes betting sites in Tanzania and returns the events with the best odds. Built in Python using Django and Selenium.',
    images: [],
  },
]

const SERVICES = [
  {
    num: '01',
    title: 'Web Development',
    desc: 'Full-stack builds from landing pages to complex web apps — clean code, fast servers, and production-ready deploys.',
  },
  {
    num: '02',
    title: 'dApp & Smart Contracts',
    desc: 'EVM-compatible smart contracts, DeFi protocols, and NFT platforms audited and deployed on mainnet.',
  },
  {
    num: '03',
    title: 'Technical Analysis',
    desc: 'Custom charting tools and market dashboards for forex, indices, and crypto built for real trading workflows.',
  },
  {
    num: '04',
    title: 'Content Creation',
    desc: 'Video, image, and audio content that communicates technical ideas clearly — for products, tutorials, and brands.',
  },
]

const PROCESS = [
  {
    num: '01',
    title: 'Discovery',
    desc: "We talk through what you're building, what you need, and what success looks like. No templates — every project starts here.",
  },
  {
    num: '02',
    title: 'Strategy',
    desc: 'I map out the architecture, stack, and timeline. You get a clear plan before a single line of code is written.',
  },
  {
    num: '03',
    title: 'Build',
    desc: 'Development with regular check-ins. You see progress throughout — not just at the end.',
  },
  {
    num: '04',
    title: 'Launch',
    desc: 'Deployed, tested, and handed off with documentation. Post-launch support included.',
  },
]

const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" }

function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [threshold])
  return scrolled
}

function Nav() {
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)

  return (
    <nav
      style={MONO}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#080808]/95 backdrop-blur-md border-b border-white/[0.08] shadow-2xl' : 'bg-[#080808]/60 backdrop-blur-sm border-b border-white/[0.04]'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        <a href="#" className="text-sm font-bold tracking-widest text-[#f0ede8] uppercase hover:text-[#00e87a] transition-colors">
          WB<span className="text-[#00e87a]">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.slice(0, -1).map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-xs tracking-widest uppercase text-[#88847f] hover:text-[#f0ede8] transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="text-xs tracking-widest uppercase bg-[#00e87a] text-[#080808] px-5 py-2.5 font-bold hover:bg-[#00ff88] transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Hire Me
          </a>
        </div>

        <button
          className="md:hidden text-[#f0ede8] p-2 flex flex-col gap-1.5 focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-current transition-all duration-200 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-all duration-200 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#080808] border-b border-white/[0.08] px-6 pb-6 pt-4 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-xs tracking-widest uppercase text-[#a8a49e] hover:text-[#00e87a] transition-colors py-1"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative px-6 lg:px-8 pt-28 md:pt-36 pb-16 md:pb-24 border-b border-white/[0.08] min-h-[90vh] flex flex-col justify-between">
      <div className="max-w-6xl mx-auto w-full my-auto">
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#00e87a]/10 border border-[#00e87a]/20 mb-8 md:mb-10">
          <span className="w-2 h-2 rounded-full bg-[#00e87a] animate-pulse" />
          <span style={MONO} className="text-xs font-semibold tracking-widest uppercase text-[#00e87a]">
            Available for work
          </span>
        </div>

        <h1
          style={{ ...MONO, lineHeight: 1.02 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-[#f0ede8] mb-8 max-w-5xl tracking-tight"
        >
          Full Stack
          <br />
          Web Dev<span className="text-[#00e87a]">.</span>
          <br />
          <span style={{ WebkitTextStroke: '1px rgba(240,237,232,0.22)', color: 'transparent' }}>
            Web3 Builder
          </span>
          <span className="text-[#00e87a] animate-pulse">_</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-[#a8a49e] max-w-2xl mb-10 md:mb-12 font-light leading-relaxed">
          I build fast, functional web applications and smart contracts — from precision trading tools
          to EVM DeFi protocols. Based in Dar es Salaam, Tanzania.
        </p>

        <div className="flex flex-wrap gap-4 mb-16 md:mb-20">
          <a
            href="#work"
            style={MONO}
            className="inline-flex items-center gap-3 bg-[#00e87a] text-[#080808] px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-[#00ff88] transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            See My Work <span>→</span>
          </a>
          <a
            href="#contact"
            style={MONO}
            className="inline-flex items-center gap-3 border border-white/20 text-[#f0ede8] px-8 py-4 text-xs font-semibold tracking-widest uppercase hover:border-[#00e87a] hover:text-[#00e87a] transition-all duration-150"
          >
            Get In Touch
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 pt-8 border-t border-white/[0.08]">
          {[
            ['Location', 'Dar es Salaam, TZ'],
            ['Focus', 'Web + Web3'],
            ['Stack', 'Full Stack'],
            ['Status', 'Open to Work'],
          ].map(([label, value]) => (
            <div key={label} className="flex flex-col gap-1">
              <p style={MONO} className="text-xs tracking-widest uppercase text-[#6b6762]">
                {label}
              </p>
              <p className="text-sm md:text-base text-[#f0ede8] font-medium">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="px-6 lg:px-8 py-20 md:py-28 border-b border-white/[0.08]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="md:col-span-6">
          <p style={MONO} className="text-xs tracking-widest uppercase text-[#00e87a] mb-4">
            // about
          </p>
          <h2
            style={{ ...MONO, lineHeight: 1.15 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f0ede8] mb-8"
          >
            Code that ships.
            <br />
            Products that work.
          </h2>
          <p className="text-[#a8a49e] leading-relaxed mb-6 font-light text-base md:text-lg">
            I'm William Mujuni Balaile — a full stack developer who builds robust, scalable web applications
            and decentralized protocols. My background bridges classic web architectures with Solidity smart contract development.
          </p>
          <p className="text-[#a8a49e] leading-relaxed font-light text-base md:text-lg mb-8">
            Beyond engineering, I actively trade forex, indices, and crypto markets — giving me firsthand domain knowledge
            for building high-performance fintech dashboards and risk tools.
          </p>
          <p>
            <img src="/profile.jpg" alt="William Balaile" className="rounded-lg shadow-lg" />
          </p>
        </div>

        <div className="md:col-span-6 space-y-6">
          <p style={MONO} className="text-xs tracking-widest uppercase text-[#00e87a] mb-2">
            // technical skills
          </p>
          {SKILLS.map(({ category, items }) => (
            <div key={category} className="bg-[#111111] p-5 border border-white/[0.08] rounded-xs">
              <p style={MONO} className="text-xs tracking-widest uppercase text-[#88847f] mb-3">
                {category}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill.name}
                    style={MONO}
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1 bg-[#181818] border border-white/[0.08] text-[#f0ede8] hover:border-[#00e87a]/40 transition-colors"
                  >
                    {skill.icon && (
                      <img src={skill.icon} alt="" className="w-5 h-5 brightness-0 invert opacity-70" />
                    )}
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectModal({ project, onClose }: { project: typeof PROJECTS[number] | null; onClose: () => void }) {
  const [slide, setSlide] = useState(0)
  const hasSlides = project && project.images.length > 0

  useEffect(() => {
    setSlide(0)
  }, [project])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (hasSlides && e.key === 'ArrowRight') setSlide((s) => (s + 1) % project!.images.length)
      if (hasSlides && e.key === 'ArrowLeft') setSlide((s) => (s - 1 + project!.images.length) % project!.images.length)
    }
    if (project) window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [project, onClose, hasSlides])

  if (!project) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#080808]/90 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#111111] border border-white/[0.08] w-full max-w-5xl relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 text-[#88847f] hover:text-[#00e87a] transition-colors text-2xl leading-none cursor-pointer"
        >
          ×
        </button>

        <h2 style={MONO} className="text-xl md:text-2xl font-bold text-[#f0ede8] px-8 pt-8 pb-6 border-b border-white/[0.08]">
          {project.title}
        </h2>

        <div className="grid md:grid-cols-12 gap-0">
          <div className="md:col-span-8 p-8 border-r border-white/[0.08]">
            <div className="bg-[#161616] overflow-hidden relative">
              {hasSlides ? (
                <>
                  <img
                    src={project.images[slide]}
                    alt={`${project.title} — slide ${slide + 1}`}
                    className="w-full object-cover transition-opacity duration-300"
                  />
                  <button
                    onClick={() => setSlide((s) => (s - 1 + project.images.length) % project.images.length)}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-[#080808]/80 text-[#f0ede8] hover:bg-[#00e87a] hover:text-[#080808] transition-colors cursor-pointer text-sm"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => setSlide((s) => (s + 1) % project.images.length)}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-[#080808]/80 text-[#f0ede8] hover:bg-[#00e87a] hover:text-[#080808] transition-colors cursor-pointer text-sm"
                  >
                    ›
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                    {project.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSlide(i)}
                        aria-label={`Go to image ${i + 1}`}
                        className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${
                          i === slide ? 'bg-[#00e87a]' : 'bg-white/30 hover:bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          <div className="md:col-span-4 p-8 flex flex-col justify-between">
            <div>
              <p style={MONO} className="text-base font-bold text-[#f0ede8] mb-4">
                Project Information
              </p>
              <div className="space-y-3 text-sm">
                <div>
                  <span style={MONO} className="text-[#a8a49e]">Category</span>
                  <p className="text-[#f0ede8] mt-1">{project.category}</p>
                </div>
                <div>
                  <span style={MONO} className="text-[#a8a49e]">Publish Date</span>
                  <p className="text-[#f0ede8] mt-1">{project.publishDate}</p>
                </div>
                <div>
                  <span style={MONO} className="text-[#a8a49e]">URL</span>
                  <p className="mt-1">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00e87a] hover:underline break-all"
                    >
                      {project.url.replace(/^https?:\/\//, '')}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-8 border-t border-white/[0.08]">
          <h3 style={MONO} className="text-lg font-bold text-[#f0ede8] mb-4">
            {project.title}
          </h3>
          <p className="text-sm text-[#a8a49e] font-light leading-relaxed whitespace-pre-line">
            {project.about}
          </p>
        </div>
      </div>
    </div>
  )
}

function Work() {
  const [hovered, setHovered] = useState<number | null>(null)
  const [modalProject, setModalProject] = useState<typeof PROJECTS[number] | null>(null)

  return (
    <section id="work" className="px-6 lg:px-8 py-20 md:py-28 border-b border-white/[0.08] bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/[0.08] gap-4">
          <div>
            <p style={MONO} className="text-xs tracking-widest uppercase text-[#00e87a] mb-3">
              // selected work
            </p>
            <h2
              style={{ ...MONO, lineHeight: 1.15 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f0ede8]"
            >
              What I've Built
            </h2>
          </div>
          <span style={MONO} className="text-xs text-[#88847f] tracking-widest uppercase">
            [{PROJECTS.length} Featured Projects]
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {PROJECTS.map((project, i) => (
            <div
              key={project.title}
              className="bg-[#111111] border border-white/[0.08] hover:border-[#00e87a]/40 transition-all duration-300 group flex flex-col justify-between"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div>
                <div className="relative overflow-hidden bg-[#161616]" style={{ aspectRatio: '16/10' }}>
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-[#080808]/85 flex items-center justify-center gap-3 transition-opacity duration-300"
                    style={{ opacity: hovered === i ? 1 : 0 }}
                  >
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={MONO}
                      className="text-xs tracking-widest uppercase text-[#00e87a] border border-[#00e87a] bg-[#080808] px-4 py-2.5 hover:bg-[#00e87a] hover:text-[#080808] transition-colors"
                    >
                      View Live ↗
                    </a>
                    <button
                      onClick={() => setModalProject(project)}
                      style={MONO}
                      className="text-xs tracking-widest uppercase text-[#f0ede8] border border-white/20 bg-[#080808] px-4 py-2.5 hover:border-[#00e87a] hover:text-[#00e87a] transition-colors cursor-pointer"
                    >
                      About Project
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <p style={MONO} className="text-xs tracking-widest uppercase text-[#00e87a] mb-2">
                    {project.type}
                  </p>
                  <h3
                    style={MONO}
                    className="text-base font-semibold text-[#f0ede8] mb-3 group-hover:text-[#00e87a] transition-colors"
                  >
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#a8a49e] font-light leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06]">
                  {project.tags.map((tag) => (
                    <span key={tag} style={MONO} className="text-xs px-2.5 py-1 bg-[#181818] text-[#88847f]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="px-6 lg:px-8 py-20 md:py-28 border-b border-white/[0.08]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p style={MONO} className="text-xs tracking-widest uppercase text-[#00e87a] mb-3">
            // what I do
          </p>
          <h2
            style={{ ...MONO, lineHeight: 1.15 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f0ede8]"
          >
            Services
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s) => (
            <div
              key={s.num}
              className="bg-[#111111] p-8 border border-white/[0.08] hover:border-[#00e87a]/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <p
                  style={MONO}
                  className="text-4xl md:text-5xl font-extrabold text-[#222222] group-hover:text-[#00e87a] transition-colors mb-6 leading-none"
                >
                  {s.num}
                </p>
                <h3
                  style={MONO}
                  className="text-xs font-semibold text-[#f0ede8] mb-3 tracking-widest uppercase"
                >
                  {s.title}
                </h3>
                <p className="text-sm text-[#a8a49e] font-light leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section id="process" className="px-6 lg:px-8 py-20 md:py-28 border-b border-white/[0.08] bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p style={MONO} className="text-xs tracking-widest uppercase text-[#00e87a] mb-3">
            // how it works
          </p>
          <h2
            style={{ ...MONO, lineHeight: 1.15 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f0ede8]"
          >
            The Process
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS.map((step) => (
            <div key={step.num} className="flex flex-col">
              <div
                style={MONO}
                className="w-12 h-12 flex items-center justify-center border border-[#00e87a] bg-[#080808] text-[#00e87a] text-xs font-bold mb-6"
              >
                {step.num}
              </div>
              <h3
                style={MONO}
                className="text-xs font-semibold text-[#f0ede8] mb-3 uppercase tracking-widest"
              >
                {step.title}
              </h3>
              <p className="text-sm text-[#a8a49e] font-light leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="px-6 lg:px-8 py-20 md:py-28 border-b border-white/[0.08]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="md:col-span-5">
          <p style={MONO} className="text-xs tracking-widest uppercase text-[#00e87a] mb-6">
            // let's work together
          </p>
          <h2
            style={{ ...MONO, lineHeight: 1.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0ede8] mb-8"
          >
            Have a project
            <br />
            in mind?
          </h2>
          <p className="text-[#a8a49e] font-light leading-relaxed mb-10 text-base">
            I take on select web and Web3 projects. If you have an application or contract to build —
            reach out and I'll respond within 24 hours.
          </p>

          <div className="space-y-6">
            <div className="border-t border-white/[0.08] pt-4">
              <p style={MONO} className="text-xs tracking-widest uppercase text-[#88847f] mb-2">
                Direct Email
              </p>
              <a
                href="mailto:wbalaile@live.com"
                style={MONO}
                className="text-[#f0ede8] hover:text-[#00e87a] transition-colors text-sm font-semibold"
              >
                hello@wbalaile.is-a.dev
              </a>
            </div>
            <div className="border-t border-white/[0.08] pt-4">
              <p style={MONO} className="text-xs tracking-widest uppercase text-[#88847f] mb-3">
                Social Profiles
              </p>
              <div className="flex flex-wrap gap-5">
                {[
                  { icon: '/icons/github-svgrepo-com.svg', label: 'GitHub', href: 'https://github.com/6alaile' },
                  { icon: '/icons/linkedin-svgrepo-com.svg', label: 'LinkedIn', href: 'https://linkedin.com/in/william-balaile-55426b133/' },
                ].map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={MONO}
                    className="inline-flex items-center gap-2 text-[#a8a49e] hover:text-[#00e87a] transition-colors text-xs tracking-widest uppercase"
                  >
                    <img src={l.icon} alt="" className="w-4 h-4 brightness-0 invert opacity-70" />
                    {l.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 bg-[#111111] p-8 md:p-10 border border-white/[0.08]">
          {sent ? (
            <div className="border border-[#00e87a]/40 bg-[#00e87a]/10 p-10 text-center">
              <p style={MONO} className="text-[#00e87a] text-sm tracking-widest uppercase mb-3 font-bold">
                Message Sent Successfully
              </p>
              <p className="text-[#f0ede8] font-light text-sm">
                Thank you for reaching out, William will get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { field: 'name', label: 'Your Name', type: 'text', placeholder: 'William Balaile' },
                { field: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
              ].map(({ field, label, type, placeholder }) => (
                <div key={field}>
                  <label style={MONO} className="block text-xs tracking-widest uppercase text-[#88847f] mb-2">
                    {label}
                  </label>
                  <input
                    type={type}
                    required
                    placeholder={placeholder}
                    value={form[field as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className="w-full bg-[#161616] border border-white/[0.1] text-[#f0ede8] px-4 py-3.5 text-sm placeholder:text-[#444] focus:outline-none focus:border-[#00e87a] transition-colors font-light"
                  />
                </div>
              ))}

              <div>
                <label style={MONO} className="block text-xs tracking-widest uppercase text-[#88847f] mb-2">
                  Project Type
                </label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full bg-[#161616] border border-white/[0.1] text-[#f0ede8] px-4 py-3.5 text-sm focus:outline-none focus:border-[#00e87a] transition-colors font-light appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select a service</option>
                  <option>Web Development</option>
                  <option>dApp / Smart Contract</option>
                  <option>Technical Analysis Tool</option>
                  <option>Content Creation</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label style={MONO} className="block text-xs tracking-widest uppercase text-[#88847f] mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell me about your project scope and timeline..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-[#161616] border border-white/[0.1] text-[#f0ede8] px-4 py-3.5 text-sm placeholder:text-[#444] focus:outline-none focus:border-[#00e87a] transition-colors font-light resize-none"
                />
              </div>

              <button
                type="submit"
                style={MONO}
                className="w-full bg-[#00e87a] text-[#080808] py-4 text-xs tracking-widest uppercase font-bold hover:bg-[#00ff88] transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                Send Message →
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="px-6 lg:px-8 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <a href="#" style={MONO} className="text-sm font-bold tracking-widest text-[#f0ede8] uppercase hover:text-[#00e87a] transition-colors">
          WB<span className="text-[#00e87a]">.</span>
        </a>
        <p style={MONO} className="text-xs text-[#88847f] tracking-widest text-center">
          © 2026 William Mujuni Balaile
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/6alaile"
            target="_blank"
            rel="noopener noreferrer"
            style={MONO}
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#88847f] hover:text-[#00e87a] transition-colors"
          >
            <img src="/icons/github-svgrepo-com.svg" alt="" className="w-4 h-4 brightness-0 invert opacity-50" />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/william-balaile-55426b133/"
            target="_blank"
            rel="noopener noreferrer"
            style={MONO}
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#88847f] hover:text-[#00e87a] transition-colors"
          >
            <img src="/icons/linkedin-svgrepo-com.svg" alt="" className="w-4 h-4 brightness-0 invert opacity-50" />
            LinkedIn
          </a>
          <a
            href="#"
            style={MONO}
            className="text-xs tracking-widest uppercase text-[#00e87a] hover:underline ml-2"
          >
            ↑ Top
          </a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="bg-[#080808] min-h-screen text-[#f0ede8] selection:bg-[#00e87a] selection:text-[#080808]">
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Services />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
