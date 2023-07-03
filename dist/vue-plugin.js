var rt = (f, t, e) => {
  if (!t.has(f))
    throw TypeError("Cannot " + e);
};
var g = (f, t, e) => (rt(f, t, "read from private field"), e ? e.call(f) : t.get(f)), _ = (f, t, e) => {
  if (t.has(f))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(f) : t.set(f, e);
}, C = (f, t, e, s) => (rt(f, t, "write to private field"), s ? s.call(f, e) : t.set(f, e), e);
var gt = (f, t, e) => (rt(f, t, "access private method"), e);
import { defineComponent as pt, ref as mt, onMounted as xt, inject as Dt, openBlock as wt, createElementBlock as bt, pushScopeId as Bt, popScopeId as qt, createElementVNode as B } from "vue";
const at = "&lt;", st = "&gt;", ct = "/";
var V, N, v, G, J, z, K, R, X, nt, Tt;
class Wt {
  constructor(t, e = !1) {
    _(this, nt);
    _(this, V, []);
    _(this, N, "");
    _(this, v, "");
    _(this, G, []);
    _(this, J, []);
    _(this, z, []);
    _(this, K, []);
    _(this, R, []);
    _(this, X, []);
    C(this, N, t.trim()), C(this, v, `${g(this, N)}
<Eof />`), this.protect(), e && this.markupQuotes(), this.collectWords(g(this, v)), this.makeMistakes();
  }
  get list() {
    return g(this, V);
  }
  get text() {
    return g(this, N);
  }
  get workingText() {
    return g(this, v);
  }
  get words() {
    return g(this, G);
  }
  get mistakes() {
    return g(this, R);
  }
  get mistakeCursors() {
    return g(this, X);
  }
  get phraseStarts() {
    return g(this, J);
  }
  get phraseLengths() {
    return g(this, z);
  }
  get wordEnds() {
    return g(this, K);
  }
  translateBracket(t, e, s = !1) {
    let i = t, n = !1;
    return "CDETQRG".includes(e) && (e === "C" && (i = s ? ")" : "(", n = !0), e === "D" && (i = s ? "}}" : "{{", n = !0), e === "E" && (i = s ? "}" : "{", n = !0), e === "T" && (i = s ? "]" : "[", n = !0), e === "Q" && (i = "'", n = !0), e === "R" && (i = '"', n = !0), e === "G" && (i = "`", n = !0)), { word: i, translated: n };
  }
  markupQuotes() {
    let t = g(this, v);
    const e = /(["'`])((\s|((\\)*)\\.|.)*?)\1/gm;
    let s;
    const i = [];
    for (; (s = e.exec(t)) !== null; )
      s.index === e.lastIndex && e.lastIndex++, i.push(s);
    for (let n = i.length - 1; n > -1; n--) {
      const l = i[n], r = l[1], d = l[0];
      let o = l[2];
      const h = l.index + 1, u = h + d.length - 1;
      let m = "";
      r === '"' ? m = "R" : r === "'" ? m = "Q" : r === "`" && (m = "G"), o = o.replace(/&lt;/g, "&pp;"), o = o.replace(/&gt;/g, "&pg;");
      const k = `&oq;${m}&cq;${o}&oq;/${m}&cq;`, S = t.substring(0, h - 1), x = t.substring(u);
      t = S + k + x;
    }
    C(this, v, t);
  }
  doAttributes(t) {
    const e = {}, s = /([\w]*)(\[\])?=("([\S ][^"]*)"|'([\S]*)'|\{\{ ([\w]*) \}\}|\{([\S ]*)\})/gm;
    let i;
    const n = [];
    for (; (i = s.exec(t)) !== null; )
      i.index === s.lastIndex && s.lastIndex++, n.push(i);
    for (let l = 0; l < n.length; l++) {
      const r = n[l], d = r[1], o = r[2], h = r[3].substring(0, 1), u = r[4];
      o === "[]" ? (e[d] === void 0 && (e[d] = []), e[d].push(h + u)) : e[d] = `${h}${u}`;
    }
    return e;
  }
  isClosedTag(t) {
    let e = !1;
    const { text: s } = t;
    return s === "" || (e = s.substring(s.length - 5, s.length) === ct + st), e;
  }
  isCloserTag(t) {
    let e = !1;
    const { text: s } = t;
    return s === "" || (e = s.substring(0, 5) === at + ct), e;
  }
  makeTag(t, e, s, i, n = !1) {
    const { text: l } = t, { name: r } = t, d = this.list.length, o = {};
    return o.id = t.id, o.name = r === "" ? "Fragment" : r, o.text = l, o.startsAt = t.startsAt, o.endsAt = t.endsAt, n || (o.uid = gt(this, nt, Tt), o.method = "echo", o.props = o.name === "Fragment" ? [] : [], o.depth = s, o.hasCloser = i, o.node = !1, o.isSingle = !1), (e[s] === void 0 || e[s] === null) && (e[s] = d - 1), o.parentId = e[s], o;
  }
  protect() {
    let t = g(this, v);
    t = t.trim(), t = t.replace(/\{\{/g, "<D>"), t = t.replace(/\}\}/g, "</D>"), t = t.replace(/\(/g, "<C>"), t = t.replace(/\)/g, "</C>"), t = t.replace(/\{/g, "<E>"), t = t.replace(/\}/g, "</E>"), t = t.replace(/\[/g, "<T>"), t = t.replace(/\]/g, "</T>"), t = t.replace(/<([/\w])/g, `${at}$1`), t = t.replace(/>/g, st), C(this, v, t);
  }
  collectTags(t, e = "[\\w]+") {
    const s = [], i = [], n = `${at}\\/?(${e})((\\s|.*?)*?)\\/?${st}`, l = new RegExp(n, "gm");
    let r;
    for (; (r = l.exec(t)) !== null; )
      r.index === l.lastIndex && l.lastIndex++, i.push(r);
    let d = 0;
    return i.forEach((o) => {
      const h = o;
      h.id = d, h.text = o[0], h.name = o[1] === null ? "Fragment" : o[1], h.startsAt = o.index, h.endsAt = o.index + h.text.length - 1, delete h[0], delete h[1], delete h[2], delete h[3], s.push(h), d++;
    }), s;
  }
  collectWords(t) {
    const e = [], s = [];
    let i = /([&oqpg;]{4})[\w /]+([&cqpp;]{4})/gm, n;
    for (; (n = i.exec(t)) !== null; )
      n.index === i.lastIndex && i.lastIndex++, s.push(n);
    let l = t;
    for (let r = s.length - 1; r > -1; r--) {
      const d = s[r][0], o = s[r].index + 1, h = o + d.length - 1, u = "•".repeat(d.length), m = l.substring(0, o - 1), k = l.substring(h);
      l = m + u + k;
    }
    for (i = /([&lt;]{4})[\w /]+([&gt;]{4})/gm; (n = i.exec(l)) !== null; )
      n.index === i.lastIndex && i.lastIndex++, s.push(n);
    for (let r = s.length - 1; r > -1; r--) {
      const d = s[r][0], o = s[r].index + 1, h = o + d.length - 1, u = "•".repeat(d.length), m = l.substring(0, o - 1), k = l.substring(h);
      l = m + u + k;
    }
    for (i = /([&ltgt;]{4})/gm; (n = i.exec(l)) !== null; )
      n.index === i.lastIndex && i.lastIndex++, s.push(n);
    for (let r = s.length - 1; r > -1; r--) {
      const d = s[r][0], o = s[r].index + 1, h = o + d.length - 1, u = "•".repeat(d.length), m = l.substring(0, o - 1), k = l.substring(h);
      l = m + u + k;
    }
    for (i = /((?!•)\S[^•\n]*)/g; (n = i.exec(l)) !== null; )
      n.index === i.lastIndex && i.lastIndex++, g(this, J).push(n.index), g(this, z).push(n[0].length);
    for (i = /((?!•)\S[^•\n ]*)/g; (n = i.exec(l)) !== null; ) {
      n.index === i.lastIndex && i.lastIndex++;
      const r = {};
      r.text = n[0], r.startsAt = n.index, r.endsAt = r.startsAt + n[0].length - 1, e.push(r), g(this, K).push(r.endsAt);
    }
    C(this, G, e);
  }
  makeMistakes() {
    let t = Math.ceil(Math.random() * 2) - 2;
    const e = Math.ceil(Math.random() * 3) + 2;
    g(this, G).forEach((s) => {
      if (t++, t % e !== 0 || s.text.length < 4)
        return;
      const i = Math.ceil(Math.random() * s.text.length) - 1, n = String.fromCharCode(
        Math.ceil(Math.random() * 26) + 96
      );
      g(this, X).push(s.startsAt + i), g(this, R).push(n);
    });
  }
  makeFaultyText() {
    let t = g(this, v);
    g(this, R).forEach((e) => {
      const s = t.substring(0, e.startsAt), i = t.substring(e.endsAt + 1);
      t = s + e.text + i;
    }), C(this, v, t);
  }
  splitTags(t) {
    let e = [...t], s = e.length, i = 0, n = !1, l = 0;
    const r = s;
    let d = !1;
    const o = [], h = [];
    for (; e.length > 0 && !n && !d; ) {
      if (i === s) {
        if (i = 0, e = Object.values(e), s = e.length, s === 0) {
          n = !0;
          continue;
        }
        l++, d = l > r + 1;
      }
      const u = e[i];
      if (e.length === 1 && u.name === "Eof") {
        n = !0;
        continue;
      }
      if (this.isClosedTag(u) && u.name !== "Eof") {
        h[i] = e[i], delete e[i], i++;
        continue;
      }
      if (i + 1 < s) {
        const m = e[i + 1];
        if (!this.isCloserTag(u) && this.isCloserTag(m)) {
          if (u.name !== m.name) {
            o.push(u), delete e[i], i++;
            continue;
          }
          h[i] = e[i], h[i + 1] = e[i + 1], delete e[i], delete e[i + 1], i += 2;
          continue;
        }
      }
      i++;
    }
    return { regularTags: h, singleTags: o };
  }
  replaceTags(t, e) {
    let s = t, i = e;
    const n = [];
    e.forEach((l) => {
      n[l.id] = l;
    }), n.sort(), i = Object.values(n);
    for (let l = i.length - 1; l > -1; l--) {
      const r = i[l];
      r.text = r.text.substring(0, r.text.length - 4) + ct + st;
      const d = s.substring(0, r.startsAt), o = s.substring(r.endsAt + 1);
      s = d + r.text + o;
    }
    return s;
  }
  doComponents(t = "[\\w]+") {
    let e = g(this, v);
    const s = this.collectTags(e, t), i = [];
    let n = [], l = 0;
    const r = [];
    let d = s.length, o = 0, h = !1, u = 0;
    const m = d;
    let k = !1;
    r[l] = -1;
    const { singleTags: S } = this.splitTags(s);
    let x = s;
    for (S.length && (S.forEach((y) => i.push(y.id)), e = this.replaceTags(e, S), x = this.collectTags(e, t)); x.length > 0 && !h && !k; ) {
      if (o === d) {
        if (o = 0, x = Object.values(x), d = x.length, d === 0) {
          h = !0;
          continue;
        }
        u++, k = u > m + 1;
      }
      const y = x[o];
      if (x.length === 1 && y.name === "Eof") {
        h = !0;
        continue;
      }
      if (this.isClosedTag(y) && y.name !== "Eof") {
        const I = this.makeTag(y, r, l, !1);
        I.isSingle = i.includes(y.id), n[I.id] = I, delete x[o], o++;
        continue;
      }
      if (this.isCloserTag(y) && l--, o + 1 < d) {
        const I = x[o + 1];
        if (!this.isCloserTag(y) && this.isCloserTag(I)) {
          const M = this.makeTag(y, r, l, !0), A = this.makeTag(
            I,
            r,
            l,
            !1,
            !0
          );
          A.contents = {}, A.parentId = M.id, A.contents.startsAt = M.endsAt + 1, A.contents.endsAt = A.startsAt;
          const it = e.substring(
            A.contents.startsAt,
            A.contents.endsAt
          );
          A.contents.text = it, M.closer = A, n[M.id] = M, delete x[o], delete x[o + 1], o += 2;
          continue;
        }
        !this.isCloserTag(y) && !this.isCloserTag(I) && (l++, r[l] = y.id);
      }
      o++;
    }
    n = Object.values(n), C(this, v, e), C(this, V, n);
  }
}
V = new WeakMap(), N = new WeakMap(), v = new WeakMap(), G = new WeakMap(), J = new WeakMap(), z = new WeakMap(), K = new WeakMap(), R = new WeakMap(), X = new WeakMap(), nt = new WeakSet(), Tt = function() {
  return Date.now() * Math.random();
};
const $ = "&lt;", L = "&gt;", j = "<", H = ">", F = "/", D = `
`;
var Y, P, Z, Q, U;
class kt {
  constructor(t, e, s, i, n) {
    _(this, Y, "");
    _(this, P, 60);
    _(this, Z, !1);
    _(this, Q, () => {
    });
    _(this, U, () => {
    });
    C(this, Q, t), C(this, Y, e), C(this, P, s), C(this, U, n), C(this, Z, i);
  }
  async writeLikeAHuman(t, e) {
    const s = e !== void 0, i = g(this, Q).querySelector(
      `pre#${e} code`
    ), n = g(this, Q).querySelector(
      s ? `pre#${t} code` : `div#${t}`
    );
    let l = g(this, P), r = [], d = "", o = "", h = "", u = null, m = [];
    const k = [];
    let S = "", x = "", y = -1;
    const I = [], M = [];
    let A = 0, it = this;
    function ut(c) {
      return new Promise((a) => {
        setTimeout(a, c);
      });
    }
    function Et(c) {
      return Math.floor(c * 0.75 + Math.random() * c);
    }
    async function E(c, a = !1) {
      let b = r.join("");
      a && (b = b.trim()), l = Et(g(it, P)), d += c, n.innerHTML = d + b, s && window.hljs !== void 0 && window.hljs.highlightElement(n), await ut(l);
    }
    async function _t() {
      const c = r.join("");
      d = d.substring(0, d.length - 1), n.innerHTML = d + c, await ut(l);
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
    async function St(c) {
      let a = "";
      return await fetch(c).then((b) => b.text()).then((b) => {
        a = b;
      }), a;
    }
    function $t(c) {
      return c.replaceAll(
        $,
        j
      ).replaceAll(L, H);
    }
    function It() {
      let c = null;
      return m.length && (c = m.shift(), c.hasCloser && k.push(c)), c;
    }
    function Ot() {
      return k.length ? k[k.length - 1] : null;
    }
    function Lt() {
      if (!I.length)
        return null;
      const c = I.pop(), a = M.pop();
      q(a ? D + o + c : c);
    }
    function dt(c) {
      let a = null;
      if (!k.length || (a = Ot(), c === a.depth))
        return a;
      let b = !1;
      for (let O = k.length - 1; O > -1; O--)
        if (a = k[O], c === a.depth) {
          b = !0;
          break;
        }
      return b ? a : null;
    }
    const Mt = g(this, Y);
    s && window.hljs !== void 0 && window.hljs.highlightElement(i), S = await St(Mt);
    const ht = At(S);
    S = Ct(S);
    const w = new Wt(S, s);
    w.doComponents(), m = [...w.list], x = w.workingText.replace(
      `${D + $}Eof ${F}${L}`,
      ""
    ), s && (i.innerHTML = vt(S + `
`));
    const jt = ht[A] ?? "";
    await E(jt), A++;
    for (let c = 0; c < x.length; c++) {
      let a = x[c];
      if (s && a === j) {
        a = $, await E(a);
        continue;
      }
      if (g(this, Z) && w.mistakes.length && w.phraseStarts.length && w.phraseStarts[0] === c) {
        const T = w.phraseLengths[0];
        for (let p = 0; p < T; p++) {
          const W = c + p, ot = w.mistakeCursors[0];
          if (a = x[W], ot === W ? await E(w.mistakes[0]) : await E(a), w.wordEnds.includes(W) && w.mistakeCursors.length) {
            const et = w.mistakeCursors[0];
            if (et <= W) {
              const lt = W - et + 1;
              for (let ft = 0; ft < lt; ft++)
                await _t(), p--;
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
        c += 3, await E($);
        continue;
      }
      if (a === "&" && b === "&pg;") {
        c += 3, await E(L);
        continue;
      }
      if (s) {
        if (a === "/" && O === F + L && u !== null && !u.hasCloser && u.endsAt === c + 4) {
          a = F + L, tt(), await E(a), c += 4;
          continue;
        }
        if (a === "&" && b === L && u !== null && u.endsAt === c + 3) {
          tt(), await E(L), u.hasCloser && Lt(), c += 3;
          continue;
        }
      }
      if (a === "&" && O === $ + F) {
        u = dt(y), u === null && y - 1 > -1 && (u = dt(y - 1)), a = u.closer.text, s || (a = j + F + u.closer.name + H);
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
      if (a === "&" && b !== $) {
        const T = x.substring(c).indexOf(";");
        if (T > 8) {
          await E(a);
          continue;
        }
        const p = x.substring(c, c + T + 1);
        await E(p), c += p.length - 1;
        continue;
      }
      if (a === "&" && b === $) {
        if ((u === null || u !== null && u.dirty) && (u = It()), u.startsAt !== c) {
          s ? (a = $, c += 3) : (a = u.text.replace($, j), a = a.replace(L, H)), await E(a), u.dirty = !1;
          continue;
        }
        u.dirty = !0;
        let T = !1, p = "";
        a = u.text, s || (a = u.text.replace($, j), a = a.replace(L, H));
        const { word: W, translated: ot } = w.translateBracket(
          a,
          u.name
        );
        if (a = W, u.hasCloser) {
          y++, p = u.closer.text, s || (p = j + F + u.closer.name + H);
          const { word: et, translated: lt } = w.translateBracket(
            p,
            u.name,
            !0
          );
          p = et, T = u.closer.contents.text.indexOf(D) > -1, lt ? (c = u.endsAt, q(T ? D + o + p : p)) : (I.push(p), M.push(T));
        }
        ot || (T = u.text.indexOf(D) > -1, s ? (a = $, c += 3, p = L) : (a = u.text.replace($, j), a = a.replace(L, H), c += u.text.length - 1, p = j + F + u.closer.name + H), q(T ? D + o + p : p)), await E(a);
        continue;
      }
      if (a === D) {
        o = ht[A] ?? "", h = D + o;
        const T = r.length ? r[0].trim() : "", p = x.substring(
          c + 1,
          c + T.length + 1
        );
        A++, await E(h, T === p);
        continue;
      }
      await E(a);
    }
    d = $t(d), this.finishedEvent(d);
  }
  finishedEvent(t) {
    typeof g(this, U) == "function" && g(this, U).call(this, t);
  }
}
Y = new WeakMap(), P = new WeakMap(), Z = new WeakMap(), Q = new WeakMap(), U = new WeakMap();
const Ht = (f, t) => {
  const e = f.__vccOpts || f;
  for (const [s, i] of t)
    e[s] = i;
  return e;
}, yt = (f) => (Bt("data-v-9d52d956"), f = f(), qt(), f), Ft = /* @__PURE__ */ yt(() => /* @__PURE__ */ B("div", { class: "to-be-copied" }, [
  /* @__PURE__ */ B("pre", { id: "to-copy" }, [
    /* @__PURE__ */ B("code")
  ])
], -1)), Nt = /* @__PURE__ */ yt(() => /* @__PURE__ */ B("div", { class: "to-be-written" }, [
  /* @__PURE__ */ B("pre", { id: "to-write" }, [
    /* @__PURE__ */ B("code")
  ])
], -1)), Gt = [
  Ft,
  Nt
], Rt = pt({
  name: "CodeWriter"
}), Pt = /* @__PURE__ */ Object.assign(Rt, {
  props: {
    source: {
      default: ""
    },
    speed: {
      default: 20
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
  setup(f) {
    const t = f, e = mt(null);
    xt(async () => {
      const n = e.value.ownerDocument;
      if (t.useHighlightJs) {
        const l = t.theme ?? "base16/monokai", r = t.language ?? "html", d = n.createElement("script");
        d.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js", n.head.appendChild(d);
        const o = [];
        o.push(
          "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css"
        ), o.push(
          `https://highlightjs.org/static/demo/styles/${l}.css`
        ), o.forEach((u) => {
          const m = n.createElement("style");
          m.innerHTML = `@import "${u}"`, n.head.appendChild(m);
        });
        const h = n.querySelectorAll("code");
        for (const u of h)
          u.setAttribute("class", `language-${r}`);
      }
      if (t.styles !== "" && t.classes !== "" && (t.styles.split(",").forEach((d) => {
        const o = n.createElement("style");
        o.innerHTML = `@import "${d}"`, n.head.appendChild(o);
      }), n.getElementById("to-write").setAttribute("class", t.classes)), t.dependsOnSelector !== "") {
        const l = n.querySelector(t.dependsOnSelector);
        if (l !== null) {
          const r = { attributes: !0 };
          new MutationObserver(
            async (o, h) => {
              for (const u of o)
                u.type === "attributes" && u.attributeName === "finished" && l.getAttribute("finished") === "true" && (h.disconnect(), await i());
            }
          ).observe(l, r);
        }
      } else
        await i();
    });
    const s = function(n) {
      const l = new CustomEvent("finishedWriting", {
        bubbles: !0,
        cancellable: !0,
        detail: {
          content: n
        }
      });
      e.value.dispatchEvent(l), e.value.setAttribute("finished", "true");
    }, i = async () => {
      const n = e.value.ownerDocument, l = Dt("writerOptions");
      console.log({ writerOptions: l });
      const r = t.speed, d = t.makeTypos;
      await new kt(
        n,
        t.source,
        r,
        d,
        s
      ).writeLikeAHuman("to-write", "to-copy");
    };
    return (n, l) => (wt(), bt("div", {
      ref_key: "root",
      ref: e,
      class: "code-snippet"
    }, Gt, 512));
  }
}), Qt = /* @__PURE__ */ Ht(Pt, [["__scopeId", "data-v-9d52d956"]]), Ut = /* @__PURE__ */ B("div", { class: "to-be-written" }, [
  /* @__PURE__ */ B("div", { id: "to-write" })
], -1), Vt = [
  Ut
], Jt = pt({
  name: "TextWriter"
}), zt = /* @__PURE__ */ Object.assign(Jt, {
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
  setup(f) {
    const t = f, e = mt(null);
    xt(async () => {
      const n = e.value.ownerDocument;
      if (t.styles !== "" && t.classes !== "" && (t.styles.split(",").forEach((d) => {
        const o = n.createElement("style");
        o.innerHTML = `@import "${d}"`, n.head.appendChild(o);
      }), n.getElementById("to-write").setAttribute("class", t.classes)), t.dependsOnSelector !== "") {
        const l = n.querySelector(t.dependsOnSelector);
        if (l !== null) {
          const r = { attributes: !0 };
          new MutationObserver(
            async (o, h) => {
              for (const u of o)
                u.type === "attributes" && u.attributeName === "finished" && l.getAttribute("finished") === "true" && (h.disconnect(), await i());
            }
          ).observe(l, r);
        }
      } else
        await i();
    });
    const s = function(n) {
      const l = new CustomEvent("finishedWriting", {
        bubbles: !0,
        cancellable: !0,
        detail: {
          content: n
        }
      });
      e.value.dispatchEvent(l), e.value.setAttribute("finished", "true");
    }, i = async () => {
      const n = e.value.ownerDocument;
      await new kt(
        n,
        t.source,
        t.speed,
        t.makeTypos,
        s
      ).writeLikeAHuman("to-write");
    };
    return (n, l) => (wt(), bt("div", {
      ref_key: "root",
      ref: e,
      class: "text-snippet"
    }, Vt, 512));
  }
}), Kt = (f) => ({
  textSpeed: f.speed,
  textTypos: f.makeTypos
}), Zt = {
  install(f, t) {
    f.provide("writerOptions", Kt(t)), f.component("TextWriter", zt), f.component("CodeWriter", Qt);
  }
};
export {
  Qt as CodeWriter,
  zt as TextWriter,
  Zt as VueWriterPlugin
};
