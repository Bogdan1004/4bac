# Setup 4bac

## 1. Pornire rapida (dezvoltare locala)

```bash
npm run dev
```

Site-ul ruleaza la http://localhost:3000

**Conturi demo:**
- Admin: `admin@4bac.ro` / `admin123`
- Elev: `student@4bac.ro` / `student123`

---

## 2. Configurare compilator C++ (Judge0)

Fara compilator, submit-urile nu vor functiona. Ai doua optiuni:

### Optiunea A: Judge0 local via Docker (recomandat)

```bash
# Instaleaza Docker Desktop: https://www.docker.com/products/docker-desktop/

# Porneste Judge0
git clone https://github.com/judge0/judge0
cd judge0
cp judge0.conf.example judge0.conf
docker-compose up -d
```

Judge0 va rula la `http://localhost:2358`. Adauga in `.env.local`:
```
JUDGE0_URL=http://localhost:2358
```

### Optiunea B: RapidAPI (hosted, fara Docker)

1. Mergi la https://rapidapi.com/judge0-official/api/judge0-ce
2. Creeaza cont si copiaza API key
3. Adauga in `.env.local`:
```
JUDGE0_URL=https://judge0-ce.p.rapidapi.com
JUDGE0_API_KEY=cheia_ta_rapidapi
```

Planul gratuit permite ~50 submit-uri/zi.

---

## 3. Populare baza de date

```bash
npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
```

---

## 4. Deploy pe Vercel (optional)

1. Creeaza repo GitHub si push
2. Conecteaza la vercel.com
3. Adauga variabilele de mediu din `.env.local`
4. Schimba `DATABASE_URL` la un PostgreSQL (ex: Supabase)
