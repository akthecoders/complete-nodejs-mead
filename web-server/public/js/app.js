console.log("js lodaed");
fetch('http://localhost:3000/weather?address=Noida').then((response) => {
  response.json(response).then((data) => {
    if(data.error) {
      console.log(data.error);
    }
    else {
      console.log(data.location);
      console.log(data.forecast);
    }
  });
});