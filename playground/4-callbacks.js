// setTimeout(() => {
//   console.log('2 seconds are up');
// }, 2000);

// const names = ['Akshay', 'Kumar', 'Kaushik'];
// const shortNames = names.filter((name) => {
//   return name.length <= 6;
// })

// const geoCode = (address, callBack) => {
//   setTimeout(() => {
//     const data = {
//       latitude: 0,
//       longitude: 0
//     };
//     callBack(data);
//   }, 2000);
// }

// geoCode('Philadelphia', (data) => {
//   console.log(data);
// })

// const add = (num1, num2, callBack) => {
//   setTimeout(() => {
//     callBack(num1 + num2);
//   }, 2000)
// }

// add(1, 4, (sum) => {
//   console.log(sum);
// });


const doWorkCallBack = (callback) => {
  setTimeout(() => {
    // callback('This is my error', undefined);
    callback(undefined, [1,4,7]);
  }, 2000);
}

doWorkCallBack((error, result) =>{
  if(error) {
    return console.log(error);
  }
  console.log(result);
});