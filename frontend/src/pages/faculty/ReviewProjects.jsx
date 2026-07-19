import { useMemo, useState } from 'react'
import { Eye, ClipboardCheck, CheckCircle2, XCircle, RotateCcw, ShieldAlert } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { COLLEGES, DEPARTMENTS, STATUS, currentFaculty } from '../../data/mockData'
import SearchFilterBar from '../../components/common/SearchFilterBar'
import StatusBadge from '../../components/common/StatusBadge'
import ProjectDetailModal from '../../components/common/ProjectDetailModal'
import Modal from '../../components/common/Modal'
import EmptyState from '../../components/common/EmptyState'

const TABS = ['All', STATUS.PENDING, STATUS.APPROVED, STATUS.CHANGES, STATUS.REJECTED]

export default function ReviewProjects() {
  const { projects, reviewProject } = useApp()
  const [tab, setTab] = useState(STATUS.PENDING)
  const [search, setSearch] = useState('')
  const [college, setCollege] = useState('')
  const [department, setDepartment] = useState('')
  const [viewing, setViewing] = useState(null)
  const [reviewing, setReviewing] = useState(null) // { project, action }
  const [comment, setComment] = useState('')

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesTab = tab === 'All' || p.status === tab
      const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase())
      const matchesCollege = !college || p.college === college
      const matchesDept = !department || p.department === department
      return matchesTab && matchesSearch && matchesCollege && matchesDept
    })
  }, [projects, tab, search, college, department])

  const openReview = (project, action) => {
    setReviewing({ project, action })
    setComment('')
  }

  const submitReview = () => {
    if (!comment.trim() || !reviewing) return
    const statusMap = {
      approve: STATUS.APPROVED,
      reject: STATUS.REJECTED,
      changes: STATUS.CHANGES,
    }
    reviewProject(reviewing.project.id, {
      status: statusMap[reviewing.action],
      comment: comment.trim(),
      by: currentFaculty.name,
    })
    setReviewing(null)
    setComment('')
  }

  const activeCount = [college, department].filter(Boolean).length

  const actionLabels = {
    approve: { title: 'Approve Project', color: 'bg-success-500 hover:bg-success-600', verb: 'Approval remark' },
    reject: { title: 'Reject Project', color: 'bg-danger-500 hover:bg-danger-600', verb: 'Reason for rejection' },
    changes: { title: 'Request Changes', color: 'bg-gold-500 hover:bg-gold-400 text-ledger-950', verb: 'Changes requested' },
  }

  return (
    <div className="space-y-5">
      <div className="rounded-[2rem] bg-white/95 p-8 shadow-ledger ring-1 ring-ledger-100">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-ledger-950">Review Submitted Projects</h2>
            <p className="mt-2 text-sm leading-6 text-ledger-600">Approve, reject, or request changes — with feedback for the student team.</p>
          </div>
          <div className="rounded-3xl bg-ledger-50 px-4 py-3 text-sm text-ledger-600 ring-1 ring-ledger-100">
            Manage review workflow with speed and context.
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              tab === t ? 'bg-ledger-900 text-white' : 'bg-white text-ledger-500 ring-1 ring-ledger-200 hover:bg-ledger-50'
            }`}
          >
            {t} {t !== 'All' && <span className="ml-1 opacity-70">({projects.filter((p) => p.status === t).length})</span>}
          </button>
        ))}
      </div>

      <SearchFilterBar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search by project title…"
        activeCount={activeCount}
        onClear={() => {
          setCollege('')
          setDepartment('')
        }}
        filters={[
          { label: 'College', value: college, onChange: setCollege, options: COLLEGES },
          { label: 'Department', value: department, onChange: setDepartment, options: DEPARTMENTS },
        ]}
      />

      {filtered.length === 0 ? (
        <EmptyState icon={ClipboardCheck} title="No projects to review" message="Submissions matching this filter will show up here." />
      ) : (
        <div className="space-y-4">
          {filtered.map((p) => (
            <div key={p.id} className="rounded-[2rem] bg-white p-5 shadow-ledger ring-1 ring-ledger-100 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-[15px] font-semibold text-ledger-900">{p.title}</h3>
                    <StatusBadge status={p.status} />
                    {p.flagged && (
                      <span className="flex items-center gap-1 rounded-full bg-danger-50 px-2 py-0.5 text-[11px] font-semibold text-danger-600 ring-1 ring-inset ring-danger-100">
                        <ShieldAlert size={11} /> {p.plagiarismScore}% similarity
                      </span>
                    )}
                  </div>
                  <p className="mt-1 line-clamp-1 text-xs text-ledger-400">
                    {p.submittedBy} · {p.college} · {p.department} · Submitted {p.submittedDate}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {p.techStack.map((t) => (
                      <span key={t} className="rounded bg-ledger-100 px-1.5 py-0.5 text-[11px] font-medium text-ledger-600">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap gap-2">
                  <button
                    onClick={() => setViewing(p)}
                    className="flex items-center gap-1.5 rounded-lg border border-ledger-200 px-3 py-1.5 text-xs font-semibold text-ledger-600 hover:bg-ledger-50"
                  >
                    <Eye size={13} /> Details
                  </button>
                  <button
                    onClick={() => openReview(p, 'approve')}
                    className="flex items-center gap-1.5 rounded-lg bg-success-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-success-600"
                  >
                    <CheckCircle2 size={13} /> Approve
                  </button>
                  <button
                    onClick={() => openReview(p, 'changes')}
                    className="flex items-center gap-1.5 rounded-lg bg-gold-500 px-3 py-1.5 text-xs font-semibold text-ledger-950 hover:bg-gold-400"
                  >
                    <RotateCcw size={13} /> Request Changes
                  </button>
                  <button
                    onClick={() => openReview(p, 'reject')}
                    className="flex items-center gap-1.5 rounded-lg bg-danger-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-danger-600"
                  >
                    <XCircle size={13} /> Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ProjectDetailModal project={viewing} open={!!viewing} onClose={() => setViewing(null)} />

      <Modal
        open={!!reviewing}
        onClose={() => setReviewing(null)}
        title={reviewing ? actionLabels[reviewing.action].title : ''}
        footer={
          reviewing && (
            <>
              <button
                onClick={() => setReviewing(null)}
                className="rounded-lg border border-ledger-200 px-4 py-2 text-sm font-semibold text-ledger-600 hover:bg-ledger-50"
              >
                Cancel
              </button>
              <button
                onClick={submitReview}
                disabled={!comment.trim()}
                className={`rounded-lg px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 ${actionLabels[reviewing.action].color}`}
              >
                Confirm {actionLabels[reviewing.action].title.split(' ')[0]}
              </button>
            </>
          )
        }
      >
        {reviewing && (
          <div>
            <p className="text-sm text-ledger-600">
              <span className="font-semibold text-ledger-800">{reviewing.project.title}</span> by {reviewing.project.submittedBy}
            </p>
            <label className="mb-1.5 mt-4 block text-sm font-semibold text-ledger-800">
              {actionLabels[reviewing.action].verb} <span className="text-danger-500">*</span>
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              placeholder="Write feedback the student will see…"
              className="w-full rounded-lg border border-ledger-200 bg-ledger-50/60 px-3.5 py-2.5 text-sm text-ledger-800 placeholder:text-ledger-400 focus:border-gold-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-100"
            />
          </div>
        )}
      </Modal>
    </div>
  )
}
