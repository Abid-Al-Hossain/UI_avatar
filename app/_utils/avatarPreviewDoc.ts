export const PREVIEW_SRC_DOC = `
<!DOCTYPE html>
<html>
<head>
<style>
  body {
    margin: 0;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: transparent;
    font-family: var(--font-family, sans-serif);
    overflow: hidden;
  }

  .avatar-root {
    position: relative;
    width: var(--size);
    height: var(--size);
    border-radius: var(--radius);
    
    /* Border logic */
    border-width: var(--border-width);
    border-style: var(--border-style);
    border-color: var(--border-color);
    box-sizing: border-box; /* Include border in size */
    
    /* Background (for initials) */
    background-color: var(--initials-bg);
    color: var(--initials-color);
    
    display: flex;
    align-items: center;
    justify-content: center;
    
    /* Text Styles */
    font-family: var(--font-family);
    font-size: var(--font-size);
    font-weight: 600;
    
    opacity: var(--opacity);
    
    /* Shadow */
    /* box-shadow provided by parent style or added here if passed */
    
    /* Transitions */
    transition: all 0.3s ease;
    cursor: default;
    user-select: none;
    
    /* Transform Base */
    transform: var(--base-transform);
  }

  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: var(--object-fit);
    object-position: var(--object-position);
    border-radius: var(--radius); /* Inner radius */
    
    /* Filters */
    filter: var(--filters);
    transition: all 0.3s ease;
  }

  .avatar-initials {
    line-height: 1;
    text-transform: uppercase;
  }

   /* Status Indicator */
  .status-dot {
    position: absolute;
    width: 25%; height: 25%;
    min-width: 12px; min-height: 12px;
    border-radius: 50%;
    background-color: var(--status-color);
    border: 2px solid white;
    box-sizing: border-box;
    z-index: 10;
    display: none; 
    
    /* Flex for badge text */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 700;
    color: white;
    line-height: 1;
  }
  
  .status-dot.badge {
    width: auto;
    height: auto;
    padding: 2px 5px;
    min-width: 18px;
    min-height: 18px;
    border-radius: 999px;
  }
  
  /* Status Positions */
  .pos-top-left { top: -2px; left: -2px; }
  .pos-top-right { top: -2px; right: -2px; }
  .pos-bottom-left { bottom: -2px; left: -2px; }
  .pos-bottom-right { bottom: -2px; right: -2px; }

  /* Animations */
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(var(--status-rgb), 0.7); }
    70% { box-shadow: 0 0 0 6px rgba(var(--status-rgb), 0); }
    100% { box-shadow: 0 0 0 0 rgba(var(--status-rgb), 0); }
  }
  .anim-pulse { animation: pulse 2s infinite; }
  
  /* 3D Effects */
  @keyframes effect-pulse {
    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0,0,0,0.2); }
    50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(0,0,0,0.2); }
    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0,0,0,0.2); }
  }
  .effect-pulse { animation: effect-pulse 2s infinite ease-in-out; }
  
  @keyframes effect-glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
  }
  .effect-glitch:hover { animation: effect-glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite; }
  
  .effect-tilt {
    transition: transform 0.2s;
  }
  .effect-tilt:hover {
    transform: perspective(500px) rotateX(15deg) rotateY(-15deg) scale3d(1.05, 1.05, 1.05) !important;
  }

  /* Hover Effects */
  .avatar-root:hover {
    transform: var(--hover-transform);
    filter: var(--hover-filter);
    z-index: 20 !important; /* Bring to front on hover in stack */
  }

</style>
</head>
<body>

<div id="container"></div>

<!-- Template for Cloning -->
<template id="avatar-template">
  <div class="avatar-root">
    <img class="avatar-img" alt="" />
    <span class="avatar-initials"></span>
    <div class="status-dot"></div>
  </div>
</template>

<script>
  const container = document.getElementById('container');
  const template = document.getElementById('avatar-template');

  window.addEventListener('message', (e) => {
    const d = e.data;
    if (!d) return;

    // Clear previous
    container.innerHTML = '';

    // Determine Loop Count
    const count = d.showGroup ? d.groupLimit : 1;
    
    // Group Layout
    container.style.flexDirection = (d.showGroup && d.groupDirection === 'column') ? 'column' : 'row';

    for (let i = 0; i < count; i++) {
      const clone = template.content.cloneNode(true);
      const root = clone.querySelector('.avatar-root');
      const img = clone.querySelector('.avatar-img');
      const initialsEl = clone.querySelector('.avatar-initials');
      const statusEl = clone.querySelector('.status-dot');

      // --- Group Spacing (Negative Margin) ---
      if (d.showGroup && i > 0) {
         const spacing = (d.groupSpacing || 0) + 'px';
         if (d.groupDirection === 'column') {
             root.style.marginTop = spacing;
         } else {
             root.style.marginLeft = spacing;
         }
      }

      // --- Variables Assignment ---
      const s = root.style;
      s.setProperty('--size', d.size);
      s.setProperty('--radius', d.radiusStyle);
      
      s.setProperty('--initials-bg', d.initialsBg);
      s.setProperty('--initials-color', d.initialsColor);
      s.setProperty('--font-family', d.fontFamily);
      s.setProperty('--font-size', 'calc(' + d.size + ' * 0.4)');
      
      s.setProperty('--border-width', d.borderWidth + 'px');
      s.setProperty('--border-style', d.borderStyle);
      s.setProperty('--border-color', d.borderColor);
      
      s.setProperty('--opacity', d.opacity / 100);
      
      // Filters
      let combinedFilters = d.filters || '';
      s.setProperty('--filters', combinedFilters);

      s.setProperty('--object-fit', d.objectFit);
      s.setProperty('--object-position', d.objectPosition);

      // --- Content (Image vs Initials) ---
      if (d.src) {
          img.src = d.src;
          img.srcset = d.srcSet || "";
          img.alt = d.alt || "";
          img.style.display = 'block';
      } else {
          initialsEl.textContent = d.initials;
          initialsEl.style.display = 'inline';
      }

      // --- Status & Badge ---
      const hasBadge = !!d.badgeCount;
      const isActive = d.status !== 'none' || hasBadge;
      
      if (!isActive) {
          statusEl.style.display = 'none';
      } else {
          statusEl.style.display = 'flex';
          statusEl.className = 'status-dot pos-' + d.statusPosition;
          
          if (hasBadge) {
              statusEl.classList.add('badge');
              statusEl.textContent = d.badgeCount;
          } else {
              statusEl.classList.remove('badge');
              statusEl.textContent = '';
          }
          
          let color = '#94a3b8'; // default offline
          let rgb = '148, 163, 184';
          
          if (d.status === 'online') { color = '#22c55e'; rgb = '34, 197, 94'; }
          else if (d.status === 'busy') { color = '#ef4444'; rgb = '239, 68, 68'; }
          else if (d.status === 'away') { color = '#eab308'; rgb = '234, 179, 8'; }
          else if (d.status === 'offline') { color = '#94a3b8'; rgb = '148, 163, 184'; }
          else if (hasBadge) { color = '#ef4444'; rgb = '239, 68, 68'; } // Fallback for badge only
          
          s.setProperty('--status-color', color);
          s.setProperty('--status-rgb', rgb);
          
          if (d.statusAnimation === 'pulse') {
              statusEl.classList.add('anim-pulse');
          } else {
              statusEl.classList.remove('anim-pulse');
          }
      }

      // --- Hover & Effects ---
      // Hover Grayscale Logic
      let hoverFilters = combinedFilters;
      if (d.hoverGrayscale) {
          hoverFilters = 'grayscale(100%) ' + combinedFilters;
      }
      s.setProperty('--hover-filter', hoverFilters);
      
      // Base Transform (Rotation/Scale)
      const baseTransform = \`rotate(\${d.imageRotation || 0}deg) scale(\${d.imageScale || 1})\`;
      const zoomTransform = \`rotate(\${d.imageRotation || 0}deg) scale(\${(d.imageScale || 1) * 1.1})\`;
      
      s.setProperty('--base-transform', baseTransform);
      s.setProperty('--hover-transform', d.hoverZoom ? zoomTransform : baseTransform);

      // Effect Classes
      root.classList.remove('effect-tilt', 'effect-glitch', 'effect-pulse');
      if (d.effect3D === 'tilt') root.classList.add('effect-tilt');
      if (d.effect3D === 'glitch') root.classList.add('effect-glitch');
      if (d.effect3D === 'pulse') root.classList.add('effect-pulse');

      container.appendChild(clone);
    }
  });
</script>
</body>
</html>`;
