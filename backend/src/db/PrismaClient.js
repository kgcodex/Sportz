import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

import { DB_URL } from "../env.js";
import { PrismaClient } from "./generated/client.js";

const { Pool } = pg;
const pool = new Pool({ connectionString: DB_URL });

const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });
