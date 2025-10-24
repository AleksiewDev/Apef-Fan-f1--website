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
  name: "Mexico City Grand Prix",
  venue: "Autódromo Hermanos Rodríguez",
  startISO: "2025-10-26T22:00:00+02:00",
  sessions: [
    { key: "fp1", label: "FP1", iso: "2025-10-24T17:30:00+02:00" },
    { key: "fp2", label: "FP2", iso: "2025-10-25T17:30:00+02:00" },
    { key: "fp3", label: "FP3", iso: "2025-10-26T15:00:00+02:00" },
    { key: "qualifying", label: "Qualifying", iso: "2025-10-25T21:00:00+02:00" },
    { key: "race", label: "Race", iso: "2025-10-26T22:00:00+02:00" }
  ]
};

// Drivers 2025 (name, code, team, points, wins, poles, photo)
const drivers2025 = [
  { pos: 1, name: "Oscar Piastri", code: "PIA", nationality: "AUS", team: "McLaren", points: 346, wins: 7, poles: 5, photo: "https://mclaren.bloomreach.io/cdn-cgi/image/format=webp,quality=80/delivery/resources/content/gallery/mclaren-racing/formula-1/2025/nsr/f1-75-live-m/web/2025_oscar_team_pic_02.jpg" },
  { pos: 2, name: "Lando Norris", code: "NOR", nationality: "GBR", team: "McLaren", points: 332, wins: 5, poles: 4, photo: "https://mclaren.bloomreach.io/cdn-cgi/image/format=webp,quality=80/delivery/resources/content/gallery/mclaren-racing/formula-1/2025/nsr/f1-75-live-m/web/2025_lando_team_pic_02.jpg" },
  { pos: 3, name: "Max Verstappen", code: "VER", nationality: "NED", team: "Red Bull Racing", points: 306, wins: 5, poles: 7, photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOmb-f8vwQW9GTmAejEbUu2JeYUlzkscG8vZoaXwnvmzbJjqInaA7aSEAeB6jRrZRFCxA&usqp=CAU" },
  { pos: 4, name: "George Russell", code: "RUS", nationality: "GBR", team: "Mercedes", points: 252, wins: 2, poles: 2, photo: "https://images.ctfassets.net/1fvlg6xqnm65/DF8GKGlCgVkML7jYA3lX8/f98a3b6f3fdaff998fa1ee7cdc1fa5c9/GR-EYNTK-IMAGE-MOBILE.jpg?w=626&q=75&fm=webp" },
  { pos: 5, name: "Charles Leclerc", code: "LEC", nationality: "MON", team: "Ferrari", points: 192, wins: 0, poles: 1, photo: "https://aceracegear.com/wp-content/uploads/2025/02/cl-01-2025.jpg" },
  { pos: 6, name: "Lewis Hamilton", code: "HAM", nationality: "GBR", team: "Ferrari", points: 142, wins: 0, poles: 0, photo: "https://store.ferrari.com/dw/image/v2/BGDG_PRD/on/demandware.static/-/Sites-48/default/dw0196a800/images/zoom/LA06Zf_170_2.png?strip=false" },
  { pos: 7, name: "Kimi Antonelli", code: "ANT", nationality: "ITA", team: "Mercedes", points: 89, wins: 0, poles: 0, photo: "https://i.namu.wiki/i/uoiclYPCB7vPlR53OzLou_H9HJ-qDCPRy-OeMqaavDgvSISa7CySyCKsgzl8A0f_3vOf_eH7v7rBt8gaHb8beg.webp" },
  { pos: 8, name: "Alexander Albon", code: "ALB", nationality: "THA", team: "Williams", points: 73, wins: 0, poles: 0, photo: "https://static.independent.co.uk/2024/02/05/19/e52f9590a04d09ef4bf873e9c5122f2eY29udGVudHNlYXJjaGFwaSwxNzA3MjQ2MzI3-2.75253307.jpg?width=1200&height=1200&fit=crop" },
  { pos: 9, name: "Nico Hülkenberg", code: "HUL", nationality: "GER", team: "Kick Sauber", points: 41, wins: 0, poles: 0, photo: "https://pbs.twimg.com/media/GMrCz6GWEAASYks?format=jpg&name=large" },
  { pos: 10, name: "Isack Hadjar", code: "HAD", nationality: "FRA", team: "Racing Bulls", points: 39, wins: 0, poles: 0, photo: "https://framerusercontent.com/images/R4z6H2nIMtXBpFzkL4qJ2Jny88.jpg?width=3072&height=3840" },
  { pos: 11, name: "Carlos Sainz", code: "SAI", nationality: "ESP", team: "Williams", points: 38, wins: 0, poles: 0, photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_RyGKN7IWY5i31pK8yXLVDcwvjYRS0XLQGufGNCztDziweEHsWkzIomBsjgbi96XzIx8&usqp=CAU" },
  { pos: 12, name: "Fernando Alonso", code: "ALO", nationality: "ESP", team: "Aston Martin", points: 37, wins: 0, poles: 0, photo: "https://aceracegear.com/wp-content/uploads/2025/03/am-fa-2025-1.jpg" },
  { pos: 13, name: "Lance Stroll", code: "STR", nationality: "CAN", team: "Aston Martin", points: 32, wins: 0, poles: 0, photo: "https://aurupteur.com/uploads/brefs/4511/4511_gkeojbrwyaijt58.jpg" },
  { pos: 14, name: "Liam Lawson", code: "LAW", nationality: "NZL", team: "Racing Bulls", points: 30, wins: 0, poles: 0, photo: "https://i.namu.wiki/i/-QcAd3hXRJrSMq9n1bSfMYrnGVDHN2BJ3JLMhGXs1PkMfc3Jyd9A2Gy-ugqDmfQkZgM9BJ22pYbg711lUdV-sw.webp" },
  { pos: 15, name: "Esteban Ocon", code: "OCO", nationality: "FRA", team: "Haas F1 Team", points: 28, wins: 0, poles: 0, photo: "https://i.redd.it/esteban-ocons-helmet-for-the-2025-season-v0-u52c357k3wje1.jpg?width=3277&format=pjpg&auto=webp&s=eb145ca50e5bc3f1154fb9efa9636832904de868" },
  { pos: 16, name: "Yuki Tsunoda", code: "TSU", nationality: "JPN", team: "Red Bull Racing", points: 28, wins: 0, poles: 0, photo: "https://newsgpcdn.vshcdn.net/i/images/1586/yuki-tsunoda-f1-post-season-test-with-red-bull_f.jpg" },
  { pos: 17, name: "Pierre Gasly", code: "GAS", nationality: "FRA", team: "Alpine", points: 20, wins: 0, poles: 0, photo: "https://aceracegear.com/wp-content/uploads/2025/03/alpine-pg-2025-1.jpg" },
  { pos: 18, name: "Oliver Bearman", code: "BEA", nationality: "GBR", team: "Haas F1 Team", points: 20, wins: 0, poles: 0, photo: "https://preview.redd.it/ollie-bearmans-helmet-for-the-2025-season-v0-jhzkvievzoje1.jpg?width=1080&crop=smart&auto=webp&s=26282e9b98b9a85596672ff152d03c332782c82c" },
  { pos: 19, name: "Gabriel Bortoleto", code: "BOR", nationality: "BRA", team: "Kick Sauber", points: 18, wins: 0, poles: 0, photo: "https://pbs.twimg.com/media/GjLwdydW4AATow-.jpg:large" },
  { pos: 20, name: "Franco Colapinto", code: "COL", nationality: "ARG", team: "Alpine", points: 0, wins: 0, poles: 0, photo: "https://instagram.fsof10-1.fna.fbcdn.net/v/t39.30808-6/485158953_122196919394251980_6379425086884951888_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InRocmVhZHMuQ0FST1VTRUxfSVRFTS5pbWFnZV91cmxnZW4uODAyeDEzNzkuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlLmMyIn0&_nc_ht=instagram.fsof10-1.fna.fbcdn.net&_nc_cat=100&_nc_oc=Q6cZ2QFOF63zKGK_M4W2iLOT5UvcCCUq3UJt_8vW4JYd0rtIlNPzxFhv4uTgFWZF5YPjAtk&_nc_ohc=Hh0BVWNvipMQ7kNvwFeLOqS&_nc_gid=CrJ8NA_nvF6OD7xRYaKgmQ&edm=AKr904kAAAAA&ccb=7-5&ig_cache_key=MzU3MjcxMzU3Njk0MDc5MzMzMA%3D%3D.3-ccb7-5&oh=00_Afe_-uUTtgPM9Al8jg6m8JHD4pz83NrDhXI-6WGGMcPTLg&oe=69017193&_nc_sid=23467f" },
  { pos: 21, name: "Jack Doohan", code: "DOO", nationality: "AUS", team: "Alpine", points: 0, wins: 0, poles: 0, photo: "https://preview.redd.it/franco-colapinto-in-alpine-2025-will-be-the-deja-vu-of-v0-mfphwgeotvye1.png?width=1320&format=png&auto=webp&s=c67fd2287c94f2ea96a53595c6616976b0e0af20" }
];

// Constructors 2025
const constructors2025 = [
  { pos: 1, name: "McLaren", points: 678, drivers: ["Oscar Piastri", "Lando Norris"], photo: "https://media.formula1.com/image/upload/t_16by9Centre/c_lfill,w_3392/q_auto/v1740000000/trackside-images/2025/F1_Grand_Prix_of_Netherlands/2233042195.webp",
    facts: [
      "Constructors’ titles: 10",
      "Known for operational excellence and sharp aero",
      "Power unit: Mercedes"
    ],
    tagline: "Relentless precision. Papaya charge.",
    history: `Founded in 1963, McLaren became a titan through the 1970s and 80s with legends like Fittipaldi, Hunt, and Senna. The 1990s featured Senna vs. Prost, then dominant eras with Hakkinen and the Mercedes partnership. After a rebuilding phase post-2015 power shifts, McLaren re-emerged with cutting-edge aero and management alignment, returning to championship contention in 2024–2025 with consistent execution, rapid in-season development, and elite drivers.`
  },
  { pos: 2, name: "Mercedes", points: 341, drivers: ["George Russell", "Kimi Antonelli"], photo: "https://images.ctfassets.net/1fvlg6xqnm65/6SsQDb4D1Ixx99OjHoDtbC/590b2a46b5090221a46fb5ac52279309/F1-2025-IMAGE-2.jpg?w=1920&q=75&fm=webp",
    facts: [
      "Constructors’ titles: 8 (modern hybrid era dominance)",
      "Power unit supplier",
      "Tactical race craft and reliability"
    ],
    tagline: "Method. Margin. Mastery.",
    history: `Mercedes returned as a works team in 2010, dominated the hybrid era from 2014–2020. Post-rule changes, they stabilized with strong operational foundations while integrating next-gen talent. The 2025 campaign blends Russell’s maturity with Antonelli’s debut energy, underpinned by iterative aero and PU efficiency.`
  },
  { pos: 3, name: "Ferrari", points: 334, drivers: ["Charles Leclerc", "Lewis Hamilton"], photo: "https://trf1.net/wp-content/uploads/2025/02/Charles-Leclerc-Ferrari-1-1-e1739960243357.jpeg",
    facts: [
      "Most iconic heritage brand",
      "Drivers’ and Constructors’ multiple titles historically",
      "Strategic volatility improving"
    ],
    tagline: "Spirit of Maranello.",
    history: `Scuderia Ferrari, active since F1’s inception, boasts unmatched legacy. The Leclerc–Hamilton era targets a modern reset of Ferrari’s operational sharpness: consolidating aero coherence, tire management, and strategic resilience while capitalizing on driver synergy and race pace recovery.`
  },
  { pos: 4, name: "Red Bull Racing", points: 331, drivers: ["Max Verstappen", "Yuki Tsunoda"], photo: "https://cdn.racingnews365.com/2025/Verstappen/_1092x683_crop_center-center_85_none/Verstappen-Bahrain-testing.jpg?v=1740576626",
    facts: [
      "Known for aggressive development cycles",
      "Top-tier pit stop and strategy execution",
      "Honda RBPT powertrain"
    ],
    tagline: "Attack. Adapt. Overdeliver.",
    history: `RBR transformed the 2010s with Vettel’s four titles, then ushered in Verstappen’s era. The 2022–2023 ground-effect mastery set benchmarks. In 2025, versatility and upgrades sustain a late-season charge as Tsunoda steps into a bigger role alongside Verstappen’s relentless pace.`
  },
  { pos: 5, name: "Williams", points: 111, drivers: ["Alexander Albon", "Carlos Sainz"], photo: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/2025/Williams/williams-2025-launch-6.webp",
    facts: [
      "Historic champions of the 1990s",
      "Modern resurgence through data-centric ops",
      "Mercedes power"
    ],
    tagline: "Blueprint of a comeback.",
    history: `Williams rose to prominence with active suspension innovations and champion lineups. After lean years, strategic leadership and technical rebuilds have produced a sharp uptick. The 2025 pairing of Albon–Sainz amplifies points consistency and qualifying potency.`
  },
  { pos: 6, name: "Racing Bulls", points: 72, drivers: ["Isack Hadjar", "Liam Lawson"], photo: "https://media.tudorwatch.com/image/upload/v1/tudormag/SI202503140201",
    facts: [
      "Talent incubator for Red Bull system",
      "Agile updates and experimental packages",
      "Honda RBPT support"
    ],
    tagline: "Crafting tomorrow’s pace.",
    history: `Formerly Toro Rosso/AlphaTauri, the Faenza outfit spotlights rising talent. The 2025 season doubles down on grooming future stars, executing bold setups and opportunistic strategies to punch above weight.`
  },
  { pos: 7, name: "Aston Martin", points: 69, drivers: ["Fernando Alonso", "Lance Stroll"], photo: "https://upload.wikimedia.org/wikipedia/commons/3/33/2025_Japan_GP_-_Aston_Martin_-_Fernando_Alonso_-_FP1.jpg",
    facts: [
      "High-investment growth plan",
      "Aerodynamics campus expansion",
      "Mercedes power"
    ],
    tagline: "Green surge.",
    history: `Aston Martin’s modern F1 venture accelerated with major infrastructure and aero hires. With Alonso’s racecraft and Stroll’s continuity, 2025 focuses on consistency and tire behavior stabilization to reclaim podium proximity.`
  },
  { pos: 8, name: "Kick Sauber", points: 59, drivers: ["Nico Hülkenberg", "Gabriel Bortoleto"], photo: "https://upload.wikimedia.org/wikipedia/commons/9/9e/2025_Japan_GP_-_Sauber_-_Nico_Hulkenberg_-_FP1.jpg",
    facts: [
      "Independent backbone with manufacturer phases",
      "Noted for strategic bravery and tire calls",
      "Ferrari power"
    ],
    tagline: "Independent intelligence.",
    history: `Sauber’s journey spans manufacturer partnerships and independent grit. 2025 marks a transition year balancing experienced racecraft (Hülkenberg) with rookie momentum (Bortoleto), targeting Q2-Q3 progression and opportunistic points.`
  },
  { pos: 9, name: "Haas F1 Team", points: 48, drivers: ["Esteban Ocon", "Oliver Bearman"], photo: "https://upload.wikimedia.org/wikipedia/commons/f/f8/FIA_F1_Austria_2025_Nr._87_Bearman.jpg",
    facts: [
      "US-based outfit with lean structure",
      "Ferrari technical ties",
      "Focus on tire preservation"
    ],
    tagline: "American grit.",
    history: `Haas entered F1 in 2016 with a cost-effective model. The 2025 duo blends Ocon’s consistency with Bearman’s emergence. The aim: stabilize race pace across stints and maximize undercut/overcut windows.`
  },
  { pos: 10, name: "Alpine", points: 20, drivers: ["Pierre Gasly", "Franco Colapinto", "Jack Doohan"], photo: "https://upload.wikimedia.org/wikipedia/commons/a/ae/FIA_F1_Austria_2025_Nr._10_Gasly.jpg",
    facts: [
      "Works team lineage from Renault",
      "In-house power unit legacy",
      "Rebuild focus on ops and reliability"
    ],
    tagline: "Factory-perspective resilience.",
    history: `The Enstone-Viry axis has seen title highs (Renault) and modern transitions. 2025 emphasizes operational resets and driver rotation, targeting reliability improvements and foundational aero coherence.`
  }
];

// News after USA GP 2025 (no sources displayed; summaries are descriptive)
const newsAfterUSAGP = [
  {
    title: "Verstappen controls Austin as title fight tightens",
    date: "2025-10-19",
    image: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/2025/United%20States%20(Austin)/Verstappen%20Austin%20celebs.webp",
    text: `From pole to flag, Verstappen’s pace at COTA set the tone, while Norris overcame Leclerc in a fierce duel for P2. With maximum points across the weekend, the gap to the papaya duo narrows, turning the final stretch into a three-way chase marked by tire delta management and late-stint consistency.`
  },
  {
    title: "McLaren balance: managing intra-team tension post–first-lap clashes",
    date: "2025-10-20",
    image: "https://r.testifier.nl/Acbs8526SDKI/resizing_type:fit/width:1280/plain/https://s3-newsifier.ams3.digitaloceanspaces.com/gpblog.com/images/2025-10/piastri-norris-crash-f1-68f3cc5ce208d.jpg@webp",
    text: `The Norris–Piastri dynamic remains intense but disciplined. Post-incident reviews emphasize clarified “race-hard, race-fair” guidance, protecting points haul while preserving both title bids. Expect qualifying execution and start procedures to be the new battleground.`
  },
  {
    title: "Mexico setup notes: altitude, cooling, and drag trade-offs",
    date: "2025-10-23",
    image: "https://cdn.prgloo.com/media/7427b744969f43f5b490b93b3644b64e.jpg?width=580&height=870",
    text: `Teams arrive in Mexico targeting low-drag trims yet mindful of cooling. Brake temps and ERS deployment strategies at altitude shift the energy picture. Watch for trimmed wings, stable braking, and straight-line speed balances defining quali runs.`
  }
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

