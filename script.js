// Web Audio setup
const ctx = new (window.AudioContext || window.webkitAudioContext)();

// Core Earth-Synced oscillator (430.65 Hz) always on at full volume
const coreOsc = ctx.createOscillator();
const coreGain = ctx.createGain();
coreOsc.frequency.value = 430.65;
coreGain.gain.value = 1.0;
coreOsc.connect(coreGain).connect(ctx.destination);
coreOsc.start();

// Matter-Bind oscillator (39.15 Hz)
const mbOsc = ctx.createOscillator();
const mbGain = ctx.createGain();
mbOsc.frequency.value = 39.15;
mbGain.gain.value = 0;  // start muted
mbOsc.connect(mbGain).connect(ctx.destination);
mbOsc.start();

// UI elements
const toggle = document.getElementById('matter-toggle');
const slider = document.getElementById('matter-slider');
const valueLabel = document.getElementById('matter-value');

// On toggle
toggle.addEventListener('change', () => {
  const now = ctx.currentTime;
  const target = toggle.checked ? slider.value / 100 : 0;
  mbGain.gain.cancelScheduledValues(now);
  mbGain.gain.linearRampToValueAtTime(target, now + 0.1);
});

// On slider move
slider.addEventListener('input', () => {
  valueLabel.textContent = slider.value + '%';
  if (toggle.checked) {
    const now = ctx.currentTime;
    mbGain.gain.cancelScheduledValues(now);
    mbGain.gain.linearRampToValueAtTime(slider.value / 100, now + 0.1);
  }
});
