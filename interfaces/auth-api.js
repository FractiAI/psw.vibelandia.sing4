/**
 * Auth API — Supabase handles auth (and Google OAuth).
 * Token (Supabase access_token) stored in localStorage; sent as Authorization: Bearer to Octave 2 for profile/orders.
 * Fallback: if Supabase not configured, uses Octave 2 auth endpoints.
 */
(function () {
  var BASE = typeof window !== 'undefined' && window.VIBELANDIA_API_BASE
    ? window.VIBELANDIA_API_BASE
    : 'https://syntheverse-poc.vercel.app';
  var TOKEN_KEY = 'vibelandia_auth_token';
  var USER_KEY = 'vibelandia_auth_user';
  var SUPABASE_URL = typeof window !== 'undefined' && window.VIBELANDIA_SUPABASE_URL;
  var SUPABASE_ANON_KEY = typeof window !== 'undefined' && window.VIBELANDIA_SUPABASE_ANON_KEY;
  var supabaseClient = null;

  function getSupabase() {
    if (!supabaseClient && SUPABASE_URL && SUPABASE_ANON_KEY && typeof window !== 'undefined' && window.supabase && window.supabase.createClient) {
      supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return supabaseClient;
  }

  function useSupabase() {
    return !!(SUPABASE_URL && SUPABASE_ANON_KEY && typeof window !== 'undefined' && window.supabase && window.supabase.createClient);
  }

  function getToken() {
    try {
      return localStorage.getItem(TOKEN_KEY) || undefined;
    } catch (_) { return undefined; }
  }

  function setToken(token, user) {
    try {
      if (token) localStorage.setItem(TOKEN_KEY, token);
      else localStorage.removeItem(TOKEN_KEY);
      if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
      else localStorage.removeItem(USER_KEY);
    } catch (_) {}
  }

  function authHeaders() {
    var t = getToken();
    var h = { 'Content-Type': 'application/json' };
    if (t) h['Authorization'] = 'Bearer ' + t;
    if (typeof window !== 'undefined' && window.VibelandiaGoldenKey && typeof window.VibelandiaGoldenKey.get === 'function') {
      var gk = window.VibelandiaGoldenKey.get();
      if (gk) {
        h['X-Golden-Key'] = gk;
        h['X-Golden-Key-Wallet'] = 'Syntheverse,Vibeverse,Vibelandia';
      }
    }
    return h;
  }

  function api(path, options) {
    var url = BASE + (path.charAt(0) === '/' ? path : '/' + path);
    var opts = options || {};
    var headers = opts.headers || authHeaders();
    return fetch(url, {
      method: opts.method || 'GET',
      headers: headers,
      body: opts.body != null ? (typeof opts.body === 'string' ? opts.body : JSON.stringify(opts.body)) : undefined,
      credentials: opts.credentials || 'same-origin'
    });
  }

  function getSession() {
    if (useSupabase()) {
      var supabase = getSupabase();
      if (!supabase) return Promise.resolve(null);
      return supabase.auth.getSession()
        .then(function (r) {
          var session = r.data && r.data.session;
          if (session) {
            var user = session.user;
            var u = { id: user.id, email: user.email || '', displayName: user.user_metadata?.full_name || user.user_metadata?.name || null, avatarUrl: user.user_metadata?.avatar_url || null };
            setToken(session.access_token, u);
            return { user: u };
          }
          setToken(null, null);
          return null;
        })
        .catch(function () { return null; });
    }
    return api('/api/auth/session', { method: 'GET' })
      .then(function (r) {
        if (r.status === 401) { setToken(null, null); return null; }
        if (!r.ok) return null;
        return r.json();
      })
      .then(function (data) {
        if (data && data.user) setToken(getToken(), data.user);
        return data;
      })
      .catch(function () { return null; });
  }

  function login(email, password) {
    if (useSupabase()) {
      var supabase = getSupabase();
      if (!supabase) return Promise.resolve(null);
      return supabase.auth.signInWithPassword({ email: email, password: password })
        .then(function (r) {
          if (r.data && r.data.session) {
            var session = r.data.session;
            var user = session.user;
            var u = { id: user.id, email: user.email || '', displayName: user.user_metadata?.full_name || user.user_metadata?.name || null };
            setToken(session.access_token, u);
            return { token: session.access_token, user: u };
          }
          return null;
        })
        .catch(function () { return null; });
    }
    return api('/api/auth/login', { method: 'POST', body: { email: email, password: password } })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && data.token && data.user) { setToken(data.token, data.user); return data; }
        return null;
      })
      .catch(function () { return null; });
  }

  function signup(email, password) {
    if (useSupabase()) {
      var supabase = getSupabase();
      if (!supabase) return Promise.resolve(null);
      return supabase.auth.signUp({ email: email, password: password })
        .then(function (r) {
          if (r.data && r.data.session) {
            var session = r.data.session;
            var user = session.user;
            var u = { id: user.id, email: user.email || '', displayName: user.user_metadata?.full_name || user.user_metadata?.name || null };
            setToken(session.access_token, u);
            return { token: session.access_token, user: u };
          }
          if (r.data && r.data.user && !r.data.session) {
            var u2 = { id: r.data.user.id, email: r.data.user.email || '', displayName: null };
            return { token: null, user: u2 };
          }
          return null;
        })
        .catch(function () { return null; });
    }
    return api('/api/auth/signup', { method: 'POST', body: { email: email, password: password } })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && data.token && data.user) { setToken(data.token, data.user); return data; }
        return null;
      })
      .catch(function () { return null; });
  }

  function logout() {
    if (useSupabase()) {
      var supabase = getSupabase();
      if (supabase) supabase.auth.signOut().catch(function () {});
      setToken(null, null);
      return Promise.resolve();
    }
    return api('/api/auth/logout', { method: 'POST' }).catch(function () {}).then(function () { setToken(null, null); });
  }

  /**
   * Returns Promise<string> — URL to redirect to for Google sign-in (or Octave 2 URL).
   * Caller should do: Auth.getGoogleAuthUrl(returnUrl).then(function(url) { if (url) location.href = url; });
   */
  function getGoogleAuthUrl(returnUrl) {
    var url = returnUrl || (typeof window !== 'undefined' && window.location ? window.location.href : '');
    if (useSupabase()) {
      var supabase = getSupabase();
      if (!supabase) return Promise.resolve('');
      return supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: url } })
        .then(function (r) { return (r.data && r.data.url) || ''; })
        .catch(function () { return ''; });
    }
    return Promise.resolve(BASE + '/api/auth/google?redirect_uri=' + encodeURIComponent(url));
  }

  /**
   * Consume OAuth callback (token in URL or Supabase session from hash). Returns Promise so callers can await.
   */
  function consumeOAuthToken() {
    if (typeof window === 'undefined' || !window.location) return Promise.resolve(undefined);
    if (useSupabase()) {
      var supabase = getSupabase();
      if (supabase) {
        return supabase.auth.getSession().then(function (r) {
          var session = r.data && r.data.session;
          if (session) {
            var user = session.user;
            var u = { id: user.id, email: user.email || '', displayName: user.user_metadata?.full_name || user.user_metadata?.name || null };
            setToken(session.access_token, u);
            return session.access_token;
          }
          return undefined;
        }).catch(function () { return undefined; });
      }
    }
    var h = window.location.hash || '';
    var q = window.location.search || '';
    var match = (h + '&' + q).match(/[#&]token=([^&]+)/);
    if (!match) return Promise.resolve(undefined);
    var token = decodeURIComponent(match[1]);
    setToken(token, { id: '', email: '', displayName: null });
    try { history.replaceState(null, '', window.location.pathname + window.location.search); } catch (_) {}
    return Promise.resolve(token);
  }

  function getStoredUser() {
    try {
      var s = localStorage.getItem(USER_KEY);
      return s ? JSON.parse(s) : null;
    } catch (_) { return null; }
  }

  function getProfile() {
    return api('/api/user/profile', { method: 'GET' })
      .then(function (r) {
        if (r.status === 401) return null;
        if (!r.ok) return null;
        return r.json();
      })
      .catch(function () { return null; });
  }

  function completeOrder(orderId, planId) {
    return api('/api/orders/complete', { method: 'POST', body: { orderId: orderId, planId: planId } })
      .then(function (r) { if (!r.ok) return null; return r.json(); })
      .catch(function () { return null; });
  }

  window.VibelandiaAuth = {
    getApiBase: function () { return BASE; },
    getToken: getToken,
    authHeaders: authHeaders,
    getSession: getSession,
    login: login,
    signup: signup,
    logout: logout,
    getGoogleAuthUrl: getGoogleAuthUrl,
    consumeOAuthToken: consumeOAuthToken,
    getStoredUser: getStoredUser,
    getProfile: getProfile,
    completeOrder: completeOrder,
    api: api,
    useSupabase: useSupabase
  };
})();
