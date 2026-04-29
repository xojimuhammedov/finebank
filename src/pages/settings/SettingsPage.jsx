import { useState, useRef } from 'react';
import { useSettings } from '@/context/SettingsContext';
import { 
  Camera, Check, Plus, Trash2, Edit2, 
  Wallet, CreditCard, Landmark, Circle,
  CheckCircle2, Bell, Shield, Globe
} from 'lucide-react';
import { ACCOUNT_TYPES, CURRENCIES, ICONS, COLORS } from './constants';

// --- Shared Components ---
function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-800">{label}</label>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, type = 'text', prefix, disabled }) {
  return (
    <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 overflow-hidden focus-within:border-[#299D91] focus-within:ring-2 focus-within:ring-[#299D91]/20 transition-all">
      {prefix && (
        <span className="px-3 py-3 text-sm text-gray-500 border-r border-gray-200 bg-white select-none">
          {prefix}
        </span>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 px-4 py-3 text-sm text-gray-700 bg-transparent outline-none placeholder:text-gray-400 disabled:opacity-60"
      />
    </div>
  );
}

function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#299D91] focus:ring-2 focus:ring-[#299D91]/20 transition-all appearance-none"
      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236b7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2rem' }}
    >
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
}

function Switch({ checked, onChange, label }) {
  return (
    <label className="flex items-center justify-between cursor-pointer group py-2">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="relative">
        <input 
          type="checkbox" 
          className="sr-only" 
          checked={checked} 
          onChange={(e) => onChange(e.target.checked)} 
        />
        <div className={`w-11 h-6 rounded-full transition-colors ${checked ? 'bg-[#299D91]' : 'bg-gray-200'}`}></div>
        <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${checked ? 'translate-x-5' : ''}`}></div>
      </div>
    </label>
  );
}

// --- 1. Profile Tab ---
function ProfileTab() {
  const { profile, updateProfile } = useSettings();
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-5">
          <Field label="Full name">
            <TextInput value={form.fullName} onChange={(v) => setForm({...form, fullName: v})} placeholder="John Doe" />
          </Field>
          <Field label="Email">
            <TextInput value={form.email} onChange={(v) => setForm({...form, email: v})} placeholder="john@email.com" />
          </Field>
          <Field label="Phone">
            <TextInput value={form.phone} onChange={(v) => setForm({...form, phone: v})} placeholder="+998 90 123 45 67" />
          </Field>
          <Field label="Default month or period">
            <Select value={form.defaultPeriod} onChange={(v) => setForm({...form, defaultPeriod: v})} options={['Monthly', 'Weekly', 'Daily']} />
          </Field>
        </div>
        <div className="flex flex-col items-start gap-2 lg:w-44">
          <p className="text-sm font-semibold text-gray-800">Profile Picture</p>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-36 h-36 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center gap-2 hover:border-[#299D91] hover:bg-[#f0f9f8] transition-all group overflow-hidden"
          >
            <Camera size={28} className="text-gray-300 group-hover:text-[#299D91]" />
            <span className="text-xs text-gray-400 group-hover:text-[#299D91] text-center">Upload photo</span>
          </button>
          <input ref={fileRef} type="file" className="hidden" />
        </div>
      </div>
      <button type="submit" className="w-fit bg-[#299D91] hover:bg-[#1f7a70] text-white text-sm font-semibold px-8 py-3 rounded-xl transition-all flex items-center gap-2">
        {saved ? <><Check size={18} /> Saved</> : 'Save Changes'}
      </button>
    </form>
  );
}

// --- 2. Accounts Tab ---
function AccountsTab() {
  const { accounts, addAccount, updateAccount, deleteAccount } = useSettings();
  const [editingId, setEditingId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', type: 'Cash', balance: '', currency: 'UZS', status: 'active' });

  const resetForm = () => {
    setForm({ name: '', type: 'Cash', balance: '', currency: 'UZS', status: 'active' });
    setEditingId(null);
    setShowAdd(false);
  };

  const handleSave = () => {
    if (!form.name || !form.balance) return;
    const data = { ...form, balance: Number(form.balance) };
    if (editingId) {
      updateAccount(editingId, data);
    } else {
      addAccount(data);
    }
    resetForm();
  };

  const handleEdit = (acc) => {
    setForm(acc);
    setEditingId(acc.id);
    setShowAdd(true);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">Manage Accounts</h3>
        {!showAdd && (
          <button onClick={() => setShowAdd(true)} className="bg-[#299D91] text-white p-2 rounded-lg hover:bg-[#1f7a70] transition-colors">
            <Plus size={20} />
          </button>
        )}
      </div>

      {showAdd && (
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Account Name">
              <TextInput value={form.name} onChange={(v) => setForm({...form, name: v})} placeholder="e.g. My Savings" />
            </Field>
            <Field label="Account Type">
              <Select value={form.type} onChange={(v) => setForm({...form, type: v})} options={ACCOUNT_TYPES} />
            </Field>
            <Field label="Balance">
              <TextInput type="number" value={form.balance} onChange={(v) => setForm({...form, balance: v})} placeholder="0.00" />
            </Field>
            <Field label="Currency">
              <Select value={form.currency} onChange={(v) => setForm({...form, currency: v})} options={CURRENCIES} />
            </Field>
            <Field label="Status">
              <Select value={form.status} onChange={(v) => setForm({...form, status: v})} options={['active', 'inactive']} />
            </Field>
          </div>
          <div className="flex gap-3 mt-2">
            <button onClick={handleSave} className="bg-[#299D91] text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-[#1f7a70]">
              {editingId ? 'Update' : 'Add'} Account
            </button>
            <button onClick={resetForm} className="bg-white border border-gray-200 text-gray-600 text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accounts.map(acc => (
          <div key={acc.id} className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${acc.status === 'inactive' ? 'bg-gray-50 border-gray-100 opacity-60' : 'bg-white border-gray-200 shadow-sm'}`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#e6f5f4] flex items-center justify-center text-[#299D91]">
                {acc.type === 'Cash' && <Wallet size={20} />}
                {acc.type === 'Card' && <CreditCard size={20} />}
                {acc.type === 'Bank' && <Landmark size={20} />}
                {acc.type === 'Other' && <Circle size={20} />}
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">{acc.name}</p>
                <p className="text-xs text-gray-400">{acc.type} • {acc.balance.toLocaleString()} {acc.currency}</p>
              </div>
            </div>
            <div className="flex gap-1">
              <button onClick={() => handleEdit(acc)} className="p-2 text-gray-400 hover:text-[#299D91] hover:bg-gray-50 rounded-lg">
                <Edit2 size={16} />
              </button>
              <button onClick={() => deleteAccount(acc.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- 3. Categories Tab ---
function CategoriesTab() {
  const { categories, addCategory, updateCategory, deleteCategory } = useSettings();
  const [type, setType] = useState('income');
  const [editingId, setEditingId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', type: 'income', icon: 'PlusCircle', color: '#10b981' });

  const filtered = categories.filter(c => c.type === type);

  const resetForm = () => {
    setForm({ name: '', type: type, icon: 'PlusCircle', color: '#10b981' });
    setEditingId(null);
    setShowAdd(false);
  };

  const handleSave = () => {
    if (!form.name) return;
    if (editingId) {
      updateCategory(editingId, form);
    } else {
      addCategory(form);
    }
    resetForm();
  };

  const handleEdit = (cat) => {
    setForm(cat);
    setEditingId(cat.id);
    setShowAdd(true);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4 p-1 bg-gray-100 rounded-xl w-fit">
        <button 
          onClick={() => { setType('income'); resetForm(); }}
          className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${type === 'income' ? 'bg-white text-[#299D91] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Income
        </button>
        <button 
          onClick={() => { setType('expense'); resetForm(); }}
          className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${type === 'expense' ? 'bg-white text-[#299D91] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Expense
        </button>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800 capitalize">{type} Categories</h3>
        {!showAdd && (
          <button onClick={() => setShowAdd(true)} className="bg-[#299D91] text-white p-2 rounded-lg hover:bg-[#1f7a70]">
            <Plus size={20} />
          </button>
        )}
      </div>

      {showAdd && (
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Category Name">
              <TextInput value={form.name} onChange={(v) => setForm({...form, name: v})} placeholder="e.g. Health" />
            </Field>
            <Field label="Color">
              <div className="flex flex-wrap gap-2">
                {COLORS.map(c => (
                  <button 
                    key={c} 
                    onClick={() => setForm({...form, color: c})}
                    className={`w-8 h-8 rounded-full border-2 ${form.color === c ? 'border-gray-800' : 'border-transparent'}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </Field>
          </div>
          <div className="flex gap-3 mt-2">
            <button onClick={handleSave} className="bg-[#299D91] text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-[#1f7a70]">
              {editingId ? 'Update' : 'Add'} Category
            </button>
            <button onClick={resetForm} className="bg-white border border-gray-200 text-gray-600 text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filtered.map(cat => (
          <div key={cat.id} className="group relative bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-center gap-3 hover:border-[#299D91] transition-all">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm" style={{ backgroundColor: cat.color }}>
              <Landmark size={24} /> {/* In a real app we'd map cat.icon to a Lucide icon */}
            </div>
            <p className="font-bold text-gray-800 text-sm text-center">{cat.name}</p>
            <div className="absolute top-2 right-2 flex opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleEdit(cat)} className="p-1 text-gray-400 hover:text-[#299D91]">
                <Edit2 size={14} />
              </button>
              <button onClick={() => deleteCategory(cat.id)} className="p-1 text-gray-400 hover:text-red-500">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- 4. Currency & Preferences Tab ---
function PreferencesTab() {
  const { currency, updateCurrency, preferences, updatePreferences } = useSettings();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Currency */}
      <section className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Globe size={20} className="text-[#299D91]" />
          Currency Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Default Currency">
            <Select value={currency.default} onChange={(v) => updateCurrency({ default: v })} options={CURRENCIES} />
          </Field>
          <Field label="Secondary Currency (Optional)">
            <Select value={currency.secondary} onChange={(v) => updateCurrency({ secondary: v })} options={['None', ...CURRENCIES]} />
          </Field>
        </div>
      </section>

      <hr className="border-gray-100" />

      {/* Preferences */}
      <section className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Bell size={20} className="text-[#299D91]" />
          App Preferences
        </h3>
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 divide-y divide-gray-200/60">
          <Switch 
            label="Enable Budget Alerts" 
            checked={preferences.budgetAlerts} 
            onChange={(v) => updatePreferences({ budgetAlerts: v })} 
          />
          <Switch 
            label="Enable Debt Reminders" 
            checked={preferences.debtReminders} 
            onChange={(v) => updatePreferences({ debtReminders: v })} 
          />
          <Switch 
            label="Enable Goal Progress Reminders" 
            checked={preferences.goalProgressReminders} 
            onChange={(v) => updatePreferences({ goalProgressReminders: v })} 
          />
        </div>
      </section>

      <button onClick={handleSave} className="w-fit bg-[#299D91] hover:bg-[#1f7a70] text-white text-sm font-semibold px-8 py-3 rounded-xl transition-all flex items-center gap-2">
        {saved ? <><Check size={18} /> Settings Saved</> : 'Save Preferences'}
      </button>
    </div>
  );
}

// --- Main Settings Page ---
const TABS = [
  { id: 'profile', label: 'Profile', icon: Shield },
  { id: 'accounts', label: 'Accounts', icon: CreditCard },
  { id: 'categories', label: 'Categories', icon: Landmark },
  { id: 'preferences', label: 'Preferences', icon: Bell }
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-sm text-gray-400 mt-1">Manage your profile and system configuration</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Navigation */}
        <div className="lg:w-64 flex lg:flex-col gap-1 bg-white p-2 rounded-2xl border border-gray-100 h-fit sticky top-8 overflow-x-auto lg:overflow-visible no-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap lg:whitespace-normal ${
                activeTab === tab.id
                  ? 'bg-[#299D91] text-white shadow-md shadow-[#299D91]/20'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-[#299D91]'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
          {activeTab === 'profile' && <ProfileTab />}
          {activeTab === 'accounts' && <AccountsTab />}
          {activeTab === 'categories' && <CategoriesTab />}
          {activeTab === 'preferences' && <PreferencesTab />}
        </div>
      </div>
    </div>
  );
}
