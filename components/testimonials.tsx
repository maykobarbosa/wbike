  // Refetch when hash is #depoimentos so list updates after client-side nav from form success
  const [hash, setHash] = useState(typeof window !== "undefined" ? window.location.hash : "")
  useEffect(() => {
    if (typeof window === "undefined") return
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])
  useEffect(() => {
    const navType = typeof performance !== "undefined" && performance.getEntriesByType ? performance.getEntriesByType("navigation")[0]?.type : "unknown"
    fetch("http://127.0.0.1:7244/ingest/d9320382-fce8-46de-a120-8375c1ed3cce", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location: "testimonials.tsx:Testimonials",
        message: "Testimonials component mounted",
        data: { hypothesisId: "H1", navType, hash },
        timestamp: Date.now(),
      }),
    }).catch(() => {})
  }, [hash])
  useEffect(() => {
    const navType = typeof performance !== "undefined" && performance.getEntriesByType ? performance.getEntriesByType("navigation")[0]?.type : "unknown"
    fetch("http://127.0.0.1:7244/ingest/d9320382-fce8-46de-a120-8375c1ed3cce", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location: "testimonials.tsx:useEffect",
        message: "Fetch useEffect running",
        data: { hypothesisId: "H3", navType },
        timestamp: Date.now(),
      }),
    }).catch(() => {})
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data: Testimonial[]) => {
        const isArr = Array.isArray(data)
        fetch("http://127.0.0.1:7244/ingest/d9320382-fce8-46de-a120-8375c1ed3cce", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            location: "testimonials.tsx:fetch.then",
            message: "API response received",
            data: {
              hypothesisId: "H2_H4",
              isArray: isArr,
              length: isArr ? data.length : 0,
              hasData: isArr && data.length > 0,
            },
            timestamp: Date.now(),
          }),
        }).catch(() => {})
        if (Array.isArray(data)) setDynamicList(data)
      })
      .catch(() => {})
      .finally(() => setLoaded(true))
  }, [hash])

  const testimonials =
    dynamicList.length > 0 ? [...dynamicList, ...DEFAULT_TESTIMONIALS] : DEFAULT_TESTIMONIALS

  return (
    <motion.section
      id="depoimentos"
      className="relative py-24 lg:py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={getStaggerContainer(0.15, 0.08)}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={getStaggerItem()}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Depoimentos
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl text-balance">
            O que nossos <span className="text-primary">clientes</span> dizem
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            A satisfação dos nossos clientes é nossa maior motivação.
          </p>
          <motion.div variants={getStaggerItem()} className="mt-6">
            <a
              href="/depoimentos"
              className="inline-flex items-center gap-2 rounded-md border border-primary/50 bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
            >
              Deixar seu depoimento
            </a>
          </motion.div>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={getStaggerContainer(0.25, 0.06)}
        >
          {loaded &&
            testimonials.map((t, i) => (
              <TestimonialCard
                key={t.createdAt ? `${t.name}-${t.createdAt}` : `${t.name}-${i}`}
                {...t}
              />
            ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
