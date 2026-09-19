# Todo frontend

Copy these files into a React + Tailwind project (for example, one made with `npm create vite@latest`).

Install the only extra package:

```bash
npm install lucide-react
```

Then replace the files under `src/` with the matching files here. Update `BASE_URL` in `src/api/todos.js` to match your backend.

The API module assumes these endpoints:

| Action | Request |
| --- | --- |
| get all | `GET /todos` |
| add | `POST /todos` |
| update | `PUT /todos/:id` |
| delete | `DELETE /todos/:id` |

It sends `{ title, description, status }`. If your backend really uses the spelling `tittle`, change `title: "title"` to `title: "tittle"` in `FIELD_NAMES`.