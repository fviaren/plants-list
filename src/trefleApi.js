
const trefleApi = {
  getPlantInfo: async name => {

    try {const response = await fetch(
      `https://trefle.io/api/v1/plants/search?q=${name}`, {headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo3MzYwLCJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJpcCI6bnVsbCwiZXhwaXJlIjoiMjAyMC0wOS0yMiAxNToyOTo1OSArMDAwMCIsImV4cCI6MTYwMDc4ODU5OX0.Xzg0Tq1LC4ZYPrgK6YMizaSHlNdvVZgB_6GwG07T3Ik',
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




