import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const publications = pgTable("publications", {
    id: serial("id").primaryKey(),
    year: varchar("year", { length: 4 }).notNull(),
    title: text("title").notNull(),
    authors: text("authors").notNull(),
    journal: varchar("journal", { length: 255 }).notNull(),
    url: varchar("url", { length: 512 }),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow(),
});

export const news = pgTable("news", {
    id: serial("id").primaryKey(),
    date: varchar("date", { length: 100 }).notNull(),
    title: text("title").notNull(),
    body: text("body").notNull(),
    url: varchar("url", { length: 512 }),
    photoUrl: varchar("photo_url", { length: 512 }),
    createdAt: timestamp("created_at").defaultNow(),
});

export const members = pgTable("members", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    role: varchar("role", { length: 255 }).notNull(),
    focus: text("focus").notNull(),
    email: varchar("email", { length: 255 }),
    originCountry: varchar("origin_country", { length: 255 }),
    biography: text("biography"),
    photoUrl: varchar("photo_url", { length: 512 }),
    createdAt: timestamp("created_at").defaultNow(),
});

export const researchAreas = pgTable("research_areas", {
    id: serial("id").primaryKey(),
    photoUrl: varchar("photo_url", { length: 512 }),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const groupActivities = pgTable("group_activities", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    date: varchar("date", { length: 100 }).notNull(),
    description: text("description").notNull(),
    category: varchar("category", { length: 100 }).notNull(),
    emoji: varchar("emoji", { length: 10 }).notNull().default("🎉"),
    photoUrl: varchar("photo_url", { length: 512 }),
    createdAt: timestamp("created_at").defaultNow(),
});

export const images = pgTable("images", {
    id: serial("id").primaryKey(),
    filename: varchar("filename", { length: 255 }).notNull(),
    mimeType: varchar("mime_type", { length: 100 }).notNull(),
    data: text("data").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});
