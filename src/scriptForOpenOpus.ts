import { searchForSpotifyArtist } from "./scriptForSpotify";

async function fetchOpenOpusApi(endpoint: string) {
  const result = await fetch(`https://api.openopus.org/${endpoint}`, {});
  return await result.json();
}

console.log("Hello from scriptForOpenOpus.ts");

console.log(await fetchOpenOpusApi("composer/list/pop.json", "GET"));


const searchForm = document.getElementById("search-form-openopus-artist");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault(); // prevent the default form submission behavior
  const searchTerm = document.getElementById("search-input1").value;
  searchForArtist(searchTerm);
});

async function searchForArtist(artistName: string) {
  const result = await fetchOpenOpusApi(`/composer/list/search/${artistName}.json`);
  if (!result.composers) {
    console.log(result.status.error);
    return;
  }
  console.log("OpenOpusresult: ", result.composers[0]);
  populateArtist(result);
  searchForSpotifyArtist(artistName);
}

function populateArtist (result: any) {
  document.getElementById("artist")!.innerText = "From OpenOpus: " + result.composers[0].complete_name;
  const openopusPic = new Image(200, 200);
  openopusPic.src = result.composers[0].portrait;
  document.getElementById("openopus-pic")!.appendChild(openopusPic);
}