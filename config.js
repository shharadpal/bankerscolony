// ================================================================
// config.js — Bankers Colony Frontend Config
// Included in every HTML page before </body>
// ================================================================

const API_BASE = 'https://bankers-colony-api.onrender.com';

function getToken()  { return localStorage.getItem('bc_token'); }
function setToken(t) { localStorage.setItem('bc_token', t); }
function getUser()   { try{ return JSON.parse(localStorage.getItem('bc_user')); }catch{ return null; } }
function setUser(u)  { localStorage.setItem('bc_user', JSON.stringify(u)); }
function clearAuth() { localStorage.removeItem('bc_token'); localStorage.removeItem('bc_user'); }

function requireAuth() {
  if (!getToken()) { window.location.href = 'login.html'; return false; }
  return true;
}

function requireAdmin() {
  if (!getToken()) { window.location.href = 'login.html'; return false; }
  const u = getUser();
  if (!u || (u.role !== 'admin' && u.role !== 'superadmin')) {
    window.location.href = 'index.html'; return false;
  }
  return true;
}

function logout() {
  fetch(API_BASE + '/api/auth/logout', { method:'POST', credentials:'include' }).catch(()=>{});
  clearAuth();
  window.location.href = 'login.html';
}

async function api(path, method='GET', body=null) {
  const headers = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) headers['Authorization'] = 'Bearer ' + token;
  const opts = { method, headers, credentials:'include' };
  if (body) opts.body = JSON.stringify(body);
  const res  = await fetch(API_BASE + path, opts);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}
