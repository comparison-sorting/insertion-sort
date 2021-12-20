import sortTypedDecreasingOptimized from './sortTypedDecreasingOptimized.js';

const sortTypedDecreasing = (a, i, j) => {
	const k = i + 1;
	if (k < j) {
		let t = k;
		const o = a[t];
		while (t-- > i && a[t] < o) a[t + 1] = a[t];
		a[t + 1] = o;
		sortTypedDecreasingOptimized(a, k, j);
	}
};

export default sortTypedDecreasing;
