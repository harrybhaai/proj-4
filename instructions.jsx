import { useState } from "react";

const sections = [
  {
    id: "setup",
    icon: "⚡",
    title: "1. Project Setup",
    color: "#00ff9f",
    content: (
      <pre className="code-block">{`mkdir project && cd project
npm init -y
npm install express mongoose cors
# Optional: npm install nodemon --save-dev

# package.json scripts:
"start": "node server.js"
"dev":   "nodemon server.js"`}</pre>
    ),
  },
  {
    id: "server",
    icon: "🖥",
    title: "2. Express Server",
    color: "#ffcc00",
    content: (
      <pre className="code-block">{`const express = require('express');
const cors    = require('cors');
const app     = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// routes go here
app.use('/api/items', require('./routes/items'));

app.listen(3000, () => console.log('Server on :3000'));`}</pre>
    ),
  },
  {
    id: "mongo",
    icon: "🗄",
    title: "3. MongoDB Connect",
    color: "#3ddc84",
    content: (
      <pre className="code-block">{`const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/examdb')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));
// Paste this near top of server.js`}</pre>
    ),
  },
  {
    id: "model",
    icon: "📐",
    title: "4. Mongoose Model",
    color: "#ff6b6b",
    content: (
      <pre className="code-block">{`// models/Item.js
const mongoose = require('mongoose');
const ItemSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  price:     { type: Number, default: 0 },
  category:  { type: String },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Item', ItemSchema);`}</pre>
    ),
  },
  {
    id: "crud",
    icon: "🔁",
    title: "5. CRUD Routes",
    color: "#a78bfa",
    content: (
      <pre className="code-block">{`const router = require('express').Router();
const Item   = require('../models/Item');

router.get('/',        async (req, res) => {
  const items = await Item.find();
  res.json(items);
});
router.post('/',       async (req, res) => {
  const item = await Item.create(req.body);
  res.status(201).json(item);
});
router.put('/:id',    async (req, res) => {
  const item = await Item.findByIdAndUpdate(
    req.params.id, req.body, { new: true });
  res.json(item);
});
router.delete('/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});
module.exports = router;`}</pre>
    ),
  },
  {
    id: "fetch",
    icon: "🌐",
    title: "6. Fetch API",
    color: "#38bdf8",
    content: (
      <pre className="code-block">{`// GET
const res  = await fetch('/api/items');
const data = await res.json();

// POST
const res = await fetch('/api/items', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Widget', price: 9.99 })
});
const data = await res.json();`}</pre>
    ),
  },
  {
    id: "form",
    icon: "📋",
    title: "7. HTML Form",
    color: "#fb923c",
    content: (
      <pre className="code-block">{`<form id="itemForm">
  <input type="text" id="name" placeholder="Name" required />
  <input type="number" id="price" placeholder="Price" />
  <button type="submit">Add Item</button>
</form>
<script>
document.getElementById('itemForm')
  .addEventListener('submit', async (e) => {
    e.preventDefault();
    await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:  document.getElementById('name').value,
        price: document.getElementById('price').value
      })
    });
  });
</script>`}</pre>
    ),
  },
  {
    id: "debug",
    icon: "🐛",
    title: "8. Debug Checklist",
    color: "#f472b6",
    content: (
      <div style={{ display: "grid", gap: "6px" }}>
        {[
          ["Server won't start", "Port in use? → kill process or change port. Missing require()?"],
          ["MongoDB won't connect", "mongod running? URI correct? Check .catch() log"],
          ["Route not hit", "Route registered in server.js? Correct HTTP method? Check URL typo"],
          ["fetch() fails", "CORS enabled? JSON header set? Check Network tab in DevTools"],
          ["Data not saving", "req.body undefined? → add express.json() middleware"],
          ["findById fails", "Valid ObjectId? Use mongoose.Types.ObjectId.isValid(id)"],
        ].map(([prob, fix]) => (
          <div key={prob} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
            <span style={{ color: "#f472b6", fontWeight: "bold", minWidth: "160px", fontSize: "11px" }}>{prob}</span>
            <span style={{ color: "#cbd5e1", fontSize: "11px" }}>→ {fix}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "pattern",
    icon: "🧩",
    title: "9. Exam Formula",
    color: "#fbbf24",
    content: (
      <div>
        <div style={{ color: "#fbbf24", fontFamily: "monospace", fontSize: "13px", marginBottom: "10px", textAlign: "center", letterSpacing: "2px" }}>
          ENTITY + FIELDS + CRUD = EXAM QUESTION
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
          {[
            ["Student Manager", "name, grade, course"],
            ["Todo List", "title, done, dueDate"],
            ["Product Inventory", "name, price, qty, category"],
            ["Blog Posts", "title, content, author, date"],
          ].map(([entity, fields]) => (
            <div key={entity} style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: "6px", padding: "8px 10px" }}>
              <div style={{ color: "#fbbf24", fontWeight: "bold", fontSize: "11px" }}>{entity}</div>
              <div style={{ color: "#94a3b8", fontSize: "10px", marginTop: "2px", fontFamily: "monospace" }}>{fields}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function SurvivalKit() {
  const [active, setActive] = useState(null);

  return (
    <div style={{
      background: "#0a0f1e",
      minHeight: "100vh",
      fontFamily: "'Courier New', monospace",
      color: "#e2e8f0",
      padding: "0",
    }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .code-block {
          background: #020817;
          border: 1px solid #1e293b;
          border-radius: 6px;
          padding: 12px;
          font-size: 11px;
          line-height: 1.7;
          color: #7dd3fc;
          overflow-x: auto;
          white-space: pre;
        }
        .section-card {
          background: #0f172a;
          border: 1px solid #1e293b;
          border-radius: 10px;
          padding: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .section-card:hover {
          border-color: #334155;
          background: #131f35;
          transform: translateY(-1px);
        }
        .section-card.open {
          border-color: #334155;
          background: #0d1a2e;
        }
        .header-bar {
          background: #020817;
          border-bottom: 1px solid #1e293b;
          padding: 14px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .badge {
          background: #00ff9f22;
          border: 1px solid #00ff9f44;
          color: #00ff9f;
          font-size: 10px;
          padding: 3px 10px;
          border-radius: 20px;
          letter-spacing: 1px;
        }
        .section-title {
          font-size: 12px;
          font-weight: bold;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .chevron {
          margin-left: auto;
          font-size: 10px;
          color: #475569;
          transition: transform 0.2s;
        }
        .chevron.open { transform: rotate(180deg); color: #94a3b8; }
        .content-area { padding-top: 10px; }
        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          padding: 16px 20px;
        }
        .stack-pills {
          display: flex; gap: 6px; flex-wrap: wrap;
        }
        .pill {
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 4px;
          padding: 2px 8px;
          font-size: 10px;
          color: #94a3b8;
        }
        @media (max-width: 600px) {
          .grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Header */}
      <div className="header-bar">
        <div>
          <div style={{ fontSize: "14px", fontWeight: "bold", color: "#00ff9f", letterSpacing: "2px" }}>
            ⚔ FULL-STACK EXAM SURVIVAL KIT
          </div>
          <div style={{ fontSize: "10px", color: "#475569", marginTop: "2px" }}>
            Node · Express · MongoDB · Fetch API · ~2hr exam
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
          <span className="badge">QUICK REF</span>
          <div className="stack-pills">
            {["HTML","CSS","JS","Node","Express","Mongoose","Fetch"].map(s => (
              <span key={s} className="pill">{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="grid">
        {sections.map((sec) => (
          <div
            key={sec.id}
            className={`section-card ${active === sec.id ? "open" : ""}`}
            onClick={() => setActive(active === sec.id ? null : sec.id)}
            style={{ borderLeft: `3px solid ${sec.color}` }}
          >
            <div className="section-title">
              <span>{sec.icon}</span>
              <span style={{ color: sec.color }}>{sec.title}</span>
              <span className={`chevron ${active === sec.id ? "open" : ""}`}>▼</span>
            </div>
            {active === sec.id && (
              <div className="content-area">{sec.content}</div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: "center",
        padding: "12px",
        borderTop: "1px solid #1e293b",
        fontSize: "10px",
        color: "#334155",
        letterSpacing: "2px"
      }}>
        CLICK ANY SECTION TO EXPAND · BACKEND LOGIC &gt; UI · YOU GOT THIS
      </div>
    </div>
  );
}
