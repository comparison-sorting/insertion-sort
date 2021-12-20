// eslint-disable-next-line ava/use-test
import ava from 'ava';

import * as spec from '@comparison-sorting/specification';
import {copy} from '@array-like/copy';
import {min} from '@array-like/reduce';
import {increasing, decreasing} from '@total-order/primitive';
import {
	sort,
	sortTypedIncreasing,
	sortTypedDecreasing,
	sortTypedIncreasingOptimized,
	sortTypedDecreasingOptimized,
} from '../../src/index.js';

const sortTyped = (compare, a, i, j) => {
	switch (compare) {
		case increasing:
			return sortTypedIncreasing(a, i, j);
		case decreasing:
			return sortTypedDecreasing(a, i, j);
		default:
			throw new Error(
				'First argument `compare` should be one of {increasing, decreasing}.',
			);
	}
};

const sortTypedOptimized = (compare, a, i, j) => {
	const X = a.constructor;
	const N = j - i;
	const b = new X(N + 1);
	copy(a, i, j, b, 1);
	b[0] = min(compare, a, i, j);
	switch (compare) {
		case increasing:
			sortTypedIncreasingOptimized(b, 1, N + 1);
			return copy(b, 1, N + 1, a, i);
		case decreasing:
			sortTypedDecreasingOptimized(b, 1, N + 1);
			return copy(b, 1, N + 1, a, i);
		default:
			throw new Error(
				'First argument `compare` should be one of {increasing, decreasing}.',
			);
	}
};

spec.test(
	ava,
	[
		['sort', sort],
		['sortTyped', sortTyped],
		['sortTypedOptimized', sortTypedOptimized],
	],
	{
		compare: [increasing, decreasing],
	},
);
