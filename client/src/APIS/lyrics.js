const getTrackLyrics = async (title, artist) => {
    console.log(title);
    console.log(artist);

    const url = `/api/lyrics?title=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}`;

    try {
        const response = await fetch(url);
        const lyrics = await response.text();
        console.log(lyrics);

        // Rest of your code
    } catch (error) {
        console.error(error);
    }
};

export { getTrackLyrics };
