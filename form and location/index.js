function update(){
  let url = document.getElementById("url");
  let name = document.getElementById("name");
  let year = document.getElementById("year");
  if(name.value){
      url.innerHTML += `?name=${name.value}`;
  }
  if(year.value){
      if(!name.value)
          url.innerHTML += `?year=${year.value}`;
      else
          url.innerHTML += `&year=${year.value}`;
  }
}