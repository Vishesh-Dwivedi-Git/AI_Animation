
# 🌀 Animagic

Animagic is an AI-powered animation generation platform. Authenticated users can describe a scene in natural language, and the system generates a custom animation video using Manim, hosted via a FastAPI backend and authenticated via **Privy** (OAuth + access token).

---

## 🌐 Tech Stack

- **Frontend:** Next.js 14 + TypeScript + Tailwind CSS  
- **Auth:** [Privy](https://www.privy.io/) (Google, GitHub, Twitter login support)  
- **Backend:** FastAPI (Python)  
- **Rendering Engine:** Manim (for math/scene animations)  
- **Storage:** Local or S3-compatible (adjustable)  

---

## 🚀 Features

- 🔐 OAuth-based secure login using Privy
- ✏️ Natural language prompt input
- 🎞️ AI-based Manim code generation & rendering
- 📽️ Preview video playback inside chat UI
- ⬇️ Download MP4 or export GIF
- 🗨️ Real-time AI-styled chat interface

---

## 📁 Project Structure

```
root/
├── frontend/               # Next.js app
│   └── components/
│   └── pages/
│   └── utils/
│   └── public/
│   └── ...
├── backend/                # FastAPI app
│   └── main.py
│   └── auth.py             # Privy token verification
│   └── generate.py         # Animation generation endpoint
│   └── manim_utils.py
│   └── ...
├── requirements.txt
├── render.yaml             # Deployment config for Render
└── README.md
```

---

## 🔐 Authentication via Privy

- Auth handled in frontend using `@privy-io/react-auth`
- After login, access token is fetched:
  ```ts
  const token = await getAccessToken();
  ```
- Access token is passed in request headers to the backend:
  ```ts
  Authorization: `Bearer ${token}`
  ```

- Backend uses `jose` and Privy's JWKS endpoint to verify the token:
  ```python
  payload = jwt.decode(token, key, algorithms=["RS256"], audience=PRIVY_APP_ID)
  ```

---

## 🧪 Local Development

### Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend (Next.js)
```bash
cd frontend
pnpm install
pnpm dev
```

Ensure you have the following `.env` in **backend**:

```env
PRIVY_APP_ID=your_privy_app_id
PRIVY_PUBLIC_JWKS=https://auth.privy.io/.well-known/jwks.json
```

---

## 🌍 Deployment

### ✅ Deploy Backend on Render

1. Push to GitHub.
2. Add `render.yaml` or configure manually.
3. Use start command:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 10000
   ```

### ✅ Deploy Frontend on Vercel

- Set environment variable:
  ```env
  NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
  ```

---

## 📦 API Endpoint

**POST** `/generate`

```json
Request:
{
  "prompt": "A dragon flying through stormy clouds at sunset"
}
```

```json
Response:
{
  "video_url": "https://yourdomain.com/videos/abc123.mp4"
}
```

**Headers:**
```http
Authorization: Bearer <privy_access_token>
```

---

## 🧠 Credits

- Animation powered by [Manim](https://www.manim.community/)
- Auth via [Privy](https://www.privy.io/)
- Frontend styled with [Tailwind CSS](https://tailwindcss.com/)

---

## 🛡️ License

MIT License © 2025 Animagic Team
