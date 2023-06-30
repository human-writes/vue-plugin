var rt = (x, t, e) => {
  if (!t.has(x))
    throw TypeError("Cannot " + e);
};
var f = (x, t, e) => (rt(x, t, "read from private field"), e ? e.call(x) : t.get(x)), A = (x, t, e) => {
  if (t.has(x))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(x) : t.set(x, e);
}, v = (x, t, e, n) => (rt(x, t, "write to private field"), n ? n.call(x, e) : t.set(x, e), e);
var gt = (x, t, e) => (rt(x, t, "access private method"), e);
import { defineComponent as pt, ref as mt, onMounted as xt, openBlock as wt, createElementBlock as bt, createElementVNode as B } from "vue";
const at = "&lt;", st = "&gt;", ct = "/";
var V, W, $, G, J, z, K, R, X, nt, Tt;
class jt {
  constructor(t, e = !1) {
    A(this, nt);
    A(this, V, []);
    A(this, W, "");
    A(this, $, "");
    A(this, G, []);
    A(this, J, []);
    A(this, z, []);
    A(this, K, []);
    A(this, R, []);
    A(this, X, []);
    v(this, W, t.trim()), v(this, $, `${f(this, W)}
<Eof />`), this.protect(), e && this.markupQuotes(), this.collectWords(f(this, $)), this.makeMistakes();
  }
  get list() {
    return f(this, V);
  }
  get text() {
    return f(this, W);
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
      const o = i[s], a = o[1], d = o[0];
      let l = o[2];
      const h = o.index + 1, u = h + d.length - 1;
      let p = "";
      a === '"' ? p = "R" : a === "'" ? p = "Q" : a === "`" && (p = "G"), l = l.replace(/&lt;/g, "&pp;"), l = l.replace(/&gt;/g, "&pg;");
      const k = `&oq;${p}&cq;${l}&oq;/${p}&cq;`, _ = t.substring(0, h - 1), m = t.substring(u);
      t = _ + k + m;
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
      const a = s[o], d = a[1], l = a[2], h = a[3].substring(0, 1), u = a[4];
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
    const { text: o } = t, { name: a } = t, d = this.list.length, l = {};
    return l.id = t.id, l.name = a === "" ? "Fragment" : a, l.text = o, l.startsAt = t.startsAt, l.endsAt = t.endsAt, s || (l.uid = gt(this, nt, Tt), l.method = "echo", l.props = l.name === "Fragment" ? [] : [], l.depth = n, l.hasCloser = i, l.node = !1, l.isSingle = !1), (e[n] === void 0 || e[n] === null) && (e[n] = d - 1), l.parentId = e[n], l;
  }
  protect() {
    let t = f(this, $);
    t = t.trim(), t = t.replace(/\{\{/g, "<D>"), t = t.replace(/\}\}/g, "</D>"), t = t.replace(/\(/g, "<C>"), t = t.replace(/\)/g, "</C>"), t = t.replace(/\{/g, "<E>"), t = t.replace(/\}/g, "</E>"), t = t.replace(/\[/g, "<T>"), t = t.replace(/\]/g, "</T>"), t = t.replace(/<([/\w])/g, `${at}$1`), t = t.replace(/>/g, st), v(this, $, t);
  }
  collectTags(t, e = "[\\w]+") {
    const n = [], i = [], s = `${at}\\/?(${e})((\\s|.*?)*?)\\/?${st}`, o = new RegExp(s, "gm");
    let a;
    for (; (a = o.exec(t)) !== null; )
      a.index === o.lastIndex && o.lastIndex++, i.push(a);
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
    for (let a = n.length - 1; a > -1; a--) {
      const d = n[a][0], l = n[a].index + 1, h = l + d.length - 1, u = "•".repeat(d.length), p = o.substring(0, l - 1), k = o.substring(h);
      o = p + u + k;
    }
    for (i = /([&lt;]{4})[\w /]+([&gt;]{4})/gm; (s = i.exec(o)) !== null; )
      s.index === i.lastIndex && i.lastIndex++, n.push(s);
    for (let a = n.length - 1; a > -1; a--) {
      const d = n[a][0], l = n[a].index + 1, h = l + d.length - 1, u = "•".repeat(d.length), p = o.substring(0, l - 1), k = o.substring(h);
      o = p + u + k;
    }
    for (i = /([&ltgt;]{4})/gm; (s = i.exec(o)) !== null; )
      s.index === i.lastIndex && i.lastIndex++, n.push(s);
    for (let a = n.length - 1; a > -1; a--) {
      const d = n[a][0], l = n[a].index + 1, h = l + d.length - 1, u = "•".repeat(d.length), p = o.substring(0, l - 1), k = o.substring(h);
      o = p + u + k;
    }
    for (i = /((?!•)\S[^•\n]*)/g; (s = i.exec(o)) !== null; )
      s.index === i.lastIndex && i.lastIndex++, f(this, J).push(s.index), f(this, z).push(s[0].length);
    for (i = /((?!•)\S[^•\n ]*)/g; (s = i.exec(o)) !== null; ) {
      s.index === i.lastIndex && i.lastIndex++;
      const a = {};
      a.text = s[0], a.startsAt = s.index, a.endsAt = a.startsAt + s[0].length - 1, e.push(a), f(this, K).push(a.endsAt);
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
    const a = n;
    let d = !1;
    const l = [], h = [];
    for (; e.length > 0 && !s && !d; ) {
      if (i === n) {
        if (i = 0, e = Object.values(e), n = e.length, n === 0) {
          s = !0;
          continue;
        }
        o++, d = o > a + 1;
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
        const p = e[i + 1];
        if (!this.isCloserTag(u) && this.isCloserTag(p)) {
          if (u.name !== p.name) {
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
      const a = i[o];
      a.text = a.text.substring(0, a.text.length - 4) + ct + st;
      const d = n.substring(0, a.startsAt), l = n.substring(a.endsAt + 1);
      n = d + a.text + l;
    }
    return n;
  }
  doComponents(t = "[\\w]+") {
    let e = f(this, $);
    const n = this.collectTags(e, t), i = [];
    let s = [], o = 0;
    const a = [];
    let d = n.length, l = 0, h = !1, u = 0;
    const p = d;
    let k = !1;
    a[o] = -1;
    const { singleTags: _ } = this.splitTags(n);
    let m = n;
    for (_.length && (_.forEach((y) => i.push(y.id)), e = this.replaceTags(e, _), m = this.collectTags(e, t)); m.length > 0 && !h && !k; ) {
      if (l === d) {
        if (l = 0, m = Object.values(m), d = m.length, d === 0) {
          h = !0;
          continue;
        }
        u++, k = u > p + 1;
      }
      const y = m[l];
      if (m.length === 1 && y.name === "Eof") {
        h = !0;
        continue;
      }
      if (this.isClosedTag(y) && y.name !== "Eof") {
        const L = this.makeTag(y, a, o, !1);
        L.isSingle = i.includes(y.id), s[L.id] = L, delete m[l], l++;
        continue;
      }
      if (this.isCloserTag(y) && o--, l + 1 < d) {
        const L = m[l + 1];
        if (!this.isCloserTag(y) && this.isCloserTag(L)) {
          const M = this.makeTag(y, a, o, !0), C = this.makeTag(
            L,
            a,
            o,
            !1,
            !0
          );
          C.contents = {}, C.parentId = M.id, C.contents.startsAt = M.endsAt + 1, C.contents.endsAt = C.startsAt;
          const it = e.substring(
            C.contents.startsAt,
            C.contents.endsAt
          );
          C.contents.text = it, M.closer = C, s[M.id] = M, delete m[l], delete m[l + 1], l += 2;
          continue;
        }
        !this.isCloserTag(y) && !this.isCloserTag(L) && (o++, a[o] = y.id);
      }
      l++;
    }
    s = Object.values(s), v(this, $, e), v(this, V, s);
  }
}
V = new WeakMap(), W = new WeakMap(), $ = new WeakMap(), G = new WeakMap(), J = new WeakMap(), z = new WeakMap(), K = new WeakMap(), R = new WeakMap(), X = new WeakMap(), nt = new WeakSet(), Tt = function() {
  return Date.now() * Math.random();
};
const S = "&lt;", O = "&gt;", j = "<", F = ">", N = "/", D = `
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
    let o = f(this, P), a = [], d = "", l = "", h = "", u = null, p = [];
    const k = [];
    let _ = "", m = "", y = -1;
    const L = [], M = [];
    let C = 0, it = this;
    function ut(r) {
      return new Promise((c) => {
        setTimeout(c, r);
      });
    }
    function yt(r) {
      return Math.floor(r * 0.75 + Math.random() * r);
    }
    async function E(r, c = !1) {
      let b = a.join("");
      c && (b = b.trim()), o = yt(f(it, P)), d += r, s.innerHTML = d + b, n && window.hljs !== void 0 && window.hljs.highlightElement(s), await ut(o);
    }
    async function Et() {
      const r = a.join("");
      d = d.substring(0, d.length - 1), s.innerHTML = d + r, await ut(o);
    }
    function q(r) {
      a.unshift(r);
    }
    function tt() {
      delete a[0], a = Object.values(a);
    }
    function At(r) {
      const c = [], b = /^([^\S][ \s]+)*/gm;
      let I;
      for (; (I = b.exec(r)) !== null; )
        I.index === b.lastIndex && b.lastIndex++, c.push(I[0] ?? "");
      return c;
    }
    function Ct(r) {
      const c = /^([^\S][ \s]+)*/gm;
      return r.replace(c, "");
    }
    function vt(r) {
      const c = r.split(`
`);
      return `<br />
`.repeat(c.length);
    }
    async function $t(r) {
      let c = "";
      return await fetch(r).then((b) => b.text()).then((b) => {
        c = b;
      }), c;
    }
    function _t(r) {
      return r.replaceAll(
        S,
        j
      ).replaceAll(O, F);
    }
    function St() {
      let r = null;
      return p.length && (r = p.shift(), r.hasCloser && k.push(r)), r;
    }
    function Lt() {
      return k.length ? k[k.length - 1] : null;
    }
    function It() {
      if (!L.length)
        return null;
      const r = L.pop(), c = M.pop();
      q(c ? D + l + r : r);
    }
    function dt(r) {
      let c = null;
      if (!k.length || (c = Lt(), r === c.depth))
        return c;
      let b = !1;
      for (let I = k.length - 1; I > -1; I--)
        if (c = k[I], r === c.depth) {
          b = !0;
          break;
        }
      return b ? c : null;
    }
    const Ot = f(this, Y);
    _ = await $t(Ot);
    const ht = At(_);
    _ = Ct(_);
    const w = new jt(_, n);
    if (w.doComponents(), p = [...w.list], m = w.workingText.replace(
      `${D + S}Eof ${N}${O}`,
      ""
    ), n) {
      console.log({ sourceComponent: i });
      const r = vt(_ + `
`);
      console.log({ emptyText: r }), i.innerHTML = r, window.hljs !== void 0 && window.hljs.highlightElement(i);
    }
    const Mt = ht[C] ?? "";
    await E(Mt), C++;
    for (let r = 0; r < m.length; r++) {
      let c = m[r];
      if (n && c === j) {
        c = S, await E(c);
        continue;
      }
      if (f(this, Z) && w.mistakes.length && w.phraseStarts.length && w.phraseStarts[0] === r) {
        const T = w.phraseLengths[0];
        for (let g = 0; g < T; g++) {
          const H = r + g, lt = w.mistakeCursors[0];
          if (c = m[H], lt === H ? await E(w.mistakes[0]) : await E(c), w.wordEnds.includes(H) && w.mistakeCursors.length) {
            const et = w.mistakeCursors[0];
            if (et <= H) {
              const ot = H - et + 1;
              for (let ft = 0; ft < ot; ft++)
                await Et(), g--;
              w.mistakes.shift(), w.mistakeCursors.shift();
            }
          }
        }
        w.phraseStarts.shift(), w.phraseLengths.shift(), r += T - 1;
        continue;
      }
      const b = m.substring(r, r + 4), I = m.substring(r, r + 5);
      if (c === "&" && I === "&oq;/") {
        const T = m.substring(r + 5, r + 6), { word: g } = w.translateBracket(c, T);
        tt(), await E(g), r += 9;
        continue;
      }
      if (c === "&" && b === "&oq;") {
        const T = m.substring(r + 4, r + 5), { word: g } = w.translateBracket(c, T);
        q(g), await E(g), r += 8;
        continue;
      }
      if (c === "&" && b === "&pp;") {
        r += 3, await E(S);
        continue;
      }
      if (c === "&" && b === "&pg;") {
        r += 3, await E(O);
        continue;
      }
      if (n) {
        if (c === "/" && I === N + O && u !== null && !u.hasCloser && u.endsAt === r + 4) {
          c = N + O, tt(), await E(c), r += 4;
          continue;
        }
        if (c === "&" && b === O && u !== null && u.endsAt === r + 3) {
          tt(), await E(O), u.hasCloser && It(), r += 3;
          continue;
        }
      }
      if (c === "&" && I === S + N) {
        u = dt(y), u === null && y - 1 > -1 && (u = dt(y - 1)), c = u.closer.text, n || (c = j + N + u.closer.name + F);
        const { word: T } = w.translateBracket(
          c,
          u.name,
          !0
        );
        if (c = T, c !== "") {
          tt(), r = u.closer.endsAt, await E(c), y--, u = null;
          continue;
        }
      }
      if (c === "&" && b !== S) {
        const T = m.substring(r).indexOf(";");
        if (T > 8) {
          await E(c);
          continue;
        }
        const g = m.substring(r, r + T + 1);
        await E(g), r += g.length - 1;
        continue;
      }
      if (c === "&" && b === S) {
        if ((u === null || u !== null && u.dirty) && (u = St()), u.startsAt !== r) {
          n ? (c = S, r += 3) : (c = u.text.replace(S, j), c = c.replace(O, F)), await E(c), u.dirty = !1;
          continue;
        }
        u.dirty = !0;
        let T = !1, g = "";
        c = u.text, n || (c = u.text.replace(S, j), c = c.replace(O, F));
        const { word: H, translated: lt } = w.translateBracket(
          c,
          u.name
        );
        if (c = H, u.hasCloser) {
          y++, g = u.closer.text, n || (g = j + N + u.closer.name + F);
          const { word: et, translated: ot } = w.translateBracket(
            g,
            u.name,
            !0
          );
          g = et, T = u.closer.contents.text.indexOf(D) > -1, ot ? (r = u.endsAt, q(T ? D + l + g : g)) : (L.push(g), M.push(T));
        }
        lt || (T = u.text.indexOf(D) > -1, n ? (c = S, r += 3, g = O) : (c = u.text.replace(S, j), c = c.replace(O, F), r += u.text.length - 1, g = j + N + u.closer.name + F), q(T ? D + l + g : g)), await E(c);
        continue;
      }
      if (c === D) {
        l = ht[C] ?? "", h = D + l;
        const T = a.length ? a[0].trim() : "", g = m.substring(
          r + 1,
          r + T.length + 1
        );
        C++, await E(h, T === g);
        continue;
      }
      await E(c);
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
}), Ft = /* @__PURE__ */ Object.assign(Ht, {
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
  setup(x) {
    const t = x, e = mt(null);
    xt(async () => {
      const s = e.value.ownerDocument;
      if (t.useHighlightJs) {
        const o = t.theme ?? "base16/monokai", a = t.language ?? "html", d = s.createElement("script");
        d.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js", s.head.appendChild(d);
        const l = [];
        l.push(
          "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css"
        ), l.push(
          `https://highlightjs.org/static/demo/styles/${o}.css`
        ), l.forEach((u) => {
          const p = s.createElement("style");
          p.innerHTML = `@import "${u}"`, s.head.appendChild(p);
        });
        const h = s.querySelectorAll("code");
        for (const u of h)
          u.setAttribute("class", `language-${a}`);
      }
      if (t.styles !== "" && t.classes !== "" && (t.styles.split(",").forEach((d) => {
        const l = s.createElement("style");
        l.innerHTML = `@import "${d}"`, s.head.appendChild(l);
      }), s.getElementById("to-write").setAttribute("class", t.classes)), t.dependsOnSelector !== "") {
        const o = s.querySelector(t.dependsOnSelector);
        if (o !== null) {
          const a = { attributes: !0 };
          new MutationObserver(
            async (l, h) => {
              for (const u of l)
                u.type === "attributes" && u.attributeName === "finished" && o.getAttribute("finished") === "true" && (h.disconnect(), await i());
            }
          ).observe(o, a);
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
}), Nt = /* @__PURE__ */ B("div", { class: "to-be-written" }, [
  /* @__PURE__ */ B("div", { id: "to-write" })
], -1), Wt = [
  Nt
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
  setup(x) {
    const t = x, e = mt(null);
    xt(async () => {
      const s = e.value.ownerDocument;
      if (t.styles !== "" && t.classes !== "" && (t.styles.split(",").forEach((d) => {
        const l = s.createElement("style");
        l.innerHTML = `@import "${d}"`, s.head.appendChild(l);
      }), s.getElementById("to-write").setAttribute("class", t.classes)), t.dependsOnSelector !== "") {
        const o = s.querySelector(t.dependsOnSelector);
        if (o !== null) {
          const a = { attributes: !0 };
          new MutationObserver(
            async (l, h) => {
              for (const u of l)
                u.type === "attributes" && u.attributeName === "finished" && o.getAttribute("finished") === "true" && (h.disconnect(), await i());
            }
          ).observe(o, a);
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
    }, Wt, 512));
  }
}), Ut = {
  install(x) {
    x.component("text-writer", Rt), x.component("code-writer", Ft);
  }
};
export {
  Ft as CodeWriter,
  Rt as TextWriter,
  Ut as VueWriterPlugin
};
