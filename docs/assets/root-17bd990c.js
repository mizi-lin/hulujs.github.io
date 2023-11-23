import{j as g}from"./jsx-runtime-eab19201.js";import{g as $,a as j,r as H,b as G}from"./react-c9cfb105.js";import{r as z}from"./react-dom-26dc6dd6.js";import{e as V,f as J,g as Q}from"./recoil-683f5e9e.js";var U,N=z;U=N.createRoot,N.hydrateRoot;var q={exports:{}},X="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",Z=X,ee=Z;function B(){}function K(){}K.resetWarningCache=B;var te=function(){function e(r,i,u,c,a,f){if(f!==ee){var T=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw T.name="Invariant Violation",T}}e.isRequired=e;function t(){return e}var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:K,resetWarningCache:B};return n.PropTypes=n,n};q.exports=te();var re=q.exports;const o=$(re);function ne(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,M(e,t)}function M(e,t){return M=Object.setPrototypeOf||function(n,r){return n.__proto__=r,n},M(e,t)}var s={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title",FRAGMENT:"Symbol(react.fragment)"},oe={rel:["amphtml","canonical","alternate"]},ie={type:["application/ld+json"]},ae={charset:"",name:["robots","description"],property:["og:type","og:title","og:url","og:image","og:image:alt","og:description","twitter:url","twitter:title","twitter:description","twitter:image","twitter:image:alt","twitter:card","twitter:site"]};Object.keys(s).map(function(e){return s[e]});var A={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"};Object.keys(A).reduce(function(e,t){return e[A[t]]=t,e},{});var ce=function(e){return Array.isArray(e)?e.join(""):e},k=function(e,t){return Array.isArray(e)?e.reduce(function(n,r){return function(i,u){for(var c=Object.keys(i),a=0;a<c.length;a+=1)if(u[c[a]]&&u[c[a]].includes(i[c[a]]))return!0;return!1}(r,t)?n.priority.push(r):n.default.push(r),n},{priority:[],default:[]}):{default:e}},se=[s.NOSCRIPT,s.SCRIPT,s.STYLE],L=function(e,t){return t===void 0&&(t=!0),t===!1?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},D=function(e){return Object.keys(e).reduce(function(t,n){var r=e[n]!==void 0?n+'="'+e[n]+'"':""+n;return t?t+" "+r:r},"")},w=function(e,t){return t===void 0&&(t={}),Object.keys(e).reduce(function(n,r){return n[A[r]||r]=e[r],n},t)},S=function(e,t){return t.map(function(n,r){var i,u=((i={key:r})["data-rh"]=!0,i);return Object.keys(n).forEach(function(c){var a=A[c]||c;a==="innerHTML"||a==="cssText"?u.dangerouslySetInnerHTML={__html:n.innerHTML||n.cssText}:u[a]=n[c]}),j.createElement(e,u)})},l=function(e,t,n){switch(e){case s.TITLE:return{toComponent:function(){return i=t.titleAttributes,(u={key:r=t.title})["data-rh"]=!0,c=w(i,u),[j.createElement(s.TITLE,c,r)];var r,i,u,c},toString:function(){return function(r,i,u,c){var a=D(u),f=ce(i);return a?"<"+r+' data-rh="true" '+a+">"+L(f,c)+"</"+r+">":"<"+r+' data-rh="true">'+L(f,c)+"</"+r+">"}(e,t.title,t.titleAttributes,n)}};case"bodyAttributes":case"htmlAttributes":return{toComponent:function(){return w(t)},toString:function(){return D(t)}};default:return{toComponent:function(){return S(e,t)},toString:function(){return function(r,i,u){return i.reduce(function(c,a){var f=Object.keys(a).filter(function(d){return!(d==="innerHTML"||d==="cssText")}).reduce(function(d,y){var h=a[y]===void 0?y:y+'="'+L(a[y],u)+'"';return d?d+" "+h:h},""),T=a.innerHTML||a.cssText||"",R=se.indexOf(r)===-1;return c+"<"+r+' data-rh="true" '+f+(R?"/>":">"+T+"</"+r+">")},"")}(e,t,n)}}}},ue=function(e){var t=e.baseTag,n=e.bodyAttributes,r=e.encode,i=e.htmlAttributes,u=e.noscriptTags,c=e.styleTags,a=e.title,f=a===void 0?"":a,T=e.titleAttributes,R=e.linkTags,d=e.metaTags,y=e.scriptTags,h={toComponent:function(){},toString:function(){return""}};if(e.prioritizeSeoTags){var O=function(E){var Y=E.linkTags,W=E.scriptTags,C=E.encode,P=k(E.metaTags,ae),_=k(Y,oe),I=k(W,ie);return{priorityMethods:{toComponent:function(){return[].concat(S(s.META,P.priority),S(s.LINK,_.priority),S(s.SCRIPT,I.priority))},toString:function(){return l(s.META,P.priority,C)+" "+l(s.LINK,_.priority,C)+" "+l(s.SCRIPT,I.priority,C)}},metaTags:P.default,linkTags:_.default,scriptTags:I.default}}(e);h=O.priorityMethods,R=O.linkTags,d=O.metaTags,y=O.scriptTags}return{priority:h,base:l(s.BASE,t,r),bodyAttributes:l("bodyAttributes",n,r),htmlAttributes:l("htmlAttributes",i,r),link:l(s.LINK,R,r),meta:l(s.META,d,r),noscript:l(s.NOSCRIPT,u,r),script:l(s.SCRIPT,y,r),style:l(s.STYLE,c,r),title:l(s.TITLE,{title:f,titleAttributes:T},r)}},x=[],le=function(e,t){var n=this;t===void 0&&(t=typeof document<"u"),this.instances=[],this.value={setHelmet:function(r){n.context.helmet=r},helmetInstances:{get:function(){return n.canUseDOM?x:n.instances},add:function(r){(n.canUseDOM?x:n.instances).push(r)},remove:function(r){var i=(n.canUseDOM?x:n.instances).indexOf(r);(n.canUseDOM?x:n.instances).splice(i,1)}}},this.context=e,this.canUseDOM=t,t||(e.helmet=ue({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}}))},pe=j.createContext({}),fe=o.shape({setHelmet:o.func,helmetInstances:o.shape({get:o.func,add:o.func,remove:o.func})}),de=typeof document<"u",v=function(e){function t(n){var r;return(r=e.call(this,n)||this).helmetData=new le(r.props.context,t.canUseDOM),r}return ne(t,e),t.prototype.render=function(){return j.createElement(pe.Provider,{value:this.helmetData.value},this.props.children)},t}(H.Component);v.canUseDOM=de,v.propTypes={context:o.shape({helmet:o.shape()}),children:o.node.isRequired},v.defaultProps={context:{}},v.displayName="HelmetProvider";fe.isRequired;o.object,o.object,o.oneOfType([o.arrayOf(o.node),o.node]),o.string,o.bool,o.bool,o.object,o.arrayOf(o.object),o.arrayOf(o.object),o.arrayOf(o.object),o.func,o.arrayOf(o.object),o.arrayOf(o.object),o.string,o.object,o.string,o.bool,o.object;var p={};const F=G(V);Object.defineProperty(p,"__esModule",{value:!0});p.resetRecoil=p.setRecoil=p.getRecoilPromise=p.getRecoil=void 0;var me=F,b=F,m={};function ye(){m.get=(0,b.useRecoilCallback)(function(n){var r=n.snapshot;return function(i){return r.getLoadable(i).contents}},[]),m.getPromise=(0,b.useRecoilCallback)(function(n){var r=n.snapshot;return function(i){return r.getPromise(i)}},[]);var e=(0,me.useGetRecoilValueInfo_UNSTABLE)(),t=(0,b.useRecoilTransaction_UNSTABLE)(function(n){var r=n.set;return r});return m.set=(0,b.useRecoilCallback)(function(n){var r=n.set;return function(i,u){var c={atom:t,selector:r}[e(i).type];c(i,u)}},[]),m.reset=(0,b.useRecoilCallback)(function(n){var r=n.reset;return r},[]),null}var Te=p.default=ye;function he(e){return m.get(e)}p.getRecoil=he;function ge(e){return m.getPromise(e)}p.getRecoilPromise=ge;function be(e,t){m.set(e,t)}p.setRecoil=be;function ve(e){m.reset(e)}p.resetRecoil=ve;Q.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED=!1;function Se(e){const t=document.getElementById("root");U(t).render(g.jsx(H.StrictMode,{children:g.jsxs(J,{children:[g.jsx(Te,{}),g.jsx(v,{children:g.jsx(e,{})})]})}))}export{Se as render};