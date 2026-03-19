import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { roundAPI } from "../api/api";
import { Input, Select } from "../components/FormField";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Toast from "../components/Toast";
import Breadcrumb from "../components/Breadcrumb";
import DifficultyBadge from "../components/DifficultyBadge";
import Icon, { ICONS } from "../components/Icon";
import "./RoundsPage.css";

const DIFF_OPTS = [
  { value: "EASY",   label: "Easy" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HARD",   label: "Hard" },
];

const DIFF_COLOR = { EASY: "#34d399", MEDIUM: "#fbbf24", HARD: "#f87171" };

const RoundsPage = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const interview = state?.interview;

  const [rounds, setRounds]         = useState([]);
  const [loading, setLoading]       = useState(true);
  const [showModal, setShowModal]   = useState(false);
  const [toast, setToast]           = useState(null);
  const [form, setForm]             = useState({ roundName: "", difficulty: "MEDIUM" });
  const [submitting, setSubmitting] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const showToast = (message, type = "ok") => setToast({ message, type });

  const loadRounds = async () => {
    setLoading(true);
    try {
      setRounds(await roundAPI.getAll(interviewId));
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadRounds(); }, [interviewId]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.roundName.trim()) return showToast("Round name is required", "error");
    setSubmitting(true);
    try {
      await roundAPI.create(interviewId, form);
      setShowModal(false);
      setForm({ roundName: "", difficulty: "MEDIUM" });
      showToast("Round added!");
      loadRounds();
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Delete this round and all its questions/failures?")) return;
    try {
      await roundAPI.delete(interviewId, id);
      showToast("Round deleted");
      loadRounds();
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  return (
    <div className="page-container">
      {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}

      <Breadcrumb items={[
        { label: "Interviews", onClick: () => navigate("/") },
        { label: interview?.companyName || "Company", active: true },
      ]} />

      {/* Interview Banner */}
      {interview && (
        <div className="interview-banner">
          <div className="interview-banner-icon">
            <Icon d={ICONS.bag} size={24} color="#fff" />
          </div>
          <div className="interview-banner-info">
            <h2 className="interview-banner-name">{interview.companyName}</h2>
            <p className="interview-banner-role">
              {interview.role}
              {interview.date && ` · ${new Date(interview.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}`}
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Interview Rounds</h1>
          <p className="page-subtitle">{rounds.length} round{rounds.length !== 1 ? "s" : ""} recorded</p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <Icon d={ICONS.plus} size={15} color="#fff" />
          Add Round
        </Button>
      </div>

      {/* Rounds List */}
      {loading ? (
        <div className="loading-wrapper">
          <div className="loading-spinner" />
          <span>Loading rounds…</span>
        </div>
      ) : rounds.length === 0 ? (
        <div className="empty-state">
          <Icon d={ICONS.layers} size={44} color="var(--border)" />
          <p>No rounds added yet.<br />Add your first interview round!</p>
        </div>
      ) : (
        <div className="rounds-list">
          {rounds.map((round, index) => (
            <div
              key={round.id}
              className="round-card"
              style={{ "--diff-color": DIFF_COLOR[round.difficulty] || "#6366f1" }}
              onClick={() => navigate(`/rounds/${round.id}`, {
                state: { round, interview }
              })}
            >
              <div className="round-card-left">
                <div className="round-number">R{index + 1}</div>
                <div>
                  <h3 className="round-name">{round.roundName}</h3>
                  <div className="round-badge-row">
                    <DifficultyBadge level={round.difficulty} />
                  </div>
                </div>
              </div>
              <div className="round-card-right">
                <button
                  className="icon-btn icon-btn--danger"
                  onClick={(e) => handleDelete(e, round.id)}
                  title="Delete round"
                >
                  <Icon d={ICONS.trash} size={15} color="currentColor" />
                </button>
                <Icon d={ICONS.chevron} size={16} color="var(--border)" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Round Modal */}
      {showModal && (
        <Modal title="Add Interview Round" onClose={() => setShowModal(false)}>
          <form onSubmit={handleAdd}>
            <Input
              label="Round Name"
              id="roundName"
              placeholder="e.g. Technical Round 1, HR Round, DSA Round"
              value={form.roundName}
              onChange={set("roundName")}
              required
            />
            <Select
              label="Difficulty Level"
              id="difficulty"
              options={DIFF_OPTS}
              value={form.difficulty}
              onChange={set("difficulty")}
            />
            <div className="modal-footer">
              <Button variant="ghost" fullWidth onClick={() => setShowModal(false)} type="button">
                Cancel
              </Button>
              <Button fullWidth type="submit" disabled={submitting}>
                {submitting ? "Adding…" : "Add Round"}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default RoundsPage;
