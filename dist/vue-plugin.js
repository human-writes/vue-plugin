var rt = (g, t, e) => {
  if (!t.has(g))
    throw TypeError("Cannot " + e);
};
var f = (g, t, e) => (rt(g, t, "read from private field"), e ? e.call(g) : t.get(g)), A = (g, t, e) => {
  if (t.has(g))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(g) : t.set(g, e);
}, v = (g, t, e, n) => (rt(g, t, "write to private field"), n ? n.call(g, e) : t.set(g, e), e);
var gt = (g, t, e) => (rt(g, t, "access private method"), e);
import { defineComponent as pt, ref as mt, onMounted as xt, openBlock as wt, createElementBlock as bt, createElementVNode as B } from "vue";
const at = "&lt;", st = "&gt;", ct = "/";
var V, N, $, G, J, z, K, R, X, nt, Tt;
class jt {
  constructor(t, e = !1) {
    A(this, nt);
    A(this, V, []);
    A(this, N, "");
    A(this, $, "");
    A(this, G, []);
    A(this, J, []);
    A(this, z, []);
    A(this, K, []);
    A(this, R, []);
    A(this, X, []);
    v(this, N, t.trim()), v(this, $, `${f(this, N)}
<Eof />`), this.protect(), e && this.markupQuotes(), this.collectWords(f(this, $)), this.makeMistakes();
  }
  get list() {
    return f(this, V);
  }
  get text() {
    return f(this, N);
  }
  get workingText() {
    return f(this, $);
  }
  get words() {
    return f(this, G);
  }
  get mistakes() {
    return f(this, R);
  }
  get mistakeCursors() {
    return f(this, X);
  }
  get phraseStarts() {
    return f(this, J);
  }
  get phraseLengths() {
    return f(this, z);
  }
  get wordEnds() {
    return f(this, K);
  }
  translateBracket(t, e, n = !1) {
    let i = t, s = !1;
    return "CDETQRG".includes(e) && (e === "C" && (i = n ? ")" : "(", s = !0), e === "D" && (i = n ? "}}" : "{{", s = !0), e === "E" && (i = n ? "}" : "{", s = !0), e === "T" && (i = n ? "]" : "[", s = !0), e === "Q" && (i = "'", s = !0), e === "R" && (i = '"', s = !0), e === "G" && (i = "`", s = !0)), { word: i, translated: s };
  }
  markupQuotes() {
    let t = f(this, $);
    const e = /(["'`])((\s|((\\)*)\\.|.)*?)\1/gm;
    let n;
    const i = [];
    for (; (n = e.exec(t)) !== null; )
      n.index === e.lastIndex && e.lastIndex++, i.push(n);
    for (let s = i.length - 1; s > -1; s--) {
      const o = i[s], r = o[1], d = o[0];
      let l = o[2];
      const h = o.index + 1, u = h + d.length - 1;
      let m = "";
      r === '"' ? m = "R" : r === "'" ? m = "Q" : r === "`" && (m = "G"), l = l.replace(/&lt;/g, "&pp;"), l = l.replace(/&gt;/g, "&pg;");
      const k = `&oq;${m}&cq;${l}&oq;/${m}&cq;`, _ = t.substring(0, h - 1), x = t.substring(u);
      t = _ + k + x;
    }
    v(this, $, t);
  }
  doAttributes(t) {
    const e = {}, n = /([\w]*)(\[\])?=("([\S ][^"]*)"|'([\S]*)'|\{\{ ([\w]*) \}\}|\{([\S ]*)\})/gm;
    let i;
    const s = [];
    for (; (i = n.exec(t)) !== null; )
      i.index === n.lastIndex && n.lastIndex++, s.push(i);
    for (let o = 0; o < s.length; o++) {
      const r = s[o], d = r[1], l = r[2], h = r[3].substring(0, 1), u = r[4];
      l === "[]" ? (e[d] === void 0 && (e[d] = []), e[d].push(h + u)) : e[d] = `${h}${u}`;
    }
    return e;
  }
  isClosedTag(t) {
    let e = !1;
    const { text: n } = t;
    return n === "" || (e = n.substring(n.length - 5, n.length) === ct + st), e;
  }
  isCloserTag(t) {
    let e = !1;
    const { text: n } = t;
    return n === "" || (e = n.substring(0, 5) === at + ct), e;
  }
  makeTag(t, e, n, i, s = !1) {
    const { text: o } = t, { name: r } = t, d = this.list.length, l = {};
    return l.id = t.id, l.name = r === "" ? "Fragment" : r, l.text = o, l.startsAt = t.startsAt, l.endsAt = t.endsAt, s || (l.uid = gt(this, nt, Tt), l.method = "echo", l.props = l.name === "Fragment" ? [] : [], l.depth = n, l.hasCloser = i, l.node = !1, l.isSingle = !1), (e[n] === void 0 || e[n] === null) && (e[n] = d - 1), l.parentId = e[n], l;
  }
  protect() {
    let t = f(this, $);
    t = t.trim(), t = t.replace(/\{\{/g, "<D>"), t = t.replace(/\}\}/g, "</D>"), t = t.replace(/\(/g, "<C>"), t = t.replace(/\)/g, "</C>"), t = t.replace(/\{/g, "<E>"), t = t.replace(/\}/g, "</E>"), t = t.replace(/\[/g, "<T>"), t = t.replace(/\]/g, "</T>"), t = t.replace(/<([/\w])/g, `${at}$1`), t = t.replace(/>/g, st), v(this, $, t);
  }
  collectTags(t, e = "[\\w]+") {
    const n = [], i = [], s = `${at}\\/?(${e})((\\s|.*?)*?)\\/?${st}`, o = new RegExp(s, "gm");
    let r;
    for (; (r = o.exec(t)) !== null; )
      r.index === o.lastIndex && o.lastIndex++, i.push(r);
    let d = 0;
    return i.forEach((l) => {
      const h = l;
      h.id = d, h.text = l[0], h.name = l[1] === null ? "Fragment" : l[1], h.startsAt = l.index, h.endsAt = l.index + h.text.length - 1, delete h[0], delete h[1], delete h[2], delete h[3], n.push(h), d++;
    }), n;
  }
  collectWords(t) {
    const e = [], n = [];
    let i = /([&oqpg;]{4})[\w /]+([&cqpp;]{4})/gm, s;
    for (; (s = i.exec(t)) !== null; )
      s.index === i.lastIndex && i.lastIndex++, n.push(s);
    let o = t;
    for (let r = n.length - 1; r > -1; r--) {
      const d = n[r][0], l = n[r].index + 1, h = l + d.length - 1, u = "•".repeat(d.length), m = o.substring(0, l - 1), k = o.substring(h);
      o = m + u + k;
    }
    for (i = /([&lt;]{4})[\w /]+([&gt;]{4})/gm; (s = i.exec(o)) !== null; )
      s.index === i.lastIndex && i.lastIndex++, n.push(s);
    for (let r = n.length - 1; r > -1; r--) {
      const d = n[r][0], l = n[r].index + 1, h = l + d.length - 1, u = "•".repeat(d.length), m = o.substring(0, l - 1), k = o.substring(h);
      o = m + u + k;
    }
    for (i = /([&ltgt;]{4})/gm; (s = i.exec(o)) !== null; )
      s.index === i.lastIndex && i.lastIndex++, n.push(s);
    for (let r = n.length - 1; r > -1; r--) {
      const d = n[r][0], l = n[r].index + 1, h = l + d.length - 1, u = "•".repeat(d.length), m = o.substring(0, l - 1), k = o.substring(h);
      o = m + u + k;
    }
    for (i = /((?!•)\S[^•\n]*)/g; (s = i.exec(o)) !== null; )
      s.index === i.lastIndex && i.lastIndex++, f(this, J).push(s.index), f(this, z).push(s[0].length);
    for (i = /((?!•)\S[^•\n ]*)/g; (s = i.exec(o)) !== null; ) {
      s.index === i.lastIndex && i.lastIndex++;
      const r = {};
      r.text = s[0], r.startsAt = s.index, r.endsAt = r.startsAt + s[0].length - 1, e.push(r), f(this, K).push(r.endsAt);
    }
    v(this, G, e);
  }
  makeMistakes() {
    let t = Math.ceil(Math.random() * 2) - 2;
    const e = Math.ceil(Math.random() * 3) + 2;
    f(this, G).forEach((n) => {
      if (t++, t % e !== 0 || n.text.length < 4)
        return;
      const i = Math.ceil(Math.random() * n.text.length) - 1, s = String.fromCharCode(
        Math.ceil(Math.random() * 26) + 96
      );
      f(this, X).push(n.startsAt + i), f(this, R).push(s);
    });
  }
  makeFaultyText() {
    let t = f(this, $);
    f(this, R).forEach((e) => {
      const n = t.substring(0, e.startsAt), i = t.substring(e.endsAt + 1);
      t = n + e.text + i;
    }), v(this, $, t);
  }
  splitTags(t) {
    let e = [...t], n = e.length, i = 0, s = !1, o = 0;
    const r = n;
    let d = !1;
    const l = [], h = [];
    for (; e.length > 0 && !s && !d; ) {
      if (i === n) {
        if (i = 0, e = Object.values(e), n = e.length, n === 0) {
          s = !0;
          continue;
        }
        o++, d = o > r + 1;
      }
      const u = e[i];
      if (e.length === 1 && u.name === "Eof") {
        s = !0;
        continue;
      }
      if (this.isClosedTag(u) && u.name !== "Eof") {
        h[i] = e[i], delete e[i], i++;
        continue;
      }
      if (i + 1 < n) {
        const m = e[i + 1];
        if (!this.isCloserTag(u) && this.isCloserTag(m)) {
          if (u.name !== m.name) {
            l.push(u), delete e[i], i++;
            continue;
          }
          h[i] = e[i], h[i + 1] = e[i + 1], delete e[i], delete e[i + 1], i += 2;
          continue;
        }
      }
      i++;
    }
    return { regularTags: h, singleTags: l };
  }
  replaceTags(t, e) {
    let n = t, i = e;
    const s = [];
    e.forEach((o) => {
      s[o.id] = o;
    }), s.sort(), i = Object.values(s);
    for (let o = i.length - 1; o > -1; o--) {
      const r = i[o];
      r.text = r.text.substring(0, r.text.length - 4) + ct + st;
      const d = n.substring(0, r.startsAt), l = n.substring(r.endsAt + 1);
      n = d + r.text + l;
    }
    return n;
  }
  doComponents(t = "[\\w]+") {
    let e = f(this, $);
    const n = this.collectTags(e, t), i = [];
    let s = [], o = 0;
    const r = [];
    let d = n.length, l = 0, h = !1, u = 0;
    const m = d;
    let k = !1;
    r[o] = -1;
    const { singleTags: _ } = this.splitTags(n);
    let x = n;
    for (_.length && (_.forEach((y) => i.push(y.id)), e = this.replaceTags(e, _), x = this.collectTags(e, t)); x.length > 0 && !h && !k; ) {
      if (l === d) {
        if (l = 0, x = Object.values(x), d = x.length, d === 0) {
          h = !0;
          continue;
        }
        u++, k = u > m + 1;
      }
      const y = x[l];
      if (x.length === 1 && y.name === "Eof") {
        h = !0;
        continue;
      }
      if (this.isClosedTag(y) && y.name !== "Eof") {
        const L = this.makeTag(y, r, o, !1);
        L.isSingle = i.includes(y.id), s[L.id] = L, delete x[l], l++;
        continue;
      }
      if (this.isCloserTag(y) && o--, l + 1 < d) {
        const L = x[l + 1];
        if (!this.isCloserTag(y) && this.isCloserTag(L)) {
          const M = this.makeTag(y, r, o, !0), C = this.makeTag(
            L,
            r,
            o,
            !1,
            !0
          );
          C.contents = {}, C.parentId = M.id, C.contents.startsAt = M.endsAt + 1, C.contents.endsAt = C.startsAt;
          const it = e.substring(
            C.contents.startsAt,
            C.contents.endsAt
          );
          C.contents.text = it, M.closer = C, s[M.id] = M, delete x[l], delete x[l + 1], l += 2;
          continue;
        }
        !this.isCloserTag(y) && !this.isCloserTag(L) && (o++, r[o] = y.id);
      }
      l++;
    }
    s = Object.values(s), v(this, $, e), v(this, V, s);
  }
}
V = new WeakMap(), N = new WeakMap(), $ = new WeakMap(), G = new WeakMap(), J = new WeakMap(), z = new WeakMap(), K = new WeakMap(), R = new WeakMap(), X = new WeakMap(), nt = new WeakSet(), Tt = function() {
  return Date.now() * Math.random();
};
const S = "&lt;", I = "&gt;", j = "<", W = ">", F = "/", D = `
`;
var Y, P, Z, Q, U;
class kt {
  constructor(t, e, n, i, s) {
    A(this, Y, "");
    A(this, P, 60);
    A(this, Z, !1);
    A(this, Q, () => {
    });
    A(this, U, () => {
    });
    v(this, Q, t), v(this, Y, e), v(this, P, n), v(this, U, s), v(this, Z, i);
  }
  async writeLikeAHuman(t, e) {
    const n = e !== void 0, i = f(this, Q).querySelector(
      `pre#${e} code`
    ), s = f(this, Q).querySelector(
      n ? `pre#${t} code` : `div#${t}`
    );
    let o = f(this, P), r = [], d = "", l = "", h = "", u = null, m = [];
    const k = [];
    let _ = "", x = "", y = -1;
    const L = [], M = [];
    let C = 0, it = this;
    function ut(c) {
      return new Promise((a) => {
        setTimeout(a, c);
      });
    }
    function yt(c) {
      return Math.floor(c * 0.75 + Math.random() * c);
    }
    async function E(c, a = !1) {
      let b = r.join("");
      a && (b = b.trim()), o = yt(f(it, P)), d += c, s.innerHTML = d + b, n && window.hljs !== void 0 && window.hljs.highlightElement(s), await ut(o);
    }
    async function Et() {
      const c = r.join("");
      d = d.substring(0, d.length - 1), s.innerHTML = d + c, await ut(o);
    }
    function q(c) {
      r.unshift(c);
    }
    function tt() {
      delete r[0], r = Object.values(r);
    }
    function At(c) {
      const a = [], b = /^([^\S][ \s]+)*/gm;
      let O;
      for (; (O = b.exec(c)) !== null; )
        O.index === b.lastIndex && b.lastIndex++, a.push(O[0] ?? "");
      return a;
    }
    function Ct(c) {
      const a = /^([^\S][ \s]+)*/gm;
      return c.replace(a, "");
    }
    function vt(c) {
      const a = c.split(`
`);
      return "<br />".repeat(a.length);
    }
    async function $t(c) {
      let a = "";
      return await fetch(c).then((b) => b.text()).then((b) => {
        a = b;
      }), a;
    }
    function _t(c) {
      return c.replaceAll(
        S,
        j
      ).replaceAll(I, W);
    }
    function St() {
      let c = null;
      return m.length && (c = m.shift(), c.hasCloser && k.push(c)), c;
    }
    function Lt() {
      return k.length ? k[k.length - 1] : null;
    }
    function Ot() {
      if (!L.length)
        return null;
      const c = L.pop(), a = M.pop();
      q(a ? D + l + c : c);
    }
    function dt(c) {
      let a = null;
      if (!k.length || (a = Lt(), c === a.depth))
        return a;
      let b = !1;
      for (let O = k.length - 1; O > -1; O--)
        if (a = k[O], c === a.depth) {
          b = !0;
          break;
        }
      return b ? a : null;
    }
    const It = f(this, Y);
    n && window.hljs !== void 0 && window.hljs.highlightElement(i), _ = await $t(It);
    const ht = At(_);
    _ = Ct(_);
    const w = new jt(_, n);
    w.doComponents(), m = [...w.list], x = w.workingText.replace(
      `${D + S}Eof ${F}${I}`,
      ""
    ), n && (i.innerHTML = vt(_ + `
`));
    const Mt = ht[C] ?? "";
    await E(Mt), C++;
    for (let c = 0; c < x.length; c++) {
      let a = x[c];
      if (n && a === j) {
        a = S, await E(a);
        continue;
      }
      if (f(this, Z) && w.mistakes.length && w.phraseStarts.length && w.phraseStarts[0] === c) {
        const T = w.phraseLengths[0];
        for (let p = 0; p < T; p++) {
          const H = c + p, lt = w.mistakeCursors[0];
          if (a = x[H], lt === H ? await E(w.mistakes[0]) : await E(a), w.wordEnds.includes(H) && w.mistakeCursors.length) {
            const et = w.mistakeCursors[0];
            if (et <= H) {
              const ot = H - et + 1;
              for (let ft = 0; ft < ot; ft++)
                await Et(), p--;
              w.mistakes.shift(), w.mistakeCursors.shift();
            }
          }
        }
        w.phraseStarts.shift(), w.phraseLengths.shift(), c += T - 1;
        continue;
      }
      const b = x.substring(c, c + 4), O = x.substring(c, c + 5);
      if (a === "&" && O === "&oq;/") {
        const T = x.substring(c + 5, c + 6), { word: p } = w.translateBracket(a, T);
        tt(), await E(p), c += 9;
        continue;
      }
      if (a === "&" && b === "&oq;") {
        const T = x.substring(c + 4, c + 5), { word: p } = w.translateBracket(a, T);
        q(p), await E(p), c += 8;
        continue;
      }
      if (a === "&" && b === "&pp;") {
        c += 3, await E(S);
        continue;
      }
      if (a === "&" && b === "&pg;") {
        c += 3, await E(I);
        continue;
      }
      if (n) {
        if (a === "/" && O === F + I && u !== null && !u.hasCloser && u.endsAt === c + 4) {
          a = F + I, tt(), await E(a), c += 4;
          continue;
        }
        if (a === "&" && b === I && u !== null && u.endsAt === c + 3) {
          tt(), await E(I), u.hasCloser && Ot(), c += 3;
          continue;
        }
      }
      if (a === "&" && O === S + F) {
        u = dt(y), u === null && y - 1 > -1 && (u = dt(y - 1)), a = u.closer.text, n || (a = j + F + u.closer.name + W);
        const { word: T } = w.translateBracket(
          a,
          u.name,
          !0
        );
        if (a = T, a !== "") {
          tt(), c = u.closer.endsAt, await E(a), y--, u = null;
          continue;
        }
      }
      if (a === "&" && b !== S) {
        const T = x.substring(c).indexOf(";");
        if (T > 8) {
          await E(a);
          continue;
        }
        const p = x.substring(c, c + T + 1);
        await E(p), c += p.length - 1;
        continue;
      }
      if (a === "&" && b === S) {
        if ((u === null || u !== null && u.dirty) && (u = St()), u.startsAt !== c) {
          n ? (a = S, c += 3) : (a = u.text.replace(S, j), a = a.replace(I, W)), await E(a), u.dirty = !1;
          continue;
        }
        u.dirty = !0;
        let T = !1, p = "";
        a = u.text, n || (a = u.text.replace(S, j), a = a.replace(I, W));
        const { word: H, translated: lt } = w.translateBracket(
          a,
          u.name
        );
        if (a = H, u.hasCloser) {
          y++, p = u.closer.text, n || (p = j + F + u.closer.name + W);
          const { word: et, translated: ot } = w.translateBracket(
            p,
            u.name,
            !0
          );
          p = et, T = u.closer.contents.text.indexOf(D) > -1, ot ? (c = u.endsAt, q(T ? D + l + p : p)) : (L.push(p), M.push(T));
        }
        lt || (T = u.text.indexOf(D) > -1, n ? (a = S, c += 3, p = I) : (a = u.text.replace(S, j), a = a.replace(I, W), c += u.text.length - 1, p = j + F + u.closer.name + W), q(T ? D + l + p : p)), await E(a);
        continue;
      }
      if (a === D) {
        l = ht[C] ?? "", h = D + l;
        const T = r.length ? r[0].trim() : "", p = x.substring(
          c + 1,
          c + T.length + 1
        );
        C++, await E(h, T === p);
        continue;
      }
      await E(a);
    }
    d = _t(d), this.finishedEvent(d);
  }
  finishedEvent(t) {
    typeof f(this, U) == "function" && f(this, U).call(this, t);
  }
}
Y = new WeakMap(), P = new WeakMap(), Z = new WeakMap(), Q = new WeakMap(), U = new WeakMap();
const Dt = /* @__PURE__ */ B("div", { class: "to-be-copied" }, [
  /* @__PURE__ */ B("pre", { id: "to-copy" }, [
    /* @__PURE__ */ B("code")
  ])
], -1), Bt = /* @__PURE__ */ B("div", { class: "to-be-written" }, [
  /* @__PURE__ */ B("pre", { id: "to-write" }, [
    /* @__PURE__ */ B("code")
  ])
], -1), qt = [
  Dt,
  Bt
], Ht = pt({
  name: "CodeWriter"
}), Wt = /* @__PURE__ */ Object.assign(Ht, {
  props: {
    source: {
      default: ""
    },
    speed: {
      default: "60"
    },
    dependsOnSelector: {
      default: ""
    },
    makeTypos: {
      default: !1
    },
    styles: {
      default: ""
    },
    classes: {
      default: ""
    },
    finished: {
      default: !1
    },
    restart: {
      default: !1
    },
    useHighlightJs: {
      default: !1
    },
    theme: {
      default: "base16/monokai"
    },
    language: {
      default: "html"
    }
  },
  setup(g) {
    const t = g, e = mt(null);
    xt(async () => {
      const s = e.value.ownerDocument;
      if (t.useHighlightJs) {
        const o = t.theme ?? "base16/monokai", r = t.language ?? "html", d = s.createElement("script");
        d.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js", s.head.appendChild(d);
        const l = [];
        l.push(
          "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css"
        ), l.push(
          `https://highlightjs.org/static/demo/styles/${o}.css`
        ), l.forEach((u) => {
          const m = s.createElement("style");
          m.innerHTML = `@import "${u}"`, s.head.appendChild(m);
        });
        const h = s.querySelectorAll("code");
        for (const u of h)
          u.setAttribute("class", `language-${r}`);
      }
      if (t.styles !== "" && t.classes !== "" && (t.styles.split(",").forEach((d) => {
        const l = s.createElement("style");
        l.innerHTML = `@import "${d}"`, s.head.appendChild(l);
      }), s.getElementById("to-write").setAttribute("class", t.classes)), t.dependsOnSelector !== "") {
        const o = s.querySelector(t.dependsOnSelector);
        if (o !== null) {
          const r = { attributes: !0 };
          new MutationObserver(
            async (l, h) => {
              for (const u of l)
                u.type === "attributes" && u.attributeName === "finished" && o.getAttribute("finished") === "true" && (h.disconnect(), await i());
            }
          ).observe(o, r);
        }
      } else
        await i();
    });
    const n = function(s) {
      const o = new CustomEvent("finishedWriting", {
        bubbles: !0,
        cancellable: !0,
        detail: {
          content: s
        }
      });
      e.value.dispatchEvent(o), e.value.setAttribute("finished", "true");
    }, i = async () => {
      const s = e.value.ownerDocument;
      await new kt(
        s,
        t.source,
        t.speed,
        t.makeTypos,
        n
      ).writeLikeAHuman("to-write", "to-copy");
    };
    return (s, o) => (wt(), bt("div", {
      ref_key: "root",
      ref: e,
      class: "code-snippet"
    }, qt, 512));
  }
}), Ft = /* @__PURE__ */ B("div", { class: "to-be-written" }, [
  /* @__PURE__ */ B("div", { id: "to-write" })
], -1), Nt = [
  Ft
], Gt = pt({
  name: "TextWriter"
}), Rt = /* @__PURE__ */ Object.assign(Gt, {
  props: {
    source: {
      default: ""
    },
    speed: {
      default: "60"
    },
    dependsOnSelector: {
      default: ""
    },
    makeTypos: {
      default: !1
    },
    styles: {
      default: ""
    },
    classes: {
      default: ""
    },
    finished: {
      default: !1
    },
    restart: {
      default: !1
    }
  },
  setup(g) {
    const t = g, e = mt(null);
    xt(async () => {
      const s = e.value.ownerDocument;
      if (t.styles !== "" && t.classes !== "" && (t.styles.split(",").forEach((d) => {
        const l = s.createElement("style");
        l.innerHTML = `@import "${d}"`, s.head.appendChild(l);
      }), s.getElementById("to-write").setAttribute("class", t.classes)), t.dependsOnSelector !== "") {
        const o = s.querySelector(t.dependsOnSelector);
        if (o !== null) {
          const r = { attributes: !0 };
          new MutationObserver(
            async (l, h) => {
              for (const u of l)
                u.type === "attributes" && u.attributeName === "finished" && o.getAttribute("finished") === "true" && (h.disconnect(), await i());
            }
          ).observe(o, r);
        }
      } else
        await i();
    });
    const n = function(s) {
      const o = new CustomEvent("finishedWriting", {
        bubbles: !0,
        cancellable: !0,
        detail: {
          content: s
        }
      });
      e.value.dispatchEvent(o), e.value.setAttribute("finished", "true");
    }, i = async () => {
      const s = e.value.ownerDocument;
      await new kt(
        s,
        t.source,
        t.speed,
        t.makeTypos,
        n
      ).writeLikeAHuman("to-write");
    };
    return (s, o) => (wt(), bt("div", {
      ref_key: "root",
      ref: e,
      class: "text-snippet"
    }, Nt, 512));
  }
}), Pt = (g) => ({
  textSpeed: g.speed,
  textTypos: g.makeTypos
}), Vt = {
  install(g, t) {
    g.config.globalProperties.$writerOptions = Pt(t), g.component("TextWriter", Rt), g.component("CodeWriter", Wt);
  }
};
export {
  Wt as CodeWriter,
  Rt as TextWriter,
  Vt as VueWriterPlugin
};
