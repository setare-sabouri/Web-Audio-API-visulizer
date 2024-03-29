import { getToken, searchSong } from './spotifyApi'
import { getTrackLyrics } from './lyrics';
let songData;
let lyrics
const searchSongHandler = async () => {
    const searchInput = document.getElementById('searchInput').value;
    try {
        const accessToken = await getToken();
        songData = await searchSong(accessToken, searchInput);
        if (songData) {
            lyrics = await getTrackLyrics(songData.name, songData.artists[0].name);
            lyrics = lyrics.replace(/\n/g, "<br>");

            // Display song information
            document.getElementById('songArtist').innerHTML = `
        <p>Artist: ${songData.name}</p>
      `;
            document.getElementById('songTitle').innerHTML = `
      <p>Artist: ${songData.artists[0].name}</p>
    `;
            document.getElementById('lyrics').innerHTML = lyrics;


            document.getElementById('controlBar').style.display = 'block';
            document.getElementById('audioSource').src = songData.preview_url;
            document.getElementById('audioPlayer').load();


        } else {
            document.getElementById('songInfo').innerHTML = '<p>No results found.</p>';
            document.getElementById('lyrics').innerHTML = '';
            document.getElementById('controlBar').style.display = 'none';
        }
    } catch (error) {
        console.error(error);
    }
};


document.getElementById('searchButton').addEventListener('click', searchSongHandler);
