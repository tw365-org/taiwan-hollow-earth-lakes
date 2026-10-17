# 📋 開發工作日誌 (Development Worklog)

- **專案名稱**：地心水脈：台灣湖泊與鄉鎮 3D 地底地球探索遊戲 (`TERRA-AQUA TAIWAN 3D`)
- **專案路徑**：`D:\ps1\agy\taiwan-hollow-earth-lakes`
- **GitHub 儲存庫**：[https://github.com/tw365-org/taiwan-hollow-earth-lakes](https://github.com/tw365-org/taiwan-hollow-earth-lakes)
- **線上體驗 (GitHub Pages)**：[https://tw365-org.github.io/taiwan-hollow-earth-lakes/](https://tw365-org.github.io/taiwan-hollow-earth-lakes/)
- **協作環境**：Google Antigravity (`agy` CLI) × Google DeepMind **Gemini 4 Argon**
- **紀錄日期**：2026-10-17

---

## 🎯 今日完成重點總覽 (Executive Summary)

1. **需求對齊與架構設計 (`/grill-me`)**
   - 確立以 **「3D 透視空心地球 × 台灣立體地底水脈」** 為核心視覺與玩法。
   - 支援 **五大台灣水域類型**（💧天然湖泊、🏔️高山湖泊、🌊重要水庫、🌱特色埤塘、🐚海岸潟湖），每一座水域皆綁定 **所屬縣市與鄉鎮市區行政轄區**、海拔面積、地質成因與鄉鎮人文物產介紹。
   - 嚴格落實 **「零虛構官方連結」** 原則：所有水域均附帶真實政府機關（經濟部水利署、國家公園、交通部觀光署國家風景區、林業保育署、各縣市政府觀光旅遊網）、維基百科與 Google 衛星地圖座標連結。

2. **3D 空心地球與地底潛艇引擎實作 (`Three.js` + `GSAP` + `Web Audio API`)**
   - [`HollowEarthScene`](file:///D:/ps1/agy/taiwan-hollow-earth-lakes/js/scene/hollowEarthScene.js)：實作 3D 空心地球球體、台灣本島與離島（澎湖、蘭嶼、金門）X-Ray 可調透明度地殼、中央山脈脊樑、垂直地底水脈井、地下連通伏流管線，以及 `Nautilus-TW` 地底探勘潛艇（支援鍵盤 `WASD` / `方向鍵` / `E` / `Q` / `空白鍵聲納浮出` 與 3D 貝茲曲線自動導航）。
   - [`SoundEngine`](file:///D:/ps1/agy/taiwan-hollow-earth-lakes/js/audio/soundEngine.js)：零外部音檔依賴，使用 Web Audio API 即時合成深海地底水脈環境共鳴、3D 聲納脈衝、浮出水面氣泡與問答過關和弦音效。

3. **開放式可擴充水域架構 (`LakeRegistry`)**
   - [`taiwanLakes.js`](file:///D:/ps1/agy/taiwan-hollow-earth-lakes/js/data/taiwanLakes.js) 與 [`custom-lakes.json`](file:///D:/ps1/agy/taiwan-hollow-earth-lakes/data/custom-lakes.json)：內建 36+ 座台灣代表性湖泊/水庫/埤塘/潟湖，並提供遊戲內 **「➕ 擴充水域節點」** 表單與 JSON 匯入/匯出功能，新增後自動於 3D 地球建立垂直水脈井並以 Haversine 距離演算法自動連通鄰近水脈。

4. **三大遊戲模式 (`main.js`)**
   - **🧭 自由巡航圖鑑**：搜尋、依分類與五大區域篩選全台水脈，解鎖潛艇階級（`MK-I` 至 `地心水脈守護神 Ω`）。
   - **🎯 地底領航任務**：根據鄉鎮人文線索與聲納距離雷達尋找目標湖泊。
   - **⚡ 鄉鎮湖泊競答**：四選一連勝挑戰，加深對台灣湖泊所在鄉鎮市區的記憶。

5. **GitHub 開源發布、實機截圖與官方品牌視覺對齊 (`v1.0.0` ➔ `v1.3.0`)**
   - 建立公開儲存庫 `tw365-org/taiwan-hollow-earth-lakes`，配置 Cloudflare Pages ([`wrangler.toml`](file:///D:/ps1/agy/taiwan-hollow-earth-lakes/wrangler.toml)、[`_headers`](file:///D:/ps1/agy/taiwan-hollow-earth-lakes/_headers)) 與 GitHub Pages 線上體驗。
   - 透過 Headless Chrome 自動化腳本擷取 4 張高解析度 WebGL 3D 實機畫面並嵌入 [`README.md`](file:///D:/ps1/agy/taiwan-hollow-earth-lakes/README.md)。
   - 對齊 **[Google Antigravity 官方媒體資源 (`antigravity.google/press`)](https://antigravity.google/press)**：套用官方全彩 A-Wing 向量標誌（[`assets/favicon.svg`](file:///D:/ps1/agy/taiwan-hollow-earth-lakes/assets/favicon.svg) 與頂部 HUD）、官方 `Google Sans Flex` / `Google Sans Code` 字體，以及碳黑底色 (`#121317`) 搭配四色反重力光譜 (`#3186FF` / `#FC413D` / `#00B95C` / `#FFE432`)。

---

## 🕒 版本演進與 Git 提交紀錄 (Commit Timeline)

| 版本 / Commit | 摘要說明 | 關鍵變更檔案 |
| :--- | :--- | :--- |
| **`v1.0.0`** (`8d8d0f5`) | 初版完成：3D 空心地球台灣湖泊鄉鎮探索遊戲、36+ 水域資料庫、可擴充 JSON 架構與 Cloudflare 部署設定 | `index.html`, `css/style.css`, `js/main.js`, `js/data/taiwanLakes.js`, `js/scene/hollowEarthScene.js`, `js/audio/soundEngine.js`, `data/custom-lakes.json`, `wrangler.toml` |
| **`v1.0.1`** (`3fc9487`) | 新增 GitHub Pages 立即體驗按鈕與 4 張 1600×900 實機 3D 遊戲截圖預覽 | `README.md`, `assets/screenshots/*.png` |
| **`v1.1.0`** (`9d24410`) | 補齊瀏覽器分頁圖示 (Favicon)、Apple Touch Icon 與 Open Graph 社群預覽標籤 | `assets/favicon.svg`, `index.html` |
| **`v1.2.0`** (`afba4f5`) | 初階 Gemini 4 Argon × `agy` CLI 藍紫漸層主題、版本號徽章與開發貢獻說明卡 | `index.html`, `css/style.css`, `js/scene/hollowEarthScene.js`, `README.md` |
| **`v1.3.0`** (`b264cd6`) | **正式對齊 `https://antigravity.google/press` 官方媒體資源**：替換官方全彩 A-Wing SVG 標誌、`Google Sans Flex` / `Google Sans Code` 字體、碳黑 `#121317` 與四色反重力光譜 (`#3186FF` / `#FC413D` / `#00B95C` / `#FFE432`)，並更新 4 張實機截圖 | `assets/favicon.svg`, `index.html`, `css/style.css`, `js/scene/hollowEarthScene.js`, `README.md`, `assets/screenshots/*.png` |

---

## 📌 下階段可延伸方向 (Future Backlog)

- [ ] **擴充更多地方埤塘與秘境湖泊**：持續透過 [`data/custom-lakes.json`](file:///D:/ps1/agy/taiwan-hollow-earth-lakes/data/custom-lakes.json) 擴充桃園千塘之鄉、宜蘭湧泉埤塘及花東縱谷濕地湖泊。
- [ ] **地形高程強化**：可考慮結合台灣 DEM 數值高程網格，讓地表山脈起伏更細膩。
- [ ] **排行榜與分享徽章**：新增問答連勝結算圖片匯出功能，方便分享探勘成就。
