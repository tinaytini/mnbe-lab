import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function main() {
    console.log("Dropping icon column and adding photo_url column to research_areas...");
    
    // Add photo_url column
    try {
        await sql`ALTER TABLE "research_areas" ADD COLUMN "photo_url" varchar(512);`;
        console.log("Added photo_url column.");
    } catch (e: any) {
        console.log("Error adding photo_url:", e.message);
    }

    // Drop icon column
    try {
        await sql`ALTER TABLE "research_areas" DROP COLUMN "icon";`;
        console.log("Dropped icon column.");
    } catch (e: any) {
        console.log("Error dropping icon:", e.message);
    }
    
    console.log("Migration finished.");
}

main().catch(console.error);
