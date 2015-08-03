#include <iostream>
#include <string>
#include <vector>
using namespace std;

class FenwickTree {
private:
    vector<int> ft;
    int LSO(int b) { return (b&(-b)); }
public:
    FenwickTree(int n) {
	ft.assign(n+1, 0);
    }
    int rsq(int b) {
	if(b == 0) return 0;
	int sum = 0;
	for(; b; b-=LSO(b)) sum += ft[b];
	return sum;
    }
    int rsq(int a, int b) {
	return rsq(b) - rsq(a-1);
    }
    void adjust(int b, int v) {
	// adjusts value of the bth element by v
	for(; b<ft.size(); b+=LSO(b)) ft[b] += v;
    }
};

int main() {
    // these are needed to pass the time limit with
    // cin and cout IO
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector<int> v;
    int n, x, y, t=1;
    string s;
    while(cin >> n, n) {
	if(t > 1) cout << '\n';
	cout << "Case " << t++ << ":\n";
	v.assign(n+1, 0);
	FenwickTree ft(n);
	for(int i=1; i<=n; i++) {
	    cin >> v[i];
	    ft.adjust(i, v[i]);
	}
	while(cin >> s, s != "END") {
	    cin >> x >> y;
	    if(s == "S") {
		ft.adjust(x, y-v[x]);
		v[x] = y;
	    } else cout << ft.rsq(x, y) << '\n';
	}
    }
	
    return 0;
}
