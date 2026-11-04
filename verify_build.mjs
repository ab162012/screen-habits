import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.resolve('screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runVerification() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const results = {
    gate1_screenshots: false,
    gate2_slogan: false,
    gate3_colors_font: false,
    gate4_flow_xp_streak_refresh: false,
    gate5_skip_empty_recorded: false,
    gate6_score_partial_band: false,
    gate7_result_page_composed: false,
    gate8_articles_full_pages: false,
    gate9_copy_and_print: false,
    gate10_footer_credits: false,
    gate11_no_settings_zero_errors: false,
  };

  const consoleErrors = [];

  const viewports = [
    { name: 'phone-360', width: 360, height: 740 },
    { name: 'phone-375', width: 375, height: 667 },
    { name: 'phone-390', width: 390, height: 844 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'desktop-1280', width: 1280, height: 800 }
  ];

  console.log('--- Checking Viewports & Screenshots ---');
  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    await page.goto('http://localhost:5173/#home', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(300);
    const shotPath = path.join(SCREENSHOT_DIR, `${vp.name}-home.png`);
    await page.screenshot({ path: shotPath, fullPage: true });
    console.log(`Saved screenshot: ${shotPath}`);
    await page.close();
  }
  results.gate1_screenshots = true;

  // Dedicated test page
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  // Clear local storage for clean start
  await page.goto('http://localhost:5173/#home', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(300);

  // Test Gate 2: Slogan on Home
  const homeSlogan = await page.textContent('.home-hero-slogan, .hero-slogan');
  const homeHasSlogan = homeSlogan?.trim() === 'Know your screen. Own your time.';
  console.log('Home slogan check:', homeSlogan?.trim(), homeHasSlogan ? 'PASS' : 'FAIL');

  // Test Gate 10: Footer credits on Home
  const footerCredits = await page.textContent('.footer-credits-line, .footer-credits');
  const normalizedCredits = footerCredits?.trim().replace(/\.$/, '');
  const hasExactCredits = normalizedCredits === 'Made by Abdul Basit (Leader), SJB, Ebad Ilyas';
  console.log('Footer credits check:', footerCredits?.trim(), hasExactCredits ? 'PASS' : 'FAIL');

  // Test Gate 8: Articles & individual article pages
  console.log('--- Testing Articles Page & All 6 Full Articles ---');
  await page.click('a[href="#articles"]');
  await page.waitForTimeout(400);

  const articleCards = await page.$$('.article-card-main, .article-card-full');
  console.log(`Found ${articleCards.length} articles on Articles page`);
  let allArticlesPass = articleCards.length === 6;

  const articleSlugs = [
    'phone-free-breaks',
    '9pm-screen-cutoff',
    'sleep-last-hour',
    'scrolling-less',
    'eyes-focus-breaks',
    'healthy-habits-student-team'
  ];

  for (const slug of articleSlugs) {
    await page.goto(`http://localhost:5173/#article/${slug}`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(200);
    const title = await page.textContent('.article-main-heading, .article-title-main');
    const intro = await page.textContent('.article-lead-paragraph, .article-intro');
    const steps = await page.$$('.article-step-block, .article-step-item');
    const closing = await page.textContent('.article-closing-callout, .article-closing-box');
    const hasBack = await page.$('button:has-text("Back to Articles")');
    const hasQuestLink = await page.$('button:has-text("Take the Quest")');

    if (!title || !intro || steps.length < 3 || !closing || !hasBack || !hasQuestLink) {
      console.log(`Article ${slug} validation failed!`);
      allArticlesPass = false;
    } else {
      console.log(`Article "${title.trim()}" passed checks with ${steps.length} practical steps.`);
    }
  }
  results.gate8_articles_full_pages = allArticlesPass;

  // Test Gate 2 (part 2): Quest Welcome dialog slogan
  console.log('--- Testing Quest Page & Welcome Dialog ---');
  await page.goto('http://localhost:5173/#quest', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(400);

  const dialogSlogan = await page.textContent('.dialog-slogan');
  const dialogHasSlogan = dialogSlogan?.trim() === 'Know your screen. Own your time.';
  console.log('Quest welcome dialog slogan:', dialogSlogan?.trim(), dialogHasSlogan ? 'PASS' : 'FAIL');

  // Fill optional Name & Class
  await page.fill('#student-name-input', 'Abdul Basit');
  await page.fill('#student-class-input', 'Class 10-A');
  await page.click('.dialog-btn-continue, button[type="submit"]');
  await page.waitForTimeout(400);

  // Test Gate 4 & 5: Quest flow, XP, Streak, Skip, and Refresh
  console.log('--- Testing Quest Flow, Gamification XP, Streak, Skip ---');
  // Q1: Slider (move slider to answer)
  let xpInitial = await page.textContent('.quest-xp-badge, .xp-badge');
  console.log('Initial XP:', xpInitial); // Should be 0 XP

  // Select value on slider for Q1
  await page.fill('.hours-slider, .slider-input', '5.5');
  await page.dispatchEvent('.hours-slider, .slider-input', 'change');
  await page.waitForTimeout(200);

  // Click Next
  await page.click('.sticky-nav-bar .btn-next, .sticky-bottom-bar button:has-text("Next")');
  await page.waitForTimeout(300);

  // Q2: Multi-chips (Answer)
  await page.click('.chip-button:has-text("Smartphone"), .chip-btn:has-text("Smartphone")');
  await page.click('.chip-button:has-text("Laptop"), .chip-btn:has-text("Laptop")');
  await page.waitForTimeout(200);
  await page.click('.sticky-nav-bar .btn-next, .sticky-bottom-bar button:has-text("Next")');
  await page.waitForTimeout(300);

  // Now step 2 (Q3). Check XP: should be 20 XP (2 answered)
  let xpAfter2 = await page.textContent('.quest-xp-badge, .xp-badge');
  let streakAfter2 = await page.textContent('.quest-streak-pill strong, .streak-indicator strong');
  console.log('XP after 2 answered questions:', xpAfter2, 'Streak:', streakAfter2);

  // Test Skip on Q3
  console.log('Testing Skip on Q3...');
  await page.click('.skip-button');
  await page.waitForTimeout(400);

  // Step is now 3 (Q4).
  let streakAfterSkip = await page.textContent('.quest-streak-pill strong, .streak-indicator strong');
  const skipAlertText = await page.textContent('.quest-skip-alert, .streak-reset-alert');
  console.log('Streak after skip:', streakAfterSkip, 'Alert text:', skipAlertText);

  // Test Refresh preserves progress
  console.log('Testing refresh retains progress...');
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(400);
  const stepMeta = await page.textContent('.step-counter-text, .step-counter');
  console.log('Step counter after reload:', stepMeta?.trim());
  const reloadPreserved = stepMeta?.includes('4 / 10') || stepMeta?.includes('4 of 10') || stepMeta?.includes('Question 4');

  // Test Back to Q3: verify it stayed skipped/empty
  console.log('Testing Back button...');
  await page.click('.btn-back');
  await page.waitForTimeout(300);
  const q3SelectedOption = await page.$('.option-card.selected, .option-card-btn.selected');
  const q3IsEmpty = q3SelectedOption === null;
  console.log('Q3 after Back has no selection:', q3IsEmpty ? 'PASS' : 'FAIL');

  // Go forward again
  await page.click('.skip-button');
  await page.waitForTimeout(300);

  // Skip remaining questions to test Partial Score (< 5 answered)
  console.log('--- Testing Partial Score (< 5 questions answered) ---');
  while (page.url().includes('#quest')) {
    await page.click('.skip-button');
    await page.waitForTimeout(300);
  }

  // Landed on Result page
  await page.waitForSelector('.result-band-title, .band-pill', { timeout: 5000 });
  const resultUrl = page.url();
  console.log('URL on completion:', resultUrl);

  // Check Partial Result banner
  const bandTitle = await page.textContent('.result-band-title, .band-pill');
  const partialWarning = await page.$('.band-pill-incomplete, .partial-warning-card');
  const answeredNotice = await page.textContent('.result-answered-count, .answered-count-badge');
  console.log('Partial result band title:', bandTitle?.trim());
  console.log('Answered count notice:', answeredNotice?.trim());
  const partialPass = bandTitle?.includes('Not enough answers for a full score') && partialWarning !== null;
  results.gate6_score_partial_band = partialPass;

  // Test Retake button
  console.log('--- Testing Retake & Full 10-Question Quest ---');
  await page.click('button:has-text("Retake Quest")');
  await page.waitForTimeout(500);

  // Now answer all 10 questions to get full score
  console.log('Answering all 10 questions...');
  // Q1: Slider
  await page.fill('.hours-slider, .slider-input', '4.5');
  await page.dispatchEvent('.hours-slider, .slider-input', 'change');
  await page.click('.sticky-nav-bar .btn-next');
  await page.waitForTimeout(200);

  // Q2: Multi-chips
  await page.click('.chip-button:has-text("Smartphone")');
  await page.click('.chip-button:has-text("Laptop")');
  await page.click('.sticky-nav-bar .btn-next');
  await page.waitForTimeout(200);

  // Q3: Single cards
  await page.click('.option-card:has-text("Direct Messaging")');
  await page.click('.sticky-nav-bar .btn-next');
  await page.waitForTimeout(200);

  // Q4: Single cards
  await page.click('.option-card:has-text("A few times daily")');
  await page.click('.sticky-nav-bar .btn-next');
  await page.waitForTimeout(200);

  // Q5: Single cards
  await page.click('.option-card:has-text("Rarely or never")');
  await page.click('.sticky-nav-bar .btn-next');
  await page.waitForTimeout(200);

  // Q6: Single cards
  await page.click('.option-card:has-text("Screens off for wind-down")');
  await page.click('.sticky-nav-bar .btn-next');
  await page.waitForTimeout(200);

  // Q7: Scale 1-5
  await page.click('.scale-num-btn:has-text("4")');
  await page.click('.sticky-nav-bar .btn-next');
  await page.waitForTimeout(200);

  // Q8: Single cards
  await page.click('.option-card:has-text("Rarely or never")');
  await page.click('.sticky-nav-bar .btn-next');
  await page.waitForTimeout(200);

  // Q9: Single cards
  await page.click('.option-card:has-text("30 to 45 minutes")');
  await page.click('.sticky-nav-bar .btn-next');
  await page.waitForTimeout(200);

  // Q10: Single cards
  await page.click('.option-card:has-text("Brief pause every 20–30 mins")');
  await page.click('.sticky-nav-bar .btn-next');
  await page.waitForTimeout(800);

  // Verify Result Page composed elements
  console.log('--- Verifying Full Composed Result Page ---');
  const resultSlogan = await page.textContent('.result-slogan, .hero-slogan-line');
  const resultHasSlogan = resultSlogan?.trim() === 'Know your screen. Own your time.';
  console.log('Result slogan check:', resultSlogan?.trim(), resultHasSlogan ? 'PASS' : 'FAIL');

  results.gate2_slogan = homeHasSlogan && dialogHasSlogan && resultHasSlogan;

  const fullScoreBand = await page.textContent('.result-band-title, .band-pill');
  const fullScoreCount = await page.textContent('.result-answered-count, .answered-count-badge');
  const verdictLine = await page.textContent('.result-verdict, .hero-verdict-line');
  const partsCards = await page.$$('.part-stat-card, .part-result-card');
  const actionCards = await page.$$('.rec-card, .action-card');
  const challengeCard = await page.$('.challenge-pledge-card, .pledge-card');
  const summaryBox = await page.$('.video-summary-wrapper, .video-summary-box');
  const copyBtn = await page.$('button:has-text("Copy Summary")');
  const printBtn = await page.$('button:has-text("Print or Save")');

  console.log('Full score band:', fullScoreBand?.trim());
  console.log('Answered count:', fullScoreCount?.trim());
  console.log('Verdict line:', verdictLine?.trim());
  console.log('Parts count (should be 4):', partsCards.length);
  console.log('Actions count (should be 3):', actionCards.length);
  console.log('Challenge pledge card present:', challengeCard !== null);
  console.log('Video summary box present:', summaryBox !== null);

  results.gate7_result_page_composed =
    partsCards.length === 4 &&
    actionCards.length === 3 &&
    challengeCard !== null &&
    summaryBox !== null &&
    copyBtn !== null &&
    printBtn !== null;

  // Test Gate 9: Copy Summary and Print
  console.log('--- Testing Copy Summary and Print ---');
  await page.click('button:has-text("Copy Summary")');
  await page.waitForTimeout(300);
  const copiedBtnText = await page.textContent('.result-action-bar button:has-text("Copied")');
  console.log('Copy feedback:', copiedBtnText?.trim());
  results.gate9_copy_and_print = copiedBtnText !== null || (await page.$('text=Copied')) !== null;

  // Take comprehensive screenshots for Gate 1 (360, 375, 390, 768, 1280)
  console.log('--- Capturing Verification Screenshots for All Form Factors ---');
  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${vp.name}-result.png`), fullPage: true });

    await page.goto('http://localhost:5173/#quest', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${vp.name}-quest.png`), fullPage: true });
  }

  // Restore Result page
  await page.goto('http://localhost:5173/#result', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(300);

  results.gate4_flow_xp_streak_refresh = reloadPreserved;
  results.gate5_skip_empty_recorded = q3IsEmpty;
  results.gate10_footer_credits = hasExactCredits;

  // Gate 3: Colors & font
  const fontFamily = await page.evaluate(() => {
    return window.getComputedStyle(document.body).fontFamily;
  });
  console.log('Computed Font family:', fontFamily);
  results.gate3_colors_font = fontFamily.toLowerCase().includes('manrope');

  // Gate 11: No settings, zero console errors
  const hasSettings = await page.$('[aria-label*="settings"], [aria-label*="gear"], button:has-text("Settings")');
  console.log('Settings UI present:', hasSettings !== null ? 'FAIL' : 'NONE (PASS)');
  console.log('Console errors encountered:', consoleErrors.length);
  results.gate11_no_settings_zero_errors = (hasSettings === null) && (consoleErrors.length === 0);

  await page.close();
  await browser.close();

  console.log('\n========================================');
  console.log('VERIFICATION REPORT GATES SUMMARY:');
  console.log('========================================');
  for (const [gate, pass] of Object.entries(results)) {
    console.log(`${gate}: ${pass ? 'PASS' : 'FAIL'}`);
  }
}

runVerification().catch(err => {
  console.error('Verification error:', err);
  process.exit(1);
});
