// Automated verification test script for Screen Habits Check v5
import { QUESTIONS, calculateReport, formatAnswerForSummary, DISCLAIMER_TEXT, APP_SLOGAN } from './src/questions.ts';
import { generatePdfDocument } from './src/services/pdfReport.ts';

console.log('=== STARTING SCREEN HABITS CHECK V5 SYSTEM VERIFICATION ===\n');

let failedTests = 0;
function assert(condition, message) {
  if (condition) {
    console.log(`✓ PASS: ${message}`);
  } else {
    console.error(`✗ FAIL: ${message}`);
    failedTests++;
  }
}

// GATE 1: Verify exact slogan
console.log('--- Testing App Slogan (Section 2) ---');
assert(APP_SLOGAN === 'Know your screen. Own your time.', `Exact slogan matches: "${APP_SLOGAN}"`);

// GATE 2: Verify exactly 10 questions across the 4 specified parts
console.log('\n--- Testing Question Set (Section 2) ---');
assert(QUESTIONS.length === 10, `Exactly 10 questions defined (found ${QUESTIONS.length})`);

const partCounts = [0, 0, 0, 0];
QUESTIONS.forEach(q => partCounts[q.partIndex]++);
assert(partCounts[0] === 2, `Part 1 (Devices & Time) has 2 questions (found ${partCounts[0]})`);
assert(partCounts[1] === 3, `Part 2 (Apps & Scrolling) has 3 questions (found ${partCounts[1]})`);
assert(partCounts[2] === 2, `Part 3 (Night & Sleep) has 2 questions (found ${partCounts[2]})`);
assert(partCounts[3] === 3, `Part 4 (Body & Focus) has 3 questions (found ${partCounts[3]})`);

// Check all questions are skippable and have NO default values
QUESTIONS.forEach((q, idx) => {
  assert(!q.isRequired, `Question ${idx + 1} (${q.id}) is skippable`);
  assert(q.defaultValue === undefined, `Question ${idx + 1} (${q.id}) has NO defaultValue (no autofill)`);
});

// GATE 3: Verify Answer Types
const answerTypes = QUESTIONS.map(q => q.type);
assert(answerTypes.filter(t => t === 'slider').length === 1, 'Contains exactly 1 hours slider');
assert(answerTypes.filter(t => t === 'multi-chips').length === 1, 'Contains exactly 1 multi-choice chips');
assert(answerTypes.filter(t => t === 'scale-1-to-5').length === 1, 'Contains exactly 1 1-to-5 scale');
assert(answerTypes.filter(t => t === 'single-cards').length === 7, 'Contains exactly 7 single-choice cards');

// GATE 4: Report Logic — Skipped Means Empty, Score Means Answered Only (Section 4)
console.log('\n--- Testing Report Logic & Partial Score (Section 4) ---');

// Case A: 0 questions answered (all skipped)
const emptyAnswers = {};
const emptyReport = calculateReport(emptyAnswers);
assert(emptyReport.answeredCount === 0, `Empty answers count is 0 (found ${emptyReport.answeredCount})`);
assert(emptyReport.isPartial === true, 'Empty answers marked as isPartial === true');
assert(emptyReport.band === 'Incomplete', 'Empty answers receive band "Incomplete" (no full band)');
assert(emptyReport.bandDescription.includes('Not enough answers for a full score'), 'Empty answers description states "Not enough answers for a full score"');

// Case B: 3 questions answered (< 5 questions answered -> Refuses full score band!)
const threeAnswers = {
  q1: 2.0, // 25 pts
  q2: ['phone'], // 25 pts
  q3: 'work' // 25 pts
};
const threeReport = calculateReport(threeAnswers);
assert(threeReport.answeredCount === 3, `Answered count is 3 (found ${threeReport.answeredCount})`);
assert(threeReport.isPartial === true, 'Fewer than 5 answers marked as isPartial === true');
assert(threeReport.band === 'Incomplete', 'Fewer than 5 answers refuse full score band (band: "Incomplete")');
assert(threeReport.bandDescription.includes('Not enough answers for a full score'), 'Fewer than 5 answers states "Not enough answers for a full score"');

// Case C: 6 questions answered (>= 5 questions answered -> Scaled across answered only!)
const sixAnswers = {
  q1: 2.5, // 25 pts
  q2: ['phone'], // 25 pts
  q3: 'work', // 25 pts
  q4: 'rarely', // 25 pts
  q5: 'rarely', // 25 pts
  q6: 'no_screens' // 25 pts
};
const sixReport = calculateReport(sixAnswers);
assert(sixReport.answeredCount === 6, `Answered count is 6 (found ${sixReport.answeredCount})`);
assert(sixReport.isPartial === false, '6 answers has isPartial === false');
assert(sixReport.totalScore === 100, `Score is scaled across answered questions only (100% of 6 answered = 100, found: ${sixReport.totalScore})`);
assert(sixReport.band === 'Thriving', `Full score band granted for 6 answered questions (band: ${sixReport.band})`);

// GATE 5: Scoring Algorithm & Bands for Full Check (10 answered)
console.log('\n--- Testing Full 10-Question Score Bands ---');
const healthyAnswers = {
  q1: 2.5,
  q2: ['phone'],
  q3: 'work',
  q4: 'rarely',
  q5: 'rarely',
  q6: 'no_screens',
  q7: 5,
  q8: 'rarely',
  q9: 'deep',
  q10: 'frequent'
};
const thrivingReport = calculateReport(healthyAnswers);
assert(thrivingReport.totalScore >= 80, `Healthy answers score in Thriving (score: ${thrivingReport.totalScore})`);
assert(thrivingReport.band === 'Thriving', `Band is Thriving (band: ${thrivingReport.band})`);

const balancedAnswers = {
  q1: 6.0,
  q2: ['phone', 'laptop'],
  q3: 'messaging',
  q4: 'few_times',
  q5: '1_2',
  q6: 'dim_brief',
  q7: 4,
  q8: 'occasional',
  q9: 'moderate',
  q10: 'hourly'
};
const balancedReport = calculateReport(balancedAnswers);
assert(balancedReport.totalScore >= 60 && balancedReport.totalScore <= 79, `Moderate answers score in Balanced (score: ${balancedReport.totalScore})`);
assert(balancedReport.band === 'Balanced', `Band is Balanced (band: ${balancedReport.band})`);

const strainedAnswers = {
  q1: 9.0,
  q2: ['phone', 'laptop', 'tablet'],
  q3: 'social',
  q4: 'frequently',
  q5: '3_5',
  q6: 'until_lights',
  q7: 3,
  q8: 'regular',
  q9: 'short',
  q10: 'seldom'
};
const strainedReport = calculateReport(strainedAnswers);
assert(strainedReport.totalScore >= 40 && strainedReport.totalScore <= 59, `Heavy answers score in Strained (score: ${strainedReport.totalScore})`);
assert(strainedReport.band === 'Strained', `Band is Strained (band: ${strainedReport.band})`);

const overloadedAnswers = {
  q1: 14.0,
  q2: ['phone', 'laptop', 'tablet', 'tv'],
  q3: 'short_video',
  q4: 'constantly',
  q5: 'every_night',
  q6: 'fall_asleep',
  q7: 1,
  q8: 'frequent',
  q9: 'distracted',
  q10: 'nonstop'
};
const overloadedReport = calculateReport(overloadedAnswers);
assert(overloadedReport.totalScore < 40, `Overloaded answers score < 40 (score: ${overloadedReport.totalScore})`);
assert(overloadedReport.band === 'Overloaded', `Band is Overloaded (band: ${overloadedReport.band})`);

// GATE 6: Specific Verdict Lines (Prompt v5 Section 1 & 4)
console.log('\n--- Testing Specific Verdict Lines ---');
const nightHeavyAnswers = {
  ...balancedAnswers,
  q5: 'every_night',
  q6: 'fall_asleep',
  q7: 1
};
const nightReport = calculateReport(nightHeavyAnswers);
assert(nightReport.weakestPartTitle === 'Night & Sleep', `Weakest part identified as Night & Sleep (found: ${nightReport.weakestPartTitle})`);
assert(nightReport.verdictLine.includes('Night & Sleep') && nightReport.verdictLine.includes('Fix:'), `Verdict line names Night & Sleep and specific fix`);

// GATE 7: Top 3 Recommendations
console.log('\n--- Testing Recommendations ---');
assert(strainedReport.recommendations.length === 3, `Top recommendations count is exactly 3`);
strainedReport.recommendations.forEach((rec, i) => {
  assert(typeof rec.title === 'string' && rec.title.length > 0, `Rec #${i + 1} has title: ${rec.title}`);
  assert(typeof rec.action === 'string' && rec.action.length > 0, `Rec #${i + 1} has action text`);
  assert(typeof rec.tinyFirstStep === 'string' && rec.tinyFirstStep.length > 0, `Rec #${i + 1} has tiny first step`);
});

// GATE 8: Disclaimer
console.log('\n--- Testing Disclaimer ---');
const expectedDisclaimer = 'This is a habits guide, not medical advice. For ongoing eye pain, headaches, or sleep problems, see a professional.';
assert(DISCLAIMER_TEXT === expectedDisclaimer, 'Disclaimer text matches exact specification');

// GATE 9: Sheets Formatting — Skipped questions MUST record as "Skipped"
console.log('\n--- Testing Sheets formatting (Skipped recorded as "Skipped") ---');
QUESTIONS.forEach((q, idx) => {
  const skippedFormatted = formatAnswerForSummary(q, undefined);
  assert(skippedFormatted === 'Skipped', `Unanswered Q${idx + 1} formats strictly as "Skipped" (found: "${skippedFormatted}")`);
});

// GATE 10: PDF Generation with Slogan and Skipped Marks
console.log('\n--- Testing PDF Generation ---');
const partialDoc = generatePdfDocument(threeReport, threeAnswers, { name: 'Ayesha Khan', classSection: '10-A' });
assert(partialDoc !== null && partialDoc.getNumberOfPages() === 1, 'Generates 1-page PDF for partial report');

const fullDoc = generatePdfDocument(balancedReport, balancedAnswers, { name: 'Alex Morgan', classSection: '10-B' });
assert(fullDoc !== null && fullDoc.getNumberOfPages() === 1, 'Generates 1-page PDF for full report');

console.log(`\n=== VERIFICATION FINISHED: ${failedTests} FAILURES ===`);
if (failedTests > 0) process.exit(1);
