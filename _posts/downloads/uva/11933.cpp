#include <cstdio>

using namespace std;

typedef long long ll;

ll a, b, n, i;
bool e;
int main() {
    while(scanf("%lld", &n), n) {
	a = 0, b = 0, i = 0, e = true;
	while(1LL<<i <= n) {
	    if(n&(1LL<<i) && e) {
		a |= 1LL<<i;
		e = !e;
	    } else if(n&(1LL<<i) && !e) {
		b |= 1LL<<i;
		e = !e;
	    }
	    i++;
	}
	printf("%lld %lld\n", a, b);
    }
    return 0;
}
