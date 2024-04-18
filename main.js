const lerp = (a, b, n) => {
  return (1 - n) * a + n * b;
};

const init = () => {
  const bgLayer1 = document.createElement('div');
  const bgLayer2 = document.createElement('div');
  const bgLayer3 = document.createElement('div');

  bgLayer1.classList.add('bg-layer', 'bg-layer-1');
  bgLayer2.classList.add('bg-layer', 'bg-layer-2');
  bgLayer3.classList.add('bg-layer', 'bg-layer-3');

  document.body.prepend(bgLayer1);
  document.body.prepend(bgLayer2);
  document.body.prepend(bgLayer3);

  const isMobile = window.innerWidth < 768;
  const bgLayerSttartSize = isMobile ? 150 : 50;

  let bgLayer1TargetSize = bgLayerSttartSize;
  bgLayer1.style.backgroundSize = `${bgLayerSttartSize}%`;
  let bgLayer2TargetSize = bgLayerSttartSize; 
  bgLayer2.style.backgroundSize = `${bgLayerSttartSize}%`;
  let bgLayer3TargetSize = bgLayerSttartSize;
  bgLayer3.style.backgroundSize = `${bgLayerSttartSize}%`;

  document.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    bgLayer1TargetSize = bgLayerSttartSize + (scroll / height * 120);
    bgLayer2TargetSize = bgLayerSttartSize + (scroll / height * 200);
    bgLayer3TargetSize = bgLayerSttartSize + (scroll / height * 40);
  });

  const smoothStep = 0.1;
  const updateBg = (currentTime) => { 
    bgLayer1.style.backgroundSize = lerp(
      parseInt(bgLayer1.style.backgroundSize), 
      bgLayer1TargetSize, 
      smoothStep
    ) + '%';

    bgLayer2.style.backgroundSize = lerp(
      parseInt(bgLayer2.style.backgroundSize), 
      bgLayer2TargetSize, 
      smoothStep
    ) + '%';

    bgLayer3.style.backgroundSize = lerp(
      parseInt(bgLayer3.style.backgroundSize), 
      bgLayer3TargetSize, 
      smoothStep
    ) + '%';

    requestAnimationFrame(updateBg);
  }

  requestAnimationFrame(updateBg);
};

document.addEventListener('DOMContentLoaded', () => {
  init();
});
