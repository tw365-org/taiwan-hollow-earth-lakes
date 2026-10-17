import confetti from 'canvas-confetti';
import {
  LAKE_CATEGORIES,
  SUBMARINE_TIERS,
  LakeRegistry
} from './data/taiwanLakes.js';
import { SoundEngine } from './audio/soundEngine.js';
import { HollowEarthScene, worldToLatLng } from './scene/hollowEarthScene.js';

const SAVE_STORAGE_KEY = 'taiwan_hollow_earth_save_v1';

class TerraAquaGame {
  constructor() {
    this.registry = new LakeRegistry();
    this.sound = new SoundEngine();

    // 遊戲進度存檔
    this.progress = this.loadProgress();
    this.mode = 'explore'; // 'explore' | 'mission' | 'quiz'

    // 篩選條件
    this.filterCategory = 'all';
    this.filterRegion = 'all';
    this.searchQuery = '';

    // 當前選中湖泊與任務狀態
    this.currentLake = null;
    this.missionTargetLake = null;
    this.missionCount = 1;
    this.quizCurrentLake = null;
    this.quizStreak = 0;

    this.init();
  }

  loadProgress() {
    try {
      const raw = localStorage.getItem(SAVE_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          unlockedIds: new Set(parsed.unlockedIds || ['sun-moon-lake']),
          purifiedIds: new Set(parsed.purifiedIds || []),
          score: Number(parsed.score) || 100
        };
      }
    } catch (e) {
      console.warn('Load progress error:', e);
    }
    return {
      unlockedIds: new Set(['sun-moon-lake']),
      purifiedIds: new Set(),
      score: 100
    };
  }

  saveProgress() {
    try {
      localStorage.setItem(
        SAVE_STORAGE_KEY,
        JSON.stringify({
          unlockedIds: Array.from(this.progress.unlockedIds),
          purifiedIds: Array.from(this.progress.purifiedIds),
          score: this.progress.score
        })
      );
    } catch (e) {
      console.warn('Save progress error:', e);
    }
  }

  async init() {
    // 載入外部可擴充 JSON 資料包 (./data/custom-lakes.json)
    await this.registry.loadExternalJsonPack('./data/custom-lakes.json');
    this.allLakes = this.registry.getAllLakes();

    // 初始化 3D 空心地球場景
    const container = document.getElementById('canvas-container');
    this.scene3D = new HollowEarthScene(container, {
      onLakeClick: lake => this.handleLakeNodeClick(lake),
      onLakeHover: (lake, x, y) => this.handleLakeNodeHover(lake, x, y),
      onLakeSurfaced: (lake, distKm) => this.handleSubmarineSurfaced(lake, distKm)
    });

    this.refreshSceneAndUI();
    this.bindUIEvents();
    this.bindKeyboardControls();

    // 預設導航聚焦於台灣地理中心旁的「日月潭 (南投縣魚池鄉)」
    const defaultLake = this.allLakes.find(l => l.id === 'sun-moon-lake') || this.allLakes[0];
    if (defaultLake) {
      this.scene3D.autopilotToLake(defaultLake.id, false);
    }

    this.showToast('🛸 歡迎登艦！按 W/A/S/D 巡航地底水脈，或點擊任一鄉鎮湖泊自動潛行');
    this.startGameLoop();
  }

  refreshSceneAndUI() {
    this.allLakes = this.registry.getAllLakes();
    const links = this.registry.getAquiferLinks();
    this.scene3D.rebuildLakeNodes(
      this.allLakes,
      links,
      this.progress.unlockedIds,
      this.progress.purifiedIds
    );
    this.updateTopStats();
    this.renderSidebarLakeList();
  }

  updateTopStats() {
    const unlockedCount = this.progress.unlockedIds.size;
    const totalCount = this.allLakes.length;
    document.getElementById('stat-unlocked').textContent = `${unlockedCount} / ${totalCount}`;
    document.getElementById('stat-score').textContent = `${this.progress.score} XP`;

    // 計算潛艇升級階級
    let currentTier = SUBMARINE_TIERS[0];
    for (const t of SUBMARINE_TIERS) {
      if (unlockedCount >= t.minLakes) {
        currentTier = t;
      }
    }
    document.getElementById('sub-tier-icon').textContent = currentTier.badge;
    const titleEl = document.getElementById('sub-tier-title');
    titleEl.textContent = currentTier.title;
    titleEl.style.color = currentTier.color;
  }

  getFilteredLakes() {
    const q = this.searchQuery.trim().toLowerCase();
    return this.allLakes.filter(lake => {
      if (this.filterCategory !== 'all' && lake.category !== this.filterCategory) {
        return false;
      }
      if (this.filterRegion !== 'all' && lake.region !== this.filterRegion) {
        return false;
      }
      if (q) {
        const hay = `${lake.name} ${lake.englishName} ${lake.city} ${lake.township} ${LAKE_CATEGORIES[lake.category]?.label || ''}`.toLowerCase();
        return hay.includes(q);
      }
      return true;
    });
  }

  renderSidebarLakeList() {
    const listEl = document.getElementById('lake-list');
    const filtered = this.getFilteredLakes();
    document.getElementById('filtered-count-label').textContent = `${filtered.length} 座`;

    listEl.innerHTML = '';

    for (const lake of filtered) {
      const cat = LAKE_CATEGORIES[lake.category] || LAKE_CATEGORIES.natural;
      const isUnlocked = this.progress.unlockedIds.has(lake.id);
      const isPurified = this.progress.purifiedIds.has(lake.id);
      const isActive = this.currentLake && this.currentLake.id === lake.id;

      const item = document.createElement('div');
      item.className = `lake-item ${isActive ? 'active' : ''}`;
      item.setAttribute('role', 'listitem');

      const statusIcon = isPurified ? '✨' : isUnlocked ? '🔓' : '📡';
      const customBadge = lake.isCustom ? '<span class="township-chip" style="color:#34d399;">擴充</span>' : '';

      item.innerHTML = `
        <div class="lake-item-left">
          <span class="cat-dot" style="background:${cat.color}; box-shadow: 0 0 8px ${cat.color};"></span>
          <div>
            <div class="lake-item-title">
              <span>${lake.name}</span>
              ${customBadge}
            </div>
            <div class="lake-item-sub">
              <span class="township-chip">${lake.city}・${lake.township}</span>
              <span>${cat.label}</span>
            </div>
          </div>
        </div>
        <div class="lake-item-right">
          <span class="unlock-indicator" title="${isPurified ? '已完成水脈共鳴' : isUnlocked ? '已探勘解鎖' : '待探勘'}">${statusIcon}</span>
          <span class="elev-tag">${lake.elevation}m</span>
        </div>
      `;

      item.addEventListener('click', () => {
        this.sound.playClick(780);
        this.handleLakeNodeClick(lake);
      });

      listEl.appendChild(item);
    }
  }

  /**
   * 點擊 3D 節點或清單項目：自動駕駛潛艇前往該湖泊並開啟介紹抽屜
   */
  handleLakeNodeClick(lake) {
    this.currentLake = lake;
    this.sound.playSonarPing(980);

    this.scene3D.autopilotToLake(lake.id, true, arrivedLake => {
      this.unlockLake(arrivedLake, true);
    });
  }

  handleLakeNodeHover(lake, clientX, clientY) {
    const tooltip = document.getElementById('node-tooltip');
    if (!lake) {
      tooltip.classList.add('hidden');
      return;
    }
    const cat = LAKE_CATEGORIES[lake.category] || LAKE_CATEGORIES.natural;
    tooltip.innerHTML = `
      <div style="color:${cat.color}; font-weight:800;">${lake.name} (${cat.label})</div>
      <div style="color:#f8fafc; font-size:11.5px;">📍 ${lake.city} <strong>${lake.township}</strong> | 海拔 ${lake.elevation}m</div>
    `;
    tooltip.style.left = `${clientX}px`;
    tooltip.style.top = `${clientY}px`;
    tooltip.classList.remove('hidden');
  }

  /**
   * 當潛艇浮出某座湖泊水面時觸發
   */
  handleSubmarineSurfaced(lake, distKm) {
    this.sound.playSurfaceChime();
    this.unlockLake(lake, true);

    // 若處於「地底領航任務」模式，檢查是否抵達正確目標湖泊
    if (this.mode === 'mission' && this.missionTargetLake) {
      if (lake.id === this.missionTargetLake.id) {
        this.completeMissionSuccess(lake);
      } else {
        this.showToast(`📡 這裡是「${lake.city}${lake.township}・${lake.name}」，並非任務目標，請參考聲納提示繼續搜寻！`);
      }
    }
  }

  unlockLake(lake, openDrawer = true) {
    const wasUnlocked = this.progress.unlockedIds.has(lake.id);
    if (!wasUnlocked) {
      this.progress.unlockedIds.add(lake.id);
      this.progress.score += 50;
      this.saveProgress();
      this.scene3D.updateLakeVisualState(this.progress.unlockedIds, this.progress.purifiedIds);
      this.updateTopStats();
      this.showToast(`🎉 新水域解鎖：【${lake.city}${lake.township}】${lake.name} (+50 XP)`);
    }

    this.currentLake = lake;
    this.renderSidebarLakeList();
    if (openDrawer) {
      this.openLakeDetailDrawer(lake);
    }
  }

  /**
   * 開啟右側湖泊與鄉鎮詳細介紹資訊卡（含真實官方介紹連結）
   */
  openLakeDetailDrawer(lake) {
    const drawer = document.getElementById('lake-detail-drawer');
    const cat = LAKE_CATEGORIES[lake.category] || LAKE_CATEGORIES.natural;
    const isPurified = this.progress.purifiedIds.has(lake.id);

    const catTag = document.getElementById('drawer-category-tag');
    catTag.textContent = cat.label;
    catTag.style.borderColor = cat.color;
    catTag.style.color = cat.color;

    const statusTag = document.getElementById('drawer-status-tag');
    statusTag.textContent = isPurified ? '✨ 水脈已共鳴淨化' : '🔓 已探勘解鎖';

    document.getElementById('drawer-lake-name').textContent = lake.name;
    document.getElementById('drawer-lake-en').textContent = lake.englishName || '';
    document.getElementById('drawer-city').textContent = lake.city;
    document.getElementById('drawer-township').textContent = lake.township;
    document.getElementById('drawer-coords').textContent =
      `${lake.lat.toFixed(4)}°N, ${lake.lng.toFixed(4)}°E | 地底水脈深 -${lake.aquiferDepth} km`;

    document.getElementById('drawer-elevation').textContent = `${lake.elevation} m`;
    document.getElementById('drawer-area').textContent = lake.area;
    document.getElementById('drawer-depth').textContent = lake.depth;

    document.getElementById('drawer-township-intro').textContent = lake.townshipIntro;
    document.getElementById('drawer-geology').textContent = lake.geology;
    document.getElementById('drawer-funfact').textContent = lake.funFact;

    // 渲染官方權威連結清單
    const linksContainer = document.getElementById('drawer-official-links');
    linksContainer.innerHTML = '';
    const links = Array.isArray(lake.officialLinks) ? lake.officialLinks : [];
    links.forEach(linkObj => {
      const a = document.createElement('a');
      a.className = 'official-link-item';
      a.href = linkObj.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.innerHTML = `
        <span>🔗 ${linkObj.title}</span>
        <span>↗</span>
      `;
      linksContainer.appendChild(a);
    });

    // 水脈共鳴問答按鈕
    const quizBtn = document.getElementById('btn-drawer-quiz');
    if (isPurified) {
      quizBtn.textContent = '✨ 已完成此鄉鎮水脈共鳴（再次挑戰問答）';
    } else {
      quizBtn.textContent = `⚡ 啟動「${lake.township}水脈共鳴問答」淨化節點 (+150 XP)`;
    }

    // 自訂擴充節點刪除按鈕
    const deleteBtn = document.getElementById('btn-delete-custom-lake');
    if (lake.isCustom && String(lake.id).startsWith('custom-')) {
      deleteBtn.classList.remove('hidden');
      deleteBtn.onclick = () => {
        this.registry.removeCustomLake(lake.id);
        drawer.classList.add('hidden');
        this.refreshSceneAndUI();
        this.showToast(`🗑️ 已移除自訂水域節點「${lake.name}」`);
      };
    } else {
      deleteBtn.classList.add('hidden');
    }

    drawer.classList.remove('hidden');
  }

  // ==================== 模式二：地底領航任務 (Navigator Mission) ====================
  startNewMission() {
    // 優先挑選尚未淨化或隨機的湖泊
    const candidates = this.allLakes.filter(l => !this.progress.purifiedIds.has(l.id));
    const pool = candidates.length > 0 ? candidates : this.allLakes;
    const target = pool[Math.floor(Math.random() * pool.length)];
    this.missionTargetLake = target;

    const cat = LAKE_CATEGORIES[target.category] || LAKE_CATEGORIES.natural;
    document.getElementById('mission-step-badge').textContent = `🎯 地底領航任務 #${this.missionCount}`;
    document.getElementById('mission-clue-text').innerHTML =
      `【總部水脈指令】請駕駛潛艇前往位於 <strong style="color:#fbbf24;">${target.city}・${target.township}</strong>（海拔約 ${target.elevation} 公尺）的一座<strong>${cat.label}</strong>。<br/>` +
      `<span style="color:#94a3b8; font-size:12.5px;">💡 鄉鎮與水脈線索：${target.townshipIntro.replace(/【.*?】/, '')}</span>`;

    document.getElementById('mission-banner').classList.remove('hidden');
    this.sound.playSonarPing(880);
  }

  completeMissionSuccess(lake) {
    this.sound.playSuccess();
    this.progress.score += 250;
    this.progress.purifiedIds.add(lake.id);
    this.saveProgress();
    this.scene3D.updateLakeVisualState(this.progress.unlockedIds, this.progress.purifiedIds);
    this.updateTopStats();
    this.renderSidebarLakeList();

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    this.missionCount++;
    this.showToast(`🏆 領航任務達成！成功抵達【${lake.city}${lake.township}・${lake.name}】(+250 XP)`);
    setTimeout(() => {
      if (this.mode === 'mission') {
        this.startNewMission();
      }
    }, 2800);
  }

  // ==================== 模式三：鄉鎮湖泊競答 (Township Quiz) ====================
  openQuizForLake(lake, isStreakMode = false) {
    this.quizCurrentLake = lake;
    const modal = document.getElementById('quiz-modal');
    const feedback = document.getElementById('quiz-feedback');
    feedback.classList.add('hidden');

    document.getElementById('quiz-mode-pill').textContent = isStreakMode
      ? 'TOWNSHIP STREAK CHALLENGE // 全台鄉鎮湖泊連勝賽'
      : `AQUIFER RESONANCE // ${lake.city}${lake.township} 水脈共鳴挑戰`;
    document.getElementById('quiz-title').textContent = isStreakMode
      ? '台灣湖泊、水庫、埤塘與潟湖鄉鎮大競答'
      : `${lake.name}（${lake.city}${lake.township}）知識驗證`;
    document.getElementById('quiz-streak-badge').textContent = `🔥 連勝 ${this.quizStreak}`;

    const quizData = lake.quiz;
    document.getElementById('quiz-question-text').textContent = quizData.question;

    // 隨機打亂選項順序，同時記錄正確答案索引
    const indexedOptions = quizData.options.map((text, idx) => ({
      text,
      isCorrect: idx === quizData.answerIndex
    }));
    for (let i = indexedOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indexedOptions[i], indexedOptions[j]] = [indexedOptions[j], indexedOptions[i]];
    }

    const optsContainer = document.getElementById('quiz-options-container');
    optsContainer.innerHTML = '';

    indexedOptions.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.textContent = `${['A', 'B', 'C', 'D'][i]}. ${opt.text}`;
      btn.addEventListener('click', () => {
        this.handleQuizAnswer(btn, opt.isCorrect, indexedOptions, optsContainer, lake);
      });
      optsContainer.appendChild(btn);
    });

    modal.classList.remove('hidden');
  }

  handleQuizAnswer(clickedBtn, isCorrect, indexedOptions, optsContainer, lake) {
    const buttons = Array.from(optsContainer.querySelectorAll('.quiz-option-btn'));
    buttons.forEach((b, idx) => {
      b.disabled = true;
      if (indexedOptions[idx].isCorrect) {
        b.classList.add('correct');
      }
    });

    const feedback = document.getElementById('quiz-feedback');
    const statusEl = document.getElementById('quiz-feedback-status');
    const expEl = document.getElementById('quiz-feedback-explanation');

    if (isCorrect) {
      this.sound.playSuccess();
      this.quizStreak++;
      const xpGain = 150 + Math.min(150, this.quizStreak * 20);
      this.progress.score += xpGain;
      this.progress.unlockedIds.add(lake.id);
      this.progress.purifiedIds.add(lake.id);
      this.saveProgress();
      this.scene3D.updateLakeVisualState(this.progress.unlockedIds, this.progress.purifiedIds);
      this.updateTopStats();
      this.renderSidebarLakeList();

      statusEl.textContent = `✅ 答對了！水脈共鳴成功 (+${xpGain} XP)`;
      statusEl.style.color = '#34d399';

      confetti({
        particleCount: 55,
        spread: 60,
        origin: { y: 0.65 }
      });
    } else {
      clickedBtn.classList.add('wrong');
      this.sound.playError();
      this.quizStreak = 0;
      statusEl.textContent = `❌ 答錯了！正確行政區為：【${lake.city}${lake.township}】`;
      statusEl.style.color = '#fb7185';
    }

    document.getElementById('quiz-streak-badge').textContent = `🔥 連勝 ${this.quizStreak}`;
    expEl.textContent = `${lake.quiz.explanation}（所屬行政區：${lake.city}${lake.township}）`;
    feedback.classList.remove('hidden');
  }

  // ==================== 全台湖泊與鄉鎮百科總覽 (Atlas Modal) ====================
  openAtlasModal() {
    const tbody = document.getElementById('atlas-tbody');
    tbody.innerHTML = '';

    for (const lake of this.allLakes) {
      const cat = LAKE_CATEGORIES[lake.category] || LAKE_CATEGORIES.natural;
      const isPurified = this.progress.purifiedIds.has(lake.id);
      const isUnlocked = this.progress.unlockedIds.has(lake.id);
      const primaryLink = lake.officialLinks && lake.officialLinks[0];

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${isPurified ? '✨ 已共鳴' : isUnlocked ? '🔓 已探勘' : '📡 未探勘'}</td>
        <td style="font-weight:800; color:#fff;">${lake.name}</td>
        <td><span style="color:${cat.color}; font-weight:700;">${cat.label}</span></td>
        <td>${lake.city}</td>
        <td><span class="township-chip">${lake.township}</span></td>
        <td class="mono">${lake.elevation}m / ${lake.area}</td>
        <td>
          ${
            primaryLink
              ? `<a href="${primaryLink.url}" target="_blank" rel="noopener noreferrer" style="color:#38bdf8; text-decoration:none; font-weight:600;">🔗 ${primaryLink.title} ↗</a>`
              : '-'
          }
        </td>
        <td>
          <button class="hud-btn small accent-cyan atlas-dive-btn" data-id="${lake.id}">潛行前往</button>
        </td>
      `;
      tbody.appendChild(tr);
    }

    tbody.querySelectorAll('.atlas-dive-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = this.allLakes.find(l => l.id === btn.dataset.id);
        document.getElementById('atlas-modal').classList.add('hidden');
        if (target) this.handleLakeNodeClick(target);
      });
    });

    document.getElementById('atlas-modal').classList.remove('hidden');
  }

  // ==================== UI 事件綁定 ====================
  bindUIEvents() {
    // 1. 遊戲模式切換
    document.querySelectorAll('.mode-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        this.sound.playClick();
        document.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const newMode = tab.dataset.mode;
        this.mode = newMode;

        const missionBanner = document.getElementById('mission-banner');
        const quizModal = document.getElementById('quiz-modal');

        if (newMode === 'explore') {
          missionBanner.classList.add('hidden');
          quizModal.classList.add('hidden');
        } else if (newMode === 'mission') {
          quizModal.classList.add('hidden');
          this.startNewMission();
        } else if (newMode === 'quiz') {
          missionBanner.classList.add('hidden');
          const randomLake = this.allLakes[Math.floor(Math.random() * this.allLakes.length)];
          this.openQuizForLake(randomLake, true);
        }
      });
    });

    // 2. 側邊欄收合與篩選
    const sidebar = document.getElementById('sidebar-panel');
    const collapseBtn = document.getElementById('btn-collapse-sidebar');
    collapseBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      collapseBtn.textContent = sidebar.classList.contains('collapsed') ? '▶' : '◀';
    });

    document.getElementById('search-lake-input').addEventListener('input', e => {
      this.searchQuery = e.target.value;
      this.renderSidebarLakeList();
    });

    document.querySelectorAll('.cat-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        this.sound.playClick(680);
        document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.filterCategory = pill.dataset.category;
        this.renderSidebarLakeList();
      });
    });

    document.getElementById('region-select').addEventListener('change', e => {
      this.filterRegion = e.target.value;
      this.renderSidebarLakeList();
    });

    // 3. 右側資訊抽屜按鈕
    document.getElementById('btn-close-drawer').addEventListener('click', () => {
      document.getElementById('lake-detail-drawer').classList.add('hidden');
    });

    document.getElementById('btn-drawer-quiz').addEventListener('click', () => {
      if (this.currentLake) {
        this.openQuizForLake(this.currentLake, false);
      }
    });

    // 4. 問答視窗按鈕
    document.getElementById('btn-close-quiz').addEventListener('click', () => {
      document.getElementById('quiz-modal').classList.add('hidden');
    });

    document.getElementById('btn-quiz-flyto').addEventListener('click', () => {
      document.getElementById('quiz-modal').classList.add('hidden');
      if (this.quizCurrentLake) {
        this.handleLakeNodeClick(this.quizCurrentLake);
      }
    });

    document.getElementById('btn-quiz-next').addEventListener('click', () => {
      const nextLake = this.allLakes[Math.floor(Math.random() * this.allLakes.length)];
      this.openQuizForLake(nextLake, true);
    });

    // 5. 領航任務按鈕
    document.getElementById('btn-mission-ping').addEventListener('click', () => {
      if (!this.missionTargetLake) return;
      this.sound.playSonarPing(1180);
      const node = this.scene3D.lakeNodeMap.get(this.missionTargetLake.id);
      if (node) {
        this.scene3D.emitSonarWave(node.surfacePos, 0xfbbf24);
        this.showToast(`📡 目標聲納脈衝已於【${this.missionTargetLake.city}${this.missionTargetLake.township}】方向閃爍！`);
      }
    });

    document.getElementById('btn-mission-autopilot').addEventListener('click', () => {
      if (!this.missionTargetLake) return;
      this.handleLakeNodeClick(this.missionTargetLake);
    });

    document.getElementById('btn-mission-skip').addEventListener('click', () => {
      this.startNewMission();
    });

    // 6. 擴充水域節點管理員 (Extensible Lake / Reservoir / Pond / Lagoon Modal)
    document.getElementById('btn-open-extender').addEventListener('click', () => {
      this.sound.playClick();
      document.getElementById('extender-modal').classList.remove('hidden');
    });

    document.getElementById('btn-close-extender').addEventListener('click', () => {
      document.getElementById('extender-modal').classList.add('hidden');
    });

    document.getElementById('custom-lake-form').addEventListener('submit', e => {
      e.preventDefault();
      const newLake = this.registry.addCustomLake({
        name: document.getElementById('ext-name').value,
        englishName: document.getElementById('ext-en').value,
        category: document.getElementById('ext-category').value,
        city: document.getElementById('ext-city').value,
        township: document.getElementById('ext-township').value,
        region: document.getElementById('ext-region').value,
        lat: parseFloat(document.getElementById('ext-lat').value),
        lng: parseFloat(document.getElementById('ext-lng').value),
        elevation: parseInt(document.getElementById('ext-elevation').value, 10) || 50,
        area: document.getElementById('ext-area').value || '自訂面積',
        officialUrl: document.getElementById('ext-official-url').value,
        geology: document.getElementById('ext-geology').value,
        townshipIntro: document.getElementById('ext-township-intro').value
      });

      document.getElementById('extender-modal').classList.add('hidden');
      e.target.reset();

      this.refreshSceneAndUI();
      this.sound.playSuccess();
      this.showToast(`✨ 成功擴充「${newLake.city}${newLake.township}・${newLake.name}」並連通地底水脈！`);
      this.handleLakeNodeClick(newLake);
    });

    // 匯出 JSON
    document.getElementById('btn-export-json').addEventListener('click', () => {
      const jsonStr = this.registry.exportCustomLakesJson();
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `taiwan-custom-lakes-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      this.showToast('⬇️ 已匯出擴充水域 JSON 資料包！');
    });

    // 匯入 JSON
    document.getElementById('input-import-json').addEventListener('change', async e => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        const count = this.registry.importCustomLakesJson(text);
        this.refreshSceneAndUI();
        this.sound.playSuccess();
        this.showToast(`⬆️ 成功匯入 ${count} 座擴充水域節點！`);
        document.getElementById('extender-modal').classList.add('hidden');
      } catch (err) {
        this.sound.playError();
        this.showToast(`❌ 匯入失敗：${err.message}`);
      }
      e.target.value = '';
    });

    // 7. 鄉鎮圖鑑百科與說明視窗
    document.getElementById('btn-open-atlas').addEventListener('click', () => {
      this.sound.playClick();
      this.openAtlasModal();
    });
    document.getElementById('btn-close-atlas').addEventListener('click', () => {
      document.getElementById('atlas-modal').classList.add('hidden');
    });

    document.getElementById('btn-open-help').addEventListener('click', () => {
      this.sound.playClick();
      document.getElementById('help-modal').classList.remove('hidden');
    });
    document.getElementById('btn-argon-badge')?.addEventListener('click', () => {
      this.sound.playClick();
      document.getElementById('help-modal').classList.remove('hidden');
    });
    document.getElementById('btn-close-help').addEventListener('click', () => {
      document.getElementById('help-modal').classList.add('hidden');
    });

    // 8. 音效切換
    document.getElementById('btn-toggle-audio').addEventListener('click', () => {
      const enabled = this.sound.toggleAudio();
      document.getElementById('audio-icon').textContent = enabled ? '🔊' : '🔇';
      this.showToast(enabled ? '🔊 深海聲納與水脈環境音效已開啟' : '🔇 音效已靜音');
    });

    // 9. 底部駕駛艙視角與透視度控制
    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.sound.playClick();
        document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.scene3D.setCameraPreset(btn.dataset.cam);
      });
    });

    document.getElementById('crust-opacity-slider').addEventListener('input', e => {
      this.scene3D.setCrustOpacity(parseFloat(e.target.value));
    });

    document.getElementById('btn-sonar-surface').addEventListener('click', () => {
      this.triggerSonarSurfaceAction();
    });

    // 螢幕虛擬方向鍵支援滑鼠與觸控長按
    document.querySelectorAll('.ctrl-key').forEach(btn => {
      const keyName = btn.dataset.key;
      const startHold = e => {
        e.preventDefault();
        this.scene3D.keys[keyName] = true;
        btn.classList.add('active');
      };
      const endHold = e => {
        e.preventDefault();
        this.scene3D.keys[keyName] = false;
        btn.classList.remove('active');
      };
      btn.addEventListener('pointerdown', startHold);
      btn.addEventListener('pointerup', endHold);
      btn.addEventListener('pointerleave', endHold);
    });
  }

  triggerSonarSurfaceAction() {
    this.sound.playSonarPing(1046.5);
    const res = this.scene3D.toggleSurfaceOrDive();
    if (res && res.action === 'surface') {
      this.showToast(`🛸 聲納鎖定【${res.lake.city}${res.lake.township}・${res.lake.name}】，正在浮出水面...`);
    } else if (res && res.action === 'dive') {
      this.showToast('🌊 潛艇已下潛返回深層地底水脈層');
    }
  }

  bindKeyboardControls() {
    const keyMap = {
      KeyW: 'forward',
      ArrowUp: 'forward',
      KeyS: 'backward',
      ArrowDown: 'backward',
      KeyA: 'left',
      ArrowLeft: 'left',
      KeyD: 'right',
      ArrowRight: 'right',
      KeyE: 'up',
      KeyQ: 'down',
      ShiftLeft: 'boost',
      ShiftRight: 'boost'
    };

    window.addEventListener('keydown', e => {
      // 當游標在輸入框內時不攔截鍵盤
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        this.triggerSonarSurfaceAction();
        return;
      }

      const action = keyMap[e.code];
      if (action) {
        this.scene3D.keys[action] = true;
        const btn = document.querySelector(`.ctrl-key[data-key="${action}"]`);
        if (btn) btn.classList.add('active');
      }
    });

    window.addEventListener('keyup', e => {
      const action = keyMap[e.code];
      if (action) {
        this.scene3D.keys[action] = false;
        const btn = document.querySelector(`.ctrl-key[data-key="${action}"]`);
        if (btn) btn.classList.remove('active');
      }
    });
  }

  showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 320);
    }, 3400);
  }

  /**
   * 主遊戲迴圈：更新 3D 場景與即時潛艇儀表板數據
   */
  startGameLoop() {
    const tick = () => {
      requestAnimationFrame(tick);
      this.scene3D.update();
      this.updateCockpitTelemetry();
    };
    requestAnimationFrame(tick);
  }

  updateCockpitTelemetry() {
    const pos = this.scene3D.subState.position;
    const { lat, lng } = worldToLatLng(pos);

    document.getElementById('tel-coords').textContent = `${lat.toFixed(2)}°N, ${lng.toFixed(2)}°E`;

    const depthEl = document.getElementById('tel-depth');
    if (pos.y >= 0) {
      depthEl.textContent = `浮出地表 +${Math.round(pos.y * 450)} m`;
      depthEl.style.color = '#34d399';
    } else {
      depthEl.textContent = `${pos.y.toFixed(1)} km 地底水脈層`;
      depthEl.style.color = '#00f2fe';
    }

    const nearest = this.scene3D.getNearestLake();
    if (nearest) {
      document.getElementById('tel-nearest').textContent =
        `${nearest.lake.city}${nearest.lake.township}・${nearest.lake.name} (${nearest.distanceKm} km)`;
    }

    // 若在領航任務模式，更新任務目標聲納距離
    if (this.mode === 'mission' && this.missionTargetLake) {
      const targetNode = this.scene3D.lakeNodeMap.get(this.missionTargetLake.id);
      if (targetNode) {
        const dx = pos.x - targetNode.surfacePos.x;
        const dz = pos.z - targetNode.surfacePos.z;
        const distKm = +(Math.hypot(dx, dz) * 4.6).toFixed(1);
        const heat =
          distKm < 12 ? '🔥 極強 (請按空白鍵浮出！)' : distKm < 35 ? '⚡ 接近中' : '❄️ 距離尚遠';
        const statusEl = document.getElementById('mission-distance-readout');
        if (statusEl) {
          statusEl.textContent = `距離目標水脈：${distKm} km | 訊號：${heat}`;
        }
      }
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.terraAquaGame = new TerraAquaGame();
});
