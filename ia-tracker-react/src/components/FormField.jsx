import "./FormField.css";

// ─── INPUT ────────────────────────────────────────────────────────────────────
export const Input = ({ label, id, error, ...props }) => (
  <div className="field">
    {label && <label className="field-label" htmlFor={id}>{label}</label>}
    <input id={id} className={`field-input ${error ? "field-input--error" : ""}`} {...props} />
    {error && <span className="field-error">{error}</span>}
  </div>
);

// ─── SELECT ───────────────────────────────────────────────────────────────────
export const Select = ({ label, id, options, error, ...props }) => (
  <div className="field">
    {label && <label className="field-label" htmlFor={id}>{label}</label>}
    <select id={id} className={`field-select ${error ? "field-input--error" : ""}`} {...props}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
    {error && <span className="field-error">{error}</span>}
  </div>
);

// ─── TEXTAREA ─────────────────────────────────────────────────────────────────
export const Textarea = ({ label, id, error, rows = 3, ...props }) => (
  <div className="field">
    {label && <label className="field-label" htmlFor={id}>{label}</label>}
    <textarea id={id} rows={rows} className={`field-textarea ${error ? "field-input--error" : ""}`} {...props} />
    {error && <span className="field-error">{error}</span>}
  </div>
);
