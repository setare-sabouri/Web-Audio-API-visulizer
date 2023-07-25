let audio

const APIController = (function () {

    const clientId = 'e02fbce704c7472bad5b5bedaad5d8da';
    const clientSecret = 'b1b88b7859274db187862925b304e0f7';

    // private methods
    const _getToken = async () => {
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        return data.access_token;
    }


    const _searchSong = async (accessToken, query) => {
        const result = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + accessToken }
        });

        const data = await result.json();
        console.log(data);
        return data.tracks.items[7]; // Assuming you want to display only the first result
    }

    return {
        getToken() {
            return _getToken();
        },
        searchSong(accessToken, query) {
            return _searchSong(accessToken, query);
        }
    }
})();



const searchSong = async () => {
    const searchInput = document.getElementById('searchInput').value;
    try {
        const accessToken = await APIController.getToken();
        const songData = await APIController.searchSong(accessToken, searchInput);

        if (songData) {
            console.log("yes");
            console.log(songData);
            console.log("yes");

            // Display song information
            document.getElementById('songInfo').innerHTML = `
          <h2>Song Information:</h2>
          <p>Title: ${songData.name}</p>
          <p>Artist: ${songData.artists[0].name}</p>
          <button onclick="playSong('${songData.preview_url}')">Play</button>
          <button onclick="stopSong('${audio}')">Stop</button>

        `;
            // Call function to fetch and display lyrics
            fetchAndDisplayLyrics(songData.name, songData.artists[0].name);
        } else {
            document.getElementById('playButton').innerHTML = '';
            document.getElementById('songInfo').innerHTML = '<p>No results found.</p>';
            document.getElementById('lyrics').innerHTML = '';
        }
    } catch (error) {
        console.error(error);
    }
}

const playSong = (previewUrl) => {
    if (previewUrl) {
        if (audio) {
            audio.pause(); // Pause the current playback if there's any
        }

        audio = new Audio(previewUrl);
        audio.play();
    }
}

const stopSong = () => {
    if (audio) {
        audio.pause();
    }
}


// const fetchAndDisplayLyrics = async (title, artist) => {
//     // Implement fetching lyrics from the lyrics API of your choice here
//     // Use the title and artist parameters to search for the lyrics
//     // Display the lyrics in the 'lyrics' div
//     // You can use the Genius API or any other lyrics API you prefer.
//     // Due to API variations, it's best to refer to the API documentation for fetching and displaying lyrics.
// }

