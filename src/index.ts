import "dotenv/config";
import { createApp } from "./app";

const PORT = process.env.PORT ?? 8080;

const app = createApp();

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
