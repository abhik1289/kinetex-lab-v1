
# Kinetex Lab

## KBC 2026 certificates

Certificate eligibility is managed by administrators from **Admin → Users**.
Mark a registered student eligible only after confirming their participation.
The certificate page matches the submitted name and roll number to the signed-in
KIIT account and the eligibility flag; it does not issue certificates from
registration alone.

To apply the Prisma schema changes to the intended MongoDB database, first
review `DATABASE_URL`, then run:

```sh
npm run prisma:generate
npx prisma db push
```

Students can open **My Certificate** from the KBC navigation, verify their
details, and choose **Save as PDF** in the browser print dialog. Each issued
certificate has a public verification URL and ID. Revoking eligibility
invalidates its verification record.

For local development only, the certificate form accepts the demo participant
Abhik Patra (roll number `2305588`). The demo record and its verification result
are disabled in production.
