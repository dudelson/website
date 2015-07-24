#include <iostream>
#include <vector>
using namespace std;

#define n_unique 200005
class SegmentTree {
private:
    int n;
    // A is the input array, st is the segment tree
    vector<int> A, st;
    // this vector maps array entries to the range
    // of indexes they appear
    vector< pair<int, int> > freqs;

    // convenience methods to get the left and right child
    // of a node
    int left(int i) { return i<<1; }
    int right(int i) { return (i<<1)+1; }

    int build(int L, int R, int idx) {
	if(L == R) st[idx] = A[L];
	else {
	    int left_val = build(L, (L+R)/2, left(idx));
	    int right_val = build(((L+R)/2)+1, R, right(idx));
	    int left_freq = getFreq(left_val, L, R);
	    int right_freq = getFreq(right_val, L, R);
	    // detect "split" ranges and take them into account
	    if(A[(L+R)/2] == A[((L+R)/2)+1]) {
		int split_freq = getFreq(A[(L+R)/2], L, R);
		if(split_freq > left_freq)
		    st[idx] = (split_freq > right_freq) ? A[(L+R)/2] : right_val;
		else
		    st[idx] = (left_freq > right_freq) ? left_val : right_val;
	    } else {
		st[idx] = (left_freq > right_freq) ? left_val : right_val;
	    }
	}
	return st[idx];
    }

    int rfq(int i, int j, int L, int R, int idx) {
	if(R < i || j < L) return n_unique;
	if(i <= L && R <= j) return st[idx];

	int left_val = rfq(i, j, L, (L+R)/2, left(idx));
	int right_val = rfq(i, j, ((L+R)/2)+1, R, right(idx));
	int lo = i, hi = j, left_freq, right_freq;
	if(i < L) lo = L;
	if(R < j) hi = R;
	if(left_val != n_unique) left_freq = getFreq(left_val, lo, hi);
	if(right_val != n_unique) right_freq = getFreq(right_val, lo, hi);
	// detect "split" ranges and take them into account
	if(A[(L+R)/2] == A[((L+R)/2)+1]) {
	    int split_freq = getFreq(A[(L+R)/2], lo, hi);
	    if(left_val == n_unique) return (split_freq > right_freq) ? A[(L+R)/2] : right_val;
	    if(right_val == n_unique) return (split_freq > left_freq) ? A[(L+R)/2] : left_val;
	    if(split_freq > left_freq)
		return (split_freq > right_freq) ? A[(L+R)/2] : right_val;
	    else
		return (left_freq > right_freq) ? left_val : right_val;
	} else {
	    if(left_val == n_unique) return right_val;
	    if(right_val == n_unique) return left_val;
	    return (left_freq > right_freq) ? left_val : right_val;
	}
    }

public:
    SegmentTree(vector<int> &_A) {
	A = _A;
	freqs.assign(n_unique, make_pair(-1, -1));
	int last = n_unique;
	for(int i=0; i<(int)A.size(); i++) {
	    if(A[i] != last) {
		if(i > 0) freqs[last+100000].second = i-1;
		freqs[A[i]+100000].first = i;
	    }
	    last = A[i];
	}
	freqs[last+100000].second = ((int)A.size())-1;
	n = A.size();
	st.assign(4*n, 0);
	build(0, n-1, 1);
    }

    int rfq(int i, int j) {
	return rfq(i, j, 0, n-1, 1);
    }

    int getFreq(int n, int i, int j) {
	int lo = freqs[n+100000].first, hi = freqs[n+100000].second;
	if(lo <= i && j <= hi) return j-i+1;
	else if(i < lo && j <= hi) return j-lo+1;
	else if(lo <= i && hi < j) return hi-i+1;
	else return hi-lo+1;
    }
};
int n, q, i, j;
vector<int> a;
int main() {
    while(cin >> n, n) {
	cin >> q;
	a.resize(n);
	for(auto &x : a) cin >> x;
	SegmentTree st(a);
	for(int qq=0; qq<q; qq++) {
	    cin >> i >> j; i--; j--;
	    int number = st.rfq(i, j);
	    int freq = st.getFreq(number, i, j);
	    cout << freq << '\n';
	}
    }
	
    return 0;
}
