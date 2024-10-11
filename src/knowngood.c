// known-good wasm that can pass a struct back & forth
// uses wasi-sdk (for malloc/free)
//  /opt/wasi-sdk/bin/clang src/knowngood.c -o build/knowngood.wasm

#include <stdint.h>
#include <stdlib.h>
typedef uint16_t u16;

#define NULL0_EXPORT(n) __attribute__((export_name(n)))

NULL0_EXPORT("malloc")
void* _null0_malloc(size_t size) {
  return malloc(size);
}

NULL0_EXPORT("free")
void _null0_free(void* ptr) {
  free(ptr);
}

// basic tester function
NULL0_EXPORT("add")
int add(int a, int b) {
  return a + b;
}

typedef struct {
  u16 x;
  u16 y;
} Vector;

NULL0_EXPORT("test")
void test(Vector* ret, Vector* p1) {
  ret->x = p1->x + 100;
  ret->y = p1->y + 100;
}

int main() {
  return 0;
}
