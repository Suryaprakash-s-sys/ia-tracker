import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { questionAPI, failureAPI } from "../api/api";
import { Input, Select, Textarea } from "../components/FormField";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Toast from "../components/Toast";
import Breadcrumb from "../components/Breadcrumb";
import DifficultyBadge from "../components/DifficultyBadge";
import StatCard from "../components/StatCard";
import Icon, { ICONS } from "../components/Icon";
import "./RoundDetailPage.css";

const DIFF_OPTS = [
  { value: "EASY",   label: "Easy" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HARD",   label: "Hard" },
];

const RoundDetailPage = () => {
  const { roundId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const round     = state?.round;
  const interview = state?.interview;

  const [tab, setTab]               = useState("questions");
  const [questions, setQuestions]   = useState([]);
  const [failures, setFailures]     = useState([]);
  const [qModal, setQModal]         = useState(false);
  const [fModal, setFModal]         = useState(false);
  const [toast, setToast]           = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [qForm, setQForm] = useState({ questionText: "", topic: "", difficulty: "MEDIUM" });
  const [fForm, setFForm] = useState({ description: "", difficultyLevel: "MEDIUM", lesson: "" });

  const setQ = (k) => (e) => setQForm((f) => ({ ...f, [k]: e.target.value }));
  const setF = (k) => (e) => setFForm((f) => ({ ...f, [k]: e.target.value }));
  const showToast = (message, type = "ok") => setToast({ message, type });

  const loadQuestions = async () => {
    try { setQuestions(await questionAPI.getAll(roundId)); }
    catch (err) { showToast(err.message, "error"); }
  };

  const loadFailures = async () => {
    try { setFailures(await failureAPI.getAll(roundId)); }
    catch (err) { showToast(err.message, "error"); }
  };

  useEffect(() => { loadQuestions(); loadFailures(); }, [roundId]);

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (!qForm.questionText.trim()) return showToast("Question text is required", "error");
    setSubmitting(true);
    try {
      await questionAPI.create(roundId, qForm);
      setQModal(false);
      setQForm({ questionText: "", topic: "", difficulty: "MEDIUM" });
      showToast("Question saved to MySQL!");
      loadQuestions();
    } catch (err) {
      showToast(err.message, "error");
    } finally { setSubmitting(false); }
  };

  const handleAddFailure = async (e) => {
    e.preventDefault();
    if (!fForm.description.trim()) return showToast("Description is required", "error");
    setSubmitting(true);
    try {
      await failureAPI.create(roundId, fForm);
      setFModal(false);
      setFForm({ description: "", difficultyLevel: "MEDIUM", lesson: "" });
      showToast("Failure recorded!");
      loadFailures();
    } catch (err) {
      showToast(err.message, "error");
    } finally { setSubmitting(false); }
  };

  const handleDeleteQuestion = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Delete this question?")) return;
    try { await questionAPI.delete(roundId, id); showToast("Deleted"); loadQuestions(); }
    catch (err) { showToast(err.message, "error"); }
  };

  const handleDeleteFailure = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Delete this failure record?")) return;
    try { await failureAPI.delete(roundId, id); showToast("Deleted"); loadFailures(); }
    catch (err) { showToast(err.message, "error"); }
  };

  return (
    <div className="page-container">
      {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}

      <Breadcrumb items={[
        { label: "Interviews", onClick: () => navigate("/") },
        { label: interview?.companyName || "Company", onClick: () => navigate(`/interviews/${interview?.id}/rounds`, { state: { interview } }) },
        { label: round?.roundName || "Round", active: true },
      ]} />

      {/* Round Header */}
      <div className="round-header-card">
        <div className="round-header-left">
          <div className="round-header-meta">
            {interview?.companyName?.toUpperCase()} · {interview?.role?.toUpperCase()}
          </div>
          <h1 className="round-header-title">{round?.roundName}</h1>
        </div>
        {round && <DifficultyBadge level={round.difficulty} />}
      </div>

      {/* Stats */}
      <div className="round-stats">
        <StatCard icon={ICONS.q}     label="Questions" count={questions.length} color="var(--purple)" />
        <StatCard icon={ICONS.alert} label="Failures"  count={failures.length}  color="var(--red)" />
      </div>

      {/* Tabs */}
      <div className="detail-tabs">
        <button
          className={`detail-tab ${tab === "questions" ? "detail-tab--active" : ""}`}
          onClick={() => setTab("questions")}
        >
          <Icon d={ICONS.q} size={14} color={tab === "questions" ? "var(--accent)" : "var(--muted)"} />
          Questions ({questions.length})
        </button>
        <button
          className={`detail-tab ${tab === "failures" ? "detail-tab--active" : ""}`}
          onClick={() => setTab("failures")}
        >
          <Icon d={ICONS.alert} size={14} color={tab === "failures" ? "var(--accent)" : "var(--muted)"} />
          Failures ({failures.length})
        </button>
      </div>

      {/* ── QUESTIONS TAB ─────────────────────────────────────────────────── */}
      {tab === "questions" && (
        <div className="tab-content animate-fadeIn">
          <div className="tab-toolbar">
            <Button size="sm" onClick={() => setQModal(true)}>
              <Icon d={ICONS.plus} size={13} color="#fff" />
              Add Question
            </Button>
          </div>
          {questions.length === 0 ? (
            <div className="empty-state">
              <Icon d={ICONS.q} size={40} color="var(--border)" />
              <p>No questions recorded yet.<br />Add questions asked in this round.</p>
            </div>
          ) : (
            <div className="question-list">
              {questions.map((q, i) => (
                <div key={q.id} className="question-card">
                  <div className="question-card-header">
                    <div className="question-meta">
                      <span className="question-num">Q{i + 1}</span>
                      {q.topic && (
                        <span className="question-topic">
                          <Icon d={ICONS.tag} size={10} color="var(--purple)" />
                          {q.topic}
                        </span>
                      )}
                    </div>
                    <div className="question-actions">
                      <DifficultyBadge level={q.difficulty} />
                      <button
                        className="icon-btn icon-btn--danger"
                        onClick={(e) => handleDeleteQuestion(e, q.id)}
                      >
                        <Icon d={ICONS.trash} size={13} color="currentColor" />
                      </button>
                    </div>
                  </div>
                  <p className="question-text">{q.questionText}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── FAILURES TAB ──────────────────────────────────────────────────── */}
      {tab === "failures" && (
        <div className="tab-content animate-fadeIn">
          <div className="tab-toolbar">
            <Button size="sm" variant="danger" onClick={() => setFModal(true)}>
              <Icon d={ICONS.plus} size={13} color="#fff" />
              Add Failure
            </Button>
          </div>
          {failures.length === 0 ? (
            <div className="empty-state">
              <Icon d={ICONS.flag} size={40} color="var(--border)" />
              <p>No failures recorded — you nailed it! 🎉<br />Track what went wrong to improve next time.</p>
            </div>
          ) : (
            <div className="failure-list">
              {failures.map((f, i) => (
                <div key={f.id} className="failure-card">
                  <div className="failure-card-header">
                    <span className="failure-num">Failure #{i + 1}</span>
                    <div className="failure-actions">
                      <DifficultyBadge level={f.difficultyLevel} />
                      <button
                        className="icon-btn icon-btn--danger"
                        onClick={(e) => handleDeleteFailure(e, f.id)}
                      >
                        <Icon d={ICONS.trash} size={13} color="currentColor" />
                      </button>
                    </div>
                  </div>
                  <p className="failure-text">{f.description}</p>
                  {f.lesson && (
                    <div className="lesson-box">
                      <div className="lesson-label">💡 Lesson Learned</div>
                      <p className="lesson-text">{f.lesson}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Question Modal */}
      {qModal && (
        <Modal title="Add Question" onClose={() => setQModal(false)}>
          <form onSubmit={handleAddQuestion}>
            <Textarea
              label="Question Text"
              id="questionText"
              placeholder="What was the question asked in this round?"
              value={qForm.questionText}
              onChange={setQ("questionText")}
              rows={3}
              required
            />
            <Input
              label="Topic / Tag"
              id="topic"
              placeholder="e.g. Arrays, DP, System Design, HR"
              value={qForm.topic}
              onChange={setQ("topic")}
            />
            <Select
              label="Difficulty"
              id="qDifficulty"
              options={DIFF_OPTS}
              value={qForm.difficulty}
              onChange={setQ("difficulty")}
            />
            <div className="modal-footer">
              <Button variant="ghost" fullWidth onClick={() => setQModal(false)} type="button">Cancel</Button>
              <Button fullWidth type="submit" disabled={submitting}>
                {submitting ? "Saving…" : "Save to MySQL"}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Failure Modal */}
      {fModal && (
        <Modal title="Record Failure" onClose={() => setFModal(false)}>
          <form onSubmit={handleAddFailure}>
            <Textarea
              label="What went wrong?"
              id="description"
              placeholder="Describe where you struggled or made a mistake…"
              value={fForm.description}
              onChange={setF("description")}
              rows={3}
              required
            />
            <Select
              label="Difficulty Level"
              id="fDifficulty"
              options={DIFF_OPTS}
              value={fForm.difficultyLevel}
              onChange={setF("difficultyLevel")}
            />
            <Textarea
              label="Lesson Learned (optional)"
              id="lesson"
              placeholder="What will you do differently next time?"
              value={fForm.lesson}
              onChange={setF("lesson")}
              rows={2}
            />
            <div className="modal-footer">
              <Button variant="ghost" fullWidth onClick={() => setFModal(false)} type="button">Cancel</Button>
              <Button fullWidth variant="danger" type="submit" disabled={submitting}>
                {submitting ? "Recording…" : "Record Failure"}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default RoundDetailPage;
