import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function runBrowserTests() {
  console.log('--- STARTING PLAYWRIGHT BROWSER VERIFICATION (PROMPT V4) ---');
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true
  });
  const artifactDir = 'C:\\Users\\Dell\\.gemini\\antigravity-ide\\brain\\6fad5a78-000d-47d1-a860-59a30a3b0b23';

  // 1. Mobile Viewport 375px
  console.log('\n[1/2] Testing Mobile Viewport (375x812)...');
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2
  });
  const mobilePage = await mobileContext.newPage();
  
  // Clear localStorage before start
  await mobilePage.goto('http://localhost:5190/');
  await mobilePage.evaluate(() => localStorage.clear());
  await mobilePage.reload();

  // Dialog check
  const dialogTitle = await mobilePage.textContent('.dialog-title');
  console.log('Dialog opened with title:', dialogTitle);
  if (!dialogTitle.includes('Welcome')) {
    throw new Error('Name & Class dialog failed to open!');
  }

  // Fill profile
  await mobilePage.fill('#student-name-input', 'Ayesha Khan');
  await mobilePage.fill('#student-class-input', '10-A');
  await mobilePage.click('.dialog-btn-continue');

  // Verify Q1 loaded
  await mobilePage.waitForSelector('.question-card');
  console.log('Q1 reached successfully after dialog confirm.');

  // Answer questions to simulate Night-heavy strain
  // Q1 (slider): 8 hrs
  await mobilePage.click('.btn-next'); // next to Q2
  await mobilePage.waitForTimeout(100);

  // Q2 (multi-chips): pick phone & laptop
  await mobilePage.click('button.chip-button:has-text("Smartphone")');
  await mobilePage.click('.btn-next');
  await mobilePage.waitForTimeout(100);

  // Q3: Social media
  await mobilePage.click('.option-card:has-text("Social Media Feeds")');
  await mobilePage.click('.btn-next');
  await mobilePage.waitForTimeout(100);

  // Q4: Frequently check
  await mobilePage.click('.option-card:has-text("Frequently")');
  await mobilePage.click('.btn-next');
  await mobilePage.waitForTimeout(100);

  // Q5: Late night scroll every night (Night heavy)
  await mobilePage.click('.option-card:has-text("Almost every night")');
  await mobilePage.click('.btn-next');
  await mobilePage.waitForTimeout(100);

  // Q6: Phone until eyes close
  await mobilePage.click('.option-card:has-text("Fall asleep with phone active")');
  await mobilePage.click('.btn-next');
  await mobilePage.waitForTimeout(100);

  // Q7: Sleep quality 1 star
  await mobilePage.click('.scale-num-btn:has-text("1")');
  await mobilePage.click('.btn-next');
  await mobilePage.waitForTimeout(100);

  // Q8: Eye strain occasional
  await mobilePage.click('.option-card:has-text("Occasional mild tired eyes")');
  await mobilePage.click('.btn-next');
  await mobilePage.waitForTimeout(100);

  // Q9: Focus 30-45 mins
  await mobilePage.click('.option-card:has-text("30 to 45 minutes")');
  await mobilePage.click('.btn-next');
  await mobilePage.waitForTimeout(100);

  // Q10: Breaks seldom
  await mobilePage.click('.option-card:has-text("Stretch every hour or two")');
  await mobilePage.click('.btn-next'); // View balance report

  // Wait for result screen
  await mobilePage.waitForSelector('.result-composed-page', { timeout: 5000 });
  console.log('Result page reached on mobile!');

  // Check chips: Name and Class
  const nameChip = await mobilePage.textContent('.chip-name');
  const classChip = await mobilePage.textContent('.chip-class');
  console.log('Profile Chips:', nameChip, '|', classChip);

  // Check specific verdict line
  const verdictLine = await mobilePage.textContent('.hero-verdict-line');
  console.log('Mobile Hero Verdict Line:', verdictLine);
  if (!verdictLine.includes('Night & Sleep') || !verdictLine.includes('Fix:')) {
    throw new Error(`Verdict line was not specific to Night & Sleep! Found: ${verdictLine}`);
  }

  // Check parts cards count
  const partCards = await mobilePage.$$('.part-grid-card');
  console.log('Part cards count:', partCards.length);
  if (partCards.length !== 4) {
    throw new Error(`Expected 4 part cards, found ${partCards.length}`);
  }

  // Check top 3 actions count
  const actionCards = await mobilePage.$$('.action-tinted-card');
  console.log('Top action cards count:', actionCards.length);
  if (actionCards.length !== 3) {
    throw new Error(`Expected 3 action cards, found ${actionCards.length}`);
  }

  // Check action bar is visible and sticky on mobile
  const downloadBtn = await mobilePage.$('#btn-download-pdf');
  const whatsappBtn = await mobilePage.$('#btn-send-whatsapp');
  const shareBtn = await mobilePage.$('#btn-share-pdf');
  console.log('Action buttons present:', {
    downloadPdf: !!downloadBtn,
    whatsapp: !!whatsappBtn,
    sharePdf: !!shareBtn
  });

  // Check plain honest hint
  const hintText = await mobilePage.textContent('.action-bar-hint');
  console.log('WhatsApp attach hint:', hintText);

  // Check credits
  const creditsText = await mobilePage.textContent('.footer-credits');
  console.log('Footer credits:', creditsText);
  if (!creditsText.includes('Made by Abdul Basit (Leader), SJB, Ebad Ilyas')) {
    throw new Error('Credits do not match exact required text!');
  }

  // Check companion APK link
  const apkLink = await mobilePage.$('#link-companion-apk');
  const apkHref = apkLink ? await apkLink.getAttribute('href') : null;
  console.log('Companion APK link:', apkHref);

  // Take mobile screenshot
  const mobileScreenshotPath = path.join(artifactDir, 'v4-mobile-result-375px.png');
  await mobilePage.screenshot({ path: mobileScreenshotPath, fullPage: true });
  console.log('Saved mobile screenshot to:', mobileScreenshotPath);

  // 2. Desktop Viewport 1440px
  console.log('\n[2/2] Testing Desktop Viewport (1440x900)...');
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto('http://localhost:5190/');

  // Confirm dialog
  await desktopPage.waitForSelector('.dialog-container');
  await desktopPage.fill('#student-name-input', 'Dr. Farooq');
  await desktopPage.fill('#student-class-input', 'Faculty');
  await desktopPage.click('.dialog-btn-continue');

  // Complete fast to result
  for (let i = 0; i < 10; i++) {
    await desktopPage.waitForSelector('.question-card');
    await desktopPage.click('.btn-next');
    await desktopPage.waitForTimeout(50);
  }

  await desktopPage.waitForSelector('.result-composed-page', { timeout: 5000 });
  console.log('Desktop result page reached!');

  // Measure result container width on desktop
  const resultBox = await desktopPage.$eval('.main-content-result', el => {
    const rect = el.getBoundingClientRect();
    return { width: rect.width, left: rect.left, right: window.innerWidth - rect.right };
  });
  console.log('Desktop container metrics:', resultBox);
  if (resultBox.width < 750 || resultBox.width > 920) {
    throw new Error(`Desktop container width not balanced! Width was ${resultBox.width}px`);
  }

  // Verify parts grid is 2x2 on desktop
  const gridColumns = await desktopPage.$eval('.parts-grid-2x2', el => {
    return window.getComputedStyle(el).gridTemplateColumns.split(' ').length;
  });
  console.log('Desktop parts grid columns:', gridColumns);
  if (gridColumns !== 2) {
    throw new Error(`Expected 2 columns on desktop parts grid, found ${gridColumns}`);
  }

  // Check no settings icon anywhere
  const gearIcon = await desktopPage.$('[aria-label*="settings"], [aria-label*="config"], button:has-text("Settings"), .settings-btn');
  console.log('Any settings UI found:', !!gearIcon);
  if (gearIcon) {
    throw new Error('Settings UI or icon found! Violates strict ban.');
  }

  // Take desktop screenshot
  const desktopScreenshotPath = path.join(artifactDir, 'v4-desktop-result-1440px.png');
  await desktopPage.screenshot({ path: desktopScreenshotPath, fullPage: true });
  console.log('Saved desktop screenshot to:', desktopScreenshotPath);

  await browser.close();
  console.log('\n=== ALL PLAYWRIGHT BROWSER VERIFICATIONS PASSED SUCCESSFULLY ===');
}

runBrowserTests().catch(err => {
  console.error('Browser test failed:', err);
  process.exit(1);
});
