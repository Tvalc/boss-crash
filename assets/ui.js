(function () {
  // Expose initGameUI globally as window.initGameUI
  function initGameUI(controller) {
    if (window.preloadPlayerAnims) { try { window.preloadPlayerAnims(); } catch (e) {} }
    if (window.preloadKarenbotAnims) { try { window.preloadKarenbotAnims(); } catch (e) {} }

    // Inject medieval-themed styles
    (function injectStyles(){
      var style = document.createElement('style');
      style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Uncial+Antiqua&family=MedievalSharp&display=swap');
        
        @keyframes enemy_shake {
          0%,100%{transform:translateX(0)} 
          10%,30%,50%,70%,90%{transform:translateX(-8px) rotate(-1deg)} 
          20%,40%,60%,80%{transform:translateX(8px) rotate(1deg)}
        } 
        .shake{animation:enemy_shake 0.6s ease-in-out;}
        
        body { 
          background: radial-gradient(ellipse at center, #1a1611 0%, #0d0a08 70%) !important;
          font-family: 'Cinzel', serif !important;
          color: #c4a876 !important;
        }
        
        h1 { 
          font-family: 'Uncial Antiqua', cursive !important;
          color: #daa520 !important;
          text-shadow: 0 0 8px rgba(218, 165, 32, 0.4), 0 2px 4px rgba(0,0,0,0.9) !important;
          font-size: 42px !important;
          letter-spacing: 2px !important;
          text-transform: uppercase !important;
        }
        
        button {
          font-family: 'MedievalSharp', cursive !important;
          background: linear-gradient(145deg, #4a4a4a, #2f2f2f) !important;
          border: 2px solid #696969 !important;
          color: #c4a876 !important;
          padding: 14px 28px !important;
          border-radius: 6px !important;
          text-transform: uppercase !important;
          letter-spacing: 1px !important;
          box-shadow: 0 4px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1) !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
        }
        
        button:hover {
          transform: translateY(-1px) !important;
          box-shadow: 0 6px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15), 0 0 15px rgba(184, 134, 11, 0.2) !important;
        }
        
        button:active {
          transform: translateY(1px) !important;
        }
        
        p {
          font-family: 'Cinzel', serif !important;
          color: #c4a876 !important;
          font-weight: 600 !important;
          text-shadow: 0 1px 3px rgba(0,0,0,0.8) !important;
          background: rgba(0, 0, 0, 0.6) !important;
          padding: 8px 16px !important;
          border-radius: 6px !important;
          border: 1px solid rgba(139, 69, 19, 0.3) !important;
          margin: 6px 0 !important;
        }
      `;
      document.head.appendChild(style);
    })();

    const root = document.createElement('div');
    root.id = 'app';
    root.style.cssText = 'height:100vh;position:relative;background:radial-gradient(ellipse at center, #1a1611 0%, #0d0a08 70%);color:#c4a876;font-family:"Cinzel",serif;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:90px 24px 0 24px;box-sizing:border-box;overflow:hidden;';

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
    title.textContent = 'Dungeon Conquest';

    const info = document.createElement('div');
    info.style.cssText = 'text-align:center;margin-bottom:16px;background:rgba(0,0,0,0.5);padding:16px;border-radius:8px;border:1px solid rgba(139,69,19,0.4);';
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
    enemyImg.style.cssText = 'width:auto; height:32%; image-rendering:pixelated; display:block; filter:drop-shadow(0 8px 16px rgba(139, 0, 0, 0.3)) drop-shadow(0 0 12px rgba(139, 0, 0, 0.2));';

    const bossName = document.createElement('div');
    bossName.style.cssText = 'font-family:"MedievalSharp",cursive;font-weight:400;font-size:28px;color:#8b0000;text-shadow:0 0 10px rgba(139, 0, 0, 0.5), 0 2px 4px rgba(0,0,0,0.8);background:rgba(0,0,0,0.7);padding:8px 16px;border-radius:6px;border:1px solid rgba(139,0,0,0.3);display:inline-block;';
    const bossHp = document.createElement('div');
    bossHp.style.cssText = 'font-family:"MedievalSharp",cursive;color:#c4a876;text-shadow:0 1px 3px rgba(0,0,0,0.8);background:rgba(0,0,0,0.6);padding:6px 12px;border-radius:4px;border:1px solid rgba(139,69,19,0.3);display:inline-block;margin-top:8px;';

    // Player sprite image
    const playerImg = document.createElement('img');
    playerImg.alt = 'Player';
    playerImg.style.cssText = 'width:auto; height:28%; image-rendering:pixelated; display:block; filter:drop-shadow(0 8px 16px rgba(0,0,0,0.7)) drop-shadow(0 0 8px rgba(184, 134, 11, 0.1));';

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
    resultEl.style.cssText = 'min-height:24px;margin:8px 0;color:#daa520;font-family:"MedievalSharp",cursive;text-shadow:0 1px 3px rgba(0,0,0,0.8);background:rgba(0,0,0,0.8);padding:12px 18px;border-radius:6px;border:2px solid rgba(218,165,32,0.5);';

    const controls = document.createElement('div');
    controls.style.cssText = 'display:flex;gap:12px;margin-top:12px;';
    const attackBtn = document.createElement('button');
    attackBtn.textContent = '⚔️ Strike';
    const cashBtn = document.createElement('button');
    cashBtn.textContent = '💰 Claim Gold';
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

    // Format outcome text for medieval feel
    function formatOutcome(outcome) {
      switch(outcome) {
        case 'HIT': return 'Strike Lands';
        case 'CRIT': return 'Critical Blow';
        case 'MEGA HIT': return 'Devastating Strike';
        case 'MISS': return 'Attack Misses';
        case 'COUNTER': return 'Enemy Retaliates';
        default: return outcome;
      }
    }

    function refresh() {
      stageEl.textContent = 'Chamber: ' + controller.getCurrentStage();
      payoutEl.textContent = 'Gold Earned: ' + controller.getTotalPayout().toFixed(2) + 'x';
      const boss = controller.getBoss();
      bossName.textContent = boss.name;
      bossHp.textContent = 'Vitality: ' + boss.currentHealth + ' / ' + boss.maxHealth;
    }

    attackBtn.addEventListener('click', function () {
      attackBtn.disabled = true;

      // Capture pre-attack state for death detection
      const hpBefore = controller.getBoss().currentHealth;

      const r = controller.attack();
      const formattedOutcome = formatOutcome(r.outcome);
      resultEl.textContent = formattedOutcome + (r.damage ? (' | Damage: ' + r.damage) : '') + ' | Reward: ' + r.payoutMultiplier + 'x gold';
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
      resultEl.textContent = 'Gold claimed: ' + p.toFixed(2) + 'x';
      refresh();
      // After cashout, ensure we resume current enemy idle
      playEnemyIdle();
    });

    refresh();
  }

  window.initGameUI = initGameUI;
})();