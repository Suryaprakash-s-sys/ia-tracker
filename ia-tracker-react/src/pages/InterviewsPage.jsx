import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { interviewAPI } from "../api/api";
import { Input } from "../components/FormField";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Toast from "../components/Toast";
import Icon, { ICONS } from "../components/Icon";
import "./InterviewsPage.css";

const InterviewsPage = () => {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [showModal, setShowModal]   = useState(false);
  const [toast, setToast]           = useState(null);
  const [form, setForm]             = useState({ companyName: "", role: "", date: "" });
  const [submitting, setSubmitting] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const showToast = (message, type = "ok") => setToast({ message, type });

  const loadInterviews = async () => {
    setLoading(true);
    try {
      const data = await interviewAPI.getAll();
      setInterviews(data);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadInterviews(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.companyName.trim() || !form.role.trim()) {
      return showToast("Company name and role are required", "error");
    }
    setSubmitting(true);
    try {
      await interviewAPI.create(form);
      setShowModal(false);
      setForm({ companyName: "", role: "", date: "" });
      showToast("Interview added successfully!");
      loadInterviews();
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Delete this interview and all its data?")) return;
    try {
      await interviewAPI.delete(id);
      showToast("Interview deleted");
      loadInterviews();
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit", month: "short", year: "numeric",
    });
  };

  return (
    <div className="page-container">
      {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}

      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">My Interviews</h1>
          <p className="page-subtitle">
            {interviews.length} {interviews.length === 1 ? "company" : "companies"} tracked in MySQL
          </p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <Icon d={ICONS.plus} size={15} color="#fff" />
          New Interview
        </Button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="loading-wrapper">
          <div className="loading-spinner" />
          <span>Loading from MySQL…</span>
        </div>
      ) : interviews.length === 0 ? (
        <div className="empty-state">
          <Icon d={ICONS.bag} size={48} color="var(--border)" />
          <p>No interviews yet.<br />Add your first company to get started!</p>
          <Button onClick={() => setShowModal(true)} style={{ marginTop: 16 }}>
            <Icon d={ICONS.plus} size={15} color="#fff" />
            Add Interview
          </Button>
        </div>
      ) : (
        <div className="interviews-list">
          {interviews.map((iv) => (
            <div
              key={iv.id}
              className="interview-card"
              onClick={() => navigate(`/interviews/${iv.id}/rounds`, { state: { interview: iv } })}
            >
              <div className="interview-card-left">
                <div className="interview-avatar">
                  <Icon d={ICONS.bag} size={20} color="var(--accent)" />
                </div>
                <div className="interview-info">
                  <h3 className="interview-company">{iv.companyName}</h3>
                  <p className="interview-role">{iv.role}</p>
                </div>
              </div>
              <div className="interview-card-right">
                {iv.date && (
                  <span className="interview-date">
                    <Icon d={ICONS.cal} size={12} color="var(--muted)" />
                    {formatDate(iv.date)}
                  </span>
                )}
                <button
                  className="icon-btn icon-btn--danger"
                  onClick={(e) => handleDelete(e, iv.id)}
                  title="Delete interview"
                >
                  <Icon d={ICONS.trash} size={15} color="currentColor" />
                </button>
                <Icon d={ICONS.chevron} size={16} color="var(--border)" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Interview Modal */}
      {showModal && (
        <Modal title="Add New Interview" onClose={() => setShowModal(false)}>
          <form onSubmit={handleAdd}>
            <Input
              label="Company Name"
              id="companyName"
              placeholder="e.g. Google, Amazon, TCS"
              value={form.companyName}
              onChange={set("companyName")}
              required
            />
            <Input
              label="Role / Position"
              id="role"
              placeholder="e.g. Software Engineer, SDE-1"
              value={form.role}
              onChange={set("role")}
              required
            />
            <Input
              label="Interview Date"
              id="date"
              type="date"
              value={form.date}
              onChange={set("date")}
            />
            <div className="modal-footer">
              <Button variant="ghost" fullWidth onClick={() => setShowModal(false)} type="button">
                Cancel
              </Button>
              <Button fullWidth type="submit" disabled={submitting}>
                {submitting ? "Adding…" : "Add Interview"}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default InterviewsPage;
