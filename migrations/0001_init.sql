CREATE TABLE IF NOT EXISTS consult_submissions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  purpose TEXT NOT NULL,
  area TEXT NOT NULL,
  apartment TEXT,
  channels TEXT DEFAULT '[]',
  model TEXT,
  submitted_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new'
);

CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS slides (
  id INTEGER PRIMARY KEY,
  image TEXT,
  subtitle TEXT,
  title TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS managers (
  id TEXT PRIMARY KEY,
  img TEXT,
  name TEXT NOT NULL,
  store TEXT NOT NULL DEFAULT '용산전자상가점',
  tags TEXT DEFAULT '[]',
  desc TEXT,
  href TEXT DEFAULT '#',
  sort_order INTEGER NOT NULL DEFAULT 0
);
