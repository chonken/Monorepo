-- 組件資料表
CREATE TABLE IF NOT EXISTS components (
  id TEXT PRIMARY KEY,
  keywords TEXT,
  categories TEXT,
  binding TEXT
);
-- 組件屬性展示
CREATE TABLE IF NOT EXISTS demos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  component_id TEXT,
  name TEXT,
  category TEXT,
  example TEXT,
  contents TEXT,
  styles TEXT,
  description TEXT,
  FOREIGN KEY (component_id) REFERENCES components(id)
);
-- categories
CREATE TABLE IF NOT EXISTS image_txt (
  id INTEGER PRIMARY KEY,
  header_id INTEGER,
  image_id INTEGER,
  FOREIGN KEY (header_id) REFERENCES unit_text(id),
  FOREIGN KEY (image_id) REFERENCES unit_image(id)
);
CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY);
CREATE TABLE IF NOT EXISTS button (
  id INTEGER PRIMARY KEY,
  text_id INTEGER,
  icon_id INTEGER,
  hover_id INTEGER,
  FOREIGN KEY (text_id) REFERENCES unit_text(id),
  FOREIGN KEY (icon_id) REFERENCES unit_icon(id),
  FOREIGN KEY (hover_id) REFERENCES unit_hover(id)
);
CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, data TEXT);
CREATE TABLE IF NOT EXISTS item_image (
  id INTEGER PRIMARY KEY,
  image_id INTEGER,
  FOREIGN KEY (image_id) REFERENCES unit_image(id)
);
CREATE TABLE IF NOT EXISTS title (
  id INTEGER PRIMARY KEY,
  header_id INTEGER,
  FOREIGN KEY (header_id) REFERENCES unit_header(id)
);
CREATE TABLE IF NOT EXISTS list (id INTEGER PRIMARY KEY);
-- 通用中介資料表
CREATE TABLE IF NOT EXISTS text_link (
  text_id INTEGER,
  owner_id INTEGER,
  owner_type TEXT,
  PRIMARY KEY (text_id, owner_id),
  FOREIGN KEY (text_id) REFERENCES unit_text(id)
);
CREATE TABLE IF NOT EXISTS article_link (
  article_id INTEGER,
  owner_id INTEGER,
  owner_type TEXT,
  PRIMARY KEY (article_id, owner_id),
  FOREIGN KEY (article_id) REFERENCES unit_article(id)
);
CREATE TABLE IF NOT EXISTS list_item_link (
  list_item_id INTEGER,
  owner_id INTEGER,
  owner_type TEXT,
  PRIMARY KEY (list_item_id, owner_id),
  FOREIGN KEY (list_item_id) REFERENCES unit_list_item(id)
);
-- 內容單元
CREATE TABLE IF NOT EXISTS unit_title (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT
);
CREATE TABLE IF NOT EXISTS unit_text (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT
);
CREATE TABLE IF NOT EXISTS unit_image (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  image TEXT
);
CREATE TABLE IF NOT EXISTS unit_icon (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  icon TEXT
);
CREATE TABLE IF NOT EXISTS unit_hover (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  hover TEXT
);
CREATE TABLE IF NOT EXISTS unit_header (
  id INTEGER PRIMARY KEY,
  title_id INTEGER,
  subtitle TEXT,
  FOREIGN KEY (title_id) REFERENCES unit_title(id)
);
CREATE TABLE IF NOT EXISTS unit_article (
  id INTEGER PRIMARY KEY,
  header_id INTEGER,
  FOREIGN KEY (header_id) REFERENCES unit_header(id)
);
CREATE TABLE IF NOT EXISTS unit_list_item (
  id INTEGER PRIMARY KEY,
  marker TEXT,
  article_id INTEGER,
  sort_order INTEGER,
  FOREIGN KEY (article_id) REFERENCES unit_article(id)
);
-- 設定檔
CREATE TABLE IF NOT EXISTS config (key TEXT PRIMARY KEY, value TEXT);