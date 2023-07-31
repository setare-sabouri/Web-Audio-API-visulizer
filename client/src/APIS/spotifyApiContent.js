import { getToken, searchSong } from './spotifyApi'

let audio;

const searchSongHandler = async () => {
    const searchInput = document.getElementById('searchInput').value;
    try {
        const accessToken = await getToken();
        const songData = await searchSong(accessToken, searchInput);

        if (songData) {
            // Display song information
            document.getElementById('songInfo').innerHTML = `
        <h2>Song Information:</h2>
        <p>Title: ${songData.name}</p>
        <p>Artist: ${songData.artists[0].name}</p>
      `;

            // Show the control bar when the song starts playing
            document.getElementById('controlBar').style.display = 'block';
            // Set the audio source
            document.getElementById('audioSource').src = songData.preview_url;
            document.getElementById('audioPlayer').load();
            audio = null; // Reset audio to avoid multiple audio objects

            // Call the function to update the progress bar
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
