import type { Article } from '../types';

/**
 * ONE store for every article on the site: the 7 guides (kind 'guide')
 * and the 6 health topics (kind 'topic'), 13 pieces in one shape.
 * Merged 2026-11-21 from the two old stores — words moved, not
 * rewritten. Topics carry their intro as their summary (they never
 * had one); a topic's "Practical steps" section is its Try-one-thing
 * callout. Sources are only the titles each piece names in its own
 * text; an empty list means no sources footer. Related links are the
 * pieces' own cross-references.
 *
 * Reading time: words in the body (intro + step headings + step
 * details + Try-one-thing label and text) divided by 200, rounded up.
 */
export const ARTICLES: Article[] = [
  {
    "id": "phone-free-breaks",
    "slug": "phone-free-breaks-that-actually-stick",
    "title": "Phone-free breaks that actually stick",
    "kind": "guide",
    "category": "Routines",
    "emoji": "🚶",
    "minutes": 6,
    "summary": "Why switching screens is not a real break — and how physical separation, pre-decided actions, and milestone breaks restore stamina.",
    "intro": "A real break changes your body, not just your screen. Switching from a textbook to a video feels like rest, but your posture stays the same, your eyes stay on a glowing rectangle, and your attention never actually leaves the screen. Ten minutes later you feel no fresher than before. A phone-free break works differently: you move, you look far away, you let your hands and eyes do something else entirely. This guide gives you six habits that make those breaks stick — not by willpower, but by setting them up so the easy choice is the right one.",
    "steps": [
      {
        "heading": "Establish physical separation",
        "detail": "Before stepping away from your study desk, place your phone face down across the room or inside your bag. If the phone travels in your pocket, muscle memory will pull it out during your pause without conscious thought, and the break becomes another scroll. Distance is the whole trick: a phone you have to stand up and walk to is a phone you will only fetch on purpose. If you study in a shared room, the far side of the room or the hallway counts — the point is distance from the screen, not a particular place. A phone in another room is a phone you have chosen not to check, and that choice is the break. The same applies to your study spot itself — leave the desk, even if only to stand by a window. Your brain reads a change of place as a change of mode, and that is what lets it actually rest. Try it for one study session and notice the difference: a break taken away from the desk feels twice as long as a break taken in the same chair."
      },
      {
        "heading": "Use the three-minute sensory reset",
        "detail": "Walk to an open window, drink a glass of fresh water, or roll your shoulders and neck. Shifting your gaze from fifty centimetres away to trees, buildings, or the horizon allows your eye muscles to release the tension of close-up focus. Add one more sense if you can: splash cold water on your wrists, step outside for fresh air, or eat a piece of fruit slowly instead of at your desk. The point is not to fill three minutes with activity — it is to give your senses something different from the screen. Three minutes is short enough to fit between any two study blocks and long enough for your eyes and shoulders to loosen. If you only remember one habit from this guide, make it this one: every break starts with water, air, or movement, never with another screen."
      },
      {
        "heading": "Pre-decide your break action in advance",
        "detail": "Never ask yourself \"what should I do on my break?\" in the middle of a session. Under fatigue, your brain defaults to high-dopamine scrolling, because scrolling is the easiest thing available and deciding takes effort you do not have right then. Decide before you start studying. Keep a simple list on your desk: stretch, drink water, water a plant, or step outside. Three or four options are enough — a long list is just another decision. When the break arrives, you do not choose; you follow the list. This is the same trick athletes and musicians use: the routine is decided when you are fresh, so the tired version of you only has to follow it. If you find yourself scrolling during a break, it usually means the break had no plan, not that you lack discipline."
      },
      {
        "heading": "Anchor breaks to natural milestones",
        "detail": "Tie pauses to completed tasks rather than rigid alarms: after finishing two math problems, drafting an essay section, or reading one textbook chapter. A completed milestone gives your mind permission to rest, because the work has a visible ending — you are not abandoning something half-done, you are pausing between finished pieces. Alarms, by contrast, often ring in the middle of a thought, and you either ignore them or stop resentfully and keep thinking about the work. Milestone breaks also teach you something useful: you start to notice how long a chapter or a problem set actually takes, and your planning gets better without any extra effort. Start with one milestone per study session, take the break the moment you reach it, and return when the break ends — the rhythm builds itself."
      },
      {
        "heading": "Give every break a clear ending",
        "detail": "A break without an ending is not a break — it is the start of a longer drift. Before you stand up, decide when you will sit back down: five minutes, ten minutes, or the end of one song. Say it out loud or set a simple timer, then put the phone back where it belongs and open your book when the time is up. The return cue matters as much as the break itself: lay your textbook open at the next page before you leave the desk, so coming back means continuing, not starting over. If a break stretches past its ending, do not argue with yourself about it — just stand up, drink some water, and sit down again. The break did its job the moment you moved and looked away; staying away longer does not make you more rested, it just makes starting again harder."
      },
      {
        "heading": "When a break turns into scrolling, reset without guilt",
        "detail": "It will happen. You pick up the phone for one message and twenty minutes disappear. The worst response is guilt, because guilt makes you avoid thinking about the habit entirely — and the next break goes the same way. The useful response is a reset: put the phone down, stand up, drink some water, and start the next study block. One slipped break does not ruin the day, and it does not mean the system failed. It means the break had no plan or no ending, and you know exactly which of the two to fix next time. Keep a small tally for a week: how many breaks were phone-free, and how many slipped. You are not grading yourself — you are collecting evidence about which setups work. The tally takes ten seconds a day and turns a vague feeling — 'I keep failing' — into a fact you can work with. The setups that work are the ones you keep; the ones that fail are the ones you change."
      }
    ],
    "tryOneThing": {
      "label": "Try one thing",
      "text": "Pick phone-free breaks as your 7-day challenge."
    },
    "sources": [],
    "related": [
      {
        "slug": "physical",
        "label": "Read the topic: Physical health, posture and movement"
      },
      {
        "slug": "routines",
        "label": "Read the topic: Everyday routines and screen dependency"
      }
    ]
  },
  {
    "id": "9pm-screen-cutoff",
    "slug": "the-9pm-screen-cut-off",
    "title": "The 9pm screen cut-off",
    "kind": "guide",
    "category": "Sleep",
    "emoji": "🌙",
    "minutes": 6,
    "summary": "A clear evening boundary that protects sleep and separates work from rest — with a plan for homework that genuinely needs a screen.",
    "intro": "Screens after 9pm keep your brain alert when it should be winding down. Bright light, fast videos, and unread messages all tell your mind the day is still going — so it stays switched on, and sleep has to fight for its place. A 9pm cut-off is not a punishment and it is not about banning the phone. It is a boundary: at 9pm the screens go off, and the last hour of the day belongs to slower things. This guide shows you how to make that boundary hold — the wind-down, the phone's new home, the offline alternatives, and what to do when homework genuinely needs a screen after 9.",
    "steps": [
      {
        "heading": "Set a ten-minute transition chime at 8:50 PM",
        "detail": "Give yourself an auditory cue ten minutes before the cut-off. Use this window to send final project notes to classmates, shut down laptop tabs, and plug in your phone. The chime is important because a hard stop at 9pm feels abrupt — you are mid-message, mid-video, mid-thought, and the boundary feels like an interruption. Ten minutes of warning turns the cut-off into a landing instead of a wall: you finish things properly, you say goodnight to the group chat, and you close the laptop yourself instead of having the rule close it for you. Pick a sound that is calm, not alarming — a gentle alarm tone, not a siren. After a few nights the chime itself becomes the signal, and your hands start wrapping up before your brain has to decide anything."
      },
      {
        "heading": "Evict the phone from the bedside table",
        "detail": "Charge your phone across the bedroom on a desk or shelf. If your phone is within arm's reach of your pillow, late-night checking during light awakenings becomes an unconscious reflex — you wake briefly, the phone is there, and your thumb opens it before you are even awake enough to choose. Distance breaks that reflex. Across the room, checking the phone means getting out of bed, and a half-awake person will not bother. If you use the phone as an alarm, buy a small alarm clock or set the phone's alarm and leave it across the room — the alarm still wakes you, but the screen is not the first thing your hand touches. The first week feels strange; the second week you stop noticing the phone is gone, and that is the point."
      },
      {
        "heading": "Prepare an offline wind-down alternative",
        "detail": "Have a physical paperback book, a sketchbook, or an offline audio player ready beside your bed. Giving your hands and thoughts a low-stimulation offline activity prevents the urge to pick up the screen out of boredom. The mistake is removing the screen and leaving a vacuum — boredom is what sends your hand back to the phone. A book does not have to be long or serious; a few pages of anything you enjoy is enough to carry you to sleep. If reading is not your thing, a paper journal works the same way: write three lines about the day, close the book, and let the day end on paper instead of on a feed. The activity matters less than the medium — paper and audio ask nothing of your eyes, and that is what lets them rest. If you prefer audio, put the phone face down with a sleep timer on and listen in the dark — the story continues without the light. Prepare the alternative before 9pm, not at 9pm: a book already on the pillow, a sketchbook already open. The easier the alternative is to reach, the less the phone is missed."
      },
      {
        "heading": "Communicate the boundary with your friends",
        "detail": "Tell your close friends and study team that your screens turn off at 9:00 PM. Setting expectations eliminates the fear of missing out and takes away the anxiety of leaving messages unread. Most of that anxiety is not about the messages themselves — it is about what your friends will think if you do not reply. Once they know, the pressure disappears, because nobody expects an answer until morning. You do not need a speech: one message in the group chat is enough — \"my phone goes off at 9, I'll catch up in the morning.\" You may find a friend copies you, and then the boundary is shared instead of lonely. A boundary other people know about is far easier to keep than a secret one, because the people around you stop testing it."
      },
      {
        "heading": "Handle genuine after-9pm screen work, honestly",
        "detail": "Some nights the homework genuinely needs a screen after 9pm — a submission due at midnight, a shared document only one classmate can finish, a class portal that closes. Pretending those nights do not exist is how a boundary breaks: one exception becomes the excuse for every night. The fix is to plan the exception. Do the screen part first, before 9pm, and leave the paper part — reading, planning, handwriting — for after. If the screen work cannot move earlier, set a hard end time for it and keep the phone off the bed afterwards: the cut-off bends for the work, but the bedtime rule stays. And notice how often the exception really happens. If it is every night, the problem is not the boundary — it is the homework load or the timing, and that is worth raising with a teacher rather than silently giving up your evenings."
      },
      {
        "heading": "Notice your mornings for one week",
        "detail": "A cut-off is hard to keep when its only reward is abstract — \"better sleep\" is something you are told, not something you feel. So measure it yourself, simply: for one week, write one line each morning about how the night went. How long did it take to fall asleep? How did you feel at 7am? One line, no grading. After seven nights you will have your own evidence instead of someone else's advice, and your own evidence is far more convincing. If mornings feel no different, the cut-off may need a different wind-down — a longer offline hour, or an earlier start. If mornings feel easier, you have a reason to keep going that no poster could give you. Either way, you decided based on your own week, and that is the whole point of testing a habit instead of just hearing about one."
      }
    ],
    "tryOneThing": {
      "label": "Try one thing",
      "text": "Try the 9pm cut-off for seven days and notice your mornings."
    },
    "sources": [],
    "related": [
      {
        "slug": "sleep",
        "label": "Read the topic: Sleep and night-time screen use"
      },
      {
        "slug": "routines",
        "label": "Read the topic: Everyday routines and screen dependency"
      }
    ]
  },
  {
    "id": "sleep-last-hour",
    "slug": "sleep-and-the-last-hour-before-bed",
    "title": "Sleep and the last hour before bed",
    "kind": "guide",
    "category": "Sleep",
    "emoji": "🛌",
    "minutes": 6,
    "summary": "How high-stimulus media keeps you alert — and six habits for a calmer last hour and restful sleep.",
    "intro": "Your last hour before bed decides how you sleep. It is not the whole day that matters most — it is the final stretch, when your brain is deciding whether to wind down or stay alert. Bright screens, fast videos, and unfinished worries all vote for staying alert. The habits in this guide vote the other way: dim light, a clear mind, audio instead of glare, and a bed that means sleep. None of them needs a new app or a purchase. They need an hour you protect, the same way every night, until your body starts expecting it.",
    "steps": [
      {
        "heading": "Shift to dim, warm ambient lighting",
        "detail": "Turn off harsh overhead ceiling lights sixty minutes before bed. Use warm desk lamps or nightlights. Low light cues your brain that night has fallen, encouraging natural drowsiness — bright white light does the opposite, telling your mind it is still daytime. This is the cheapest habit in the guide: one lamp, one switch, no settings to learn. If you share a room, a small warm lamp at your own desk is enough; the light only needs to change where you sit. Dim the phone screen too if it is still on for messages, but better still, let the last hour be the hour the screens go dark. Your eyes will feel the difference within minutes — less glare, less strain, and a heaviness that is your body starting to agree it is night."
      },
      {
        "heading": "Clear your mind with a paper brain-dump",
        "detail": "If thoughts about exams, deadlines, or tomorrow's schedule keep buzzing in your head, spend three minutes writing them onto a paper notepad. Getting worries out of your working memory calms bedtime racing thoughts, because the thoughts are no longer loose in your head — they are written down, safe, and waiting for morning. Keep the notepad and a pen by the bed, not in another room: the whole point is that the dump takes three minutes and no effort. Do not organise the list or solve anything — just write what is buzzing, in any order, in any words. A messy list works exactly as well as a neat one. Most students who try this find the same thing: the worries do not disappear, but they stop circling, because the paper is holding them now."
      },
      {
        "heading": "Prioritize audio over luminous screens",
        "detail": "If you enjoy stories or music before sleeping, place your device display face down with a sleep timer turned on. Listening in dark surroundings relaxes your eyes while still giving your mind a calming narrative — the story continues, but the light is gone. Choose something gentle and familiar rather than a new thriller or a fast-paced video; the content should bore you slightly toward sleep, not wake you up with a cliffhanger. A sleep timer matters because it stops the audio before it can keep you half-awake all night — set it for twenty or thirty minutes and let it fade. If you catch yourself reaching to check the screen, put the phone across the room and let the audio play: you can hear it perfectly well from there, and your hands have nothing to open."
      },
      {
        "heading": "Reserve the mattress strictly for sleep",
        "detail": "Avoid doing stressful homework, typing essays, or watching intense videos in bed. Maintaining a strict association between your bed and sleep prevents tossing and turning when you turn the lights out, because your body has learned what the bed is for. The moment homework or videos happen in bed, the bed becomes another desk — and your brain treats it like one, staying alert and problem-solving. Do the work at the desk, even if the desk is less comfortable. The discomfort is the point: the desk is for working, the bed is for sleeping, and keeping them separate is what makes both of them work. If your room is small and the bed is the only seat, sit upright with a pillow behind your back for work, and lie flat only for sleep — even that small difference helps your body tell the two apart."
      },
      {
        "heading": "Keep the same wind-down order every night",
        "detail": "A routine is a signal. Do the same three or four things, in the same order, every night: dim the lights, brain-dump on paper, change into sleep clothes, read a few pages or listen to audio. The order matters more than the items, because your body learns the sequence — step two means step three is coming, and step three means sleep is near. After a week of the same order, the first step starts making you drowsy on its own, before you have even reached the bed. That is not magic; it is the same learning that makes you hungry when you smell food cooking. Keep the routine short — fifteen to twenty minutes is enough — and protect its order even on busy nights. If you share a room, agree the order together: the routine works best when the people around you know it, so nobody switches the bright light back on halfway through. A routine you skip when you are busy is not a routine; it is a suggestion. Shorten it instead of skipping it: two steps in the right order beat five steps done randomly."
      },
      {
        "heading": "If you cannot fall asleep, get up — do not scroll",
        "detail": "Lying awake and staring at the ceiling trains your brain to associate the bed with being awake, which is the opposite of what you want. If you have been awake for a while and sleep is not coming, get up, go to dim light in another part of the room, and read a paper book or sit quietly until you feel drowsy — then go back to bed. Do not pick up the phone: the light and the feed will wake you further, and twenty minutes of scrolling turns a short wakeful patch into a lost hour. Do not count the minutes or do sums about how little sleep you will get; that arithmetic is itself what keeps you awake. One wakeful night is normal, especially before exams or big days. The habit that protects you is not falling asleep instantly — it is refusing to turn a wakeful patch into screen time, so the next night starts clean."
      }
    ],
    "tryOneThing": {
      "label": "Try one thing",
      "text": "Protect your last hour before bed for seven days."
    },
    "sources": [],
    "related": [
      {
        "slug": "sleep",
        "label": "Read the topic: Sleep and night-time screen use"
      }
    ]
  },
  {
    "id": "scrolling-less",
    "slug": "scrolling-less-without-deleting-everything",
    "title": "Scrolling less without deleting everything",
    "kind": "guide",
    "category": "Routines",
    "emoji": "📱",
    "minutes": 6,
    "summary": "Smart friction for mindless feeds — fixed scroll windows, a cleaner feed, and a ten-second pause. No radical detox needed.",
    "intro": "You don't need a detox — you need friction between you and the feed. Deleting everything sounds brave, but it usually lasts a day: the apps come back, the habit comes back with them, and nothing was learned. The feed is designed to be opened without thinking, so the fix is to make opening it require thinking — two extra swipes, a pause, a question, a closed door. This guide gives you six friction tricks that leave your apps in place and change how you reach them. None of them needs willpower in the moment, because the thinking happens when you set them up, not when your thumb is already moving.",
    "steps": [
      {
        "heading": "Nest high-friction apps into deep folders",
        "detail": "Move endless-scroll apps off your primary home screen into a folder on your last screen page or access them only via search. Adding two physical swipes and an intentional search breaks the unconscious thumb reflex — the thumb that opens the app before you have decided to open it. The apps are still there, so nothing feels banned, but the opening now takes a deliberate act: you have to want the app enough to go and find it. That small gap is where the decision lives. Keep the apps you genuinely need — messages from real people, the bus timetable, your notes — on the first screen, and move only the endless feeds away. After a few days, check your screen time: the apps that moved are usually the ones whose minutes fall first, because most of their use was never a decision in the first place."
      },
      {
        "heading": "Turn off non-human notifications",
        "detail": "Mute alerts for algorithm recommendations, streak reminders, and app marketing. Reserve push notifications exclusively for direct messages from real people who need an answer. Every other notification is the app asking for your attention on its schedule, not yours — and each one is a small tug that pulls you into a feed you had no plan to open. Go through your notification settings once, app by app, and ask a single question: is this a human who needs me, or an app that wants me? Keep the humans, silence the rest. You will miss nothing that matters: recommendations and streaks wait patiently, and they are designed to look urgent when they are not. The quiet that follows is the point — a phone that only speaks when a person needs you is a tool again, not a slot machine."
      },
      {
        "heading": "Enable greyscale display mode",
        "detail": "Turn on greyscale mode in your phone's accessibility shortcuts. Without saturated red badges and neon video thumbnails, algorithmic feeds lose their psychological pull and become utilitarian tools. Colour is doing quiet work on you all day: red badges signal urgency, bright thumbnails promise excitement, and every shade is chosen to hold your eye a second longer. Grey takes that work away. Photos look flat, videos look dull, and the feed becomes something you use and leave rather than something you sink into. Set it up so you can switch it on and off quickly — greyscale for study and evening, colour back for the moments you genuinely want it, like looking at photos with family. The switch itself becomes a habit: grey means focus time, colour means chosen time."
      },
      {
        "heading": "Apply the ten-second intentional pause",
        "detail": "Before tapping any feed app, pause for ten seconds and state your exact purpose aloud: \"I am checking tomorrow's bus timing\" or \"I am replying to Sarah.\" If you cannot name a purpose, put the device down. Ten seconds is short enough to do every time and long enough for the automatic part of your brain to hand control back to the thinking part. Saying the purpose aloud matters — silent intentions are easy to fake, but a spoken sentence is specific, and a vague one exposes itself immediately. This is the cheapest habit in the guide, and the most honest: it does not block anything, it only asks you to know why you are opening the app. On the days you use it properly, you will open feeds half as often — not because you are disciplined, but because half the openings had no reason at all."
      },
      {
        "heading": "Give scrolling fixed windows, not open hours",
        "detail": "Pick one or two short windows a day for scrolling — after lunch, or after homework — and keep the feeds closed outside them. An open-ended rule like \"scroll less\" fails because it has no edge: every moment is a possible scrolling moment, so the decision never ends. A window has edges. Inside the window, scroll freely and without guilt; outside it, the apps stay closed and you do not negotiate with yourself. Twenty minutes after lunch and twenty after homework is a good start — enough to catch up with friends and see what is new, short enough that the feed cannot eat the evening. If twenty minutes feels long at first, start with ten — the length matters less than the edges, and the edges are what make the habit hold. If a message arrives outside a window, answer the message and leave the feed: replying to a person is not scrolling. After a week, notice which window you actually look forward to and which one you forget — keep the one that matters, drop the one that does not."
      },
      {
        "heading": "Clean the feed: unfollow what pulls you under",
        "detail": "Open your following list and remove the accounts that pull you into endless scrolling — the ones whose posts never end, the ones you watch out of habit rather than interest, the ones that leave you feeling worse afterwards. You do not need a reason, and you do not owe anyone an explanation; unfollowing is quiet, and nobody is notified. Keep the accounts you genuinely care about: close friends, family, a hobby you love, a team you follow. A shorter feed ends sooner, and a feed that ends is a feed you can leave — the endless one is endless by design. Do this once, properly, for ten minutes, instead of promising yourself you will scroll less while the feed stays exactly as gripping as before. The feed is not a fixed thing; it is a list you chose, and you can choose it again."
      }
    ],
    "tryOneThing": {
      "label": "Try one thing",
      "text": "Pick one friction trick and use it for seven days."
    },
    "sources": [],
    "related": [
      {
        "slug": "focus",
        "label": "Read the topic: Focus, attention and distractions"
      },
      {
        "slug": "routines",
        "label": "Read the topic: Everyday routines and screen dependency"
      }
    ]
  },
  {
    "id": "eyes-focus-breaks",
    "slug": "eyes-focus-and-breaks",
    "title": "Eyes, focus, and breaks",
    "kind": "guide",
    "category": "Eyes",
    "emoji": "👁️",
    "minutes": 6,
    "summary": "Simple vision hygiene and focus pacing for strain-free study — the 20-20-20 rule, real breaks, and knowing when to get your eyes checked.",
    "intro": "Your blink rate halves on screens. Look away, blink, rest your eyes. When you stare at a screen, you blink less, your eyes dry out, and the muscles that focus up close stay clenched for hours. The result is the familiar end-of-day feeling: dry eyes, a heavy head, and focus that will not hold still. The fix is not a special screen or an expensive pair of glasses — it is rhythm. Look away regularly, blink properly, sit at the right distance, and work in blocks with real breaks between them. This guide gives you six habits that protect your eyes and your focus at the same time, because on a screen the two are the same job.",
    "steps": [
      {
        "heading": "Practice the 20-20-20 habit",
        "detail": "Every twenty minutes of screen work, look away at an object at least twenty feet (six meters) away for twenty seconds. This allows the focusing muscle inside your eye to completely relax from close-up tension — it is a muscle, and like any muscle it cramps when it is held in one position for too long. Twenty seconds is short: look out of the window, look down the corridor, look at the far wall. The hard part is remembering, so tie it to something that already happens: every time you finish a page, a problem, or a paragraph, look away before you start the next one. A small sticky note on the edge of your screen — \"20-20-20\" — is enough of a reminder. After a few days the look-away becomes automatic, and the afternoon headaches that used to arrive by four o'clock start arriving later, or not at all."
      },
      {
        "heading": "Practice conscious complete blinks",
        "detail": "When reading dense articles or study guides, pause at the end of each section to execute five deliberate, complete blinks. This replenishes your tear film and prevents dry scratchiness. A complete blink means the upper lid travels all the way down and meets the lower lid — the half-blinks we do on screens barely wet the eye at all, which is why screens leave eyes feeling gritty. Five slow blinks take about ten seconds, and they work best as a ritual: finish a section, close the book or look away, blink five times slowly, then continue. If your eyes feel dry during a long session, that is not a signal to rub them — rubbing irritates them further. Blink, look away, and let the tears do their job. If dryness persists even with regular blinking and breaks, mention it to a parent: dry eyes that will not settle deserve a proper look, not just more blinking."
      },
      {
        "heading": "Calibrate display distance and height",
        "detail": "Position your computer display an arm's length away, with the top of the monitor aligned with or slightly below eye level. Looking slightly downward reduces the exposed surface area of your eyes, slowing evaporation — eyes opened wide dry out faster than eyes looking gently down. An arm's length is easy to check: sit back in your chair and stretch your arm out; your fingertips should just about touch the screen. If the screen is too close, you will lean in without noticing, and the lean becomes a habit that follows you to every screen. Laptops are the worst for this, because the keyboard forces the screen close and low; if you study on a laptop for long stretches, raise it on a stack of books and use a separate keyboard if you have one. Phones deserve the same rule: hold them at a comfortable reading distance, not pressed close to your face, and never read lying flat with the phone hovering above your eyes."
      },
      {
        "heading": "Balance screen brightness with room light",
        "detail": "Never study with a blazing bright display in an unlit room. Match the luminance of your screen to the ambient brightness of the surrounding space to reduce ocular contrast strain — your eyes are constantly adjusting between the bright rectangle and the dark room, and that adjustment is tiring. Turn a lamp on, even a small one, and turn the screen brightness down until the screen feels like a page rather than a lamp. Most devices have an automatic brightness setting; turn it on and let it do the work. At night, the same rule applies in reverse: a dim room calls for a dim screen, not a bright one. If your eyes water or ache after an hour, brightness mismatch is the first thing to check — before blaming the screen, the chair, or yourself. A comfortable screen disappears; a straining screen announces itself, and the announcement is the ache."
      },
      {
        "heading": "Work in focus blocks with real breaks",
        "detail": "Study in blocks of twenty-five to fifty minutes, then take a real break — stand up, move, look far away — before the next block. Focus is not a tap you leave running; it is a muscle that works in sets, and the break between sets is part of the work, not a reward for finishing. Pick a block length that fits the task: twenty-five minutes for dense reading, fifty for writing or problem sets. When the block ends, stop properly: close the document, stand up, and do something with your body. Do not \"break\" by switching to a video — that is the same screen, the same posture, and the same eyes, and the next block starts already tired. Three good blocks with real breaks beat five tired hours of half-focus, and you will feel the difference by the second block: the words stay still, the problems make sense faster, and the afternoon does not collapse."
      },
      {
        "heading": "When strain keeps coming back, get your eyes checked",
        "detail": "If headaches, blurred vision, or eye pain keep returning even with regular breaks, proper distance, and matched brightness, tell a parent or teacher and get your eyes checked. Habits fix strain that comes from how you use screens; they cannot fix eyesight that needs glasses, or an eye problem that needs a doctor. The signs worth acting on are simple: words blurring after short reading, headaches that arrive early in the day, one eye that feels different from the other, or needing to hold things closer than your friends do. None of these mean something is seriously wrong — most of the time it is just growing eyes that need a check — but they are not things to push through. A quick eye test is ordinary, painless, and common at your age. The habit here is not medical; it is honest: notice what keeps coming back, say it out loud, and let an adult arrange the check."
      }
    ],
    "tryOneThing": {
      "label": "Try one thing",
      "text": "Use the 20-20-20 rule during study for seven days."
    },
    "sources": [],
    "related": [
      {
        "slug": "eyes",
        "label": "Read the topic: Eyes and digital eye strain"
      },
      {
        "slug": "focus",
        "label": "Read the topic: Focus, attention and distractions"
      }
    ]
  },
  {
    "id": "healthy-habits-student-team",
    "slug": "what-healthy-habits-in-a-digital-world-means-for-a-student-team",
    "title": "What healthy habits in a digital world means for a student team",
    "kind": "guide",
    "category": "Team",
    "emoji": "🎬",
    "minutes": 6,
    "summary": "How a student team tests honest seven-day habit changes — boundaries, a real trial, a focused story, and results shared truthfully.",
    "intro": "Healthy habits mean boundaries and rhythm, not avoiding screens. A student team cannot do its work without phones and laptops — the documents, the messages, the shared notes all live on screens. So the question is not how to escape the digital world, but how to live in it well: when the team talks, when it stops, how it tests a change, and how it tells the story honestly. This guide is about a team doing exactly that — four students, one campaign, seven days of testing a habit, and a story built from what actually happened. It is written for any student team that wants to try the same thing, whether or not a competition is involved.",
    "steps": [
      {
        "heading": "Establish clear team communication boundaries",
        "detail": "Agree with your teammates on designated communication hours. Agree that late-night notifications are never expected to receive an immediate response, allowing every team member to wind down properly. A team without boundaries slowly becomes a team that is always on: messages at midnight, replies expected within minutes, and everyone quietly tired. The fix is a short conversation, not a rulebook: pick the hours the group chat is active, pick the hours it is quiet, and say out loud that nobody owes an instant reply after hours. Write it down in one message and pin it, so the agreement is visible and nobody has to remember it. The point is not to police each other — it is to remove the pressure that makes everyone check their phone at midnight. A team that respects each other's evenings works better in the mornings, and the work shows it."
      },
      {
        "heading": "Test the real seven-day habit trial",
        "detail": "Notice the real moments of your team testing habit changes — awkward early attempts, genuine struggles with late-night scrolling, and honest improvements in energy and study focus over the seven days. A trial is only useful if it is real: each team member picks one habit, tries it for seven days, and tells the truth about what happened. The awkward parts matter as much as the good ones, because they are what make the story believable — the night someone forgot and scrolled until midnight, the morning someone felt sharper, the break that actually worked. Keep it simple: one short note per person per day, a sentence or two, about what they tried and how it felt. At the end of the week, read the notes together. The pattern you find — which habits stuck, which ones did not, and why — is the real result of the trial, and it is worth more than any score."
      },
      {
        "heading": "Tell a focused, actionable story",
        "detail": "A memorable video does not lecture. Show a specific everyday problem, document one concrete seven-day challenge, and share honest reflections from team members on what actually worked. The story works when it is small and specific: one student, one habit, one week — not \"screens are bad\" in general, but \"I stopped scrolling after 9pm and this is what my mornings looked like.\" Start with the problem as it actually happens — the phone in bed, the tired morning — then show the change being tried, including the parts that did not go smoothly, and end with what the team learned rather than what it achieved. Reflections should be in the students' own words, short and unscripted, because a rehearsed line sounds like an advert and an honest one sounds like a person. One clear story, told truthfully, is remembered; five messages, told perfectly, are forgotten."
      },
      {
        "heading": "Plan offline before opening video editors",
        "detail": "Brainstorm your storyboard on paper and index cards before touching editing software. Collaborative face-to-face planning keeps your team aligned and reduces unnecessary editing screen hours. Editing software invites endless fiddling — one more cut, one more effect — and a team that starts there will spend its week inside the editor instead of inside the story. Paper forces the real decisions first: what happens in each scene, who says what, what the ending is. Index cards are ideal because they can be moved: lay them on a table, argue about the order, throw away the weak ones, and keep the strong ones. Only when the cards tell a story you all believe should anyone open an editor — and then the editing is assembly, not discovery. The side benefit is real too: an hour of planning on paper is an hour your team spent together, looking at each other instead of at screens."
      },
      {
        "heading": "Measure honestly: before and after",
        "detail": "A campaign that claims change should show it — honestly. Before the trial, ask the people you are reaching how they feel about their screen habits, in a way that costs them nothing: an anonymous show of hands, a quick paper slip, a simple before-and-after check. Do the same afterwards, the same way, with the same question, so the two answers can be compared. Do not invent the numbers, do not round them up, and do not hide the ones that went the wrong way — a result that moved a little is still a result, and a result that did not move tells you what to try next. The team's own before-and-after matters just as much: each member's notes across the seven days are the most honest data the campaign has. Measure what you can, report what you measured, and say plainly what you did not measure. That honesty is what makes the results worth believing."
      },
      {
        "heading": "Share what worked — and what did not",
        "detail": "When the trial ends, share the results truthfully, including the habits that failed. A campaign that only reports successes sounds like an advert; a campaign that reports what worked and what did not sounds like students who actually tried something. Say which habit stuck and why you think it did, which one fell apart and what got in the way, and what the team would do differently next time. No fake scores, no invented improvements, no before-and-after that was never measured. The audience for this is other students, and other students can tell the difference between a real attempt and a polished claim — they live the same habits every day. The strongest ending to a campaign is not \"we fixed screens\" but \"we tried this, this is what happened, and here is the one habit we are keeping.\" That is a result anyone can copy, and that is the whole point."
      }
    ],
    "tryOneThing": {
      "label": "Try one thing",
      "text": "Pick one habit and test it as a team for seven days."
    },
    "sources": [],
    "related": []
  },
  {
    "id": "what-the-experts-say",
    "slug": "what-the-experts-say-about-screens",
    "title": "What the experts say about screens",
    "kind": "guide",
    "category": "Expert",
    "emoji": "🔬",
    "minutes": 6,
    "summary": "What the World Health Organization and the American Academy of Pediatrics actually say about screens for school-age children — no fixed limit, but clear rules for sleep, activity, and family time.",
    "intro": "Most screen advice you hear online is either a scary number or a shrug. One post says two hours a day, another says screens are ruining a generation, and neither one says who was studied or how old they were. The real guidance is calmer — and more useful. The World Health Organization and the American Academy of Pediatrics, the two bodies whose advice schools and doctors actually use, say something simple for school-age children: there is no single magic number of hours. What matters is what screens replace. If screens push out sleep, movement, homework, or time with real people, they are doing harm — whatever the clock says. This guide lays out what the experts actually say, where each claim comes from, and how to check the next scary number you see.",
    "steps": [
      {
        "heading": "No fixed limit for school-age children — balance is the rule",
        "detail": "The World Health Organization has never set a single screen-time limit for school-age children, and the American Academy of Pediatrics agrees. In February 2026 the Academy moved away from strict hour limits for children aged six and over, replacing them with a family media plan — an agreement made together, at home, about when screens are on and when they are off. The plan prioritises sleep, physical activity, and face-to-face time over counting hours. That is not the experts giving up. It is the experts saying the clock is the wrong tool: two hours of creative work is not the same as two hours of scrolling at midnight, and a fixed number cannot tell the difference. The rule that replaces the number is a question: what did screens push out of the day? If the answer is nothing — sleep, movement, homework, and family time all happened — the day was balanced."
      },
      {
        "heading": "Sleep: screens before bed delay it",
        "detail": "Of everything the experts agree on, sleep is the clearest. Screens before bed delay sleep, because bright light limits melatonin — the hormone that tells your body the day is ending — and because fast, exciting content keeps the brain alert after the screen goes dark. Teenagers need eight to ten hours of sleep a night, and a phone in bed is the most common reason they do not get it. The World Health Organization's guidance is built around exactly this: sleep, physical activity, and limited screen use belong together, and screens should not take sleep's place. That is why this campaign's habit is a 9pm screen cut-off, not a daily minute count. The cut-off protects the last hour of the day — the hour that decides how you sleep — and it works because it is a boundary you can keep, not a number you have to count."
      },
      {
        "heading": "The under-5 numbers do not apply to you",
        "detail": "Here is where most online advice goes wrong. The World Health Organization's 2019 guidelines say children under two should have no sedentary screen time except video calls with family, and children aged two to five should have no more than one hour a day. Those numbers are real — but they are for young children, and they say nothing about a teenager. Quoting the one-hour limit at a school student is a mistake, and it is a common one: the number is memorable, so it travels, and the age it belongs to gets left behind. The same is true of most scary statistics about screens. Before you repeat a number, ask who was studied. If the answer is toddlers, the number is not about you. The honest version of the guidance for school-age children is the one in the first step of this guide: no fixed limit, but screens must not replace sleep, movement, homework, or family time."
      },
      {
        "heading": "Eyes: the 20-20-20 rule",
        "detail": "Your eyes are the one part of the body where the experts give a concrete number — and it is a rhythm, not a limit. The 20-20-20 rule says: every twenty minutes of screen work, look at something at least twenty feet away for twenty seconds. It works because the muscle that focuses your eyes up close cramps when it is held in one position for hours, and twenty seconds of looking far away lets it release. The rule comes from eye health, not from a single study, and it is the same advice our eyes guide gives in full. Tie it to something that already happens — every time you finish a page, a problem, or a paragraph, look away before you start the next one. A sticky note on the edge of your screen that says '20-20-20' is enough of a reminder. After a few days the look-away becomes automatic."
      },
      {
        "heading": "A family media plan beats counting hours",
        "detail": "The American Academy of Pediatrics' February 2026 change has a practical side: instead of a parent or a student watching a clock, the family writes a plan together. The plan names the non-negotiables first — sleep, physical activity, homework, meals together, time with friends in person — and then fits screens around them. Screens stay out of bedrooms overnight. One or two windows a day are set aside for scrolling, so the feed has edges instead of swallowing the whole evening. The plan is written down and pinned up, so nobody has to remember it or argue about it. The reason a plan works where a limit fails is simple: a limit is a rule imposed on you, and a plan is an agreement you helped make. If the plan is not working, change the plan — the point is the sleep and the time together, not the document."
      },
      {
        "heading": "How to check the next scary number you see",
        "detail": "You will keep seeing alarming claims about screens — a percentage, a risk, a study that proves everything. Before you share one, ask three questions. Who said it? A named health body, like the World Health Organization or the American Academy of Pediatrics, is a source; a screenshot with no source is not. Who was studied? A finding about toddlers or adults is not a finding about school students. And does it say what the headline claims? Most headlines exaggerate a careful result. The two sources named in this guide are a good place to start checking: the World Health Organization's Guidelines on Physical Activity, Sedentary Behaviour and Sleep (2019), and the American Academy of Pediatrics' 2026 guidance on children's media use. This campaign's rule is the same as this guide's: no claim without a source, and no number without the age it belongs to."
      }
    ],
    "tryOneThing": {
      "label": "Try one thing",
      "text": "Check the source before you share the number."
    },
    "sources": [
      "World Health Organization, Guidelines on Physical Activity, Sedentary Behaviour and Sleep (2019)",
      "American Academy of Pediatrics, guidance on children's media use (2026)"
    ],
    "related": [
      {
        "slug": "the-9pm-screen-cut-off",
        "label": "Read the guide: The 9pm screen cut-off"
      },
      {
        "slug": "eyes-focus-and-breaks",
        "label": "Read the guide: Eyes, focus, and breaks"
      }
    ]
  },
  {
    "id": "sleep",
    "slug": "sleep",
    "title": "Sleep and night-time screen use",
    "kind": "topic",
    "category": "Sleep",
    "emoji": "😴",
    "minutes": 2,
    "summary": "Your last hour before bed decides how you sleep. Bright screens, fast videos, and unread messages all tell your brain the day is still going — so it stays switched on, and sleep has to fight for its place.",
    "intro": "Your last hour before bed decides how you sleep. Bright screens, fast videos, and unread messages all tell your brain the day is still going — so it stays switched on, and sleep has to fight for its place.",
    "steps": [
      {
        "heading": "The issue",
        "detail": "Screens after dark keep the brain alert when it should be winding down. Bright light, fast videos, and unfinished worries all vote for staying alert. A phone in bed is the most common reason teenagers do not get the sleep they need — not because they choose to stay up, but because the screen never gives the day a clear ending."
      },
      {
        "heading": "What the evidence says",
        "detail": "The World Health Organization’s guidance is built around sleep, physical activity, and limited screen use together: screens should not take sleep’s place. Screens before bed delay sleep because bright light limits melatonin — the hormone that tells your body the day is ending — and because fast, exciting content keeps the brain alert after the screen goes dark. Teenagers need eight to ten hours of sleep a night. The American Academy of Pediatrics agrees: its 2026 guidance puts sleep first in the family media plan, ahead of counting hours. (Sources: WHO Guidelines on Physical Activity, Sedentary Behaviour and Sleep, 2019; AAP guidance on children’s media use, 2026.)"
      },
      {
        "heading": "Possible effects",
        "detail": "Shorter, lighter sleep. Tired mornings and a slow start to the day. Focus that will not hold still in the first lessons. None of these are the same for everyone — some people feel a late night the next day, others do not notice it until the tiredness builds over a week. The pattern to watch is simple: if screens regularly push bedtime later, sleep is the thing being replaced."
      }
    ],
    "tryOneThing": {
      "label": "Practical steps",
      "text": "Try a 9pm screen cut-off: screens off at 9pm, and the last hour belongs to slower things. Dim warm light in the last hour, charge the phone across the room so it cannot be reached half-asleep, and keep a paper book or journal by the bed instead of a feed. If you like stories or music before sleep, listen with the screen face down and a sleep timer on. And keep the bed for sleep only — homework and videos happen at the desk. Read the full guide: Sleep and the last hour before bed."
    },
    "sources": [
      "World Health Organization, Guidelines on Physical Activity, Sedentary Behaviour and Sleep (2019)",
      "American Academy of Pediatrics, guidance on children's media use (2026)"
    ],
    "related": [
      {
        "slug": "sleep-and-the-last-hour-before-bed",
        "label": "Read the guide: Sleep and the last hour before bed"
      },
      {
        "slug": "the-9pm-screen-cut-off",
        "label": "Read the guide: The 9pm screen cut-off"
      }
    ]
  },
  {
    "id": "eyes",
    "slug": "eyes",
    "title": "Eyes and digital eye strain",
    "kind": "topic",
    "category": "Eyes",
    "emoji": "👁️",
    "minutes": 2,
    "summary": "When you stare at a screen, you blink less, your eyes dry out, and the muscle that focuses up close stays clenched for hours. The result is the familiar end-of-day feeling: dry eyes, a heavy head, and focus that will not hold still.",
    "intro": "When you stare at a screen, you blink less, your eyes dry out, and the muscle that focuses up close stays clenched for hours. The result is the familiar end-of-day feeling: dry eyes, a heavy head, and focus that will not hold still.",
    "steps": [
      {
        "heading": "The issue",
        "detail": "Screens ask your eyes to do one thing for a long time: focus up close, without blinking properly, at a bright rectangle. The focusing muscle inside the eye cramps when it is held in one position for hours, and the tear film that keeps eyes comfortable dries out when blinks become short and rare."
      },
      {
        "heading": "What the evidence says",
        "detail": "Eye-health guidance gives one concrete rhythm, not a limit: the 20-20-20 rule — every twenty minutes of screen work, look at something at least twenty feet away for twenty seconds, so the focusing muscle can release. The same guidance covers blinking properly (a complete blink, lid meeting lid, replenishes the tear film), keeping the screen an arm’s length away with the top at or slightly below eye level, and matching screen brightness to the room so your eyes are not constantly adjusting between a bright rectangle and a dark room. (Sources: the site’s own eyes guide, which follows standard eye-health guidance; see also WHO guidance on sedentary behaviour and breaks.)"
      },
      {
        "heading": "Possible effects",
        "detail": "Dry, gritty eyes. Headaches that arrive by the afternoon. Words that blur after short reading. These effects build with unbroken screen time and ease with breaks — which is why the fix is rhythm, not a special screen or an expensive pair of glasses."
      }
    ],
    "tryOneThing": {
      "label": "Practical steps",
      "text": "Use the 20-20-20 rule during study, and tie it to something that already happens: every time you finish a page, a problem, or a paragraph, look away before you start the next one. Pause at the end of each section for five slow, complete blinks. Sit an arm’s length from the screen, look slightly downward, and match the brightness to the room. Work in blocks of 25–50 minutes with real breaks. If headaches, blurred vision, or eye pain keep returning even with regular breaks, tell a parent or teacher and get your eyes checked — habits fix strain from how you use screens; they cannot fix eyesight that needs glasses. Read the full guide: Eyes, focus, and breaks."
    },
    "sources": [
      "Eyes, focus, and breaks — this site",
      "World Health Organization, guidance on sedentary behaviour and breaks"
    ],
    "related": [
      {
        "slug": "eyes-focus-and-breaks",
        "label": "Read the guide: Eyes, focus, and breaks"
      }
    ]
  },
  {
    "id": "focus",
    "slug": "focus",
    "title": "Focus, attention and distractions",
    "kind": "topic",
    "category": "Focus",
    "emoji": "🎯",
    "minutes": 2,
    "summary": "Feeds are designed to be opened without thinking. Notifications tug at your attention all day, and focus — which works in sets, not in one long run — never gets a clean stretch to work in.",
    "intro": "Feeds are designed to be opened without thinking. Notifications tug at your attention all day, and focus — which works in sets, not in one long run — never gets a clean stretch to work in.",
    "steps": [
      {
        "heading": "The issue",
        "detail": "Attention is pulled in two directions at once: the work in front of you, and the phone beside it. Every notification is a small tug that pulls you into a feed you had no plan to open, and each tug costs more than the seconds it takes — it takes time to find your place again. The feed itself is built to be opened without a decision, so most openings are never chosen at all."
      },
      {
        "heading": "What the evidence says",
        "detail": "The American Academy of Pediatrics’ 2026 guidance moved away from strict hour limits for children aged six and over, and toward a family media plan — an agreement made together at home that prioritises sleep, physical activity, and face-to-face time over counting hours. The plan works because it protects the things focus needs: sleep, movement, and stretches of time without interruption. The site’s own scrolling guide adds the practical side: friction between you and the feed — two extra swipes, a pause, a question — so opening it requires thinking. (Sources: AAP guidance on children’s media use, 2026; the site’s scrolling guide.)"
      },
      {
        "heading": "Possible effects",
        "detail": "Homework that takes longer than it should. Reading the same paragraph twice. A day that feels eaten, without anything to show for it. These are not a lack of discipline — they are what happens when attention is interrupted all day. The pattern to watch is not how many hours you spent, but how often you were pulled away."
      }
    ],
    "tryOneThing": {
      "label": "Practical steps",
      "text": "Work in focus blocks of 25–50 minutes, then take a real break — stand up, move, look far away — before the next block. Keep notifications only for direct messages from real people; mute recommendations, streaks, and marketing. Before tapping any feed app, pause for ten seconds and state your purpose aloud — if you cannot name one, put the phone down. Give scrolling fixed windows instead of open hours, and keep the feeds closed outside them. Read the full guides: Scrolling less without deleting everything, and Eyes, focus, and breaks."
    },
    "sources": [
      "American Academy of Pediatrics, guidance on children's media use (2026)",
      "Scrolling less without deleting everything — this site"
    ],
    "related": [
      {
        "slug": "scrolling-less-without-deleting-everything",
        "label": "Read the guide: Scrolling less without deleting everything"
      },
      {
        "slug": "eyes-focus-and-breaks",
        "label": "Read the guide: Eyes, focus, and breaks"
      }
    ]
  },
  {
    "id": "physical",
    "slug": "physical",
    "title": "Physical health, posture and movement",
    "kind": "topic",
    "category": "Body",
    "emoji": "🚶",
    "minutes": 2,
    "summary": "Screens keep you in one posture for hours, and they replace movement without you noticing. The fix is not a workout plan — it is movement woven into the day, in the gaps screens usually fill.",
    "intro": "Screens keep you in one posture for hours, and they replace movement without you noticing. The fix is not a workout plan — it is movement woven into the day, in the gaps screens usually fill.",
    "steps": [
      {
        "heading": "The issue",
        "detail": "A long study session on a screen means hours of sitting still in one posture: shoulders forward, neck bent, eyes fixed. Movement gets pushed out quietly — the walk that did not happen, the break spent scrolling instead of standing. The body does not complain at once; it complains by evening, as stiffness, restlessness, and tiredness."
      },
      {
        "heading": "What the evidence says",
        "detail": "The World Health Organization’s guidance puts physical activity and limited sedentary behaviour together with sleep: the three belong together, and screens should not replace movement. There is no single fixed number of active minutes that fits every school-age child — the guidance is about balance, not a target on a chart. What matters is the pattern: movement spread through the day, and screen time that does not swallow it. (Source: WHO Guidelines on Physical Activity, Sedentary Behaviour and Sleep, 2019.)"
      },
      {
        "heading": "Possible effects",
        "detail": "Stiff neck and shoulders. Less energy by the afternoon. Restless sleep after a day spent sitting. These effects are general — not everyone feels them the same way — but they follow the same pattern: a day with almost no movement feels heavier than a day with some, whatever the screen hours were."
      }
    ],
    "tryOneThing": {
      "label": "Practical steps",
      "text": "Move in every break: stand up, stretch, walk to a window, drink water. Leave the phone behind at breaks so the break is movement, not another screen. Keep the screen an arm’s length away with the top at or slightly below eye level, so you are not leaning in and hunching. Balance screen time with real activity — a walk, a game, sport — and make room for it in the day instead of hoping it happens. Read the full guide: Phone-free breaks that actually stick."
    },
    "sources": [
      "World Health Organization, Guidelines on Physical Activity, Sedentary Behaviour and Sleep (2019)"
    ],
    "related": [
      {
        "slug": "phone-free-breaks-that-actually-stick",
        "label": "Read the guide: Phone-free breaks that actually stick"
      }
    ]
  },
  {
    "id": "mental",
    "slug": "mental",
    "title": "Mental wellbeing and online experiences",
    "kind": "topic",
    "category": "Mind",
    "emoji": "💛",
    "minutes": 2,
    "summary": "Online experiences affect how you feel — sometimes in small ways, sometimes in ways that last into the evening. This page makes no medical claims: experiences differ from person to person, and the guidance here is general.",
    "intro": "Online experiences affect how you feel — sometimes in small ways, sometimes in ways that last into the evening. This page makes no medical claims: experiences differ from person to person, and the guidance here is general.",
    "steps": [
      {
        "heading": "The issue",
        "detail": "A feed can leave you feeling worse without any single post being the cause: comparison with other people’s days, late-night group chats that never end, the pressure to reply instantly, the feeling of missing out when you step away. None of this is one big event. It is the slow accumulation of small moments, and it is easy to miss while it is happening."
      },
      {
        "heading": "What the evidence says",
        "detail": "The evidence here is general, and this page says so plainly. The American Academy of Pediatrics’ 2026 guidance emphasises face-to-face time and family media plans — agreements at home about when screens are on and off — because time with real people is what protects mood most reliably. There is no single number or study that predicts how any one person will feel online. If something online is bothering you, that is worth taking seriously regardless of what any guidance says. (Source: AAP guidance on children’s media use, 2026.)"
      },
      {
        "heading": "Possible effects",
        "detail": "Feeling worse after certain feeds. Late-night chats keeping you awake. Pressure to answer messages immediately, even at midnight. A low mood that lifts when you spend time offline with real people. These effects are not the same for everyone — some people are barely affected, others feel them strongly — and that difference is normal."
      }
    ],
    "tryOneThing": {
      "label": "Practical steps",
      "text": "Clean the feed: unfollow the accounts that pull you into endless scrolling or leave you feeling worse, and keep the ones you genuinely care about. Tell close friends your boundary — for example, that your screens go off at 9pm — so nobody expects an instant reply at midnight. Spend part of every day offline with real people. And if something online upsets you, talk to someone you trust about it; you do not have to carry it alone. For ongoing problems with mood or sleep, see a professional — this is a habits guide, not medical advice."
    },
    "sources": [
      "American Academy of Pediatrics, guidance on children's media use (2026)"
    ],
    "related": [
      {
        "slug": "the-9pm-screen-cut-off",
        "label": "Read the guide: The 9pm screen cut-off"
      }
    ]
  },
  {
    "id": "routines",
    "slug": "routines",
    "title": "Everyday routines and screen dependency",
    "kind": "topic",
    "category": "Routines",
    "emoji": "🔁",
    "minutes": 2,
    "summary": "Hours disappear without a decision being made. Meals, commutes, and evenings happen on autopilot, with the phone reached for before you have decided to reach for it. The fix is not willpower — it is friction, edges, and plans made while you are fresh.",
    "intro": "Hours disappear without a decision being made. Meals, commutes, and evenings happen on autopilot, with the phone reached for before you have decided to reach for it. The fix is not willpower — it is friction, edges, and plans made while you are fresh.",
    "steps": [
      {
        "heading": "The issue",
        "detail": "Screen dependency rarely looks like a dramatic problem. It looks ordinary: the phone picked up during a meal, the commute spent scrolling, the evening that ends two hours later than planned with nothing to show for it. The habit is automatic — the thumb opens the app before the brain has decided to open it — so willpower in the moment is the wrong tool. The decision has to happen earlier, when you are fresh."
      },
      {
        "heading": "What the evidence says",
        "detail": "The American Academy of Pediatrics’ 2026 guidance recommends a family media plan: an agreement made together at home about when screens are on and when they are off, with sleep, physical activity, homework, meals together, and time with friends in person named first, and screens fitted around them. The plan is written down and pinned up, so nobody has to remember it or argue about it. The site’s own scrolling guide adds the same idea for one person: friction — two extra swipes, a pause, a question — so opening a feed requires thinking. (Sources: AAP guidance on children’s media use, 2026; the site’s scrolling guide.)"
      },
      {
        "heading": "Possible effects",
        "detail": "Meals, homework, and sleep get pushed out a little at a time. The day feels shorter than it was. You check the phone without remembering why, and the check turns into twenty minutes. None of this means something is wrong with you — it means the habit has no edges, and habits without edges expand until something else gives."
      }
    ],
    "tryOneThing": {
      "label": "Practical steps",
      "text": "Give the day edges: device-free meals and commutes, fixed windows for scrolling instead of open hours, and phone-free breaks. Before opening a feed, pause for ten seconds and state your purpose aloud — if you cannot name one, put the phone down. Move endless-scroll apps into a folder on the last screen page, so opening them takes a deliberate act. And write a family media plan together: name the non-negotiables first, then fit screens around them. Read the full guides: Scrolling less without deleting everything, and The 9pm screen cut-off."
    },
    "sources": [
      "American Academy of Pediatrics, guidance on children's media use (2026)",
      "Scrolling less without deleting everything — this site"
    ],
    "related": [
      {
        "slug": "scrolling-less-without-deleting-everything",
        "label": "Read the guide: Scrolling less without deleting everything"
      },
      {
        "slug": "the-9pm-screen-cut-off",
        "label": "Read the guide: The 9pm screen cut-off"
      }
    ]
  }
];
