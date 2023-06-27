import { defineComponent as ft, ref as mt, onMounted as wt, openBlock as xt, createElementBlock as bt, createElementVNode as L } from "vue";
var ct = (w, t, e) => {
  if (!t.has(w))
    throw TypeError("Cannot " + e);
}, g = (w, t, e) => (ct(w, t, "read from private field"), e ? e.call(w) : t.get(w)), C = (w, t, e) => {
  if (t.has(w))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(w) : t.set(w, e);
}, S = (w, t, e, n) => (ct(w, t, "write to private field"), n ? n.call(w, e) : t.set(w, e), e), Ot = (w, t, e) => (ct(w, t, "access private method"), e);
const rt = "&lt;", K = "&gt;", lt = "/";
var U, Q, M, F, X, Y, Z, R, tt, ot, kt;
class qt {
  constructor(t, e = !1) {
    C(this, ot), C(this, U, []), C(this, Q, ""), C(this, M, ""), C(this, F, []), C(this, X, []), C(this, Y, []), C(this, Z, []), C(this, R, []), C(this, tt, []), S(this, Q, t.trim()), S(this, M, `${g(this, Q)}
<Eof />`), this.protect(), e && this.markupQuotes(), this.collectWords(g(this, M)), this.makeMistakes();
  }
  get list() {
    return g(this, U);
  }
  get text() {
    return g(this, Q);
  }
  get workingText() {
    return g(this, M);
  }
  get words() {
    return g(this, F);
  }
  get mistakes() {
    return g(this, R);
  }
  get mistakeCursors() {
    return g(this, tt);
  }
  get phraseStarts() {
    return g(this, X);
  }
  get phraseLengths() {
    return g(this, Y);
  }
  get wordEnds() {
    return g(this, Z);
  }
  translateBracket(t, e, n = !1) {
    let i = t, s = !1;
    return "CDETQRG".includes(e) && (e === "C" && (i = n ? ")" : "(", s = !0), e === "D" && (i = n ? "}}" : "{{", s = !0), e === "E" && (i = n ? "}" : "{", s = !0), e === "T" && (i = n ? "]" : "[", s = !0), e === "Q" && (i = "'", s = !0), e === "R" && (i = '"', s = !0), e === "G" && (i = "`", s = !0)), { word: i, translated: s };
  }
  markupQuotes() {
    let t = g(this, M);
    const e = /(["'`])((\s|((\\)*)\\.|.)*?)\1/gm;
    let n;
    const i = [];
    for (; (n = e.exec(t)) !== null; )
      n.index === e.lastIndex && e.lastIndex++, i.push(n);
    for (let s = i.length - 1; s > -1; s--) {
      const r = i[s], a = r[1], u = r[0];
      let l = r[2];
      const d = r.index + 1, h = d + u.length - 1;
      let m = "";
      a === '"' ? m = "R" : a === "'" ? m = "Q" : a === "`" && (m = "G"), l = l.replace(/&lt;/g, "&pp;"), l = l.replace(/&gt;/g, "&pg;");
      const T = `&oq;${m}&cq;${l}&oq;/${m}&cq;`, A = t.substring(0, d - 1), f = t.substring(h);
      t = A + T + f;
    }
    S(this, M, t);
  }
  doAttributes(t) {
    const e = {}, n = /([\w]*)(\[\])?=("([\S ][^"]*)"|'([\S]*)'|\{\{ ([\w]*) \}\}|\{([\S ]*)\})/gm;
    let i;
    const s = [];
    for (; (i = n.exec(t)) !== null; )
      i.index === n.lastIndex && n.lastIndex++, s.push(i);
    for (let r = 0; r < s.length; r++) {
      const a = s[r], u = a[1], l = a[2], d = a[3].substring(0, 1), h = a[4];
      l === "[]" ? (e[u] === void 0 && (e[u] = []), e[u].push(d + h)) : e[u] = `${d}${h}`;
    }
    return e;
  }
  isClosedTag(t) {
    let e = !1;
    const { text: n } = t;
    return n === "" || (e = n.substring(n.length - 5, n.length) === lt + K), e;
  }
  isCloserTag(t) {
    let e = !1;
    const { text: n } = t;
    return n === "" || (e = n.substring(0, 5) === rt + lt), e;
  }
  makeTag(t, e, n, i, s = !1) {
    const { text: r } = t, { name: a } = t, u = this.list.length, l = {};
    return l.id = t.id, l.name = a === "" ? "Fragment" : a, l.text = r, l.startsAt = t.startsAt, l.endsAt = t.endsAt, s || (l.uid = Ot(this, ot, kt), l.method = "echo", l.props = l.name === "Fragment" ? [] : [], l.depth = n, l.hasCloser = i, l.node = !1, l.isSingle = !1), (e[n] === void 0 || e[n] === null) && (e[n] = u - 1), l.parentId = e[n], l;
  }
  protect() {
    let t = g(this, M);
    t = t.trim(), t = t.replace(/\{\{/g, "<D>"), t = t.replace(/\}\}/g, "</D>"), t = t.replace(/\(/g, "<C>"), t = t.replace(/\)/g, "</C>"), t = t.replace(/\{/g, "<E>"), t = t.replace(/\}/g, "</E>"), t = t.replace(/\[/g, "<T>"), t = t.replace(/\]/g, "</T>"), t = t.replace(/<([/\w])/g, `${rt}$1`), t = t.replace(/>/g, K), S(this, M, t);
  }
  collectTags(t, e = "[\\w]+") {
    const n = [], i = [], s = `${rt}\\/?(${e})((\\s|.*?)*?)\\/?${K}`, r = new RegExp(s, "gm");
    let a;
    for (; (a = r.exec(t)) !== null; )
      a.index === r.lastIndex && r.lastIndex++, i.push(a);
    let u = 0;
    return i.forEach((l) => {
      const d = l;
      d.id = u, d.text = l[0], d.name = l[1] === null ? "Fragment" : l[1], d.startsAt = l.index, d.endsAt = l.index + d.text.length - 1, delete d[0], delete d[1], delete d[2], delete d[3], n.push(d), u++;
    }), n;
  }
  collectWords(t) {
    const e = [], n = [];
    let i = /([&oqpg;]{4})[\w /]+([&cqpp;]{4})/gm, s;
    for (; (s = i.exec(t)) !== null; )
      s.index === i.lastIndex && i.lastIndex++, n.push(s);
    let r = t;
    for (let a = n.length - 1; a > -1; a--) {
      const u = n[a][0], l = n[a].index + 1, d = l + u.length - 1, h = "•".repeat(u.length), m = r.substring(0, l - 1), T = r.substring(d);
      r = m + h + T;
    }
    for (i = /([&lt;]{4})[\w /]+([&gt;]{4})/gm; (s = i.exec(r)) !== null; )
      s.index === i.lastIndex && i.lastIndex++, n.push(s);
    for (let a = n.length - 1; a > -1; a--) {
      const u = n[a][0], l = n[a].index + 1, d = l + u.length - 1, h = "•".repeat(u.length), m = r.substring(0, l - 1), T = r.substring(d);
      r = m + h + T;
    }
    for (i = /([&ltgt;]{4})/gm; (s = i.exec(r)) !== null; )
      s.index === i.lastIndex && i.lastIndex++, n.push(s);
    for (let a = n.length - 1; a > -1; a--) {
      const u = n[a][0], l = n[a].index + 1, d = l + u.length - 1, h = "•".repeat(u.length), m = r.substring(0, l - 1), T = r.substring(d);
      r = m + h + T;
    }
    for (i = /((?!•)\S[^•\n]*)/g; (s = i.exec(r)) !== null; )
      s.index === i.lastIndex && i.lastIndex++, g(this, X).push(s.index), g(this, Y).push(s[0].length);
    for (i = /((?!•)\S[^•\n ]*)/g; (s = i.exec(r)) !== null; ) {
      s.index === i.lastIndex && i.lastIndex++;
      const a = {};
      a.text = s[0], a.startsAt = s.index, a.endsAt = a.startsAt + s[0].length - 1, e.push(a), g(this, Z).push(a.endsAt);
    }
    S(this, F, e);
  }
  makeMistakes() {
    let t = Math.ceil(Math.random() * 2) - 2;
    const e = Math.ceil(Math.random() * 3) + 2;
    g(this, F).forEach((n) => {
      if (t++, t % e !== 0 || n.text.length < 4)
        return;
      const i = Math.ceil(Math.random() * n.text.length) - 1, s = String.fromCharCode(
        Math.ceil(Math.random() * 26) + 96
      );
      g(this, tt).push(n.startsAt + i), g(this, R).push(s);
    });
  }
  makeFaultyText() {
    let t = g(this, M);
    g(this, R).forEach((e) => {
      const n = t.substring(0, e.startsAt), i = t.substring(e.endsAt + 1);
      t = n + e.text + i;
    }), S(this, M, t);
  }
  splitTags(t) {
    let e = [...t], n = e.length, i = 0, s = !1, r = 0;
    const a = n;
    let u = !1;
    const l = [], d = [];
    for (; e.length > 0 && !s && !u; ) {
      if (i === n) {
        if (i = 0, e = Object.values(e), n = e.length, n === 0) {
          s = !0;
          continue;
        }
        r++, u = r > a + 1;
      }
      const h = e[i];
      if (e.length === 1 && h.name === "Eof") {
        s = !0;
        continue;
      }
      if (this.isClosedTag(h) && h.name !== "Eof") {
        d[i] = e[i], delete e[i], i++;
        continue;
      }
      if (i + 1 < n) {
        const m = e[i + 1];
        if (!this.isCloserTag(h) && this.isCloserTag(m)) {
          if (h.name !== m.name) {
            l.push(h), delete e[i], i++;
            continue;
          }
          d[i] = e[i], d[i + 1] = e[i + 1], delete e[i], delete e[i + 1], i += 2;
          continue;
        }
      }
      i++;
    }
    return { regularTags: d, singleTags: l };
  }
  replaceTags(t, e) {
    let n = t, i = e;
    const s = [];
    e.forEach((r) => {
      s[r.id] = r;
    }), s.sort(), i = Object.values(s);
    for (let r = i.length - 1; r > -1; r--) {
      const a = i[r];
      a.text = a.text.substring(0, a.text.length - 4) + lt + K;
      const u = n.substring(0, a.startsAt), l = n.substring(a.endsAt + 1);
      n = u + a.text + l;
    }
    return n;
  }
  doComponents(t = "[\\w]+") {
    let e = g(this, M);
    const n = this.collectTags(e, t), i = [];
    let s = [], r = 0;
    const a = [];
    let u = n.length, l = 0, d = !1, h = 0;
    const m = u;
    let T = !1;
    a[r] = -1;
    const { singleTags: A } = this.splitTags(n);
    let f = n;
    for (A.length && (A.forEach((v) => i.push(v.id)), e = this.replaceTags(e, A), f = this.collectTags(e, t)); f.length > 0 && !d && !T; ) {
      if (l === u) {
        if (l = 0, f = Object.values(f), u = f.length, u === 0) {
          d = !0;
          continue;
        }
        h++, T = h > m + 1;
      }
      const v = f[l];
      if (f.length === 1 && v.name === "Eof") {
        d = !0;
        continue;
      }
      if (this.isClosedTag(v) && v.name !== "Eof") {
        const I = this.makeTag(v, a, r, !1);
        I.isSingle = i.includes(v.id), s[I.id] = I, delete f[l], l++;
        continue;
      }
      if (this.isCloserTag(v) && r--, l + 1 < u) {
        const I = f[l + 1];
        if (!this.isCloserTag(v) && this.isCloserTag(I)) {
          const O = this.makeTag(v, a, r, !0), E = this.makeTag(
            I,
            a,
            r,
            !1,
            !0
          );
          E.contents = {}, E.parentId = O.id, E.contents.startsAt = O.endsAt + 1, E.contents.endsAt = E.startsAt;
          const nt = e.substring(
            E.contents.startsAt,
            E.contents.endsAt
          );
          E.contents.text = nt, O.closer = E, s[O.id] = O, delete f[l], delete f[l + 1], l += 2;
          continue;
        }
        !this.isCloserTag(v) && !this.isCloserTag(I) && (r++, a[r] = v.id);
      }
      l++;
    }
    s = Object.values(s), S(this, M, e), S(this, U, s);
  }
}
U = /* @__PURE__ */ new WeakMap(), Q = /* @__PURE__ */ new WeakMap(), M = /* @__PURE__ */ new WeakMap(), F = /* @__PURE__ */ new WeakMap(), X = /* @__PURE__ */ new WeakMap(), Y = /* @__PURE__ */ new WeakMap(), Z = /* @__PURE__ */ new WeakMap(), R = /* @__PURE__ */ new WeakMap(), tt = /* @__PURE__ */ new WeakMap(), ot = /* @__PURE__ */ new WeakSet(), kt = function() {
  return Date.now() * Math.random();
};
const W = "&lt;", j = "&gt;", q = "<", D = ">", _ = "/", H = `
`;
var et, G, st, N, J;
class Tt {
  constructor(t, e, n, i, s) {
    C(this, et, ""), C(this, G, 60), C(this, st, !1), C(this, N, () => {
    }), C(this, J, () => {
    }), S(this, N, t), S(this, et, e), S(this, G, n), S(this, J, s), S(this, st, i);
  }
  async writeLikeAHuman(t, e) {
    const n = e !== void 0, i = g(this, N).querySelector(
      `pre#${e} code`
    ), s = g(this, N).querySelector(
      n ? `pre#${t} code` : `div#${t}`
    );
    let r = g(this, G), a = [], u = "", l = "", d = "", h = null, m = [];
    const T = [];
    let A = "", f = "", v = -1;
    const I = [], O = [];
    let E = 0, nt = this;
    function ht(o) {
      return new Promise((c) => {
        setTimeout(c, o);
      });
    }
    function vt(o) {
      return Math.floor(o * 0.75 + Math.random() * o);
    }
    async function y(o, c = !1) {
      let b = a.join("");
      c && (b = b.trim()), r = vt(g(nt, G)), u += o, s.innerHTML = u + b, n && window.hljs !== void 0 && window.hljs.highlightElement(s), await ht(r);
    }
    async function yt() {
      const o = a.join("");
      u = u.substring(0, u.length - 1), s.innerHTML = u + o, await ht(r);
    }
    function V(o) {
      a.unshift(o);
    }
    function P() {
      delete a[0], a = Object.values(a);
    }
    function Ct(o) {
      const c = [], b = /^([^\S][ \s]+)*/gm;
      let $;
      for (; ($ = b.exec(o)) !== null; )
        $.index === b.lastIndex && b.lastIndex++, c.push($[0] ?? "");
      return c;
    }
    function Et(o) {
      const c = /^([^\S][ \s]+)*/gm;
      return o.replace(c, "");
    }
    function At(o) {
      const c = o.split(`
`);
      return "<br />".repeat(c.length);
    }
    async function ut(o) {
      let c = "";
      return await fetch(o).then((b) => b.text()).then((b) => {
        c = b;
      }), console.log({ url: o, loadText: ut }), c;
    }
    function Mt(o) {
      return o.replaceAll(
        W,
        q
      ).replaceAll(j, D);
    }
    function St() {
      let o = null;
      return m.length && (o = m.shift(), o.hasCloser && T.push(o)), o;
    }
    function Wt() {
      return T.length ? T[T.length - 1] : null;
    }
    function It() {
      if (!I.length)
        return null;
      const o = I.pop(), c = O.pop();
      V(c ? H + l + o : o);
    }
    function dt(o) {
      let c = null;
      if (!T.length || (c = Wt(), o === c.depth))
        return c;
      let b = !1;
      for (let $ = T.length - 1; $ > -1; $--)
        if (c = T[$], o === c.depth) {
          b = !0;
          break;
        }
      return b ? c : null;
    }
    const $t = g(this, et);
    n && window.hljs !== void 0 && window.hljs.highlightElement(i), A = await ut($t), console.log({ text: A });
    const gt = Ct(A);
    A = Et(A);
    const x = new qt(A, n);
    x.doComponents(), m = [...x.list], f = x.workingText.replace(
      `${H + W}Eof ${_}${j}`,
      ""
    ), n && (i.innerHTML = At(A + `
`));
    const jt = gt[E] ?? "";
    await y(jt), E++;
    for (let o = 0; o < f.length; o++) {
      let c = f[o];
      if (n && c === q) {
        c = W, await y(c);
        continue;
      }
      if (g(this, st) && x.mistakes.length && x.phraseStarts.length && x.phraseStarts[0] === o) {
        const k = x.phraseLengths[0];
        for (let p = 0; p < k; p++) {
          const B = o + p, it = x.mistakeCursors[0];
          if (c = f[B], it === B ? await y(x.mistakes[0]) : await y(c), x.wordEnds.includes(B) && x.mistakeCursors.length) {
            const z = x.mistakeCursors[0];
            if (z <= B) {
              const at = B - z + 1;
              for (let pt = 0; pt < at; pt++)
                await yt(), p--;
              x.mistakes.shift(), x.mistakeCursors.shift();
            }
          }
        }
        x.phraseStarts.shift(), x.phraseLengths.shift(), o += k - 1;
        continue;
      }
      const b = f.substring(o, o + 4), $ = f.substring(o, o + 5);
      if (c === "&" && $ === "&oq;/") {
        const k = f.substring(o + 5, o + 6), { word: p } = x.translateBracket(c, k);
        P(), await y(p), o += 9;
        continue;
      }
      if (c === "&" && b === "&oq;") {
        const k = f.substring(o + 4, o + 5), { word: p } = x.translateBracket(c, k);
        V(p), await y(p), o += 8;
        continue;
      }
      if (c === "&" && b === "&pp;") {
        o += 3, await y(W);
        continue;
      }
      if (c === "&" && b === "&pg;") {
        o += 3, await y(j);
        continue;
      }
      if (n) {
        if (c === "/" && $ === _ + j && h !== null && !h.hasCloser && h.endsAt === o + 4) {
          c = _ + j, P(), await y(c), o += 4;
          continue;
        }
        if (c === "&" && b === j && h !== null && h.endsAt === o + 3) {
          P(), await y(j), h.hasCloser && It(), o += 3;
          continue;
        }
      }
      if (c === "&" && $ === W + _) {
        h = dt(v), h === null && v - 1 > -1 && (h = dt(v - 1)), c = h.closer.text, n || (c = q + _ + h.closer.name + D);
        const { word: k } = x.translateBracket(
          c,
          h.name,
          !0
        );
        if (c = k, c !== "") {
          P(), o = h.closer.endsAt, await y(c), v--, h = null;
          continue;
        }
      }
      if (c === "&" && b !== W) {
        const k = f.substring(o).indexOf(";");
        if (k > 8) {
          await y(c);
          continue;
        }
        const p = f.substring(o, o + k + 1);
        await y(p), o += p.length - 1;
        continue;
      }
      if (c === "&" && b === W) {
        if ((h === null || h !== null && h.dirty) && (h = St()), h.startsAt !== o) {
          n ? (c = W, o += 3) : (c = h.text.replace(W, q), c = c.replace(j, D)), await y(c), h.dirty = !1;
          continue;
        }
        h.dirty = !0;
        let k = !1, p = "";
        c = h.text, n || (c = h.text.replace(W, q), c = c.replace(j, D));
        const { word: B, translated: it } = x.translateBracket(
          c,
          h.name
        );
        if (c = B, h.hasCloser) {
          v++, p = h.closer.text, n || (p = q + _ + h.closer.name + D);
          const { word: z, translated: at } = x.translateBracket(
            p,
            h.name,
            !0
          );
          p = z, k = h.closer.contents.text.indexOf(H) > -1, at ? (o = h.endsAt, V(k ? H + l + p : p)) : (I.push(p), O.push(k));
        }
        it || (k = h.text.indexOf(H) > -1, n ? (c = W, o += 3, p = j) : (c = h.text.replace(W, q), c = c.replace(j, D), o += h.text.length - 1, p = q + _ + h.closer.name + D), V(k ? H + l + p : p)), await y(c);
        continue;
      }
      if (c === H) {
        l = gt[E] ?? "", d = H + l;
        const k = a.length ? a[0].trim() : "", p = f.substring(
          o + 1,
          o + k.length + 1
        );
        E++, await y(d, k === p);
        continue;
      }
      await y(c);
    }
    u = Mt(u), this.finishedEvent(u);
  }
  finishedEvent(t) {
    typeof g(this, J) == "function" && g(this, J).call(this, t);
  }
}
et = /* @__PURE__ */ new WeakMap(), G = /* @__PURE__ */ new WeakMap(), st = /* @__PURE__ */ new WeakMap(), N = /* @__PURE__ */ new WeakMap(), J = /* @__PURE__ */ new WeakMap();
const Ht = /* @__PURE__ */ L(
  "div",
  { class: "to-be-written" },
  [
    /* @__PURE__ */ L("div", { id: "to-write" })
  ],
  -1
  /* HOISTED */
), Lt = [
  Ht
], Bt = ft({
  name: "TextWriter"
});
var Dt = /* @__PURE__ */ Object.assign(Bt, {
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
  setup(w) {
    const t = w, e = mt(null);
    wt(async () => {
      const s = e.value.ownerDocument;
      if (t.styles !== "" && t.classes !== "" && (t.styles.split(",").forEach((r) => {
        const a = s.createElement("style");
        a.innerHTML = `@import "${r}"`, s.head.appendChild(a);
      }), s.getElementById("to-write").setAttribute("class", t.classes)), t.dependsOnSelector !== "") {
        const r = s.querySelector(t.dependsOnSelector);
        if (r !== null) {
          const a = { attributes: !0 };
          new MutationObserver(
            async (u, l) => {
              for (const d of u)
                d.type === "attributes" && d.attributeName === "finished" && r.getAttribute("finished") === "true" && (l.disconnect(), await i());
            }
          ).observe(r, a);
        }
      } else
        await i();
    });
    const n = function(s) {
      const r = new CustomEvent("finishedWriting", {
        bubbles: !0,
        cancellable: !0,
        detail: {
          content: s
        }
      });
      e.value.dispatchEvent(r), e.value.setAttribute("finished", "true");
    }, i = async () => {
      const s = e.value.ownerDocument;
      await new Tt(
        s,
        t.source,
        t.speed,
        t.makeTypos,
        n
      ).writeLikeAHuman("to-write");
    };
    return (s, r) => (xt(), bt(
      "div",
      {
        ref_key: "root",
        ref: e,
        class: "text-snippet"
      },
      Lt,
      512
      /* NEED_PATCH */
    ));
  }
});
Dt.__file = "src/components/TextWriter.vue";
const _t = /* @__PURE__ */ L(
  "div",
  { class: "to-be-copied" },
  [
    /* @__PURE__ */ L("pre", { id: "to-copy" }, [
      /* @__PURE__ */ L("code")
    ])
  ],
  -1
  /* HOISTED */
), Qt = /* @__PURE__ */ L(
  "div",
  { class: "to-be-written" },
  [
    /* @__PURE__ */ L("pre", { id: "to-write" }, [
      /* @__PURE__ */ L("code")
    ])
  ],
  -1
  /* HOISTED */
), Ft = [
  _t,
  Qt
], Rt = ft({
  name: "CodeWriter"
});
var Gt = /* @__PURE__ */ Object.assign(Rt, {
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
  setup(w) {
    const t = w, e = mt(null);
    wt(async () => {
      const s = e.value.ownerDocument;
      if (t.useHighlightJs) {
        const r = t.theme ?? "base16/monokai", a = t.language ?? "html", u = s.createElement("script");
        u.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js", s.head.appendChild(u);
        const l = [];
        l.push(
          "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css"
        ), l.push(
          `https://highlightjs.org/static/demo/styles/${r}.css`
        ), l.forEach((h) => {
          const m = s.createElement("style");
          m.innerHTML = `@import "${h}"`, s.head.appendChild(m);
        });
        const d = s.querySelectorAll("code");
        for (const h of d)
          h.setAttribute("class", `language-${a}`);
      }
      if (t.styles !== "" && t.classes !== "" && (t.styles.split(",").forEach((r) => {
        const a = s.createElement("style");
        a.innerHTML = `@import "${r}"`, s.head.appendChild(a);
      }), s.getElementById("to-write").setAttribute("class", t.classes)), t.dependsOnSelector !== "") {
        const r = s.querySelector(t.dependsOnSelector);
        if (r !== null) {
          const a = { attributes: !0 };
          new MutationObserver(
            async (u, l) => {
              for (const d of u)
                d.type === "attributes" && d.attributeName === "finished" && r.getAttribute("finished") === "true" && (l.disconnect(), await i());
            }
          ).observe(r, a);
        }
      } else
        await i();
    });
    const n = function(s) {
      const r = new CustomEvent("finishedWriting", {
        bubbles: !0,
        cancellable: !0,
        detail: {
          content: s
        }
      });
      e.value.dispatchEvent(r), e.value.setAttribute("finished", "true");
    }, i = async () => {
      const s = e.value.ownerDocument;
      await new Tt(s, t.source, t.speed, t.makeTypos, n).writeLikeAHuman("to-write", "to-copy");
    };
    return (s, r) => (xt(), bt(
      "div",
      {
        ref_key: "root",
        ref: e,
        class: "code-snippet"
      },
      Ft,
      512
      /* NEED_PATCH */
    ));
  }
});
Gt.__file = "src/components/CodeWriter.vue";
export {
  Gt as CodeWriter,
  Dt as TextWriter
};
