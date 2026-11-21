import React from 'react';
import { PillButton } from './PillButton';
import { Reveal } from './Reveal';

interface ResearchPageProps {
  onNavigate: (route: string) => void;
}

/** Research & Expert Insights. Everything factual comes from the two
    sources named on the page — WHO (2019) and the American Academy
    of Pediatrics (2026) — plus the site's own expert guide. Findings,
    recommendations, and our own suggestions are kept apart. No
    invented research, statistics, quotes, or interviews. */
const RESEARCH_SECTIONS = [
  {
    num: '01',
    heading: 'World Health Organization guidance',
    detail:
      'Finding: the World Health Organization has never set a single screen-time limit for school-age children. Its Guidelines on Physical Activity, Sedentary Behaviour and Sleep (2019) treat sleep, physical activity, and limited screen use as one picture: screens should not take the place of sleep or movement. Recommendation: protect sleep, keep active, and limit sedentary screen time — especially before bed. The WHO\u2019s specific numbers — no sedentary screen time under age two except video calls with family, and no more than one hour a day for ages two to five — belong to young children only. They say nothing about a teenager, and this site never quotes them as school-age guidance.'
  },
  {
    num: '02',
    heading: 'American Academy of Pediatrics guidance',
    detail:
      'Finding: in February 2026 the American Academy of Pediatrics moved away from strict hour limits for children aged six and over. Recommendation: replace the limit with a family media plan — an agreement made together at home that prioritises sleep, physical activity, and face-to-face time over counting hours. The plan names the non-negotiables first — sleep, homework, meals together, time with friends in person — and fits screens around them, with screens out of bedrooms overnight. Our suggestion: a plan works where a limit fails because a plan is an agreement you helped make, and an agreement is easier to keep than a rule imposed on you.'
  },
  {
    num: '03',
    heading: 'Research on sleep and screen use',
    detail:
      'Finding: screens before bed delay sleep. Bright light limits melatonin — the hormone that tells your body the day is ending — and fast, exciting content keeps the brain alert after the screen goes dark. Teenagers need eight to ten hours of sleep a night, and a phone in bed is the most common reason they do not get it. Recommendation: protect the last hour of the day. Our suggestion: a 9pm screen cut-off — screens off at 9pm, dim warm light, the phone charged across the room — because it is a boundary you can keep, not a number you have to count. (Sources: WHO 2019; AAP 2026.)'
  },
  {
    num: '04',
    heading: 'Research on digital eye strain',
    detail:
      'Finding: staring at a screen, you blink less and the muscle that focuses up close stays clenched, which leaves eyes dry and focus unsteady by the end of the day. Recommendation: the 20-20-20 rule — every twenty minutes, look at something at least twenty feet away for twenty seconds — plus complete blinks, an arm\u2019s length of distance, and screen brightness matched to the room. Our suggestion: tie the look-away to something that already happens, like finishing a page or a problem, so it becomes automatic. If headaches, blurred vision, or eye pain keep returning even with regular breaks, get your eyes checked. (Source: standard eye-health guidance, as set out in the site\u2019s eyes guide.)'
  },
  {
    num: '05',
    heading: 'Research on physical activity and sedentary behaviour',
    detail:
      'Finding: the World Health Organization\u2019s guidance treats physical activity and limited sedentary behaviour as part of the same picture as sleep — the three belong together. Recommendation: spread movement through the day and keep screen time from swallowing it. There is no single fixed number of active minutes that fits every school-age child; the guidance is about balance, not a target on a chart. Our suggestion: move in every break, leave the phone behind when you do, and keep at least part of each day screen-free on purpose. (Source: WHO Guidelines on Physical Activity, Sedentary Behaviour and Sleep, 2019.)'
  },
  {
    num: '06',
    heading: 'Expert perspectives and interviews',
    detail:
      'No interviews have been conducted yet. When the team speaks with a teacher, a health professional, or another expert, the interview will be published here with the person\u2019s name and role — and nothing will be quoted that was not actually said. Until then, this section stays empty on purpose: an invented quote would be worse than no quote at all.'
  }
];

export const ResearchPage: React.FC<ResearchPageProps> = ({ onNavigate }) => {
  return (
    <div className="articles-page-wrapper">
      <section className="articles-header" aria-labelledby="research-title">
        <span className="eyebrow">Research &amp; Expert Insights</span>
        <h1 id="research-title" className="section-headline">
          <span className="section-emoji" aria-hidden="true">🔬</span> Research &amp; Expert Insights
        </h1>
        <p className="articles-intro">
          What the experts actually say — and how to tell the difference
          between a finding, a recommendation, and our own suggestion. A
          finding is what research shows. A recommendation is what a
          health body advises. A suggestion is what we think works in
          practice. Every factual claim on this page names its source.
        </p>
      </section>

      <div className="article-steps-list">
        {RESEARCH_SECTIONS.map((section) => (
          <Reveal key={section.num}>
            <section className="article-body-step article-step-block article-step-item">
              <span className="article-step-num" aria-hidden="true">{section.num}</span>
              <div className="article-step-body">
                <h2 className="article-step-heading">{section.heading}</h2>
                <p className="article-step-detail">{section.detail}</p>
              </div>
            </section>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <section className="article-body-step article-step-block article-step-item">
          <span className="article-step-num" aria-hidden="true">07</span>
          <div className="article-step-body">
            <h2 className="article-step-heading">References and external reading</h2>
            <p className="article-step-detail">
              World Health Organization — Guidelines on Physical Activity, Sedentary Behaviour and Sleep for Children Under 5 Years of Age (2019). American Academy of Pediatrics — guidance on children\u2019s media use, updated February 2026, including the move from strict hour limits to family media plans for children aged six and over. The site\u2019s own expert guide, &ldquo;What the experts say about screens&rdquo;, sets out the same guidance in full, with a section on how to check the next alarming number you see.
            </p>
          </div>
        </section>
      </Reveal>

      <div className="articles-preview-footer">
        <PillButton
          label="Read the expert guide"
          variant="primary"
          arrow
          onClick={() => onNavigate('article/what-the-experts-say')}
        />
        <PillButton
          label="How screens affect health"
          variant="secondary"
          arrow
          onClick={() => onNavigate('health')}
        />
        <PillButton
          label="Browse all 13 articles"
          variant="secondary"
          arrow
          onClick={() => onNavigate('guides')}
        />
      </div>
    </div>
  );
};
