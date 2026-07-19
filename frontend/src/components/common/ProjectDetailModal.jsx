import { Github, ExternalLink, FileText, Users, Building2, Calendar, CalendarCheck } from 'lucide-react'
import Modal from './Modal'
import StatusBadge from './StatusBadge'
import SimilarityGauge from './SimilarityGauge'

export default function ProjectDetailModal({ project, open, onClose, footer }) {
  if (!project) return null

  return (
    <Modal open={open} onClose={onClose} title={project.title} size="lg" footer={footer}>
      <div className="flex flex-wrap items-center gap-3">
        <StatusBadge status={project.status} />
        <span className="text-xs uppercase tracking-[0.24em] text-ledger-400">{project.id}</span>
        {project.flagged && (
          <span className="rounded-full border border-danger-100 bg-danger-50 px-3 py-1 text-xs font-semibold text-danger-700">
            Flagged for similarity
          </span>
        )}
      </div>

      <p className="mt-5 text-sm leading-relaxed text-ledger-600">{project.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.techStack.map((t) => (
          <span
            key={t}
            className="rounded-full bg-ledger-100 px-3 py-1.5 text-xs font-semibold text-ledger-700"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 rounded-[1.5rem] bg-ledger-50/80 p-5 sm:grid-cols-2">
        <Info icon={Users} label="Team" value={project.team.join(', ')} />
        <Info icon={Building2} label="College" value={`${project.college} · ${project.department}`} />
        <Info icon={Calendar} label="Submitted" value={`${project.submittedDate} by ${project.submittedBy}`} />
        <Info
          icon={CalendarCheck}
          label="Last reviewed"
          value={project.reviewedDate ? project.reviewedDate : 'Awaiting review'}
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-2xl border border-ledger-200 bg-white px-4 py-2 text-sm font-semibold text-ledger-700 shadow-sm transition hover:bg-ledger-50"
          >
            <Github size={15} /> GitHub Repository
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-2xl border border-ledger-200 bg-white px-4 py-2 text-sm font-semibold text-ledger-700 shadow-sm transition hover:bg-ledger-50"
          >
            <ExternalLink size={15} /> Live Demo
          </a>
        )}
        {project.pdfName && (
          <span className="flex items-center gap-2 rounded-2xl border border-ledger-200 bg-white px-4 py-2 text-sm font-semibold text-ledger-700 shadow-sm">
            <FileText size={15} /> {project.pdfName}
          </span>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-ledger-100 pt-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ledger-400">Faculty Feedback</p>
          {project.feedback.length === 0 ? (
            <p className="text-sm text-ledger-400">No feedback yet — this project is awaiting review.</p>
          ) : (
            <ul className="space-y-3">
              {project.feedback.map((f, i) => (
                <li key={i} className="rounded-lg border border-ledger-100 bg-white p-3 text-sm">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-semibold text-ledger-800">{f.by}</span>
                    <span className="text-xs text-ledger-400">{f.date}</span>
                  </div>
                  <p className="text-ledger-600">{f.comment}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex shrink-0 flex-col items-center gap-1 self-center">
          <SimilarityGauge score={project.plagiarismScore} />
          <span className="text-[11px] text-ledger-400">Similarity score</span>
        </div>
      </div>
    </Modal>
  )
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon size={16} className="mt-0.5 shrink-0 text-gold-500" />
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wide text-ledger-400">{label}</p>
        <p className="truncate text-sm font-medium text-ledger-700">{value}</p>
      </div>
    </div>
  )
}
