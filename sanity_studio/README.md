## Development Workflow

1. **Modify schemas** in `/schemas` directory
2. **Run** `npx sanity graphql deploy`
3. **Update queries** in your Next.js app if needed
4. **Add content** in Sanity Studio (no redeploy needed)
5. **Query from frontend** - data is immediately available

---

### GraphQL Playground
You can explore your API interactively at:
```
https://YOUR_PROJECT_ID.api.sanity.io/v2024-01-01/graphql/YOUR_DATASET/default
```

Open this URL in your browser to test queries and explore the schema.

---
