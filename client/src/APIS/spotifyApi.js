import { getTrackLyrics } from "./lyrics";

const { VITE_CLIENTSECRET, VITE_CLIENTID } = import.meta.env;

const getToken = async () => {
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(VITE_CLIENTID + ':' + VITE_CLIENTSECRET)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    return data.access_token;
};

const searchSong = async (accessToken, query) => {
    const result = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + accessToken }
    });

    const data = await result.json();
    const tracksWithPreview = data.tracks.items.filter(track => track.preview_url !== null);


    //
    const firstTrack = tracksWithPreview[0];
    // Fetch lyrics for the first track
    await getTrackLyrics(firstTrack.name, firstTrack.artists[0].name);

    return tracksWithPreview[0]; // Assuming that I want to display only the first result
};

export { getToken, searchSong };
