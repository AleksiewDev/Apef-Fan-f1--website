/* Apex Fan Club — Data + Interactions + Animations (vanilla JS)
   Notes:
   - Replace image URLs with your chosen real photos for drivers and teams.
   - Mexico City GP date/time localized from Anton’s timezone (EEST). Adjust if needed.
*/

// Util: formatters
const fmt = {
  date(d) {
    const dt = new Date(d);
    return dt.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  },
  time(d) {
    const dt = new Date(d);
    return dt.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  }
};

// Next GP: Mexico City (Anton in EEST, event Sunday evening local)
const nextGp = {
   name: "São Paulo Grand Prix",
  venue: "Autódromo José Carlos Pace (Interlagos)",
  startISO: "2025-11-09T14:00:00-03:00", // Local race start time in Brazil (UTC-3)
  sessions: [
    { key: "fp1", label: "FP1", iso: "2025-11-07T11:30:00-03:00" },
    { key: "sprintQualifying", label: "Sprint Qualifying", iso: "2025-11-07T15:30:00-03:00" },
    { key: "sprint", label: "Sprint", iso: "2025-11-08T11:00:00-03:00" },
    { key: "qualifying", label: "Qualifying", iso: "2025-11-08T15:00:00-03:00" },
    { key: "race", label: "Race", iso: "2025-11-09T14:00:00-03:00" }
  ]
};

// Drivers 2025 (name, code, team, points, wins, poles, photo)
const drivers2025 = [
  { pos: 1, name: "Lando Norris", code: "NOR", nationality: "GBR", team: "McLaren", points: 357, wins: 6, poles: 5, photo: "https://mclaren.bloomreach.io/cdn-cgi/image/format=webp,quality=80/delivery/resources/content/gallery/mclaren-racing/formula-1/2025/nsr/f1-75-live-m/web/2025_lando_team_pic_02.jpg" },
  { pos: 2, name: "Oscar Piastri", code: "PIA", nationality: "AUS", team: "McLaren", points: 356, wins: 7, poles: 5, photo: "https://mclaren.bloomreach.io/cdn-cgi/image/format=webp,quality=80/delivery/resources/content/gallery/mclaren-racing/formula-1/2025/nsr/f1-75-live-m/web/2025_oscar_team_pic_02.jpg" },
  { pos: 3, name: "Max Verstappen", code: "VER", nationality: "NED", team: "Red Bull Racing", points: 321, wins: 5, poles: 7, photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOmb-f8vwQW9GTmAejEbUu2JeYUlzkscG8vZoaXwnvmzbJjqInaA7aSEAeB6jRrZRFCxA&usqp=CAU" },
  { pos: 4, name: "George Russell", code: "RUS", nationality: "GBR", team: "Mercedes", points: 258, wins: 2, poles: 2, photo: "https://images.ctfassets.net/1fvlg6xqnm65/DF8GKGlCgVkML7jYA3lX8/f98a3b6f3fdaff998fa1ee7cdc1fa5c9/GR-EYNTK-IMAGE-MOBILE.jpg?w=626&q=75&fm=webp" },
  { pos: 5, name: "Charles Leclerc", code: "LEC", nationality: "MON", team: "Ferrari", points: 210, wins: 0, poles: 1, photo: "https://aceracegear.com/wp-content/uploads/2025/02/cl-01-2025.jpg" },
  { pos: 6, name: "Lewis Hamilton", code: "HAM", nationality: "GBR", team: "Ferrari", points: 146, wins: 0, poles: 0, photo: "https://store.ferrari.com/dw/image/v2/BGDG_PRD/on/demandware.static/-/Sites-48/default/dw0196a800/images/zoom/LA06Zf_170_2.png?strip=false" },
  { pos: 7, name: "Kimi Antonelli", code: "ANT", nationality: "ITA", team: "Mercedes", points: 97, wins: 0, poles: 0, photo: "https://i.namu.wiki/i/uoiclYPCB7vPlR53OzLou_H9HJ-qDCPRy-OeMqaavDgvSISa7CySyCKsgzl8A0f_3vOf_eH7v7rBt8gaHb8beg.webp" },
  { pos: 8, name: "Alexander Albon", code: "ALB", nationality: "THA", team: "Williams", points: 73, wins: 0, poles: 0, photo: "https://static.independent.co.uk/2024/02/05/19/e52f9590a04d09ef4bf873e9c5122f2eY29udGVudHNlYXJjaGFwaSwxNzA3MjQ2MzI3-2.75253307.jpg?width=1200&height=1200&fit=crop" },
  { pos: 9, name: "Nico Hülkenberg", code: "HUL", nationality: "GER", team: "Kick Sauber", points: 41, wins: 0, poles: 0, photo: "https://pbs.twimg.com/media/GMrCz6GWEAASYks?format=jpg&name=large" },
  { pos: 10, name: "Isack Hadjar", code: "HAD", nationality: "FRA", team: "Racing Bulls", points: 39, wins: 0, poles: 0, photo: "https://framerusercontent.com/images/R4z6H2nIMtXBpFzkL4qJ2Jny88.jpg?width=3072&height=3840" },
  { pos: 11, name: "Carlos Sainz", code: "SAI", nationality: "ESP", team: "Williams", points: 38, wins: 0, poles: 0, photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_RyGKN7IWY5i31pK8yXLVDcwvjYRS0XLQGufGNCztDziweEHsWkzIomBsjgbi96XzIx8&usqp=CAU" },
  { pos: 12, name: "Fernando Alonso", code: "ALO", nationality: "ESP", team: "Aston Martin", points: 37, wins: 0, poles: 0, photo: "https://aceracegear.com/wp-content/uploads/2025/03/am-fa-2025-1.jpg" },
  { pos: 13, name: "Oliver Bearman", code: "BEA", nationality: "GBR", team: "Haas F1 Team", points: 22, wins: 0, poles: 0, photo: "https://preview.redd.it/ollie-bearmans-helmet-for-the-2025-season-v0-jhzkvievzoje1.jpg?width=1080&crop=smart&auto=webp&s=26282e9b98b9a85596672ff152d03c332782c82c" },
  { pos: 14, name: "Lance Stroll", code: "STR", nationality: "CAN", team: "Aston Martin", points: 32, wins: 0, poles: 0, photo: "https://aurupteur.com/uploads/brefs/4511/4511_gkeojbrwyaijt58.jpg" },
  { pos: 15, name: "Liam Lawson", code: "LAW", nationality: "NZL", team: "Racing Bulls", points: 30, wins: 0, poles: 0, photo: "https://i.namu.wiki/i/-QcAd3hXRJrSMq9n1bSfMYrnGVDHN2BJ3JLMhGXs1PkMfc3Jyd9A2Gy-ugqDmfQkZgM9BJ22pYbg711lUdV-sw.webp" },
  { pos: 16, name: "Esteban Ocon", code: "OCO", nationality: "FRA", team: "Haas F1 Team", points: 30, wins: 0, poles: 0, photo: "https://i.redd.it/esteban-ocons-helmet-for-the-2025-season-v0-u52c357k3wje1.jpg?width=3277&format=pjpg&auto=webp&s=eb145ca50e5bc3f1154fb9efa9636832904de868" },
  { pos: 17, name: "Yuki Tsunoda", code: "TSU", nationality: "JPN", team: "Red Bull Racing", points: 28, wins: 0, poles: 0, photo: "https://newsgpcdn.vshcdn.net/i/images/1586/yuki-tsunoda-f1-post-season-test-with-red-bull_f.jpg" },
  { pos: 18, name: "Pierre Gasly", code: "GAS", nationality: "FRA", team: "Alpine", points: 20, wins: 0, poles: 0, photo: "https://aceracegear.com/wp-content/uploads/2025/03/alpine-pg-2025-1.jpg" },
  { pos: 19, name: "Gabriel Bortoleto", code: "BOR", nationality: "BRA", team: "Kick Sauber", points: 19, wins: 0, poles: 0, photo: "https://pbs.twimg.com/media/GjLwdydW4AATow-.jpg:large" },
  { pos: 20, name: "Franco Colapinto", code: "COL", nationality: "ARG", team: "Alpine", points: 0, wins: 0, poles: 0, photo: "https://instagram.fsof10-1.fna.fbcdn.net/v/t39.30808-6/485158953_122196919394251980_6379425086884951888_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InRocmVhZHMuQ0FST1VTRUxfSVRFTS5pbWFnZV91cmxnZW4uODAyeDEzNzkuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlLmMyIn0&_nc_ht=instagram.fsof10-1.fna.fbcdn.net&_nc_cat=100&_nc_oc=Q6cZ2QFOF63zKGK_M4W2iLOT5UvcCCUq3UJt_8vW4JYd0rtIlNPzxFhv4uTgFWZF5YPjAtk&_nc_ohc=Hh0BVWNvipMQ7kNvwFeLOqS&_nc_gid=CrJ8NA_nvF6OD7xRYaKgmQ&edm=AKr904kAAAAA&ccb=7-5&ig_cache_key=MzU3MjcxMzU3Njk0MDc5MzMzMA%3D%3D.3-ccb7-5&oh=00_Afe_-uUTtgPM9Al8jg6m8JHD4pz83NrDhXI-6WGGMcPTLg&oe=69017193&_nc_sid=23467f" },
  { pos: 21, name: "Jack Doohan", code: "DOO", nationality: "AUS", team: "Alpine", points: 0, wins: 0, poles: 0, photo: "https://preview.redd.it/franco-colapinto-in-alpine-2025-will-be-the-deja-vu-of-v0-mfphwgeotvye1.png?width=1320&format=png&auto=webp&s=c67fd2287c94f2ea96a53595c6616976b0e0af20" }
];


// Constructors 2025
const constructors2025 = [
  { pos: 1, name: "Mclaren F1 Team", points: 713, drivers: ["Oscar Piastri", "Lando Norris"], photo: "https://media.formula1.com/image/upload/t_16by9Centre/c_lfill,w_3392/q_auto/v1740000000/trackside-images/2025/F1_Grand_Prix_of_Netherlands/2233042195.webp" },
  { pos: 2, name: "Scuderia Ferrari HP", points: 356, drivers: ["Charles Leclerc", "Lewis Hamilton"], photo: "https://trf1.net/wp-content/uploads/2025/02/Charles-Leclerc-Ferrari-1-1-e1739960243357.jpeg" },
  { pos: 3, name: "Mercedes-Amg Petronas F1 Team", points: 355, drivers: ["George Russell", "Kimi Antonelli"], photo: "https://images.ctfassets.net/1fvlg6xqnm65/6SsQDb4D1Ixx99OjHoDtbC/590b2a46b5090221a46fb5ac52279309/F1-2025-IMAGE-2.jpg?w=1920&q=75&fm=webp" },
  { pos: 4, name: "Oracle Red Bull Racing ", points: 346, drivers: ["Max Verstappen", "Yuki tsunoda"], photo: "https://cdn.racingnews365.com/2025/Verstappen/_1092x683_crop_center-center_85_none/Verstappen-Bahrain-testing.jpg?v=1740576626" },
  { pos: 5, name: "Atlassian Williams Racing", points: 111, drivers: ["Alexander Albon", "Carlos Sainz"], photo: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/2025/Williams/williams-2025-launch-6.webp" },
  { pos: 6, name: "Racing Bulls", points: 72, drivers: ["Isack Hadjar", "Liam  Lawson"], photo: "https://media.tudorwatch.com/image/upload/v1/tudormag/SI202503140201" },
  { pos: 7, name: "Aston Martin Aramco Cognizant Formula One Team", points: 69, drivers: ["Fernando Alonso", "Lance Stroll"], photo: "https://upload.wikimedia.org/wikipedia/commons/3/33/2025_Japan_GP_-_Aston_Martin_-_Fernando_Alonso_-_FP1.jpg" },
  { pos: 8, name: "MoneyGram Haas F1 Team", points: 62, drivers: ["Oliver Bearman", "Esteban Ocon"], photo: "https://upload.wikimedia.org/wikipedia/commons/f/f8/FIA_F1_Austria_2025_Nr._87_Bearman.jpg" },
  { pos: 9, name: "Kick Sauber", points: 59, drivers: ["Nico Hulkenberg", "Gabriel Bortoleto"], photo: "https://upload.wikimedia.org/wikipedia/commons/9/9e/2025_Japan_GP_-_Sauber_-_Nico_Hulkenberg_-_FP1.jpg" },
  { pos: 10, name: "BWT Alpine F1 Team", points: 20, drivers: ["Piere Gasly", "Franco Colapinto"], photo: "https://upload.wikimedia.org/wikipedia/commons/a/ae/FIA_F1_Austria_2025_Nr._10_Gasly.jpg" },
];


 

// News after USA GP 2025 (no sources displayed; summaries are descriptive)
const newsAfterUSAGP = [
  {
  title: "Who Will Drive for Red Bull Racing and Racing Bulls in 2026?yj",
  date: "2025-10-29",
  image: "https://cdn.racingnews365.com/2024/Tsunoda/_1800x945_crop_center-center_75_none/Tsunoda-Red-Bull-Abu-Dhabi-test.jpg?v=1733815211",
  text: `As the 2025 Formula 1 season nears its conclusion, all eyes are on Red Bull Racing and its sister team, Racing Bulls, to confirm their driver line-ups for 2026. With the new regulations arriving next year, the decisions made now will shape the future of both teams.

Red Bull Racing: Verstappen + Hadjar?
Max Verstappen is already confirmed with Red Bull until 2028, making him the undisputed anchor of the team. The real question has been who will partner him. For months, speculation has swirled around Yuki Tsunoda, Liam Lawson, and rookie sensation Isack Hadjar. According to multiple reports, Red Bull is leaning toward **promoting Hadjar to the senior team**. His strong performances in 2025 and his reputation as one of the most promising young drivers in the Red Bull program make him the frontrunner. This would give Verstappen his fourth teammate in just over a year, but one that Red Bull hopes can finally provide stability.

Racing Bulls: Lawson, Tsunoda… or Lindblad?
The Faenza-based Racing Bulls squad faces an equally intriguing decision. Liam Lawson has impressed with consistency and adaptability, while Yuki Tsunoda has shown flashes of brilliance that recently revived his chances of staying on the grid. However, the wildcard is **Arvid Lindblad**, the teenage prodigy from Formula 2, who is pushing hard for a promotion. If Red Bull promotes Hadjar, Racing Bulls could field a Lawson–Tsunoda partnership, but Lindblad’s rapid rise means a reshuffle is still possible.

The Bigger Picture
Helmut Marko and Red Bull management have delayed final announcements until after the Abu Dhabi Grand Prix, prioritizing the championship fight before locking in their 2026 line-ups. What is clear, however, is that Red Bull’s driver academy remains central to their strategy. With Verstappen as the benchmark, the team is searching for the next long-term star who can carry the brand into the new era of Formula 1.

Prediction
- Red Bull Racing (2026): Max Verstappen & Isack Hadjar* 
- Racing Bulls (2026): Liam Lawson & Yuki Tsunoda (with Arvid Lindblad waiting in the wings) 

The final word will come in December, but the direction is clear: Red Bull is betting on youth, speed, and continuity to stay ahead in the new regulations era.`
  },
   {
  title: "Verstappen Strikes Back: How Red Bull Cut McLaren’s Championship Edge",
  date: "2025-10-28",
  image: "https://media.formula1.com/image/upload/t_16by9Centre/c_lfill,w_3392/q_auto/v1740000000/trackside-images/2025/F1_Grand_Prix_of_Mexico/2243486274.webp",
  text: `For much of the 2025 Formula 1 season, McLaren looked untouchable. Oscar Piastri’s early dominance and Lando Norris’ mid-season surge gave the Woking team a commanding lead in both championships. At one point, Verstappen trailed by more than 100 points, and many believed the fight was over. Yet, as the season enters its final stretch, the Dutchman has slashed the gap to just 36 points, reigniting the title battle.

How did Red Bull turn the tide?

The answer lies in a combination of relentless development and McLaren’s plateau in performance. Since the summer break, Red Bull introduced a series of aerodynamic and floor upgrades that unlocked nearly half a second per lap in race trim. These updates debuted at Monza and Baku, where Verstappen delivered back-to-back victories, and were refined further in Austin, where he dominated from lights to flag. Even on high-downforce tracks like Singapore, where McLaren had been supreme, Red Bull’s RB21 showed newfound competitiveness.

Meanwhile, McLaren’s advantage has eroded. After a blistering first half of the season, their development curve flattened. Red Bull boss Laurent Mekies noted that McLaren “no longer has the relative performance edge” they enjoyed earlier in the year. In raw numbers, Red Bull has won three of the last five races—more than in the entire first 15 rounds combined.

Why was Verstappen faster and more dominant?

1. Upgrades at the right time – Red Bull’s late-season package improved tyre management and stability, allowing Verstappen to push harder in long stints without degradation.
2. Strategic execution – In Austin and Baku, Red Bull outmaneuvered McLaren on pit strategy, controlling track position and dictating race pace.
3. Driver consistency – Verstappen has maximized every opportunity, finishing on the podium even when the car wasn’t the fastest, such as in Mexico City.
4. **McLaren under pressure** – With Norris and Piastri now fighting each other as well as Verstappen, small mistakes and setup missteps have cost them valuable points.

The bigger picture

From a 104-point deficit after the Dutch Grand Prix to just 36 points now, Verstappen’s comeback is one of the most dramatic in modern Formula 1. With four races left, the championship is wide open. McLaren still holds the lead, but the momentum is firmly with Red Bull. If Verstappen maintains this form, the papaya cars may find themselves watching another Red Bull title celebration slip through their fingers.

The final rounds will decide whether McLaren’s early-season dominance was enough, or if Verstappen’s late charge will deliver him a fifth consecutive world championship. One thing is certain: the balance of power has shifted, and Red Bull has proven once again that they are never out of the fight.
`
},
{
  title: "Nikola Tsolov – The Next Big Champion",
  date: "2025-10-28",
  image: "https://dizzyriders.bg/uploads/avtomobili/07_2025/GettyImages-2209871496.jpg",
  text: `Nikola Tsolov, The Bulgarian Lion, is no longer just a rising star — he is the next big champion in the making. At only 18 years old, he has already carved his name into the history books of junior single-seaters, and the motorsport world is watching closely as he edges toward Formula 2 and, ultimately, Formula 1.  

A Meteoric Rise 
From his karting days, Tsolov displayed a rare blend of precision and aggression. His 2022 Spanish F4 season was nothing short of dominant: **13 wins in 21 races**, a record-breaking campaign that announced him as a generational talent. Mentored by Fernando Alonso, he quickly became a driver to watch.  

Formula 3 Brilliance 
In FIA Formula 3, Tsolov proved his F4 success was no fluke. With Campos Racing, he became the **most successful driver in F3 history with five career wins**, finishing runner-up in the 2025 championship. His qualifying pace, tire management, and fearless overtakes set him apart from his peers.  

The Speed Factor  
Telemetry and sector data consistently place Tsolov among the fastest on the grid. He thrives under pressure, often delivering his best laps in the final moments of qualifying or in high-stakes race scenarios. His adaptability — from street circuits to high-speed classics — makes him a complete driver.  

On the Verge of Formula 2  
Campos Racing has already confirmed Tsolov’s promotion to **Formula 2 in 2026** as part of the Red Bull Junior Team. Yet, insiders suggest he could debut even earlier. If a seat opens for the final two races of the 2025 season, Tsolov is the natural choice: he knows the team, he has the speed, and Red Bull has every reason to accelerate his development.  

Why He’s the Next Big Champion
- Talent: Proven across multiple categories with dominant results.  
- Speed: Among the fastest in qualifying and race pace metrics.  
- Mentality: Calm under pressure, aggressive when it counts.  
- Support: Backed by Campos, Red Bull, and Fernando Alonso’s mentorship.  
- National Pride: The first Bulgarian to reach this level, carrying the hopes of a nation.  

Whether his F2 debut comes in the last two races of 2025 or officially in 2026, one thing is clear: Nikola Tsolov is not just another prospect. He is the next big champion — and the motorsport world should be ready for the roar of the Bulgarian Lion.
`
   },
   {
     
  title: "Hamilton’s Mexico GP penalty vs. Verstappen: what the stewards saw",
  date: "2025-10-27",
  image: "https://cdn.racingnews365.com/2025/Hamilton/_1092x683_crop_center-center_85_none/Hamilton-Verstappen-Mexico-race.jpg?v=1761524658",
  text: `
Lewis Hamilton’s 10-second time penalty in Mexico came from one specific moment: he left the track at Turn 4 while battling Max Verstappen and rejoined ahead, which the stewards judged as “leaving the track and gaining a lasting advantage.” That call, not the start-line chaos, defined his race and dropped him to eighth at the flag.

At the start, multiple drivers cut the Turn 1–2 complex as they went four-wide into the opening corner. Charles Leclerc and Max Verstappen both ran off and rejoined, with Leclerc ceding position and Verstappen slotting in behind Hamilton. Because positions were restored and no lasting advantage was deemed to have been gained there, no penalties were issued for those start incidents.

The flashpoint was lap six: Verstappen sent a late move down the inside of Turn 1, contacted Hamilton on exit, ran onto the grass through Turn 2, and rejoined at Turn 3. The pair continued side-by-side to Turn 4, where Hamilton tried the outside, locked up, and cut the escape road—emerging ahead. Stewards ruled that specific sequence gave Hamilton a lasting advantage off-track, triggering the 10-second penalty.

Why Verstappen didn’t get penalized for the Turn 1 lunge or the contact: the stewards viewed it as hard racing with both drivers contributing, no clear “causing a collision,” and crucially, Verstappen didn’t retain an off-track gain—he went to the grass and fell into a position that didn’t net him an advantage. In contrast, Hamilton’s Turn 4 cut directly resulted in an overtake completed off the circuit, which is treated differently under the “lasting advantage” standard.

Hamilton called the decision “kind of nuts,” pointing to inconsistency with the start incidents where others went off without sanction. The stewards’ distinction, though, rests on outcome: off-track but no net gain at the start versus off-track and a completed pass later. That outcome-based consistency—rather than identical treatment of all off-track moments—explains the split between no action for Verstappen and a time penalty for Hamilton.

Ferrari boss Fred Vasseur highlighted how the penalty compromised Hamilton’s podium shot despite strong pace, underscoring how fine margins in stewarding decisions can swing results. Whether one agrees with the threshold for “lasting advantage,” Mexico’s calls followed a familiar FIA pattern: tolerate first-lap chaos when positions are restored, clamp down when passes are finished off-track under green-flag duels.
`
   },
   {
  title: "Driver Reactions – Mexico GP 2025",
  date: "2025-10-27",
  image: "https://i.ytimg.com/vi/GbG_Y9bCitU/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAl4n8j-M4MCZcqnKDc9I8R8XzhDw",
  text: `Here’s what the grid had to say after a dramatic Mexico City Grand Prix:

Lando Norris (McLaren, Winner):
"It felt like the perfect race. Great launch, great pace, and the car was incredible. To win like this and take the championship lead is special."

Charles Leclerc (Ferrari, 2nd):
"We didn’t expect to be this strong here. P2 is a great result, but Lando was untouchable today."

Max Verstappen (Red Bull, 3rd):
"We maximized what we had. Strategy worked, but McLaren were simply too quick. Still, these points keep us in the fight."

Ollie Bearman (Haas, 4th):
"Unbelievable. To finish P4 here is the best moment of my career so far. The team gave me a great car and we executed perfectly."

Oscar Piastri (McLaren, 5th):
"A tough race. I struggled with balance and tyre wear. Losing the championship lead hurts, but there are still races to fight back."

Kimi Antonelli (Mercedes, 6th): 
"It was tough physically, but I’m happy with P6. Every race I’m learning more, and scoring points like this is a big step."

George Russell (Mercedes, 7th):
"We had the pace for more, but tyre degradation hurt us. Still, both cars in the points is positive."

Lewis Hamilton (Ferrari, 8th): 
"Not the result I wanted, but we fought hard. The car was tricky in traffic, and we’ll regroup for Brazil."

Esteban Ocon (Haas, 9th):
"Double points for Haas is fantastic. Ollie’s P4 shows what this team can do, and I’m proud to contribute."

Gabriel Bortoleto (Sauber, 10th):
"Scoring a point here feels great. It was a tough race, but we managed tyres well and capitalized on opportunities."

Yuki Tsunoda (Red Bull, 11th):  
"Frustrating to miss out on points. The pace was there, but traffic and strategy didn’t work in our favor."

Alex Albon (Williams, 12th):  
"We fought hard, but lacked the pace to challenge for points. Still, encouraging signs for the team."

Isack Hadjar (Racing Bulls, 13th): 
"It was a learning race. Not easy, but I gained experience and kept it clean."

Lance Stroll (Aston Martin, 14th): 
"We didn’t have the speed this weekend. Just damage limitation."

Pierre Gasly (Alpine, 15th):
"A tough race. We struggled with balance and couldn’t fight in the midfield."

Franco Colapinto (Alpine, 16th):
"Not the result I wanted, but every lap is valuable experience."

Carlos Sainz (Williams, 17th):  
"We lacked pace all weekend. Frustrating, but we’ll keep pushing."

Fernando Alonso (Aston Martin, DNF):
"A shame to retire. We had the pace for points, but reliability let us down."

Nico Hülkenberg (Sauber, DNF):
"Disappointing to retire. We’ll regroup and come back stronger."

Liam Lawson (Racing Bulls, DNF):
"Not the way I wanted the weekend to end. We’ll reset for Brazil."`
   },
   {
   title: "Mexico GP 2025 – Full Weekend Report & São Paulo Preview",
  date: "2025-10-27",
  image: "https://cdni.autocarindia.com/ExtraImages/20251027125339_f1_norris_mexico_gp.jpg",
  text: `The Mexico City Grand Prix 2025 delivered one of the defining weekends of the season. 
From practice to the chequered flag, the Autódromo Hermanos Rodríguez was alive with drama, dominance, and breakthrough performances.

**Weekend Recap**
- FP1: Charles Leclerc topped the opening session, Ferrari showing strong one‑lap pace.  
- FP2: Max Verstappen responded with the fastest time, Red Bull looking sharp in race trim.  
- FP3: Lando Norris struck back, setting the tone for qualifying.  
- Qualifying: Norris delivered a stunning 1:15.586 to take pole, ahead of Leclerc and Verstappen.  
- Race: Norris launched perfectly, defended Turn 1, and never looked back. He won by over 30 seconds, taking the **championship lead**.  

**Race Classification (Top 10)**
1. Lando Norris (McLaren) – Winner  
2. Charles Leclerc (Ferrari)  
3. Max Verstappen (Red Bull Racing)  
4. Ollie Bearman (Haas) – career‑best finish  
5. Oscar Piastri (McLaren)  
6. Kimi Antonelli (Mercedes)  
7. George Russell (Mercedes)  
8. Lewis Hamilton (Ferrari)  
9. Esteban Ocon (Haas)  
10. Garbiel Bortoleto (Sauber)  

**Key Storylines**
- **Norris Dominates:** A lights‑to‑flag win, his most commanding performance yet, and enough to seize the championship lead.  
- **Piastri Falters:** Only P5, losing the title lead for the first time since Spa.  
- **Verstappen Resilient:** A solid P3 keeps him in range.  
- **Bearman Breakthrough:** Haas’s rookie delivered P4, their best result in years.  

**Championship Impact**
- Norris leads the Drivers’ Championship by 1 points over Piastri.  
- Verstappen sits 32 points back, still a threat with sprints ahead.  
- Haas leapfrogs rivals in the Constructors’ thanks to Bearman’s heroics.  



---

**Looking Ahead – São Paulo GP (Nov 7–9, 2025)**
- Venue: Autódromo José Carlos Pace (Interlagos), Brazil.  
- Format: Sprint weekend (FP1 + Sprint Qualifying on Friday, Sprint + Qualifying on Saturday, Race on Sunday).  
- What to expect:  
  - McLaren momentum: Norris arrives as championship leader.  
  - Piastri under pressure: must respond to stop the slide.  
  - Verstappen threat: Interlagos is one of his strongest circuits.  
  - Mercedes wildcard: Antonelli and Russell could disrupt the podium fight.  
  - Haas confidence: Bearman’s P4 gives them belief in more points.  

**São Paulo GP Timetable (local Brazil time, UTC‑3)**
- FP1: Fri Nov 7, 11:30  
- Sprint Qualifying: Fri Nov 7, 15:30  
- Sprint: Sat Nov 8, 11:00  
- Qualifying: Sat Nov 8, 15:00  
- Race: Sun Nov 9, 14:00  

The title fight is now a three‑way battle. Norris has momentum, Piastri must regroup, and Verstappen is lurking. Interlagos could be the weekend that decides the balance of power heading into the final rounds.`
   },
   {
      title: "Mexico GP 2025 – Norris dominates, takes championship lead",
  date: "2025-10-26",
  image: "https://media.formula1.com/image/upload/c_lfill,w_2048/q_auto/v1740000000/fom-website/2025/Mexico/GENERAL%20CROP%20-%202025-10-25T231214.912.webp",
  text: `Lando Norris produced a flawless drive at the Autódromo Hermanos Rodríguez, converting pole into a dominant victory and seizing the lead of the Drivers’ Championship. The McLaren driver controlled the race from lights to flag, finishing over half a minute clear of his rivals.

**Full Race Classification**
1. Lando Norris (McLaren) – Winner  
2. Charles Leclerc (Ferrari)  
3. Max Verstappen (Red Bull Racing)  
4. Ollie Bearman (Haas) – career‑best finish  
5. Oscar Piastri (McLaren)  
6. Kimi Antonelli (Mercedes)  
7. George Russell (Mercedes)  
8. Lewis Hamilton (Ferrari)  
9. Esteban Ocon (Haas)  
10. Garbiel Bortoleto (Sauber)  
11. Yuki Tsunoda (Red Bull Racing)  
12. Alexander Albon (Williams)  
13. Isack Hadjar (Racing Bulls)  
14. Lance Stroll (Aston Martin)  
15. Piere Gasly (Alpine)  
16. Franco Colapinto (Alpine)  
17. Carlos Sainz (Williams)  
NC. Fernando Alonso (Aston Martin)  
NC. Nico Hulkenberg (Sauber)  
NC. Liam Lawson (Racing Bulls)  

Key moments
- Start: Norris launched cleanly and defended Turn 1 from Leclerc.  
- Mid‑race: Verstappen’s strategy secured him P3, but he lacked the pace to challenge Norris.  
- Breakthrough: Bearman stunned with a composed run to P4, Haas’s best finish of the season.  
- Damage limitation: Piastri salvaged P5 but lost the championship lead.  
- **Rising star:** Antonelli impressed with P6, showing maturity beyond his years.  

Championship impact
- Norris is now the **new championship leader**, 6 points ahead of Piastri.  
- Piastri drops to P2 after a difficult run of results.  
- Verstappen remains in contention, 36 points back.  
- Haas and Mercedes both gained valuable Constructors’ points through Bearman and Antonelli.  

Atmosphere
Over 400,000 fans created a carnival atmosphere in Mexico City. Local hero Sergio Pérez finished P8, drawing the loudest cheers of the day.  

Looking ahead
With Brazil and Qatar sprint weekends next, the title fight is wide open. Norris has momentum, Piastri must regroup, and Verstappen is waiting to strike.`
   },
  {
  title: "What’s happening with Piastri? From dominance to title pressure",
  date: "2025-10-26",
  image: "https://media.formula1.com/image/upload/c_lfill,w_2048/q_auto/v1740000000/fom-website/2025/Mexico/GENERAL%20CROP%20-%202025-10-26T001210.347.webp",
  text: `Oscar Piastri’s championship campaign has hit turbulence. After a dominant win at Zandvoort, the McLaren driver looked unstoppable — 34 points clear of teammate Lando Norris and 104 ahead of Max Verstappen. But five races later, the gap has shrunk to just 14 and 40 respectively.

**Post-Zandvoort results**
- 🇮🇹 Monza: P3, solid but outpaced by Norris
- 🇦🇿 Baku: DNF, double crash weekend
- 🇸🇬 Singapore: P4, decent recovery
- 🇺🇸 Austin: P5, worst dry race finish of the season
- 🇲🇽 Mexico: Qualifying struggles, race P5

Piastri’s form dipped sharply in Baku, where he crashed out of both the sprint and the main race. That weekend alone cost him 30+ points. In Austin, he finished fifth — 22 seconds behind Norris — and admitted setup issues and poor tyre management.

Meanwhile, Norris has surged with consistent podiums and a pole in Mexico. Verstappen, once 104 points behind, has won the US GP and sprint, slashing the deficit to 40.

**What’s going wrong?**
- Qualifying pace has dropped: Piastri’s average grid position since Zandvoort is P5.
- Tyre degradation: He’s struggled in high-deg races like Singapore and Austin.
- Pressure: With Norris and Verstappen charging, every mistake is amplified.

**Déjà vu from 2010?**
This season is starting to echo Mark Webber’s 2010 campaign. Back then, Webber led the championship for much of the year, only to see it slip away in the final races. Mistakes, pressure, and rivals peaking at the right time cost him the title — and Piastri now faces a similar storm.

**Championship outlook**
With five rounds left — including sprints in Brazil and Qatar — the title fight is wide open. Piastri still leads, but momentum is shifting. Norris is just 14 points behind, and Verstappen is within striking distance. If McLaren can’t stabilize Piastri’s form, the Australian may lose a title that once looked inevitable.

The next few races will define the season. Can Piastri respond under pressure, or will Norris and Verstappen complete the comeback?`
  },
   {
       title: "Norris takes stunning pole in Mexico City qualifying",
  date: "2025-10-25",
  image: "https://cdn.racingnews365.com/2025/Norris/_1092x683_crop_center-center_85_none/2243102585.jpg?v=1761375627",
  text: `Lando Norris delivered a sensational lap to secure pole position for the Mexico City Grand Prix, stopping the clocks at 1:16.801. 
The McLaren driver carried his momentum from FP3 into qualifying, edging out Ferrari’s Lewis Hamilton . 
George Russell put Mercedes fourth on the grid, while Charles Leclerc lined up third for Ferrari. 

Max Verstappen struggled to extract pace from his Red Bull and could manage only fifth, ahead of Oscar Piastri in sixth. 
Rookie Andrea Kimi Antonelli impressed again with seventh, continuing his strong weekend form. 
Fernando Alonso and Carlos Sainz filled the fourth row, while Yuki Tsunoda rounded out the top ten. 

The session was tight throughout, with less than half a second covering the top six. 
Altitude and cooling remained key talking points, with several drivers reporting brake fade in Q2. 
With Norris on pole and Hamilton alongside, Sunday’s race promises a fierce multi‑team battle at the front.`
   },
   {
   title: "Norris dominates FP3 in Mexico",
    date: "2025-10-25",
    image: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/2025/Mexico/GENERAL%20CROP%20-%202025-10-25T193053.711.webp",
    text: ` Lando Norris set a blistering 1:16.633 to lead final practice by over three tenths.
    Hamilton and Russell followed for Ferrari and Mercedes, while Verstappen slipped to P6.
    McLaren looks strong heading into qualifying, with Ferrari and Mercedes close behind.`
   },
   
   {
   title: "Red Bull upgrades under scrutiny as Verstappen tops FP2",
    date: "2025-10-24",
    image: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/2025/Mexico/GENERAL%20CROP%20-%202025-10-25T000459.547.webp",
    text: `Red Bull arrived in Mexico with the most extensive upgrade package of the field, including revised floor edges and cooling inlets. 
Max Verstappen immediately put the parts to good use, setting the fastest time in FP2 with a 1:17.392. 
Analysts noted improved stability in medium‑speed corners, though rivals McLaren and Ferrari remained within striking distance. 
The upgrades are seen as pivotal in Verstappen’s late‑season title push, with the Dutchman now only 40 points off championship leader Oscar Piastri.`
   },
  {
  title: "Verstappen sets the pace in Mexico FP2 as rivals close in",
  date: "2025-10-24",
  image: "https://cdn-6.motorsport.com/images/amp/6O1GkkG2/s1000/max-verstappen-red-bull-racing.jpg",
  text: `Max Verstappen returned to his Red Bull after sitting out FP1 and immediately stamped his authority on the Mexico City weekend. 
The Dutchman’s 1:17.392 lap was enough to top the second practice session, though Ferrari’s Charles Leclerc and Mercedes rookie Andrea Kimi Antonelli kept the gap tight in second and third.

The session began under warm afternoon skies, with teams eager to recover track time after handing cars to rookies in FP1. 
Verstappen quickly found rhythm, combining straight‑line efficiency with stability through the stadium section. 
Leclerc’s Ferrari looked sharp on low‑fuel runs, just 0.153s adrift, while Antonelli continued to impress in his debut season, finishing only 0.174s behind Verstappen and ahead of more experienced rivals.

Lando Norris placed fourth for McLaren, a quarter of a second off the pace, while Lewis Hamilton rounded out the top five for Ferrari. 
George Russell was sixth, followed by Yuki Tsunoda in the second Red Bull. 
Fernando Alonso and Carlos Sainz slotted into eighth and ninth, with Lance Stroll completing the top ten for Aston Martin.

Further down the order, Liam Lawson led the Racing Bulls effort in 11th, just ahead of Oscar Piastri in 12th, who focused on long‑run pace rather than headline times. 
Esteban Ocon and rookie Isack Hadjar followed, while Nico Hülkenberg, Alexander Albon, and Oliver Bearman filled the midfield slots. 
Pierre Gasly, Franco Colapinto, Gabriel Bortoleto, and Jack Doohan rounded out the classification.

The session was notable for the return of full‑time drivers after nine rookies had taken part in FP1. 
Teams split their FP2 programs between qualifying simulations on soft tyres and heavy‑fuel race runs, with the high altitude continuing to test cooling systems and ERS deployment. 
Brake temperatures spiked for several cars, forcing careful management during long stints.

With Verstappen back on top, McLaren and Ferrari close behind, and Antonelli proving he belongs in the fight, the stage is set for a fascinating Saturday. 
The margins at the front suggest qualifying could be decided by hundredths, while the midfield battle remains wide open. 
The passionate Mexican crowd, already energized by Pato O’Ward’s FP1 cameo, left FP2 buzzing with anticipation for the weekend’s decisive sessions.`
},

    {
    title: "Leclerc leads rookie‑heavy FP1 in Mexico City",
    date: "2025-10-24",
    image: "https://images.ps-aws.com/c?url=https%3A%2F%2Fd3cm515ijfiu6w.cloudfront.net%2Fwp-content%2Fuploads%2F2025%2F10%2F24201624%2FCharles-Leclerc-Formula-1-F1-results-Ferrari-PlanetF1-1320x742.jpg",
    text: `Ferrari’s Charles Leclerc set the pace in FP1 at the Autódromo Hermanos Rodríguez with a 1:18.380. 
Mercedes rookie Andrea Kimi Antonelli impressed in P2, just a tenth behind, while Nico Hülkenberg’s Sauber was third. 
Oscar Piastri slotted into fourth despite a late slide.

Nine rookies were given track time as part of F1’s mandatory FP1 program. Gabriel Bortoleto (Sauber) shone in fifth, Red Bull’s Arvid Lindblad was sixth, and Alpine’s Franco Colapinto placed ninth. 
McLaren gave home hero Pato O’Ward a run, drawing huge cheers from the Mexican crowd. 
Other rookies included Frederik Vesti (Mercedes), Paul Aron (Alpine), Ryo Hirakawa (Haas), Ayumu Iwasa (Racing Bulls), and Luke Browning (Williams). 

The session highlighted the next generation’s potential while giving teams valuable high‑altitude data ahead of qualifying.`
  },
];

// Calendar (2025, concise; dates simplified to local)
const calendar2025 = [
  { round: 1, gp: "Australia", circuit: "Melbourne", date: "2025-03-16" },
  { round: 2, gp: "China", circuit: "Shanghai", date: "2025-03-23" },
  { round: 3, gp: "Japan", circuit: "Suzuka", date: "2025-04-06" },
  { round: 4, gp: "Bahrain", circuit: "Sakhir", date: "2025-04-13" },
  { round: 5, gp: "Saudi Arabia", circuit: "Jeddah", date: "2025-04-20" },
  { round: 6, gp: "Miami", circuit: "Florida", date: "2025-05-04" },
  { round: 7, gp: "Emilia Romagna", circuit: "Imola", date: "2025-05-18" },
  { round: 8, gp: "Monaco", circuit: "Monte Carlo", date: "2025-05-25" },
  { round: 9, gp: "Spain", circuit: "Catalunya", date: "2025-06-01" },
  { round: 10, gp: "Canada", circuit: "Montreal", date: "2025-06-15" },
  { round: 11, gp: "Austria", circuit: "Spielberg", date: "2025-06-29" },
  { round: 12, gp: "Britain", circuit: "Silverstone", date: "2025-07-06" },
  { round: 13, gp: "Belgium", circuit: "Spa-Francorchamps", date: "2025-07-27" },
  { round: 14, gp: "Hungary", circuit: "Hungaroring", date: "2025-08-03" },
  { round: 15, gp: "Netherlands", circuit: "Zandvoort", date: "2025-08-31" },
  { round: 16, gp: "Italy", circuit: "Monza", date: "2025-09-07" },
  { round: 17, gp: "Azerbaijan", circuit: "Baku", date: "2025-09-21" },
  { round: 18, gp: "Singapore", circuit: "Marina Bay", date: "2025-10-05" },
  { round: 19, gp: "USA", circuit: "Austin", date: "2025-10-19" },
  { round: 20, gp: "Mexico City", circuit: "Mexico City", date: "2025-10-26" },
  { round: 21, gp: "São Paulo", circuit: "Interlagos", date: "2025-11-02" },
  { round: 22, gp: "Las Vegas", circuit: "Las Vegas", date: "2025-11-22" },
  { round: 23, gp: "Qatar", circuit: "Lusail", date: "2025-11-30" },
  { round: 24, gp: "Abu Dhabi", circuit: "Yas Marina", date: "2025-12-07" }
];

// Results scaffold: add detailed entries as needed (example for USA Race Top 10)
const resultsData = {
  "USA": {
    race: [
      { pos: 1, driver: "Max Verstappen", team: "Red Bull Racing", time: "1:32:15.420", points: 25 },
      { pos: 2, driver: "Lando Norris", team: "McLaren", time: "+7.959s", points: 18 },
      { pos: 3, driver: "Charles Leclerc", team: "Ferrari", time: "+12.4s", points: 15 },
      { pos: 4, driver: "George Russell", team: "Mercedes", time: "+18.7s", points: 12 },
      { pos: 5, driver: "Oscar Piastri", team: "McLaren", time: "+21.3s", points: 10 },
      { pos: 6, driver: "Lewis Hamilton", team: "Ferrari", time: "+28.5s", points: 8 },
      { pos: 7, driver: "Yuki Tsunoda", team: "Red Bull Racing", time: "+31.1s", points: 6 },
      { pos: 8, driver: "Alexander Albon", team: "Williams", time: "+35.6s", points: 4 },
      { pos: 9, driver: "Nico Hülkenberg", team: "Kick Sauber", time: "+41.0s", points: 2 },
      { pos: 10, driver: "Isack Hadjar", team: "Racing Bulls", time: "+44.9s", points: 1 }
    ],
    sprint: [
      // Example sprint ordering from weekend trend — adjust to real data if needed
      { pos: 1, driver: "Max Verstappen", team: "Red Bull Racing", time: "30:12.003", points: 8 },
      { pos: 2, driver: "Lando Norris", team: "McLaren", time: "+2.4s", points: 7 },
      { pos: 3, driver: "Charles Leclerc", team: "Ferrari", time: "+6.2s", points: 6 },
      { pos: 4, driver: "George Russell", team: "Mercedes", time: "+12.0s", points: 5 },
      { pos: 5, driver: "Oscar Piastri", team: "McLaren", time: "+14.5s", points: 4 },
      { pos: 6, driver: "Yuki Tsunoda", team: "Red Bull Racing", time: "+18.9s", points: 3 },
      { pos: 7, driver: "Alexander Albon", team: "Williams", time: "+21.3s", points: 2 },
      { pos: 8, driver: "Isack Hadjar", team: "Racing Bulls", time: "+24.7s", points: 1 }
    ],
    qualifying: [
      { pos: 1, driver: "Max Verstappen", team: "Red Bull Racing", time: "1:32.001" },
      { pos: 2, driver: "Charles Leclerc", team: "Ferrari", time: "1:32.112" },
      { pos: 3, driver: "Lando Norris", team: "McLaren", time: "1:32.203" }
      // … add the rest
    ],
    fp1: [],
    fp2: [],
    fp3: []
  }
};

// Teams cards
function buildTeamCards() {
  const wrap = document.getElementById('teamCards');
  constructors2025.forEach(team => {
    const card = document.createElement('div');
    card.className = 'team-card';
    card.innerHTML = `
      <img src="${team.photo}" alt="${team.name} car photo">
      <div class="team-card-body">
        <h4 class="team-name">${team.name}</h4>
        <p class="team-blurb">${team.tagline}</p>
      </div>
    `;
    card.addEventListener('click', () => openTeamModal(team));
    wrap.appendChild(card);
  });
}

// Team modal
function openTeamModal(team) {
  const modal = document.getElementById('teamModal');
  document.getElementById('teamImage').src = team.photo;
  document.getElementById('teamImage').alt = `${team.name} team image`;
  document.getElementById('teamName').textContent = team.name;
  document.getElementById('teamTagline').textContent = team.tagline;

  const driversUl = document.getElementById('teamDrivers');
  driversUl.innerHTML = '';
  team.drivers.forEach(d => {
    const li = document.createElement('li');
    li.textContent = d;
    driversUl.appendChild(li);
  });

  const factsUl = document.getElementById('teamFacts');
  factsUl.innerHTML = '';
  team.facts.forEach(f => {
    const li = document.createElement('li');
    li.textContent = f;
    factsUl.appendChild(li);
  });

  const hist = document.getElementById('teamHistory');
  hist.textContent = team.history;

  modal.showModal();
}
function bindModalClose() {
  const modal = document.getElementById('teamModal');
  const closeBtn = modal.querySelector('.modal-close');
  closeBtn.addEventListener('click', () => modal.close());
  modal.addEventListener('click', (e) => {
    const rect = modal.querySelector('.modal-content').getBoundingClientRect();
    const clickedInContent = e.clientX >= rect.left && e.clientX <= rect.right
      && e.clientY >= rect.top && e.clientY <= rect.bottom;
    if (!clickedInContent) modal.close();
  });
}

// Navigation toggle
function bindNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const list = document.getElementById('navMenu');
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    list.classList.toggle('open', !expanded);
  });
}

// Countdown logic
function startCountdown() {
  const target = new Date(nextGp.startISO).getTime();
  const ids = { days: 'days', hours: 'hours', minutes: 'minutes', seconds: 'seconds' };

  function renderSessions() {
    const el = document.getElementById('eventTimes');
    const items = nextGp.sessions.map(s => `${s.label}: ${fmt.date(s.iso)} — ${fmt.time(s.iso)}`);
    el.textContent = `${nextGp.name} — ${nextGp.venue} | ${items.join(' • ')}`;
  }

  renderSessions();

  function tick() {
    const now = Date.now();
    const diff = Math.max(0, target - now);
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    document.getElementById(ids.days).textContent = String(d).padStart(2, '0');
    document.getElementById(ids.hours).textContent = String(h).padStart(2, '0');
    document.getElementById(ids.minutes).textContent = String(m).padStart(2, '0');
    document.getElementById(ids.seconds).textContent = String(s).padStart(2, '0');
  }
  tick();
  setInterval(tick, 1000);
}

// Populate news
function populateNews() {
  const wrap = document.getElementById('newsList');
  newsAfterUSAGP.forEach((n, i) => {
    const card = document.createElement('article');
    card.className = 'news-card';
    card.style.animationDelay = `${i * 0.08}s`;
    card.innerHTML = `
      <div class="news-media" style="background-image:url('${n.image}'); background-size:cover; background-position:center;"></div>
      <div class="news-body">
        <h4 class="news-title">${n.title}</h4>
        <div class="news-meta">${fmt.date(n.date)}</div>
        <p class="news-text">${n.text}</p>
      </div>
    `;
    wrap.appendChild(card);
  });
}

// Populate standings tables
function populateDrivers() {
  const tbody = document.getElementById('driversTable');
  drivers2025
    .filter(d => d.pos <= 20) // top 20
    .sort((a, b) => a.pos - b.pos)
    .forEach(d => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${d.pos}</td>
        <td>${d.name} <span style="color:#9aa0a6; font-size:13px;">(${d.code})</span></td>
        <td class="hide-mobile">${d.team}</td>
        <td>${d.points}</td>
        <td class="hide-mobile">${d.wins}</td>
        <td class="hide-mobile">${d.poles}</td>
        <td><img class="driver-photo" src="${d.photo}" alt="${d.name} photo"></td>
      `;
      tbody.appendChild(tr);
    });
}

function populateConstructors() {
  const tbody = document.getElementById('constructorsTable');
  constructors2025
    .sort((a, b) => a.pos - b.pos)
    .forEach(c => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${c.pos}</td>
        <td>${c.name}</td>
        <td>${c.points}</td>
        <td class="hide-mobile">${c.drivers.join(" & ")}</td>
        <td><img class="team-photo" src="${c.photo}" alt="${c.name} photo"></td>
      `;
      tbody.appendChild(tr);
    });
}

// Populate calendar
function populateCalendar() {
  const grid = document.getElementById('calendarGrid');
  calendar2025.forEach((r, i) => {
    const card = document.createElement('div');
    card.className = 'calendar-card';
    card.style.animationDelay = `${i * 0.05}s`;
    card.innerHTML = `
      <h4 class="calendar-gp">R${r.round}: ${r.gp}</h4>
      <div class="calendar-meta">${r.circuit} — ${fmt.date(r.date)}</div>
    `;
    grid.appendChild(card);
  });

  // populate GP selector for results
  const gpSelect = document.getElementById('gpSelect');
  calendar2025.forEach(r => {
    const opt = document.createElement('option');
    opt.value = r.gp;
    opt.textContent = `R${r.round} — ${r.gp}`;
    gpSelect.appendChild(opt);
  });
  gpSelect.value = "USA"; // default to USA for post-event context
}

// Populate results table based on selections
function bindResults() {
  const gpSelect = document.getElementById('gpSelect');
  const sessionSelect = document.getElementById('sessionSelect');
  const tbody = document.getElementById('resultsTable');

  function render() {
    const gp = gpSelect.value;
    const ses = sessionSelect.value;
    const data = resultsData[gp]?.[ses] || [];
    tbody.innerHTML = '';
    data.forEach(row => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${row.pos ?? ""}</td>
        <td>${row.driver ?? ""}</td>
        <td class="hide-mobile">${row.team ?? ""}</td>
        <td>${row.time ?? ""}</td>
        <td class="hide-mobile">${row.points ?? ""}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  gpSelect.addEventListener('change', render);
  sessionSelect.addEventListener('change', render);
  render();
}

// Intersection animations for subtle lift
function observeSections() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.count-card, .news-card, .calendar-card, .team-card')
    .forEach(el => obs.observe(el));
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  bindNavToggle();
  startCountdown();
  populateNews();
  populateDrivers();
  populateConstructors();
  populateCalendar();
  bindResults();
  buildTeamCards();
  bindModalClose();
  observeSections();
});
function populateNews() {
  const wrap = document.getElementById('newsList');
  newsAfterUSAGP.forEach((n, i) => {
    const card = document.createElement('article');
    card.className = 'news-card';
    card.style.animationDelay = `${i * 0.08}s`;
    card.innerHTML = `
      <div class="news-media" style="background-image:url('${n.image}'); background-size:cover; background-position:center;"></div>
      <div class="news-body">
        <h4 class="news-title">${n.title}</h4>
        <div class="news-meta">${fmt.date(n.date)}</div>
        <p class="news-text">${n.text.length > 160 ? n.text.substring(0, 160) + "..." : n.text}</p>
        <button class="read-more">Read full article →</button>
      </div>
    `;
    card.querySelector('.read-more').addEventListener('click', (e) => {
      e.stopPropagation();
      openArticleInNewTab(i);
    });
    wrap.appendChild(card);
  });
}
function openArticleInNewTab(index) {
  const article = newsAfterUSAGP[index];
  const win = window.open("", "_blank");

  // Clone your current CSS links and <style> tags into the new document head
  const headLinks = Array.from(document.head.querySelectorAll('link[rel="stylesheet"]'))
    .map(link => `<link rel="stylesheet" href="${link.href}">`)
    .join('\n');
  const inlineStyles = Array.from(document.head.querySelectorAll('style'))
    .map(style => `<style>${style.innerHTML}</style>`)
    .join('\n');

  // Inline fallback styles to ensure consistent rendering, even if external CSS loads late
  const fallbackCSS = `
    <style>
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; margin: 0; background: #0f1115; color: #e8eaed; }
      .page { max-width: 1080px; margin: 0 auto; padding: 24px; }
      .article-card { background: #151821; border-radius: 12px; overflow: hidden; box-shadow: 0 12px 30px rgba(0,0,0,0.35); animation: fadeIn 0.4s ease; }
      .news-media { width: 100%; height: 360px; background-size: cover; background-position: center; background-repeat: no-repeat; }
      .news-body { padding: 20px; }
      .news-title { margin: 0 0 6px; font-size: 28px; line-height: 1.2; color: #fff; }
      .news-meta { color: #9aa0a6; font-size: 14px; margin-bottom: 14px; }
      .news-text { font-size: 17px; color: #e8eaed; white-space: pre-line; }
      .back-link { display: inline-block; margin-top: 18px; color: #ff7a18; text-decoration: none; font-weight: 700; }
      .back-link:hover { color: #ff9a4d; }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(12px);} to { opacity: 1; transform: translateY(0);} }
    </style>
  `;

  // Build the HTML using the SAME classes you use on the site
  const html = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${article.title}</title>
        ${headLinks}
        ${inlineStyles}
        ${fallbackCSS}
      </head>
      <body>
        <div class="page">
          <article class="article-card">
            <div class="news-media" style="background-image:url('${article.image}');"></div>
            <div class="news-body">
              <h1 class="news-title">${article.title}</h1>
              <div class="news-meta">${fmt.date(article.date)}</div>
              <div class="news-text">${article.text.replace(/\n\s*\n/g, '\n\n')}</div>
              <a class="back-link" href="javascript:window.close()">Close tab</a>
            </div>
          </article>
        </div>
      </body>
    </html>
  `;

  win.document.open();
  win.document.write(html);
  win.document.close();
}
function populateNews() {
  const wrap = document.getElementById('newsList');
  newsAfterUSAGP.forEach((n, i) => {
    const card = document.createElement('article');
    card.className = 'news-card';
    card.style.animationDelay = `${i * 0.08}s`;
    card.innerHTML = `
      <div class="news-media" style="background-image:url('${n.image}');"></div>
      <div class="news-body">
        <h4 class="news-title">${n.title}</h4>
        <div class="news-meta">${fmt.date(n.date)}</div>
        <p class="news-text">${n.text.length > 160 ? n.text.substring(0, 160) + "..." : n.text}</p>
        <button class="read-more">Read full article →</button>
      </div>
    `;
    card.querySelector('.read-more').addEventListener('click', (e) => {
      e.stopPropagation();
      openArticleInNewTab(i);
    });
    wrap.appendChild(card);
  });
}
function openArticleInNewTab(index) {
  const article = newsAfterUSAGP[index];
  const win = window.open("", "_blank");

  const headLinks = Array.from(document.head.querySelectorAll('link[rel="stylesheet"]'))
    .map(link => `<link rel="stylesheet" href="${link.href}">`)
    .join('\n');

  const fallbackCSS = `
    <style>
      body { font-family: system-ui, sans-serif; margin: 0; background: #0f1115; color: #e8eaed; }
      .page { max-width: 1080px; margin: 0 auto; padding: 24px; }
      .article-card { background: #151821; border-radius: 12px; overflow: hidden; box-shadow: 0 12px 30px rgba(0,0,0,0.35); animation: fadeIn 0.4s ease; }
      .news-media { width: 100%; height: 360px; background-size: cover; background-position: center; }
      .news-body { padding: 20px; }
      .news-title { margin: 0 0 6px; font-size: 28px; line-height: 1.2; color: #fff; }
      .news-meta { color: #9aa0a6; font-size: 14px; margin-bottom: 14px; }
      .news-text { font-size: 17px; color: #e8eaed; white-space: pre-line; }
      .btn { display: inline-block; margin-top: 20px; padding: 10px 18px; border-radius: 6px; font-weight: 600; cursor: pointer; text-decoration: none; transition: all 0.25s ease; }
      .btn-primary { background: #ff7a18; color: #fff; border: none; }
      .btn-primary:hover { background: #ff9a4d; transform: translateY(-2px); }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(12px);} to { opacity: 1; transform: translateY(0);} }
    </style>
  `;

  const html = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>${article.title}</title>
        ${headLinks}
        ${fallbackCSS}
      </head>
      <body>
        <div class="page">
          <article class="article-card">
            <div class="news-media" style="background-image:url('${article.image}');"></div>
            <div class="news-body">
              <h1 class="news-title">${article.title}</h1>
              <div class="news-meta">${fmt.date(article.date)}</div>
              <div class="news-text">${article.text.replace(/\n\s*\n/g, '<br><br>')}</div>
              <button class="btn btn-primary" onclick="window.close()">← Back to Website</button>
            </div>
          </article>
        </div>
      </body>
    </html>
  `;

  win.document.open();
  win.document.write(html);
  win.document.close();
}
function openArticleInNewTab(index) {
  const article = newsAfterUSAGP[index];
  const win = window.open("", "_blank");

  const headLinks = Array.from(document.head.querySelectorAll('link[rel="stylesheet"]'))
    .map(link => `<link rel="stylesheet" href="${link.href}">`)
    .join('\n');

  const fallbackCSS = `
    <style>
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; margin: 0; background: #0f1115; color: #e8eaed; }
      .page { max-width: 1080px; margin: 0 auto; padding: 24px; }
      .article-card { background: #151821; border-radius: 12px; overflow: hidden; box-shadow: 0 12px 30px rgba(0,0,0,0.35); animation: fadeIn 0.4s ease; }
      .hero-wrap { width: 100%; height: 360px; background: #0b0d12; display: grid; place-items: center; overflow: hidden; }
      .hero-img { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; }
      .news-body { padding: 20px; }
      .news-title { margin: 0 0 6px; font-size: 28px; line-height: 1.2; color: #fff; }
      .news-meta { color: #9aa0a6; font-size: 14px; margin-bottom: 14px; }
      .news-text { font-size: 17px; color: #e8eaed; white-space: pre-line; }
      .btn { display: inline-block; margin-top: 20px; padding: 10px 18px; border-radius: 6px; font-weight: 600; cursor: pointer; text-decoration: none; transition: all 0.25s ease; }
      .btn-primary { background: #ff7a18; color: #fff; border: none; }
      .btn-primary:hover { background: #ff9a4d; transform: translateY(-2px); }
      .hero-fallback { color: #9aa0a6; font-size: 14px; }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(12px);} to { opacity: 1; transform: translateY(0);} }
    </style>
  `;

  const safeText = (article.text || "").replace(/\n\s*\n/g, "<br><br>");

  const html = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>${article.title}</title>
        ${headLinks}
        ${fallbackCSS}
      </head>
      <body>
        <div class="page">
          <article class="article-card">
            <div class="hero-wrap">
              <img id="heroImg" class="hero-img" src="${article.image}" alt="Article image" referrerpolicy="no-referrer">
              <span id="heroFallback" class="hero-fallback" style="display:none;">Image failed to load.</span>
            </div>
            <div class="news-body">
              <h1 class="news-title">${article.title}</h1>
              <div class="news-meta">${fmt.date(article.date)}</div>
              <div class="news-text">${safeText}</div>
              <button class="btn btn-primary" onclick="window.close()">← Back to Website</button>
            </div>
          </article>
        </div>
        <script>
          (function() {
            const img = document.getElementById('heroImg');
            const fb = document.getElementById('heroFallback');
            // Ensure correct sizing once decoded
            img.decode?.().catch(() => {}).finally(() => {
              img.style.visibility = 'visible';
            });
            // Robust error fallback: try switching to the same URL without query, else hide img
            img.addEventListener('error', () => {
              try {
                const url = new URL(img.src);
                const stripped = url.origin + url.pathname; // remove query params that sometimes block hotlinking
                if (stripped !== img.src) {
                  img.src = stripped;
                } else {
                  img.style.display = 'none';
                  fb.style.display = 'inline';
                }
              } catch (e) {
                img.style.display = 'none';
                fb.style.display = 'inline';
              }
            });
          })();
        </script>
      </body>
    </html>
  `;

  win.document.open();
  win.document.write(html);
  win.document.close();
}
function openArticleInNewTab(index) {
  const article = newsAfterUSAGP[index];
  const win = window.open("", "_blank");

  // Clone your current CSS links and <style> tags into the new document head
  const headLinks = Array.from(document.head.querySelectorAll('link[rel="stylesheet"]'))
    .map(link => `<link rel="stylesheet" href="${link.href}">`)
    .join('\n');
  const inlineStyles = Array.from(document.head.querySelectorAll('style'))
    .map(style => `<style>${style.innerHTML}</style>`)
    .join('\n');

  // Inline fallback styles to ensure consistent rendering, even if external CSS loads late
  const fallbackCSS = `
    <style>
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; margin: 0; background: #0f1115; color: #e8eaed; }
      .page { max-width: 1080px; margin: 0 auto; padding: 24px; }
      .article-card { background: #151821; border-radius: 12px; overflow: hidden; box-shadow: 0 12px 30px rgba(0,0,0,0.35); animation: fadeIn 0.4s ease; }
      .news-media { width: 100%; height: 360px; background-size: cover; background-position: center; background-repeat: no-repeat; }
      .news-body { padding: 20px; }
      .news-title { margin: 0 0 6px; font-size: 28px; line-height: 1.2; color: #fff; }
      .news-meta { color: #9aa0a6; font-size: 14px; margin-bottom: 14px; }
      .news-text { font-size: 17px; color: #e8eaed; white-space: pre-line; }
      .back-link { display: inline-block; margin-top: 18px; color: #ff7a18; text-decoration: none; font-weight: 700; }
      .back-link:hover { color: #ff9a4d; }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(12px);} to { opacity: 1; transform: translateY(0);} }
    </style>
  `;

  // Build the HTML using the SAME classes you use on the site
  const html = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${article.title}</title>
        ${headLinks}
        ${inlineStyles}
        ${fallbackCSS}
      </head>
      <body>
        <div class="page">
          <article class="article-card">
            <div class="news-media" style="background-image:url('${article.image}');"></div>
            <div class="news-body">
              <h1 class="news-title">${article.title}</h1>
              <div class="news-meta">${fmt.date(article.date)}</div>
              <div class="news-text">${article.text.replace(/\n\s*\n/g, '\n\n')}</div>
              <a class="back-link" href="javascript:window.close()">Close tab</a>
            </div>
          </article>
        </div>
      </body>
    </html>
  `;

  win.document.open();
  win.document.write(html);
  win.document.close();
}
function populateNews() {
  const wrap = document.getElementById('newsList');
  newsAfterUSAGP.forEach((n, i) => {
    const card = document.createElement('article');
    card.className = 'news-card';
    card.style.animationDelay = `${i * 0.08}s`;
    card.innerHTML = `
      <div class="news-media">
        <img src="${n.image}" alt="${n.title}" class="news-img">
      </div>
      <div class="news-body">
        <h4 class="news-title">${n.title}</h4>
        <div class="news-meta">${fmt.date(n.date)}</div>
        <p class="news-text">${n.text.length > 160 ? n.text.substring(0, 160) + "..." : n.text}</p>
        <button class="read-more">Read full article →</button>
      </div>
    `;
    card.querySelector('.read-more').addEventListener('click', (e) => {
      e.stopPropagation();
      openArticleInNewTab(i);
    });
    wrap.appendChild(card);
  });
}
function initF1Background() {
  const canvas = document.getElementById('f1Background');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 1.5, 5);

  // Lighting
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(5, 10, 7.5);
  scene.add(dirLight);

  // Load F1 model (replace URL with your .glb/.gltf model)
  const loader = new THREE.GLTFLoader();
  loader.load(
    'path/to/f1car.glb',
    function (gltf) {
      const car = gltf.scene;
      car.scale.set(0.8, 0.8, 0.8);
      car.position.set(0, -0.5, 0);
      scene.add(car);

      // Animate rotation
      function animate() {
        requestAnimationFrame(animate);
        car.rotation.y += 0.002; // slow spin
        renderer.render(scene, camera);
      }
      animate();
    },
    undefined,
    function (error) {
      console.error('Error loading F1 model:', error);
    }
  );

  // Handle resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

document.addEventListener('DOMContentLoaded', initF1Background);
document.addEventListener("DOMContentLoaded", () => {
  const rows = document.querySelectorAll(".championship .row");

  // Animate rows in sequence
  rows.forEach((row, i) => {
    setTimeout(() => {
      row.classList.add("animate-in");
    }, i * 200); // stagger 200ms
  });

  // Animate counters
  function animateCounter(el, target, duration = 1200) {
    let start = 0;
    const stepTime = Math.abs(Math.floor(duration / target));
    const timer = setInterval(() => {
      start += 1;
      el.textContent = start;
      if (start >= target) {
        clearInterval(timer);
        el.textContent = target;
        el.classList.add("active");
      }
    }, stepTime);
  }

  document.querySelectorAll(".cell.points, .cell.wins, .cell.poles").forEach(el => {
    const target = parseInt(el.dataset.points || el.dataset.wins || el.dataset.poles, 10);
    animateCounter(el, target);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  // Animate rows differently for drivers vs constructors
  document.querySelectorAll(".board").forEach(board => {
    const rows = board.querySelectorAll(".row");
    rows.forEach((row, i) => {
      setTimeout(() => {
        row.classList.add("animate-in");
      }, i * 200);
    });
  });

  // Counter animation with glow
  function animateCounter(el, target, duration = 1200) {
    let start = 0;
    const stepTime = Math.max(20, Math.floor(duration / target));
    const timer = setInterval(() => {
      start += 1;
      el.textContent = start;
      if (start >= target) {
        clearInterval(timer);
        el.textContent = target;
        el.classList.add("active");
      }
    }, stepTime);
  }

  document.querySelectorAll(".cell.points, .cell.wins, .cell.poles").forEach(el => {
    const target = parseInt(el.dataset.points || el.dataset.wins || el.dataset.poles, 10);
    animateCounter(el, target);
  });
});

document.querySelectorAll('.points').forEach(el => {
  let final = parseInt(el.dataset.points);
  let count = 0;
  let step = Math.ceil(final / 60);
  let interval = setInterval(() => {
    count += step;
    if (count >= final) {
      count = final;
      clearInterval(interval);
    }
    el.textContent = count + " pts";
  }, 30);
});
document.querySelectorAll('.points').forEach(el => {
  let final = parseInt(el.dataset.points);
  let count = 0;
  let step = Math.ceil(final / 50);
  let interval = setInterval(() => {
    count += step;
    if (count >= final) {
      count = final;
      clearInterval(interval);
    }
    el.textContent = count;
  }, 30);
});
// === THEME ENHANCEMENTS ===
// Inject global styles dynamically for colors, backgrounds, and animations
function injectThemeStyles() {
  const style = document.createElement("style");
  style.innerHTML = `
    body {
      background: linear-gradient(135deg, #0f1115, #1a1d29);
      color: #e8eaed;
      font-family: 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      overflow-x: hidden;
    }

    section {
      padding: 40px 20px;
      margin: 20px auto;
      border-radius: 16px;
      background: linear-gradient(145deg, #151821, #1f2230);
      box-shadow: 0 12px 30px rgba(0,0,0,0.35);
      transition: transform 0.4s ease, box-shadow 0.4s ease;
    }
    section:hover {
      transform: translateY(-6px);
      box-shadow: 0 18px 40px rgba(0,0,0,0.55);
    }

    h2, h3, h4 {
      color: #ff7a18;
      text-shadow: 0 0 6px rgba(255,122,24,0.6);
    }

    .news-card {
      background: linear-gradient(160deg, #1c1f2b, #2a2e3f);
      border-radius: 14px;
      overflow: hidden;
      margin-bottom: 24px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.35);
      transform: translateY(20px);
      opacity: 0;
      animation: fadeUp 0.6s forwards;
    }
    .news-card.in-view {
      animation: fadeUp 0.6s forwards;
    }
    .news-media {
      height: 220px;
      background-size: cover;
      background-position: center;
      filter: brightness(0.9);
      transition: filter 0.4s ease;
    }
    .news-card:hover .news-media {
      filter: brightness(1.1);
    }
    .news-body {
      padding: 18px;
    }
    .news-title {
      font-size: 20px;
      margin: 0 0 8px;
      color: #fff;
    }
    .news-meta {
      font-size: 13px;
      color: #9aa0a6;
      margin-bottom: 10px;
    }
    .news-text {
      font-size: 15px;
      line-height: 1.5;
      color: #d1d5db;
    }
    .read-more {
      margin-top: 12px;
      background: #ff7a18;
      border: none;
      padding: 8px 14px;
      border-radius: 6px;
      color: #fff;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s ease, transform 0.2s ease;
    }
    .read-more:hover {
      background: #ff9a4d;
      transform: translateY(-2px);
    }

    .calendar-card {
      background: linear-gradient(145deg, #202433, #2c3145);
      border-radius: 12px;
      padding: 16px;
      margin: 12px;
      color: #fff;
      box-shadow: 0 6px 20px rgba(0,0,0,0.3);
      transform: scale(0.95);
      opacity: 0;
      animation: fadeScale 0.6s forwards;
    }

    .team-card {
      background: linear-gradient(160deg, #1c1f2b, #2a2e3f);
      border-radius: 14px;
      overflow: hidden;
      margin: 16px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.35);
      transform: translateY(20px);
      opacity: 0;
      animation: fadeUp 0.6s forwards;
    }
    .team-card img {
      width: 100%;
      display: block;
    }
    .team-card-body {
      padding: 14px;
      color: #fff;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeScale {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
}

// Call this early in DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  injectThemeStyles();
});
// === THEME ENHANCEMENTS v2 ===
function injectThemeStyles() {
  const style = document.createElement("style");
  style.innerHTML = `
    /* Prevent white flash on load */
    html, body {
      background: #0f1115; /* dark base immediately */
      color: #e8eaed;
      font-family: 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      overflow-x: hidden;
    }

    section {
      padding: 40px 20px;
      margin: 20px auto;
      border-radius: 16px;
      background: linear-gradient(145deg, #151821, #1f2230);
      box-shadow: 0 12px 30px rgba(0,0,0,0.35);
      transition: transform 0.4s ease, box-shadow 0.4s ease;
    }
    section:hover {
      transform: translateY(-6px);
      box-shadow: 0 18px 40px rgba(0,0,0,0.55);
    }

    h2, h3, h4 {
      color: #ff7a18;
      text-shadow: 0 0 6px rgba(255,122,24,0.6);
    }

    /* News card styling */
    .news-card {
      background: linear-gradient(160deg, #1c1f2b, #2a2e3f);
      border-radius: 14px;
      overflow: hidden;
      margin-bottom: 24px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.35);
      transform: translateY(20px);
      opacity: 0;
      animation: fadeUp 0.6s forwards;
    }
    .news-media {
      height: 220px;
      background-size: cover;
      background-position: center;
      filter: brightness(0.9);
      transition: filter 0.4s ease;
    }
    .news-card:hover .news-media {
      filter: brightness(1.1);
    }
    .news-body {
      padding: 18px;
    }
    .news-title {
      font-size: 20px;
      margin: 0 0 8px;
      color: #fff;
    }
    .news-meta {
      font-size: 13px;
      color: #9aa0a6;
      margin-bottom: 10px;
    }

    /* === Colored article text === */
    .news-text {
      font-size: 15px;
      line-height: 1.6;
      color: #d1d5db;
    }
    .news-text strong {
      color: #4dd0e1; /* teal for emphasis */
    }
    .news-text em {
      color: #ff7a18; /* orange for italics */
    }
    .news-text ul li::marker {
      color: #ff4081; /* pink bullets */
    }
    .news-text blockquote {
      border-left: 4px solid #ff7a18;
      padding-left: 12px;
      color: #c792ea; /* purple quotes */
      font-style: italic;
    }

    .read-more {
      margin-top: 12px;
      background: #ff7a18;
      border: none;
      padding: 8px 14px;
      border-radius: 6px;
      color: #fff;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s ease, transform 0.2s ease;
    }
    .read-more:hover {
      background: #ff9a4d;
      transform: translateY(-2px);
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
}

// Inject styles as early as possible
document.addEventListener("DOMContentLoaded", injectThemeStyles);
function injectNewsTextColors() {
  const style = document.createElement("style");
  style.innerHTML = `
    /* Base news text */
    .news-text {
      font-size: 15px;
      line-height: 1.6;
      color: #d0d3d8; /* softer grey instead of white */
    }

    /* Add variation for emphasis */
    .news-text strong {
      color: #ff7a18; /* orange for bold words */
    }
    .news-text em {
      color: #4dd0e1; /* teal for italics */
    }
    .news-text mark {
      background: transparent;
      color: #c792ea; /* purple highlight */
      font-weight: 600;
    }

    /* Headings inside news */
    .news-title {
      color: #ff4081; /* pink for titles */
    }

    /* Meta info (date, author, etc.) */
    .news-meta {
      color: #8bc34a; /* green accent */
    }

    /* Links inside news */
    .news-text a {
      color: #4fc3f7;
      text-decoration: none;
    }
    .news-text a:hover {
      color: #81d4fa;
      text-decoration: underline;
    }
  `;
  document.head.appendChild(style);
}

document.addEventListener("DOMContentLoaded", injectNewsTextColors);




















