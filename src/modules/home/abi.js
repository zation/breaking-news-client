export default [
  {
    anonymous: false,
    input: [
      { name: 'topic', type: 'string' },
      { name: 'arg1', type: 'int32' },
    ],
    name: 'addCallResult',
    topic: 1,
    type: 'Event',
  },
  { constant: false, input: [], name: 'init', output: 'void', type: 'Action' },
  {
    constant: false,
    input: [{ name: 'eles', type: 'int32[]' }],
    name: 'testAddFromGeneralProxy',
    output: 'bool',
    type: 'Action',
  },
  {
    constant: true,
    input: [],
    name: 'testU128Return',
    output: 'uint128',
    type: 'Action',
  },
  {
    constant: true,
    input: [],
    name: 'testForAdd',
    output: 'int32',
    type: 'Action',
  },
  {
    constant: false,
    input: [{ name: 'count', type: 'int32' }],
    name: 'testForAdd2',
    output: 'int32',
    type: 'Action',
  },
  {
    constant: false,
    input: [{ name: 'count', type: 'int32' }],
    name: 'testForMulti',
    output: 'int32',
    type: 'Action',
  },
];
