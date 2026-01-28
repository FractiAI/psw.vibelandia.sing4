# Push from your normal terminal (no proxy, no sandbox)

This repo is set to **use no proxy** — Git connects directly to GitHub.

## Use a normal terminal

- **Cursor:** Open the **Terminal** panel (View → Terminal or `` Ctrl+` ``). That terminal is normal and not sandboxed.
- **Or:** Open **Windows Terminal** or **Command Prompt** or **PowerShell** from the Start menu.

## Commands

```powershell
cd c:\Users\info\psw.vibelandia.sing4
git push origin main
```

If it asks for login, use your GitHub username and a **Personal Access Token** (not your password).  
Create a token: GitHub → Settings → Developer settings → Personal access tokens.

---

**Why:** The AI assistant runs commands in a sandbox that can’t reach the network. When *you* run `git push` in your own terminal, it’s normal — no sandbox, no proxy for this repo.
