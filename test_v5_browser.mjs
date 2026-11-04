import { chromium } from 'playwright';
import path from 'path';

async function runV5BrowserTests() {
  console.log('--- STARTING SCREEN HABITS CHECK V5 PLAYWRIGHT VERIFICATION ---');
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true
  });
  const artifactDir = 'C:\\Users\\Dell\\.gemini\\antigravity-ide\\brain\\6fad5a78-000d-47d1-a860-59a30a3b0b23';

  // =========================================================================
  // 1. Phone Viewport: 360px (Testing No-Autofill & Refusing Full Band on <5)
  // =========================================================================
  console.log('\n[1/5] Testing Phone Viewport (360x740) — Slogan, No-Autofill, Partial Score (<5)...');
  const ctx360 = await browser.newContext({
    viewport: { width: 360, height: 740 },
    deviceScaleFactor: 2
  });
  const page360 = await ctx360.newPage();
  await page360.goto('http://localhost:5190/');
  await page360.evaluate(() => localStorage.clear());
  await page360.reload();

  // Welcome dialog checks
  const dialogTitle = await page360.textContent('.dialog-title');
  const dialogSlogan = await page360.textContent('.dialog-slogan');
  console.log('Dialog Title:', dialogTitle, '| Slogan:', dialogSlogan);
  if (!dialogTitle.includes('Screen Habits Check')) {
    throw new Error('Dialog title does not match Screen Habits Check!');
  }
  if (!dialogSlogan.includes('Know your screen. Own your time.')) {
    throw new Error(`Dialog slogan does not match exact words! Found: "${dialogSlogan}"`);
  }

  // Fill name & class
  await page360.fill('#student-name-input', 'Zainab');
  await page360.fill('#student-class-input', 'Grade 9');
  await page360.click('.dialog-btn-continue');

  // Verify Q1 loaded and is completely UNSELECTED (no default 6!)
  await page360.waitForSelector('.question-card');
  const sliderUnset = await page360.textContent('.slider-unset-prompt');
  console.log('Q1 Slider unselected state text:', sliderUnset);
  if (!sliderUnset.includes('Drag slider to set your hours')) {
    throw new Error('Q1 slider was autofilled or preselected!');
  }

  // Skip Q1 without answering
  await page360.click('.skip-button');
  await page360.waitForTimeout(100);

  // Now on Q2: click Back to verify Q1 remained empty
  await page360.click('.btn-back');
  await page360.waitForTimeout(100);
  const backSliderUnset = await page360.textContent('.slider-unset-prompt');
  if (!backSliderUnset.includes('Drag slider to set your hours')) {
    throw new Error('Q1 was autofilled upon clicking Back!');
  }

  // Forward to Q2 again
  await page360.click('.btn-next');
  await page360.waitForTimeout(100);

  // Q2: select Smartphone only (Answered #1)
  await page360.click('button.chip-button:has-text("Smartphone")');
  await page360.click('.btn-next');
  await page360.waitForTimeout(100);

  // Q3: select Direct Messaging (Answered #2)
  await page360.click('.option-card:has-text("Direct Messaging")');
  await page360.click('.btn-next');
  await page360.waitForTimeout(100);

  // Q4: select Rarely (Answered #3)
  await page360.click('.option-card:has-text("Rarely")');
  await page360.click('.btn-next');
  await page360.waitForTimeout(100);

  // Skip Q5, Q6, Q7, Q8, Q9, Q10 (Total answered = 3, which is < 5!)
  for (let q = 5; q <= 10; q++) {
    await page360.waitForSelector('.question-card');
    await page360.click('.skip-button');
    await page360.waitForTimeout(100);
  }

  // Wait for result screen
  await page360.waitForSelector('.result-composed-page', { timeout: 5000 });
  console.log('Result page reached on 360px phone with 3 questions answered!');

  // Check that full band is REFUSED (< 5 answered)
  const answeredCountNotice = await page360.textContent('.answered-count-badge');
  const incompletePill = await page360.textContent('.band-pill-incomplete');
  const partialVerdict = await page360.textContent('.hero-verdict-line');
  const sloganOnResult = await page360.textContent('.hero-slogan-line');

  console.log('360px Result Answered Notice:', answeredCountNotice);
  console.log('360px Result Band Pill:', incompletePill);
  console.log('360px Result Verdict:', partialVerdict);
  console.log('360px Result Slogan:', sloganOnResult);

  if (!answeredCountNotice.includes('Score from 3 of 10 questions')) {
    throw new Error(`Answered count wrong: ${answeredCountNotice}`);
  }
  if (!incompletePill.includes('Not enough answers for a full score')) {
    throw new Error(`Full band was not refused for < 5 answers! Found: ${incompletePill}`);
  }
  if (!sloganOnResult.includes('Know your screen. Own your time.')) {
    throw new Error(`Slogan missing from result screen: ${sloganOnResult}`);
  }

  const shot360Path = path.join(artifactDir, 'v5-phone-360px.png');
  await page360.screenshot({ path: shot360Path, fullPage: true });
  console.log('Saved 360px screenshot to:', shot360Path);

  // =========================================================================
  // 2. Phone Viewport: 375px (Testing Full 8-Question Flow, Night-Heavy Weakest)
  // =========================================================================
  console.log('\n[2/5] Testing Phone Viewport (375x812) — Full Flow with Weakest-Part Diagnosis...');
  const ctx375 = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2
  });
  const page375 = await ctx375.newPage();
  await page375.goto('http://localhost:5190/');
  await page375.evaluate(() => localStorage.clear());
  await page375.reload();

  // Dialog fill
  await page375.fill('#student-name-input', 'Ayesha Khan');
  await page375.fill('#student-class-input', '10-A');
  await page375.click('.dialog-btn-continue');

  // Answer 8 questions, skip 2:
  // Q1: drag slider to 9h
  await page375.fill('.hours-slider', '9');
  await page375.dispatchEvent('.hours-slider', 'input');
  await page375.dispatchEvent('.hours-slider', 'change');
  await page375.click('.btn-next');
  await page375.waitForTimeout(80);

  // Q2: Smartphone & Laptop
  await page375.click('button.chip-button:has-text("Smartphone")');
  await page375.click('button.chip-button:has-text("Laptop")');
  await page375.click('.btn-next');
  await page375.waitForTimeout(80);

  // Q3: Social Media Feeds
  await page375.click('.option-card:has-text("Social Media Feeds")');
  await page375.click('.btn-next');
  await page375.waitForTimeout(80);

  // Q4: Skip Q4 (Skip test)
  await page375.click('.skip-button');
  await page375.waitForTimeout(80);

  // Q5: Almost every night (Night heavy)
  await page375.click('.option-card:has-text("Almost every night")');
  await page375.click('.btn-next');
  await page375.waitForTimeout(80);

  // Q6: Fall asleep with phone active (Night heavy)
  await page375.click('.option-card:has-text("Fall asleep with phone active")');
  await page375.click('.btn-next');
  await page375.waitForTimeout(80);

  // Q7: Sleep quality 1 star
  await page375.click('.scale-num-btn:has-text("1")');
  await page375.click('.btn-next');
  await page375.waitForTimeout(80);

  // Q8: Skip Q8 (Skip test)
  await page375.click('.skip-button');
  await page375.waitForTimeout(80);

  // Q9: 30 to 45 minutes
  await page375.click('.option-card:has-text("30 to 45 minutes")');
  await page375.click('.btn-next');
  await page375.waitForTimeout(80);

  // Q10: Stretch every hour or two
  await page375.click('.option-card:has-text("Stretch every hour or two")');
  await page375.click('.btn-next'); // View report!

  await page375.waitForSelector('.result-composed-page', { timeout: 5000 });
  console.log('Result page reached on 375px phone with 8 questions answered!');

  // Check answered notice
  const count375 = await page375.textContent('.answered-count-badge');
  console.log('375px Answered Notice:', count375);
  if (!count375.includes('Score from 8 of 10 questions')) {
    throw new Error(`Expected Score from 8 of 10 questions, found: ${count375}`);
  }

  // Check specific weakest-part verdict line
  const verdict375 = await page375.textContent('.hero-verdict-line');
  console.log('375px Specific Verdict Line:', verdict375);
  if (!verdict375.includes('Night & Sleep') || !verdict375.includes('Fix:')) {
    throw new Error(`Verdict line not specific to Night & Sleep! Found: ${verdict375}`);
  }

  // Check amber highlight callout class
  const hasAmberCallout = await page375.$('.verdict-box-amber');
  console.log('Verdict box has warm amber highlight callout:', !!hasAmberCallout);
  if (!hasAmberCallout) {
    throw new Error('Verdict callout missing amber highlight styling!');
  }

  // Check action buttons and honest hint
  const downloadBtn = await page375.$('#btn-download-pdf');
  const whatsappBtn = await page375.$('#btn-send-whatsapp');
  const honestHint = await page375.textContent('.action-bar-hint');
  console.log('Action buttons present:', { download: !!downloadBtn, whatsapp: !!whatsappBtn });
  console.log('Honest WhatsApp Hint:', honestHint);
  if (!honestHint.includes('Attach the downloaded PDF in the WhatsApp chat')) {
    throw new Error('Missing honest WhatsApp attach hint!');
  }

  // Check credits & companion APK link
  const credits = await page375.textContent('.footer-credits');
  console.log('Footer Credits:', credits);
  if (!credits.includes('Made by Abdul Basit (Leader), SJB, Ebad Ilyas')) {
    throw new Error('Credits do not match exact required text!');
  }

  const companionLink = await page375.getAttribute('#link-companion-apk', 'href');
  console.log('Companion APK download link:', companionLink);
  if (!companionLink || !companionLink.includes('.apk')) {
    throw new Error('Companion APK link missing or invalid!');
  }

  const shot375Path = path.join(artifactDir, 'v5-phone-375px.png');
  await page375.screenshot({ path: shot375Path, fullPage: true });
  console.log('Saved 375px screenshot to:', shot375Path);

  // =========================================================================
  // 3. Phone Viewport: 390px (Testing 390px full width & thumb reach)
  // =========================================================================
  console.log('\n[3/5] Testing Phone Viewport (390x844)...');
  const ctx390 = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2
  });
  const page390 = await ctx390.newPage();
  await page390.goto('http://localhost:5190/');
  await page390.waitForSelector('.dialog-container');
  const shot390Welcome = path.join(artifactDir, 'v5-phone-390px-welcome.png');
  await page390.screenshot({ path: shot390Welcome });
  console.log('Saved 390px welcome screenshot to:', shot390Welcome);

  // Skip dialog
  await page390.click('.dialog-close-btn');
  await page390.waitForSelector('.question-card');
  const shot390Question = path.join(artifactDir, 'v5-phone-390px-question.png');
  await page390.screenshot({ path: shot390Question });
  console.log('Saved 390px question screenshot to:', shot390Question);

  // =========================================================================
  // 4. Tablet Viewport: 768px (Testing 2-column parts grid expansion)
  // =========================================================================
  console.log('\n[4/5] Testing Tablet Viewport (768x1024)...');
  const ctxTablet = await browser.newContext({
    viewport: { width: 768, height: 1024 },
    deviceScaleFactor: 1
  });
  const pageTablet = await ctxTablet.newPage();
  await pageTablet.goto('http://localhost:5190/');
  await pageTablet.click('.dialog-close-btn');

  // Complete fast to result
  for (let i = 0; i < 10; i++) {
    await pageTablet.waitForSelector('.question-card');
    await pageTablet.click('.btn-next');
    await pageTablet.waitForTimeout(40);
  }
  await pageTablet.waitForSelector('.result-composed-page');
  const tabletColumns = await pageTablet.$eval('.parts-grid-2x2', el => {
    return window.getComputedStyle(el).gridTemplateColumns.split(' ').length;
  });
  console.log('Tablet parts grid columns:', tabletColumns);
  if (tabletColumns !== 2) {
    throw new Error(`Expected 2 columns on tablet parts grid, found ${tabletColumns}`);
  }

  const shotTabletPath = path.join(artifactDir, 'v5-tablet-768px.png');
  await pageTablet.screenshot({ path: shotTabletPath, fullPage: true });
  console.log('Saved tablet screenshot to:', shotTabletPath);

  // =========================================================================
  // 5. Desktop Viewport: 1440px (Testing Centred Wide Layout & No Settings UI)
  // =========================================================================
  console.log('\n[5/5] Testing Desktop Viewport (1440x900)...');
  const ctxDesktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });
  const pageDesktop = await ctxDesktop.newPage();
  await pageDesktop.goto('http://localhost:5190/');
  await pageDesktop.click('.dialog-close-btn');

  for (let i = 0; i < 10; i++) {
    await pageDesktop.waitForSelector('.question-card');
    await pageDesktop.click('.btn-next');
    await pageDesktop.waitForTimeout(40);
  }
  await pageDesktop.waitForSelector('.result-composed-page');

  // Measure desktop container width (proper wide width, centered, no lonely thin column)
  const desktopWidth = await pageDesktop.$eval('.main-content-result', el => el.getBoundingClientRect().width);
  console.log('Desktop container width:', desktopWidth);
  if (desktopWidth < 750 || desktopWidth > 900) {
    throw new Error(`Desktop container not proper wide width! Measured: ${desktopWidth}px`);
  }

  // Check no settings UI anywhere
  const anySettings = await pageDesktop.$('[aria-label*="settings"], [aria-label*="config"], button:has-text("Settings"), .settings-btn');
  console.log('Any settings UI found:', !!anySettings);
  if (anySettings) {
    throw new Error('Forbidden settings UI or gear icon detected!');
  }

  const shotDesktopPath = path.join(artifactDir, 'v5-desktop-1440px.png');
  await pageDesktop.screenshot({ path: shotDesktopPath, fullPage: true });
  console.log('Saved desktop screenshot to:', shotDesktopPath);

  await browser.close();
  console.log('\n=== ALL SCREEN HABITS CHECK V5 PLAYWRIGHT TESTS PASSED ===');
}

runV5BrowserTests().catch(err => {
  console.error('Playwright V5 Test Error:', err);
  process.exit(1);
});
