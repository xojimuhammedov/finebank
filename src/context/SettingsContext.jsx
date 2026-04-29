import { createContext, useContext, useState, useEffect } from 'react';
import { 
  DEFAULT_ACCOUNTS, 
  DEFAULT_INCOME_CATEGORIES, 
  DEFAULT_EXPENSE_CATEGORIES 
} from '@/pages/settings/constants';

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('finebank_profile');
    return saved ? JSON.parse(saved) : {
      fullName: 'John Doe',
      email: 'johndoe@email.com',
      phone: '+998 90 123 45 67',
      defaultPeriod: 'Monthly'
    };
  });

  const [accounts, setAccounts] = useState(() => {
    const saved = localStorage.getItem('finebank_accounts');
    return saved ? JSON.parse(saved) : DEFAULT_ACCOUNTS;
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('finebank_categories');
    return saved ? JSON.parse(saved) : [...DEFAULT_INCOME_CATEGORIES, ...DEFAULT_EXPENSE_CATEGORIES];
  });

  const [currency, setCurrency] = useState(() => {
    const saved = localStorage.getItem('finebank_currency');
    return saved ? JSON.parse(saved) : { default: 'UZS', secondary: 'USD' };
  });

  const [preferences, setPreferences] = useState(() => {
    const saved = localStorage.getItem('finebank_preferences');
    return saved ? JSON.parse(saved) : {
      budgetAlerts: true,
      debtReminders: true,
      goalProgressReminders: true
    };
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('finebank_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('finebank_accounts', JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem('finebank_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('finebank_currency', JSON.stringify(currency));
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('finebank_preferences', JSON.stringify(preferences));
  }, [preferences]);

  const updateProfile = (data) => setProfile(prev => ({ ...prev, ...data }));
  
  const addAccount = (account) => setAccounts(prev => [...prev, { ...account, id: Date.now().toString() }]);
  const updateAccount = (id, data) => setAccounts(prev => prev.map(acc => acc.id === id ? { ...acc, ...data } : acc));
  const deleteAccount = (id) => setAccounts(prev => prev.filter(acc => acc.id !== id));

  const addCategory = (category) => setCategories(prev => [...prev, { ...category, id: Date.now().toString() }]);
  const updateCategory = (id, data) => setCategories(prev => prev.map(cat => cat.id === id ? { ...cat, ...data } : cat));
  const deleteCategory = (id) => setCategories(prev => prev.filter(cat => cat.id !== id));

  const updateCurrency = (data) => setCurrency(prev => ({ ...prev, ...data }));
  const updatePreferences = (data) => setPreferences(prev => ({ ...prev, ...data }));

  return (
    <SettingsContext.Provider value={{
      profile, updateProfile,
      accounts, addAccount, updateAccount, deleteAccount,
      categories, addCategory, updateCategory, deleteCategory,
      currency, updateCurrency,
      preferences, updatePreferences
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
}
