import {
  removeDuplicatesFromObjectArray,
  removeDuplicatesFromStringArray,
} from '../../src/utils';

describe('Duplicates test', () => {
  test('Removing duplicates from string array', () => {
    const array = removeDuplicatesFromStringArray([
      '3ce35b4e-cb7b-494f-a648-d03426e98500',
      '3ce35b4e-cb7b-494f-a648-d03426e98500',
      '303b6c9d-6390-4247-b7cd-69c1f1651dec',
      'f45280c6-b80d-40b2-94e5-354241b9a697',
      'f45280c6-b80d-40b2-94e5-354241b9a697',
    ]);

    expect(array).toHaveLength(3);
    expect(array).toEqual(
      expect.arrayContaining([
        'f45280c6-b80d-40b2-94e5-354241b9a697',
        '303b6c9d-6390-4247-b7cd-69c1f1651dec',
        '3ce35b4e-cb7b-494f-a648-d03426e98500',
      ])
    );

  });

  test('Removing duplicates from object array', () => {
    const array = removeDuplicatesFromObjectArray([
      {
        id: { equals: 'f45280c6-b80d-40b2-94e5-354241b9a697' },
      },
      { id: { equals: 'f45280c6-b80d-40b2-94e5-354241b9a697' } },
      { id: { equals: '303b6c9d-6390-4247-b7cd-69c1f1651dec' } },
      { id: { equals: '3ce35b4e-cb7b-494f-a648-d03426e98500' } },
      { id: { equals: '3ce35b4e-cb7b-494f-a648-d03426e98500' } },
    ]);

    expect(array).toHaveLength(3);
    expect(array).toEqual(
      expect.arrayContaining([
        { id: { equals: 'f45280c6-b80d-40b2-94e5-354241b9a697' } },
        { id: { equals: '303b6c9d-6390-4247-b7cd-69c1f1651dec' } },
        { id: { equals: '3ce35b4e-cb7b-494f-a648-d03426e98500' } },
      ])
    );

  });
});
