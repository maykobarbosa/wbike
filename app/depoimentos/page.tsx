"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Star, ArrowLeft, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const schema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(120),
  bike: z.string().min(2, "Informe o modelo da bike").max(120),
  quote: z.string().min(10, "Conte um pouco da sua experiência (mín. 10 caracteres)").max(800),
  rating: z.number().min(1).max(5),
})

type FormValues = z.infer<typeof schema>

export default function DepoimentosPage() {
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      bike: "",
      quote: "",
      rating: 5,
    },
  })

  const rating = form.watch("rating")

  async function onSubmit(values: FormValues) {
    setSubmitError(null)
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      const data = await res.json()
      if (!res.ok) {
        setSubmitError(data.error ?? "Erro ao enviar depoimento.")
        return
      }
      setSubmitted(true)
      form.reset()
    } catch {
      setSubmitError("Falha na conexão. Tente novamente.")
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 lg:pt-28">
        <div className="mx-auto max-w-2xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <Link
              href="/#depoimentos"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para a página inicial
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              Avalie o serviço
            </span>
            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
              Deixe seu <span className="text-primary">depoimento</span>
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Sua opinião ajuda outros ciclistas e nos motiva a continuar melhorando.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-12 rounded-xl border border-border bg-card p-8 text-center"
            >
              <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
              <h2 className="mt-4 text-xl font-semibold text-foreground">
                Depoimento enviado!
              </h2>
              <p className="mt-2 text-muted-foreground">
                Obrigado por avaliar nosso serviço. Seu depoimento aparecerá na página inicial em breve.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button asChild variant="outline">
                  <Link href="/">Voltar</Link>
                </Button>
                <Button variant="secondary" onClick={() => setSubmitted(false)}>
                  Enviar outro
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-12 rounded-xl border border-border bg-card p-6 lg:p-8"
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {submitError && (
                    <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                      {submitError}
                    </p>
                  )}

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Seu nome</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: João Silva" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bike"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Modelo da bike</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Specialized Stumpjumper" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Avaliação</FormLabel>
                        <FormControl>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((value) => (
                              <button
                                key={value}
                                type="button"
                                onClick={() => field.onChange(value)}
                                className="rounded p-1 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                aria-label={`${value} estrela${value > 1 ? "s" : ""}`}
                              >
                                <Star
                                  className={`h-8 w-8 ${
                                    value <= rating
                                      ? "fill-accent text-accent"
                                      : "text-muted-foreground/40"
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="quote"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Seu depoimento</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Conte como foi sua experiência com a W-BIKE SERVICE..."
                            className="min-h-[140px] resize-y"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Enviando..." : "Enviar depoimento"}
                  </Button>
                </form>
              </Form>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
