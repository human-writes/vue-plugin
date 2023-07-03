(function(m,f){typeof exports=="object"&&typeof module<"u"?f(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],f):(m=typeof globalThis<"u"?globalThis:m||self,f(m.VuePlugin={},m.Vue))})(this,function(m,f){var K,P,S,R,X,Y,Z,Q,tt,nt,Tt,et,U,st,J,z;"use strict";var dt=(m,f,A)=>{if(!f.has(m))throw TypeError("Cannot "+A)};var g=(m,f,A)=>(dt(m,f,"read from private field"),A?A.call(m):f.get(m)),$=(m,f,A)=>{if(f.has(m))throw TypeError("Cannot add the same private member more than once");f instanceof WeakSet?f.add(m):f.set(m,A)},I=(m,f,A,q)=>(dt(m,f,"write to private field"),q?q.call(m,A):f.set(m,A),A);var bt=(m,f,A)=>(dt(m,f,"access private method"),A);const A="&lt;",q="&gt;",lt="/";class kt{constructor(t,e=!1){$(this,nt);$(this,K,[]);$(this,P,"");$(this,S,"");$(this,R,[]);$(this,X,[]);$(this,Y,[]);$(this,Z,[]);$(this,Q,[]);$(this,tt,[]);I(this,P,t.trim()),I(this,S,`${g(this,P)}
<Eof />`),this.protect(),e&&this.markupQuotes(),this.collectWords(g(this,S)),this.makeMistakes()}get list(){return g(this,K)}get text(){return g(this,P)}get workingText(){return g(this,S)}get words(){return g(this,R)}get mistakes(){return g(this,Q)}get mistakeCursors(){return g(this,tt)}get phraseStarts(){return g(this,X)}get phraseLengths(){return g(this,Y)}get wordEnds(){return g(this,Z)}translateBracket(t,e,i=!1){let n=t,s=!1;return"CDETQRG".includes(e)&&(e==="C"&&(n=i?")":"(",s=!0),e==="D"&&(n=i?"}}":"{{",s=!0),e==="E"&&(n=i?"}":"{",s=!0),e==="T"&&(n=i?"]":"[",s=!0),e==="Q"&&(n="'",s=!0),e==="R"&&(n='"',s=!0),e==="G"&&(n="`",s=!0)),{word:n,translated:s}}markupQuotes(){let t=g(this,S);const e=/(["'`])((\s|((\\)*)\\.|.)*?)\1/gm;let i;const n=[];for(;(i=e.exec(t))!==null;)i.index===e.lastIndex&&e.lastIndex++,n.push(i);for(let s=n.length-1;s>-1;s--){const l=n[s],r=l[1],u=l[0];let o=l[2];const h=l.index+1,d=h+u.length-1;let x="";r==='"'?x="R":r==="'"?x="Q":r==="`"&&(x="G"),o=o.replace(/&lt;/g,"&pp;"),o=o.replace(/&gt;/g,"&pg;");const E=`&oq;${x}&cq;${o}&oq;/${x}&cq;`,L=t.substring(0,h-1),w=t.substring(d);t=L+E+w}I(this,S,t)}doAttributes(t){const e={},i=/([\w]*)(\[\])?=("([\S ][^"]*)"|'([\S]*)'|\{\{ ([\w]*) \}\}|\{([\S ]*)\})/gm;let n;const s=[];for(;(n=i.exec(t))!==null;)n.index===i.lastIndex&&i.lastIndex++,s.push(n);for(let l=0;l<s.length;l++){const r=s[l],u=r[1],o=r[2],h=r[3].substring(0,1),d=r[4];o==="[]"?(e[u]===void 0&&(e[u]=[]),e[u].push(h+d)):e[u]=`${h}${d}`}return e}isClosedTag(t){let e=!1;const{text:i}=t;return i===""||(e=i.substring(i.length-5,i.length)===lt+q),e}isCloserTag(t){let e=!1;const{text:i}=t;return i===""||(e=i.substring(0,5)===A+lt),e}makeTag(t,e,i,n,s=!1){const{text:l}=t,{name:r}=t,u=this.list.length,o={};return o.id=t.id,o.name=r===""?"Fragment":r,o.text=l,o.startsAt=t.startsAt,o.endsAt=t.endsAt,s||(o.uid=bt(this,nt,Tt),o.method="echo",o.props=o.name==="Fragment"?[]:[],o.depth=i,o.hasCloser=n,o.node=!1,o.isSingle=!1),(e[i]===void 0||e[i]===null)&&(e[i]=u-1),o.parentId=e[i],o}protect(){let t=g(this,S);t=t.trim(),t=t.replace(/\{\{/g,"<D>"),t=t.replace(/\}\}/g,"</D>"),t=t.replace(/\(/g,"<C>"),t=t.replace(/\)/g,"</C>"),t=t.replace(/\{/g,"<E>"),t=t.replace(/\}/g,"</E>"),t=t.replace(/\[/g,"<T>"),t=t.replace(/\]/g,"</T>"),t=t.replace(/<([/\w])/g,`${A}$1`),t=t.replace(/>/g,q),I(this,S,t)}collectTags(t,e="[\\w]+"){const i=[],n=[],s=`${A}\\/?(${e})((\\s|.*?)*?)\\/?${q}`,l=new RegExp(s,"gm");let r;for(;(r=l.exec(t))!==null;)r.index===l.lastIndex&&l.lastIndex++,n.push(r);let u=0;return n.forEach(o=>{const h=o;h.id=u,h.text=o[0],h.name=o[1]===null?"Fragment":o[1],h.startsAt=o.index,h.endsAt=o.index+h.text.length-1,delete h[0],delete h[1],delete h[2],delete h[3],i.push(h),u++}),i}collectWords(t){const e=[],i=[];let n=/([&oqpg;]{4})[\w /]+([&cqpp;]{4})/gm,s;for(;(s=n.exec(t))!==null;)s.index===n.lastIndex&&n.lastIndex++,i.push(s);let l=t;for(let r=i.length-1;r>-1;r--){const u=i[r][0],o=i[r].index+1,h=o+u.length-1,d="•".repeat(u.length),x=l.substring(0,o-1),E=l.substring(h);l=x+d+E}for(n=/([&lt;]{4})[\w /]+([&gt;]{4})/gm;(s=n.exec(l))!==null;)s.index===n.lastIndex&&n.lastIndex++,i.push(s);for(let r=i.length-1;r>-1;r--){const u=i[r][0],o=i[r].index+1,h=o+u.length-1,d="•".repeat(u.length),x=l.substring(0,o-1),E=l.substring(h);l=x+d+E}for(n=/([&ltgt;]{4})/gm;(s=n.exec(l))!==null;)s.index===n.lastIndex&&n.lastIndex++,i.push(s);for(let r=i.length-1;r>-1;r--){const u=i[r][0],o=i[r].index+1,h=o+u.length-1,d="•".repeat(u.length),x=l.substring(0,o-1),E=l.substring(h);l=x+d+E}for(n=/((?!•)\S[^•\n]*)/g;(s=n.exec(l))!==null;)s.index===n.lastIndex&&n.lastIndex++,g(this,X).push(s.index),g(this,Y).push(s[0].length);for(n=/((?!•)\S[^•\n ]*)/g;(s=n.exec(l))!==null;){s.index===n.lastIndex&&n.lastIndex++;const r={};r.text=s[0],r.startsAt=s.index,r.endsAt=r.startsAt+s[0].length-1,e.push(r),g(this,Z).push(r.endsAt)}I(this,R,e)}makeMistakes(){let t=Math.ceil(Math.random()*2)-2;const e=Math.ceil(Math.random()*3)+2;g(this,R).forEach(i=>{if(t++,t%e!==0||i.text.length<4)return;const n=Math.ceil(Math.random()*i.text.length)-1,s=String.fromCharCode(Math.ceil(Math.random()*26)+96);g(this,tt).push(i.startsAt+n),g(this,Q).push(s)})}makeFaultyText(){let t=g(this,S);g(this,Q).forEach(e=>{const i=t.substring(0,e.startsAt),n=t.substring(e.endsAt+1);t=i+e.text+n}),I(this,S,t)}splitTags(t){let e=[...t],i=e.length,n=0,s=!1,l=0;const r=i;let u=!1;const o=[],h=[];for(;e.length>0&&!s&&!u;){if(n===i){if(n=0,e=Object.values(e),i=e.length,i===0){s=!0;continue}l++,u=l>r+1}const d=e[n];if(e.length===1&&d.name==="Eof"){s=!0;continue}if(this.isClosedTag(d)&&d.name!=="Eof"){h[n]=e[n],delete e[n],n++;continue}if(n+1<i){const x=e[n+1];if(!this.isCloserTag(d)&&this.isCloserTag(x)){if(d.name!==x.name){o.push(d),delete e[n],n++;continue}h[n]=e[n],h[n+1]=e[n+1],delete e[n],delete e[n+1],n+=2;continue}}n++}return{regularTags:h,singleTags:o}}replaceTags(t,e){let i=t,n=e;const s=[];e.forEach(l=>{s[l.id]=l}),s.sort(),n=Object.values(s);for(let l=n.length-1;l>-1;l--){const r=n[l];r.text=r.text.substring(0,r.text.length-4)+lt+q;const u=i.substring(0,r.startsAt),o=i.substring(r.endsAt+1);i=u+r.text+o}return i}doComponents(t="[\\w]+"){let e=g(this,S);const i=this.collectTags(e,t),n=[];let s=[],l=0;const r=[];let u=i.length,o=0,h=!1,d=0;const x=u;let E=!1;r[l]=-1;const{singleTags:L}=this.splitTags(i);let w=i;for(L.length&&(L.forEach(_=>n.push(_.id)),e=this.replaceTags(e,L),w=this.collectTags(e,t));w.length>0&&!h&&!E;){if(o===u){if(o=0,w=Object.values(w),u=w.length,u===0){h=!0;continue}d++,E=d>x+1}const _=w[o];if(w.length===1&&_.name==="Eof"){h=!0;continue}if(this.isClosedTag(_)&&_.name!=="Eof"){const j=this.makeTag(_,r,l,!1);j.isSingle=n.includes(_.id),s[j.id]=j,delete w[o],o++;continue}if(this.isCloserTag(_)&&l--,o+1<u){const j=w[o+1];if(!this.isCloserTag(_)&&this.isCloserTag(j)){const W=this.makeTag(_,r,l,!0),O=this.makeTag(j,r,l,!1,!0);O.contents={},O.parentId=W.id,O.contents.startsAt=W.endsAt+1,O.contents.endsAt=O.startsAt;const rt=e.substring(O.contents.startsAt,O.contents.endsAt);O.contents.text=rt,W.closer=O,s[W.id]=W,delete w[o],delete w[o+1],o+=2;continue}!this.isCloserTag(_)&&!this.isCloserTag(j)&&(l++,r[l]=_.id)}o++}s=Object.values(s),I(this,S,e),I(this,K,s)}}K=new WeakMap,P=new WeakMap,S=new WeakMap,R=new WeakMap,X=new WeakMap,Y=new WeakMap,Z=new WeakMap,Q=new WeakMap,tt=new WeakMap,nt=new WeakSet,Tt=function(){return Date.now()*Math.random()};const v="&lt;",M="&gt;",B="<",H=">",F="/",N=`
`;class ut{constructor(t,e,i,n,s){$(this,et,"");$(this,U,60);$(this,st,!1);$(this,J,()=>{});$(this,z,()=>{});I(this,J,t),I(this,et,e),I(this,U,i),I(this,z,s),I(this,st,n)}async writeLikeAHuman(t,e){const i=e!==void 0,n=g(this,J).querySelector(`pre#${e} code`),s=g(this,J).querySelector(i?`pre#${t} code`:`div#${t}`);let l=g(this,U),r=[],u="",o="",h="",d=null,x=[];const E=[];let L="",w="",_=-1;const j=[],W=[];let O=0,rt=this;function pt(c){return new Promise(a=>{setTimeout(a,c)})}function Ot(c){return Math.floor(c*.75+Math.random()*c)}async function C(c,a=!1){let T=r.join("");a&&(T=T.trim()),l=Ot(g(rt,U)),u+=c,s.innerHTML=u+T,i&&window.hljs!==void 0&&window.hljs.highlightElement(s),await pt(l)}async function It(){const c=r.join("");u=u.substring(0,u.length-1),s.innerHTML=u+c,await pt(l)}function V(c){r.unshift(c)}function it(){delete r[0],r=Object.values(r)}function vt(c){const a=[],T=/^([^\S][ \s]+)*/gm;let D;for(;(D=T.exec(c))!==null;)D.index===T.lastIndex&&T.lastIndex++,a.push(D[0]??"");return a}function Lt(c){const a=/^([^\S][ \s]+)*/gm;return c.replace(a,"")}function Mt(c){const a=c.split(`
`);return"<br />".repeat(a.length)}async function jt(c){let a="";return await fetch(c).then(T=>T.text()).then(T=>{a=T}),a}function Dt(c){return c.replaceAll(v,B).replaceAll(M,H)}function Bt(){let c=null;return x.length&&(c=x.shift(),c.hasCloser&&E.push(c)),c}function Nt(){return E.length?E[E.length-1]:null}function Wt(){if(!j.length)return null;const c=j.pop(),a=W.pop();V(a?N+o+c:c)}function mt(c){let a=null;if(!E.length||(a=Nt(),c===a.depth))return a;let T=!1;for(let D=E.length-1;D>-1;D--)if(a=E[D],c===a.depth){T=!0;break}return T?a:null}const qt=g(this,et);i&&window.hljs!==void 0&&window.hljs.highlightElement(n),L=await jt(qt);const xt=vt(L);L=Lt(L);const b=new kt(L,i);b.doComponents(),x=[...b.list],w=b.workingText.replace(`${N+v}Eof ${F}${M}`,""),i&&(n.innerHTML=Mt(L+`
`));const Ht=xt[O]??"";await C(Ht),O++;for(let c=0;c<w.length;c++){let a=w[c];if(i&&a===B){a=v,await C(a);continue}if(g(this,st)&&b.mistakes.length&&b.phraseStarts.length&&b.phraseStarts[0]===c){const k=b.phraseLengths[0];for(let p=0;p<k;p++){const G=c+p,at=b.mistakeCursors[0];if(a=w[G],at===G?await C(b.mistakes[0]):await C(a),b.wordEnds.includes(G)&&b.mistakeCursors.length){const ot=b.mistakeCursors[0];if(ot<=G){const ct=G-ot+1;for(let wt=0;wt<ct;wt++)await It(),p--;b.mistakes.shift(),b.mistakeCursors.shift()}}}b.phraseStarts.shift(),b.phraseLengths.shift(),c+=k-1;continue}const T=w.substring(c,c+4),D=w.substring(c,c+5);if(a==="&"&&D==="&oq;/"){const k=w.substring(c+5,c+6),{word:p}=b.translateBracket(a,k);it(),await C(p),c+=9;continue}if(a==="&"&&T==="&oq;"){const k=w.substring(c+4,c+5),{word:p}=b.translateBracket(a,k);V(p),await C(p),c+=8;continue}if(a==="&"&&T==="&pp;"){c+=3,await C(v);continue}if(a==="&"&&T==="&pg;"){c+=3,await C(M);continue}if(i){if(a==="/"&&D===F+M&&d!==null&&!d.hasCloser&&d.endsAt===c+4){a=F+M,it(),await C(a),c+=4;continue}if(a==="&"&&T===M&&d!==null&&d.endsAt===c+3){it(),await C(M),d.hasCloser&&Wt(),c+=3;continue}}if(a==="&"&&D===v+F){d=mt(_),d===null&&_-1>-1&&(d=mt(_-1)),a=d.closer.text,i||(a=B+F+d.closer.name+H);const{word:k}=b.translateBracket(a,d.name,!0);if(a=k,a!==""){it(),c=d.closer.endsAt,await C(a),_--,d=null;continue}}if(a==="&"&&T!==v){const k=w.substring(c).indexOf(";");if(k>8){await C(a);continue}const p=w.substring(c,c+k+1);await C(p),c+=p.length-1;continue}if(a==="&"&&T===v){if((d===null||d!==null&&d.dirty)&&(d=Bt()),d.startsAt!==c){i?(a=v,c+=3):(a=d.text.replace(v,B),a=a.replace(M,H)),await C(a),d.dirty=!1;continue}d.dirty=!0;let k=!1,p="";a=d.text,i||(a=d.text.replace(v,B),a=a.replace(M,H));const{word:G,translated:at}=b.translateBracket(a,d.name);if(a=G,d.hasCloser){_++,p=d.closer.text,i||(p=B+F+d.closer.name+H);const{word:ot,translated:ct}=b.translateBracket(p,d.name,!0);p=ot,k=d.closer.contents.text.indexOf(N)>-1,ct?(c=d.endsAt,V(k?N+o+p:p)):(j.push(p),W.push(k))}at||(k=d.text.indexOf(N)>-1,i?(a=v,c+=3,p=M):(a=d.text.replace(v,B),a=a.replace(M,H),c+=d.text.length-1,p=B+F+d.closer.name+H),V(k?N+o+p:p)),await C(a);continue}if(a===N){o=xt[O]??"",h=N+o;const k=r.length?r[0].trim():"",p=w.substring(c+1,c+k.length+1);O++,await C(h,k===p);continue}await C(a)}u=Dt(u),this.finishedEvent(u)}finishedEvent(t){typeof g(this,z)=="function"&&g(this,z).call(this,t)}}et=new WeakMap,U=new WeakMap,st=new WeakMap,J=new WeakMap,z=new WeakMap;const Ft="",Vt="",yt=(y,t)=>{const e=y.__vccOpts||y;for(const[i,n]of t)e[i]=n;return e},ht=y=>(f.pushScopeId("data-v-9d52d956"),y=y(),f.popScopeId(),y),Et=[ht(()=>f.createElementVNode("div",{class:"to-be-copied"},[f.createElementVNode("pre",{id:"to-copy"},[f.createElementVNode("code")])],-1)),ht(()=>f.createElementVNode("div",{class:"to-be-written"},[f.createElementVNode("pre",{id:"to-write"},[f.createElementVNode("code")])],-1))],_t=f.defineComponent({name:"CodeWriter"}),ft=yt(Object.assign(_t,{props:{source:{default:""},speed:{default:20},dependsOnSelector:{default:""},makeTypos:{default:!1},styles:{default:""},classes:{default:""},finished:{default:!1},restart:{default:!1},useHighlightJs:{default:!1},theme:{default:"base16/monokai"},language:{default:"html"}},setup(y){const t=y,e=f.ref(null);f.onMounted(async()=>{const s=e.value.ownerDocument;if(t.useHighlightJs){const l=t.theme??"base16/monokai",r=t.language??"html",u=s.createElement("script");u.src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js",s.head.appendChild(u);const o=[];o.push("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css"),o.push(`https://highlightjs.org/static/demo/styles/${l}.css`),o.forEach(d=>{const x=s.createElement("style");x.innerHTML=`@import "${d}"`,s.head.appendChild(x)});const h=s.querySelectorAll("code");for(const d of h)d.setAttribute("class",`language-${r}`)}if(t.styles!==""&&t.classes!==""&&(t.styles.split(",").forEach(u=>{const o=s.createElement("style");o.innerHTML=`@import "${u}"`,s.head.appendChild(o)}),s.getElementById("to-write").setAttribute("class",t.classes)),t.dependsOnSelector!==""){const l=s.querySelector(t.dependsOnSelector);if(l!==null){const r={attributes:!0};new MutationObserver(async(o,h)=>{for(const d of o)d.type==="attributes"&&d.attributeName==="finished"&&l.getAttribute("finished")==="true"&&(h.disconnect(),await n())}).observe(l,r)}}else await n()});const i=function(s){const l=new CustomEvent("finishedWriting",{bubbles:!0,cancellable:!0,detail:{content:s}});e.value.dispatchEvent(l),e.value.setAttribute("finished","true")},n=async()=>{const s=e.value.ownerDocument,l=f.inject("writerOptions");console.log({writerOptions:l});const r=t.speed,u=t.makeTypos;await new ut(s,t.source,r,u,i).writeLikeAHuman("to-write","to-copy")};return(s,l)=>(f.openBlock(),f.createElementBlock("div",{ref_key:"root",ref:e,class:"code-snippet"},Et,512))}}),[["__scopeId","data-v-9d52d956"]]),Ct=[f.createElementVNode("div",{class:"to-be-written"},[f.createElementVNode("div",{id:"to-write"})],-1)],At=f.defineComponent({name:"TextWriter"}),gt=Object.assign(At,{props:{source:{default:""},speed:{default:"60"},dependsOnSelector:{default:""},makeTypos:{default:!1},styles:{default:""},classes:{default:""},finished:{default:!1},restart:{default:!1}},setup(y){const t=y,e=f.ref(null);f.onMounted(async()=>{const s=e.value.ownerDocument;if(t.styles!==""&&t.classes!==""&&(t.styles.split(",").forEach(u=>{const o=s.createElement("style");o.innerHTML=`@import "${u}"`,s.head.appendChild(o)}),s.getElementById("to-write").setAttribute("class",t.classes)),t.dependsOnSelector!==""){const l=s.querySelector(t.dependsOnSelector);if(l!==null){const r={attributes:!0};new MutationObserver(async(o,h)=>{for(const d of o)d.type==="attributes"&&d.attributeName==="finished"&&l.getAttribute("finished")==="true"&&(h.disconnect(),await n())}).observe(l,r)}}else await n()});const i=function(s){const l=new CustomEvent("finishedWriting",{bubbles:!0,cancellable:!0,detail:{content:s}});e.value.dispatchEvent(l),e.value.setAttribute("finished","true")},n=async()=>{const s=e.value.ownerDocument;await new ut(s,t.source,t.speed,t.makeTypos,i).writeLikeAHuman("to-write")};return(s,l)=>(f.openBlock(),f.createElementBlock("div",{ref_key:"root",ref:e,class:"text-snippet"},Ct,512))}}),$t=y=>({textSpeed:y.speed,textTypos:y.makeTypos}),St={install(y,t){y.provide("writerOptions",$t(t)),y.component("TextWriter",gt),y.component("CodeWriter",ft)}};m.CodeWriter=ft,m.TextWriter=gt,m.VueWriterPlugin=St,Object.defineProperty(m,Symbol.toStringTag,{value:"Module"})});
