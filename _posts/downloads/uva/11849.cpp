#include <iostream>
#include <set>
using namespace std;

#define ll long long

ll n, m, x, ans;
set<ll> cds;
int main() {
    while(cin >> n >> m, n||m) {
	cds.clear();
	while(n--) {
	    cin >> x;
	    cds.insert(x);
	}
	ans = 0;
	while(m--) {
	    cin >> x;
	    if(cds.find(x) != cds.end()) ans++;
	}
	cout << ans << '\n';
    }
}
