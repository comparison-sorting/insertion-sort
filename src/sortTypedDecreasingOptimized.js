import assert from 'assert';

/**
 * Hyp: a[i-1] >= max(a[i:j]).
 */
const sortTypedDecreasingOptimized = (a, i, j) => {
	assert(i >= 1);
	for (let k = i + 1; k < j; ++k) {
		let t = k;
		const o = a[t];
		while (a[--t] < o) a[t + 1] = a[t];
		a[t + 1] = o;
	}
};

export default sortTypedDecreasingOptimized;
