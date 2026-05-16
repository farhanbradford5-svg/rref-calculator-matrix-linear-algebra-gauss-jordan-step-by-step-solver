'use client';
import { useState } from 'react';
import Breadcrumb from '@/components/calculator/Breadcrumb';
import { Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: 'Bug Report', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Contact Us</h1>
      <p className="text-slate-500 mb-8">Found a bug? Mathematical error in our content? Suggestion for a new calculator? We want to hear from you.</p>

      {sent ? (
        <div className="card p-8 text-center">
          <CheckCircle className="text-green-500 mx-auto mb-3" size={40} />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Message Received</h2>
          <p className="text-slate-600">Thank you for reaching out. We review all messages and respond to bug reports and content corrections promptly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
            <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="your@email.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
            <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Bug Report</option>
              <option>Mathematical Error</option>
              <option>Feature Request</option>
              <option>Calculator Suggestion</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Message <span className="text-red-500">*</span></label>
            <textarea required rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y"
              placeholder="Describe the issue or suggestion in as much detail as you can. For bugs, include the matrix values that produce the error." />
          </div>
          <button type="submit" className="btn-primary flex items-center gap-2"><Send size={15} />Send Message</button>
        </form>
      )}

      <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-200">
        <h2 className="text-sm font-semibold text-slate-800 mb-2">Response Times</h2>
        <ul className="text-sm text-slate-600 space-y-1">
          <li>• Bug reports (calculator gives wrong answer): typically within 24 hours</li>
          <li>• Mathematical errors in guides: 24–48 hours</li>
          <li>• Feature requests and suggestions: reviewed weekly</li>
          <li>• General inquiries: 3–5 business days</li>
        </ul>
      </div>
    </main>
  );
}
