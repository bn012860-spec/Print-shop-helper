# Print Shop Helper

## Environment variables

Backend API expects:

- `MONGO_URI`
- `R2_ENDPOINT`
- `R2_ACCESS_KEY`
- `R2_SECRET_KEY`
- `R2_BUCKET`
- `R2_PUBLIC_URL`

Frontend API base URL:

- `REACT_APP_API_URL` (optional; defaults to `/api`)

## Deploy checklist

1. Deploy backend and frontend to Vercel.
2. Add all required environment variables to project settings.
3. Redeploy after env vars are added.

## Testing checklist (run in order)

1. Test service health: `GET /api/health` and confirm it returns `success: true` and `data.status = "ok"`.
2. Test deployed version: `GET /api/version` and confirm commit SHA (or `dev`) is returned.
3. Test API health: `GET /api/generate-upload-url` and confirm it returns `success: true` and `data.uploadUrl`.
4. Test R2 upload with a small PDF using the signed URL.
   - Confirm upload status is HTTP 200.
   - Confirm file is present in the bucket and reachable via `fileUrl`.
5. Test create job only (`POST /api/create-job`) using a dummy `fileUrl` and valid `printType`.
6. Test pending queue fetch (`GET /api/get-jobs?shopId=shop1&limit=10`) and cursor pagination.
7. Test full flow: student upload -> job create -> shop fetch -> mark done.

## CORS prep for R2

Recommended CORS baseline for initial testing:

- Allowed origins: `*`
- Allowed methods: `PUT, GET`
- Allowed headers: `*`

Copy-paste JSON:

```json
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["PUT", "GET"],
    "AllowedHeaders": ["*"]
  }
]
```


## Request IDs

Every API response now includes `requestId` and also sets `x-request-id` response header.
Use this ID to correlate browser errors with backend logs quickly.

## Debug log map

You should see these logs during manual validation:

- `GENERATE URL` in upload URL API
- `CREATE JOB` in create-job API
- `GET JOBS` in get-jobs API
- `UPDATE JOB` in update-job API
- `Upload URL`, `File URL`, `Creating job...` in student page
- `Jobs fetched` in shop page

## Flow summary

- Student app uploads PDF directly to R2 using signed URL.
- Student app sends metadata to backend (`create-job`).
- Shop app reads pending jobs from backend (`get-jobs`).
- Shop app marks jobs as printed (`update-job`).

## Stable checkpoint workflow

Before starting live validation, create a recoverable milestone:

```bash
git tag v0.1-foundation-ready
# or
git checkout -b testing-phase
```

Recommended next milestones:

1. First successful end-to-end flow (upload -> create -> fetch -> done)
2. UX cleanup (forms, queue presentation, error messages)
3. Real pilot with one print shop

## Validation gate (do this before new features)

Do **not** start auth/payments/multi-shop work until this sequence is green:

1. `/api/version`
2. `/api/health`
3. `/api/generate-upload-url` + successful R2 PUT upload
4. `/api/create-job`
5. `/api/get-jobs`
6. `/api/update-job`

If any step fails, use `requestId` from response headers/body to trace logs.

## Resume testing phases (recommended)

When resuming, validate in this order to reduce debugging scope:

### Phase A — Backend validation
1. `GET /api/version`
2. `GET /api/health`
3. `GET /api/generate-upload-url`

### Phase B — Storage validation
1. Upload a small PDF directly with the signed URL
2. Confirm object exists and `fileUrl` is reachable

### Phase C — Database validation
1. `POST /api/create-job`
2. `GET /api/get-jobs?shopId=shop1`

### Phase D — UI validation
1. Run student flow in `StudentUpload`
2. Run shop queue flow in `ShopQueue`
3. Mark job done and verify it disappears
