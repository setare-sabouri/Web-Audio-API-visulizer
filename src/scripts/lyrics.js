
export const fetchLyrics = async (title, artist) => {
    const geniusApiKey = 'f2lPCttxCA1RvtTpSVA-AzSCT-V7CLlMz1Bq7ljQ_g5hKHXHjJeHqIl234Yw795D';
    const url = `https://api.genius.com/search?q=${encodeURIComponent(
        title + ' ' + artist
    )}`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${geniusApiKey}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch lyrics');
        }

        const data = await response.json();

        if (data && data.response && data.response.hits.length > 0) {
            const songPath = data.response.hits[0].result.path;
            const lyrics = await fetchLyricsPage(songPath);
            return lyrics;
        }

        return 'Lyrics not found';
    } catch (error) {
        console.error(error);
        return 'Failed to fetch lyrics';
    }
};

const fetchLyricsPage = async (songPath) => {
    const url = `https://genius.com${songPath}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch lyrics page');
    }

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const lyricsNode = doc.querySelector('.lyrics');

    if (lyricsNode) {
        return lyricsNode.innerText;
    }

    return 'Lyrics not found';
};
