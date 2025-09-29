# Boss Rush - Stake.com Deployment Guide

## Quick Deployment

### 1. Prepare for Deployment
```bash
# Make deployment script executable
chmod +x deploy.sh

# Run deployment build
./deploy.sh
```

### 2. Upload to Stake.com
- Upload the entire `dist/` folder OR the generated `boss-rush-stake-deployment.zip`
- Set entry point to `index.html`
- Configure game settings in Stake admin panel

## Detailed Deployment Process

### Prerequisites
- Node.js 16+ and npm 8+
- Access to Stake.com developer portal
- Game approval from Stake.com team

### Step 1: Build Configuration
The game is pre-configured for Stake.com with:
- **Game ID**: `boss-rush-v1`
- **Entry Point**: `dist/index.html`
- **Assets**: `dist/assets/`
- **Math Bundles**: `dist/math/`
- **Configuration**: `dist/stake-config.json`

### Step 2: Production Build
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Test build locally
npm run preview
```

### Step 3: Stake.com Integration Checklist

#### ✅ Required Files
- [ ] `dist/index.html` - Game entry point
- [ ] `dist/assets/` - Compiled game assets
- [ ] `dist/math/stage1.csv` - Stage 1 outcomes (1M rows)
- [ ] `dist/math/stage2.csv` - Stage 2 outcomes (1M rows)
- [ ] `dist/math/stage3.csv` - Stage 3 outcomes (1M rows)
- [ ] `dist/math/stage4.csv` - Stage 4 outcomes (1M rows)
- [ ] `dist/math/stage5.csv` - Stage 5 outcomes (1M rows)
- [ ] `dist/stake-config.json` - Game configuration
- [ ] `dist/manifest.json` - PWA manifest

#### ✅ Stake SDK Integration
- [ ] Wallet connection working
- [ ] Real money betting functional
- [ ] Provably fair verification active
- [ ] Balance management working
- [ ] Cash-out system functional
- [ ] Error handling comprehensive

#### ✅ Game Configuration
- [ ] Min bet: 0.01 DOGE
- [ ] Max bet: 1000 DOGE
- [ ] House edge: 3%
- [ ] RTP: 95.7% - 97.3%
- [ ] Currencies: DOGE, BTC, ETH, LTC, XRP, TRX

### Step 4: Stake.com Submission

#### 4.1 Upload Game Files
1. Log into Stake.com developer portal
2. Create new game submission
3. Upload `dist/` folder or deployment zip
4. Set entry point to `index.html`

#### 4.2 Configure Game Settings
```json
{
  "gameId": "boss-rush-v1",
  "name": "Boss Rush",
  "category": "arcade",
  "minBet": 0.01,
  "maxBet": 1000,
  "defaultCurrency": "DOGE",
  "houseEdge": 0.03,
  "provablyFair": true
}
```

#### 4.3 Testing Phase
1. **Staging Environment**
   - Test all game mechanics
   - Verify wallet integration
   - Check provably fair verification
   - Test on mobile devices

2. **Regression Testing**
   - Multiple bet amounts
   - All game outcomes
   - Cash-out functionality
   - Error scenarios

#### 4.4 Production Deployment
1. Submit for Stake.com review
2. Address any feedback
3. Get approval for production
4. Go live on Stake.com!

## Math Bundle Requirements

### Production CSV Format
Each stage needs exactly 1,000,000 rows with this format:
```csv
outcome,damage,payoutMultiplier
HIT,1,1.26
CRIT,3,3.0
MEGA HIT,6,12.0
MISS,0,0
COUNTER,0,0
```

### Probability Distributions
- **Stage 1**: 2% COUNTER, 15% MISS, 70% HIT, 10% CRIT, 3% MEGA HIT
- **Stage 2**: 3.5% COUNTER, 15% MISS, 68% HIT, 10.5% CRIT, 3% MEGA HIT
- **Stage 3**: 5% COUNTER, 15% MISS, 65% HIT, 12% CRIT, 3% MEGA HIT
- **Stage 4**: 6.5% COUNTER, 15% MISS, 63% HIT, 12.5% CRIT, 3% MEGA HIT
- **Stage 5**: 8% COUNTER, 15% MISS, 60% HIT, 14% CRIT, 3% MEGA HIT

## Troubleshooting

### Common Issues

#### Build Fails
```bash
# Clear cache and rebuild
npm run clean
npm install
npm run build
```

#### Missing Math Bundles
- Ensure CSV files are in `math/` directory
- Check CSV format matches specification
- Verify 1M rows per file for production

#### Stake SDK Errors
- Check network connectivity
- Verify Stake SDK version compatibility
- Test in staging environment first

#### Mobile Issues
- Test responsive design
- Check touch interactions
- Verify performance on mobile devices

### Support Contacts
- **Stake.com Developer Support**: developers@stake.com
- **Technical Issues**: Create issue in project repository
- **Game Submission**: Follow Stake.com submission process

## Security Checklist

### Pre-Deployment Security Review
- [ ] No client-side RNG (all randomness from Stake)
- [ ] Provably fair verification implemented
- [ ] No hardcoded private keys or secrets
- [ ] Input validation on all user inputs
- [ ] Error messages don't leak sensitive info
- [ ] HTTPS enforced for all requests
- [ ] CSP headers configured properly

### Post-Deployment Monitoring
- [ ] Monitor for unusual betting patterns
- [ ] Track provably fair verification rates
- [ ] Watch for client-side errors
- [ ] Monitor performance metrics
- [ ] Check mobile compatibility regularly

## Success Metrics

### Key Performance Indicators
- **Player Engagement**: Average session duration
- **Retention**: Return player rate
- **Revenue**: Total volume and house edge performance
- **Technical**: Uptime and error rates
- **Fairness**: Provably fair verification rate

### Launch Goals
- [ ] 99.9% uptime in first month
- [ ] <1% error rate
- [ ] 100% provably fair verification
- [ ] Mobile compatibility >95%
- [ ] Player satisfaction >4.5/5

## Congratulations! 🎉

Your Boss Rush game is now ready for Stake.com deployment. The game features:
- Real money betting with crypto
- Provably fair outcomes
- Mobile-responsive design
- Professional UI/UX
- Complete Stake SDK integration

Good luck with your launch on Stake.com!