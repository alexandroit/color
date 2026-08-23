var L=[{id:"overview",title:"Overview",eyebrow:"Foundation package",description:"A compact core for color parsing, conversion, state, and a vanilla picker UI.",body:`
      <p><strong>@stackline/color</strong> is designed as the foundation package for the future Stackline color ecosystem. The core logic stays framework-agnostic and reusable, while the current vanilla layer provides a clean DOM implementation for real browser usage.</p>
      <p>The 1.0.1 release preserves the stable API while refreshing the build chain and its security baseline.</p>
      <p>The goal is simple: do a few things very well, keep the runtime tiny, and make future wrappers adapt the same engine instead of replacing it.</p>
    `},{id:"installation",title:"Installation",eyebrow:"Get started",description:"Install the package and mount a picker in any DOM container.",body:`
      <pre><code>npm install @stackline/color</code></pre>
      <pre><code>import { createColorPicker } from "@stackline/color";

const picker = createColorPicker({
  el: "#picker",
  color: "#7c3aed",
  alpha: true,
  hue: true
});</code></pre>
    `},{id:"direct-download",title:"Direct Download",eyebrow:"Pure JavaScript",description:"Use the browser bundle from GitHub when you want a plain script tag integration.",body:`
      <p><a class="button" href="https://github.com/alexandroit/color/tree/main/downloads" target="_blank" rel="noreferrer">Open GitHub download bundle</a></p>
      <p>The archive includes <code>color.browser.js</code> and exposes <code>window.StacklineColor</code>.</p>
      <pre><code>&lt;div id="picker"&gt;&lt;/div&gt;
&lt;script src="./color.browser.js"&gt;&lt;/script&gt;
&lt;script&gt;
  const picker = StacklineColor.createColorPicker({
    el: "#picker",
    color: "#7c3aed",
    alpha: true,
    hue: true
  });

  console.log(picker.getColor().hex);
&lt;/script&gt;</code></pre>
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
      <p>Picker size is also customizable through CSS variables, so you can make it more compact or more spacious without changing the runtime API.</p>
      <pre><code>.my-picker {
  --rv-color-max-width: 360px;
  --rv-color-panel-height: 256px;
  --rv-color-slider-height: 18px;
  --rv-color-handle-size: 20px;
  --rv-color-line-handle-width: 16px;
  --rv-color-line-handle-height: 26px;
}</code></pre>
    `}];var x=(r,e=0,o=1)=>Number.isNaN(r)?e:Math.min(o,Math.max(e,r)),p=(r,e=0)=>{let o=10**e;return Math.round(r*o)/o},k=r=>{if(!Number.isFinite(r))return 0;let e=r%360;return e<0?e+360:e},S=r=>p(x(r,0,255)),w=r=>x(r,0,100),T=r=>x(r,0,1);var pr=r=>({r:S(r.r),g:S(r.g),b:S(r.b)}),v=r=>({...pr(r),a:T(r.a)}),hr=r=>({h:k(r.h),s:w(r.s),l:w(r.l)}),y=r=>({...hr(r),a:T(r.a)}),ur=r=>({h:k(r.h),s:w(r.s),v:w(r.v)}),b=r=>({...ur(r),a:T(r.a)});var P=r=>r.toString(16).padStart(2,"0"),F=r=>{let e=r.trim().replace(/^#/,"");if(![3,4,6,8].includes(e.length))throw new TypeError(`Invalid HEX color: ${r}`);let o=e.length===3||e.length===4?e.split("").map(t=>t+t).join(""):e,n=o.length===8?o:`${o}ff`;return v({r:Number.parseInt(n.slice(0,2),16),g:Number.parseInt(n.slice(2,4),16),b:Number.parseInt(n.slice(4,6),16),a:Number.parseInt(n.slice(6,8),16)/255})},f=(r,e=!1)=>{let o=v(r),n=e?P(p(o.a*255)):"";return`#${P(o.r)}${P(o.g)}${P(o.b)}${n}`},E=r=>{let e=v(r),o=e.r/255,n=e.g/255,t=e.b/255,a=Math.max(o,n,t),s=Math.min(o,n,t),l=a-s,i=0;return l!==0&&(a===o?i=(n-t)/l%6:a===n?i=(t-o)/l+2:i=(o-n)/l+4),b({h:p(i*60),s:p(a===0?0:l/a*100,2),v:p(a*100,2),a:p(e.a,4)})},_=r=>{let e=b(r),o=e.h/360*6,n=e.s/100,t=e.v/100,a=Math.floor(o)%6,s=o-Math.floor(o),l=t*(1-n),i=t*(1-s*n),c=t*(1-(1-s)*n),u=t,h=l,g=i;return a===0?(u=t,h=c,g=l):a===1?(u=i,h=t,g=l):a===2?(u=l,h=t,g=c):a===3?(u=l,h=i,g=t):a===4&&(u=c,h=l,g=t),v({r:p(u*255),g:p(h*255),b:p(g*255),a:p(e.a,4)})},R=r=>{let e=y(r),o=e.s*(e.l<50?e.l:100-e.l)/100;return b({h:e.h,s:o===0?0:2*o/(e.l+o)*100,v:e.l+o,a:e.a})},$=r=>{let e=b(r),o=(200-e.s)*e.v/100;return y({h:e.h,s:o>0&&o<200?e.s*e.v/100/(o<=100?o:200-o)*100:0,l:o/2,a:e.a})};var gr=r=>({r:p(r.r),g:p(r.g),b:p(r.b),a:p(r.a,3)}),br=r=>({h:p(r.h),s:p(r.s),l:p(r.l),a:p(r.a,3)}),mr=r=>({h:p(r.h),s:p(r.s),v:p(r.v),a:p(r.a,3)}),A=r=>{let e=b(r),o=mr(e),n=gr(_(e)),t=br($(e)),a={r:n.r,g:n.g,b:n.b},s={h:t.h,s:t.s,l:t.l},l={h:o.h,s:o.s,v:o.v};return{hex:f(n,!1),hexa:f(n,!0),rgb:a,rgba:n,hsl:s,hsla:t,hsv:l,hsva:o,alpha:n.a}};var vr=/^#?([\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/i,U=r=>r>=48&&r<=57,q=r=>r!==""&&r.trim()==="",B=(r,e,o,n)=>{let t=e,a=t;r.charCodeAt(t)===45&&(t+=1);let s=0;for(;U(r.charCodeAt(t));)s+=1,t+=1;if(r.charCodeAt(t)===46){t+=1;let h=t;for(;U(r.charCodeAt(t));)t+=1;if(t===h)return null}else if(s===0)return null;let l=r.slice(a,t),i;if(n){let h=t;for(;;){let g=r.charCodeAt(t);if(!(g>=65&&g<=90||g>=97&&g<=122))break;t+=1}if(t>h&&(i=r.slice(h,t).toLowerCase(),!Object.prototype.hasOwnProperty.call(O,i)))return null}let c=o&&r.charCodeAt(t)===37;c&&(t+=1);let u={raw:l,percentage:c};return i!==void 0&&(u.unit=i),{next:t,token:u}},I=(r,e,o)=>{let n=r.trim(),t=n.indexOf("(");if(t<=0||n.charAt(n.length-1)!==")"||!e.includes(n.slice(0,t).toLowerCase()))return null;let a=n.slice(t+1,-1),s=[],l=0,i=()=>{for(;q(a.charAt(l));)l+=1};i();for(let c=0;c<3;c+=1){let u=B(a,l,o==="rgb"||c>0,o==="angle"&&c===0);if(!u)return null;if(s.push(u.token),l=u.next,c<2){let h=!1;for(;q(a.charAt(l))||a.charAt(l)===",";)h=!0,l+=1;if(!h)return null}}if(i(),a.charAt(l)===","||a.charAt(l)==="/"){l+=1,i();let c=B(a,l,!0,!1);if(!c)return null;s.push(c.token),l=c.next}return i(),l===a.length?s:null},O={deg:1,grad:360/400,turn:360,rad:360/(Math.PI*2)},G=(r,e="deg")=>{var o;return k(Number(r)*((o=O[e])!=null?o:1))},fr=r=>typeof r=="object"&&r!==null&&"hsva"in r,Cr=r=>typeof r=="object"&&r!==null&&"r"in r&&"g"in r&&"b"in r,yr=r=>typeof r=="object"&&r!==null&&"h"in r&&"s"in r&&"l"in r,xr=r=>typeof r=="object"&&r!==null&&"h"in r&&"s"in r&&"v"in r,kr=r=>{let e=I(r,["rgb","rgba"],"rgb");if(!e)throw new TypeError(`Invalid RGB color: ${r}`);return v({r:Number(e[0].raw)/(e[0].percentage?100/255:1),g:Number(e[1].raw)/(e[1].percentage?100/255:1),b:Number(e[2].raw)/(e[2].percentage?100/255:1),a:e[3]===void 0?1:Number(e[3].raw)/(e[3].percentage?100:1)})},wr=r=>{var o;let e=I(r,["hsl","hsla"],"angle");if(!e)throw new TypeError(`Invalid HSL color: ${r}`);return y({h:G(e[0].raw,(o=e[0].unit)!=null?o:"deg"),s:Number(e[1].raw),l:Number(e[2].raw),a:e[3]===void 0?1:Number(e[3].raw)/(e[3].percentage?100:1)})},Hr=r=>{var o;let e=I(r,["hsv","hsva"],"angle");if(!e)throw new TypeError(`Invalid HSV color: ${r}`);return b({h:G(e[0].raw,(o=e[0].unit)!=null?o:"deg"),s:Number(e[1].raw),v:Number(e[2].raw),a:e[3]===void 0?1:Number(e[3].raw)/(e[3].percentage?100:1)})},H=r=>{if(typeof r=="string"){let e=r.trim();if(vr.test(e))return E(F(e));if(e.startsWith("rgb"))return E(kr(e));if(e.startsWith("hsl"))return R(wr(e));if(e.startsWith("hsv"))return Hr(e);throw new TypeError(`Unsupported color string: ${r}`)}if(fr(r))return b(r.hsva);if(Cr(r))return E(v({r:r.r,g:r.g,b:r.b,a:"a"in r?r.a:1}));if(yr(r))return R(y({h:r.h,s:r.s,l:r.l,a:"a"in r?r.a:1}));if(xr(r))return b({h:r.h,s:r.s,v:r.v,a:"a"in r?r.a:1});throw new TypeError("Unsupported color input")};var Sr=(r,e)=>r.h!==e.h||r.s!==e.s||r.v!==e.v||r.a!==e.a,W=(r="#000000")=>{let e=b(H(r)),o=new Set,n=()=>{let a=A(e);for(let s of o)s(a);return a},t=a=>{let s=b(a);return Sr(e,s)?(e=s,n()):A(e)};return{subscribe(a){return o.add(a),()=>{o.delete(a)}},getHsva(){return{...e}},getSnapshot(){return A(e)},setColor(a){return t(H(a))},setArea(a,s){return t({...e,s:a,v:s})},setHue(a){return t({...e,h:a})},setAlpha(a){return t({...e,a})}}};var N=r=>{let e=p(r,3);return Number.isInteger(e)?`${e}`:`${e}`.replace(/0+$/,"").replace(/\.$/,"")},X=(r,e=!1)=>e?`rgba(${r.r}, ${r.g}, ${r.b}, ${N(r.a)})`:`rgb(${r.r}, ${r.g}, ${r.b})`,Y=(r,e=!1)=>e?`hsla(${r.h}, ${r.s}%, ${r.l}%, ${N(r.a)})`:`hsl(${r.h}, ${r.s}%, ${r.l}%)`,J=(r,e=!1)=>{if(!e)return`hsv(${r.h}, ${r.s}%, ${r.v}%)`;let o="a"in r?r.a:1;return`hsva(${r.h}, ${r.s}%, ${r.v}%, ${N(o)})`},M=(r,e="hex")=>{let o=typeof r=="object"&&r!==null&&"hex"in r&&"rgba"in r?r:null,n=o?o.hsva:H(r),t=o?o.rgba:_(n),a=o?o.hsla:$(n),s=o?o.hsv:n;switch(e){case"hex":return f(t,!1);case"hexa":return f(t,!0);case"rgb":return X(t,!1);case"rgba":return X(t,!0);case"hsl":return Y(a,!1);case"hsla":return Y(a,!0);case"hsv":return J(s,!1);case"hsva":return J(n,!0);default:return f(t,!1)}};var Z=r=>Math.min(1,Math.max(0,r)),Q=(r,e)=>{let o=r.getBoundingClientRect();return{x:o.width===0?0:Z((e.clientX-o.left)/o.width),y:o.height===0?0:Z((e.clientY-o.top)/o.height)}},z=(r,e)=>{let o=null,n=l=>{var i;!l.isPrimary||l.pointerType==="mouse"&&l.button!==0||(o=l.pointerId,r.focus({preventScroll:!0}),(i=r.setPointerCapture)==null||i.call(r,l.pointerId),l.preventDefault(),e.onPointer(Q(r,l)))},t=l=>{l.pointerId===o&&(l.preventDefault(),e.onPointer(Q(r,l)))},a=l=>{l.pointerId===o&&(o=null)},s=l=>{["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End","PageUp","PageDown"].includes(l.key)&&(l.preventDefault(),e.onKey(l))};return r.addEventListener("pointerdown",n),r.addEventListener("pointermove",t),r.addEventListener("pointerup",a),r.addEventListener("pointercancel",a),r.addEventListener("keydown",s),()=>{r.removeEventListener("pointerdown",n),r.removeEventListener("pointermove",t),r.removeEventListener("pointerup",a),r.removeEventListener("pointercancel",a),r.removeEventListener("keydown",s)}};var rr=(r,e,o=.5)=>{r.style.left=`${e*100}%`,r.style.top=`${o*100}%`},er=r=>{let e=document.createElement("div"),o=document.createElement("div");e.className="rv-color__area rv-color__interactive",e.tabIndex=0,e.setAttribute("role","slider"),e.setAttribute("aria-label",r.label),o.className="rv-color__handle",e.append(o);let n=z(e,{onPointer(t){r.onChange(t.x*100,(1-t.y)*100)},onKey(t){var u,h;let a=t.shiftKey||t.key==="PageUp"||t.key==="PageDown"?10:1,s=0,l=0;if(t.key==="ArrowLeft")s=-a;else if(t.key==="ArrowRight")s=a;else if(t.key==="ArrowUp"||t.key==="PageUp")l=a;else if(t.key==="ArrowDown"||t.key==="PageDown")l=-a;else return;let i=Number((u=e.dataset.saturation)!=null?u:"0"),c=Number((h=e.dataset.value)!=null?h:"0");r.onChange(i+s,c+l)}});return{element:e,render(t){e.dataset.saturation=`${t.hsv.s}`,e.dataset.value=`${t.hsv.v}`,e.style.setProperty("--rv-color-area-hue",`hsl(${t.hsv.h} 100% 50%)`),o.style.setProperty("--rv-color-handle-color",t.hex),rr(o,t.hsv.s/100,1-t.hsv.v/100),e.setAttribute("aria-valuetext",`Saturation ${t.hsv.s} percent, value ${t.hsv.v} percent`)},destroy(){n()}}},or=r=>{let e=document.createElement("div"),o=document.createElement("div");e.className=`${r.className} rv-color__interactive`,e.tabIndex=0,e.setAttribute("role","slider"),e.setAttribute("aria-label",r.label),e.setAttribute("aria-orientation","horizontal"),o.className="rv-color__handle rv-color__handle--line",e.append(o);let n=z(e,{onPointer(t){let a=r.min+t.x*(r.max-r.min);r.onChange(a)},onKey(t){var l;let a=Number((l=e.dataset.value)!=null?l:`${r.min}`),s=t.shiftKey?r.pageStep:r.step;if(t.key==="Home"){r.onChange(r.min);return}if(t.key==="End"){r.onChange(r.max);return}if(t.key==="ArrowLeft"||t.key==="ArrowDown"||t.key==="PageDown"){r.onChange(a-s);return}(t.key==="ArrowRight"||t.key==="ArrowUp"||t.key==="PageUp")&&r.onChange(a+s)}});return{element:e,render(t){var s;let a=x((r.getValue(t)-r.min)/(r.max-r.min),0,1);e.dataset.value=`${r.getValue(t)}`,o.style.setProperty("--rv-color-handle-color",r.handleColor(t)),rr(o,a),e.setAttribute("aria-valuemin",`${r.min}`),e.setAttribute("aria-valuemax",`${r.max}`),e.setAttribute("aria-valuenow",`${r.getValue(t)}`),e.setAttribute("aria-valuetext",r.getValueText(t)),(s=r.paint)==null||s.call(r,e,t)},destroy(){n()}}},tr=(r,e)=>or({className:"rv-color__slider rv-color__slider--hue",label:r,min:0,max:360,step:1,pageStep:10,getValue:o=>o.hsv.h,getValueText:o=>`${o.hsv.h} degrees`,onChange:e,handleColor:o=>`hsl(${o.hsv.h} 100% 50%)`}),ar=(r,e)=>or({className:"rv-color__slider rv-color__slider--alpha",label:r,min:0,max:1,step:.01,pageStep:.1,getValue:o=>o.alpha,getValueText:o=>`${Math.round(o.alpha*100)} percent`,onChange:e,handleColor:o=>o.hexa,paint:(o,n)=>{let t={...n.hsva,a:0};o.style.setProperty("--rv-color-alpha-from",M(t,"rgba")),o.style.setProperty("--rv-color-alpha-to",M(n,"rgba"))}});var nr=r=>{if(typeof r=="string"){let e=document.querySelector(r);if(!e)throw new TypeError(`Could not find element for selector: ${r}`);return e}if(!(r instanceof HTMLElement))throw new TypeError("Expected a selector string or an HTMLElement");return r};var lr="stackline-color-styles",Tr='.rv-color{--rv-color-max-width:320px;--rv-color-radius:14px;--rv-color-panel-height:228px;--rv-color-slider-height:16px;--rv-color-handle-size:18px;--rv-color-line-handle-width:14px;--rv-color-line-handle-height:24px;--rv-color-gap:12px;--rv-color-surface:#ffffff;--rv-color-border:rgba(15,23,42,.08);--rv-color-focus:#2563eb;--rv-color-shadow:0 10px 28px rgba(15,23,42,.08);--rv-color-checker-light:#ffffff;--rv-color-checker-dark:#d7deea;width:min(100%,var(--rv-color-max-width));display:grid;gap:var(--rv-color-gap);color:#0f172a;font:500 14px/1.2 ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;user-select:none}.rv-color,.rv-color *{box-sizing:border-box}.rv-color__surface{display:grid;gap:var(--rv-color-gap);padding:14px;border-radius:calc(var(--rv-color-radius) + 4px);background:var(--rv-color-surface);box-shadow:var(--rv-color-shadow);border:1px solid var(--rv-color-border)}.rv-color__area,.rv-color__slider{position:relative;touch-action:none;outline:none}.rv-color__area{height:var(--rv-color-panel-height);border-radius:var(--rv-color-radius);border:1px solid var(--rv-color-border);background:var(--rv-color-area-hue,hsl(0 100% 50%))}.rv-color__area::before,.rv-color__area::after{content:"";position:absolute;inset:0;border-radius:inherit}.rv-color__area::before{background:linear-gradient(90deg,#ffffff,rgba(255,255,255,0))}.rv-color__area::after{background:linear-gradient(0deg,#000000,rgba(0,0,0,0))}.rv-color__slider{height:var(--rv-color-slider-height);border-radius:999px;border:1px solid var(--rv-color-border)}.rv-color__slider--hue{background:linear-gradient(90deg,rgb(255,0,0) 0%,rgb(255,255,0) 16.66%,rgb(0,255,0) 33.33%,rgb(0,255,255) 50%,rgb(0,0,255) 66.66%,rgb(255,0,255) 83.33%,rgb(255,0,0) 100%)}.rv-color__slider--alpha{background-image:linear-gradient(45deg,var(--rv-color-checker-dark) 25%,transparent 25%),linear-gradient(-45deg,var(--rv-color-checker-dark) 25%,transparent 25%),linear-gradient(45deg,transparent 75%,var(--rv-color-checker-dark) 75%),linear-gradient(-45deg,transparent 75%,var(--rv-color-checker-dark) 75%),linear-gradient(90deg,var(--rv-color-alpha-from),var(--rv-color-alpha-to));background-position:0 0,0 6px,6px -6px,-6px 0,0 0;background-size:12px 12px,12px 12px,12px 12px,12px 12px,100% 100%;background-color:var(--rv-color-checker-light)}.rv-color__handle{position:absolute;top:50%;left:50%;width:var(--rv-color-handle-size);height:var(--rv-color-handle-size);border:2px solid #ffffff;border-radius:999px;background:var(--rv-color-handle-color,#ffffff);box-shadow:0 0 0 1px rgba(15,23,42,.18),0 4px 16px rgba(15,23,42,.18);transform:translate(-50%,-50%);pointer-events:none}.rv-color__handle--line{width:var(--rv-color-line-handle-width);height:var(--rv-color-line-handle-height)}.rv-color__interactive:focus-visible{outline:2px solid var(--rv-color-focus);outline-offset:2px}',D=r=>{if(typeof document=="undefined"||document.getElementById(lr))return;let e=document.createElement("style");e.id=lr,e.textContent=Tr,r&&e.setAttribute("nonce",r),document.head.append(e)};var Pr={area:"Saturation and value",hue:"Hue",alpha:"Alpha"},sr=()=>{let r=document.createElement("div");return r.className="rv-color__surface",r},V=r=>{var g,m,j,K;let e=nr(r.el);r.injectStyles!==!1&&D(r.styleNonce);let o={alpha:(g=r.alpha)!=null?g:!0,hue:(m=r.hue)!=null?m:!0,injectStyles:(j=r.injectStyles)!=null?j:!0,className:r.className,onChange:r.onChange,styleNonce:r.styleNonce,labels:{...Pr,...r.labels}},n=W((K=r.color)!=null?K:"#7c3aed"),t=document.createElement("div");t.className="rv-color",t.setAttribute("data-stackline-color",""),o.className&&t.classList.add(...o.className.split(/\s+/).filter(Boolean));let a=sr(),s=[],l=()=>{for(let d of s)d.destroy();s=[],a.remove()},i=()=>{l(),a=sr(),s.push(er({label:o.labels.area,onChange:(d,C)=>{n.setArea(d,C)}})),o.hue&&s.push(tr(o.labels.hue,d=>{n.setHue(d)})),o.alpha&&s.push(ar(o.labels.alpha,d=>{n.setAlpha(d)}));for(let d of s)a.append(d.element);t.append(a)},c=d=>{for(let C of s)C.render(d)},u=n.subscribe(d=>{var C;c(d),(C=o.onChange)==null||C.call(o,d)});i(),c(n.getSnapshot()),e.append(t);let h=d=>{t.className="rv-color",d&&t.classList.add(...d.split(/\s+/).filter(Boolean))};return{element:t,destroy(){u(),l(),t.remove()},getColor(){return n.getSnapshot()},setColor(d){return n.setColor(d)},update(d){o={...o,...d,labels:{...o.labels,...d.labels}},h(o.className),o.injectStyles!==!1&&D(o.styleNonce),(d.alpha!==void 0||d.hue!==void 0||d.className!==void 0||d.labels!==void 0)&&(i(),c(n.getSnapshot())),d.color!==void 0&&n.setColor(d.color)}}};var ir=r=>{r.innerHTML=`
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
  `;let e=r.querySelector("#playground-color"),o=r.querySelector("#playground-hue"),n=r.querySelector("#playground-alpha"),t=r.querySelector("#playground-reset"),a=r.querySelector("#playground-picker"),s=r.querySelector("#playground-swatch"),l=r.querySelector("#playground-output"),i=r.querySelector("#playground-source");if(!e||!o||!n||!t||!a||!s||!l||!i)return;let c=null,u=()=>{i.textContent=`import { createColorPicker } from "@stackline/color";

const picker = createColorPicker({
  el: "#picker",
  color: "${e.value}",
  hue: ${o.checked},
  alpha: ${n.checked},
  onChange: (color) => {
    console.log(color.hex, color.rgb, color.hsl);
  }
});`},h=()=>{c==null||c.destroy(),a.innerHTML="",u(),c=V({el:a,color:e.value,hue:o.checked,alpha:n.checked,onChange:m=>{s.style.background=m.hexa,l.textContent=JSON.stringify(m,null,2),document.body.style.background=`linear-gradient(180deg, rgba(${m.rgb.r}, ${m.rgb.g}, ${m.rgb.b}, 0.10), rgba(${m.rgb.r}, ${m.rgb.g}, ${m.rgb.b}, 0.28))`}});let g=c.getColor();s.style.background=g.hexa,l.textContent=JSON.stringify(g,null,2)};t.addEventListener("click",h),h()};var dr=document.querySelector("#app");if(!dr)throw new TypeError("Docs app root was not found.");var Er=L.map(r=>`
      <section id="${r.id}" class="panel">
        <div class="page__head">
          <span class="eyebrow">${r.eyebrow}</span>
          <h3>${r.title}</h3>
          <p>${r.description}</p>
        </div>
        <div>${r.body}</div>
      </section>
    `).join(""),_r=['<a href="#playground">Live Playground</a>',...L.map(r=>`<a href="#${r.id}">${r.title}</a>`)].join("");dr.innerHTML=`
  <div class="layout">
    <aside class="sidebar">
      <a class="brand" href="#playground">
        <span class="eyebrow">Stackline</span>
        <h1>@stackline/color</h1>
        <p>A tiny, framework-agnostic color picker foundation built for future wrappers and long-term ecosystem growth.</p>
      </a>
      <nav class="nav">
        ${_r}
      </nav>
    </aside>
    <main class="content">
      <div id="playground"></div>
      <section class="hero">
        <span class="eyebrow">Stable 1.0.1 release</span>
        <h2>Small, precise, and ready for wrappers.</h2>
        <p><strong>@stackline/color</strong> 1.0.1 preserves the stable HSV-based engine, modern vanilla picker, strong typing, accessible controls, and a clean path to React, Vue, and Angular wrappers.</p>
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
`;var cr=document.querySelector("#playground");cr&&ir(cr);
