// eslint-disable-next-line ava/use-test
import ava from 'ava';

import * as spec from '@aureooms/js-in-situ-sort-spec';
import {min, copy} from '@aureooms/js-array';
import {increasing, decreasing} from '@aureooms/js-compare';
import {
	sort,
	sortTypedIncreasing,
	sortTypedDecreasing,
	sortTypedIncreasingOptimized,
	sortTypedDecreasingOptimized,
} from '../../src';

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

spec.test(ava, [
	['sort', sort],
	['sortTyped', sortTyped],
	['sortTypedOptimized', sortTypedOptimized],
]);
