// function A() {
// 	const config = {
// 		name: 'ngnice'
// 	}
// 	const fullname = useMemo(()=> {
// 		return config.name + ' alo';
// 	}, [config]);

// 	...
// }

const fn1 = async()=>{
  console.log('sync1');
  const b1 = await Promise.resolve('async1');
  console.log(b1);
  const b2 = await Promise.resolve('async2');
  console.log(b2);
}
const fn2 = async()=>{
  console.log('sync2');
  const b = await Promise.resolve('async3');
  console.log(b);
}
fn1();
fn2();

// sync1
// sync2
// async1
// async3
// async2