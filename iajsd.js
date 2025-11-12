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

// Next GP: São Paulo (Anton in EEST, event local Brazil UTC-3)
const nextGp = {
name: "Las Vegas Grand Prix",
venue: "Las Vegas Strip Circuit",
startISO: "2025-11-23T20:00:00-08:00", // Race local time in Las Vegas (PST)
sessions: [
  { key: "fp1", label: "FP1", iso: "2025-11-21T16:30:00-08:00" },
  { key: "fp2", label: "FP2", iso: "2025-11-21T20:00:00-08:00" },
  { key: "fp3", label: "FP3", iso: "2025-11-22T16:30:00-08:00" },
  { key: "qualifying", label: "Qualifying", iso: "2025-11-22T20:00:00-08:00" },
  { key: "race", label: "Race", iso: "2025-11-23T20:00:00-08:00" }
]
}
// Drivers 2025 (name, code, team, points, wins, poles, photo)
const drivers2025 = [

  { pos: 1, name: "Lando Norris", code: "NOR", nationality: "GBR", team: "McLaren", points: 390, wins: 7, poles: 6, photo: "https://mclaren.bloomreach.io/cdn-cgi/image/format=webp,quality=80/delivery/resources/content/gallery/mclaren-racing/formula-1/2025/nsr/f1-75-live-m/web/2025_lando_team_pic_02.jpg" },
  { pos: 2, name: "Oscar Piastri", code: "PIA", nationality: "AUS", team: "McLaren", points: 366, wins: 7, poles: 5, photo: "https://mclaren.bloomreach.io/cdn-cgi/image/format=webp,quality=80/delivery/resources/content/gallery/mclaren-racing/formula-1/2025/nsr/f1-75-live-m/web/2025_oscar_team_pic_02.jpg" },
  { pos: 3, name: "Max Verstappen", code: "VER", nationality: "NED", team: "Red Bull Racing", points: 341, wins: 5, poles: 7, photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOmb-f8vwQW9GTmAejEbUu2JeYUlzkscG8vZoaXwnvmzbJjqInaA7aSEAeB6jRrZRFCxA&usqp=CAU" },
  { pos: 4, name: "George Russell", code: "RUS", nationality: "GBR", team: "Mercedes", points: 276, wins: 2, poles: 2, photo: "https://images.ctfassets.net/1fvlg6xqnm65/DF8GKGlCgVkML7jYA3lX8/f98a3b6f3fdaff998fa1ee7cdc1fa5c9/GR-EYNTK-IMAGE-MOBILE.jpg?w=626&q=75&fm=webp" },
  { pos: 5, name: "Charles Leclerc", code: "LEC", nationality: "MON", team: "Ferrari", points: 214, wins: 0, poles: 1, photo: "https://aceracegear.com/wp-content/uploads/2025/02/cl-01-2025.jpg" },
  { pos: 6, name: "Lewis Hamilton", code: "HAM", nationality: "GBR", team: "Ferrari", points: 148, wins: 0, poles: 0, photo: "https://store.ferrari.com/dw/image/v2/BGDG_PRD/on/demandware.static/-/Sites-48/default/dw0196a800/images/zoom/LA06Zf_170_2.png?strip=false" },
  { pos: 7, name: "Kimi Antonelli", code: "ANT", nationality: "ITA", team: "Mercedes", points: 122, wins: 0, poles: 0, photo: "https://i.namu.wiki/i/uoiclYPCB7vPlR53OzLou_H9HJ-qDCPRy-OeMqaavDgvSISa7CySyCKsgzl8A0f_3vOf_eH7v7rBt8gaHb8beg.webp" },
  { pos: 8, name: "Alexander Albon", code: "ALB", nationality: "THA", team: "Williams", points: 73, wins: 0, poles: 0, photo: "https://static.independent.co.uk/2024/02/05/19/e52f9590a04d09ef4bf873e9c5122f2eY29udGVudHNlYXJjaGFwaSwxNzA3MjQ2MzI3-2.75253307.jpg?width=1200&height=1200&fit=crop" },
  { pos: 9, name: "Nico Hülkenberg", code: "HUL", nationality: "GER", team: "Kick Sauber", points: 43, wins: 0, poles: 0, photo: "https://pbs.twimg.com/media/GMrCz6GWEAASYks?format=jpg&name=large" },
  { pos: 10, name: "Isack Hadjar", code: "HAD", nationality: "FRA", team: "Racing Bulls", points: 43, wins: 0, poles: 0, photo: "https://cdn-5.motorsport.com/images/amp/Yv87pRj0/s1000/oliver-bearman-haas-f1-team-2.jpg" },
  { pos: 11, name: "Oliver Bearman", code: "BEA", nationality: "GBR", team: "Haas F1 Team", points: 40, wins: 0, poles: 0, photo: "https://preview.redd.it/ollie-bearmans-helmet-for-the-2025-season-v0-jhzkvievzoje1.jpg?width=1080&crop=smart&auto=webp&s=26282e9b98b9a85596672ff152d03c" },
  { pos: 12, name: "Fernando Alonso", code: "ALO", nationality: "ESP", team: "Aston Martin", points: 40, wins: 0, poles: 0, photo: "https://aceracegear.com/wp-content/uploads/2025/03/am-fa-2025-1.jpg" },
  { pos: 13, name: "Carlos Sainz", code: "SAI", nationality: "ESP", team: "Williams", points: 38, wins: 0, poles: 0, photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_RyGKN7IWY5i31pK8yXLVDcwvjYRS0XLQGufGNCztDziweEHsWkzIomBsjgbi96XzIx8&usqp=CAU" },
  { pos: 14, name: "Liam Lawson", code: "LAW", nationality: "NZL", team: "Racing Bulls", points: 36, wins: 0, poles: 0, photo: "https://i.namu.wiki/i/-QcAd3hXRJrSMq9n1bSfMYrnGVDHN2BJ3JLMhGXs1PkMfc3Jyd9A2Gy-ugqDmfQkZgM9BJ22pYbg711lUdV-sw.webp" },
  { pos: 15, name: "Lance Stroll", code: "STR", nationality: "CAN", team: "Aston Martin", points: 32, wins: 0, poles: 0, photo: "https://aurupteur.com/uploads/brefs/4511/4511_gkeojbrwyaijt58.jpg" },
  { pos: 16, name: "Esteban Ocon", code: "OCO", nationality: "FRA", team: "Haas F1 Team", points: 30, wins: 0, poles: 0, photo: "https://i.redd.it/esteban-ocons-helmet-for-the-2025-season-v0-u52c357k3wje1.jpg?width=3277&format=pjpg&auto=webp&s=eb145ca50e5bc3f1154fb9efa9636832904de868" },
  { pos: 17, name: "Yuki Tsunoda", code: "TSU", nationality: "JPN", team: "Red Bull Racing", points: 28, wins: 0, poles: 0, photo: "https://newsgpcdn.vshcdn.net/i/images/1586/yuki-tsunoda-f1-post-season-test-with-red-bull_f.jpg" },
  { pos: 18, name: "Pierre Gasly", code: "GAS", nationality: "FRA", team: "Alpine", points: 22, wins: 0, poles: 0, photo: "https://aceracegear.com/wp-content/uploads/2025/03/alpine-pg-2025-1.jpg" },
  { pos: 19, name: "Gabriel Bortoleto", code: "BOR", nationality: "BRA", team: "Kick Sauber", points: 19, wins: 0, poles: 0, photo: "https://static.wikia.nocookie.net/f1wikia/images/5/54/Bortoleto2025.png/revision/latest?cb=20250728003557" },
  { pos: 20, name: "Franco Colapinto", code: "COL", nationality: "ARG", team: "Alpine", points: 0, wins: 0, poles: 0, photo: "https://static.wikia.nocookie.net/f1wikia/images/c/c1/Colapinto2025_Alpine.png/revision/latest/scale-to-width-down/1200?cb=20250728003710" },
  { pos: 21, name: "Jack Doohan", code: "DOO", nationality: "AUS", team: "Alpine", points: 0, wins: 0, poles: 0, photo: "https://preview.redd.it/franco-colapinto-in-alpine-2025-will-be-the-deja-vu-of-v0-mfphwgeotvye1.png?width=1320&format=png&auto=webp&s=c67fd2287c94f2ea96a53595c6616976b0e0af20" }
];

// Constructors 2025
const constructors2025 = [
  { pos: 1, name: "Mclaren F1 Team", points: 756, drivers: ["Oscar Piastri", "Lando Norris"], photo: "https://media.formula1.com/image/upload/t_16by9Centre/c_lfill,w_3392/q_auto/v1740000000/trackside-images/2025/F1_Grand_Prix_of_Netherlands/2233042195.webp" },
  { pos: 2, name: "Mercedes-Amg Petronas F1 Team", points: 398, drivers: ["George Russell", "Kimi Antonelli"], photo: "https://images.ctfassets.net/1fvlg6xqnm65/6SsQDb4D1Ixx99OjHoDtbC/590b2a46b5090221a46fb5ac52279309/F1-2025-IMAGE-2.jpg?w=1920&q=75&fm=webp" },
  { pos: 3, name: "Oracle Red Bull Racing ", points: 366, drivers: ["Max Verstappen", "Yuki tsunoda"], photo: "https://cdn.racingnews365.com/2025/Verstappen/_1092x683_crop_center-center_85_none/Verstappen-Bahrain-testing.jpg?v=1740576626" },
  { pos: 4, name: "Scuderia Ferrari HP", points: 362, drivers: ["Charles Leclerc", "Lewis Hamilton"], photo: "https://trf1.net/wp-content/uploads/2025/02/Charles-Leclerc-Ferrari-1-1-e1739960243357.jpeg" },
  { pos: 5, name: "Atlassian Williams Racing", points: 111, drivers: ["Alexander Albon", "Carlos Sainz"], photo: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/2025/Williams/williams-2025-launch-6.webp" },
  { pos: 6, name: "Visa Cash App RB Formula One Team", points: 82, drivers: ["Isack Hadjar", "Liam  Lawson"], photo: "https://media.tudorwatch.com/image/upload/v1/tudormag/SI202503140201" },
  { pos: 7, name: "Aston Martin Aramco Cognizant Formula One Team", points: 72, drivers: ["Fernando Alonso", "Lance Stroll"], photo: "https://upload.wikimedia.org/wikipedia/commons/3/33/2025_Japan_GP_-_Aston_Martin_-_Fernando_Alonso_-_FP1.jpg" },
  { pos: 8, name: "MoneyGram Haas F1 Team", points: 70, drivers: ["Oliver Bearman", "Esteban Ocon"], photo: "https://upload.wikimedia.org/wikipedia/commons/f/f8/FIA_F1_Austria_2025_Nr._87_Bearman.jpg" },
  { pos: 9, name: "Kick Sauber", points: 62, drivers: ["Nico Hulkenberg", "Gabriel Bortoleto"], photo: "https://upload.wikimedia.org/wikipedia/commons/9/9e/2025_Japan_GP_-_Sauber_-_Nico_Hulkenberg_-_FP1.jpg" },
  { pos: 10, name: "BWT Alpine F1 Team", points: 21, drivers: ["Piere Gasly", "Franco Colapinto"], photo: "https://upload.wikimedia.org/wikipedia/commons/a/ae/FIA_F1_Austria_2025_Nr._10_Gasly.jpg" },
];

// News after USA GP 2025
const newsAfterUSAGP = [
 {
    title: "Red Bull and Racing Bulls to Unveil 2026 F1 Cars in Detroit on January",
    date: "2025-11-12",
    image: "https://cdn-9.motorsport.com/images/amp/6b7Galv0/s1000/liam-lawson-red-bull-racing-is.jpg",
    text: `On January 15, 2026, Formula 1 fans will witness a landmark moment: Red Bull Racing and Racing Bulls will jointly reveal their new cars in Detroit, Michigan, at the headquarters of their new engine partner, Ford. This event marks the official beginning of the Red Bull Ford Powertrains era, a partnership that will debut under the sweeping new F1 regulations set to reshape the sport.

A Historic Launch in Detroit
Location: Ford’s U.S. headquarters in Detroit, chosen to honor the American giant’s motorsport heritage.

Teams Involved: Oracle Red Bull Racing and Visa Cash App Racing Bulls.

Date: January 15, 2026 – the first confirmed launch of the new rules era.

By selecting Detroit, Red Bull is paying tribute to Ford’s legacy while celebrating the start of a new chapter in Formula 1. The unveiling will showcase the new liveries of both teams, designed for the 2026 season that introduces radical changes to power units and chassis regulations.

The Red Bull–Ford Partnership
Power Units: For the first time, Red Bull will compete with its own Red Bull Ford Powertrains, developed in collaboration with Ford engineers.

Significance: This partnership represents Ford’s return to Formula 1 after decades away, while giving Red Bull full independence in engine manufacturing.

CEO Statement: Ford’s Jim Farley emphasized that the collaboration is about more than racing—it’s about applying F1 innovation to future cars and trucks.

What Fans Can Expect
Livery Reveal: Both teams will present their striking new designs, symbolizing the dawn of the 2026 regulations.

Pre-Season Testing: The cars themselves are expected to hit the track later in January at a private test in Barcelona.

Season Outlook: With 24 races scheduled, the 2026 campaign promises to be one of the most competitive in F1 history.

Why It Matters
This Detroit launch is more than a car reveal—it’s the start of a new era in Formula 1. Red Bull and Racing Bulls are positioning themselves at the forefront of innovation, combining their racing pedigree with Ford’s engineering might. Fans worldwide will be watching closely, as the partnership could redefine the competitive landscape of the sport.
`
  },
  {
    title: "From Zandvoort Heartbreak to Championship Triumph: Lando Norris’s Stunning Comeback",
    date: "2025-11-11",
    image: "https://cdn-9.motorsport.com/images/amp/YpbPvlN0/s1000/lando-norris-mclaren.jpg",
    text: `When the Dutch Grand Prix at Zandvoort ended in smoke for Lando Norris, many believed his 2025 Formula 1 title hopes had gone up with it. Running strongly in second place, Norris suffered a cruel mechanical failure that handed victory to teammate Oscar Piastri and left the Briton trailing by 34 points in the standings. For a driver who had led the championship earlier in the year, the setback looked decisive. Yet what followed was one of the most remarkable comebacks in recent F1 history.

The Turning Point
Instead of crumbling under pressure, Norris regrouped. Across the next five rounds—Italy, Azerbaijan, Singapore, the United States, and Mexico—he consistently outscored Piastri. His resilience was rewarded with back-to-back victories in Mexico City and São Paulo, where he dominated the field and reclaimed the championship lead. By early November, Norris had transformed a 34-point deficit into a razor-thin advantage, sitting just one point ahead of Piastri.

Mental Strength and Maturity
What makes Norris’s comeback so compelling is not just the results, but the mindset behind them. Former world champion Jacques Villeneuve praised Norris’s openness about mistakes, calling his honesty a “superpower” that allowed him to grow under pressure. Norris himself dismissed the idea that luck or sudden change in mentality was responsible, insisting that his resurgence was built on hard work, consistency, and belief in McLaren’s pace.

The Championship Battle
With only a handful of races left, the fight between Norris and Piastri has become the defining storyline of the season. McLaren, already crowned Constructors’ Champion, now faces the rare luxury—and tension—of seeing its two drivers battle for the ultimate prize. Meanwhile, Max Verstappen, though still capable of brilliance, has slipped further behind, acknowledging that Red Bull’s struggles earlier in the season cost him dearlyF1GrandPrix.it.

Why This Comeback Matters
Norris’s rebound after Zandvoort is more than a statistical recovery—it’s a testament to the evolution of a driver once criticized for lacking killer instinct. By refusing to let mechanical misfortune define his season, he has shown the grit required of a world champion. His victories in Mexico and Brazil weren’t just wins; they were statements of intent, proving that he can thrive under the most intense pressure.
`
  },
 {
    title: "From Pitlane to Podium: Verstappen’s Astonishing P3 in Brazil",
    date: "2025-11-10",
    image: "https://media.formula1.com/image/upload/t_16by9Centre/c_lfill,w_3392/q_auto/v1740000000/trackside-images/2025/F1_Grand_Prix_of_Brazil/2245875435.webp",
    text: `Max Verstappen’s charge from the pitlane to third place at the 2025 São Paulo Grand Prix was nothing short of extraordinary. What began as a weekend of frustration for Red Bull turned into one of the most memorable comeback drives of the season, showcasing Verstappen’s relentless determination and racecraft.

A Weekend of Struggles
Verstappen’s troubles started in qualifying, where he was eliminated in Q1 for the first time in his career. Red Bull’s experimental setup changes left the car unbalanced, forcing the team to take drastic action. Overnight, they fitted a new power unit and revised setup, which meant Verstappen had to start from the pitlane under parc fermé rules.

Early Setbacks
The race began with more drama. Verstappen picked up a puncture on lap one, forcing an early pit stop and dropping him to the back once again. At that point, few believed a podium was possible. Yet, Verstappen remained composed, knowing the Interlagos circuit often rewards bold strategy and aggressive overtaking.

The Fightback
From there, Verstappen launched a relentless recovery drive. He carved through the midfield, exploiting Red Bull’s improved race pace and making decisive moves in the DRS zones. His ability to manage tire degradation while maintaining speed was crucial. By mid-race, he was already inside the top ten, and with a perfectly timed second stop, he emerged in contention for the podium.

Closing Stages
In the final laps, Verstappen battled Mercedes’ Kimi Antonelli for second place. Although he couldn’t quite pass the Italian rookie, Verstappen secured P3, a result he himself admitted was “incredible” and far beyond expectations. The podium extended his streak of seven consecutive top-three finishes, keeping his season alive even as championship leader Lando Norris extended his points advantage.

Why It Mattered
This comeback wasn’t just about salvaging points. It highlighted Red Bull’s willingness to take risks—changing the car setup “blind” and starting from pitlane rather than settling for mediocrity. Verstappen’s drive embodied the team’s competitive DNA and his own refusal to give up, even when the odds seemed stacked against him.
`
  },
 {
    title: "Chaos, Comebacks, and Controversy: F1 Drivers React to the 2025 Brazilian Grand Prix",
    date: "2025-11-10",
    image: "https://i.ytimg.com/vi/-o7fAgMnOZA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBLtzlx8SVjyMToZ1n9ALd-vJ7KHQ",
    text: `The 2025 São Paulo Grand Prix delivered drama, redemption, heartbreak, and championship-defining moments. Here's how each of the 20 drivers reacted after the checkered flag fell at Interlagos: 
    1. Lando Norris (McLaren) "It feels incredible. Brazil has always been special, and to win here with such pace—just wow. The boos? I hear them, but I’m focused on the title."

2. Kimi Antonelli (Mercedes) "I gave it everything. The contact with Piastri was unfortunate, but I kept my head down. P2 is a great result for the team."

3. Max Verstappen (Red Bull) "From pit lane to podium—classic Interlagos chaos. We made the right calls, and the car felt alive. I love this place."

4. George Russell (Mercedes) "Solid points today. I had the pace for a podium but got caught in traffic mid-race. Still, we’re building momentum."

5. Oscar Piastri (McLaren) "I’m gutted. The penalty was harsh—I saw a gap and went for it. It cost me, but I’ll bounce back in Vegas."

⚔️ Midfield Warriors
6. Oliver Bearman (Haas) "Best result of the season! The car was hooked up, and I managed the tires well. We’re proving Haas belongs in the fight."

7. Liam Lawson (Racing Bulls) "Happy with the points. We nailed the strategy and stayed clean. Sao Paulo always throws surprises."

8. Isack Hadjar (Racing Bulls) "Tough race, but I’m proud of the fight. Holding off Gasly in the final laps was intense."

9. Nico Hülkenberg (Sauber) "We needed this. Clean race, good pace, and finally some luck. Let’s keep pushing."

10. Pierre Gasly (Alpine) "Frustrating. We had the pace for more, but traffic and tire degradation hurt us. Still, points are points."

🚧 Battlers and Survivors
11. Alex Albon (Williams) "We gambled on the early stop—it almost worked. Just missed the top ten, but the car felt decent."

12. Esteban Ocon (Haas) "I got squeezed a few times, but we kept it clean. Not our best day, but we’ll regroup."

13. Carlos Sainz (Williams) "The car was tricky today. I struggled with balance and couldn’t find rhythm. We’ll analyze and move forward."

14. Fernando Alonso (Aston Martin) "Not much to celebrate. We lacked pace and grip. Brazil deserves better racing from us."

15. Franco Colapinto (Alpine) "First time racing here—it’s electric. I learned a lot, and finishing was the goal. Mission accomplished."

16. Lance Stroll (Aston Martin) "We tried a bold strategy, but it didn’t pay off. Just one of those weekends."

17. Yuki Tsunoda (Red Bull) "I got caught in the Lap 1 mess and never recovered. Disappointed, but we’ll fight again."

💥 DNFs and Heartbreaks
Charles Leclerc (Ferrari) "I was just a passenger in that crash. It’s frustrating—this could’ve been a podium. We need answers."

Lewis Hamilton (Ferrari) "I felt something wrong early on, then the engine gave up. Brazil deserves better. We’ll come back stronger."

Gabriel Bortoleto (Sauber) "Devastated. My home race, and I couldn’t finish. I wanted to give the fans a show. Next year, I promise."
`
  },
     {
    title: "Lando Norris Dominates in São Paulo to Extend Championship Lead",
    date: "2025-11-09",
    image: "https://media.formula1.com/image/upload/t_16by9North/c_lfill,w_3392/q_auto/v1740000000/trackside-images/2025/F1_Grand_Prix_of_Brazil___Practice__Sprint_Qualifying/2245550144.webp",
    text: `The 2025 Brazilian Grand Prix at Interlagos delivered a thrilling mix of strategy, rookie brilliance, and title-shaping drama. Lando Norris claimed a commanding victory, finishing over 10 seconds clear of Mercedes’ teenage sensation Kimi Antonelli, while Max Verstappen stormed from the pit lane to third. The result strengthens Norris’s grip on the championship, with just three races left in the season.

🌟 Key Race Highlights
Norris’s Perfect Weekend: After winning Saturday’s sprint, Norris converted pole into victory on Sunday. His pace was untouchable, and he managed tire degradation superbly, never looking under threat.

Antonelli’s Breakthrough: The 19-year-old Mercedes rookie stunned the paddock by finishing second, his best F1 result to date. He held off Verstappen in the closing laps, showing maturity beyond his years.

Verstappen’s Recovery Drive: Starting from the pit lane after setup changes, Verstappen carved through the field with relentless pace. His podium keeps him in mathematical contention for the title.

Piastri Loses Ground: Norris’s McLaren teammate Oscar Piastri struggled, finishing behind George Russell. This result widens Norris’s lead in the standings and shifts momentum firmly in his favor.

Midfield Battles: Oliver Bearman impressed again with a strong top-six finish for Haas, while Liam Lawson and Nico Hülkenberg executed clever one-stop strategies to secure points.

Full Race Classification (71 laps)
1	Lando Norris (GBR)	McLaren	
2	Kimi Antonelli (ITA)	Mercedes	
3	Max Verstappen (NED)	Red Bull	+
4	George Russel (GBR)	Mercedes
5  Oscar Piastri (AUS)	McLaren
6	Oliver Bearman (GBR)	Haas
7	Liam Lawson (NZL)	Racing Bulls	
8	Isack Hadjar (FRA)	Racing Bulls	
9	Nico Hülkenberg (GER)	Sauber	
10	Pierre Gasly (FRA)	Alpine	
11	Alex Albon (THA)	Williams	
12	Esteban Ocon (FRA)	Haas	
13	Carlos Sainz (ESP)	Williams	
14	Fernando Alonso (ESP)	Aston Martin	
15 Franco Colapinto (ARG)  Alpine
16	Lance Stroll (CAN)	Aston Martin	
17	Yuki Tsunoda (JPN)	Red Bull	
—	Charles Leclerc (MON)	Ferrari	DNF 
—	Lewis Hamilton (GBR)	Ferrari 		DNF
-	Gabriel Bortoleto (BRA)	Sauber	DNF 
 
🏆 Championship Picture
Norris now leads by 24 points over Piastri, after also winning the sprint and the race in the weekend.

Verstappen remains in the hunt, though his deficit is significant with only three races left.

McLaren continues to dominate the constructors’ standings, but Mercedes’ resurgence with Antonelli and Russell could make the final rounds more unpredictable.

⚡ Why This Race Mattered
The São Paulo Grand Prix often plays a pivotal role in title battles, and 2025 was no exception. Norris’s victory not only gave him breathing room in the standings but also showcased his ability to handle pressure in the season’s decisive phase. Meanwhile, Antonelli’s podium signals a generational shift, with the rookie proving he belongs among the elite.
`
  },
     {
    title: "Brazilian GP 2025: Norris vs Piastri in Rain-Soaked Interlagos Showdown",
    date: "2025-11-09",
    image: "https://images.squarespace-cdn.com/content/v1/52744b67e4b0782c048b666f/1762430056260-FSW3R2ZF2Q1W7NDCJBIF/2+F1+Brazil+GP+poster.jpg?format=750w",
    text: `The 2025 Brazilian Grand Prix at Interlagos promises chaos and drama, with rain showers and thunderstorms forecast across the weekend. The unpredictable São Paulo skies mean strategy will be as decisive as raw pace, and practice sessions have already hinted at who might hold the upper hand.

Weather Report 🌧️

Sunday (Race Day): Cooler temperatures near 19°C with light rain showers expected. Track evolution will be tricky, with drying lines appearing late in the race. Safety Car probability is high, historically 86% in wet conditions.

Practice Analysis 🔍
McLaren looked dominant, with Lando Norris topping the sole practice session by just 0.023s over teammate Oscar Piastri. Their pace on both short runs and mid-session fuel loads suggests strong adaptability.

Red Bull struggled, with Max Verstappen only 17th in practice, complaining of poor balance in the wet. However, Verstappen’s history at Interlagos—winning from P17 last year in torrential rain—means he cannot be discountedF1 Oversteer.

Ferrari and Mercedes showed mixed form: Charles Leclerc languished near the back, while rookie Kimi Antonelli impressed with front-row pace in Sprint Qualifying. Mercedes’ stability in wet conditions could be a hidden advantage.

Surprise performers: Nico Hulkenberg (Sauber) and Fernando Alonso (Aston Martin) both placed inside the top five in practice, suggesting midfield teams could capitalize if chaos unfolds.

Race Strategies 🧠
Two-stop race likely: Starting on intermediates, switching to slicks if a dry line emerges, then back to wets if showers return.

Track position critical: Overtaking at Interlagos is possible, but risky in wet conditions—especially at the Senna ‘S’.

Safety Car windows: Teams must stay flexible, ready to pit under caution to minimize time loss.

McLaren advantage: With Norris leading the championship by just one point over Piastri, both drivers will push aggressively. Expect team strategy tension if rain reshuffles the order.

Who Holds the Advantage? 🏁
McLaren: Best balance in practice, strong wet-weather pace, and both drivers in the title fight. Norris has momentum after Mexico, but Piastri is desperate to reclaim the lead.

Verstappen: Despite poor practice, his wet-weather mastery and fearless overtaking make him the dark horse.

Mercedes (Antonelli): Rookie brilliance could shine if conditions stay treacherous.
`
  },
   {
    title: "Lando Lights It Up: Norris Takes Pole in Wild São Paulo Qualifying",
    date: "2025-11-08",
    image: "https://cdni.autocarindia.com/ExtraImages/20251027125339_f1_norris_mexico_gp.jpg",
    text: `Lando Lights It Up: Norris Takes Pole in Wild São Paulo Qualifying

In a dramatic and unpredictable qualifying session at Interlagos, Lando Norris delivered a masterclass to snatch pole position for the 2025 São Paulo Grand Prix, continuing his late-season surge in the title fight. The McLaren driver clocked a blistering 1:09.511, edging out Mercedes rookie *Andrea Kimi Antonelli* and Ferrari’s *Charles Leclerc* in a session that saw championship contenders stumble and new stars shine.



 🔥 Qualifying Report: Chaos, Comebacks, and Championship Twists

The Interlagos circuit, always a theatre of drama, delivered again. With clouds looming and grip levels fluctuating, the session was a rollercoaster from Q1 to Q3.

- Q1 Shock:Max Verstappen*, struggling with balance and rear-end grip, suffered a stunning Q1 exit. The Red Bull driver will start 16th, a massive blow to his championship hopes.
- Q2 Drama:Lewis Hamilton* couldn’t extract pace from his Mercedes and was eliminated in P13, while *Isack Hadjar* stunned the paddock by dragging his RB into Q3 with a stellar lap.
- Q3 Showdown: Norris, fresh off a Sprint win earlier in the day, saved his best for last. His final lap was a statement—hooked up, aggressive, and inch-perfect. Antonelli, showing maturity beyond his years, secured a front-row start, while Leclerc’s tidy lap earned him P3.

Meanwhile, Oscar Piastri recovered from a Sprint crash to qualify fourth, keeping his title hopes alive. Hadjar’s P5 was arguably the lap of the day, outqualifying both George Russell and Carlos Sainz.

---





With Norris now holding a slender lead in the championship, and Verstappen buried in the midfield, Sunday’s race promises fireworks. Will McLaren convert pole into victory? Can Antonelli pull off a shock win? And how far can Max climb? São Paulo never disappoints—and this one’s already a classic in the making.` 
    },
   {
   title: "Norris Holds Firm at Interlagos — McLaren Driver Takes Sprint Win Amid Chaos",
    date: "2025-11-08",
    image: "https://d3cm515ijfiu6w.cloudfront.net/wp-content/uploads/2024/11/03192347/lando-norris-wave-brazilian-gp-planetf1.jpg",
    text: ` In a dramatic sprint race at the 2025 Brazilian Grand Prix at Autódromo José Carlos Pace (São Paulo), Lando Norris delivered a flawless performance to convert pole into victory, while his title-contending teammate Oscar Piastri suffered a major setback. Norris led from lights to flag and extended his advantage in the drivers’ championship, while chaos struck mid-race and reshuffled the order and pressure at the top.

Full Report

Norris got off the line superbly, taking full advantage of his sprint-pole position to establish an early advantage. He held the lead confidently, fending off pressure from the surprise challenge of Kimi Antonelli (Mercedes) who pushed hard in the early laps. 
Sky Sports
+3
RacingNews365
+3
GPFans
+3

However, the race’s tone changed dramatically about one-third of the way in: on lap six at Turn 3, Piastri lost control—apparently caught out by a damp kerb and water spray—and slammed into the barriers. Two other drivers, Nico Hülkenberg and Franco Colapinto, crashed in very quick succession at the same corner, forcing a red flag and stoppage while the barriers were repaired. 
The Race

When the sprint restarted under rolling conditions, Norris maintained his composure and lead even though Antonelli was on more durable tyres and pressed strongly. Ultimately Norris held on to claim his first sprint-win of the season and a big points haul in the championship battle. 
GPblog
+2
RacingNews365
+2

Behind Norris and Antonelli, George Russell (Mercedes) secured the final spot on the podium, while reigning champion Max Verstappen finished fourth after being unable to bridge the gap. 
RacingNews365
+2
GPblog
+2

For McLaren, the contrasting fortunes are stark: Norris maximised his opportunity, while Piastri’s crash is a major blow to his title bid. The result sees Norris move nine points clear of Piastri in the standings. 
RaceFans
+1

Full Sprint Race Classification (24 laps)
Pos	Driver	Team	Gap / Notes
1	Lando Norris (GBR)	McLaren	—
2	Kimi Antonelli (ITA)	Mercedes	+0.845 s
3	George Russell (GBR)	Mercedes	+2.318 s
4	Max Verstappen (NED)	Red Bull	+4.423 s
5	Charles Leclerc (MON)	Ferrari	+16.483 s
6	Fernando Alonso (ESP)	Aston Martin	+18.306 s
7	Lewis Hamilton (GBR)	Ferrari	+18.603 s
8	Pierre Gasly (FRA)	Alpine	+19.366 s
9	Lance Stroll (CAN)	Aston Martin	+23.933 s
10	Isack Hadjar (FRA)	Racing Bulls	+29.548 s
11	Esteban Ocon (FRA)	Haas	+31.000 s
12	Oliver Bearman (GBR)	Haas	+31.334 s
13	Liam Lawson (NZL)	Racing Bulls	+38.090 s
14	Yuki Tsunoda (JPN)	Red Bull	+38.462 s
15	Carlos Sainz (ESP)	Williams	+38.951 s
16	Nico Hülkenberg (GER)	Sauber	+42.349 s
17	Alex Albon (THA)	Williams	+55.456 s
18	Gabriel Bortoleto (BRA)	Sauber	1 Lap down
—	Oscar Piastri (AUS)	McLaren	DNF (crash)
—	Franco Colapinto (ARG)	Alpine	DNF (crash)


Implications & Takeaways

Norris’s victory is timely — extending his lead in the championship at what is a critical juncture of the season.

Piastri’s crash is doubly damaging: no points in the sprint and potential repercussions into qualifying and the main race.

Mercedes emerge strongly with both drivers on the podium, showing improved consistency and pace.

Red Bull and Verstappen will be frustrated — finishing behind two Mercedes and unable to close the gap to Norris.

The red-flag incident and barrier repairs remind us how even a sprint race can hinge on external factors (track conditions, weather, surface water).

Looking Ahead

With the sprint out of the way, the focus now shifts to qualifying and the main Grand Prix on Sunday. Norris will aim to build momentum, while Piastri must bounce back quickly. The championship is far from settled — but this weekend has tilted the scales ever so slightly in Norris’s favour.
`
  },
    {
    title: "Norris Leads the Pack in Brazil FP1",
    date: "2025-11-07",
    image: "https://static.independent.co.uk/2024/04/19/11/07-7b3ad5286d2e4ba29111ed28424e0801.jpg",
    text: `McLaren’s Lando Norris stamped his authority at Interlagos by setting the fastest time in the 2025 Formula 1 São Paulo Grand Prix FP1 session. In a single hour of practice, Norris showed blistering pace, edging out his teammate Oscar Piastri to secure a McLaren 1–2. The session highlighted McLaren’s strength on the technical Autódromo José Carlos Pace circuit, while rivals scrambled to keep up.

🌍 Full FP1 Report
The lone practice session in Brazil was a crucial opportunity for teams to fine-tune their setups ahead of sprint qualifying. Norris looked confident from the start, consistently topping the timesheets. Piastri followed closely, proving McLaren’s balance and speed are well-suited to the high-speed corners and elevation changes of Interlagos.

Behind them, Nico Hulkenberg surprised many by pushing his Sauber into third, reminding fans of his past pole position at the same venue back in 2010. Fernando Alonso kept Aston Martin in the mix with a strong fourth, while Brazilian rookie Gabriel Bortoleto delighted home fans by securing fifth in his Sauber.

Mercedes showed flashes of competitiveness with George Russell and Andrea Kimi Antonelli inside the top 10, while Racing Bulls’ youngsters Isack Hadjar and Liam Lawson demonstrated promise. Williams, Haas, and Alpine filled the midfield, with Ferrari notably absent from the sharp end of the timesheets, raising questions about their pace heading into the weekend.

📋 FP1 Classification (Brazil GP 2025)
Here’s the full list from 1st to 20th:

Position	Driver	Team
1	Lando Norris	McLaren
2	Oscar Piastri	McLaren
3	Nico Hulkenberg	Sauber
4	Fernando Alonso	Aston Martin
5	Gabriel Bortoleto	Sauber
6	George Russell	Mercedes
7	Pierre Gasly	Alpine
8	Carlos Sainz	Williams
9	Isack Hadjar	Racing Bulls
10	Andrea Kimi Antonelli	Mercedes
11	Liam Lawson	Racing Bulls
12	Alex Albon	Williams
13	Esteban Ocon	Haas
14	Oliver Bearman	Haas
15	Lance Stroll	Aston Martin
16	Franco Colapinto	Alpine
17	Max Verstappen	Red Bull Racing
18	Charles Leclerc	Ferrari
19	Lewis Hamilton	Ferrari
20	Yuki Tsunoda	Red Bull Racing
`
  },
    {
    title: "Norris takes pole in Brazil Sprint Qualifying",
    date: "2025-11-07",
    image: "https://d3cm515ijfiu6w.cloudfront.net/wp-content/uploads/2024/11/03192347/lando-norris-wave-brazilian-gp-planetf1.jpg",
    text: `The drama of Interlagos never disappoints, and the 2025 Brazilian Grand Prix Sprint Qualifying was no exception. Under the São Paulo skies, the grid for Saturday’s Sprint was set after a tense three-phase shootout that saw Lando Norris stamp his authority at the top, edging out his McLaren teammate Oscar Piastri and title rival Max Verstappen.

With the championship battle hanging by a thread—just a single point separating Norris and Piastri before this weekend—every lap carried enormous weight. McLaren once again showed their raw pace, but Verstappen’s Red Bull lurked dangerously close, reminding everyone that the Dutchman is never out of the fight at Interlagos.

🔥 Full Sprint Qualifying Report
SQ1: Medium tyres were mandatory, and the McLarens immediately set the tone. Piastri went quickest early, just ahead of Norris, while Alonso impressed with a strong third. Verstappen bided his time before unleashing a lap nearly two-tenths faster than anyone else.

SQ2: The field tightened. Russell briefly topped the timesheets, but Norris and Piastri responded with blistering laps. Ferrari struggled, with Leclerc scraping through while Hamilton looked uncomfortable in his Ferrari, only just making the cut.

SQ3: The final shootout was a McLaren vs. Red Bull showdown. Norris delivered under pressure, stringing together a near-perfect lap to secure P1. Piastri slotted into second, while Verstappen had to settle for third after a small error in the middle sector.

🏁 Full Sprint Qualifying Results (1st–20th)
Position	Driver	Team
1	Lando Norris	McLaren
2	Kimi Antonelli	Mercedes
3	Oscar Piastri	Mclaren
4	George Russell	Mercedes
5	Fernando Alonso	Aston Martin
6	Max Verstappen Red Bull Racing
7	Lance Stroll	Aston Martin
8	Charles Leclerc	Ferrari
9	Isack Hadjar   Racing Bulls
10	Nico Hulkenberg	Sauber
11	Lewis Hamilton	Ferrari
12	Alexander Albon	Williams
13	Piere Gasly	Alpine
14	Gabriel Bortoleto	Sauber
15	Oliver Bearman	Haas
16	Franco Colapinto	Alpine
17	Liam Lawson	Racing Bulls
18	Yuki Tsunoda Red Bull Racing
19	Esteban Ocon	Haas
20	Carlos Sainz	Williams
`
  },
    {
    title: "Norris Leads the Pack in Brazil FP1",
    date: "2025-11-07",
    image: "https://static.independent.co.uk/2024/04/19/11/07-7b3ad5286d2e4ba29111ed28424e0801.jpg",
    text: `McLaren’s Lando Norris stamped his authority at Interlagos by setting the fastest time in the 2025 Formula 1 São Paulo Grand Prix FP1 session. In a single hour of practice, Norris showed blistering pace, edging out his teammate Oscar Piastri to secure a McLaren 1–2. The session highlighted McLaren’s strength on the technical Autódromo José Carlos Pace circuit, while rivals scrambled to keep up.

🌍 Full FP1 Report
The lone practice session in Brazil was a crucial opportunity for teams to fine-tune their setups ahead of sprint qualifying. Norris looked confident from the start, consistently topping the timesheets. Piastri followed closely, proving McLaren’s balance and speed are well-suited to the high-speed corners and elevation changes of Interlagos.

Behind them, Nico Hulkenberg surprised many by pushing his Sauber into third, reminding fans of his past pole position at the same venue back in 2010. Fernando Alonso kept Aston Martin in the mix with a strong fourth, while Brazilian rookie Gabriel Bortoleto delighted home fans by securing fifth in his Sauber.

Mercedes showed flashes of competitiveness with George Russell and Andrea Kimi Antonelli inside the top 10, while Racing Bulls’ youngsters Isack Hadjar and Liam Lawson demonstrated promise. Williams, Haas, and Alpine filled the midfield, with Ferrari notably absent from the sharp end of the timesheets, raising questions about their pace heading into the weekend.

📋 FP1 Classification (Brazil GP 2025)
Here’s the full list from 1st to 20th:

Position	Driver	Team
1	Lando Norris	McLaren
2	Oscar Piastri	McLaren
3	Nico Hulkenberg	Sauber
4	Fernando Alonso	Aston Martin
5	Gabriel Bortoleto	Sauber
6	George Russell	Mercedes
7	Pierre Gasly	Alpine
8	Carlos Sainz	Williams
9	Isack Hadjar	Racing Bulls
10	Andrea Kimi Antonelli	Mercedes
11	Liam Lawson	Racing Bulls
12	Alex Albon	Williams
13	Esteban Ocon	Haas
14	Oliver Bearman	Haas
15	Lance Stroll	Aston Martin
16	Franco Colapinto	Alpine
17	Max Verstappen	Red Bull Racing
18	Charles Leclerc	Ferrari
19	Lewis Hamilton	Ferrari
20	Yuki Tsunoda	Red Bull Racing
`
  },
    {
    title: "Franco Colapinto Secures Alpine Seat for 2026 Formula 1 Season",
    date: "2025-11-07",
    image: "https://cdn1.f1oversteer.com/uploads/37/2025/09/GettyImages-2232436876-1024x683.jpg",
    text: `Franco Colapinto, the young Argentine talent, will continue his journey in Formula 1 with Alpine, as the team confirmed he will drive alongside Pierre Gasly in the 2026 season. Despite a challenging debut year in 2025, Alpine has shown faith in Colapinto’s potential, securing him as part of their long-term project.

A Rising Star with a Rocky Start
Colapinto first entered Formula 1 in 2024 with Williams, stepping in mid-season and impressing with flashes of speed and composure. His move to Alpine in 2025 came after replacing Jack Doohan just six races into the campaign. While his early performances were inconsistent—marked by errors and a lack of points—he gradually improved, finishing ahead of teammate Gasly in several racesSky Sports.

Alpine’s Strategy for Stability
Alpine’s decision to retain Colapinto reflects their desire for continuity and stability. Executive advisor Flavio Briatore emphasized that Colapinto has the attributes to grow with the team, noting his resilience and ability to adapt under pressure. Gasly, meanwhile, has already committed to Alpine until 2028, meaning the team now has a clear driver pairing for the medium termFormula 1.

Fan Connection and Regional Impact
Colapinto’s presence is particularly significant for South American fans. With the Brazilian Grand Prix being the only F1 race in the region, Alpine’s announcement ahead of the São Paulo weekend was symbolic, drawing strong support from Argentine fans who see Colapinto as their new motorsport ambassador.

Looking Ahead to 2026
The 2026 season will mark Colapinto’s first full campaign from start to finish. Alpine hopes that with a year of experience under his belt, he can convert consistency into points and help push the team up the constructors’ standings. For Colapinto, it’s a chance to prove he belongs among the elite, and for Alpine, it’s a bet on youthful promise over immediate results.
`
  },
    {
    title: "Drivers React After Friday at the 2025 F1 São Paulo Grand Prix: Norris Shines, Piastri Rebounds, Verstappen Strugglesg",
    date: "2025-11-08",
    image: "https://media.formula1.com/image/upload/t_16by9Centre/c_lfill,w_3392/q_auto/v1740000000/trackside-images/2024/F1_Grand_Prix_of_Brazil___Sprint__Qualifying/2182473837.webp",
    text: `Today
Write me drivers opinion after friday for f1 brazil 2025 ,, write an article about that with title and text
🏎️ Drivers React After Friday at the 2025 F1 São Paulo Grand Prix: Norris Shines, Piastri Rebounds, Verstappen Struggles

The drama at Interlagos began early this weekend, with Friday’s Sprint Qualifying setting the tone for what promises to be a pivotal round in the 2025 Formula 1 championship.

Norris Confident After Pole
Lando Norris delivered a superb lap to secure Sprint pole position, continuing his momentum after victory in Mexico. The McLaren driver, now leading the championship by a single point, was upbeat:

“It felt great out there. The car was really hooked up, and even with the wind picking up, we managed to keep it stable. Interlagos is always tricky, but I’m happy with how we started the weekend.”

Norris’ confidence reflects McLaren’s strong form, and his ability to handle the pressure of a tight title fight is becoming increasingly evident.

Piastri Relieved by Strong Showing
After a difficult run of races, Oscar Piastri was visibly relieved to qualify third, just behind Norris and rookie sensation Kimi Antonelli. He admitted his first lap wasn’t perfect but praised the car’s improvement:

“I’m much happier today than the last couple of weeks. The balance felt better, and even though I had a couple of big moments on my first lap, overall it was a step forward. We’re back in the fight.”

Piastri’s optimism suggests McLaren may have found solutions to the issues that plagued him in recent rounds, keeping the title battle alive.

Antonelli Impresses Again
Kimi Antonelli, the Mercedes rookie, stunned many by grabbing second place. His calm reaction showed maturity beyond his years:

“It’s special to be up here at Interlagos. The car felt strong, and I think we can fight tomorrow. It’s about keeping it clean and learning every lap.”

Antonelli’s rise continues to be one of the season’s biggest stories, with his performances already drawing comparisons to past legends.

Verstappen Frustrated
Meanwhile, Max Verstappen endured a tough day, finishing outside the top five after struggling with grip in practice and qualifying. The Red Bull driver admitted:

“We just didn’t get the balance right. The car was sliding too much, and we need to understand why. It’s not ideal, but we’ll keep pushing.”

With Verstappen 36 points adrift in the standings, his frustration is understandable—Brazil may be slipping away as a chance to close the gap.

Other Voices from the Grid
George Russell (P4): “We’re close, but missing a little bit compared to McLaren. Tomorrow’s race pace will be key.”

Charles Leclerc (P6): “It wasn’t perfect, but the car feels decent. We’ll see what the weather brings.”

Fernando Alonso (P5): “Interlagos always delivers surprises. I think we’re in the mix.”

Conclusion
Friday at the 2025 São Paulo Grand Prix highlighted the intensity of this year’s title fight. Norris’ pole, Piastri’s resurgence, and Antonelli’s breakthrough set up a thrilling weekend, while Verstappen’s struggles add another twist to the narrative. With rain forecast for the Sprint and Grand Prix, Interlagos could once again deliver one of its trademark chaotic classics.
`
  },
    {
    title: "Norris takes pole in Brazil Sprint Qualifying",
    date: "2025-11-07",
    image: "https://d3cm515ijfiu6w.cloudfront.net/wp-content/uploads/2024/11/03192347/lando-norris-wave-brazilian-gp-planetf1.jpg",
    text: `The drama of Interlagos never disappoints, and the 2025 Brazilian Grand Prix Sprint Qualifying was no exception. Under the São Paulo skies, the grid for Saturday’s Sprint was set after a tense three-phase shootout that saw Lando Norris stamp his authority at the top, edging out his McLaren teammate Oscar Piastri and title rival Max Verstappen.

With the championship battle hanging by a thread—just a single point separating Norris and Piastri before this weekend—every lap carried enormous weight. McLaren once again showed their raw pace, but Verstappen’s Red Bull lurked dangerously close, reminding everyone that the Dutchman is never out of the fight at Interlagos.

🔥 Full Sprint Qualifying Report
SQ1: Medium tyres were mandatory, and the McLarens immediately set the tone. Piastri went quickest early, just ahead of Norris, while Alonso impressed with a strong third. Verstappen bided his time before unleashing a lap nearly two-tenths faster than anyone else.

SQ2: The field tightened. Russell briefly topped the timesheets, but Norris and Piastri responded with blistering laps. Ferrari struggled, with Leclerc scraping through while Hamilton looked uncomfortable in his Ferrari, only just making the cut.

SQ3: The final shootout was a McLaren vs. Red Bull showdown. Norris delivered under pressure, stringing together a near-perfect lap to secure P1. Piastri slotted into second, while Verstappen had to settle for third after a small error in the middle sector.

🏁 Full Sprint Qualifying Results (1st–20th)
Position	Driver	Team
1	Lando Norris	McLaren
2	Kimi Antonelli	Mercedes
3	Oscar Piastri	Mclaren
4	George Russell	Mercedes
5	Fernando Alonso	Aston Martin
6	Max Verstappen Red Bull Racing
7	Lance Stroll	Aston Martin
8	Charles Leclerc	Ferrari
9	Isack Hadjar   Racing Bulls
10	Nico Hulkenberg	Sauber
11	Lewis Hamilton	Ferrari
12	Alexander Albon	Williams
13	Piere Gasly	Alpine
14	Gabriel Bortoleto	Sauber
15	Oliver Bearman	Haas
16	Franco Colapinto	Alpine
17	Liam Lawson	Racing Bulls
18	Yuki Tsunoda Red Bull Racing
19	Esteban Ocon	Haas
20	Carlos Sainz	Williams
`
  },
    {
    title: "Norris Leads the Pack in Brazil FP1",
    date: "2025-11-07",
    image: "https://static.independent.co.uk/2024/04/19/11/07-7b3ad5286d2e4ba29111ed28424e0801.jpg",
    text: `McLaren’s Lando Norris stamped his authority at Interlagos by setting the fastest time in the 2025 Formula 1 São Paulo Grand Prix FP1 session. In a single hour of practice, Norris showed blistering pace, edging out his teammate Oscar Piastri to secure a McLaren 1–2. The session highlighted McLaren’s strength on the technical Autódromo José Carlos Pace circuit, while rivals scrambled to keep up.

🌍 Full FP1 Report
The lone practice session in Brazil was a crucial opportunity for teams to fine-tune their setups ahead of sprint qualifying. Norris looked confident from the start, consistently topping the timesheets. Piastri followed closely, proving McLaren’s balance and speed are well-suited to the high-speed corners and elevation changes of Interlagos.

Behind them, Nico Hulkenberg surprised many by pushing his Sauber into third, reminding fans of his past pole position at the same venue back in 2010. Fernando Alonso kept Aston Martin in the mix with a strong fourth, while Brazilian rookie Gabriel Bortoleto delighted home fans by securing fifth in his Sauber.

Mercedes showed flashes of competitiveness with George Russell and Andrea Kimi Antonelli inside the top 10, while Racing Bulls’ youngsters Isack Hadjar and Liam Lawson demonstrated promise. Williams, Haas, and Alpine filled the midfield, with Ferrari notably absent from the sharp end of the timesheets, raising questions about their pace heading into the weekend.

📋 FP1 Classification (Brazil GP 2025)
Here’s the full list from 1st to 20th:

Position	Driver	Team
1	Lando Norris	McLaren
2	Oscar Piastri	McLaren
3	Nico Hulkenberg	Sauber
4	Fernando Alonso	Aston Martin
5	Gabriel Bortoleto	Sauber
6	George Russell	Mercedes
7	Pierre Gasly	Alpine
8	Carlos Sainz	Williams
9	Isack Hadjar	Racing Bulls
10	Andrea Kimi Antonelli	Mercedes
11	Liam Lawson	Racing Bulls
12	Alex Albon	Williams
13	Esteban Ocon	Haas
14	Oliver Bearman	Haas
15	Lance Stroll	Aston Martin
16	Franco Colapinto	Alpine
17	Max Verstappen	Red Bull Racing
18	Charles Leclerc	Ferrari
19	Lewis Hamilton	Ferrari
20	Yuki Tsunoda	Red Bull Racing
`
  },
    {
    title: "Franco Colapinto Secures Alpine Seat for 2026 Formula 1 Season",
    date: "2025-11-07",
    image: "https://cdn1.f1oversteer.com/uploads/37/2025/09/GettyImages-2232436876-1024x683.jpg",
    text: `Franco Colapinto, the young Argentine talent, will continue his journey in Formula 1 with Alpine, as the team confirmed he will drive alongside Pierre Gasly in the 2026 season. Despite a challenging debut year in 2025, Alpine has shown faith in Colapinto’s potential, securing him as part of their long-term project.

A Rising Star with a Rocky Start
Colapinto first entered Formula 1 in 2024 with Williams, stepping in mid-season and impressing with flashes of speed and composure. His move to Alpine in 2025 came after replacing Jack Doohan just six races into the campaign. While his early performances were inconsistent—marked by errors and a lack of points—he gradually improved, finishing ahead of teammate Gasly in several racesSky Sports.

Alpine’s Strategy for Stability
Alpine’s decision to retain Colapinto reflects their desire for continuity and stability. Executive advisor Flavio Briatore emphasized that Colapinto has the attributes to grow with the team, noting his resilience and ability to adapt under pressure. Gasly, meanwhile, has already committed to Alpine until 2028, meaning the team now has a clear driver pairing for the medium termFormula 1.

Fan Connection and Regional Impact
Colapinto’s presence is particularly significant for South American fans. With the Brazilian Grand Prix being the only F1 race in the region, Alpine’s announcement ahead of the São Paulo weekend was symbolic, drawing strong support from Argentine fans who see Colapinto as their new motorsport ambassador.

Looking Ahead to 2026
The 2026 season will mark Colapinto’s first full campaign from start to finish. Alpine hopes that with a year of experience under his belt, he can convert consistency into points and help push the team up the constructors’ standings. For Colapinto, it’s a chance to prove he belongs among the elite, and for Alpine, it’s a bet on youthful promise over immediate results.
`
  },
  {
    title: "High Stakes Friday: Free Practice and Sprint Qualifying at Interlagos",
    date: "2025-11-07",
    image: "https://imageio.forbes.com/specials-images/imageserve/676bcfdc7dd83c5a85dd3946/F1-Grand-Prix-of-Brazil/960x0.jpg?format=jpg&width=960",
    text: `The Formula 1 circus has arrived in Brazil for the 2025 São Paulo Grand Prix, and Friday’s schedule is packed with action. Drivers will first take to the track for Free Practice 1 (FP1), a crucial session to fine-tune setups and gather data on tire performance at the demanding Autódromo José Carlos Pace. Later in the day, the spotlight shifts to Sprint Qualifying, where the grid for Saturday’s Sprint race will be decided.

Why Today Matters
Championship Battle: Lando Norris leads the standings by just one point over his McLaren teammate Oscar Piastri, while Max Verstappen lurks 36 points behind. Every lap today could influence the destiny of the title.

Sprint Format: The Sprint weekend offers 33 points in total, with 8 points available to the Sprint winner. That makes Sprint Qualifying especially critical, as it determines who gets the best shot at those valuable points.

Track Challenges: Interlagos is famous for its undulating layout, unpredictable weather, and passionate fans. Teams must balance aggressive setups for qualifying with durability for the race.

What to Watch
McLaren Showdown: Norris and Piastri are locked in a tense intra-team duel. Norris arrives with momentum after his dominant win in Mexico, but Piastri has consistently shown pace in Sprint sessions.

Verstappen’s Push: The Red Bull star knows that a double victory in Brazil could reignite his title hopes. Sprint Qualifying is his first chance to strike back.

Ferrari & Mercedes: Charles Leclerc and George Russell will be looking to disrupt the McLaren-Red Bull battle, especially with Ferrari showing strong pace in recent rounds.

Schedule Highlights
Friday, November 7: FP1 followed by Sprint Qualifying

Saturday, November 8: Sprint Race and traditional Qualifying

Sunday, November 9: São Paulo Grand Prix
`
  },
      {
    title: "Gabriel Bortoleto Set for Emotional First Home Grand Prix at Interlagos",
    date: "2025-11-05",
    image: "https://cdn-4.motorsport.com/images/amp/2GzXW3o0/s1000/gabriel-bortoleto-sauber.jpg",
    text: `The São Paulo Grand Prix this weekend will mark a historic and emotional milestone for Gabriel Bortoleto, as the 21-year-old rookie prepares to race in front of his home crowd for the very first time in Formula 1.

A Long-Awaited Return for Brazil
Brazilian fans have waited nearly a decade to cheer for one of their own at Interlagos. The last time a Brazilian driver competed at home was Felipe Massa in 2017, and now Bortoleto carries the hopes of a nation that has produced legends like Ayrton Senna, Nelson Piquet, and Emerson Fittipaldi. His debut at Interlagos is not just another race—it’s a symbolic moment for Brazilian motorsport, reconnecting the passionate São Paulo crowd with a homegrown talent.

The Dream Becomes Reality
Bortoleto, who grew up in São Paulo, described the experience as “unreal” and a dream come true. He has impressed in his rookie season with Sauber, most recently scoring points at the Mexican Grand Prix after a strong comeback drive. Now, he arrives at Interlagos with momentum and confidence, aiming to deliver another points finish in front of family, friends, and thousands of fans.

Sauber’s Hopes and the Interlagos Factor
Sauber team principal Jonathan Wheatley has expressed optimism that the unpredictable conditions at Interlagos could play into the team’s hands. With rain and thunderstorms forecast for the weekend, strategy and adaptability may prove decisive. Wheatley noted that the Brazilian fans create one of the most passionate atmospheres in the sport, something that could give Bortoleto an extra boost.

Carrying the Weight of Expectation
While the excitement is immense, Bortoleto has been careful to keep his focus on the track. He acknowledged that his schedule will be busier than usual with media and fan commitments, but emphasized that his priority is to perform at the highest level. For him, this race is not only about emotion but also about proving himself as a consistent points scorer in his debut season.

A Nation Behind Him
The Interlagos circuit has always been a cauldron of noise and passion, and this weekend will be no different. With the grandstands filled with Brazilian flags and chants, Bortoleto will feel the weight of expectation—but also the power of support. For a country that has longed for a new hero on the grid, his first home race is more than just a sporting event; it’s a celebration of Brazil’s enduring love affair with Formula 1.
`
  },
   {
    title: "Ferrari Eyes Russell as Hamilton Exit Looms, While Mercedes Plots Verstappen Coup for 2027",
    date: "2025-11-04",
    image: "https://cdn4.premiumread.com/?url=https://gulf-times.com/gulftimes/uploads/images/2024/03/01/147704.JPG&w=500&q=100&f=webp",
    text: `he Formula 1 driver market is already heating up for 2027, with seismic shifts on the horizon that could reshape the grid’s balance of power.

Ferrari have reportedly decided not to renew Lewis Hamilton’s contract beyond 2026, leaving the seven-time world champion without a seat at Maranello for 2027. Hamilton’s dream move to Ferrari has so far failed to deliver the results he envisioned, and the Scuderia appear ready to look elsewhere.

That decision opens the door for George Russell, who has been strongly linked with a move to Ferrari. Russell’s current deal with Mercedes runs through 2026, but uncertainty about his long-term role—especially with Mercedes’ pursuit of Max Verstappen—has fueled speculation that he could be tempted by Ferrari. Italian media have suggested that Ferrari view Russell as a natural fit: young, ambitious, and already proven as a team leader.

Meanwhile, Charles Leclerc’s future at Ferrari is far from secure. Despite being contracted until 2029, reports indicate that Leclerc is weighing his options if Ferrari cannot provide a car capable of fighting consistently for championships. After years of frustration with strategy errors and underperforming machinery, the Monegasque star may decide that his best chance at a title lies elsewhere. Should Leclerc walk away, Ferrari could find themselves in need of a complete reset—making Russell’s arrival even more crucial.

On the other side of the paddock, Mercedes are intensifying their efforts to lure Max Verstappen for 2027. Team boss Toto Wolff has long admired the Dutchman, and with Hamilton gone and Russell’s future uncertain, Verstappen represents the ultimate prize. Rumors of behind-the-scenes talks between Wolff and Verstappen have already surfaced, with Mercedes hoping to capitalize on any instability at Red Bull. Despite Verstappen’s contract running until 2028, the combination of new regulations in 2026 and Red Bull’s internal challenges could make a switch possible.

If these moves materialize, the 2027 grid could see Russell in red at Ferrari and Verstappen in silver at Mercedes—a dramatic reshuffle that would reignite one of Formula 1’s greatest rivalries. Ferrari would gain a driver eager to prove himself as a world champion, while Mercedes would secure the sport’s most dominant force of the past decade.

The next two seasons will be pivotal. Ferrari must prove they can deliver a title-contending car to keep Leclerc, while Mercedes must show Verstappen that Brackley is the place to win under the new rules. One thing is certain: the 2027 driver market promises fireworks, and the sport may be on the verge of another era-defining rivalry.
`
  },
     {
    title: "Drivers Speak Out Ahead of the 2025 Brazilian Grand Prix: Tension, Optimism, and Championship Drama",
    date: "2025-11-03",
    image: "https://www.total-motorsport.com/wp-content/uploads/2025/03/SI202503160090-scaled.jpg",
    text: `The Formula 1 circus has arrived in São Paulo for the 2025 Brazilian Grand Prix, and with just four races left in the season, the atmosphere in the paddock is electric. Drivers sat down with the media ahead of the weekend, offering insights into their mindset, strategies, and expectations as the championship battle reaches a fever pitch.

🏆 Championship Contenders on Edge
Lando Norris, who leads the standings by a single point over Oscar Piastri, admitted the pressure is unlike anything he has experienced before. “It’s been a rollercoaster season. Every race feels like a final now, and Interlagos is always unpredictable. I just need to stay calm and execute.”

Oscar Piastri, chasing his McLaren teammate, struck a confident tone: “I’ve been building momentum, and I feel good about my pace here. The key will be qualifying well and staying out of trouble in the sprint.”

Max Verstappen, 36 points adrift but still mathematically in contention, reminded everyone not to count him out: “We’ve been closing the gap. Interlagos has given me great memories, and I’ll give everything to keep the fight alive.”

🔧 Midfield Voices: Fighting for Pride and Points
Charles Leclerc emphasized Ferrari’s determination to finish the season strong: “We’ve had ups and downs, but Brazil is always special. The fans bring so much energy, and I want to give them a good show.”

George Russell highlighted Mercedes’ progress: “We’ve been improving steadily. If the weather plays its usual tricks here, we could be in the mix for a podium.”

Fernando Alonso, ever the veteran, reflected on the bigger picture: “Interlagos is a driver’s circuit. You need courage, precision, and a bit of luck. I still love the challenge.”

🌧️ Weather and Strategy Concerns
Interlagos is notorious for its unpredictable weather, and drivers were quick to acknowledge it. Norris joked, “I’ve packed for all four seasons,” while Verstappen noted that “rain here can turn the race upside down in minutes.” Teams are preparing multiple strategies, knowing that tire choices could decide the outcome.

🇧🇷 The Brazilian Spirit
Local fans are expected to pack the stands, creating one of the most passionate atmospheres on the calendar. Several drivers praised the energy:

Piastri: “The crowd here is insane—in the best way. You feel their passion from the moment you leave the hotel.”

Leclerc: “It’s like racing in a football stadium. The noise, the flags, the chants—it’s unforgettable.”

🔮 What’s at Stake
With just four races left, the Brazilian GP could prove decisive. A win for Norris or Piastri could tilt the title fight dramatically, while a Verstappen victory would keep the three-way battle alive heading into the final stretch.`
  },
      {
    title: "Brazilian Grand Prix 2025: Interlagos Set for High Drama in Sprint Weekend",
    date: "2025-11-03",
    image: "https://media.formula1.com/image/upload/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Brazil.jpg",
    text: `The Formula 1 circus heads to São Paulo this week for the Brazilian Grand Prix at Interlagos, one of the most iconic and unpredictable races on the calendar. With a Sprint format in play and the championship battle heating up, fans can expect a weekend full of strategy gambles, overtakes, and potential surprises.

🔥 The Top Teams: Who Holds the Edge?
McLaren (Lando Norris & Oscar Piastri) McLaren arrives in Brazil with momentum after Norris’ recent win in Mexico. Their car has shown strong adaptability on medium-downforce circuits, and Interlagos—with its mix of fast straights and twisty infield—could suit them well. Norris, now a title contender, will be eager to maximize points in both the Sprint and the main race.

Red Bull (Max Verstappen & Sergio Pérez) Verstappen has a strong record at Interlagos, including victory in 2024. The RB21’s efficiency on straights and stability in high-speed corners should make Red Bull a favorite again. However, tire degradation has been a weakness in recent races, and Interlagos’ abrasive surface could expose that.

Ferrari (Charles Leclerc & Carlos Sainz) Ferrari’s one-lap pace has been excellent, but race-day tire wear remains a concern. Interlagos often punishes poor tire management, so while Leclerc could shine in qualifying, Ferrari will need a clever strategy to stay in the fight for the podium.

Mercedes (Lewis Hamilton & George Russell) Interlagos has historically been a happy hunting ground for Hamilton, who famously won here in 2021. Mercedes’ form has been inconsistent this season, but if cooler conditions prevail, their car could be more competitive than expected.

⚡ The Challengers: Who Could Spring a Surprise?
Aston Martin (Fernando Alonso & Lance Stroll) Alonso thrives on technical circuits, and Interlagos’ elevation changes and tricky corners could play to his strengths. Expect him to be a dark horse for a top-five finish.

Alpine (Esteban Ocon & Pierre Gasly) Alpine shocked many with podiums in 2024 at this very track. While repeating that feat may be difficult, their car’s balance in mixed conditions could make them opportunistic if rain hits.

Williams & Haas Both teams will be looking to capitalize on the Sprint format. Williams’ straight-line speed could help in overtaking battles, while Haas may struggle with tire wear but could sneak into points if chaos unfolds.

🌦️ Weather and Strategy Factors
Unpredictable Weather: Interlagos is notorious for sudden rain showers. A wet race could completely shuffle the order, favoring drivers with strong car control like Verstappen, Hamilton, and Alonso.

Sprint Format: With Sprint Qualifying on Friday, Sprint on Saturday, and the Grand Prix on Sunday, teams will have limited practice time to perfect setups. This could benefit squads with naturally well-balanced cars, like McLaren and Red Bull.

Tire Management: The 71-lap race on the 4.309 km circuit is tough on tires. Expect at least a two-stop strategy, with undercuts playing a key role.
`
  },
{
    title: "Midfield Madness: Four Teams Split by Just 12 Points in Constructors’ Battle",
    date: "2025-11-02",
    image: "https://media.formula1.com/image/upload/t_16by9South/c_lfill,w_3392/q_auto/v1740000000/trackside-images/2025/F1_Grand_Prix_of_Bahrain/2210069665.webp",
    text: `he spotlight in Formula 1 often shines on the title fight at the front, but the real drama this season is unfolding in the midfield. With just a handful of races left in 2025, Racing Bulls, Aston Martin, Haas, and Sauber are locked in a fierce scrap for sixth place in the Constructors’ Championship—and only 12 points separate all four teams.

⚔️ The Current Standings (Behind the Top 4)
5th – Williams: 111 points (clear of the chaos, thanks to Carlos Sainz’s podium in Baku)

6th – Racing Bulls: 72 points

7th – Aston Martin: 69 points

8th – Haas: 62 points

9th – Sauber: 60 points

10th – Alpine: 20 points

🌍 Why It Matters
Prize Money & Prestige: Every position in the Constructors’ table is worth millions in prize money. For midfield outfits, finishing 6th instead of 9th can mean the difference between a major upgrade program next year—or falling further behind.

Driver Futures: Strong results in this battle could secure contracts for drivers under pressure. Haas’s Kevin Magnussen and Sauber’s Valtteri Bottas, for example, are racing not just for points but for their careers.

Momentum into 2026: With sweeping regulation changes looming, teams that finish higher gain both financial and psychological momentum heading into the new era.

🔑 The Storylines to Watch
Racing Bulls’ Consistency: Yuki Tsunoda has been quietly racking up points, keeping RB just ahead in this knife-edge fight.

Aston Martin’s Struggles: After starting the season strong, Aston has slipped back, but Fernando Alonso’s experience could be decisive in the final rounds.

Haas’s Surprise Pace: The American team has shown flashes of brilliance, especially in qualifying, but race-day tire management remains their Achilles’ heel.

Sauber’s Dark Horse Potential: With both drivers scoring recently, Sauber is the team most likely to upset the order if they can string together a double-points finish.
`
  },
      {
    title: "Alpine and Aston Martin Eye Breakthrough as 2026 F1 Era Approaches",
    date: "2025-11-02",
    image: "https://cdn-images.motor.es/image/m/1320w/fotos-noticias/2025/04/alonso-fija-alpine-f1ejemplo-seguir-aston-martin-2025107650-1744349203_1.jpg",
    text: `The Formula 1 spotlight often shines on the sport’s biggest names, but two ambitious teams—Alpine and Aston Martin—are quietly preparing to shake up the grid as the 2026 regulation changes draw near. Both squads see the upcoming overhaul as their best chance in years to break into the front-running pack.

🔵 Alpine’s Long-Term Gamble
Alpine has doubled down on its French identity, with Renault’s power unit program at the heart of its strategy.

Despite a turbulent 2025 season, the team has secured Franco Colapinto for the future, signaling faith in young talent.

Insiders suggest Alpine is experimenting with lightweight chassis concepts to maximize efficiency under the new hybrid rules.

The team’s leadership insists that 2026 will be the year Alpine finally transitions from midfield regulars to podium contenders.

🟢 Aston Martin’s Veteran Edge
Aston Martin continues to build around Fernando Alonso, who remains central to the team’s development despite his age.

The Silverstone-based outfit has invested heavily in its new factory and wind tunnel, aiming to rival the infrastructure of the top teams.

With Lance Stroll’s future uncertain, speculation is mounting that Aston Martin could bring in a rising star to partner Alonso in 2026.

The team’s focus on aerodynamic efficiency could pay off under the new active aero rules, potentially giving them a competitive edge.

🌍 The Wider Grid Picture
Williams is also making quiet progress, with whispers of a bold recruitment drive to strengthen its technical department.

Sauber (soon to become Audi) is preparing for its full factory entry, with Audi’s resources expected to transform the team into a serious challenger.

The midfield battle is shaping up to be the most unpredictable in years, with several teams capable of springing surprises.

⚡ Why This Matters
The 2026 regulations are designed to reset the competitive order, and while the headlines often focus on Red Bull, Mercedes, Ferrari, and McLaren, the real intrigue may come from the next tier of teams. Alpine, Aston Martin, Williams, and Audi-backed Sauber all see this as their golden opportunity to disrupt the status quo.
`
  },
   {
    title: "Mercedes Poised for Formula 1 Dominance as 2026 Rule Changes Shake the Grid",
    date: "2025-11-01",
    image: "https://images.ctfassets.net/1fvlg6xqnm65/26vPSAKk780vphDZdGWcrL/ede13dc23ee9d9842bdd20eb6bbb1b73/Barcelona-Testing-2026.jpg?w=1920&q=75&fm=webp",
    text: `⚡ The 2026 Revolution
The upcoming season will introduce radical new power units that are expected to be 50% battery-powered, running on fully sustainable fuels. Cars will also be lighter, smaller, and equipped with active aerodynamics, allowing for more overtaking opportunities and closer racing. These changes are designed not only to make the sport greener but also to level the playing field between teams.

🏎 Mercedes in the Spotlight
Mercedes, who dominated the hybrid era from 2014 to 2020, are once again tipped as the favorites for the new regulations. According to George Russell, only one rival team would refuse to swap cars with Mercedes heading into 2026. The Silver Arrows’ engineering strength, particularly in internal combustion efficiency, could give them a decisive edge.

🔥 The Driver Market Drama
While the technical shake-up dominates headlines, the driver market is equally turbulent. Red Bull’s future lineup remains uncertain, with Yuki Tsunoda linked to a potential move to IndyCar, leaving Liam Lawson and rising star Arvid Lindblad in contention for coveted seats. Meanwhile, Ferrari and Alpine are juggling their own young talents, setting the stage for one of the most unpredictable grids in years.

🔒 Off-Track Turmoil
Formula 1 has also faced challenges away from the circuit. A recent cybersecurity breach exposed passport and license details of every driver on the grid, highlighting vulnerabilities even in one of the world’s most technologically advanced sports. While the FIA has since patched the flaw, the incident underscores the growing importance of digital security in global motorsport.

🌍 What It Means for Fans
For fans, the 2026 season promises a blend of nostalgia and innovation. The return of smaller, more agile cars recalls the sport’s golden eras, while the push toward sustainability reflects F1’s commitment to the future. With rivalries intensifying and uncertainty in the driver market, the next chapter of Formula 1 could be one of its most thrilling yet.
`
  },
  {
    title: "George Russell Slams Stewards’ Decisions After Chaotic Mexican GP",
    date: "2025-10-31",
    image: "https://media.formula1.com/image/upload/t_16by9North/c_lfill,w_3392/q_auto/v1740000000/trackside-images/2024/Formula_1_Testing_in_Abu_Dhabi/2189166681.webp",
    text: `In the aftermath of a dramatic Mexican Grand Prix at the Autódromo Hermanos Rodríguez, Mercedes driver George Russell voiced strong frustration over what he described as inconsistent and unfair stewarding decisions. The Briton, who finished a disappointing seventh, was particularly angered by the lack of penalties for rivals who cut the opening corners on lap one, while his teammate Lewis Hamilton was later handed a 10-second penalty for a similar infringement.

Russell branded the opening sequence of the race as “lawnmower racing,” pointing out that Max Verstappen and Charles Leclerc both went off track at Turn 1 without consequence. “I struggle to understand how three drivers can just cut the first corner and carry on as if nothing happened,” he said over team radio, later repeating his criticism in post-race interviews.

The Mercedes driver’s frustration was compounded by a tense exchange with his race engineer, as he was asked to manage tyres behind teammate Andrea Kimi Antonelli while being pressured by McLaren’s Oscar Piastri. Russell snapped back, highlighting that he was already under attack and felt “hung out to dry” in the strategy calls.

Adding to the controversy, Russell also questioned the FIA’s handling of penalties, noting the disparity between Hamilton’s punishment and Verstappen’s escape. “It just doesn’t make sense,” he argued. “We need consistency. Fans and drivers deserve clarity on what’s allowed and what isn’t”.

The race itself was dominated by Lando Norris, who stormed to victory and seized the lead of the Drivers’ Championship, while Russell and Mercedes were left licking their wounds after another difficult weekend.

With the season entering its final stretch, Russell’s comments have reignited debate over track limits, corner-cutting rules, and stewarding consistency—issues that have plagued Formula 1 throughout 2025. For Mercedes, the focus now shifts to Brazil, but Russell’s words will continue to echo as the FIA faces mounting pressure to address the growing discontent among drivers.
`
  },
  {
    title: "Fernando Alonso: The Relentless Warrior Who Refuses to Surrender",
    date: "2025-10-30",
    image: "https://e0.365dm.com/23/05/1600x900/skysports-f1-fernando-alonso_6160775.jpg?20230519165637",
    text: `In the high-octane world of Formula 1, where milliseconds define legacies, Fernando Alonso continues to embody the spirit of a true warrior. At 44 years old, the two-time world champion has faced setbacks that would have broken the resolve of many drivers—mechanical failures, crashes, and seasons without a competitive car. Yet, Alonso’s story is not one of defeat, but of unyielding determination and resilience.

From his early days in Oviedo to his current chapter with Aston Martin, Alonso has built a reputation as a driver who never bows to circumstance. Even in races where victory seems out of reach, he fights for every position, every lap, and every point. As he once declared, he wants to be remembered “as a fighter, as a man that never gives up”.

The 2025 season has tested him more than most. With two DNFs and a string of disappointing results, Alonso could have chosen to fade quietly into the background. Instead, he has doubled down on his commitment, vowing to “fight for small victories” even when the bigger prize appears distant. This mindset has not only inspired fans but also earned admiration from rivals. Max Verstappen himself recently praised Alonso’s spirit, noting that “he doesn’t have a car to win the championship, but he never gives up”.

Alonso’s resilience is more than just a personal trait—it’s a philosophy that resonates across the sport. His relentless pursuit of excellence, regardless of the odds, has made him a symbol of perseverance. For younger drivers, he is proof that greatness is not only measured in titles but in the refusal to surrender when the world expects you to.

As the Formula 1 circus looks ahead to another season, one thing is certain: Fernando Alonso will continue to fight, lap after lap, race after race. He may not always stand on the top step of the podium, but in the eyes of fans and competitors alike, he has already secured his place as one of the sport’s most enduring warriors.`
  },
  {
    title: "Cadillac’s Formula 1 Entry: What to Expect in 2026",
    date: "2025-10-30",
    image: "https://media.formula1.com/image/upload/t_16by9Centre/c_lfill,w_3392/q_auto/v1740000000/fom-website/2025/Miscellaneous/684.webp",
    text: `When the lights go out in 2026, Cadillac will officially join the Formula 1 grid, marking one of the most ambitious entries in recent motorsport history. Backed by General Motors and TWG Global, the American luxury brand is preparing to showcase its engineering prowess on the world’s biggest racing stage. But what can fans realistically expect from Cadillac’s debut season?

Aiming for Respect, Not Immediate Victories
Cadillac’s team principal, Graeme Lowdon, has emphasized that the first year will be about execution and credibility rather than instant podiums. The team is determined to avoid overpromising, acknowledging that breaking into F1’s fiercely competitive midfield will take time. Early races are expected to be a learning curve, with the focus on building operational excellence and earning respect from rivals and fans alike.

Driver Line-Up with Experience and Ambition
The team has already secured a strong driver pairing, with Valtteri Bottas and Sergio Pérez set to lead the charge. Both bring years of experience, race wins, and technical feedback skills that will be crucial in guiding Cadillac through its rookie season. Bottas has described the project as one with “limitless potential,” while also stressing the need for patience as the team finds its footing.

Technical Development and Long-Term Vision
Cadillac’s 2026 car will be built under the new F1 regulations, designed to promote closer racing and sustainability. While the team will initially rely on existing power unit partnerships, General Motors is developing its own F1 engine for 2029, signaling a long-term commitment to the sport. This future engine program could transform Cadillac from a newcomer into a serious contender.

Commercial and Cultural Impact
Beyond the track, Cadillac’s entry is expected to boost Formula 1’s presence in the United States, adding another American brand alongside Haas. With its luxury image and motorsport heritage, Cadillac aims to connect with a new generation of fans while reinforcing its global identity. The project is also seen as a strategic move to align the brand with cutting-edge technology and sustainability goals.

The Road Ahead
In 2026, fans should expect Cadillac to start at the back of the grid but steadily climb as experience, data, and development accumulate. The first season will be about laying foundations, but the long-term ambition is clear: Cadillac wants to evolve into a front-running team capable of challenging the established giants of Formula 1.

In short, Cadillac’s arrival won’t rewrite the pecking order overnight—but it will inject fresh energy, American pride, and a bold vision into the sport.`
  },
  {
    title: "Aston Martin’s 2026 Outlook with Adrian Newey",
    date: "2025-10-30",
    image: "https://media.formula1.com/image/upload/t_16by9South/c_lfill,w_3392/q_auto/v1740000000/trackside-images/2024/F1_Grand_Prix_of_Abu_Dhabi___Practice/2188517983.webp",
    text: `🚀 The Newey Factor
Adrian Newey, regarded as the most successful designer in F1 history, joined Aston Martin in 2025 after leaving Red Bull.

He has been described as entering a “design trance” while working on the 2026 car, focusing obsessively on exploiting the new regulations.

Newey himself has said the 2026 rules offer “more flexibility for innovation than first meets the eye”, suggesting Aston Martin could spring surprises with radical aero and packaging solutions.

🔋 Honda Works Partnership
From 2026, Aston Martin becomes the exclusive Honda works team, ending Red Bull’s long-standing partnership with the Japanese manufacturer.

If Honda delivers a competitive hybrid power unit, Aston Martin will have a rare advantage: a fully integrated chassis–engine package designed in tandem with Newey’s aero philosophy.

🏢 Infrastructure & Investment
Lawrence Stroll’s heavy investment has transformed Aston Martin’s Silverstone HQ into one of the most advanced facilities in F1.

A new wind tunnel, expanded design offices, and a recruitment drive (including Enrico Cardile from Ferrari) mean the team now has the resources to match its ambitions.

👥 Driver Line-Up
Fernando Alonso, still performing at a high level, is expected to continue into 2026, motivated by the chance to drive a Newey car again.

Lance Stroll remains a fixture, though the pressure will be on him to deliver results worthy of the machinery.

⚖️ Expectations vs Reality
Optimists believe Aston Martin could challenge for wins immediately if Newey and Honda hit the ground running.

However, even Newey has cautioned against expecting an instant title fight, suggesting 2026 may be more about establishing themselves as consistent podium contenders before mounting a full championship challenge.`
  },
  {
    title: "Who Will Drive for Red Bull Racing and Racing Bulls in 2026?",
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
 ]

// Calendar (2025)
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

// Results scaffold
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
    ],
    fp1: [],
    fp2: [],
    fp3: []
  }
};

/* KEEPING YOUR EXACT FUNCTIONS FOR NEWS, DRIVERS, CONSTRUCTORS */

// Populate news (version that uses <div class="news-media"><img ... /></div> and read-more -> openArticleInNewTab)
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

// Open article in new tab (final robust version from your code)
function openArticleInNewTab(index) {
  const article = newsAfterUSAGP[index];
  const win = window.open("", "_blank");

  const headLinks = Array.from(document.head.querySelectorAll('link[rel="stylesheet"]'))
    .map(link => `<link rel="stylesheet" href="${link.href}">`)
    .join('\n');
  const inlineStyles = Array.from(document.head.querySelectorAll('style'))
    .map(style => `<style>${style.innerHTML}</style>`)
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
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${article.title}</title>
        ${headLinks}
        ${inlineStyles}
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
            img.decode?.().catch(() => {}).finally(() => { img.style.visibility = 'visible'; });
            img.addEventListener('error', () => {
              try {
                const url = new URL(img.src);
                const stripped = url.origin + url.pathname;
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

// Populate drivers (unchanged)
function populateDrivers() {
  const tbody = document.getElementById('driversTable');
  drivers2025
    .filter(d => d.pos <= 20)
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

// Populate constructors (unchanged)
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

/* Supportive UI: nav toggle, countdown, calendar, results (compatible with your data) */

// Navigation toggle (simple)
function bindNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const list = document.getElementById('navMenu');
  if (!toggle || !list) return;
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

// Populate calendar + results controls
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

  const gpSelect = document.getElementById('gpSelect');
  calendar2025.forEach(r => {
    const opt = document.createElement('option');
    opt.value = r.gp;
    opt.textContent = `R${r.round} — ${r.gp}`;
    gpSelect.appendChild(opt);
  });
  gpSelect.value = "USA";
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

// Intersection animations (optional subtle lift on cards)
function observeSections() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.count-card, .news-card, .calendar-card')
    .forEach(el => obs.observe(el));
}

// Initialize everything on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  bindNavToggle();
  startCountdown();
  populateNews();            // kept exactly as requested
  populateDrivers();         // kept exactly as requested
  populateConstructors();    // kept exactly as requested
  populateCalendar();
  bindResults();
  observeSections();
});
// Fade the hero section (the one that shows background words) as you scroll.
// This script is safe for VS Code, with null checks and passive scroll handling.

(function () {
  // Run after DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    const hero = document.querySelector('.hero');

    // If no hero element exists, exit cleanly
    if (!hero) return;

    let heroHeight = hero.offsetHeight;

    // Recompute height on resize to keep logic accurate across device rotations/resizes
    window.addEventListener('resize', function () {
      heroHeight = hero.offsetHeight || window.innerHeight;
    }, { passive: true });

    // Throttle via requestAnimationFrame to avoid layout thrash
    let ticking = false;

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          // If hero is somehow removed, stop
          if (!heroHeight || !hero) return;

          const scrollY = window.scrollY || window.pageYOffset || 0;
          const opacity = Math.max(0, 1 - scrollY / heroHeight);

          // Only set inline style when needed
          hero.style.opacity = String(opacity);

          ticking = false;
        });
        ticking = true;
      }
    }

    // Initialize once
    onScroll();

    // Use passive listener for better performance
    window.addEventListener('scroll', onScroll, { passive: true });
  });
})();
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const sections = document.querySelectorAll('#countdown, #news, #drivers, #constructors, #calendar');

  function updateOffsets() {
    const h = header ? header.offsetHeight : 0;
    sections.forEach(sec => {
      sec.style.scrollMarginTop = h + 'px';
    });
  }

  updateOffsets();
  window.addEventListener('resize', updateOffsets);
});

// Fix mobile 100vh issue
function setVh() {
  document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
}
window.addEventListener('resize', setVh);
setVh();
document.addEventListener('DOMContentLoaded', () => {
  const spline = document.querySelector('.spline-bg');
  if (spline) {
    spline.addEventListener('error', () => {
      spline.style.display = 'none';
      document.body.style.background = "url('fallback.jpg') center/cover no-repeat";
    });
  }
});
const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('navMenu');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}
function setVh() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVh();
window.addEventListener('resize', setVh);
document.addEventListener("DOMContentLoaded", () => {
  const logo = document.querySelector(".logo-img");
  if (logo) {
    // Apply filter to knock out white background
    logo.style.filter = "drop-shadow(0 0 8px #000000ff) brightness(1.1) contrast(1.2)";
  }
});
document.addEventListener('scroll', () => {
  const logo = document.querySelector('.logo-img');
  if (!logo) return;

  if (window.scrollY > 50) {
    logo.style.width = '80px';
  } else {
    logo.style.width = '120px';
  }
});
