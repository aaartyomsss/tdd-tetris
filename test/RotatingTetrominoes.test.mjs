
import { describe, test } from "vitest";
import { expect } from "chai";
import { Tetromino } from "../src/Tetromino.mjs";

function distinctOrientations(shape) {
  const distinct = new Set();
  let goingRight = shape;
  let goingLeft = shape;
  for (let i = 0; i < 10; i++) {
    distinct.add(goingRight.toString());
    goingRight = goingRight.rotateRight();
    distinct.add(goingLeft.toString());
    goingLeft = goingLeft.rotateLeft();
  }
  return distinct;
}

describe("The Arika T shape", () => {
  const shape = Tetromino.T_SHAPE;

  test("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `....
       TTT.
       .T..
       ....`
    );
  });

  test("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `.T..
       TT..
       .T..
       ....`
    );
  });

  test("can be rotated right/clockwise twice", () => {
    expect(shape.rotateRight().rotateRight().toString()).to.equalShape(
      `....
       .T..
       TTT.
       ....`
    );
  });

  test("can be rotated right/clockwise three times", () => {
    expect(shape.rotateRight().rotateRight().rotateRight().toString()).to.equalShape(
      `.T..
       .TT.
       .T..
       ....`
    );
  });

  test("can be rotated right/clockwise four times", () => {
    expect(shape.rotateRight().rotateRight().rotateRight().rotateRight().toString()).to.equalShape(
      `....
       TTT.
       .T..
       ....`
    );
  });

  test("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `.T..
       .TT.
       .T..
       ....`
    );
  });

  test("Returns how cols from the left are free", () => {
    expect(shape.rotateRight().freeColsFromLeft()).to.equal(0);
  });

  test("Returns how cols from the right are free", () => {
    expect(shape.rotateLeft().freeColsFromRight()).to.equal(1);
    expect(shape.rotateRight().freeColsFromRight()).to.equal(2);
  });

  test("has 4 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(4);
  });
});


describe("The I shape", () => {
  const shape = Tetromino.I_SHAPE;

  test("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `....
       IIII
       ....
       ....`
    );
  });

  test("Returns how many rows from the bottom are free", () => {
    expect(shape.freeRowsFromBottom()).to.equal(2);
  });

  test("Returns how many rows from the top are free", () => {
    expect(shape.freeRowsFromTop()).to.equal(1);
  });

  test("Returns how cols from the left are free", () => {
    expect(shape.rotateRight().freeColsFromLeft()).to.equal(2);
  });

  test("Returns how cols from the right are free", () => {
    expect(shape.freeColsFromRight()).to.equal(0);
    const rotated = shape.rotateRight()
    expect(rotated.freeColsFromRight()).to.equal(1);
  });

  test("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `..I.
       ..I.
       ..I.
       ..I.`
    );
  });

  test("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `..I.
       ..I.
       ..I.
       ..I.`
    );
  });

  test("has 2 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(2);
  });
});


describe("The O shape", () => {
  const shape = Tetromino.O_SHAPE;

  test("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `....
       .OO.
       .OO.
       ....`
    );
  });

  test("cannot be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `....
       .OO.
       .OO.
       ....`
    );
  });

  test("cannot be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `....
       .OO.
       .OO.
       ....`
    );
  });

  test("has 1 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(1);
  });
});

describe("L shape", () => {
  const shape = Tetromino.L_SHAPE;

  test("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `....
       LLL.
       L...
       ....`
    );
  });

  test("Rotate right", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `LL..
       .L..
       .L..
       ....`
    );
  })

  test("Rotate right 2", () => {
    expect(shape.rotateRight().rotateRight().toString()).to.equalShape(
      `....
       ..L.
       LLL.
       ....`
    );
  })

  test("Rotate right 3", () => {
    expect(shape.rotateRight().rotateRight().rotateRight().toString()).to.equalShape(
      `.L..
       .L..
       .LL.
       ....`
    );
  })

  test("Rotate right full", () => {
    expect(shape.rotateRight().rotateRight().rotateRight().rotateRight().toString()).to.equalShape(
      `....
       LLL.
       L...
       ....`
    );
  })
})