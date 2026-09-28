import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { SiNodedotjs, SiNextdotjs, SiPython } from 'react-icons/si';

/* ─── Code Snippets Data ─── */
const codeSnippets = [
  {
    id: 'api',
    label: 'MERN Stack API',
    icon: <SiNodedotjs size={14} className="text-green-500" />,
    dotColor: '#4ade80',
    filename: 'anurag ~ server/routes/api.js',
    language: 'javascript',
    lines: [
      { text: '// Express.js & MongoDB Multi Channel Stream', type: 'comment' },
      { tokens: [
        { text: 'import', type: 'keyword' }, ' express ', { text: 'from', type: 'keyword' }, ' ', { text: "'express'", type: 'string' }, ';'
      ]},
      { tokens: [
        { text: 'import', type: 'keyword' }, ' { WorkOrder, Message } ', { text: 'from', type: 'keyword' }, ' ', { text: "'../models/schema.js'", type: 'string' }, ';'
      ]},
      { text: '' },
      { tokens: [
        { text: 'const', type: 'keyword' }, ' router = express.', { text: 'Router', type: 'function' }, '();'
      ]},
      { text: '' },
      { tokens: [
        'router.', { text: 'post', type: 'function' }, '(', { text: "'/dispatch-channel'", type: 'string' }, ', ', { text: 'async', type: 'keyword' }, ' (req, res) => {'
      ]},
      { tokens: [
        '    ', { text: 'const', type: 'keyword' }, ' { customerId, channel, payload } = req.body;'
      ]},
      { text: '' },
      { tokens: [
        '    ', { text: 'const', type: 'keyword' }, ' record = ', { text: 'await', type: 'keyword' }, ' Message.', { text: 'create', type: 'function' }, '({'
      ]},
      { text: '        customerId,' },
      { tokens: [
        '        channel, ', { text: "// 'SMS' | 'Email' | 'Internal'", type: 'comment' }
      ]},
      { text: '        content: payload.text,' },
      { tokens: [
        '        status: ', { text: "'delivered'", type: 'string' }, ','
      ]},
      { tokens: [
        '        timestamp: ', { text: 'new', type: 'keyword' }, ' ', { text: 'Date', type: 'function' }, '()'
      ]},
      { text: '    });' },
      { text: '' },
      { tokens: [
        '    ', { text: 'return', type: 'keyword' }, ' res.', { text: 'status', type: 'function' }, '(', { text: '200', type: 'number' }, ').', { text: 'json', type: 'function' }, '({ success: ', { text: 'true', type: 'keyword' }, ', record });'
      ]},
      { text: '});' },
    ]
  },
  {
    id: 'next',
    label: 'Next.js & DB',
    icon: <SiNextdotjs size={14} className="text-gray-300" />,
    dotColor: '#a78bfa',
    filename: 'anurag ~ app/actions/shop-bays.js',
    language: 'javascript',
    lines: [
      { text: '// Next.js Server Action with Prisma', type: 'comment' },
      { tokens: [{ text: "'use server'", type: 'string' }, ';'] },
      { text: '' },
      { tokens: [
        { text: 'import', type: 'keyword' }, ' prisma ', { text: 'from', type: 'keyword' }, ' ', { text: "'@/lib/prisma'", type: 'string' }, ';'
      ]},
      { tokens: [
        { text: 'import', type: 'keyword' }, ' { revalidatePath } ', { text: 'from', type: 'keyword' }, ' ', { text: "'next/cache'", type: 'string' }, ';'
      ]},
      { text: '' },
      { tokens: [
        { text: 'export', type: 'keyword' }, ' ', { text: 'async', type: 'keyword' }, ' ', { text: 'function', type: 'keyword' }, ' ', { text: 'updateBayOccupancy', type: 'function' }, '(bayId, vehicleData) {'
      ]},
      { tokens: [
        '    ', { text: 'const', type: 'keyword' }, ' bay = ', { text: 'await', type: 'keyword' }, ' prisma.shopBay.', { text: 'update', type: 'function' }, '({'
      ]},
      { tokens: ['        where: { id: bayId },'] },
      { text: '        data: {' },
      { tokens: [
        '            status: ', { text: "'IN_SERVICE'", type: 'string' }, ','
      ]},
      { text: '            vehicleVin: vehicleData.vin,' },
      { tokens: [
        '            updatedAt: ', { text: 'new', type: 'keyword' }, ' ', { text: 'Date', type: 'function' }, '()'
      ]},
      { text: '        }' },
      { text: '    });' },
      { text: '' },
      { tokens: [
        '    ', { text: 'revalidatePath', type: 'function' }, '(', { text: "'/dashboard/bays'", type: 'string' }, ');'
      ]},
      { tokens: [
        '    ', { text: 'return', type: 'keyword' }, ' { status: ', { text: '200', type: 'number' }, ', bay };'
      ]},
      { text: '}' },
    ]
  },
  {
    id: 'rag',
    label: 'LangGraph RAG',
    icon: <SiPython size={14} className="text-amber-400" />,
    dotColor: '#60a5fa',
    filename: 'anurag ~ agents/rag_orchestrator.py',
    language: 'python',
    lines: [
      { text: '# Multi-Agent LangGraph Workflow', type: 'comment' },
      { tokens: [
        { text: 'from', type: 'keyword' }, ' langgraph.graph ', { text: 'import', type: 'keyword' }, ' StateGraph, END'
      ]},
      { tokens: [
        { text: 'from', type: 'keyword' }, ' langchain_google_genai ', { text: 'import', type: 'keyword' }, ' ChatGoogleGenerativeAI'
      ]},
      { tokens: [
        { text: 'from', type: 'keyword' }, ' core.vector_store ', { text: 'import', type: 'keyword' }, ' chroma_retriever'
      ]},
      { text: '' },
      { tokens: [
        'llm = ', { text: 'ChatGoogleGenerativeAI', type: 'function' }, '(model=', { text: '"gemini-1.5-pro"', type: 'string' }, ', temperature=', { text: '0.2', type: 'number' }, ')'
      ]},
      { text: '' },
      { tokens: [
        { text: 'def', type: 'keyword' }, ' ', { text: 'retrieve_and_synthesize', type: 'function' }, '(state):'
      ]},
      { tokens: [
        '    docs = chroma_retriever.', { text: 'get_relevant_documents', type: 'function' }, '(state[', { text: '"query"', type: 'string' }, '])'
      ]},
      { tokens: [
        '    response = llm.', { text: 'invoke', type: 'function' }, '(f', { text: '"Context: {docs}\\nQuery: {state[\'query\']}"', type: 'string' }, ')'
      ]},
      { tokens: [
        '    ', { text: 'return', type: 'keyword' }, ' {', { text: '"synthesized_output"', type: 'string' }, ': response.content}'
      ]},
      { text: '' },
      { tokens: [
        'workflow = ', { text: 'StateGraph', type: 'function' }, '()'
      ]},
      { tokens: [
        'workflow.', { text: 'add_node', type: 'function' }, '(', { text: '"rag_engine"', type: 'string' }, ', retrieve_and_synthesize)'
      ]},
      { tokens: [
        'workflow.', { text: 'set_entry_point', type: 'function' }, '(', { text: '"rag_engine"', type: 'string' }, ')'
      ]},
    ]
  }
];

/* ─── Token color map ─── */
const tokenColors = {
  keyword: '#ff79c6',
  string: '#f1fa8c',
  function: '#8be9fd',
  number: '#bd93f9',
  comment: '#6272a4',
};

/* ─── Render a single line ─── */
function CodeLine({ line }) {
  // Simple string line
  if (typeof line === 'string' || line.text !== undefined) {
    const text = typeof line === 'string' ? line : line.text;
    const type = typeof line === 'object' ? line.type : null;

    if (!text) return <div style={{ height: '1.5em' }}>{'\u00A0'}</div>;

    return (
      <div style={{ color: type ? tokenColors[type] : '#f8f8f2' }}>
        {text}
      </div>
    );
  }

  // Token array line
  if (line.tokens) {
    return (
      <div>
        {line.tokens.map((token, j) => {
          if (typeof token === 'string') {
            return <span key={j} style={{ color: '#f8f8f2' }}>{token}</span>;
          }
          return (
            <span key={j} style={{ color: tokenColors[token.type] || '#f8f8f2' }}>
              {token.text}
            </span>
          );
        })}
      </div>
    );
  }

  return null;
}

/* ─── Main Component ─── */
export default function CodeBox() {
  const [activeTab, setActiveTab] = useState('api');
  const [copied, setCopied] = useState(false);

  const activeSnippet = codeSnippets.find(s => s.id === activeTab);

  const getPlainText = () => {
    return activeSnippet.lines.map(line => {
      if (typeof line === 'string') return line;
      if (line.text !== undefined) return line.text;
      if (line.tokens) {
        return line.tokens.map(t => typeof t === 'string' ? t : t.text).join('');
      }
      return '';
    }).join('\n');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getPlainText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        width: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #21262d',
        background: '#0d1117',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace",
      }}
    >
      {/* ─ Window Title Bar ─ */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 16px',
        background: '#161b22',
        borderBottom: '1px solid #21262d',
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
        </div>
        <div style={{ fontSize: '12px', color: '#8b949e', flex: 1, textAlign: 'center' }}>
          {activeSnippet.filename}
        </div>
        <button
          onClick={handleCopy}
          style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            background: 'none', border: 'none', color: '#8b949e',
            cursor: 'pointer', fontSize: '12px', padding: '4px 8px',
            borderRadius: '6px',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = '#8b949e'}
        >
          {copied ? <Check size={14} style={{ color: '#4ade80' }} /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* ─ Tabs ─ */}
      <div style={{
        display: 'flex',
        background: '#0d1117',
        borderBottom: '1px solid #21262d',
        padding: '0 8px',
        overflow: 'hidden',
      }}>
        {codeSnippets.map((snippet) => {
          const isActive = activeTab === snippet.id;
          return (
            <button
              key={snippet.id}
              onClick={() => setActiveTab(snippet.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '10px 16px',
                background: isActive ? '#1e2329' : 'transparent',
                border: 'none',
                borderTop: isActive ? '2px solid #58a6ff' : '2px solid transparent',
                color: isActive ? '#e6edf3' : '#8b949e',
                fontSize: '13px',
                fontWeight: isActive ? 600 : 400,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontFamily: 'inherit',
                transition: 'color 0.15s, background 0.15s',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#c9d1d9'; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#8b949e'; }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                {snippet.icon}
              </span>
              {snippet.label}
            </button>
          );
        })}
      </div>

      {/* ─ Code Area ─ */}
      <div
        style={{
          padding: '20px 20px',
          background: '#0d1117',
          overflowX: 'auto',
          overflowY: 'auto',
          height: '320px',
          fontSize: '13px',
          lineHeight: '1.6',
          color: '#f8f8f2',
        }}
        className="custom-scrollbar"
      >
        <pre style={{ margin: 0, fontFamily: 'inherit' }}>
          <code>
            {activeSnippet.lines.map((line, i) => (
              <CodeLine key={`${activeTab}-${i}`} line={line} />
            ))}
          </code>
        </pre>
      </div>

      {/* ─ Status Bar ─ */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 16px',
        background: '#161b22',
        borderTop: '1px solid #21262d',
        fontSize: '11px',
        color: '#8b949e',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: activeSnippet.dotColor,
            display: 'inline-block',
          }} />
          {activeSnippet.label}
        </div>
        <div style={{ opacity: 0.7 }}>
          AI-Augmented Architecture • Node v22
        </div>
      </div>
    </div>
  );
}
