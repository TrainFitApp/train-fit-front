const test = require("node:test");
const assert = require("node:assert/strict");

// Las cuentas de exchange-plan.util.ts.
//
// Mismo montaje que exchange-math.test.js: node:test apuntado al .ts, sin
// karma ni jest para funciones puras. Pide Node >= 22.6 (con 20 falla con
// ERR_UNKNOWN_FILE_EXTENSION).
//
// Estos números deciden lo que come una persona todos los días. Cada caso
// lleva al lado la cuenta hecha a mano, porque un descuento olvidado no falla:
// simplemente hace que alguien se pase 30 g de proteína sin que nadie lo vea.

let plan;

test.before(async () => {
  plan = await import("./exchange-plan.util.ts");
});

// Los perfiles de la tabla estándar (components/foodExchanges/starter-pack.js).
const ALMIDONES = { kcal: 80, protein: 3, carbs: 15, fat: 1 };
const FRUTAS = { kcal: 60, protein: 0, carbs: 15, fat: 0 };
const VERDURAS = { kcal: 25, protein: 2, carbs: 5, fat: 0 };
const LACTEOS = { kcal: 90, protein: 8, carbs: 12, fat: 0 };
const CARNES = { kcal: 55, protein: 7, carbs: 0, fat: 2 };
const GRASAS = { kcal: 45, protein: 0, carbs: 0, fat: 5 };

const GRUPOS = [
  { _id: "alm", name: "Almidones y cereales", serving: ALMIDONES, role: "carb" },
  { _id: "fru", name: "Frutas", serving: FRUTAS, role: "fruit" },
  { _id: "ver", name: "Verduras", serving: VERDURAS, role: "vegetable" },
  { _id: "lac", name: "Lácteos desnatados", serving: LACTEOS, role: "dairy" },
  { _id: "car", name: "Carnes magras", serving: CARNES, role: "protein" },
  { _id: "gra", name: "Grasas", serving: GRASAS, role: "fat" },
];

test("sumReparto", async (t) => {
  await t.test("suma count x perfil congelado", () => {
    const { totals, counted } = plan.sumReparto([
      {
        name: "Comida",
        exchanges: [
          { groupId: "car", groupName: "Carnes magras", count: 3, serving: CARNES },
          { groupId: "alm", groupName: "Almidones", count: 4, serving: ALMIDONES },
        ],
      },
    ]);
    // 3x55 + 4x80 = 165 + 320 = 485 kcal; 21 + 12 = 33 P; 0 + 60 = 60 HC; 6 + 4 = 10 G
    assert.equal(counted, 2);
    assert.deepEqual(totals, { kcal: 485, protein: 33, carbs: 60, fat: 10 });
  });

  await t.test("libre e incompleto se devuelven POR SEPARADO", () => {
    // No significan lo mismo: uno no suma porque el entrenador lo decidió, el
    // otro porque falta el dato. Juntarlos hace saltar el aviso en repartos
    // correctos que llevan verduras, y así se aprende a ignorarlo.
    const { counted, free, incomplete } = plan.sumReparto([
      {
        name: "Cena",
        exchanges: [
          { groupId: "car", groupName: "Carnes magras", count: 2, serving: CARNES },
          { groupId: "ver", groupName: "Verduras libres", count: 2, freeQuantity: true },
          { groupId: "x", groupName: "Grasas", count: 1, serving: { fat: 5 } },
        ],
      },
    ]);
    assert.equal(counted, 1);
    assert.deepEqual(free, [{ groupName: "Verduras libres", count: 2 }]);
    assert.deepEqual(incomplete, [{ groupName: "Grasas", count: 1 }]);
  });
});

test("cuadre", async (t) => {
  await t.test("marca dentro y fuera de tolerancia", () => {
    const rows = plan.cuadre(
      { kcal: 2100, protein: 151, carbs: 200, fat: 80 },
      { kcal: 2000, protein: 150, carbs: 200, fat: 65 }
    );
    const porMacro = Object.fromEntries(rows.map((row) => [row.macro, row]));
    assert.equal(porMacro.kcal.pct, 5);
    assert.equal(porMacro.kcal.withinTolerance, true);
    // 80 vs 65 = +23,1 %
    assert.equal(porMacro.fat.pct, 23.1);
    assert.equal(porMacro.fat.withinTolerance, false);
  });

  await t.test("objetivo sin ese macro: null, no false", () => {
    // Un objetivo sin grasa definida no es un objetivo con 0 g de grasa.
    // Pintarlo en rojo mandaría a corregir algo que nadie ha pautado.
    const rows = plan.cuadre({ kcal: 2000, protein: 150, carbs: 200, fat: 70 }, { kcal: 2000 });
    const grasa = rows.find((row) => row.macro === "fat");
    assert.equal(grasa.withinTolerance, null);
  });
});

test("proposeReparto", async (t) => {
  await t.test("resuelve en orden y DESCUENTA lo que aportan los anteriores", () => {
    // A mano, contra 2000 kcal / 150 P / 200 HC / 65 G con 3 verduras,
    // 2 frutas y 1 lácteo fijados:
    //   HC ya puestos:  3x5 + 2x15 + 1x12 = 57  ->  (200-57)/15 = 9,53 -> 9,5
    //   P ya puesta:    3x2 + 1x8 + 9,5x3 = 42,5 -> (150-42,5)/7 = 15,36 -> 15,5
    //   G ya puesta:    9,5x1 + 15,5x2 = 40,5   -> (65-40,5)/5 = 4,9 -> 5
    const { counts, missing } = plan.proposeReparto(
      { kcal: 2000, protein: 150, carbs: 200, fat: 65 },
      GRUPOS,
      { vegetable: 3, fruit: 2, dairy: 1 }
    );
    assert.deepEqual(missing, []);
    const porGrupo = Object.fromEntries(counts.map((row) => [row.groupId, row.count]));
    assert.deepEqual(porGrupo, { ver: 3, fru: 2, lac: 1, alm: 9.5, car: 15.5, gra: 5 });
  });

  await t.test("lo propuesto cuadra de verdad contra el objetivo", () => {
    // La comprobación que importa: que la propuesta, sumada, caiga dentro de
    // la tolerancia. Si el descuento estuviera mal, esto es lo que lo pilla.
    const targets = { kcal: 2000, protein: 150, carbs: 200, fat: 65 };
    const { counts } = plan.proposeReparto(targets, GRUPOS, {
      vegetable: 3,
      fruit: 2,
      dairy: 1,
    });
    const meals = [
      {
        name: "Día",
        exchanges: counts.map((row) => ({
          groupId: row.groupId,
          groupName: row.groupName,
          count: row.count,
          serving: GRUPOS.find((group) => group._id === row.groupId).serving,
        })),
      },
    ];
    const { totals } = plan.sumReparto(meals);
    for (const row of plan.cuadre(totals, targets)) {
      assert.equal(row.withinTolerance, true, `${row.macro} se sale: ${row.pct}%`);
    }
  });

  await t.test("dice qué papel falta en vez de proponer a medias", () => {
    const sinGrasa = GRUPOS.filter((group) => group.role !== "fat");
    const { missing } = plan.proposeReparto(
      { kcal: 2000, protein: 150, carbs: 200, fat: 65 },
      sinGrasa
    );
    assert.equal(missing.length, 1);
    assert.equal(missing[0].role, "fat");
  });

  await t.test("un grupo sin perfil completo no sirve para resolver", () => {
    const grupos = GRUPOS.map((group) =>
      group.role === "carb" ? { ...group, serving: { carbs: 15 } } : group
    );
    const { missing } = plan.proposeReparto({ protein: 150, carbs: 200 }, grupos);
    assert.ok(missing.some((row) => row.role === "carb"));
  });

  await t.test("sin gramos en el objetivo no se inventa nada", () => {
    const { counts, missing } = plan.proposeReparto({ kcal: 2000 }, GRUPOS);
    assert.deepEqual(counts, []);
    assert.equal(missing[0].role, "targets");
  });
});

test("suggestFix", async (t) => {
  const meals = [
    {
      name: "Cena",
      exchanges: [{ groupId: "gra", groupName: "Grasas", count: 3, serving: GRASAS }],
    },
  ];

  await t.test("propone el paso que más acerca al objetivo", () => {
    // 3 raciones = 15 g de grasa contra 10 pautados: +50 %. Quitar una la
    // deja en 10 exactos.
    const fix = plan.suggestFix(meals, { fat: 10 });
    assert.equal(fix.groupId, "gra");
    assert.equal(fix.delta, -1);
    assert.equal(fix.worstPctAfter, 0);
  });

  await t.test("null cuando ya cuadra: no hay nada que sugerir", () => {
    assert.equal(plan.suggestFix(meals, { fat: 15 }), null);
  });

  await t.test("no propone bajar de cero raciones", () => {
    const poco = [
      {
        name: "Cena",
        exchanges: [{ groupId: "gra", groupName: "Grasas", count: 0.5, serving: GRASAS }],
      },
    ];
    const fix = plan.suggestFix(poco, { fat: 40 });
    assert.ok(fix.delta > 0, "faltando grasa, la sugerencia tiene que ser subir");
  });
});

// Los perfiles de la tabla estándar, tal y como los sirve
// GET /trainer/food-exchanges/reference-profiles.
const REFERENCIAS = [
  { key: 'starch', name: 'Almidones y cereales', category: 'Carbohidrato', anchor: 'carbs', serving: ALMIDONES },
  { key: 'fruit', name: 'Frutas', category: 'Fruta', anchor: 'carbs', serving: FRUTAS },
  { key: 'meat', name: 'Carnes magras', category: 'Proteína', anchor: 'protein', serving: CARNES },
  { key: 'dairy', name: 'Lácteos desnatados', category: 'Lácteo', anchor: 'protein', serving: LACTEOS },
  { key: 'fat', name: 'Grasas', category: 'Grasa', anchor: 'fat', serving: GRASAS },
];

test("referenceCandidates", async (t) => {
  await t.test("escala la referencia al tamaño de ración del entrenador", () => {
    // Su ración de proteína son 20 g; la estándar, 7. Ratio 20/7 = 2,857.
    // kcal 55 x 2,857 = 157,1 -> 157. Grasa 2 x 2,857 = 5,71 -> 5,7.
    const [mejor] = plan.referenceCandidates(REFERENCIAS, "protein", 20, "Proteína");
    assert.equal(mejor.key, "meat");
    assert.equal(mejor.ratio, 2.86);
    assert.equal(mejor.scaled.kcal, 157);
    assert.equal(mejor.scaled.fat, 5.7);
  });

  await t.test("el anchor queda EXACTO en lo que él dijo", () => {
    // Su cifra no se redondea contra una multiplicación: es suya.
    const [mejor] = plan.referenceCandidates(REFERENCIAS, "protein", 20);
    assert.equal(mejor.scaled.protein, 20);
  });

  await t.test("solo referencias que igualen lo mismo", () => {
    // Escalar un perfil de hidratos por una ración de proteína no significa
    // nada.
    const candidatos = plan.referenceCandidates(REFERENCIAS, "fat", 10);
    assert.deepEqual(candidatos.map((row) => row.key), ["fat"]);
  });

  await t.test("su categoría primero: 15 g de hidratos son almidón o fruta", () => {
    const porFruta = plan.referenceCandidates(REFERENCIAS, "carbs", 15, "Fruta");
    assert.equal(porFruta[0].key, "fruit");
    const porCereal = plan.referenceCandidates(REFERENCIAS, "carbs", 15, "Carbohidrato");
    assert.equal(porCereal[0].key, "starch");
  });

  await t.test("avisa cuando la estimación se estira demasiado", () => {
    // 45 g de proteína por ración contra los 7 estándar: x6,4. Se ofrece,
    // porque puede ser lo que quiere, pero se dice.
    const [mejor] = plan.referenceCandidates(REFERENCIAS, "protein", 45, "Proteína");
    assert.equal(mejor.isStretched, true);
    const normal = plan.referenceCandidates(REFERENCIAS, "protein", 20, "Proteína")[0];
    assert.equal(normal.isStretched, false);
  });

  await t.test("sin anchor o sin cifra no hay nada que escalar", () => {
    assert.deepEqual(plan.referenceCandidates(REFERENCIAS, null, 20), []);
    assert.deepEqual(plan.referenceCandidates(REFERENCIAS, "protein", 0), []);
  });
});

test("applyReference", async (t) => {
  const [referencia] = plan.referenceCandidates(REFERENCIAS, "protein", 20, "Proteína");

  await t.test("rellena solo los huecos", () => {
    const resultado = plan.applyReference(
      { kcal: 110, protein: 20, carbs: null, fat: null },
      referencia
    );
    // Las 110 kcal suyas se quedan; los dos huecos se rellenan.
    assert.equal(resultado.kcal, 110);
    assert.equal(resultado.carbs, 0);
    assert.equal(resultado.fat, 5.7);
  });

  await t.test("un 0 declarado es un valor, no un hueco", () => {
    const resultado = plan.applyReference({ kcal: null, protein: 20, carbs: 0, fat: 0 }, referencia);
    assert.equal(resultado.fat, 0);
    assert.equal(resultado.kcal, 157);
  });
});
