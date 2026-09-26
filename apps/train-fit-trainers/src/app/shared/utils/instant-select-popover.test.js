const test = require("node:test");
const assert = require("node:assert/strict");

// El desplegable de un ion-select se abre sin animación; cualquier otro
// popover (menús, ayudas) conserva la suya.

let util;

test.before(async () => {
  util = await import("./instant-select-popover.util.ts");
});

function fakePopover({ classes = ["select-popover"], wrapper = true, shadow = true } = {}) {
  const styles = [];
  const popover = {
    animated: true,
    classList: { contains: (name) => classes.includes(name) },
    shadowRoot: shadow
      ? {
          querySelector: (selector) =>
            wrapper && selector === ".popover-wrapper"
              ? { style: { setProperty: (...args) => styles.push(args) } }
              : null,
        }
      : null,
  };
  return { popover, styles };
}

test("makeSelectPopoverInstant", async (t) => {
  await t.test("desplegable de select: sin animación y envoltorio opaco", () => {
    const { popover, styles } = fakePopover();
    assert.equal(util.makeSelectPopoverInstant(popover), true);
    assert.equal(popover.animated, false);
    assert.deepEqual(styles, [["opacity", "1", "important"]]);
  });
  await t.test("otro popover: no se toca", () => {
    const { popover, styles } = fakePopover({ classes: ["popover-desktop"] });
    assert.equal(util.makeSelectPopoverInstant(popover), false);
    assert.equal(popover.animated, true);
    assert.deepEqual(styles, []);
  });
  await t.test("sin envoltorio o sin shadowRoot: solo quita la animación, sin fallar", () => {
    for (const options of [{ wrapper: false }, { shadow: false }]) {
      const { popover, styles } = fakePopover(options);
      assert.equal(util.makeSelectPopoverInstant(popover), true);
      assert.equal(popover.animated, false);
      assert.deepEqual(styles, []);
    }
  });
  await t.test("null, undefined u objeto sin classList → false", () => {
    assert.equal(util.makeSelectPopoverInstant(null), false);
    assert.equal(util.makeSelectPopoverInstant(undefined), false);
    assert.equal(util.makeSelectPopoverInstant({}), false);
  });
});
