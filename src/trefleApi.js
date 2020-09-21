
const trefleApi = {
  getPlantInfo: async name => {

    try {const response = await fetch(
      `https://trefle.io/api/v1/plants/search?q=${name}`, {headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo3MzYwLCJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJpcCI6bnVsbCwiZXhwaXJlIjoiMjAyMC0wOS0yMiAxMzozNDoxMCArMDAwMCIsImV4cCI6MTYwMDc4MTY1MH0.NzQl8GEaSD10z8RnAZ1GD5f5b2loGSrSAsSY8hslwiQ',
        'Content-Type': 'application/json'
      }})
    const plantDataJson = await response.json();
    console.log(plantDataJson);
    if(plantDataJson.data.length==0){
      alert("Plant not found");
      return null
    }
    return plantDataJson;
    }
    catch(error) {
      return null;
    }
  },
};

export default trefleApi;




