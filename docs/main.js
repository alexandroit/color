var L=[{id:"overview",title:"Overview",eyebrow:"Foundation package",description:"A compact core for color parsing, conversion, state, and a vanilla picker UI.",body:`
      <p><strong>@revivejs/color</strong> is designed as the foundation package for the future ReviveJS color ecosystem. The core logic stays framework-agnostic and reusable, while the current vanilla layer provides a clean DOM implementation for real browser usage.</p>
      <p>The goal is simple: do a few things very well, keep the runtime tiny, and make future wrappers adapt the same engine instead of replacing it.</p>
    `},{id:"installation",title:"Installation",eyebrow:"Get started",description:"Install the package and mount a picker in any DOM container.",body:`
      <pre><code>npm install @revivejs/color</code></pre>
      <pre><code>import { createColorPicker } from "@revivejs/color";

const picker = createColorPicker({
  el: "#picker",
  color: "#7c3aed",
  alpha: true,
  hue: true
});</code></pre>
    `},{id:"api",title:"API",eyebrow:"Small surface",description:"A minimal API with clean upgrade paths for controlled patterns later.",body:`
      <pre><code>const picker = createColorPicker({
  el: "#picker",
  color: "#7c3aed",
  alpha: true,
  hue: true,
  onChange: (color) => {
    console.log(color.hex, color.rgb, color.hsl);
  }
});

picker.getColor();
picker.setColor("rgba(124, 58, 237, 0.7)");
picker.update({ alpha: false });
picker.destroy();</code></pre>
      <p>The snapshot always includes normalized <code>hex</code>, <code>hexa</code>, <code>rgb</code>, <code>rgba</code>, <code>hsl</code>, <code>hsla</code>, <code>hsv</code>, and <code>hsva</code> values.</p>
    `}];var x=(r,e=0,o=1)=>Number.isNaN(r)?e:Math.min(o,Math.max(e,r)),c=(r,e=0)=>{let o=10**e;return Math.round(r*o)/o},H=r=>{if(!Number.isFinite(r))return 0;let e=r%360;return e<0?e+360:e},w=r=>c(x(r,0,255)),k=r=>x(r,0,100),T=r=>x(r,0,1);var sr=r=>({r:w(r.r),g:w(r.g),b:w(r.b)}),b=r=>({...sr(r),a:T(r.a)}),lr=r=>({h:H(r.h),s:k(r.s),l:k(r.l)}),y=r=>({...lr(r),a:T(r.a)}),ir=r=>({h:H(r.h),s:k(r.s),v:k(r.v)}),u=r=>({...ir(r),a:T(r.a)});var E=r=>r.toString(16).padStart(2,"0"),K=r=>{let e=r.trim().replace(/^#/,"");if(![3,4,6,8].includes(e.length))throw new TypeError(`Invalid HEX color: ${r}`);let o=e.length===3||e.length===4?e.split("").map(t=>t+t).join(""):e,n=o.length===8?o:`${o}ff`;return b({r:Number.parseInt(n.slice(0,2),16),g:Number.parseInt(n.slice(2,4),16),b:Number.parseInt(n.slice(4,6),16),a:Number.parseInt(n.slice(6,8),16)/255})},f=(r,e=!1)=>{let o=b(r),n=e?E(c(o.a*255)):"";return`#${E(o.r)}${E(o.g)}${E(o.b)}${n}`},P=r=>{let e=b(r),o=e.r/255,n=e.g/255,t=e.b/255,a=Math.max(o,n,t),l=Math.min(o,n,t),s=a-l,d=0;return s!==0&&(a===o?d=(n-t)/s%6:a===n?d=(t-o)/s+2:d=(o-n)/s+4),u({h:c(d*60),s:c(a===0?0:s/a*100,2),v:c(a*100,2),a:c(e.a,4)})},_=r=>{let e=u(r),o=e.h/360*6,n=e.s/100,t=e.v/100,a=Math.floor(o)%6,l=o-Math.floor(o),s=t*(1-n),d=t*(1-l*n),p=t*(1-(1-l)*n),g=t,h=s,m=d;return a===0?(g=t,h=p,m=s):a===1?(g=d,h=t,m=s):a===2?(g=s,h=t,m=p):a===3?(g=s,h=d,m=t):a===4&&(g=p,h=s,m=t),b({r:c(g*255),g:c(h*255),b:c(m*255),a:c(e.a,4)})},A=r=>{let e=y(r),o=e.s*(e.l<50?e.l:100-e.l)/100;return u({h:e.h,s:o===0?0:2*o/(e.l+o)*100,v:e.l+o,a:e.a})},$=r=>{let e=u(r),o=(200-e.s)*e.v/100;return y({h:e.h,s:o>0&&o<200?e.s*e.v/100/(o<=100?o:200-o)*100:0,l:o/2,a:e.a})};var cr=r=>({r:c(r.r),g:c(r.g),b:c(r.b),a:c(r.a,3)}),dr=r=>({h:c(r.h),s:c(r.s),l:c(r.l),a:c(r.a,3)}),pr=r=>({h:c(r.h),s:c(r.s),v:c(r.v),a:c(r.a,3)}),R=r=>{let e=u(r),o=pr(e),n=cr(_(e)),t=dr($(e)),a={r:n.r,g:n.g,b:n.b},l={h:t.h,s:t.s,l:t.l},s={h:o.h,s:o.s,v:o.v};return{hex:f(n,!1),hexa:f(n,!0),rgb:a,rgba:n,hsl:l,hsla:t,hsv:s,hsva:o,alpha:n.a}};var hr=/^#?([\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/i,ur=/^rgba?\(\s*(-?\d*\.?\d+)(%)?[\s,]+(-?\d*\.?\d+)(%)?[\s,]+(-?\d*\.?\d+)(%)?(?:\s*[,/]\s*(-?\d*\.?\d+)(%)?)?\s*\)$/i,gr=/^hsla?\(\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[\s,]+(-?\d*\.?\d+)%?[\s,]+(-?\d*\.?\d+)%?(?:\s*[,/]\s*(-?\d*\.?\d+)(%)?)?\s*\)$/i,mr=/^hsva?\(\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[\s,]+(-?\d*\.?\d+)%?[\s,]+(-?\d*\.?\d+)%?(?:\s*[,/]\s*(-?\d*\.?\d+)(%)?)?\s*\)$/i,vr={deg:1,grad:360/400,turn:360,rad:360/(Math.PI*2)},B=(r,e="deg")=>{var o;return H(Number(r)*((o=vr[e])!=null?o:1))},br=r=>typeof r=="object"&&r!==null&&"hsva"in r,fr=r=>typeof r=="object"&&r!==null&&"r"in r&&"g"in r&&"b"in r,Cr=r=>typeof r=="object"&&r!==null&&"h"in r&&"s"in r&&"l"in r,yr=r=>typeof r=="object"&&r!==null&&"h"in r&&"s"in r&&"v"in r,xr=r=>{let e=ur.exec(r.trim());if(!e)throw new TypeError(`Invalid RGB color: ${r}`);return b({r:Number(e[1])/(e[2]?100/255:1),g:Number(e[3])/(e[4]?100/255:1),b:Number(e[5])/(e[6]?100/255:1),a:e[7]===void 0?1:Number(e[7])/(e[8]?100:1)})},Hr=r=>{var o;let e=gr.exec(r.trim());if(!e)throw new TypeError(`Invalid HSL color: ${r}`);return y({h:B(e[1],(o=e[2])!=null?o:"deg"),s:Number(e[3]),l:Number(e[4]),a:e[5]===void 0?1:Number(e[5])/(e[6]?100:1)})},kr=r=>{var o;let e=mr.exec(r.trim());if(!e)throw new TypeError(`Invalid HSV color: ${r}`);return u({h:B(e[1],(o=e[2])!=null?o:"deg"),s:Number(e[3]),v:Number(e[4]),a:e[5]===void 0?1:Number(e[5])/(e[6]?100:1)})},S=r=>{if(typeof r=="string"){let e=r.trim();if(hr.test(e))return P(K(e));if(e.startsWith("rgb"))return P(xr(e));if(e.startsWith("hsl"))return A(Hr(e));if(e.startsWith("hsv"))return kr(e);throw new TypeError(`Unsupported color string: ${r}`)}if(br(r))return u(r.hsva);if(fr(r))return P(b({r:r.r,g:r.g,b:r.b,a:"a"in r?r.a:1}));if(Cr(r))return A(y({h:r.h,s:r.s,l:r.l,a:"a"in r?r.a:1}));if(yr(r))return u({h:r.h,s:r.s,v:r.v,a:"a"in r?r.a:1});throw new TypeError("Unsupported color input")};var Sr=(r,e)=>r.h!==e.h||r.s!==e.s||r.v!==e.v||r.a!==e.a,U=(r="#000000")=>{let e=u(S(r)),o=new Set,n=()=>{let a=R(e);for(let l of o)l(a);return a},t=a=>{let l=u(a);return Sr(e,l)?(e=l,n()):R(e)};return{subscribe(a){return o.add(a),()=>{o.delete(a)}},getHsva(){return{...e}},getSnapshot(){return R(e)},setColor(a){return t(S(a))},setArea(a,l){return t({...e,s:a,v:l})},setHue(a){return t({...e,h:a})},setAlpha(a){return t({...e,a})}}};var N=r=>{let e=c(r,3);return Number.isInteger(e)?`${e}`:`${e}`.replace(/0+$/,"").replace(/\.$/,"")},q=(r,e=!1)=>e?`rgba(${r.r}, ${r.g}, ${r.b}, ${N(r.a)})`:`rgb(${r.r}, ${r.g}, ${r.b})`,F=(r,e=!1)=>e?`hsla(${r.h}, ${r.s}%, ${r.l}%, ${N(r.a)})`:`hsl(${r.h}, ${r.s}%, ${r.l}%)`,O=(r,e=!1)=>{if(!e)return`hsv(${r.h}, ${r.s}%, ${r.v}%)`;let o="a"in r?r.a:1;return`hsva(${r.h}, ${r.s}%, ${r.v}%, ${N(o)})`},I=(r,e="hex")=>{let o=typeof r=="object"&&r!==null&&"hex"in r&&"rgba"in r?r:null,n=o?o.hsva:S(r),t=o?o.rgba:_(n),a=o?o.hsla:$(n),l=o?o.hsv:n;switch(e){case"hex":return f(t,!1);case"hexa":return f(t,!0);case"rgb":return q(t,!1);case"rgba":return q(t,!0);case"hsl":return F(a,!1);case"hsla":return F(a,!0);case"hsv":return O(l,!1);case"hsva":return O(n,!0);default:return f(t,!1)}};var G=r=>Math.min(1,Math.max(0,r)),J=(r,e)=>{let o=r.getBoundingClientRect();return{x:o.width===0?0:G((e.clientX-o.left)/o.width),y:o.height===0?0:G((e.clientY-o.top)/o.height)}},M=(r,e)=>{let o=null,n=s=>{var d;!s.isPrimary||s.pointerType==="mouse"&&s.button!==0||(o=s.pointerId,r.focus({preventScroll:!0}),(d=r.setPointerCapture)==null||d.call(r,s.pointerId),s.preventDefault(),e.onPointer(J(r,s)))},t=s=>{s.pointerId===o&&(s.preventDefault(),e.onPointer(J(r,s)))},a=s=>{s.pointerId===o&&(o=null)},l=s=>{["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End","PageUp","PageDown"].includes(s.key)&&(s.preventDefault(),e.onKey(s))};return r.addEventListener("pointerdown",n),r.addEventListener("pointermove",t),r.addEventListener("pointerup",a),r.addEventListener("pointercancel",a),r.addEventListener("keydown",l),()=>{r.removeEventListener("pointerdown",n),r.removeEventListener("pointermove",t),r.removeEventListener("pointerup",a),r.removeEventListener("pointercancel",a),r.removeEventListener("keydown",l)}};var X=(r,e,o=.5)=>{r.style.left=`${e*100}%`,r.style.top=`${o*100}%`},Y=r=>{let e=document.createElement("div"),o=document.createElement("div");e.className="rv-color__area rv-color__interactive",e.tabIndex=0,e.setAttribute("role","slider"),e.setAttribute("aria-label",r.label),o.className="rv-color__handle",e.append(o);let n=M(e,{onPointer(t){r.onChange(t.x*100,(1-t.y)*100)},onKey(t){var g,h;let a=t.shiftKey||t.key==="PageUp"||t.key==="PageDown"?10:1,l=0,s=0;if(t.key==="ArrowLeft")l=-a;else if(t.key==="ArrowRight")l=a;else if(t.key==="ArrowUp"||t.key==="PageUp")s=a;else if(t.key==="ArrowDown"||t.key==="PageDown")s=-a;else return;let d=Number((g=e.dataset.saturation)!=null?g:"0"),p=Number((h=e.dataset.value)!=null?h:"0");r.onChange(d+l,p+s)}});return{element:e,render(t){e.dataset.saturation=`${t.hsv.s}`,e.dataset.value=`${t.hsv.v}`,e.style.setProperty("--rv-color-area-hue",`hsl(${t.hsv.h} 100% 50%)`),o.style.setProperty("--rv-color-handle-color",t.hex),X(o,t.hsv.s/100,1-t.hsv.v/100),e.setAttribute("aria-valuetext",`Saturation ${t.hsv.s} percent, value ${t.hsv.v} percent`)},destroy(){n()}}},W=r=>{let e=document.createElement("div"),o=document.createElement("div");e.className=`${r.className} rv-color__interactive`,e.tabIndex=0,e.setAttribute("role","slider"),e.setAttribute("aria-label",r.label),e.setAttribute("aria-orientation","horizontal"),o.className="rv-color__handle rv-color__handle--line",e.append(o);let n=M(e,{onPointer(t){let a=r.min+t.x*(r.max-r.min);r.onChange(a)},onKey(t){var s;let a=Number((s=e.dataset.value)!=null?s:`${r.min}`),l=t.shiftKey?r.pageStep:r.step;if(t.key==="Home"){r.onChange(r.min);return}if(t.key==="End"){r.onChange(r.max);return}if(t.key==="ArrowLeft"||t.key==="ArrowDown"||t.key==="PageDown"){r.onChange(a-l);return}(t.key==="ArrowRight"||t.key==="ArrowUp"||t.key==="PageUp")&&r.onChange(a+l)}});return{element:e,render(t){var l;let a=x((r.getValue(t)-r.min)/(r.max-r.min),0,1);e.dataset.value=`${r.getValue(t)}`,o.style.setProperty("--rv-color-handle-color",r.handleColor(t)),X(o,a),e.setAttribute("aria-valuemin",`${r.min}`),e.setAttribute("aria-valuemax",`${r.max}`),e.setAttribute("aria-valuenow",`${r.getValue(t)}`),e.setAttribute("aria-valuetext",r.getValueText(t)),(l=r.paint)==null||l.call(r,e,t)},destroy(){n()}}},Z=(r,e)=>W({className:"rv-color__slider rv-color__slider--hue",label:r,min:0,max:360,step:1,pageStep:10,getValue:o=>o.hsv.h,getValueText:o=>`${o.hsv.h} degrees`,onChange:e,handleColor:o=>`hsl(${o.hsv.h} 100% 50%)`}),Q=(r,e)=>W({className:"rv-color__slider rv-color__slider--alpha",label:r,min:0,max:1,step:.01,pageStep:.1,getValue:o=>o.alpha,getValueText:o=>`${Math.round(o.alpha*100)} percent`,onChange:e,handleColor:o=>o.hexa,paint:(o,n)=>{let t={...n.hsva,a:0};o.style.setProperty("--rv-color-alpha-from",I(t,"rgba")),o.style.setProperty("--rv-color-alpha-to",I(n,"rgba"))}});var rr=r=>{if(typeof r=="string"){let e=document.querySelector(r);if(!e)throw new TypeError(`Could not find element for selector: ${r}`);return e}if(!(r instanceof HTMLElement))throw new TypeError("Expected a selector string or an HTMLElement");return r};var er="revivejs-color-styles",wr=`
.rv-color {
  --rv-color-max-width: 320px;
  --rv-color-radius: 14px;
  --rv-color-panel-height: 228px;
  --rv-color-slider-height: 16px;
  --rv-color-handle-size: 18px;
  --rv-color-line-handle-width: 14px;
  --rv-color-line-handle-height: 24px;
  --rv-color-gap: 12px;
  --rv-color-surface: #ffffff;
  --rv-color-border: rgba(15, 23, 42, 0.08);
  --rv-color-focus: #2563eb;
  --rv-color-shadow: 0 10px 28px rgba(15, 23, 42, 0.08);
  --rv-color-checker-light: #ffffff;
  --rv-color-checker-dark: #d7deea;
  width: min(100%, var(--rv-color-max-width));
  display: grid;
  gap: var(--rv-color-gap);
  color: #0f172a;
  font: 500 14px/1.2 ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  user-select: none;
}

.rv-color,
.rv-color * {
  box-sizing: border-box;
}

.rv-color__surface {
  display: grid;
  gap: var(--rv-color-gap);
  padding: 14px;
  border-radius: calc(var(--rv-color-radius) + 4px);
  background: var(--rv-color-surface);
  box-shadow: var(--rv-color-shadow);
  border: 1px solid var(--rv-color-border);
}

.rv-color__area,
.rv-color__slider {
  position: relative;
  touch-action: none;
  outline: none;
}

.rv-color__area {
  height: var(--rv-color-panel-height);
  border-radius: var(--rv-color-radius);
  border: 1px solid var(--rv-color-border);
  background: var(--rv-color-area-hue, hsl(0 100% 50%));
}

.rv-color__area::before,
.rv-color__area::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
}

.rv-color__area::before {
  background: linear-gradient(90deg, #ffffff, rgba(255, 255, 255, 0));
}

.rv-color__area::after {
  background: linear-gradient(0deg, #000000, rgba(0, 0, 0, 0));
}

.rv-color__slider {
  height: var(--rv-color-slider-height);
  border-radius: 999px;
  border: 1px solid var(--rv-color-border);
}

.rv-color__slider--hue {
  background: linear-gradient(
    90deg,
    rgb(255, 0, 0) 0%,
    rgb(255, 255, 0) 16.66%,
    rgb(0, 255, 0) 33.33%,
    rgb(0, 255, 255) 50%,
    rgb(0, 0, 255) 66.66%,
    rgb(255, 0, 255) 83.33%,
    rgb(255, 0, 0) 100%
  );
}

.rv-color__slider--alpha {
  background-image:
    linear-gradient(45deg, var(--rv-color-checker-dark) 25%, transparent 25%),
    linear-gradient(-45deg, var(--rv-color-checker-dark) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, var(--rv-color-checker-dark) 75%),
    linear-gradient(-45deg, transparent 75%, var(--rv-color-checker-dark) 75%),
    linear-gradient(90deg, var(--rv-color-alpha-from), var(--rv-color-alpha-to));
  background-position:
    0 0,
    0 6px,
    6px -6px,
    -6px 0,
    0 0;
  background-size:
    12px 12px,
    12px 12px,
    12px 12px,
    12px 12px,
    100% 100%;
  background-color: var(--rv-color-checker-light);
}

.rv-color__handle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--rv-color-handle-size);
  height: var(--rv-color-handle-size);
  border: 2px solid #ffffff;
  border-radius: 999px;
  background: var(--rv-color-handle-color, #ffffff);
  box-shadow:
    0 0 0 1px rgba(15, 23, 42, 0.18),
    0 4px 16px rgba(15, 23, 42, 0.18);
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.rv-color__handle--line {
  width: var(--rv-color-line-handle-width);
  height: var(--rv-color-line-handle-height);
}

.rv-color__interactive:focus-visible {
  outline: 2px solid var(--rv-color-focus);
  outline-offset: 2px;
}
`,z=r=>{if(typeof document=="undefined"||document.getElementById(er))return;let e=document.createElement("style");e.id=er,e.textContent=wr,r&&e.setAttribute("nonce",r),document.head.append(e)};var Tr={area:"Saturation and value",hue:"Hue",alpha:"Alpha"},or=()=>{let r=document.createElement("div");return r.className="rv-color__surface",r},j=r=>{var m,v,D,V;let e=rr(r.el);r.injectStyles!==!1&&z(r.styleNonce);let o={alpha:(m=r.alpha)!=null?m:!0,hue:(v=r.hue)!=null?v:!0,injectStyles:(D=r.injectStyles)!=null?D:!0,className:r.className,onChange:r.onChange,styleNonce:r.styleNonce,labels:{...Tr,...r.labels}},n=U((V=r.color)!=null?V:"#7c3aed"),t=document.createElement("div");t.className="rv-color",t.setAttribute("data-revivejs-color",""),o.className&&t.classList.add(...o.className.split(/\s+/).filter(Boolean));let a=or(),l=[],s=()=>{for(let i of l)i.destroy();l=[],a.remove()},d=()=>{s(),a=or(),l.push(Y({label:o.labels.area,onChange:(i,C)=>{n.setArea(i,C)}})),o.hue&&l.push(Z(o.labels.hue,i=>{n.setHue(i)})),o.alpha&&l.push(Q(o.labels.alpha,i=>{n.setAlpha(i)}));for(let i of l)a.append(i.element);t.append(a)},p=i=>{for(let C of l)C.render(i)},g=n.subscribe(i=>{var C;p(i),(C=o.onChange)==null||C.call(o,i)});d(),p(n.getSnapshot()),e.append(t);let h=i=>{t.className="rv-color",i&&t.classList.add(...i.split(/\s+/).filter(Boolean))};return{element:t,destroy(){g(),s(),t.remove()},getColor(){return n.getSnapshot()},setColor(i){return n.setColor(i)},update(i){o={...o,...i,labels:{...o.labels,...i.labels}},h(o.className),o.injectStyles!==!1&&z(o.styleNonce),(i.alpha!==void 0||i.hue!==void 0||i.className!==void 0||i.labels!==void 0)&&(d(),p(n.getSnapshot())),i.color!==void 0&&n.setColor(i.color)}}};var tr=r=>{r.innerHTML=`
    <section class="playground">
      <div class="playground__header">
        <div>
          <span class="eyebrow">Live playground</span>
          <h2>Vanilla color picker</h2>
          <p>Change the inputs and the docs page rebuilds the picker using the real package runtime.</p>
        </div>
      </div>
      <div class="playground__grid">
        <div class="playground__panel">
          <label class="field">
            <span>Initial color</span>
            <input id="playground-color" type="text" value="#7c3aed" />
          </label>
          <label class="field field--inline">
            <input id="playground-hue" type="checkbox" checked />
            <span>Show hue slider</span>
          </label>
          <label class="field field--inline">
            <input id="playground-alpha" type="checkbox" checked />
            <span>Show alpha slider</span>
          </label>
          <button id="playground-reset" class="button" type="button">Rebuild picker</button>
        </div>
        <div class="playground__preview">
          <div class="preview-card">
            <div id="playground-picker"></div>
          </div>
          <div class="preview-meta">
            <div class="preview-swatch" id="playground-swatch"></div>
            <pre><code id="playground-output"></code></pre>
          </div>
        </div>
      </div>
      <div class="snippet playground__setup">
        <h3>Vanilla setup</h3>
        <pre><code id="playground-source"></code></pre>
      </div>
    </section>
  `;let e=r.querySelector("#playground-color"),o=r.querySelector("#playground-hue"),n=r.querySelector("#playground-alpha"),t=r.querySelector("#playground-reset"),a=r.querySelector("#playground-picker"),l=r.querySelector("#playground-swatch"),s=r.querySelector("#playground-output"),d=r.querySelector("#playground-source");if(!e||!o||!n||!t||!a||!l||!s||!d)return;let p=null,g=()=>{d.textContent=`import { createColorPicker } from "@revivejs/color";

const picker = createColorPicker({
  el: "#picker",
  color: "${e.value}",
  hue: ${o.checked},
  alpha: ${n.checked},
  onChange: (color) => {
    console.log(color.hex, color.rgb, color.hsl);
  }
});`},h=()=>{p==null||p.destroy(),a.innerHTML="",g(),p=j({el:a,color:e.value,hue:o.checked,alpha:n.checked,onChange:v=>{l.style.background=v.hexa,s.textContent=JSON.stringify(v,null,2),document.body.style.background=`linear-gradient(180deg, rgba(${v.rgb.r}, ${v.rgb.g}, ${v.rgb.b}, 0.10), rgba(${v.rgb.r}, ${v.rgb.g}, ${v.rgb.b}, 0.28))`}});let m=p.getColor();l.style.background=m.hexa,s.textContent=JSON.stringify(m,null,2)};t.addEventListener("click",h),h()};var nr=document.querySelector("#app");if(!nr)throw new TypeError("Docs app root was not found.");var Er=L.map(r=>`
      <section id="${r.id}" class="panel">
        <div class="page__head">
          <span class="eyebrow">${r.eyebrow}</span>
          <h3>${r.title}</h3>
          <p>${r.description}</p>
        </div>
        <div>${r.body}</div>
      </section>
    `).join(""),Pr=['<a href="#playground">Live Playground</a>',...L.map(r=>`<a href="#${r.id}">${r.title}</a>`)].join("");nr.innerHTML=`
  <div class="layout">
    <aside class="sidebar">
      <a class="brand" href="#playground">
        <span class="eyebrow">ReviveJS</span>
        <h1>@revivejs/color</h1>
        <p>A tiny, framework-agnostic color picker foundation built for future wrappers and long-term ecosystem growth.</p>
      </a>
      <nav class="nav">
        ${Pr}
      </nav>
    </aside>
    <main class="content">
      <div id="playground"></div>
      <section class="hero">
        <span class="eyebrow">Core + vanilla layer</span>
        <h2>Small, precise, and ready for wrappers.</h2>
        <p>The first version of <strong>@revivejs/color</strong> focuses on a polished HSV-based engine, a modern vanilla picker, strong typing, accessible controls, and a clean path to React, Vue, and Angular wrappers later.</p>
        <div class="hero__meta">
          <span>Zero runtime dependencies</span>
          <span>HEX, RGB, HSL, HSV</span>
          <span>Keyboard and pointer support</span>
          <span>CSS variables theming</span>
        </div>
      </section>
      ${Er}
    </main>
  </div>
`;var ar=document.querySelector("#playground");ar&&tr(ar);
