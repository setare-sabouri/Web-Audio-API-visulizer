const getTrackLyrics = async (title, artist) => {

    const url = `/api/lyrics?title=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}`;

    try {
        const response = await fetch(url);
        const lyrics = await response.text();
        return lyrics
        // send lyrics for 3d text now
    } catch (error) {
        console.error(error);
    }
};

export { getTrackLyrics };
