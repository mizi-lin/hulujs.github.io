(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const r of e.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&c(r)}).observe(document,{childList:!0,subtree:!0});function i(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function c(t){if(t.ep)return;t.ep=!0;const e=i(t);fetch(t.href,e)}})();const h="modulepreload",m=function(o){return"/hulujs.github.io/"+o},a={},f=function(n,i,c){if(!i||i.length===0)return n();const t=document.getElementsByTagName("link");return Promise.all(i.map(e=>{if(e=m(e),e in a)return;a[e]=!0;const r=e.endsWith(".css"),d=r?'[rel="stylesheet"]':"";if(!!c)for(let l=t.length-1;l>=0;l--){const u=t[l];if(u.href===e&&(!r||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${d}`))return;const s=document.createElement("link");if(s.rel=r?"stylesheet":h,r||(s.as="script",s.crossOrigin=""),s.href=e,document.head.appendChild(s),r)return new Promise((l,u)=>{s.addEventListener("load",l),s.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${e}`)))})})).then(()=>n()).catch(e=>{const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=e,window.dispatchEvent(r),!r.defaultPrevented)throw e})};Promise.all([f(()=>import("./root-17bd990c.js"),["assets/root-17bd990c.js","assets/jsx-runtime-eab19201.js","assets/react-c9cfb105.js","assets/react-dom-26dc6dd6.js","assets/recoil-683f5e9e.js"]),f(()=>import("./app-17122a22.js").then(o=>o.aj),["assets/app-17122a22.js","assets/jsx-runtime-eab19201.js","assets/react-c9cfb105.js","assets/react-router-dom-95ce7bcb.js","assets/react-dom-26dc6dd6.js"])]).then(([{render:o},{App:n}])=>{o(n)});export{f as _};