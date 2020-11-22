import { descendingComparator, getComparator } from '../misc';

const achilles = { name: 'Achilles', rating: 100 };
const zorro = { name: 'Zorro', rating: 0 };
const mario = { name: 'Mario', rating: 0 };

// Descending comparator
describe('descending comparator', () => {
  it(`returns -1 when 'a' prop is greater than 'b' prop`, () => {
    expect(descendingComparator(achilles, zorro, 'rating')).toBe(-1);
  });

  it(`returns 1 when 'a' prop is lestt than 'b' prop`, () => {
    expect(descendingComparator(zorro, achilles, 'rating')).toBe(1);
  });

  it(`returns 0 when 'a' prop is equal to 'b' prop`, () => {
    expect(descendingComparator(zorro, mario, 'rating')).toBe(0);
  });
});

// Comparator getter
describe('getComparator', () => {
  it('returns descending comparator when called with desc', () => {
    const descendingComparator = getComparator('desc', 'rating');

    expect(descendingComparator(achilles, zorro, 'rating')).toBe(-1);
  });

  it('returns ascending comparator when called with value other than desc', () => {
    const ascendingComparator = getComparator('sth', 'rating');

    expect(ascendingComparator(achilles, zorro, 'rating')).toBe(1);
  });
});
