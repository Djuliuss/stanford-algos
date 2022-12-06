const obj = { a: "foo", 2: "bar", 4: "bAZ" };

console.info(Object.keys(obj));
delete (obj as any).a;
console.info(Object.keys(obj));
