import { useEffect, useState } from 'react'
import './index.css'
import dave from './assets/dave.jpg'

const sections = [
  { id: 'cover', label: 'Cover' },
  { id: 'summary', label: 'Summary' },
  { id: 'skills', label: 'Skills' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'pt', label: 'Physical Therapy' },
  { id: 'insurance', label: 'Insurance Advisory' },
  { id: 'education', label: 'Education' },
  { id: 'awards', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
]

// theme state is lifted to App()

function Nav({ theme, onToggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeId, setActiveId] = useState('cover')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(Math.min(100, Math.max(0, pct)))

      // Determine active section by viewport position
      const viewportAnchor = window.innerHeight * 0.35
      let current = sections[0].id
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top <= viewportAnchor) current = s.id
      }
      // Force contact active when near bottom
      const nearBottom = window.innerHeight + scrollTop >= document.documentElement.scrollHeight - 2
      setActiveId(nearBottom ? 'contact' : current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkCls = (id) =>
    `inline-flex items-center h-10 -mb-px px-2 whitespace-nowrap border-b-2 transition-colors ${
      activeId === id
        ? 'text-gray-900 dark:text-white border-gray-900 dark:border-white'
        : 'text-gray-600 dark:text-gray-300 border-transparent hover:text-gray-900 dark:hover:text-white'
    }`

  const Links = ({ onClick }) => (
    <>
      {sections.map((s) => (
        <a key={s.id} href={`#${s.id}`} onClick={onClick} className={linkCls(s.id)}>
          {s.label}
        </a>
      ))}
    </>
  )

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 backdrop-blur supports-[backdrop-filter]:bg-white/75 dark:supports-[backdrop-filter]:bg-gray-950/75 relative">
      <div className="container-responsive flex items-center justify-between h-16">
        <a href="#cover" className="font-extrabold tracking-tight text-lg sm:text-xl leading-none shrink-0">
          Justin Dave Magboo
        </a>
        <nav className="hidden md:flex flex-1 text-sm">
          <div className="flex w-full justify-evenly">
            <Links />
          </div>
        </nav>
        <div className="flex items-center gap-2">
          <button
            className="md:hidden inline-flex items-center h-10 rounded-lg border border-gray-200 dark:border-gray-800 px-3 text-sm"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            ☰
          </button>
          <button
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={onToggleTheme}
            className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-200"
          >
            {theme === 'dark' ? (
              // Sun icon
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364-1.414 1.414M7.05 16.95l-1.414 1.414m12.728 0-1.414-1.414M7.05 7.05 5.636 5.636M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              // Moon icon
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800">
          <nav className="container-responsive py-3 flex flex-col gap-2 text-sm">
            <Links onClick={() => setMobileOpen(false)} />
          </nav>
        </div>
      )}
      <div className="absolute bottom-0 inset-x-0 h-0.5 bg-transparent">
        <div className="h-full bg-gray-900 dark:bg-white" style={{ width: `${progress}%` }} />
      </div>
    </header>
  )
}

function Cover() {
  return (
    <section id="cover" className="section reveal scroll-mt-28 md:scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7">
          <p className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 font-medium">Portfolio</p>
          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Justin Dave Magboo
          </h1>
          <p className="mt-3 text-lg font-semibold text-gray-700 dark:text-gray-300">
            Physical Therapist • Licensed Insurance Advisor
          </p>
          <p className="mt-5 text-gray-600 dark:text-gray-400 max-w-2xl">
            "Helping people recover their health and secure their future."
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#contact" className="inline-flex items-center rounded-lg bg-gray-900 text-white dark:bg-white dark:text-gray-900 px-5 py-2.5 font-medium hover:opacity-90 transition-opacity">Contact Me</a>
            <a href="#summary" className="inline-flex items-center rounded-lg px-5 py-2.5 font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors underline-offset-4 hover:underline">Explore</a>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="group relative w-full aspect-square">
            <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-brand/80 via-cyan-400/60 to-sky-500/60 blur opacity-30 group-hover:opacity-40 transition duration-500" aria-hidden></div>
            <div className="relative rounded-3xl p-[3px] bg-gradient-to-br from-brand to-cyan-400 dark:from-brand dark:to-sky-500 shadow-xl">
              <div className="relative rounded-3xl overflow-hidden h-full w-full">
                <img src={dave} alt="Justin Dave Magboo" className="w-full h-full object-cover transform transition duration-700 group-hover:scale-[1.03]" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.25),transparent_40%)]" aria-hidden></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

 

function Summary() {
  return (
    <section id="summary" className="section reveal scroll-mt-28 md:scroll-mt-24">
      <h2 className="section-title">Professional Summary</h2>
      <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-3xl">
        I am a Physical Therapist Student and a Licensed Financial Advisor with a passion for helping individuals achieve holistic well-being — physically, financially, and emotionally. My background in rehabilitation gives me a unique understanding of health needs, while my financial expertise allows me to guide clients toward long-term security.
      </p>
    </section>
  )
}

function Skills() {
  const shared = [
    'Communication & Client Education',
    'Needs Assessment & Problem-Solving',
    'Empathy & Rapport Building',
  ]
  const roleSpecific = [
    { title: 'Physical Therapy', items: ['Manual Therapy', 'Neurological Rehabilitation', 'Orthopedic Rehab'] },
    { title: 'Insurance Advisory', items: ['Financial Needs Analysis', 'Policy Customization', 'Claims Assistance'] },
  ]
  const resumeSkills = ['Fast Learner', 'Interpersonal Skills', 'Leadership Skills', 'Communication Skills', 'Organization Skills', 'Time & Project Management']
  return (
    <section id="skills" className="section reveal scroll-mt-28 md:scroll-mt-24">
      <h2 className="section-title">Skills & Core Competencies</h2>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-3">Shared Skills</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            {shared.map(i => (<li key={i} className="flex items-start gap-2"><span className="text-gray-400">•</span><span>{i}</span></li>))}
          </ul>
        </div>
        <div className="card lg:col-span-2">
          <h3 className="text-lg font-semibold mb-3">Role-Specific Skills</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {roleSpecific.map(group => (
              <div key={group.title} className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                <div className="font-semibold mb-2">{group.title}</div>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                  {group.items.map(item => (<li key={item} className="flex items-start gap-2"><span className="text-gray-400">•</span><span>{item}</span></li>))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="card lg:col-span-3">
          <h3 className="text-lg font-semibold mb-3">Additional Skills</h3>
          <div className="flex flex-wrap gap-2">
            {resumeSkills.map(s => (
              <span key={s} className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-800 px-3 py-1 text-sm bg-transparent">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Highlights() {
  const items = [
    'Helped over 150 patients achieve improved mobility and independence.',
    'Assisted more than 100 clients in securing life and health insurance plans tailored to their needs.',
    'Best Intern, Best in Case Presentation, Best in Journal Presentation, Best in Practical Exam — St. Frances Cabrini Medical Center (2024)',
    'National Achiever of PRU Life UK — Protection Drive Qualifier, Dubai (2023)',
  ]
  return (
    <section id="highlights" className="section reveal scroll-mt-28 md:scroll-mt-24">
      <h2 className="section-title">Career Highlights</h2>
      <ul className="grid sm:grid-cols-2 gap-4">
        {items.map(i => (
          <li key={i} className="card">{i}</li>
        ))}
      </ul>
    </section>
  )
}

function PTSection() {
  return (
    <section id="pt" className="section reveal scroll-mt-28 md:scroll-mt-24">
      <h2 className="section-title">Physical Therapy Work</h2>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-3">Work Experience</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>Physical Therapy Intern (2022–2024) – Sta Ana Hospital, National Children’s Hospital, DMMC, Metafactor Wellness Center, Motions Venture Philippines, St. Frances Cabrini Medical Center.</li>
            <li>Community-Based Rehabilitation (2024–Present) – Brgy. Sico, Batangas.</li>
          </ul>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-3">Certifications & Training</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>Enhancing Quality of Life for Elderly Individuals with Respiratory Needs: Assessment and Rehabilitation Approaches — Lyceum of the Philippines University Batangas.</li>
            <li>World Physical Therapy Day: Rehabilitation and Long COVID — UDM Physical Therapy Student Council.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function InsuranceSection() {
  return (
    <section id="insurance" className="section reveal scroll-mt-28 md:scroll-mt-24">
      <h2 className="section-title">Insurance Advisory Work</h2>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-3">Work Experience</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>Assistant Unit Manager, PRU Life UK (2022–Present) – Assessed needs and prescribed plans to secure client’s future.</li>
          </ul>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-3">Certifications & Licenses</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>Certified Investment Advisor — PRU Life UK (2022)</li>
            <li>Rookie High Flyer’s Club / Top Rookie – Unit Wide (2022)</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function Education() {
  const items = [
    'Lyceum of the Philippines Batangas (2024) – Bachelor of Science in Physical Therapy – 4th year',
    'Sta Teresa College (2020–2021) – Senior High School Graduate',
    'San Antonio, San Pascual, Batangas (2014–2015) – Elementary Graduate',
  ]
  return (
    <section id="education" className="section reveal scroll-mt-28 md:scroll-mt-24">
      <h2 className="section-title">Education</h2>
      <ul className="grid gap-4">
        {items.map(i => (<li key={i} className="card">{i}</li>))}
      </ul>
    </section>
  )
}

function Awards() {
  return (
    <section id="awards" className="section reveal scroll-mt-28 md:scroll-mt-24">
      <h2 className="section-title">Achievements & Awards</h2>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-3">Healthcare</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>Best Intern, Best in Case Presentation, Best in Journal Presentation, Best in Practical Exam (2024)</li>
          </ul>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-3">Financial Services</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>National Achiever of PRU Life UK (2023)</li>
            <li>Top Assistant Unit Manager, Top Leader – Unit Wide (2023)</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="section reveal scroll-mt-28 md:scroll-mt-24">
      <h2 className="section-title">Contact</h2>
      <div className="card">
        <ul className="grid sm:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
          <li><strong>Phone:</strong> +63 939 407 0002</li>
          <li><strong>Email:</strong> <a href="mailto:magboojustindave@gmail.com" className="text-brand">magboojustindave@gmail.com</a></li>
          <li><strong>Address:</strong> 49 Sto Nino, San Pascual, Batangas</li>
          
        </ul>
      </div>
    </section>
  )
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    const isDark = theme === 'dark'
    root.classList.toggle('dark', isDark)
    body.classList.toggle('dark', isDark)
    root.setAttribute('data-theme', isDark ? 'dark' : 'light')
    body.setAttribute('data-theme', isDark ? 'dark' : 'light')
    try {
      root.style.colorScheme = isDark ? 'dark' : 'light'
      body.style.colorScheme = isDark ? 'dark' : 'light'
    } catch {}
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))

  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal'))
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in-view')
        })
      },
      { threshold: 0.08 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const handler = () => setShowTop((window.scrollY || document.documentElement.scrollTop) > 400)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div className="font-sans min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors relative overflow-x-clip bg-grid">
      {/* Decorative gradient blobs */}
      <div aria-hidden className="pointer-events-none absolute -top-32 -left-32 h-72 w-72 rounded-full blur-3xl opacity-40 bg-gradient-to-br from-brand to-cyan-400 dark:from-brand dark:to-sky-500"></div>
      <div aria-hidden className="pointer-events-none absolute top-1/3 -right-20 h-72 w-72 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-purple-400 to-pink-400 dark:from-violet-500 dark:to-fuchsia-500"></div>
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/4 h-72 w-72 rounded-full blur-3xl opacity-20 bg-gradient-to-br from-amber-300 to-orange-500 dark:from-amber-400 dark:to-orange-600"></div>
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Cover />
        <Summary />
        <Skills />
        <Highlights />
        <PTSection />
        <InsuranceSection />
        <Education />
        <Awards />
        <Contact />
      </main>
      <footer className="section pt-0 text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Justin Dave Magboo. All rights reserved.
      </footer>

      {/* Back to top button */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 h-11 w-11 rounded-full shadow-lg border border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 transition-all"
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </div>
  )
}

