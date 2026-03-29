# Deployment Checklist - Revenue Recovery

## Pre-Deployment Verification

### Code Review
- [x] All new components created
- [x] Configuration file created
- [x] /salaire-net-quebec updated
- [x] Old ad code removed
- [x] Imports updated
- [x] CLS prevention implemented
- [x] Lazy loading configured

### Compliance Check
- [x] No vignette ads
- [x] No interstitial ads
- [x] No auto-expand units
- [x] Mobile anchor <15% viewport
- [x] Anchor loads after scroll
- [x] Anchor is dismissible
- [x] Max 2 ads on mobile
- [x] Max 3 ads on desktop
- [x] No ads above fold on mobile

### Performance Check
- [x] Min-height on all ad containers
- [x] Lazy loading for below-fold
- [x] Pre-loading margin configured
- [x] No blocking scripts

---

## Deployment Steps

### 1. Build & Test Locally
```bash
npm run build
npm run start
```

- [ ] No build errors
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Ads load correctly

### 2. Test on Mobile Devices

#### iPhone Testing
- [ ] Safari - iPhone 12/13/14
- [ ] Safari - iPhone SE
- [ ] Verify max 2 ads visible
- [ ] Verify anchor appears after scroll
- [ ] Verify anchor is dismissible
- [ ] Verify no layout shift
- [ ] Verify no ads before calculator

#### Android Testing
- [ ] Chrome - Samsung Galaxy
- [ ] Chrome - Pixel
- [ ] Verify max 2 ads visible
- [ ] Verify anchor appears after scroll
- [ ] Verify anchor is dismissible
- [ ] Verify no layout shift
- [ ] Verify no ads before calculator

### 3. Test on Desktop

#### Browser Testing
- [ ] Chrome - Windows/Mac
- [ ] Safari - Mac
- [ ] Firefox - Windows/Mac
- [ ] Edge - Windows
- [ ] Verify sidebar ad appears
- [ ] Verify sidebar is sticky
- [ ] Verify max 3 ads visible
- [ ] Verify no layout shift

### 4. Performance Testing

#### Core Web Vitals
- [ ] LCP <2.5s (PageSpeed Insights)
- [ ] FID <100ms (PageSpeed Insights)
- [ ] CLS <0.1 (PageSpeed Insights)
- [ ] Mobile score >80
- [ ] Desktop score >90

#### Ad Performance
- [ ] Ads load within 2 seconds
- [ ] No blocking resources
- [ ] Lazy loading works
- [ ] Pre-loading margin works

---

## Post-Deployment Monitoring

### Day 1: Immediate Checks
- [ ] No errors in production logs
- [ ] Ads displaying correctly
- [ ] No console errors
- [ ] Google Search Console - no new issues
- [ ] Analytics tracking working

### Week 1: Daily Monitoring
- [ ] RPM tracking (/salaire-net-quebec)
- [ ] Viewability rate
- [ ] CLS score (Search Console)
- [ ] LCP time (Search Console)
- [ ] Bounce rate (Analytics)
- [ ] Ad Experience report (Search Console)

### Week 2: Performance Review
- [ ] Compare RPM vs. baseline
- [ ] Analyze viewability data
- [ ] Review Core Web Vitals
- [ ] Check user feedback
- [ ] Verify no compliance issues

---

## Rollback Plan

### If Issues Detected:

#### Minor Issues (Warnings)
1. Document the issue
2. Create fix plan
3. Deploy fix within 24 hours
4. Continue monitoring

#### Major Issues (Violations)
1. Immediately rollback deployment
2. Investigate root cause
3. Fix in development
4. Re-test thoroughly
5. Re-deploy with fixes

### Rollback Commands:
```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or restore specific files
git checkout HEAD~1 -- app/salaire-net-quebec/page.tsx
git commit -m "Rollback: Revenue recovery"
git push origin main
```

---

## Success Metrics

### Week 1 Targets:
- ✅ No Google Ad Experience violations
- 🎯 RPM increase >10%
- 🎯 Viewability >40%
- 🎯 CLS <0.1
- 🎯 LCP <2.5s
- 🎯 Bounce rate stable

### Week 2 Targets:
- ✅ No Google Ad Experience violations
- 🎯 RPM increase >20%
- 🎯 Viewability >50%
- 🎯 CLS <0.1
- 🎯 LCP <2.5s
- 🎯 Bounce rate stable

### Month 1 Targets:
- ✅ No Google Ad Experience violations
- 🎯 RPM increase 30-50%
- 🎯 Viewability >50%
- 🎯 CLS <0.1
- 🎯 LCP <2.5s
- 🎯 User satisfaction maintained

---

## Next Phase Preparation

### If Week 1 Successful:
- [ ] Document learnings
- [ ] Prepare next 4 high-traffic pages
- [ ] Schedule Phase 2 deployment
- [ ] Update documentation

### If Issues Found:
- [ ] Document issues
- [ ] Create improvement plan
- [ ] Fix and re-test
- [ ] Delay Phase 2 until stable

---

## Communication

### Internal Team:
- [ ] Notify team of deployment
- [ ] Share monitoring dashboard
- [ ] Set up alerts for issues
- [ ] Schedule review meeting

### Stakeholders:
- [ ] Report deployment status
- [ ] Share initial metrics
- [ ] Provide weekly updates
- [ ] Present month 1 results

---

## Emergency Contacts

### Technical Issues:
- Development Team Lead
- DevOps Engineer
- QA Lead

### Business Issues:
- Product Manager
- Revenue Manager
- Compliance Officer

---

## Sign-Off

### Pre-Deployment:
- [ ] Code reviewed by: _______________
- [ ] QA tested by: _______________
- [ ] Compliance verified by: _______________
- [ ] Approved by: _______________

### Post-Deployment:
- [ ] Deployed by: _______________
- [ ] Verified by: _______________
- [ ] Monitoring started: _______________
- [ ] Date: _______________

---

## Notes

### Deployment Date: _______________
### Deployment Time: _______________
### Deployed By: _______________

### Issues Encountered:
_____________________________________
_____________________________________
_____________________________________

### Resolution:
_____________________________________
_____________________________________
_____________________________________

---

**Status:** 🟢 READY FOR DEPLOYMENT

**Last Updated:** February 28, 2026
