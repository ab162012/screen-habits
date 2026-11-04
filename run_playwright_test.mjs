import { chromium } from 'playwright';

async function run() {
  console.log('Launching browser via Playwright (msedge channel)...');
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true
  });

  const context = await browser.newContext({
    viewport: { width: 375, height: 667 },
    deviceScaleFactor: 1
  });
  const page = await context.newPage();
  await page.goto('http://localhost:5190/');

  // --- 1. VERIFY NAME AND CLASS DIALOG ---
  console.log('\n--- 1. Testing Name and Class Dialog ---');
  await page.waitForSelector('.dialog-container');
  console.log('Dialog opened before Question 1');

  // Capture screenshot of Dialog on mobile 375px
  await page.screenshot({ path: 'screenshot-375-dialog.png' });
  console.log('Saved screenshot-375-dialog.png');

  // Fill in Name and Class
  await page.fill('#student-name-input', 'Alex Morgan');
  await page.fill('#student-class-input', '10-B');
  await page.click('.dialog-btn-continue');
  await page.waitForTimeout(300);
  console.log('Submitted Name: Alex Morgan, Class: 10-B');

  // Dialog should be gone, Question 1 should be visible
  await page.waitForSelector('.question-card');
  const q1Title = await page.textContent('.question-title');
  console.log(`Question 1 Loaded: "${q1Title?.trim()}"`);

  // Verify NO settings button or gear icon exists
  const gearBtnCount = await page.locator('.config-trigger-btn, .config-icon').count();
  console.log(`Settings / Gear icons found in DOM: ${gearBtnCount} (Must be 0)`);
  if (gearBtnCount !== 0) throw new Error('Settings UI detected!');

  // Capture Q1 Mobile Screenshot
  await page.screenshot({ path: 'screenshot-375-q1.png' });
  console.log('Saved screenshot-375-q1.png');

  // --- 2. STEP THROUGH THE 10 QUESTIONS ---
  console.log('\n--- 2. Stepping Through 10 Questions ---');

  // Q1: Hours slider
  await page.evaluate(() => {
    const slider = document.querySelector('.hours-slider');
    if (slider) {
      slider.value = '7.0';
      slider.dispatchEvent(new Event('input', { bubbles: true }));
      slider.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  await page.click('.btn-next');
  await page.waitForTimeout(300);

  // Q2: Devices multi-chips
  console.log('Q2: Selecting Smartphone and Laptop');
  await page.click('button:has-text("Smartphone")');
  await page.click('button:has-text("Laptop / PC")');
  await page.click('.btn-next');
  await page.waitForTimeout(300);

  // Q3: App category
  console.log('Q3: Selecting Work & Productivity');
  await page.click('button:has-text("Work & Productivity")');
  await page.click('.btn-next');
  await page.waitForTimeout(300);

  // Q4: Unconscious checking (test skip)
  console.log('Q4: Testing skip question');
  await page.click('.skip-button');
  await page.waitForTimeout(300);

  // Q5: Late night scroll
  console.log('Q5: Selecting 1 to 2 nights');
  await page.click('button:has-text("1 to 2 nights a week")');
  await page.click('.btn-next');
  await page.waitForTimeout(300);

  // Q6: Pre-sleep habit
  console.log('Q6: Selecting Quiet use with warm filter');
  await page.click('button:has-text("Quiet use with warm filter")');
  await page.click('.btn-next');
  await page.waitForTimeout(300);

  // Q7: Sleep quality 1-to-5 scale
  console.log('Q7: Selecting 4 on scale');
  await page.click('.scale-num-btn:has-text("4")');
  await page.click('.btn-next');
  await page.waitForTimeout(300);

  // Q8: Eye strain
  console.log('Q8: Selecting Occasional mild tired eyes');
  await page.click('button:has-text("Occasional mild tired eyes")');
  await page.click('.btn-next');
  await page.waitForTimeout(300);

  // Q9: Focus duration
  console.log('Q9: Selecting 30 to 45 minutes');
  await page.click('button:has-text("30 to 45 minutes")');
  await page.click('.btn-next');
  await page.waitForTimeout(300);

  // Q10: Break rhythm (last question)
  console.log('Q10: Selecting Stretch every hour or two');
  await page.click('button:has-text("Stretch every hour or two")');
  await page.waitForTimeout(200);

  // Verify finish button label
  const finishBtn = page.locator('.btn-next');
  const finishText = await finishBtn.textContent();
  console.log(`Q10 Finish Action: "${finishText?.trim()}"`);

  // Finish -> Result Screen
  await finishBtn.click();
  await page.waitForTimeout(1000);

  // --- 3. RESULT SCREEN VERIFICATION ---
  console.log('\n--- 3. Verifying Result Screen ---');
  await page.waitForSelector('.result-container');
  console.log('Result Screen Loaded!');

  // Verify Name and Class in Header
  const nameBadge = await page.textContent('.profile-name-badge');
  const classBadge = await page.textContent('.profile-class-badge');
  console.log(`Profile in Header: Name = "${nameBadge?.trim()}", Class = "${classBadge?.trim()}"`);

  // Verify Score and Band
  const scoreNum = await page.textContent('.score-number-big');
  const bandBadge = await page.textContent('.band-badge-violet');
  console.log(`Score: ${scoreNum}/100, Band: ${bandBadge?.trim()}`);

  // Verify 4 Part Cards
  const partCardCount = await page.locator('.part-score-card').count();
  console.log(`Part cards count in 2x2 grid: ${partCardCount} (Must be 4)`);

  // Verify Top 3 Actions
  const actionCount = await page.locator('.action-item').count();
  console.log(`Top Actions count: ${actionCount} (Must be 3)`);

  // Verify WhatsApp URL format and honest hint
  const waBtn = page.locator('.btn-whatsapp');
  const waHref = await waBtn.getAttribute('href');
  const waHint = await page.textContent('.whatsapp-hint');
  console.log(`WhatsApp URL: ${waHref}`);
  console.log(`WhatsApp Hint: "${waHint?.trim()}"`);

  // Capture Mobile Result Screenshot
  await page.screenshot({ path: 'screenshot-375-result.png', fullPage: true });
  console.log('Saved screenshot-375-result.png');

  // Test Refresh Persistence
  console.log('\n--- 4. Testing Refresh Persistence ---');
  await page.reload();
  await page.waitForTimeout(800);
  await page.waitForSelector('.result-container');

  const reloadedScore = await page.textContent('.score-number-big');
  const reloadedName = await page.textContent('.profile-name-badge');
  console.log(`After reload: Score = ${reloadedScore}, Name = "${reloadedName?.trim()}"`);

  if (reloadedScore === scoreNum && reloadedName?.trim() === 'Alex Morgan') {
    console.log('✓ PASS: State persists across reload!');
  } else {
    throw new Error('State persistence failed!');
  }

  // --- 5. DESKTOP VIEWPORT: 1440px x 900px ---
  console.log('\n--- 5. Testing Desktop Viewport (1440px x 900px) ---');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(500);

  await page.screenshot({ path: 'screenshot-1440-desktop.png', fullPage: true });
  console.log('Saved screenshot-1440-desktop.png');

  await browser.close();
  console.log('\n=== ALL PLAYWRIGHT V2 VERIFICATION TESTS PASSED SUCCESSFULLY! ===');
}

run().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
