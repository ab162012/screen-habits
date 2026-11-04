import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

async function run() {
  console.log('--- Starting Screen Habits Companion Verification ---');
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true
  });

  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    permissions: ['notifications'],
    userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
  });

  const page = await context.newPage();

  // 1. Load app - should show Permission screen on first launch
  console.log('1. Loading http://localhost:5195/ ...');
  await page.goto('http://localhost:5195/', { waitUntil: 'networkidle' });

  // Verify permission screen
  const permissionTitle = await page.textContent('h1');
  console.log('Permission title:', permissionTitle);
  if (!permissionTitle?.includes('Quiet, Helpful Reminders')) {
    throw new Error('Permission screen title mismatch: ' + permissionTitle);
  }
  await page.screenshot({ path: 'companion-01-permission.png', fullPage: true });
  console.log('Saved companion-01-permission.png');

  // Tap "Allow Reminders"
  console.log('2. Tapping Allow Reminders...');
  await page.click('#btn-allow-notifications');
  await page.waitForTimeout(400);

  // 2. Home Dashboard
  console.log('3. Verifying Home Dashboard...');
  const homeHeader = await page.textContent('h1');
  console.log('Home greeting:', homeHeader);

  // Verify 2x2 grid
  const nextReminder = await page.$('#card-next-reminder');
  const todayCheckin = await page.$('#card-today-checkin');
  const lastScore = await page.$('#card-last-score');
  const quickActions = await page.$('#card-quick-actions');
  const thisWeek = await page.$('#card-this-week');

  if (!nextReminder || !todayCheckin || !lastScore || !quickActions || !thisWeek) {
    throw new Error('Home 2x2 grid or This Week card missing!');
  }

  // Check footer credits
  const footerText = await page.textContent('footer');
  console.log('Footer text:', footerText?.trim());
  const expectedFooter = 'Made by Abdul Basit (Leader), SJB, Ebad Ilyas, Haider.';
  if (footerText?.trim() !== expectedFooter) {
    throw new Error(`Footer credits mismatch! Got: "${footerText?.trim()}", Expected: "${expectedFooter}"`);
  }
  console.log('✓ Home footer credit verified exactly.');

  await page.screenshot({ path: 'companion-02-home.png', fullPage: true });
  console.log('Saved companion-02-home.png');

  // 3. Reminders Screen
  console.log('4. Navigating to Reminders screen...');
  await page.click('#nav-reminders');
  await page.waitForTimeout(300);

  const remindersHeader = await page.textContent('h1');
  console.log('Reminders header:', remindersHeader);

  const breaksCard = await page.$('#card-reminder-breaks');
  const bedtimeCard = await page.$('#card-reminder-bedtime');
  const morningCard = await page.$('#card-reminder-morning');
  const weeklyCard = await page.$('#card-reminder-weekly');
  const quietHoursCard = await page.$('#card-quiet-hours');

  if (!breaksCard || !bedtimeCard || !morningCard || !weeklyCard || !quietHoursCard) {
    throw new Error('One of the 4 reminder cards or quiet hours card is missing!');
  }
  console.log('✓ 4 reminder cards and quiet hours verified.');

  // Test toggling
  await page.click('#card-reminder-breaks label');
  await page.waitForTimeout(200);
  await page.click('#card-reminder-breaks label'); // toggle back
  await page.waitForTimeout(200);

  await page.screenshot({ path: 'companion-03-reminders.png', fullPage: true });
  console.log('Saved companion-03-reminders.png');

  // 4. Check-in Screen
  console.log('5. Navigating to Check-in screen...');
  await page.click('#nav-home');
  await page.waitForTimeout(200);
  await page.click('#card-today-checkin');
  await page.waitForTimeout(300);

  const checkInTitle = await page.textContent('h1');
  console.log('Check-in question:', checkInTitle);
  if (!checkInTitle?.includes('How did your screen habits feel today?')) {
    throw new Error('Check-in title mismatch: ' + checkInTitle);
  }

  await page.screenshot({ path: 'companion-04-checkin.png', fullPage: true });
  console.log('Saved companion-04-checkin.png');

  // Tap an option
  console.log('Tapping option "Rested & mindful"...');
  await page.click('#checkin-opt-rested');
  await page.waitForTimeout(800); // Wait for auto return to Home

  // 5. Weekly Summary Screen
  console.log('6. Navigating to Weekly Summary...');
  await page.click('#nav-summary');
  await page.waitForTimeout(300);

  const summaryHeader = await page.textContent('h1');
  console.log('Summary header:', summaryHeader);

  const statCheckins = await page.$('#stat-checkins');
  const statBestDay = await page.$('#stat-best-day');
  const statBreaks = await page.$('#stat-breaks');
  const statBedtime = await page.$('#stat-bedtime');
  const questionnaireCta = await page.$('#card-questionnaire-cta');

  if (!statCheckins || !statBestDay || !statBreaks || !statBedtime || !questionnaireCta) {
    throw new Error('Summary 2x2 stat cards or questionnaire CTA missing!');
  }
  console.log('✓ Summary 2x2 cards and questionnaire card verified.');

  await page.screenshot({ path: 'companion-05-summary.png', fullPage: true });
  console.log('Saved companion-05-summary.png');

  // 6. About Modal
  console.log('7. Opening About modal...');
  await page.click('#nav-home');
  await page.waitForTimeout(200);
  await page.click('#btn-open-about');
  await page.waitForTimeout(300);

  const creditsText = await page.textContent('#credits-card');
  console.log('Credits card text:', creditsText?.trim());
  const expectedAbout = 'Made by — Leader: Abdul Basit. Team: SJB, Ebad Ilyas, Haider.';
  if (!creditsText?.includes(expectedAbout)) {
    throw new Error(`About credits mismatch! Got: "${creditsText?.trim()}", Expected to include: "${expectedAbout}"`);
  }
  console.log('✓ About credits verified exactly.');

  await page.screenshot({ path: 'companion-06-about.png', fullPage: true });
  console.log('Saved companion-06-about.png');

  await browser.close();
  console.log('--- All tests passed successfully! ---');
}

run().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
