import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Plus,
  X,
  UploadCloud,
  FileCheck2,
  CheckCircle2,
  ArrowRight,
  Tag,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { TECHNOLOGIES } from '../../data/mockData'

const STEPS = [
  { label: 'Project Details', description: 'Title and description' },
  { label: 'Team Members', description: 'Add collaborators' },
  { label: 'Tech Stack', description: 'Select your tools' },
  { label: 'Links', description: 'GitHub and demo' },
  { label: 'File Upload', description: 'Upload your report' },
]

const initialForm = {
  title: '',
  description: '',
  github: '',
  demo: '',
}

export default function SubmitProject() {
  const { addProject } = useApp()
  const navigate = useNavigate()

  const [step, setStep] = useState(0)
  const [form, setForm] = useState(initialForm)
  const [techStack, setTechStack] = useState([])
  const [techInput, setTechInput] = useState('')
  const [team, setTeam] = useState([''])
  const [pdf, setPdf] = useState(null)
  const [errors, setErrors] = useState({})
  const [dragActive, setDragActive] = useState(false)
  const [submitted, setSubmitted] = useState(null)

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const addTech = (tech) => {
    const t = tech.trim()
    if (t && !techStack.includes(t)) setTechStack((s) => [...s, t])
    setTechInput('')
    setErrors((prev) => ({ ...prev, techStack: '' }))
  }

  const removeTech = (t) => setTechStack((s) => s.filter((x) => x !== t))

  const updateTeamMember = (i, val) => {
    setTeam((t) => t.map((m, idx) => (idx === i ? val : m)))
    setErrors((prev) => ({ ...prev, team: '' }))
  }

  const addTeamMember = () => setTeam((t) => [...t, ''])
  const removeTeamMember = (i) => setTeam((t) => t.filter((_, idx) => idx !== i))

  const handlePdf = (file) => {
    if (file && file.type === 'application/pdf') {
      setPdf(file)
      setErrors((prev) => ({ ...prev, pdf: '' }))
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) handlePdf(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = () => setDragActive(false)

  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handlePdf(file)
  }

  const validateStep = (currentStep) => {
    const errs = {}

    if (currentStep === 0) {
      if (!form.title.trim()) errs.title = 'Project title is required'
      if (!form.description.trim()) errs.description = 'Project description is required'
    }

    if (currentStep === 1) {
      if (!team.some((member) => member.trim())) errs.team = 'Add at least one team member'
    }

    if (currentStep === 2) {
      if (techStack.length === 0) errs.techStack = 'Add at least one technology'
    }

    if (currentStep === 3) {
      if (!form.github.trim()) errs.github = 'GitHub link is required'
    }

    if (currentStep === 4) {
      if (!pdf) errs.pdf = 'Upload your project PDF report'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((current) => Math.min(STEPS.length - 1, current + 1))
    }
  }

  const prevStep = () => setStep((current) => Math.max(0, current - 1))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateStep(step) || step !== STEPS.length - 1) return

    const newProject = addProject({
      title: form.title.trim(),
      description: form.description.trim(),
      techStack,
      team: team.filter((m) => m.trim()),
      github: form.github.trim(),
      demo: form.demo.trim(),
      pdfName: pdf?.name || '',
    })

    setSubmitted(newProject)
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl rounded-[2rem] bg-white p-10 shadow-ledger ring-1 ring-ledger-100">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success-50 text-success-600 shadow-sm">
          <CheckCircle2 size={30} />
        </div>
        <h2 className="text-3xl font-semibold text-ledger-950">Project submitted</h2>
        <p className="mt-4 text-base leading-7 text-ledger-600">
          “{submitted.title}” ({submitted.id}) is now in the review queue. You’ll be notified once faculty respond.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <button
            onClick={() => navigate('/student/my-projects')}
            className="rounded-2xl bg-ledger-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-ledger-800"
          >
            View My Projects
          </button>
          <button
            onClick={() => {
              setSubmitted(null)
              setStep(0)
              setForm(initialForm)
              setTechStack([])
              setTeam([''])
              setPdf(null)
              setErrors({})
            }}
            className="rounded-2xl border border-ledger-200 bg-ledger-50 px-6 py-3 text-sm font-semibold text-ledger-700 transition hover:bg-ledger-100"
          >
            Submit another project
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-white p-8 shadow-ledger ring-1 ring-ledger-100">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ledger-500">Project submission</p>
            <h1 className="mt-3 text-4xl font-semibold text-ledger-950">Submit your project</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-ledger-600">
              A premium submission workflow with progress tracking, step validation, and drag-and-drop file upload.
            </p>
          </div>
          <div className="rounded-[1.75rem] bg-ledger-50 px-5 py-4 text-sm text-ledger-600 ring-1 ring-ledger-100">
            Complete all 5 steps for a polished submission.
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] bg-white p-6 shadow-ledger ring-1 ring-ledger-100">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-ledger-500">Submission step</p>
            <div className="flex items-center gap-3">
              {STEPS.map((item, index) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                      index === step
                        ? 'bg-gold-500 text-white shadow-lg'
                        : index < step
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-ledger-100 text-ledger-500'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="hidden min-w-[10rem] flex-col lg:flex">
                    <span className="text-sm font-semibold text-ledger-900">{item.label}</span>
                    <span className="text-xs text-ledger-500">{item.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full rounded-full bg-ledger-100 h-2 lg:max-w-md">
            <div className="h-2 rounded-full bg-gold-500 transition-all duration-300" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-6 rounded-[2rem] bg-white p-8 shadow-ledger ring-1 ring-ledger-100">
        <div className="rounded-[1.75rem] bg-ledger-50 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ledger-500">Step {step + 1}</p>
          <h2 className="mt-3 text-2xl font-semibold text-ledger-950">{STEPS[step].label}</h2>
          <p className="mt-2 text-sm leading-6 text-ledger-600">{STEPS[step].description}</p>
        </div>

        {step === 0 && (
          <div className="grid gap-6">
            <Field label="Project Title" required error={errors.title}>
              <input
                value={form.title}
                onChange={update('title')}
                placeholder="AgroSense — Smart Crop Monitoring"
                className={inputClass(errors.title)}
              />
            </Field>
            <Field label="Project Description" required error={errors.description}>
              <textarea
                value={form.description}
                onChange={update('description')}
                rows={5}
                placeholder="Describe the challenge, your solution, and what makes the project unique."
                className={inputClass(errors.description)}
              />
            </Field>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <Field label="Team Members" required error={errors.team}>
              <div className="space-y-4">
                {team.map((member, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-1">
                      <input
                        value={member}
                        onChange={(e) => updateTeamMember(index, e.target.value)}
                        placeholder={`Member ${index + 1} name`}
                        className={inputClass()}
                      />
                    </div>
                    {team.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTeamMember(index)}
                        className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-ledger-200 bg-white text-ledger-500 transition hover:bg-ledger-50"
                        aria-label="Remove member"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addTeamMember}
                  className="inline-flex items-center gap-2 rounded-2xl border border-ledger-200 bg-white px-4 py-3 text-sm font-semibold text-ledger-700 transition hover:border-gold-300 hover:text-gold-600"
                >
                  <Plus size={16} /> Add member
                </button>
              </div>
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <Field label="Tech Stack" required error={errors.techStack} hint="Press Enter to add a custom technology">
              <div className={`flex flex-wrap gap-2 rounded-3xl border bg-white p-3 ${errors.techStack ? 'border-danger-300' : 'border-ledger-200'}`}>
                {techStack.map((tech) => (
                  <span key={tech} className="flex items-center gap-2 rounded-full bg-ledger-100 px-3 py-2 text-sm font-semibold text-ledger-700">
                    <Tag size={14} /> {tech}
                    <button type="button" onClick={() => removeTech(tech)} aria-label={`Remove ${tech}`}>
                      <X size={14} />
                    </button>
                  </span>
                ))}
                <input
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addTech(techInput)
                    }
                  }}
                  placeholder="Add a technology and press Enter"
                  className="min-w-[12rem] flex-1 bg-transparent text-sm text-ledger-900 placeholder:text-ledger-400 focus:outline-none"
                />
              </div>
            </Field>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {TECHNOLOGIES.filter((tech) => !techStack.includes(tech)).slice(0, 9).map((tech) => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => addTech(tech)}
                  className="rounded-2xl border border-ledger-200 bg-ledger-50 px-4 py-3 text-sm font-medium text-ledger-600 transition hover:border-gold-300 hover:bg-white"
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="GitHub Repository" required error={errors.github}>
              <input
                value={form.github}
                onChange={update('github')}
                placeholder="https://github.com/username/repo"
                className={inputClass(errors.github)}
              />
            </Field>
            <Field label="Live Demo" hint="Optional">
              <input
                value={form.demo}
                onChange={update('demo')}
                placeholder="https://your-demo-link.com"
                className={inputClass()}
              />
            </Field>
          </div>
        )}

        {step === 4 && (
          <Field label="Upload Project Report" required error={errors.pdf}>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`group relative rounded-[1.5rem] border-2 border-dashed px-6 py-12 text-center transition ${
                dragActive ? 'border-gold-400 bg-gold-50/30' : 'border-ledger-200 bg-ledger-50'
              }`}
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ledger-100 text-ledger-500 transition group-hover:bg-ledger-200">
                <UploadCloud size={26} />
              </div>
              <div className="mt-5 space-y-3">
                <p className="text-lg font-semibold text-ledger-950">Drag and drop your PDF here</p>
                <p className="text-sm text-ledger-500">or click to browse files</p>
                <label className="inline-flex cursor-pointer rounded-full bg-ledger-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-ledger-800">
                  Browse files
                  <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
                </label>
              </div>
              {pdf && (
                <div className="mt-8 inline-flex items-center justify-center gap-3 rounded-3xl bg-white/90 px-4 py-3 text-sm text-ledger-700 shadow-sm ring-1 ring-ledger-100">
                  <FileCheck2 size={18} className="text-success-500" />
                  <span>{pdf.name}</span>
                </div>
              )}
            </div>
          </Field>
        )}

        <div className="flex flex-col gap-3 border-t border-ledger-100 pt-6 sm:flex-row sm:justify-between sm:items-center">
          <div>
            <p className="text-sm text-ledger-500">
              Step {step + 1} of {STEPS.length}: {STEPS[step].label}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 0}
              className="inline-flex items-center gap-2 rounded-2xl border border-ledger-200 bg-white px-5 py-3 text-sm font-semibold text-ledger-700 transition hover:bg-ledger-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={18} /> Previous
            </button>
            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center gap-2 rounded-2xl bg-gold-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gold-600"
              >
                Next Step
                <ArrowRight size={18} />
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-2xl bg-ledger-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-ledger-800"
              >
                Submit Project
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

function Field({ label, required, error, hint, children }) {
  return (
    <div>
      <label className="mb-3 block text-sm font-semibold text-ledger-900">
        {label} {required && <span className="text-danger-500">*</span>}
      </label>
      {children}
      {error ? (
        <p className="mt-2 text-sm font-medium text-danger-500">{error}</p>
      ) : hint ? (
        <p className="mt-2 text-sm text-ledger-500">{hint}</p>
      ) : null}
    </div>
  )
}

function inputClass(error) {
  return `w-full rounded-3xl border px-4 py-3 text-sm text-ledger-900 placeholder:text-ledger-400 shadow-sm transition duration-200 focus:border-gold-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-100 ${
    error ? 'border-danger-300 bg-danger-50/50 focus:border-danger-400' : 'border-ledger-200 bg-ledger-50/75'
  }`
}
