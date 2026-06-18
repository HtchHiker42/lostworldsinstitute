// ROBBIE — the LWI rubber duck
(function () {
  var words = [
    {word:"Nippe",meaning:"Water",language:"Wampanoag"},
    {word:"Cone",meaning:"Sun",language:"Wampanoag"},
    {word:"Appause",meaning:"Moon",language:"Wampanoag"},
    {word:"Aunum",meaning:"Dog",language:"Wampanoag"},
    {word:"Nitka",meaning:"Mother",language:"Wampanoag"},
    {word:"Wigwam",meaning:"House",language:"Wampanoag"},
    {word:"Mishoon",meaning:"Dugout canoe",language:"Wampanoag"},
    {word:"Grian",meaning:"Sun",language:"Manx"},
    {word:"Eayst",meaning:"Moon",language:"Manx"},
    {word:"Ushtey",meaning:"Water",language:"Manx"},
    {word:"Moddey",meaning:"Dog",language:"Manx"},
    {word:"Moir",meaning:"Mother",language:"Manx"},
    {word:"Ayr",meaning:"Father",language:"Manx"},
    {word:"Oie",meaning:"Night",language:"Manx"},
    {word:"Laa",meaning:"Day",language:"Manx"},
    {word:"Billey",meaning:"Tree",language:"Manx"},
    {word:"Rollage",meaning:"Star",language:"Manx"},
    {word:"Traa dy liooar",meaning:"Time enough",language:"Manx"},
    {word:"Karli",meaning:"Boomerang",language:"Warlpiri"},
    {word:"Ngurra",meaning:"Home / camp",language:"Warlpiri"},
    {word:"Yapa",meaning:"Person",language:"Warlpiri"},
    {word:"Jukurrpa",meaning:"The Dreaming (spiritual worldview)",language:"Warlpiri"},
    {word:"Yarla",meaning:"Yam (bush food)",language:"Warlpiri"},
    {word:"Jarntu",meaning:"Dog",language:"Warlpiri"},
    {word:"Rdaka",meaning:"Hand / finger",language:"Warlpiri"},
    {word:"Parnka",meaning:"To run",language:"Warlpiri"},
    {word:"Taa",meaning:"Human being / person",language:"Taa"},
    {word:"Ƃaan",meaning:"Language / speech",language:"Taa"},
    {word:"n!ain",meaning:"To shine",language:"Taa"},
    {word:"siƂqhann",meaning:"Moon",language:"Taa"},
    {word:"ǃoqm",meaning:"Full",language:"Taa"},
    {word:"ṭʰəʼət",meaning:"Rattlesnake",language:"Wukchumni"},
    {word:"Che'ihmyat",meaning:"Traditional personal name (given name)",language:"Wukchumni"},
    {word:"Wukchumni",meaning:"The people of this place (tribal name)",language:"Wukchumni"}
  ];

  var lastIdx = -1;
  var audioCtx = null;
  var hideTimer = null;

  function getRandomWord() {
    var idx;
    do { idx = Math.floor(Math.random() * words.length); } while (idx === lastIdx && words.length > 1);
    lastIdx = idx;
    return words[idx];
  }

  function quack() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      var ctx = audioCtx;
      var t = ctx.currentTime;

      // Main quack oscillator
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      var filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(380, t);
      osc.frequency.exponentialRampToValueAtTime(220, t + 0.08);
      osc.frequency.exponentialRampToValueAtTime(310, t + 0.18);
      osc.frequency.exponentialRampToValueAtTime(180, t + 0.30);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(700, t);
      filter.Q.setValueAtTime(3, t);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.35, t + 0.015);
      gain.gain.setValueAtTime(0.35, t + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.38);
    } catch (e) { /* silent fail if audio blocked */ }
  }

  function showCard(duck) {
    var card = document.getElementById('robbie-card');
    var wordEl = document.getElementById('robbie-word');
    var langEl = document.getElementById('robbie-lang');
    var meaningEl = document.getElementById('robbie-meaning');
    if (!card) return;

    var entry = getRandomWord();
    langEl.textContent = entry.language;
    wordEl.textContent = entry.word;
    meaningEl.textContent = entry.meaning;

    card.classList.remove('visible');
    // force reflow for re-animation
    void card.offsetWidth;
    card.classList.add('visible');

    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(function () {
      card.classList.remove('visible');
    }, 5000);
  }

  function initRobbie() {
    var duck = document.getElementById('robbie-duck');
    if (!duck) return;

    duck.addEventListener('click', function () {
      quack();
      showCard(duck);
      duck.classList.remove('bounce');
      void duck.offsetWidth;
      duck.classList.add('bounce');
    });

    duck.addEventListener('animationend', function () {
      duck.classList.remove('bounce');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRobbie);
  } else {
    initRobbie();
  }
})();
