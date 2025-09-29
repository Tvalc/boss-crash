(function () {
  // Expose GameController globally as window.GameController
  class GameController {
    constructor() {
      this.currentStage = 1;
      this.boss = this._initBoss(this.currentStage);
      this.nonce = 0;
      this.totalPayout = 0;
    }
    _initBoss(stage) {
      const data = {
        1: { name: 'Roach', maxHealth: 30 },
        2: { name: 'WiFi Yeti', maxHealth: 40 },
        3: { name: 'Karenbot', maxHealth: 50 },
        4: { name: 'Demon Overlord', maxHealth: 60 },
        5: { name: 'Ancient God', maxHealth: 100 }
      };
      const b = data[stage];
      return { id: stage, name: b.name, maxHealth: b.maxHealth, currentHealth: b.maxHealth };
    }
    _getOutcomes(stage) {
      const S = {
        1: [
          { outcome: 'COUNTER', damage: 0, payoutMultiplier: 0 },
          { outcome: 'MISS', damage: 0, payoutMultiplier: 0 },
          { outcome: 'HIT', damage: 1, payoutMultiplier: 1.26 },
          { outcome: 'CRIT', damage: 3, payoutMultiplier: 3.0 },
          { outcome: 'MEGA HIT', damage: 6, payoutMultiplier: 12.0 }
        ],
        2: [
          { outcome: 'COUNTER', damage: 0, payoutMultiplier: 0 },
          { outcome: 'MISS', damage: 0, payoutMultiplier: 0 },
          { outcome: 'HIT', damage: 1, payoutMultiplier: 1.30 },
          { outcome: 'CRIT', damage: 3, payoutMultiplier: 3.0 },
          { outcome: 'MEGA HIT', damage: 6, payoutMultiplier: 7.0 }
        ],
        3: [
          { outcome: 'COUNTER', damage: 0, payoutMultiplier: 0 },
          { outcome: 'MISS', damage: 0, payoutMultiplier: 0 },
          { outcome: 'HIT', damage: 1, payoutMultiplier: 1.28 },
          { outcome: 'CRIT', damage: 3, payoutMultiplier: 3.6 },
          { outcome: 'MEGA HIT', damage: 6, payoutMultiplier: 8.0 }
        ],
        4: [
          { outcome: 'COUNTER', damage: 0, payoutMultiplier: 0 },
          { outcome: 'MISS', damage: 0, payoutMultiplier: 0 },
          { outcome: 'HIT', damage: 1, payoutMultiplier: 1.27 },
          { outcome: 'CRIT', damage: 3, payoutMultiplier: 3.6 },
          { outcome: 'MEGA HIT', damage: 6, payoutMultiplier: 10.0 }
        ],
        5: [
          { outcome: 'COUNTER', damage: 0, payoutMultiplier: 0 },
          { outcome: 'MISS', damage: 0, payoutMultiplier: 0 },
          { outcome: 'HIT', damage: 1, payoutMultiplier: 1.26 },
          { outcome: 'CRIT', damage: 3, payoutMultiplier: 3.7 },
          { outcome: 'MEGA HIT', damage: 6, payoutMultiplier: 12.0 }
        ]
      };
      return S[stage];
    }
    attack() {
      const outcomes = this._getOutcomes(this.currentStage);
      const result = outcomes[this.nonce % outcomes.length];
      this.nonce += 1;
      if (result.outcome !== 'MISS' && result.outcome !== 'COUNTER') {
        this.boss.currentHealth = Math.max(0, this.boss.currentHealth - result.damage);
        this.totalPayout += result.payoutMultiplier;
      }
      if (this.boss.currentHealth <= 0) this._advance();
      return result;
    }
    cashOut() {
      const p = this.totalPayout;
      this.totalPayout = 0;
      return p;
    }
    _advance() {
      if (this.currentStage < 5) {
        this.currentStage += 1;
        this.boss = this._initBoss(this.currentStage);
      }
    }
    getCurrentStage() { return this.currentStage; }
    getBoss() { return this.boss; }
    getTotalPayout() { return this.totalPayout; }
    getNonce() { return this.nonce; }
  }

  window.GameController = GameController;
})();
