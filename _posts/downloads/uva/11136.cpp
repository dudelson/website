#include <iostream>
#include <set>
using namespace std;

int n, x, k;
long long sum;
multiset<int> bills;
int main() {
    while(cin >> n, n) {
	sum = 0;
	bills.clear();
	for(int nn=0; nn<n; nn++) {
	    cin >> k;
	    for(int i=0; i<k; i++) {
		cin >> x;
		bills.insert(x);
	    }
	    auto hit = bills.end(), lot = bills.begin(); hit--;
	    sum += (*hit)-(*lot);
	    bills.erase(hit); bills.erase(lot);
	}
	cout << sum << '\n';
    }
    return 0;
}
