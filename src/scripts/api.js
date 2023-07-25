

// // JavaScript
// async function searchLyrics() {
//     const searchInput = document.getElementById("searchInput").value;
//     const accessToken = "ciw1-kEhdwBjr0RGnx78InBWp0OvFNMT5lVHudAk6LGQ_-PEGMD6I3U-DLF1yLM8";

//     const response = await fetch(
//         `https://api.genius.com/search?q=${encodeURIComponent(searchInput)}`,
//         {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         }
//     );
//     const data = await response.json();
//     const hits = data.response.hits;

//     if (hits.length > 0) {
//         const firstHit = hits[0];
//         const lyricsPath = firstHit.result.path;

//         // Get the lyrics for the first search result
//         const lyricsResponse = await fetch(`https://api.genius.com${lyricsPath}`);
//         const lyricsData = await lyricsResponse.json();
//         const lyrics = lyricsData.response.song.lyrics;

//         // Display the lyrics
//         const lyricsDisplay = document.getElementById("lyricsDisplay");
//         lyricsDisplay.innerHTML = `<pre>${lyrics}</pre>`;
//     } else {
//         // Handle no search results
//         const lyricsDisplay = document.getElementById("lyricsDisplay");
//         lyricsDisplay.innerHTML = "Lyrics not found.";
//     }
//     console.log("yessss");
// }


//--------------------------------------------------------------
// import { getLyrics, getSong } from 'genius-lyrics-api';

// const options = {
//     apiKey: 'tnKBOAFyPC_6zHd7ALcIiCJaGpBZPhRto_ubjUPZB9kkGewNAFhmVhuVEt6qMGLk',
//     title: 'Posthumous Forgiveness',
//     artist: 'Tame Impala',
//     optimizeQuery: true
// };

// getLyrics(options).then((lyrics) => console.log(lyrics));


// getSong(options).then((song) =>
//     console.log(`${song.id} - ${song.title} - ${song.url} - ${song.albumArt} - ${song.lyrics}`)
// );

// console.log("object");