#include <iostream>
#include <vector>
#include <utility>
#include <algorithm>
using namespace std;


vector< vector< pair<int, int> > > t;
int n, m;
int main() {
    while(cin >> m >> n) {
	t.resize(n);
	fill(t.begin(), t.end(), vector< pair<int, int> >());
	for(int i=0; i<m; i++) {
	    int k;
	    cin >> k;
	    vector<int> idx(k), val(k);
	    for(auto &x: idx) cin >> x;
	    for(auto &x: val) cin >> x;
	    for(int j=0; j<k; j++) 
		t[idx[j]-1].push_back(make_pair(i+1, val[j]));
	}

	cout << n << " " << m << '\n';
	for(auto v : t) {
	    cout << v.size();
	    for(int i=0; i<(int)v.size(); i++) {
		cout << " " << v[i].first;
	    }
	    cout << '\n';
	    for(int i=0; i<(int)v.size(); i++) {
		if(i > 0) cout << " ";
		cout << v[i].second;
	    }
	    cout << '\n';
	}
    }
	
    return 0;
}
