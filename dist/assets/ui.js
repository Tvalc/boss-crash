(function () {
  // Expose initGameUI globally as window.initGameUI
  function initGameUI(controller) {
    if (window.preloadPlayerAnims) { try { window.preloadPlayerAnims(); } catch (e) {} }
    if (window.preloadKarenbotAnims) { try { window.preloadKarenbotAnims(); } catch (e) {} }

    // Inject styles for enemy shake effect
    (function injectStyles(){
      var style = document.createElement('style');
      style.textContent = "@keyframes enemy_shake {0%,100%{transform:translateX(0)}10%,30%,50%,70%,90%{transform:translateX(-5px)}20%,40%,60%,80%{transform:translateX(5px)}} .shake{animation:enemy_shake .5s;}";
      document.head.appendChild(style);
    })();

    const root = document.createElement('div');
    root.id = 'app';
    root.style.cssText = 'height:100vh;position:relative;background:#1a1a1a;color:#fff;font-family:Arial,sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:80px 24px 0 24px;box-sizing:border-box;overflow:hidden;';

    // Optional configurable background image
    const bgUrl = window.GAME_BACKGROUND_URL;
    if (bgUrl) {
      root.style.backgroundImage = 'url(' + bgUrl + ')';
      root.style.backgroundSize = 'contain';
      root.style.backgroundRepeat = 'no-repeat';
      root.style.backgroundPosition = 'center';
    }

    const title = document.createElement('h1');
    title.style.margin = '0';
    title.textContent = 'Boss Rush';

    const info = document.createElement('div');
    info.style.cssText = 'text-align:center;margin-bottom:16px;';
    const stageEl = document.createElement('p');
    stageEl.style.margin = '0';
    const payoutEl = document.createElement('p');
    payoutEl.style.margin = '0';
    info.append(stageEl, payoutEl);

    const arena = document.createElement('div');
    arena.style.cssText = 'position:absolute;left:50%;top:83%;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;margin:0;height:36vh;';

    // Enemy sprite image (generic)
    const enemyImg = document.createElement('img');
    enemyImg.alt = 'Enemy';
    enemyImg.style.cssText = 'width:auto; height:32%; image-rendering:pixelated; display:block;';

    const bossName = document.createElement('div');
    bossName.style.fontWeight = 'bold';
    const bossHp = document.createElement('div');

    // Player sprite image
    const playerImg = document.createElement('img');
    playerImg.alt = 'Player';
    playerImg.style.cssText = 'width:auto; height:28%; image-rendering:pixelated; display:block;';

    // Arrange sprites side-by-side (player left, enemy right)
    const battleRow = document.createElement('div');
    battleRow.style.cssText = 'display:flex;flex-direction:row;align-items:center;justify-content:center;gap:92px;height:100%;';
    // Flip enemy to face the player
    enemyImg.style.transform = 'scaleX(-1)';
    battleRow.append(playerImg, enemyImg);

    arena.append(battleRow, bossName, bossHp);

    // Resolve helper wrappers
    function resFrame(u){ return (window.resolvePlayerFrame ? window.resolvePlayerFrame(u) : u); }
    function resList(key){ return (window.resolveAnimList ? window.resolveAnimList(key) : (window.PLAYER_ANIMS && window.PLAYER_ANIMS[key] ? window.PLAYER_ANIMS[key] : [])); }

    // Enemy resolver routing by stage
    function enemyKeyForStage(s){ return (s === 1) ? 'roach' : (s === 2 ? 'yeti' : (s === 3 ? 'karenbot' : 'roach')); }
    function resEnemyList(key){
      var s = controller.getCurrentStage();
      var k = enemyKeyForStage(s);
      if (k === 'roach') return (window.resolveRoachAnimList ? window.resolveRoachAnimList(key) : (window.ROACH_ANIMS && window.ROACH_ANIMS[key] ? window.ROACH_ANIMS[key] : []));
      if (k === 'yeti') return (window.resolveYetiAnimList ? window.resolveYetiAnimList(key) : (window.YETI_ANIMS && window.YETI_ANIMS[key] ? window.YETI_ANIMS[key] : []));
      if (k === 'karenbot') return (window.resolveKarenbotAnimList ? window.resolveKarenbotAnimList(key) : (window.KARENBOT_ANIMS && window.KARENBOT_ANIMS[key] ? window.KARENBOT_ANIMS[key] : []));
      return [];
    }

    // Set initial idle frames
    const playerIdle = resList('idle');
    if (playerIdle && playerIdle.length) {
      playerImg.src = resFrame(playerIdle[0]);
    }

    // Enemy idle animation loop
    let enemyTimer = null;
    function playEnemyIdle() {
      const idle = resEnemyList('idle');
      if (!idle || !idle.length) return;
      let i = 0;
      enemyImg.src = resFrame(idle[0]);
      if (enemyTimer) { clearInterval(enemyTimer); enemyTimer = null; }
      enemyTimer = setInterval(function(){
        i = (i + 1) % idle.length;
        enemyImg.src = resFrame(idle[i]);
      }, 120);
    }
    function stopEnemyAnim(){ if (enemyTimer) { clearInterval(enemyTimer); enemyTimer = null; } }
    function playEnemyOnce(keys, fps, onDone){
      if (!keys || !keys.length){ if(onDone) onDone(); return; }
      stopEnemyAnim();
      let i = 0;
      const delay = Math.max(30, Math.floor(1000/(fps||12)));
      enemyImg.src = resFrame(keys[0]);
      const t = setInterval(function(){
        i++;
        if (i >= keys.length){ clearInterval(t); if(onDone) onDone(); return; }
        enemyImg.src = resFrame(keys[i]);
      }, delay);
    }
    // Repeatable enemy animation
    function playEnemy(keys, fps, repeat, onDone){
      if (!keys || !keys.length){ if(onDone) onDone(); return; }
      stopEnemyAnim();
      let i = 0;
      const reps = Math.max(1, repeat || 1);
      const total = keys.length * reps;
      const delay = Math.max(30, Math.floor(1000/(fps||8)));
      enemyImg.src = resFrame(keys[0]);
      const t = setInterval(function(){
        i++;
        if (i >= total){ clearInterval(t); if(onDone) onDone(); return; }
        const frame = keys[i % keys.length];
        enemyImg.src = resFrame(frame);
      }, delay);
    }

    // Player animation player
    let animTimer = null;
    function playAnim(keys, fps, repeat, onDone) {
      if (!keys || !keys.length) { if (onDone) onDone(); return; }
      if (animTimer) { clearInterval(animTimer); animTimer = null; }
      let i = 0;
      const reps = Math.max(1, repeat || 1);
      const total = keys.length * reps;
      const delay = Math.max(30, Math.floor(1000 / (fps || 12)));
      playerImg.src = resFrame(keys[0]);
      animTimer = setInterval(function () {
        i++;
        if (i >= total) {
          clearInterval(animTimer);
          animTimer = null;
          if (onDone) onDone();
          return;
        }
        const frame = keys[i % keys.length];
        playerImg.src = resFrame(frame);
      }, delay);
    }

    // Map outcomes to player animation lists
    function framesForOutcome(outcome) {
      switch (outcome) {
        case 'HIT': return resList('knife1');
        case 'CRIT': return resList('sword');
        case 'MEGA HIT': return resList('sword');
        case 'MISS': return resList('knife2');
        case 'COUNTER': return resList('death');
        default: return null;
      }
    }

    function showIdle() {
      if (animTimer) { clearInterval(animTimer); animTimer = null; }
      if (playerIdle && playerIdle.length) {
        playerImg.src = resFrame(playerIdle[0]);
      }
    }

    const resultEl = document.createElement('div');
    resultEl.style.cssText = 'height:24px;margin:8px 0;color:#ffd166;';

    const controls = document.createElement('div');
    controls.style.cssText = 'display:flex;gap:12px;margin-top:12px;';
    const attackBtn = document.createElement('button');
    attackBtn.textContent = 'Attack';
    const cashBtn = document.createElement('button');
    cashBtn.textContent = 'Cash Out';
    ;[attackBtn, cashBtn].forEach(function (b) { Object.assign(b.style, { padding: '10px 16px', cursor: 'pointer', borderRadius: '6px', border: 'none' }); });
    controls.append(attackBtn, cashBtn);

    // Wrap all UI above sprites in a centered band whose bottom aligns to 50vh
    const uiRegion = document.createElement('div');
    uiRegion.style.cssText = 'height:32vh;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:8px;';
    uiRegion.append(title, info, bossName, bossHp, resultEl, controls);

    root.append(uiRegion, arena);
    document.body.innerHTML = '';
    document.body.appendChild(root);

    // Start enemy idle loop
    playEnemyIdle();

    function refresh() {
      stageEl.textContent = 'Stage: ' + controller.getCurrentStage();
      payoutEl.textContent = 'Total Payout: ' + controller.getTotalPayout().toFixed(2) + 'x';
      const boss = controller.getBoss();
      bossName.textContent = boss.name;
      bossHp.textContent = 'HP: ' + boss.currentHealth + ' / ' + boss.maxHealth;
    }

    attackBtn.addEventListener('click', function () {
      attackBtn.disabled = true;

      // Capture pre-attack state for death detection
      const hpBefore = controller.getBoss().currentHealth;

      const r = controller.attack();
      resultEl.textContent = r.outcome + (r.damage ? (' (-' + r.damage + ' HP, +' + r.payoutMultiplier + 'x)') : '');
      refresh();

      const isDamage = (r.outcome === 'HIT' || r.outcome === 'CRIT' || r.outcome === 'MEGA HIT');
      const died = isDamage && (hpBefore - r.damage <= 0);

      // Enemy reactions (shared timing for all enemies)
      if (r.outcome === 'COUNTER') {
        const atk = resEnemyList('attack');
        playEnemyOnce(atk, 12, function(){ playEnemyIdle(); });
      } else if (isDamage) {
        if (died) {
          const death = resEnemyList('death');
          // Slowed, repeated death: 6 FPS, 2x
          playEnemy(death, 6, 2, function(){ playEnemyIdle(); });
        } else {
          // Shake slowed to 0.9s + first 2 death frames at 6 FPS repeated 3x
          enemyImg.classList.add('shake');
          enemyImg.style.animationDuration = '0.9s';
          setTimeout(function(){ enemyImg.classList.remove('shake'); enemyImg.style.removeProperty('animation-duration'); }, 900);
          const death2 = resEnemyList('death').slice(0, 2);
          playEnemy(death2, 6, 3, function(){ playEnemyIdle(); });
        }
      }

      // Player animation
      const frames = framesForOutcome(r.outcome);
      const repeat = (r.outcome === 'CRIT' || r.outcome === 'MEGA HIT') ? 2 : 1;
      const fps = (r.outcome === 'CRIT' || r.outcome === 'MEGA HIT') ? 10 : ((r.outcome === 'COUNTER') ? 10 : 14);
      const done = function () { showIdle(); attackBtn.disabled = false; };
      if (frames) {
        playAnim(frames, fps, repeat, done);
      } else {
        setTimeout(done, 300);
      }
    });

    cashBtn.addEventListener('click', function () {
      const p = controller.cashOut();
      resultEl.textContent = 'Cashed out: ' + p.toFixed(2) + 'x';
      refresh();
      // After cashout, ensure we resume current enemy idle
      playEnemyIdle();
    });

    refresh();
  }

  window.initGameUI = initGameUI;
})();
