const sortTypedDecreasing = (a, i, j) => {
	for (let k = i + 1; k < j; ++k) {
		let t = k;
		const o = a[t];
		while (t-- > i && a[t] < o) a[t + 1] = a[t];
		a[t + 1] = o;
	}
};

export default sortTypedDecreasing;
