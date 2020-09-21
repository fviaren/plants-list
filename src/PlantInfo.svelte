<script> 
  export let info;
  export let hideInfo;
  let moreNames = null;
  function getMoreNames(item) {
    return [item.common_name, item.scientific_name].join('/')
  }
    
  let showMore = false;
  
    function toggleShowMore() {
        if(!showMore) {
          moreNames = info.data.map(getMoreNames)
        }
        showMore =!showMore;
    }
    
</script>

<div class="overlay">
  
  <div class="info-box">
    <button class="close" on:click={hideInfo()}><i class="fa fa-times" aria-hidden="true"></i></button>
    <div class="info">
      <p><strong>Common name: </strong>{info.data[0].common_name}</p>
      <p><strong>Scientific name: </strong>{info.data[0].scientific_name}</p>
      <p><strong>Family common name: </strong>{info.data[0].family_common_name}</p>
      <img class="plant-img" src={info.data[0].image_url} alt="plant image"/>
      
    </div>
    <button 
      on:click={toggleShowMore}
      class="btn-more-names">
      <strong>Other: </strong>{info.data.length} options
      {#if showMore}
        <i class="fas fa-caret-up"/>
      {:else}
          <i class="fas fa-caret-down"/>
      {/if}
    </button>
      {#if showMore}
        <div>
          <ul class="more-names-list">
          {#each moreNames as moreNameItem}
            <li>{moreNameItem}</li>
          {/each}
          </ul>
        </div>
        
      {/if}
  </div>
</div>

<style>
.overlay {
  background: rgba(85, 84, 84, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.info-box {
  background:white;
  width: 40%;
  max-height: 75%;
  box-shadow: 5px 5px #cccccc;
  position: fixed !important;
  margin-top: 10%;
  padding: 10px 10px 15px 10px;
  z-index: 1;
  border: #808080a8 solid;
  margin-left: 30%;
}
.info {
  background: rgba(255, 255, 255);
  text-align: center;
  margin-top: 35px;

}
.close {
    background-color: white;
    border: none;
    float: right;

}
.plant-img {
  max-width: 50%;
}
.btn-more-names {
  width: 100%;
  margin-top: 10px;
}
.more-names-list {
    max-height: 24vh;
    float: left;
    overflow-y: auto;
    width: 85%;
    list-style-type: none;
}
</style>
