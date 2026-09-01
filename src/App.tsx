import { useState, useEffect, useRef } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import gsap from 'gsap'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
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
      { name: 'Bootstrap', icon: '/icons/bootstrap-svgrepo-com.svg' },
      { name: 'Vue.js', icon: '/icons/vue-dot-js-svgrepo-com.svg' },
      { name: 'React', icon: '/icons/react-svgrepo-com.svg' },
      { name: 'Express.js', icon: '/icons/express-svgrepo-com.svg' },
      { name: 'Tailwind CSS', icon: '/icons/tailwind-svgrepo-com.svg' },
      { name: 'Flask', icon: '/icons/flask-svgrepo-com.svg' },
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
    title: 'Football Odds Assistant',
    type: 'Backend Application',
    description:
      'A Server-side recommendation engine designed to identify value bets across major football leagues using a predefined algorithm.',
    tags: ['Vue 3', 'Python', 'APIs', 'SPA', 'CI'],
    img: '/portfolio/football-odds-ai-1-default.webp',
    url: 'https://kanjibai.vercel.app',
    category: 'Back-End Development, Football',
    publishDate: '28 April, 2026',
    about:
      'This system collects match data from a sports betting site, then sources data on the teams in the fixture to determine a likely outcome. \n A challenge when building the system is finding APIs that provide reliable and timely data for football matches across major and minor leagues. \n  The backend is built with Python and Flask, while the frontend is a single-page application built with Vue 3. Its architecture is modular, allowing for easy updates to the algorithm, data sources or UI as needed. \n currently accessible and in use while being actively developed.',
    images: [
      '/portfolio/football-odds-ai-1-default.webp',
      '/portfolio/football-odds-ai-2-sample.webp',
      '/portfolio/football-odds-ai-3-sample.webp',
      '/portfolio/football-odds-ai-4-repo.webp',
    ],
  },
  {
    title: 'Risk Management Calculator',
    type: 'Frontend Tool',
    description:
      'A calculator built for traders to estimate risk before deploying capital into the markets.',
    tags: ['Bootstrap', 'APIs', 'CDNs', 'Trading'],
    img: '/portfolio/risk-management-calculator-3-active.webp',
    url: 'https://forex-calculator.netlify.app',
    category: 'Front-End Web Development, Web Design, Finance',
    publishDate: '22 June, 2021',
    about:
      'This calculator is for traders to determine whether they have enough capital to open a position based on the balance in their account, and then estimate potential profits or losses of the position they want to execute. \n A challenge was making sure real-time market data is accurately reflected in the calculations, this was solved by using a pricing API. \n HTML, CSS and JavaScript with Bootstrap for styling were used to build the tool. It is hosted on Netlify and uses a CDN for fast delivery. \n Is being used by traders and currently has been ⭐ 13 times on GitHub.',
    images: [
      '/portfolio/risk-management-calculator-1.webp',
      '/portfolio/risk-management-calculator-2-instructions.webp',
      '/portfolio/risk-management-calculator-3-active.webp',
      '/portfolio/risk-management-calculator-4-github.webp',
    ],
  },
  {
    title: 'MojaCoin',
    type: 'Smart Contract (web3)',
    description:
      'BEP20 token deployed on Binance Smart Chain with custom tokenomics. Built using Solidity and Hardhat with full EVM compatibility.',
    tags: ['Solidity', 'Hardhat', 'BEP20', 'DeFi'],
    img: '/portfolio/token-bscscan.webp',
    url: 'https://testnet.bscscan.com/token/0xc9b622b621d57fef2b077e4850eb7cca10659be8#transactions',
    category: 'Blockchain Development',
    publishDate: '15 February, 2022',
    about:
      'MojaCoin is a cryptocurrency token built on the Binance Smart Chain using the BEP20 standard. As of writing the token has been deployed to the Testnet only and is available to view on BSCScan Testnet or the GitHub repo. \n A challenge when building the token was ensuring that the smart contract is secure and free from vulnerabilities. This was solved by following best practices for smart contract development and using a testing framework to thoroughly test the contract before deployment. \n The token is built using Solidity and Hardhat, with full EVM compatibility, allowing it to be easily integrated into other blockchain applications.',
    images: [
      '/portfolio/token-bscscan.webp',
      '/portfolio/token-smart-contract-bsc.webp',
      '/portfolio/token-smart-contract-source-code.webp',
    ],
  },
]

const SERVICES = [
  {
    num: '01',
    title: 'Websites & Applications',
    desc: 'From landing pages to full scale applications — clean code, fast servers, and production-ready deploys.',
  },
  {
    num: '02',
    title: 'eCommerce Solutions',
    desc: 'Sell your products online with a custom storefront, payment gateway, and inventory management system.',
  },
  {
    num: '03',
    title: 'dApp & Smart Contracts',
    desc: 'EVM-compatible smart contracts, DeFi protocols, and NFT platforms audited and deployed on mainnet.',
  },
  {
    num: '04',
    title: 'Maintenance and Support',
    desc: 'Ongoing maintenance, updates, and technical support to ensure your digital assets remain secure and performant.',
  },
]

const PROCESS = [
  {
    num: '01',
    title: 'Ideation',
    desc: "This could be a problem I or someone else is facing, or a moment of inspiration. \n Research is done to find if an alternative exists or if the situation is unique.",
  },
  {
    num: '02',
    title: 'Scope & Planning',
    desc: 'First I validate the idea with a small prototype or proof of concept, followed by mapping out the architecture, stack, and timeline. This is to have a clear plan and point of reference.',
  },
  {
    num: '03',
    title: 'Building & Refining',
    desc: 'Here is where the fun (and stress) happens. Each planned (and unplanned) feature is built, tested, and iterated upon until the product is ready for launch.',
  },
  {
    num: '04',
    title: 'Launch',
    desc: 'Finally, the product is launched and made available to users.',
  },
]

const PRICING_PLANS = [
  {
    name: 'Website',
    description: 'A simple, responsive website for your business or personal use.',
    target: 'Entrepreneurs, and businesses who want to establish an online presence with a professional website.',
    price: '400,000',
    url: 'https://snippe.me/pay/website',
    features: ['Custom landing page (up to 5 pages)', 'Custom .co.tz Domain + Emails', '1yr Hosting + Maintenance', 'Contact form + Chat on WhatsApp', 'Search Engine Optimization'],
  },
  {
    name: 'eCommerce',
    description: 'A fully-featured shop for selling products and managing inventory.',
    target: 'Entrepreneurs, and businesses who are selling or want to sell online. A centralized platform for inventory, orders, and customer relations.',
    price: '1,800,000',
    url: 'https://snippe.me/p/NH2IAJVA9L',
    features: ['All core Website features included', 'Secure Payment Gateway integration', 'Shopping Cart & Checkout system', 'Inventory, Order Tracking & Discount systems', 'Automated customer invoice & email notifications'],
  },
  {
    name: 'Web Application',
    description: 'A responsive application built to meet your specific business needs.',
    target: 'Entrepreneurs, and businesses needing internal tools for process automation or customer-facing applications.',
    price: '3,200,000',
    url: 'https://snippe.me/p/MpEd3XUxtf',
    features: ['All core Website features included', 'Secure Authentication (Login/Signup)', 'Interactive Dashboard + Database', 'Business Logic & API Integration', 'Admin Panel (for managing users, content, and data)'],
  },
]

const TAG_ICONS: Record<string, string> = {
  'Vue 3': '/icons/vue-dot-js-svgrepo-com.svg',
  Python: '/icons/python-svgrepo-com.svg',
  Bootstrap: '/icons/bootstrap-svgrepo-com.svg',
  Solidity: '/icons/light-solidity-svgrepo-com.svg',
  Hardhat: '/icons/hardhat-seeklogo.com.svg',
  React: '/icons/react-svgrepo-com.svg',
  'Node.js': '/icons/node-dot-js-svgrepo-com.svg',
  Express: '/icons/express-svgrepo-com.svg',
  MongoDB: '/icons/mongodb-svgrepo-com.svg',
  MySQL: '/icons/mysql-svgrepo-com.svg',
  PostgreSQL: '/icons/postgresql-svgrepo-com.svg',
  Tailwind: '/icons/tailwind-svgrepo-com.svg',
  Vite: '/icons/vite-svgrepo-com.svg',
}

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
  const animRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scenes = animRef.current?.querySelectorAll<HTMLImageElement>('.hero-scene')
    if (!scenes || scenes.length === 0) return

    gsap.set(scenes[0], { opacity: 1 })
    gsap.set(scenes, { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' })

    const tl = gsap.timeline({ repeat: -1 })
    scenes.forEach((scene, i) => {
      const next = scenes[(i + 1) % scenes.length]
      tl.to(scene, { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, i * 2.4 + 1.8)
      tl.to(next, { opacity: 1, duration: 0.6, ease: 'power2.inOut' }, i * 2.4 + 1.8)
    })

    return () => { tl.kill() }
  }, [])

  return (
    <section className="relative px-6 lg:px-8 pt-28 md:pt-36 pb-16 md:pb-10 border-b border-white/[0.08] min-h-[90vh] flex flex-col justify-between overflow-hidden">
      <div ref={animRef} className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[45%] h-[70%] opacity-20 pointer-events-none">
        <img src="/hero-anim/scene-1.webp" alt="" className="hero-scene" />
        <img src="/hero-anim/scene-2.webp" alt="" className="hero-scene" />
        <img src="/hero-anim/scene-3.webp" alt="" className="hero-scene" />
        <img src="/hero-anim/scene-4.webp" alt="" className="hero-scene" />
        <img src="/hero-anim/scene-5.webp" alt="" className="hero-scene" />
      </div>

      <div className="max-w-6xl mx-auto w-full my-auto relative z-10">
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
          <span style={{ WebkitTextStroke: '1px rgba(240,237,232,0.22)', color: 'transparent', textDecoration: 'line-through' }}>
            vibe coder
          </span>
          <br />
          Web Developer<span className="text-[#00e87a]">.</span>          
          <span className="text-[#00e87a] animate-pulse">_</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-[#a8a49e] max-w-2xl mb-10 md:mb-12 font-light leading-relaxed">
          I use code to solve problems by building functional web applications that are user-friendly, scalable, and secure.
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
            ['Focus', 'Progressive Web Apps'],
            ['Current Stack', 'JavaScript, Python, PostgreSQL'],
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
            I'm William — a full stack developer who builds user-friendly, scalable web applications. 
            Being in the tech space has given me the opportunity to experiment with different technologies including web3 and AI.
            My background bridges classic web principles with modern development practices to deliver high-quality software that meets real-world needs.
          </p>
          <p className="text-[#a8a49e] leading-relaxed font-light text-base md:text-lg mb-8">
            Beyond writing code, I actively trade forex, indices, and crypto markets — giving me firsthand domain knowledge
            for building high-performance fintech tools. Additionally, being a lifelong football fan gives me perspective on how
            the use of tech in the beautiful game can be an opportunity for innovation.
          </p>
        </div>

        <div className="md:col-span-6 space-y-6">
          <p>
            <img src="/profile.webp" alt="William Balaile" className="rounded-lg shadow-lg" />
          </p>
        </div>
      </div>
        <br />
      <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="md:col-span-12">
          <p style={MONO} className="text-xs tracking-widest uppercase text-[#00e87a] mb-6">
            // technical skills
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
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
      </div>
    </section>
  )
}

function Work() {
  const [hovered, setHovered] = useState<number | null>(null)
  const [modalProject, setModalProject] = useState<typeof PROJECTS[number] | null>(null)

  return (
    <section id="work" className="px-6 lg:px-8 py-20 md:py-28 border-b border-white/[0.08] bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 gap-4">
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
                <div>
                  <span style={MONO} className="text-[#a8a49e]">Technologies</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={MONO}
                        className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 bg-[#181818] border border-white/[0.08] text-[#f0ede8]"
                      >
                        {TAG_ICONS[tag] && (
                          <img src={TAG_ICONS[tag]} alt="" className="w-3.5 h-3.5 brightness-0 invert opacity-70" />
                        )}
                        {tag}
                      </span>
                    ))}
                  </div>
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

function ScrollCTA() {
  const [visible, setVisible] = useState(false)
  const lastScroll = useRef(0)

  useEffect(() => {
    const workEl = document.getElementById('work')
    const processEl = document.getElementById('process')
    if (!workEl || !processEl) return

    const handler = () => {
      const y = window.scrollY
      const scrollingDown = y > lastScroll.current
      lastScroll.current = y

      const workBottom = workEl.offsetTop + workEl.offsetHeight
      const processTop = processEl.offsetTop
      const inRange = y + window.innerHeight > workBottom && y < processTop

      setVisible(scrollingDown && inRange)
    }

    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 pointer-events-none ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <a
        href="#contact"
        style={MONO}
        className="pointer-events-auto inline-flex items-center gap-3 bg-[#00e87a] text-[#080808] px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-[#00ff88] transition-all duration-100 shadow-2xl shadow-black/40"
      >
        Like what you see? Let's talk →
      </a>
    </div>
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
            My Process
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

function Services() {
  return (
    <section id="services" className="px-6 lg:px-8 py-20 md:py-28 border-b border-white/[0.08]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p style={MONO} className="text-xs tracking-widest uppercase text-[#00e87a] mb-3">
            // Services
          </p>
          <h2
            style={{ ...MONO, lineHeight: 1.15 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f0ede8]"
          >
            What I do for my clients
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

function Pricing() {
  return (
    <section id="pricing" className="px-6 lg:px-8 py-20 md:py-28 border-b border-white/[0.08] bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p style={MONO} className="text-xs tracking-widest uppercase text-[#00e87a] mb-3">
            // pricing
          </p>
          <h2
            style={{ ...MONO, lineHeight: 1.15 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f0ede8]"
          >
            Pricing
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.name}
              className="bg-[#111111] p-8 border border-white/[0.08] hover:border-[#00e87a]/40 transition-all duration-300 group flex flex-col"
            >
              <h3
                style={MONO}
                className="text-xs font-semibold text-[#f0ede8] mb-4 tracking-widest uppercase"
              >
                {plan.name}
              </h3>
              <div className="mb-6">
                <p className="text-lg text-[#a8a49e] mb-2">{plan.description}</p>
                <p className="text-sm text-[#88847f]">{plan.target}</p>
              </div>
              <div className="flex items-center justify-center mb-6">
                <span style={MONO} className="text-3xl md:text-4xl font-extrabold text-[#00e87a]">
                  {plan.price}
                </span>
                <span style={MONO} className="text-sm text-[#88847f] ml-1">
                  TZS
                </span>
              </div>
              <ul className="space-y-3 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-[#a8a49e] font-light">
                    <span className="text-[#00e87a] mt-0.5">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={plan.url}
                target="_blank"
                rel="noopener noreferrer"
                style={MONO}
                className="mt-8 block text-center text-xs tracking-widest uppercase border border-white/20 text-[#f0ede8] px-6 py-3 hover:border-[#00e87a] hover:text-[#00e87a] transition-colors"
              >
                Get Started
              </a>
            </div>
          ))}

          <div className="sm:col-span-2 lg:col-span-3 bg-[#111111] p-8 border border-white/[0.08] hover:border-[#00e87a]/40 transition-all duration-300 group flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3
                style={MONO}
                className="text-xs font-semibold text-[#f0ede8] mb-2 tracking-widest uppercase"
              >
                Custom Request
              </h3>
              <p className="text-sm text-[#a8a49e] font-light">
                Have a unique project in mind? Let's discuss your requirements and I'll provide a tailored quote.
              </p>
            </div>
            <a
              href="#contact"
              style={MONO}
              className="inline-block text-center text-xs tracking-widest uppercase bg-[#00e87a] text-[#080808] px-8 py-3 font-bold hover:bg-[#00ff88] transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
            >
              Contact for Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [state, handleSubmit] = useForm('mppzaaon')

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
            I'm currently accepting projects. If you have an idea or application to build —
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
            <div className="border-t border-white/[0.08] pt-4">
              <p style={MONO} className="text-xs tracking-widest uppercase text-[#88847f] mb-4">
                <a
                  href="https://docs.google.com/document/d/1ADMzC5L1fUVMkEg-bf3I2wKTetkShk4ni8JhKbOBE1s/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={MONO}
                  className="inline-flex items-center gap-2 border border-white/20 text-[#f0ede8] px-6 py-3 text-xs font-semibold tracking-widest uppercase hover:border-[#00e87a] hover:text-[#00e87a] transition-colors"
                >
                  Download CV ↗
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 bg-[#111111] p-8 md:p-10 border border-white/[0.08]">
          {state.succeeded ? (
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
              <div>
                <label style={MONO} className="block text-xs tracking-widest uppercase text-[#88847f] mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="William Balaile"
                  className="w-full bg-[#161616] border border-white/[0.1] text-[#f0ede8] px-4 py-3.5 text-sm placeholder:text-[#444] focus:outline-none focus:border-[#00e87a] transition-colors font-light"
                />
                <ValidationError field="name" errors={state.errors} className="text-red-400 text-xs mt-1" />
              </div>

              <div>
                <label style={MONO} className="block text-xs tracking-widest uppercase text-[#88847f] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="w-full bg-[#161616] border border-white/[0.1] text-[#f0ede8] px-4 py-3.5 text-sm placeholder:text-[#444] focus:outline-none focus:border-[#00e87a] transition-colors font-light"
                />
                <ValidationError field="email" errors={state.errors} className="text-red-400 text-xs mt-1" />
              </div>

              <div>
                <label style={MONO} className="block text-xs tracking-widest uppercase text-[#88847f] mb-2">
                  Project Type
                </label>
                <select
                  name="type"
                  className="w-full bg-[#161616] border border-white/[0.1] text-[#f0ede8] px-4 py-3.5 text-sm focus:outline-none focus:border-[#00e87a] transition-colors font-light appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select a service</option>
                  <option>Website</option>
                  <option>Web Application</option>
                  <option>Trading Platform Tool</option>
                  <option>web3 dApp (decentralized application)</option>
                  <option>Other; specify below</option>
                </select>
              </div>

              <div>
                <label style={MONO} className="block text-xs tracking-widest uppercase text-[#88847f] mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="Tell me about your project scope and timeline..."
                  className="w-full bg-[#161616] border border-white/[0.1] text-[#f0ede8] px-4 py-3.5 text-sm placeholder:text-[#444] focus:outline-none focus:border-[#00e87a] transition-colors font-light resize-none"
                />
                <ValidationError field="message" errors={state.errors} className="text-red-400 text-xs mt-1" />
              </div>

              <ValidationError errors={state.errors} className="text-red-400 text-sm" />

              <button
                type="submit"
                disabled={state.submitting}
                style={MONO}
                className="w-full bg-[#00e87a] text-[#080808] py-4 text-xs tracking-widest uppercase font-bold hover:bg-[#00ff88] transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {state.submitting ? 'Sending...' : 'Send Message →'}
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
          © 2026 William Balaile
        </p>
        <div className="flex items-center gap-6">
          <a
                href="mailto:wbalaile@live.com"
                style={MONO}
                className="text-[#f0ede8] hover:text-[#00e87a] transition-colors text-sm font-semibold"
              >
                hello@wbalaile.is-a.dev
          </a>
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
        <ScrollCTA />
        <Process />
        <Services />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
