// Initialize admin data if not exists
const initializeAdminData = () => {
  const storedData = localStorage.getItem('adminData');
  if (!storedData) {
    const initialData = {
      username: "rd",
      password: "abcd"
    };
    localStorage.setItem('adminData', JSON.stringify(initialData));
  }
};

// Call initialization
initializeAdminData();

export const loginAdmin = (username: string, password: string) => {
  const storedData = JSON.parse(localStorage.getItem('adminData') || '{}');
  
  if (storedData.username === username && storedData.password === password) {
    const token = btoa(JSON.stringify({ username, role: 'admin' }));
    localStorage.setItem('adminToken', token);
    return { success: true, token };
  }
  return { success: false, message: 'Invalid credentials' };
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('adminToken');
  if (!token) return false;
  
  try {
    const decoded = JSON.parse(atob(token));
    return decoded.role === 'admin';
  } catch {
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem('adminToken');
}; 