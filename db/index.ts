import { createDatabase } from "@netlify/database";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema.js";

const client = createDatabase();
export const db = drizzle(client, { schema });
