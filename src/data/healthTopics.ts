export interface HealthTopic {
  id: string;
  slug: string;
  title: string;
  topicTag: string;
  emoji: string;
  intro: string;
  sections: {
    heading: string;
    detail: string;
  }[];
}

/**
 * Health & Effects topics. Evidence comes only from the sources the
 * site already uses — the World Health Organization's Guidelines on
 * Physical Activity, Sedentary Behaviour and Sleep (2019) and the
 * American Academy of Pediatrics' 2026 guidance on children's media
 * use — plus the site's own guides. No new statistics, no invented
 * research, no medical claims. Where the evidence is general, the
 * text says so plainly. WHO's "1 hour a day" is ages 2–5 only and is
 * labelled as such wherever it appears.
 */
export const HEALTH_TOPICS: HealthTopic[] = [
  {
    id: 'sleep',
    slug: 'sleep',
    title: 'Sleep and night-time screen use',
    topicTag: 'Sleep & Rest',
    emoji: '😴',
    intro:
      'Your last hour before bed decides how you sleep. Bright screens, fast videos, and unread messages all tell your brain the day is still going — so it stays switched on, and sleep has to fight for its place.',
    sections: [
      {
        heading: 'The issue',
        detail:
          'Screens after dark keep the brain alert when it should be winding down. Bright light, fast videos, and unfinished worries all vote for staying alert. A phone in bed is the most common reason teenagers do not get the sleep they need — not because they choose to stay up, but because the screen never gives the day a clear ending.'
      },
      {
        heading: 'What the evidence says',
        detail:
          'The World Health Organization\u2019s guidance is built around sleep, physical activity, and limited screen use together: screens should not take sleep\u2019s place. Screens before bed delay sleep because bright light limits melatonin — the hormone that tells your body the day is ending — and because fast, exciting content keeps the brain alert after the screen goes dark. Teenagers need eight to ten hours of sleep a night. The American Academy of Pediatrics agrees: its 2026 guidance puts sleep first in the family media plan, ahead of counting hours. (Sources: WHO Guidelines on Physical Activity, Sedentary Behaviour and Sleep, 2019; AAP guidance on children\u2019s media use, 2026.)'
      },
      {
        heading: 'Possible effects',
        detail:
          'Shorter, lighter sleep. Tired mornings and a slow start to the day. Focus that will not hold still in the first lessons. None of these are the same for everyone — some people feel a late night the next day, others do not notice it until the tiredness builds over a week. The pattern to watch is simple: if screens regularly push bedtime later, sleep is the thing being replaced.'
      },
      {
        heading: 'Practical steps',
        detail:
          'Try a 9pm screen cut-off: screens off at 9pm, and the last hour belongs to slower things. Dim warm light in the last hour, charge the phone across the room so it cannot be reached half-asleep, and keep a paper book or journal by the bed instead of a feed. If you like stories or music before sleep, listen with the screen face down and a sleep timer on. And keep the bed for sleep only — homework and videos happen at the desk. Read the full guide: Sleep and the last hour before bed.'
      }
    ]
  },
  {
    id: 'eyes',
    slug: 'eyes',
    title: 'Eyes and digital eye strain',
    topicTag: 'Vision & Focus',
    emoji: '👁️',
    intro:
      'When you stare at a screen, you blink less, your eyes dry out, and the muscle that focuses up close stays clenched for hours. The result is the familiar end-of-day feeling: dry eyes, a heavy head, and focus that will not hold still.',
    sections: [
      {
        heading: 'The issue',
        detail:
          'Screens ask your eyes to do one thing for a long time: focus up close, without blinking properly, at a bright rectangle. The focusing muscle inside the eye cramps when it is held in one position for hours, and the tear film that keeps eyes comfortable dries out when blinks become short and rare.'
      },
      {
        heading: 'What the evidence says',
        detail:
          'Eye-health guidance gives one concrete rhythm, not a limit: the 20-20-20 rule — every twenty minutes of screen work, look at something at least twenty feet away for twenty seconds, so the focusing muscle can release. The same guidance covers blinking properly (a complete blink, lid meeting lid, replenishes the tear film), keeping the screen an arm\u2019s length away with the top at or slightly below eye level, and matching screen brightness to the room so your eyes are not constantly adjusting between a bright rectangle and a dark room. (Sources: the site\u2019s own eyes guide, which follows standard eye-health guidance; see also WHO guidance on sedentary behaviour and breaks.)'
      },
      {
        heading: 'Possible effects',
        detail:
          'Dry, gritty eyes. Headaches that arrive by the afternoon. Words that blur after short reading. These effects build with unbroken screen time and ease with breaks — which is why the fix is rhythm, not a special screen or an expensive pair of glasses.'
      },
      {
        heading: 'Practical steps',
        detail:
          'Use the 20-20-20 rule during study, and tie it to something that already happens: every time you finish a page, a problem, or a paragraph, look away before you start the next one. Pause at the end of each section for five slow, complete blinks. Sit an arm\u2019s length from the screen, look slightly downward, and match the brightness to the room. Work in blocks of 25–50 minutes with real breaks. If headaches, blurred vision, or eye pain keep returning even with regular breaks, tell a parent or teacher and get your eyes checked — habits fix strain from how you use screens; they cannot fix eyesight that needs glasses. Read the full guide: Eyes, focus, and breaks.'
      }
    ]
  },
  {
    id: 'focus',
    slug: 'focus',
    title: 'Focus, attention and distractions',
    topicTag: 'Focus & Attention',
    emoji: '🎯',
    intro:
      'Feeds are designed to be opened without thinking. Notifications tug at your attention all day, and focus — which works in sets, not in one long run — never gets a clean stretch to work in.',
    sections: [
      {
        heading: 'The issue',
        detail:
          'Attention is pulled in two directions at once: the work in front of you, and the phone beside it. Every notification is a small tug that pulls you into a feed you had no plan to open, and each tug costs more than the seconds it takes — it takes time to find your place again. The feed itself is built to be opened without a decision, so most openings are never chosen at all.'
      },
      {
        heading: 'What the evidence says',
        detail:
          'The American Academy of Pediatrics\u2019 2026 guidance moved away from strict hour limits for children aged six and over, and toward a family media plan — an agreement made together at home that prioritises sleep, physical activity, and face-to-face time over counting hours. The plan works because it protects the things focus needs: sleep, movement, and stretches of time without interruption. The site\u2019s own scrolling guide adds the practical side: friction between you and the feed — two extra swipes, a pause, a question — so opening it requires thinking. (Sources: AAP guidance on children\u2019s media use, 2026; the site\u2019s scrolling guide.)'
      },
      {
        heading: 'Possible effects',
        detail:
          'Homework that takes longer than it should. Reading the same paragraph twice. A day that feels eaten, without anything to show for it. These are not a lack of discipline — they are what happens when attention is interrupted all day. The pattern to watch is not how many hours you spent, but how often you were pulled away.'
      },
      {
        heading: 'Practical steps',
        detail:
          'Work in focus blocks of 25–50 minutes, then take a real break — stand up, move, look far away — before the next block. Keep notifications only for direct messages from real people; mute recommendations, streaks, and marketing. Before tapping any feed app, pause for ten seconds and state your purpose aloud — if you cannot name one, put the phone down. Give scrolling fixed windows instead of open hours, and keep the feeds closed outside them. Read the full guides: Scrolling less without deleting everything, and Eyes, focus, and breaks.'
      }
    ]
  },
  {
    id: 'physical',
    slug: 'physical',
    title: 'Physical health, posture and movement',
    topicTag: 'Body & Movement',
    emoji: '🚶',
    intro:
      'Screens keep you in one posture for hours, and they replace movement without you noticing. The fix is not a workout plan — it is movement woven into the day, in the gaps screens usually fill.',
    sections: [
      {
        heading: 'The issue',
        detail:
          'A long study session on a screen means hours of sitting still in one posture: shoulders forward, neck bent, eyes fixed. Movement gets pushed out quietly — the walk that did not happen, the break spent scrolling instead of standing. The body does not complain at once; it complains by evening, as stiffness, restlessness, and tiredness.'
      },
      {
        heading: 'What the evidence says',
        detail:
          'The World Health Organization\u2019s guidance puts physical activity and limited sedentary behaviour together with sleep: the three belong together, and screens should not replace movement. There is no single fixed number of active minutes that fits every school-age child — the guidance is about balance, not a target on a chart. What matters is the pattern: movement spread through the day, and screen time that does not swallow it. (Source: WHO Guidelines on Physical Activity, Sedentary Behaviour and Sleep, 2019.)'
      },
      {
        heading: 'Possible effects',
        detail:
          'Stiff neck and shoulders. Less energy by the afternoon. Restless sleep after a day spent sitting. These effects are general — not everyone feels them the same way — but they follow the same pattern: a day with almost no movement feels heavier than a day with some, whatever the screen hours were.'
      },
      {
        heading: 'Practical steps',
        detail:
          'Move in every break: stand up, stretch, walk to a window, drink water. Leave the phone behind at breaks so the break is movement, not another screen. Keep the screen an arm\u2019s length away with the top at or slightly below eye level, so you are not leaning in and hunching. Balance screen time with real activity — a walk, a game, sport — and make room for it in the day instead of hoping it happens. Read the full guide: Phone-free breaks that actually stick.'
      }
    ]
  },
  {
    id: 'mental',
    slug: 'mental',
    title: 'Mental wellbeing and online experiences',
    topicTag: 'Mind & Mood',
    emoji: '💛',
    intro:
      'Online experiences affect how you feel — sometimes in small ways, sometimes in ways that last into the evening. This page makes no medical claims: experiences differ from person to person, and the guidance here is general.',
    sections: [
      {
        heading: 'The issue',
        detail:
          'A feed can leave you feeling worse without any single post being the cause: comparison with other people\u2019s days, late-night group chats that never end, the pressure to reply instantly, the feeling of missing out when you step away. None of this is one big event. It is the slow accumulation of small moments, and it is easy to miss while it is happening.'
      },
      {
        heading: 'What the evidence says',
        detail:
          'The evidence here is general, and this page says so plainly. The American Academy of Pediatrics\u2019 2026 guidance emphasises face-to-face time and family media plans — agreements at home about when screens are on and off — because time with real people is what protects mood most reliably. There is no single number or study that predicts how any one person will feel online. If something online is bothering you, that is worth taking seriously regardless of what any guidance says. (Source: AAP guidance on children\u2019s media use, 2026.)'
      },
      {
        heading: 'Possible effects',
        detail:
          'Feeling worse after certain feeds. Late-night chats keeping you awake. Pressure to answer messages immediately, even at midnight. A low mood that lifts when you spend time offline with real people. These effects are not the same for everyone — some people are barely affected, others feel them strongly — and that difference is normal.'
      },
      {
        heading: 'Practical steps',
        detail:
          'Clean the feed: unfollow the accounts that pull you into endless scrolling or leave you feeling worse, and keep the ones you genuinely care about. Tell close friends your boundary — for example, that your screens go off at 9pm — so nobody expects an instant reply at midnight. Spend part of every day offline with real people. And if something online upsets you, talk to someone you trust about it; you do not have to carry it alone. For ongoing problems with mood or sleep, see a professional — this is a habits guide, not medical advice.'
      }
    ]
  },
  {
    id: 'routines',
    slug: 'routines',
    title: 'Everyday routines and screen dependency',
    topicTag: 'Routines & Habits',
    emoji: '🔁',
    intro:
      'Hours disappear without a decision being made. Meals, commutes, and evenings happen on autopilot, with the phone reached for before you have decided to reach for it. The fix is not willpower — it is friction, edges, and plans made while you are fresh.',
    sections: [
      {
        heading: 'The issue',
        detail:
          'Screen dependency rarely looks like a dramatic problem. It looks ordinary: the phone picked up during a meal, the commute spent scrolling, the evening that ends two hours later than planned with nothing to show for it. The habit is automatic — the thumb opens the app before the brain has decided to open it — so willpower in the moment is the wrong tool. The decision has to happen earlier, when you are fresh.'
      },
      {
        heading: 'What the evidence says',
        detail:
          'The American Academy of Pediatrics\u2019 2026 guidance recommends a family media plan: an agreement made together at home about when screens are on and when they are off, with sleep, physical activity, homework, meals together, and time with friends in person named first, and screens fitted around them. The plan is written down and pinned up, so nobody has to remember it or argue about it. The site\u2019s own scrolling guide adds the same idea for one person: friction — two extra swipes, a pause, a question — so opening a feed requires thinking. (Sources: AAP guidance on children\u2019s media use, 2026; the site\u2019s scrolling guide.)'
      },
      {
        heading: 'Possible effects',
        detail:
          'Meals, homework, and sleep get pushed out a little at a time. The day feels shorter than it was. You check the phone without remembering why, and the check turns into twenty minutes. None of this means something is wrong with you — it means the habit has no edges, and habits without edges expand until something else gives.'
      },
      {
        heading: 'Practical steps',
        detail:
          'Give the day edges: device-free meals and commutes, fixed windows for scrolling instead of open hours, and phone-free breaks. Before opening a feed, pause for ten seconds and state your purpose aloud — if you cannot name one, put the phone down. Move endless-scroll apps into a folder on the last screen page, so opening them takes a deliberate act. And write a family media plan together: name the non-negotiables first, then fit screens around them. Read the full guides: Scrolling less without deleting everything, and The 9pm screen cut-off.'
      }
    ]
  }
];
