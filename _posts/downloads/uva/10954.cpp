#include <iostream>
#include <queue>
using namespace std;

int n, x;
long long sum;
int main() {
    while(cin >> n, n) {
	sum = 0;
	priority_queue<long long> q;
	while(n--) {
	    cin >> x;
	    q.push(-x);
	}
	while(q.size() > 1) {
	    long long a = q.top();
	    q.pop();
	    long long b = q.top();
	    q.pop();
	    sum += -a-b;
	    q.push(a+b);
	}
	cout << sum << '\n';
    }
    return 0;
}
